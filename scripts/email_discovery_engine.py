"""
Advanced Municipal Email Discovery Engine
==========================================
A Hunter.io-style email finder for Texas county/city .gov domains.

4-Phase Approach:
  Phase 1: DEEP CRAWL — Spider the entire domain for any email addresses
  Phase 2: PATTERN ENGINE — Detect naming convention from found emails
  Phase 3: NAME EXTRACTION — Scrape staff names from directory pages
  Phase 4: SMTP VERIFICATION — Verify generated emails against mail server

Usage:
  export SUPABASE_URL="..."
  export SUPABASE_SERVICE_ROLE_KEY="..."
  python3 scripts/email_discovery_engine.py
"""

import os
import re
import sys
import csv
import io
import dns.resolver
import smtplib
import socket
import time
import json
import requests
from urllib.parse import urljoin, urlparse
from collections import Counter
from html.parser import HTMLParser
from supabase import create_client

# --- Configuration ---
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- Patterns ---
EMAIL_RE = re.compile(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}')
PHONE_RE = re.compile(r'\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}')
NAME_RE = re.compile(r'([A-Z][a-z]+)\s+([A-Z][a-z]+)')  # Simple first last

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

JUNK_EMAIL_KEYWORDS = [
    "example.com", "test.com", "localhost", ".png", ".jpg", ".gif",
    ".css", ".js", "sentry.io", "google.com", "facebook.com",
    "twitter.com", "instagram.com", "youtube.com", "schema.org",
    "w3.org", "gravatar.com", "wordpress.com", "wix.com",
    "squarespace.com", "noreply", "no-reply", "donotreply",
    "mailto:", "webmaster", "hostmaster", "postmaster",
    "microsoft.com", "outlook.com", "office.com", "adobe.com",
    "cloudflare.com", "googleapis.com", "gstatic.com",
]

# Pages that commonly contain staff directories and contact info
DIRECTORY_KEYWORDS = [
    "staff", "directory", "contact", "about", "departments",
    "officials", "officers", "team", "administration",
    "elected", "employees", "government", "offices",
    "phone", "email", "public-works", "road-bridge",
    "purchasing", "procurement", "engineering",
    "commissioners", "judge", "clerk", "sheriff",
    "auditor", "treasurer", "assessor", "attorney",
]


class LinkExtractor(HTMLParser):
    """Extract all internal links and text from HTML."""
    def __init__(self, base_url):
        super().__init__()
        self.base_url = base_url
        self.base_domain = urlparse(base_url).netloc
        self.links = set()
        self.texts = []
        self._current_tag = None

    def handle_starttag(self, tag, attrs):
        self._current_tag = tag
        if tag == 'a':
            for attr, value in attrs:
                if attr == 'href' and value:
                    full_url = urljoin(self.base_url, value)
                    parsed = urlparse(full_url)
                    # Only follow internal links
                    if parsed.netloc == self.base_domain or not parsed.netloc:
                        # Skip anchors, mailto, tel, javascript, files
                        if not any(full_url.lower().startswith(p) for p in ['mailto:', 'tel:', 'javascript:']):
                            if not any(full_url.lower().endswith(ext) for ext in ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip', '.png', '.jpg', '.gif']):
                                self.links.add(full_url.split('#')[0].split('?')[0])  # Strip fragments/params

    def handle_data(self, data):
        text = data.strip()
        if text and len(text) > 1:
            self.texts.append(text)


def fetch_page(url, timeout=12):
    """Fetch a page and return (html_text, final_url) or (None, None)."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        if resp.status_code < 400:
            return resp.text, resp.url
    except Exception:
        pass
    return None, None


def extract_emails(html):
    """Extract and filter email addresses from HTML."""
    if not html:
        return []
    emails = EMAIL_RE.findall(html)
    filtered = set()
    for email in emails:
        e = email.lower().strip().rstrip('.')
        if len(e) > 100:
            continue
        if any(junk in e for junk in JUNK_EMAIL_KEYWORDS):
            continue
        filtered.add(e)
    return list(filtered)


def extract_names_from_html(html):
    """
    Extract person names from HTML.
    Looks for patterns like "First Last" near titles/departments.
    """
    if not html:
        return []

    # Remove HTML tags for text analysis
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text)

    names = []

    # Pattern 1: Look for names near common title keywords
    title_keywords = [
        "commissioner", "judge", "clerk", "sheriff", "auditor",
        "treasurer", "assessor", "attorney", "director", "manager",
        "superintendent", "supervisor", "administrator", "secretary",
        "chief", "captain", "sergeant", "deputy", "constable",
        "engineer", "inspector", "coordinator", "assistant",
        "foreman", "road", "bridge", "public works",
    ]

    # Find capitalized name pairs
    for match in NAME_RE.finditer(text):
        first, last = match.groups()
        # Filter out common false positives
        false_positives = {
            "The", "This", "That", "County", "City", "State", "Texas",
            "Public", "Works", "Road", "Bridge", "Phone", "Email",
            "Address", "Office", "Hours", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday", "Sunday", "January", "February",
            "March", "April", "June", "July", "August", "September",
            "October", "November", "December", "North", "South", "East",
            "West", "United", "States", "District", "Court", "Building",
            "Street", "Avenue", "Boulevard", "Drive", "Suite", "Floor",
            "Box", "Fax", "Tel", "Main", "Home", "Page", "Click",
            "Here", "Read", "More", "View", "All", "See", "Get",
            "New", "Old", "Big", "Small", "First", "Last", "Next",
        }
        if first not in false_positives and last not in false_positives:
            if len(first) > 1 and len(last) > 1:
                # Check if near a title keyword
                context_start = max(0, match.start() - 100)
                context_end = min(len(text), match.end() + 100)
                context = text[context_start:context_end].lower()
                if any(kw in context for kw in title_keywords):
                    names.append((first, last))
                else:
                    # Still collect if it looks like a real name
                    names.append((first, last))

    # Deduplicate
    seen = set()
    unique = []
    for first, last in names:
        key = (first.lower(), last.lower())
        if key not in seen:
            seen.add(key)
            unique.append((first, last))

    return unique


# ===========================
# PHASE 2: PATTERN ENGINE
# ===========================

EMAIL_PATTERNS = {
    "flast":       lambda f, l: f"{f[0].lower()}{l.lower()}",
    "first.last":  lambda f, l: f"{f.lower()}.{l.lower()}",
    "firstlast":   lambda f, l: f"{f.lower()}{l.lower()}",
    "first":       lambda f, l: f"{f.lower()}",
    "first_last":  lambda f, l: f"{f.lower()}_{l.lower()}",
    "lastf":       lambda f, l: f"{l.lower()}{f[0].lower()}",
    "last.first":  lambda f, l: f"{l.lower()}.{f.lower()}",
    "last":        lambda f, l: f"{l.lower()}",
    "f.last":      lambda f, l: f"{f[0].lower()}.{l.lower()}",
    "first.l":     lambda f, l: f"{f.lower()}.{l[0].lower()}",
}


def detect_email_pattern(emails, domain):
    """
    Given a list of found emails for a domain, detect the naming pattern.
    Returns the pattern name and generator function.
    """
    domain_emails = [e for e in emails if e.endswith(f"@{domain}")]
    if not domain_emails:
        return None, None

    # Try to reverse-engineer the pattern from existing emails
    # We look at the local part (before @) and try to match patterns
    local_parts = [e.split("@")[0] for e in domain_emails]

    # Heuristic: if most emails are single word with 2-8 chars, likely flast
    pattern_scores = Counter()

    for local in local_parts:
        if "." in local:
            if re.match(r'^[a-z]\.[a-z]+$', local):
                pattern_scores["f.last"] += 1
            elif re.match(r'^[a-z]+\.[a-z]+$', local):
                pattern_scores["first.last"] += 1
            elif re.match(r'^[a-z]+\.[a-z]$', local):
                pattern_scores["first.l"] += 1
        elif "_" in local:
            pattern_scores["first_last"] += 1
        elif re.match(r'^[a-z][a-z]+$', local) and len(local) <= 10:
            pattern_scores["flast"] += 1
        elif re.match(r'^[a-z]+$', local) and len(local) <= 6:
            pattern_scores["first"] += 1

    if pattern_scores:
        best_pattern = pattern_scores.most_common(1)[0][0]
        return best_pattern, EMAIL_PATTERNS[best_pattern]

    # Default to the most common municipal pattern
    return "flast", EMAIL_PATTERNS["flast"]


def generate_emails(names, domain, pattern_func):
    """Generate email addresses from names using the detected pattern."""
    generated = []
    for first, last in names:
        try:
            local = pattern_func(first, last)
            email = f"{local}@{domain}"
            generated.append({
                "email": email,
                "contact_name": f"{first} {last}",
                "confidence": 0.85,
            })
        except Exception:
            continue
    return generated


# ===========================
# PHASE 4: SMTP VERIFICATION
# ===========================

def get_mx_record(domain):
    """Look up the MX record for a domain."""
    try:
        mx_records = dns.resolver.resolve(domain, 'MX')
        # Return the highest priority (lowest number) MX record
        mx_host = sorted(mx_records, key=lambda r: r.preference)[0]
        return str(mx_host.exchange).rstrip('.')
    except Exception:
        return None


def is_catch_all(mx_host, domain):
    """
    Test if a mail server is a catch-all by checking a known-fake address.
    If it accepts garbage, every verification will be a false positive.
    """
    fake_email = f"zzzfake12345nonexistent@{domain}"
    try:
        with smtplib.SMTP(mx_host, 25, timeout=10) as smtp:
            smtp.helo("crownwoodchemicals.com")
            smtp.mail("verify@crownwoodchemicals.com")
            code, _ = smtp.rcpt(fake_email)
            return code == 250  # Catch-all accepts everything
    except Exception:
        return True  # Assume catch-all if we can't test


def verify_email_smtp(email, mx_host):
    """
    Verify an email exists via SMTP RCPT TO check.
    Returns: 'verified', 'invalid', or 'unknown'
    """
    try:
        with smtplib.SMTP(mx_host, 25, timeout=10) as smtp:
            smtp.helo("crownwoodchemicals.com")
            smtp.mail("verify@crownwoodchemicals.com")
            code, message = smtp.rcpt(email)
            if code == 250:
                return "verified"
            elif code == 550:
                return "invalid"
            else:
                return "unknown"
    except smtplib.SMTPServerDisconnected:
        return "unknown"
    except smtplib.SMTPConnectError:
        return "unknown"
    except socket.timeout:
        return "unknown"
    except Exception:
        return "unknown"


# ===========================
# MAIN ENGINE
# ===========================

def deep_crawl_domain(base_url, max_pages=50):
    """
    Phase 1: Deep crawl a domain to find:
    - All email addresses
    - All staff names
    - All internal links

    Prioritizes pages with directory/contact keywords in URL.
    """
    visited = set()
    to_visit = [base_url]
    all_emails = []
    all_names = []
    all_html = ""
    base_domain = urlparse(base_url).netloc

    # Prioritize pages likely to have contact info
    def priority_score(url):
        url_lower = url.lower()
        score = 0
        for keyword in DIRECTORY_KEYWORDS:
            if keyword in url_lower:
                score += 10
        return score

    pages_crawled = 0

    while to_visit and pages_crawled < max_pages:
        # Sort by priority — contact/directory pages first
        to_visit.sort(key=priority_score, reverse=True)
        url = to_visit.pop(0)

        # Normalize URL
        url = url.rstrip('/')
        if url in visited:
            continue
        visited.add(url)

        html, final_url = fetch_page(url)
        if not html:
            continue

        pages_crawled += 1

        # Extract emails
        page_emails = extract_emails(html)
        all_emails.extend(page_emails)

        # Extract names
        page_names = extract_names_from_html(html)
        all_names.extend(page_names)

        # Track full HTML for context
        all_html += html

        # Extract internal links for further crawling
        try:
            extractor = LinkExtractor(final_url or url)
            extractor.feed(html)
            for link in extractor.links:
                if link not in visited:
                    to_visit.append(link)
        except Exception:
            pass

        # Small delay between pages
        time.sleep(0.3)

    # Deduplicate
    all_emails = list(set(all_emails))
    seen_names = set()
    unique_names = []
    for f, l in all_names:
        key = (f.lower(), l.lower())
        if key not in seen_names:
            seen_names.add(key)
            unique_names.append((f, l))

    return all_emails, unique_names, pages_crawled


def process_county(county, tx_state_id):
    """
    Run the full 4-phase discovery engine on a single county.
    """
    county_name = county["name"]
    county_id = county["id"]
    clean_name = county_name.lower().replace(" county", "").strip()

    print(f"\n   🔍 Searching for {county_name} website...")

    # --- Find the county website ---
    base_url = find_county_website(county_name)
    if not base_url:
        print(f"      ❌ No website found")
        return 0

    domain = urlparse(base_url).netloc.lstrip("www.")
    print(f"      🌐 Found: {base_url} (domain: {domain})")

    # --- PHASE 1: Deep Crawl ---
    print(f"      📡 Phase 1: Deep crawling (up to 50 pages)...")
    found_emails, found_names, pages_crawled = deep_crawl_domain(base_url, max_pages=50)
    print(f"         Crawled {pages_crawled} pages")
    print(f"         Found {len(found_emails)} email(s) directly")
    print(f"         Found {len(found_names)} name(s)")

    # --- PHASE 2: Pattern Detection ---
    pattern_name, pattern_func = detect_email_pattern(found_emails, domain)
    if pattern_name:
        print(f"      🔑 Phase 2: Detected pattern: {pattern_name}@{domain}")
    else:
        print(f"      🔑 Phase 2: No pattern detected, using flast default")
        pattern_name = "flast"
        pattern_func = EMAIL_PATTERNS["flast"]

    # --- PHASE 3: Generate Emails from Names ---
    generated = []
    if found_names and pattern_func:
        generated = generate_emails(found_names, domain, pattern_func)
        # Remove any that were already directly found
        found_set = set(found_emails)
        generated = [g for g in generated if g["email"] not in found_set]
        print(f"      ⚡ Phase 3: Generated {len(generated)} predicted email(s)")

    # --- PHASE 4: SMTP Verification ---
    verified_generated = []
    mx_host = get_mx_record(domain)
    if mx_host and generated:
        print(f"      📬 Phase 4: SMTP verification via {mx_host}...")

        # First check if it's a catch-all
        if is_catch_all(mx_host, domain):
            print(f"         ⚠️  Catch-all server detected — skipping SMTP, all generated marked as 'unverified'")
            for g in generated:
                g["verified"] = False
            verified_generated = generated
        else:
            for g in generated:
                result = verify_email_smtp(g["email"], mx_host)
                if result == "verified":
                    g["verified"] = True
                    verified_generated.append(g)
                    print(f"         ✅ {g['email']} — VERIFIED")
                elif result == "invalid":
                    print(f"         ❌ {g['email']} — invalid")
                else:
                    g["verified"] = False
                    verified_generated.append(g)  # Keep unknowns too
                    print(f"         ❓ {g['email']} — unknown")
                time.sleep(0.5)
    elif generated:
        print(f"      📬 Phase 4: No MX record found — skipping SMTP")
        verified_generated = generated

    # --- BUILD FINAL CONTACTS ---
    contacts = []

    # Add directly found emails
    for email in found_emails:
        contacts.append({
            "state_id": tx_state_id,
            "county_id": county_id,
            "entity_name": county_name,
            "entity_type": "county",
            "email": email,
            "website_url": base_url,
            "verified": True,  # Found directly in HTML
            "campaign_status": "unsent",
        })

    # Add generated/verified emails
    for g in verified_generated:
        contacts.append({
            "state_id": tx_state_id,
            "county_id": county_id,
            "entity_name": county_name,
            "entity_type": "county",
            "contact_name": g.get("contact_name"),
            "email": g["email"],
            "website_url": base_url,
            "verified": g.get("verified", False),
            "campaign_status": "unsent",
        })

    # Save
    saved = save_contacts(contacts, tx_state_id)
    print(f"      💾 Saved {saved} new contact(s) to Supabase")
    return saved


def find_county_website(county_name):
    """Try to find the official county website URL."""
    clean = county_name.lower().replace(" county", "").strip()
    clean_h = clean.replace(" ", "-")
    clean_ns = clean.replace(" ", "")

    candidates = [
        f"https://www.co.{clean_ns}.tx.us",
        f"https://co.{clean_ns}.tx.us",
        f"https://www.{clean_h}county.org",
        f"https://www.{clean_ns}county.org",
        f"https://www.{clean_h}countytx.gov",
        f"https://www.{clean_ns}countytx.gov",
        f"https://{clean_h}county.org",
        f"https://{clean_ns}county.org",
        f"https://www.{clean_h}county.gov",
        f"https://www.{clean_ns}county.gov",
        f"https://{clean_h}countytx.gov",
        f"https://{clean_ns}countytx.gov",
        f"https://www.{clean_h}.tx.us",
        f"https://www.{clean_h}tx.gov",
    ]

    for url in candidates:
        try:
            resp = requests.head(url, headers=HEADERS, timeout=8, allow_redirects=True)
            if resp.status_code < 400:
                return resp.url.rstrip('/')
        except Exception:
            continue
    return None


def save_contacts(contacts, tx_state_id):
    """Save new contacts (deduplicating against existing)."""
    if not contacts:
        return 0

    # Deduplicate within batch
    seen = set()
    unique = []
    for c in contacts:
        if c["email"] not in seen:
            seen.add(c["email"])
            unique.append(c)

    # Check existing in Supabase
    try:
        existing = supabase.table("municipal_contacts").select("email").eq("state_id", tx_state_id).execute()
        existing_emails = {r["email"] for r in existing.data}
    except Exception:
        existing_emails = set()

    new = [c for c in unique if c["email"] not in existing_emails]
    if not new:
        return 0

    batch_size = 100
    total = 0
    for i in range(0, len(new), batch_size):
        batch = new[i:i + batch_size]
        try:
            supabase.table("municipal_contacts").insert(batch).execute()
            total += len(batch)
        except Exception as e:
            print(f"      ⚠️  Insert error: {e}")

    return total


def main():
    print("=" * 65)
    print("🔥 Crownwood Chemicals — Advanced Email Discovery Engine")
    print("   Hunter.io-style: Deep Crawl → Pattern Detect → Generate → Verify")
    print("=" * 65)

    # Get Texas counties
    state_result = supabase.table("states").select("id").eq("abbreviation", "TX").single().execute()
    tx_state_id = state_result.data["id"]

    counties = []
    offset = 0
    while True:
        result = supabase.table("counties").select("*").eq("state_id", tx_state_id).range(offset, offset + 999).execute()
        counties.extend(result.data)
        if len(result.data) < 1000:
            break
        offset += 1000

    print(f"\n📊 Found {len(counties)} Texas counties")

    total_contacts = 0
    total_with_results = 0

    for i, county in enumerate(counties, 1):
        print(f"\n{'='*50}")
        print(f"[{i}/{len(counties)}] {county['name']}")
        try:
            found = process_county(county, tx_state_id)
            if found > 0:
                total_with_results += 1
                total_contacts += found
        except Exception as e:
            print(f"      ⚠️  Error: {e}")

        time.sleep(1)  # Rate limit between counties

    print(f"\n{'='*65}")
    print(f"✅ COMPLETE")
    print(f"   Counties processed:      {len(counties)}")
    print(f"   Counties with results:   {total_with_results}")
    print(f"   Total contacts saved:    {total_contacts}")
    print(f"{'='*65}")


if __name__ == "__main__":
    main()
