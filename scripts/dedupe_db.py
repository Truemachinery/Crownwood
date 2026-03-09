import os
import sys
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv(".env.local")
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Error: Missing Supabase credentials in .env.local")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def dedupe_contacts():
    print("Fetching all contacts to audit for duplicates...")
    
    # We need to paginate if there are many contacts, but lets try to get all first.
    # To be safe, we'll fetch in batches.
    all_contacts = []
    page = 0
    limit = 1000
    while True:
        res = supabase.table("municipal_contacts").select("id, email, created_at").order("created_at").order("id").range(page*limit, (page+1)*limit - 1).execute()
        if not res.data:
            break
        all_contacts.extend(res.data)
        if len(res.data) < limit:
            break
        page += 1

    print(f"Fetched {len(all_contacts)} total contacts.")
    
    # Track seen emails to find duplicates
    seen_emails = {}
    to_delete = []
    merge_map = {} # maps old_id -> new_kept_id
    
    for contact in all_contacts:
        email = contact.get("email")
        if not email:
            continue
        
        email = email.lower().strip()
        if email in seen_emails:
            kept_id = seen_emails[email]
            old_id = contact["id"]
            if kept_id == old_id:
                # Same exact record fetched twice due to unstable overlapping pagination (pre-fix)
                continue
            to_delete.append(old_id)
            merge_map[old_id] = kept_id
        else:
            seen_emails[email] = contact["id"]
            
    print(f"Found {len(to_delete)} duplicate email records.")
    
    # Delete duplicates in chunks
    if to_delete:
        print("Merging email_sends history and purging duplicates...")
        chunk_size = 50
        
        # We must reassign email_sends first!
        # Because we can't easily bulk-update different IDs to different targets in one query via PostgREST,
        # we do it one by one or in small batches. Actually doing it one by one for 15k might take a few minutes.
        # Let's just update them. We can fetch all email_sends first to see which ones actually need update.
        print("Fetching email_sends to check for dependencies...")
        
        # Actually it's faster to just attempt the update if there's a match, but with 15k it's a lot of network calls.
        # Let's just do it cleanly.
        for i in range(0, len(to_delete), chunk_size):
            chunk = to_delete[i:i+chunk_size]
            
            # Reassign foreign keys for this chunk
            for old_id in chunk:
                kept_id = merge_map[old_id]
                # Update email_sends
                supabase.table("email_sends").update({"contact_id": kept_id}).eq("contact_id", old_id).execute()
                
            # Now delete the chunk
            supabase.table("municipal_contacts").delete().in_("id", chunk).execute()
            print(f"  Merged and deleted {len(chunk)} records (Batch {i//chunk_size + 1} / {(len(to_delete) // chunk_size) + 1})")
            
        print("Successfully purged all duplicate emails.")
    else:
        print("No duplicate emails found.")

if __name__ == "__main__":
    dedupe_contacts()
