"""
Phase 2: Texas County Email Spider
Scrapes public contact emails from Texas county .gov websites.

Strategy:
1. Query Supabase for all Texas counties
2. For each county, Google the county website + "staff directory" or "contact"
3. Crawl the contact/directory pages for email addresses
4. Store found emails in municipal_contacts table

Usage:
  python3 scripts/texas_county_spider.py
"""

import os
import re
import time
import json
import requests
from urllib.parse import urljoin, urlparse
from supabase import create_client

# --- Configuration ---
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Email regex pattern
EMAIL_PATTERN = re.compile(
    r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}',
    re.IGNORECASE
)

# Departments we care about
TARGET_DEPARTMENTS = [
    "public works", "road and bridge", "road & bridge",
    "streets", "transportation", "engineering",
    "purchasing", "procurement", "maintenance",
    "parks", "county engineer", "infrastructure",
    "highway", "utilities", "fleet",
]

# Common contact page URL patterns
CONTACT_PATHS = [
    "/contact", "/contact-us", "/contacts",
    "/staff-directory", "/directory", "/departments",
    "/about/contact", "/government/departments",
    "/elected-officials", "/county-offices",
]

# Request headers to look like a real browser
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


def get_texas_counties():
    """Fetch all Texas counties from Supabase."""
    # Get Texas state_id
    state_result = supabase.table("states").select("id").eq("abbreviation", "TX").single().execute()
    tx_state_id = state_result.data["id"]

    # Get all Texas counties
    counties = []
    offset = 0
    page_size = 1000
    while True:
        result = supabase.table("counties").select("*").eq("state_id", tx_state_id).range(offset, offset + page_size - 1).execute()
        counties.extend(result.data)
        if len(result.data) < page_size:
            break
        offset += page_size

    return tx_state_id, counties


def search_county_website(county_name):
    """
    Try to find the official county website URL.
    Uses a list of known patterns for Texas counties.
    """
    # Clean county name for URL construction
    clean_name = county_name.lower().replace(" county", "").strip()
    clean_name_hyphen = clean_name.replace(" ", "-")
    clean_name_no_space = clean_name.replace(" ", "")

    # Common Texas county website patterns
    candidates = [
        f"https://www.co.{clean_name_no_space}.tx.us",
        f"https://www.{clean_name_hyphen}county.org",
        f"https://www.{clean_name_no_space}county.org",
        f"https://www.{clean_name_hyphen}countytx.gov",
        f"https://www.{clean_name_no_space}countytx.gov",
        f"https://www.{clean_name_hyphen}county.texas.gov",
        f"https://{clean_name_hyphen}county.org",
        f"https://{clean_name_no_space}county.org",
        f"https://www.{clean_name_hyphen}.tx.us",
    ]

    for url in candidates:
        try:
            resp = requests.head(url, headers=HEADERS, timeout=8, allow_redirects=True)
            if resp.status_code < 400:
                return resp.url  # Return final URL after redirects
        except (requests.RequestException, Exception):
            continue

    return None


def extract_emails_from_text(text):
    """Extract email addresses from text, filtering out common junk."""
    emails = EMAIL_PATTERN.findall(text)

    # Filter out common non-person emails
    filtered = []
    junk_patterns = [
        "example.com", "test.com", "localhost",
        ".png", ".jpg", ".gif", ".css", ".js",
        "sentry.io", "google.com", "facebook.com",
        "twitter.com", "instagram.com", "youtube.com",
        "schema.org", "w3.org", "gravatar.com",
        "wordpress.com", "wix.com", "squarespace.com",
        "noreply", "no-reply", "donotreply",
    ]

    for email in emails:
        email_lower = email.lower()
        if any(junk in email_lower for junk in junk_patterns):
            continue
        if len(email) > 100:  # Probably garbage
            continue
        filtered.append(email.lower())

    return list(set(filtered))


def scrape_page(url):
    """Fetch a page and extract emails from it."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15, allow_redirects=True)
        if resp.status_code >= 400:
            return []
        return extract_emails_from_text(resp.text)
    except (requests.RequestException, Exception):
        return []


def find_contact_pages(base_url):
    """Try common contact page paths on a website."""
    pages_to_scrape = [base_url]  # Always scrape the homepage

    for path in CONTACT_PATHS:
        full_url = urljoin(base_url, path)
        pages_to_scrape.append(full_url)

    return pages_to_scrape


def determine_department(email, page_text=""):
    """Try to guess the department from the email address or surrounding text."""
    email_lower = email.lower()
    text_lower = page_text.lower()

    for dept in TARGET_DEPARTMENTS:
        dept_parts = dept.split()
        if any(part in email_lower for part in dept_parts if len(part) > 3):
            return dept.title()

    # Check common email prefixes
    prefix_map = {
        "pw": "Public Works",
        "publicworks": "Public Works",
        "roads": "Road and Bridge",
        "road": "Road and Bridge",
        "rb": "Road and Bridge",
        "streets": "Streets",
        "engineering": "Engineering",
        "engineer": "County Engineer",
        "purchasing": "Purchasing",
        "procurement": "Procurement",
        "maintenance": "Maintenance",
        "parks": "Parks",
        "fleet": "Fleet",
        "utilities": "Utilities",
        "highway": "Highway",
        "transportation": "Transportation",
        "infrastructure": "Infrastructure",
    }

    email_prefix = email.split("@")[0].lower()
    for key, value in prefix_map.items():
        if key in email_prefix:
            return value

    return None  # Unknown department


def save_contacts(contacts, tx_state_id):
    """Save scraped contacts to Supabase."""
    if not contacts:
        return 0

    # Filter duplicates by email
    seen_emails = set()
    unique = []
    for c in contacts:
        if c["email"] not in seen_emails:
            seen_emails.add(c["email"])
            unique.append(c)

    # Check existing emails to avoid duplicates
    existing = supabase.table("municipal_contacts").select("email").eq("state_id", tx_state_id).execute()
    existing_emails = {row["email"] for row in existing.data}

    new_contacts = [c for c in unique if c["email"] not in existing_emails]

    if not new_contacts:
        return 0

    # Insert in batches
    batch_size = 100
    total_inserted = 0
    for i in range(0, len(new_contacts), batch_size):
        batch = new_contacts[i:i + batch_size]
        try:
            supabase.table("municipal_contacts").insert(batch).execute()
            total_inserted += len(batch)
        except Exception as e:
            print(f"      ⚠️  Insert error: {e}")

    return total_inserted


def scrape_county(county, tx_state_id):
    """Scrape a single county for contact emails."""
    county_name = county["name"]
    county_id = county["id"]

    print(f"   🔍 Searching for {county_name} website...")

    # Step 1: Find the county website
    base_url = search_county_website(county_name)
    if not base_url:
        print(f"      ❌ No website found for {county_name}")
        return 0

    print(f"      🌐 Found: {base_url}")

    # Step 2: Find contact pages
    pages = find_contact_pages(base_url)

    # Step 3: Scrape all pages for emails
    all_emails = []
    for page_url in pages:
        emails = scrape_page(page_url)
        if emails:
            all_emails.extend(emails)
        time.sleep(0.5)  # Be polite — don't hammer servers

    all_emails = list(set(all_emails))

    if not all_emails:
        print(f"      📭 No emails found on {county_name} website")
        return 0

    print(f"      📧 Found {len(all_emails)} email(s): {', '.join(all_emails[:5])}")

    # Step 4: Build contact records
    contacts = []
    for email in all_emails:
        dept = determine_department(email)
        contacts.append({
            "state_id": tx_state_id,
            "county_id": county_id,
            "entity_name": county_name,
            "entity_type": "county",
            "department": dept,
            "email": email,
            "website_url": base_url,
            "campaign_status": "unsent",
        })

    # Step 5: Save to Supabase
    inserted = save_contacts(contacts, tx_state_id)
    print(f"      ✅ Saved {inserted} new contact(s)")
    return inserted


def main():
    print("=" * 60)
    print("🤠 Crownwood Chemicals — Texas County Email Spider")
    print("=" * 60)
    print()

    # Get all Texas counties
    tx_state_id, counties = get_texas_counties()
    print(f"📊 Found {len(counties)} Texas counties to scrape")
    print()

    total_contacts = 0
    counties_with_emails = 0
    counties_without_website = 0
    counties_without_emails = 0

    for i, county in enumerate(counties, 1):
        print(f"\n[{i}/{len(counties)}] {county['name']}")
        try:
            found = scrape_county(county, tx_state_id)
            if found > 0:
                counties_with_emails += 1
                total_contacts += found
            elif found == 0:
                counties_without_emails += 1
        except Exception as e:
            print(f"      ⚠️  Error: {e}")

        # Rate limiting — 1 second between counties
        time.sleep(1)

    print()
    print("=" * 60)
    print(f"✅ COMPLETE — Texas County Email Scrape")
    print(f"   Counties processed:     {len(counties)}")
    print(f"   Counties with emails:   {counties_with_emails}")
    print(f"   Counties without emails:{counties_without_emails}")
    print(f"   Total contacts saved:   {total_contacts}")
    print("=" * 60)


if __name__ == "__main__":
    main()
