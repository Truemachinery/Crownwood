import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv(".env.local")
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Missing Supabase credentials")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# The new STRICT relevance mapping
DEPT_RELEVANCE = {
    "public works": 10, "road and bridge": 10, "road & bridge": 10,
    "road bridge": 10, "streets": 10, "commissioner": 10,
    "county commissioner": 10, "city commissioner": 10,
    "precinct": 10, "pct": 10, "engineering": 9, "county engineer": 10, "city engineer": 10,
    "transportation": 5, "infrastructure": 5, "highway": 5, "maintenance": 5,
    "fleet": 3, "utilities": 3, "parks": 3, "facilities": 3,
    "purchasing": 0, "procurement": 0, "administration": 0, "county judge": 0, 
    "city manager": 0, "general": 0, "mayor": 0, "clerk": 0, "auditor": 0,
}

def score_dept_relevance(email, title, department):
    """Score how relevant this contact is for our products."""
    text = f"{email or ''} {title or ''} {department or ''}".lower()
    best = 0
    
    # Try exact matches or substring matches for the good stuff
    for dept, score in DEPT_RELEVANCE.items():
        if dept in text:
            if score > best:
                best = score
                
    # If no strict match but we have points
    return best

def prune_and_rescore():
    print("Fetching contacts to re-score and prune...")
    page = 0
    limit = 1000
    all_contacts = []
    
    while True:
        res = supabase.table("municipal_contacts").select("id, email, title, department, dept_relevance").order("id").range(page*limit, (page+1)*limit - 1).execute()
        if not res.data:
            break
        all_contacts.extend(res.data)
        if len(res.data) < limit:
            break
        page += 1

    print(f"Fetched {len(all_contacts)} contacts.")
    
    to_delete = []
    updates_by_score = {} # score -> list of ids
    
    for c in all_contacts:
        old_score = c.get("dept_relevance") or 0
        new_score = score_dept_relevance(c.get("email"), c.get("title"), c.get("department"))
        
        # We strictly focus on commissioners and public works. 
        # Anything that scores 0 under the new strict rules is cut.
        if new_score == 0:
            to_delete.append(c["id"])
        elif new_score != old_score:
            if new_score not in updates_by_score:
                updates_by_score[new_score] = []
            updates_by_score[new_score].append(c["id"])
            
    print(f"Identified {len(to_delete)} contacts to purge (Score 0).")
    for score, ids in updates_by_score.items():
        print(f"Identified {len(ids)} contacts to boost to score {score}.")
    
    # Prune
    if to_delete:
        print("Purging irrelevant contacts...")
        chunk_size = 300
        for i in range(0, len(to_delete), chunk_size):
            chunk = to_delete[i:i+chunk_size]
            
            try:
                # First delete their email sends history if we don't care about irrelevant contacts? 
                # No, we just try to delete them. If they have send history, we catch the FK error and update them to 0 instead.
                supabase.table("municipal_contacts").delete().in_("id", chunk).execute()
            except Exception as e:
                # If chunk fails due to FK, we update them to 0 so they drop out of views.
                supabase.table("municipal_contacts").update({"dept_relevance": 0}).in_("id", chunk).execute()
                    
        print("Purge completed.")
        
    # Update scores
    print("Applying new relevance scores...")
    for score, ids in updates_by_score.items():
        chunk_size = 300
        for i in range(0, len(ids), chunk_size):
            chunk = ids[i:i+chunk_size]
            supabase.table("municipal_contacts").update({"dept_relevance": score}).in_("id", chunk).execute()
            
    print("Scores updated successfully.")

if __name__ == "__main__":
    prune_and_rescore()
