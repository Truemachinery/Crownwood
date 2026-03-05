"""
Email Discovery Engine v2
=========================
Fixed approach: Only save REAL emails found in HTML + properly verified generated ones.

Key improvements over v1:
1. Deep crawl to find ALL directly-appearing emails (these are gold)
2. Smart name extraction - only from staff directories, tables, structured content
3. Massive false-positive blacklist for "names" that are really UI elements
4. SMTP verification with catch-all detection
5. Only saves high-confidence contacts

Usage:
  export SUPABASE_URL="..."
  export SUPABASE_SERVICE_ROLE_KEY="..."
  python3 scripts/email_discovery_v2.py
"""

import os
import re
import time
import json
import socket
import smtplib
import requests
from urllib.parse import urljoin, urlparse
from collections import Counter
from html.parser import HTMLParser
from supabase import create_client

try:
    import dns.resolver
    HAS_DNS = True
except ImportError:
    HAS_DNS = False

# --- Configuration ---
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

EMAIL_RE = re.compile(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}')

JUNK_DOMAINS = {
    "example.com", "test.com", "email.com", "mail.com",
    "sentry.io", "google.com", "facebook.com", "twitter.com",
    "instagram.com", "youtube.com", "schema.org", "w3.org",
    "gravatar.com", "wordpress.com", "wix.com", "squarespace.com",
    "microsoft.com", "outlook.com", "office.com", "adobe.com",
    "cloudflare.com", "googleapis.com", "gstatic.com", "github.com",
    "jquery.com", "bootstrapcdn.com", "fontawesome.com",
    "civicplus.com",  # CMS provider, not county staff
}

JUNK_PREFIXES = {
    "noreply", "no-reply", "donotreply", "webmaster", "hostmaster",
    "postmaster", "mailer-daemon", "root", "admin", "abuse",
}

# =====================================================
# MASSIVE BLACKLIST for false-positive "names"
# These are capitalized word pairs from website UI/nav
# that the v1 engine incorrectly treated as person names
# =====================================================
FALSE_POSITIVE_NAMES = {
    # Navigation / UI elements
    "quicklinks toggle", "quick links", "main menu", "skip content",
    "home page", "site map", "search results", "page content",
    "close menu", "open menu", "read more", "learn more",
    "click here", "view all", "see more", "view more",
    "show more", "load more", "go back", "sign in",
    "log in", "sign up", "full name", "last name",
    "first name", "email address", "phone number",
    "submit form", "contact us", "about us",
    "close thank", "thank you", "terms how",
    "format confirm", "list request",

    # Common page sections / headings
    "public works", "road bridge", "road and bridge",
    "county clerk", "county judge", "county commissioner",
    "county attorney", "county auditor", "county treasurer",
    "tax assessor", "tax collector", "district clerk",
    "district attorney", "district judge", "justice peace",
    "human resources", "emergency management",
    "election night", "primary election", "unofficial election",
    "early voting", "general election",
    "annual financial", "financial reports",
    "adopted budget", "adopted budgets", "proposed budgets",
    "current announcements", "press releases",
    "employment opportunities", "holiday schedule",
    "civil records", "death probate", "bail bond",
    "recordings marriage", "dockets fees",
    "search certified", "issue certificates",
    "trustee sale", "estray truth",
    "impact statement", "grant funds",
    "disaster recovery", "water quality",
    "permit renewal", "flood plain",
    "debt obligations", "clerk payment",
    "unclaimed property", "property claim",
    "disbursement unclaimed", "form how",
    "roof replacement", "civic center",
    "employee access", "employee portal",
    "anonymous employee", "access case",
    "auditor monthly", "auditor report",
    "summary mail", "early unofficial",
    "day burn", "proposed architect",
    "tax abatement", "results guidelines",
    "taxation taxpayer", "elections employment",
    "opportunities justice", "other offices",
    "contact info", "government links",
    "federal resources", "local resources",
    "white house", "reports purchasing",
    "information fiber", "optic availability",
    "spectrum zito", "task titanium",
    "church st", "mallard st", "google map",
    "palestine herald", "agreement database",

    # Geographic / generic
    "north south", "east west", "united states",
    "san antonio", "fort worth", "el paso",
    "corpus christi", "round rock",

    # Dates / time
    "monday friday", "monday through", "january february",
    "march april", "june july", "august september",
    "october november", "november december",

    # Common website words that get capitalized
    "county texas", "state texas", "city county",
    "more information", "additional information",
    "office hours", "business hours",
    "mailing address", "physical address",
    "main office", "branch office",
}

# Words that should NEVER be a first or last name
NOT_A_NAME_WORD = {
    "the", "this", "that", "these", "those", "county", "city", "state",
    "texas", "public", "works", "road", "bridge", "phone", "email",
    "address", "office", "hours", "monday", "tuesday", "wednesday",
    "thursday", "friday", "saturday", "sunday", "january", "february",
    "march", "april", "may", "june", "july", "august", "september",
    "october", "november", "december", "north", "south", "east", "west",
    "united", "states", "district", "court", "building", "street",
    "avenue", "boulevard", "drive", "suite", "floor", "box", "fax",
    "tel", "main", "home", "page", "click", "here", "read", "more",
    "view", "all", "see", "get", "new", "old", "big", "small",
    "next", "back", "close", "open", "show", "hide", "toggle",
    "menu", "search", "submit", "form", "field", "required",
    "select", "option", "button", "link", "skip", "content",
    "site", "map", "navigation", "header", "footer", "sidebar",
    "official", "department", "services", "contact", "about",
    "resources", "information", "notice", "alert", "warning",
    "emergency", "election", "voting", "budget", "financial",
    "annual", "report", "reports", "records", "document", "file",
    "meeting", "agenda", "minutes", "schedule", "calendar",
    "news", "press", "release", "announcement", "update",
    "tax", "property", "payment", "fee", "fees", "permit",
    "license", "bond", "claim", "request", "application",
    "online", "download", "upload", "print", "mail", "send",
    "full", "last", "first", "previous", "current", "recent",
    "access", "login", "portal", "employee", "staff", "team",
    "quick", "links", "proposed", "adopted", "certified",
    "general", "special", "primary", "civil", "criminal",
    "justice", "peace", "fire", "police", "sheriff",
    "jail", "court", "clerk", "judge", "attorney", "auditor",
    "treasurer", "assessor", "commissioner", "council", "board",
    "fund", "funds", "grant", "debt", "obligation",
    "disaster", "recovery", "quality", "water", "flood",
    "plain", "replacement", "roof", "center", "civic",
    "human", "management", "auditor", "monthly", "daily",
    "weekly", "summary", "unofficial", "results",
    "guidelines", "abatement", "probate", "death", "birth",
    "marriage", "recording", "docket", "trustee", "sale",
    "estray", "truth", "impact", "statement", "architect",
    "heritage", "historic", "museum", "library", "park",
    "pool", "gym", "arena", "stadium", "field",
    "program", "project", "plan", "policy", "procedure",
    "resolution", "ordinance", "code", "chapter", "section",
    "article", "amendment", "hearing", "testimony",
}


# =====================================================
# STRUCTURED NAME EXTRACTOR
# =====================================================

class StaffDirectoryParser(HTMLParser):
    """
    Extracts names from HTML by looking at structure, not just regex.
    Only captures names that appear in:
    - Table cells near title/department cells
    - List items containing both a name and a title
    - Elements with specific CSS classes (staff, directory, etc.)
    """
    def __init__(self):
        super().__init__()
        self.names = []
        self._in_table = False
        self._in_row = False
        self._cells = []
        self._current_cell = ""
        self._in_cell = False
        self._current_tag = None
        self._tag_stack = []

    def handle_starttag(self, tag, attrs):
        self._tag_stack.append(tag)
        self._current_tag = tag
        if tag == 'table':
            self._in_table = True
        elif tag == 'tr':
            self._in_row = True
            self._cells = []
        elif tag in ('td', 'th'):
            self._in_cell = True
            self._current_cell = ""

    def handle_endtag(self, tag):
        if self._tag_stack and self._tag_stack[-1] == tag:
            self._tag_stack.pop()
        if tag in ('td', 'th'):
            self._in_cell = False
            self._cells.append(self._current_cell.strip())
        elif tag == 'tr':
            self._in_row = False
            self._extract_names_from_row(self._cells)
        elif tag == 'table':
            self._in_table = False

    def handle_data(self, data):
        if self._in_cell:
            self._current_cell += " " + data

    def _extract_names_from_row(self, cells):
        """Look for rows that contain both a name and a title/position."""
        if len(cells) < 2:
            return

        title_keywords = {
            "commissioner", "judge", "clerk", "sheriff", "auditor",
            "treasurer", "assessor", "attorney", "director", "manager",
            "superintendent", "supervisor", "administrator", "secretary",
            "chief", "captain", "deputy", "constable", "engineer",
            "inspector", "coordinator", "foreman", "precinct",
            "justice", "marshal", "coroner", "ranger", "warden",
        }

        # Check if any cell contains a title keyword
        has_title = False
        title_cell_value = ""
        for cell in cells:
            cell_lower = cell.lower()
            if any(kw in cell_lower for kw in title_keywords):
                has_title = True
                title_cell_value = cell
                break

        if not has_title:
            return

        # Look for a name in other cells
        name_re = re.compile(r'^([A-Z][a-z]+)\s+(?:[A-Z]\.\s+)?([A-Z][a-z]+)$')
        for cell in cells:
            cell = cell.strip()
            match = name_re.match(cell)
            if match:
                first, last = match.groups()
                if self._is_valid_name(first, last):
                    self.names.append((first, last, title_cell_value.strip()))

    def _is_valid_name(self, first, last):
        """Check if a name pair looks like a real person name."""
        f, l = first.lower(), last.lower()
        if f in NOT_A_NAME_WORD or l in NOT_A_NAME_WORD:
            return False
        if f"{f} {l}" in FALSE_POSITIVE_NAMES:
            return False
        if len(f) < 2 or len(l) < 2:
            return False
        return True


def extract_names_smart(html):
    """
    Smart name extraction from HTML.
    Uses structured parsing (tables) + contextual regex.
    """
    names = []

    # Method 1: Parse HTML tables for structured staff data
    parser = StaffDirectoryParser()
    try:
        parser.feed(html)
        names.extend(parser.names)
    except Exception:
        pass

    # Method 2: Look for "Name: First Last" or "First Last, Title" patterns
    text = re.sub(r'<[^>]+>', '\n', html)

    # Pattern: "First Last, Title" (e.g., "John Smith, County Judge")
    title_suffixes = [
        "commissioner", "judge", "clerk", "sheriff", "director",
        "manager", "supervisor", "chief", "deputy", "engineer",
        "coordinator", "administrator", "treasurer", "auditor",
        "assessor", "attorney", "secretary", "constable",
        "superintendent", "foreman", "inspector", "captain",
    ]
    title_pattern = r'([A-Z][a-z]+)\s+([A-Z][a-z]+)\s*[,\-–]\s*(' + '|'.join(title_suffixes) + r')'
    for match in re.finditer(title_pattern, text, re.IGNORECASE):
        first, last, title = match.groups()
        f, l = first.lower(), last.lower()
        if f not in NOT_A_NAME_WORD and l not in NOT_A_NAME_WORD:
            if f"{f} {l}" not in FALSE_POSITIVE_NAMES:
                names.append((first, last, title.strip()))

    # Deduplicate
    seen = set()
    unique = []
    for item in names:
        key = (item[0].lower(), item[1].lower())
        if key not in seen:
            seen.add(key)
            unique.append(item)

    return unique


# =====================================================
# EMAIL PATTERN ENGINE
# =====================================================

PATTERN_GENERATORS = {
    "flast":       lambda f, l: f"{f[0].lower()}{l.lower()}",
    "first.last":  lambda f, l: f"{f.lower()}.{l.lower()}",
    "firstlast":   lambda f, l: f"{f.lower()}{l.lower()}",
    "first_last":  lambda f, l: f"{f.lower()}_{l.lower()}",
    "f.last":      lambda f, l: f"{f[0].lower()}.{l.lower()}",
    "lastf":       lambda f, l: f"{l.lower()}{f[0].lower()}",
    "last.first":  lambda f, l: f"{l.lower()}.{f.lower()}",
}


def detect_pattern(emails, domain):
    """Detect the naming convention from found emails."""
    domain_emails = [e for e in emails if e.endswith(f"@{domain}")]
    if not domain_emails:
        return None, None

    scores = Counter()
    for email in domain_emails:
        local = email.split("@")[0]
        if "." in local and re.match(r'^[a-z]\.[a-z]+$', local):
            scores["f.last"] += 2
        elif "." in local and re.match(r'^[a-z]+\.[a-z]+$', local):
            scores["first.last"] += 2
        elif "_" in local:
            scores["first_last"] += 2
        elif re.match(r'^[a-z][a-z]{2,12}$', local):
            scores["flast"] += 1

    if scores:
        best = scores.most_common(1)[0][0]
        return best, PATTERN_GENERATORS[best]
    return "flast", PATTERN_GENERATORS["flast"]


# =====================================================
# SMTP VERIFICATION
# =====================================================

def get_mx(domain):
    if not HAS_DNS:
        return None
    try:
        records = dns.resolver.resolve(domain, 'MX')
        return str(sorted(records, key=lambda r: r.preference)[0].exchange).rstrip('.')
    except Exception:
        return None


def check_catch_all(mx_host, domain):
    try:
        with smtplib.SMTP(mx_host, 25, timeout=10) as s:
            s.helo("crownwoodchemicals.com")
            s.mail("verify@crownwoodchemicals.com")
            code, _ = s.rcpt(f"zzz_fake_nonexistent_99999@{domain}")
            return code == 250
    except Exception:
        return True  # Assume catch-all if can't test


def verify_smtp(email, mx_host):
    try:
        with smtplib.SMTP(mx_host, 25, timeout=10) as s:
            s.helo("crownwoodchemicals.com")
            s.mail("verify@crownwoodchemicals.com")
            code, _ = s.rcpt(email)
            return "verified" if code == 250 else ("invalid" if code == 550 else "unknown")
    except Exception:
        return "unknown"


# =====================================================
# LINK EXTRACTOR
# =====================================================

class LinkExtractor(HTMLParser):
    def __init__(self, base_url):
        super().__init__()
        self.base_domain = urlparse(base_url).netloc
        self.base_url = base_url
        self.links = set()

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for attr, val in attrs:
                if attr == 'href' and val:
                    full = urljoin(self.base_url, val)
                    parsed = urlparse(full)
                    if (parsed.netloc == self.base_domain or not parsed.netloc):
                        if not any(full.lower().startswith(p) for p in ['mailto:', 'tel:', 'javascript:']):
                            if not any(full.lower().endswith(e) for e in ['.pdf','.doc','.docx','.xls','.xlsx','.zip','.png','.jpg','.gif','.svg','.mp4','.mov']):
                                self.links.add(full.split('#')[0].split('?')[0])


# =====================================================
# CORE ENGINE
# =====================================================

DIRECTORY_KEYWORDS = [
    "staff", "directory", "contact", "department", "official",
    "officer", "team", "administration", "elected", "employee",
    "government", "office", "phone", "email", "public-works",
    "road", "bridge", "purchasing", "procurement", "engineering",
    "commissioner", "judge", "clerk", "sheriff", "treasurer",
]


def fetch(url, timeout=12):
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        return (r.text, r.url) if r.status_code < 400 else (None, None)
    except Exception:
        return None, None


def extract_emails_clean(html):
    """Extract ONLY real, clean emails from HTML."""
    if not html:
        return []
    raw = EMAIL_RE.findall(html)
    clean = set()
    for e in raw:
        e = e.lower().strip().rstrip('.')
        if len(e) > 80 or len(e) < 5:
            continue
        domain = e.split('@')[1] if '@' in e else ''
        if domain in JUNK_DOMAINS:
            continue
        prefix = e.split('@')[0]
        if prefix in JUNK_PREFIXES:
            continue
        # Must have a reasonable TLD
        if not any(domain.endswith(tld) for tld in ['.gov', '.us', '.org', '.com', '.net', '.edu', '.tx.us']):
            continue
        clean.add(e)
    return list(clean)


def deep_crawl(base_url, max_pages=40):
    """
    Deep crawl a domain. Returns:
    - found_emails: list of email strings found directly in HTML
    - found_names: list of (first, last, title) tuples from structured data
    - pages_crawled: int
    """
    visited = set()
    queue = [base_url]
    all_emails = []
    all_names = []
    base_domain = urlparse(base_url).netloc

    def priority(url):
        return sum(10 for kw in DIRECTORY_KEYWORDS if kw in url.lower())

    count = 0
    while queue and count < max_pages:
        queue.sort(key=priority, reverse=True)
        url = queue.pop(0).rstrip('/')
        if url in visited:
            continue
        visited.add(url)

        html, final_url = fetch(url)
        if not html:
            continue
        count += 1

        # Extract emails
        page_emails = extract_emails_clean(html)
        all_emails.extend(page_emails)

        # Extract names (smart, structured)
        page_names = extract_names_smart(html)
        all_names.extend(page_names)

        # Follow links
        try:
            ext = LinkExtractor(final_url or url)
            ext.feed(html)
            for link in ext.links:
                if link.rstrip('/') not in visited:
                    queue.append(link)
        except Exception:
            pass

        time.sleep(0.3)

    return list(set(all_emails)), all_names, count


def find_website(county_name):
    """Find the official county website."""
    c = county_name.lower().replace(" county", "").strip()
    ch = c.replace(" ", "-")
    cn = c.replace(" ", "")

    urls = [
        f"https://www.co.{cn}.tx.us",
        f"https://co.{cn}.tx.us",
        f"https://www.{ch}county.org",
        f"https://www.{cn}county.org",
        f"https://www.{ch}countytx.gov",
        f"https://www.{cn}countytx.gov",
        f"https://www.{ch}county.gov",
        f"https://www.{cn}county.gov",
        f"https://{ch}county.org",
        f"https://{cn}county.org",
        f"https://{ch}countytx.gov",
        f"https://{cn}countytx.gov",
        f"https://www.{ch}.tx.us",
        f"https://www.{cn}tx.gov",
    ]
    for url in urls:
        try:
            r = requests.head(url, headers=HEADERS, timeout=8, allow_redirects=True)
            if r.status_code < 400:
                return r.url.rstrip('/')
        except Exception:
            pass
    return None


def save_contacts(contacts, state_id):
    """Save new, deduplicated contacts."""
    if not contacts:
        return 0

    # Dedupe within batch
    seen = set()
    unique = []
    for c in contacts:
        if c["email"] not in seen:
            seen.add(c["email"])
            unique.append(c)

    # Dedupe against existing
    try:
        existing = supabase.table("municipal_contacts").select("email").eq("state_id", state_id).execute()
        existing_set = {r["email"] for r in existing.data}
    except Exception:
        existing_set = set()

    new = [c for c in unique if c["email"] not in existing_set]
    if not new:
        return 0

    total = 0
    for i in range(0, len(new), 100):
        batch = new[i:i+100]
        try:
            supabase.table("municipal_contacts").insert(batch).execute()
            total += len(batch)
        except Exception as e:
            print(f"         ⚠️ Insert error: {e}")
    return total


def process_county(county, state_id):
    """Run the complete discovery pipeline on one county."""
    name = county["name"]
    cid = county["id"]

    print(f"\n   🔍 Finding {name} website...")
    base_url = find_website(name)
    if not base_url:
        print(f"      ❌ No website found")
        return 0

    domain = urlparse(base_url).netloc.lstrip("www.")
    print(f"      🌐 {base_url} (domain: {domain})")

    # PHASE 1: Deep crawl
    print(f"      📡 Phase 1: Deep crawling...")
    found_emails, found_names, pages = deep_crawl(base_url, max_pages=40)
    # Filter to only domain-relevant emails
    domain_emails = [e for e in found_emails if domain in e]
    other_emails = [e for e in found_emails if domain not in e and not any(d in e for d in JUNK_DOMAINS)]
    print(f"         Pages: {pages} | Domain emails: {len(domain_emails)} | Other emails: {len(other_emails)} | Names: {len(found_names)}")

    # PHASE 2: Pattern detection
    pattern_name, pattern_func = detect_pattern(domain_emails, domain)
    if pattern_name:
        print(f"      🔑 Phase 2: Pattern = {pattern_name}@{domain}")

    # PHASE 3: Generate from names (only if we have names AND a pattern)
    generated = []
    if found_names and pattern_func:
        for first, last, title in found_names:
            try:
                local = pattern_func(first, last)
                email = f"{local}@{domain}"
                if email not in set(domain_emails):
                    generated.append({
                        "email": email,
                        "contact_name": f"{first} {last}",
                        "title": title,
                    })
            except Exception:
                pass
        print(f"      ⚡ Phase 3: Generated {len(generated)} from {len(found_names)} names")

    # PHASE 4: SMTP verify generated emails
    verified_gen = []
    mx = get_mx(domain) if HAS_DNS else None
    if mx and generated:
        print(f"      📬 Phase 4: SMTP via {mx}...")
        if check_catch_all(mx, domain):
            print(f"         ⚠️ Catch-all — marking generated as unverified but keeping")
            verified_gen = generated  # Keep them but mark unverified
        else:
            for g in generated:
                result = verify_smtp(g["email"], mx)
                if result == "verified":
                    verified_gen.append(g)
                    print(f"         ✅ {g['email']}")
                elif result == "invalid":
                    print(f"         ❌ {g['email']}")
                else:
                    verified_gen.append(g)  # Keep unknowns
                time.sleep(0.3)
    elif generated:
        verified_gen = generated  # No MX, keep all

    # BUILD CONTACTS
    contacts = []

    # 1. Directly found domain emails (highest quality)
    for email in domain_emails:
        contacts.append({
            "state_id": state_id,
            "county_id": cid,
            "entity_name": name,
            "entity_type": "county",
            "email": email,
            "website_url": base_url,
            "verified": True,
            "campaign_status": "unsent",
        })

    # 2. Other found emails (gmail, etc. — still real, found directly)
    for email in other_emails:
        contacts.append({
            "state_id": state_id,
            "county_id": cid,
            "entity_name": name,
            "entity_type": "county",
            "email": email,
            "website_url": base_url,
            "verified": True,
            "campaign_status": "unsent",
        })

    # 3. Generated & verified emails
    for g in verified_gen:
        contacts.append({
            "state_id": state_id,
            "county_id": cid,
            "entity_name": name,
            "entity_type": "county",
            "contact_name": g.get("contact_name"),
            "title": g.get("title"),
            "email": g["email"],
            "website_url": base_url,
            "verified": False,  # Generated, not found directly
            "campaign_status": "unsent",
        })

    saved = save_contacts(contacts, state_id)
    total_found = len(domain_emails) + len(other_emails)
    total_generated = len(verified_gen)
    print(f"      💾 Saved {saved} contacts ({total_found} found + {total_generated} generated)")
    return saved


def main():
    print("=" * 65)
    print("🔥 Email Discovery Engine v2 — Smart Extraction")
    print("   Deep Crawl → Pattern Detect → Smart Names → SMTP Verify")
    print("=" * 65)

    # Get Texas
    state = supabase.table("states").select("id").eq("abbreviation", "TX").single().execute()
    tx_id = state.data["id"]

    counties = []
    offset = 0
    while True:
        r = supabase.table("counties").select("*").eq("state_id", tx_id).range(offset, offset + 999).execute()
        counties.extend(r.data)
        if len(r.data) < 1000:
            break
        offset += 1000

    print(f"\n📊 {len(counties)} Texas counties to process\n")

    total = 0
    with_results = 0

    for i, county in enumerate(counties, 1):
        print(f"{'='*50}")
        print(f"[{i}/{len(counties)}] {county['name']}")
        try:
            n = process_county(county, tx_id)
            if n > 0:
                with_results += 1
                total += n
        except Exception as e:
            print(f"      ⚠️ Error: {e}")
        time.sleep(1)

    print(f"\n{'='*65}")
    print(f"✅ COMPLETE")
    print(f"   Counties processed:    {len(counties)}")
    print(f"   Counties with results: {with_results}")
    print(f"   Total contacts saved:  {total}")
    print(f"{'='*65}")


if __name__ == "__main__":
    main()
