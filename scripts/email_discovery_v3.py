"""
Email Discovery Engine v3.1
===========================
Full 6-phase pipeline:
  Phase 1:  Deep Crawl (mailto + Cloudflare decode + body regex)
  Phase 1b: LinkedIn name discovery (via DDG site:linkedin.com)
  Phase 2:  Pattern detection + caching
  Phase 3:  Name → email generation (sanitized)
  Phase 4:  SMTP verification (with catch-all caching)
  Phase 5:  Intelligence sweep (Google dork + PDF extraction) [--deep only]

Usage:
  export SUPABASE_URL="..."
  export SUPABASE_SERVICE_ROLE_KEY="..."

  # Fast pass (Phases 1-4 only)
  python3 scripts/email_discovery_v3.py

  # Deep pass (all 6 phases)
  python3 scripts/email_discovery_v3.py --deep

  # Target specific counties
  python3 scripts/email_discovery_v3.py --counties "Bexar County" "Harris County"

  # Force re-crawl (ignore last_crawled_at)
  python3 scripts/email_discovery_v3.py --force --counties "Bexar County"

  # Different state
  python3 scripts/email_discovery_v3.py --state CA
"""

import os
import re
import time
import json
import random
import socket
import smtplib
import argparse
# asyncio removed — not needed for ThreadPoolExecutor approach
import requests   # kept for PDF byte downloads only
from datetime import datetime, timezone
from urllib.parse import urljoin, urlparse, unquote
from collections import Counter
from html.parser import HTMLParser
from supabase import create_client

try:
    import dns.resolver
    HAS_DNS = True
except ImportError:
    HAS_DNS = False

# --- Scrapling (only for JS-rendered page fallback) ---
try:
    from scrapling.fetchers import Fetcher, StealthyFetcher
    from scrapling.parser import Adaptor
    HAS_SCRAPLING = True
except ImportError:
    HAS_SCRAPLING = False
    print("⚠️  Scrapling not installed — falling back to raw requests")

# --- DuckDuckGo Search ---
try:
    from ddgs import DDGS
    HAS_DDG = True
except ImportError:
    try:
        from duckduckgo_search import DDGS
        HAS_DDG = True
    except ImportError:
        HAS_DDG = False
        print("⚠️  ddgs not installed — search disabled (pip3 install ddgs)")

# --- Config ---
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

# Stealth fetch defaults — disable_resources blocks images/fonts/CSS
# to speed up crawls (v0.2.99 doesn't support domain-level blocking)
STEALTH_DEFAULTS = {
    "headless": True,
    "network_idle": True,
    "block_images": True,
    "disable_resources": True,
}

EMAIL_RE = re.compile(r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}')

MAX_PDF_BYTES = 8 * 1024 * 1024  # 8MB cap for PDF downloads


# Global flag — set by --no-search to skip all search phases
search_disabled = False


def ddg_search(query, max_results=5):
    """Search via DuckDuckGo. Lightweight, no browser, handles rate limiting."""
    if not HAS_DDG or search_disabled:
        return ("blocked", [])
    try:
        with DDGS() as ddg:
            results = list(ddg.text(query, max_results=max_results))
            time.sleep(random.uniform(3, 5))
            return ("ok", [{"title": r.get("title", ""), "href": r.get("href", ""), "body": r.get("body", "")} for r in results])
    except Exception as e:
        if "ratelimit" in str(e).lower():
            return ("blocked", [])
        return ("error", [])

JUNK_DOMAINS = {
    "example.com", "test.com", "email.com", "mail.com",
    "sentry.io", "google.com", "facebook.com", "twitter.com",
    "instagram.com", "youtube.com", "schema.org", "w3.org",
    "gravatar.com", "wordpress.com", "wix.com", "squarespace.com",
    "microsoft.com", "outlook.com", "office.com", "adobe.com",
    "cloudflare.com", "googleapis.com", "gstatic.com", "github.com",
    "jquery.com", "bootstrapcdn.com", "fontawesome.com",
    "civicplus.com", "revize.com", "municode.com", "granicus.com",
}

JUNK_PREFIXES = {
    "noreply", "no-reply", "donotreply", "webmaster", "hostmaster",
    "postmaster", "mailer-daemon", "root", "abuse",
}

# Department relevance scoring for our products
DEPT_RELEVANCE = {
    # High relevance (10) — primary targets for Permabase, MeltDown, PHPM-50
    "public works": 10, "road and bridge": 10, "road & bridge": 10,
    "road bridge": 10, "streets": 10, "transportation": 9,
    "engineering": 9, "county engineer": 10, "city engineer": 10,
    "infrastructure": 9, "highway": 9, "maintenance": 8,
    # Medium relevance (7) — procurement decision makers
    "purchasing": 8, "procurement": 8, "fleet": 7,
    "utilities": 6, "parks": 6, "facilities": 6,
    # Lower relevance (4) — general contacts worth having
    "administration": 4, "county judge": 5, "city manager": 5,
    "commissioner": 4, "general": 3,
}

# Words that can never be part of a person name
NOT_A_NAME = {
    "the", "this", "that", "county", "city", "state", "texas",
    "public", "works", "road", "bridge", "phone", "email", "fax",
    "address", "office", "hours", "contact", "about", "home",
    "page", "click", "here", "read", "more", "view", "see",
    "menu", "search", "submit", "form", "close", "open",
    "toggle", "quick", "links", "main", "skip", "content",
    "site", "map", "navigation", "header", "footer",
    "department", "services", "resources", "information",
    "notice", "alert", "warning", "emergency", "election",
    "budget", "financial", "annual", "report", "records",
    "meeting", "agenda", "minutes", "schedule", "calendar",
    "news", "press", "release", "announcement", "update",
    "tax", "property", "payment", "fee", "permit", "license",
    "online", "download", "upload", "print", "mail", "send",
    "access", "login", "portal", "employee", "staff", "team",
    "proposed", "adopted", "certified", "official", "general",
    "monday", "tuesday", "wednesday", "thursday", "friday",
    "saturday", "sunday", "january", "february", "march",
    "april", "may", "june", "july", "august", "september",
    "october", "november", "december", "north", "south",
    "east", "west", "st", "ave", "blvd", "dr", "ln", "rd",
    "suite", "floor", "box", "building", "center", "civic",
    "court", "district", "board", "council", "precinct",
    "human", "management", "auditor", "daily", "weekly",
    "monthly", "summary", "results", "guidelines", "probate",
    "death", "birth", "marriage", "abatement", "heritage",
    "disaster", "recovery", "quality", "water", "flood",
    "roof", "replacement", "architect", "task", "full",
    "last", "first", "previous", "current", "recent", "next",
    "back", "federal", "local", "unclaimed", "google",
    "help", "faq", "terms", "privacy", "legal", "disclaimer",
    "copyright", "rights", "reserved", "powered",
}


# =====================================================
# MAILTO EXTRACTOR (HIGH CONFIDENCE)
# =====================================================

class MailtoExtractor(HTMLParser):
    """Extract mailto: link emails — these are intentionally published."""
    def __init__(self):
        super().__init__()
        self.mailto_emails = []
        self._current_context = ""

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for attr, val in attrs:
                if attr == 'href' and val and val.lower().startswith('mailto:'):
                    email = val[7:].split('?')[0].strip().lower()
                    if EMAIL_RE.match(email):
                        self.mailto_emails.append(email)


# =====================================================
# BROAD NAME EXTRACTOR
# =====================================================

class BroadNameExtractor(HTMLParser):
    """
    Extracts names from multiple HTML structures:
    1. Table rows with title keywords
    2. Divs/spans with staff-related class names
    3. H3/H4 tags followed by title text
    4. List items containing name + title patterns
    """
    def __init__(self):
        super().__init__()
        self.names = []  # (first, last, title, source)
        self._tag_stack = []
        self._attrs_stack = []
        self._text_buffer = ""
        self._in_table = False
        self._in_row = False
        self._cells = []
        self._current_cell = ""
        self._in_cell = False
        # For div/li based extraction
        self._in_staff_container = False
        self._container_text = ""

    STAFF_CLASS_KEYWORDS = [
        "staff", "directory", "team", "member", "employee",
        "official", "person", "contact", "bio",
    ]

    TITLE_KEYWORDS = {
        "commissioner", "judge", "clerk", "sheriff", "auditor",
        "treasurer", "assessor", "attorney", "director", "manager",
        "superintendent", "supervisor", "administrator", "secretary",
        "chief", "captain", "deputy", "constable", "engineer",
        "inspector", "coordinator", "foreman", "precinct",
        "justice", "marshal", "coroner", "warden", "fire",
        "police", "ems", "dispatch", "maintenance", "roads",
    }

    def handle_starttag(self, tag, attrs):
        self._tag_stack.append(tag)
        attr_dict = dict(attrs)
        self._attrs_stack.append(attr_dict)

        # Check for staff-related container classes
        class_val = attr_dict.get('class', '').lower()
        id_val = attr_dict.get('id', '').lower()
        if tag in ('div', 'li', 'section', 'article'):
            if any(kw in class_val or kw in id_val for kw in self.STAFF_CLASS_KEYWORDS):
                self._in_staff_container = True
                self._container_text = ""

        # Table handling
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
            self._attrs_stack.pop() if self._attrs_stack else None

        if tag in ('td', 'th'):
            self._in_cell = False
            self._cells.append(self._current_cell.strip())
        elif tag == 'tr':
            self._in_row = False
            self._extract_from_table_row(self._cells)
        elif tag == 'table':
            self._in_table = False
        elif tag in ('div', 'li', 'section', 'article') and self._in_staff_container:
            self._in_staff_container = False
            self._extract_from_container(self._container_text)

    def handle_data(self, data):
        text = data.strip()
        if self._in_cell:
            self._current_cell += " " + text
        if self._in_staff_container:
            self._container_text += " " + text
        self._text_buffer += " " + text

    def _is_valid_name(self, first, last):
        f, l = first.lower(), last.lower()
        if f in NOT_A_NAME or l in NOT_A_NAME:
            return False
        if len(f) < 2 or len(l) < 2:
            return False
        if len(f) > 15 or len(l) > 20:
            return False
        # Must look like real names (alpha only)
        if not f.isalpha() or not l.isalpha():
            return False
        return True

    def _extract_from_table_row(self, cells):
        if len(cells) < 2:
            return
        has_title = False
        title_val = ""
        for cell in cells:
            if any(kw in cell.lower() for kw in self.TITLE_KEYWORDS):
                has_title = True
                title_val = cell.strip()
                break
        if not has_title:
            return
        name_re = re.compile(r'([A-Z][a-z]+)\s+(?:[A-Z]\.\s+)?([A-Z][a-z]+)')
        for cell in cells:
            m = name_re.match(cell.strip())
            if m:
                first, last = m.groups()
                if self._is_valid_name(first, last):
                    self.names.append((first, last, title_val, "table"))

    def _extract_from_container(self, text):
        """Extract name + title from staff-class containers."""
        name_re = re.compile(r'([A-Z][a-z]+)\s+(?:[A-Z]\.\s+)?([A-Z][a-z]+)')
        for m in name_re.finditer(text):
            first, last = m.groups()
            if self._is_valid_name(first, last):
                # Look for title nearby
                context = text.lower()
                title = ""
                for kw in self.TITLE_KEYWORDS:
                    if kw in context:
                        title = kw.title()
                        break
                if title:
                    self.names.append((first, last, title, "div"))


def extract_names_from_urls(urls):
    """
    Extract names from staff directory URL slugs.
    e.g., /staff/john-smith → ("John", "Smith")
    """
    names = []
    slug_re = re.compile(r'/(?:staff|team|people|directory|bio|officials?)/([a-z]+-[a-z]+)/?$', re.IGNORECASE)
    for url in urls:
        path = urlparse(url).path
        m = slug_re.search(path)
        if m:
            slug = m.group(1)
            parts = slug.split('-')
            if len(parts) == 2:
                first = parts[0].capitalize()
                last = parts[1].capitalize()
                if first.lower() not in NOT_A_NAME and last.lower() not in NOT_A_NAME:
                    names.append((first, last, "", "url_slug"))
    return names


def extract_names_contextual(html):
    """
    Regex-based name extraction with title context.
    "First Last, Title" or "Title: First Last"
    """
    names = []
    text = re.sub(r'<[^>]+>', '\n', html)

    titles = "|".join(BroadNameExtractor.TITLE_KEYWORDS)

    # Pattern: "First Last, Title"
    for m in re.finditer(rf'([A-Z][a-z]+)\s+([A-Z][a-z]+)\s*[,\-–—]\s*({titles})', text, re.IGNORECASE):
        first, last, title = m.groups()
        if first.lower() not in NOT_A_NAME and last.lower() not in NOT_A_NAME:
            names.append((first, last, title.strip().title(), "context"))

    # Pattern: "Title: First Last" or "Title - First Last"
    for m in re.finditer(rf'({titles})\s*[:\-–—]\s*([A-Z][a-z]+)\s+([A-Z][a-z]+)', text, re.IGNORECASE):
        title, first, last = m.groups()
        if first.lower() not in NOT_A_NAME and last.lower() not in NOT_A_NAME:
            names.append((first, last, title.strip().title(), "context"))

    return names


def extract_names_from_minutes(html):
    """
    Extract names from meeting minutes / public records pages.
    These pages list commissioners, attendees, and officials by name.
    Patterns:
    - "Present: John Smith, Jane Doe, Bob Wilson"
    - "Commissioner John Smith"
    - "Motion by John Smith, seconded by Jane Doe"
    - "Judge John Smith presiding"
    """
    names = []
    text = re.sub(r'<[^>]+>', '\n', html)

    # Pattern: "Present: Name, Name, Name" or "Absent: Name, Name"
    present_re = re.compile(
        r'(?:present|absent|attending|attended|members?)\s*[:\-]\s*(.+?)(?:\n|$)',
        re.IGNORECASE
    )
    for m in present_re.finditer(text):
        line = m.group(1)
        for nm in re.finditer(r'([A-Z][a-z]+)\s+([A-Z][a-z]+)', line):
            first, last = nm.groups()
            if first.lower() not in NOT_A_NAME and last.lower() not in NOT_A_NAME:
                names.append((first, last, "Meeting Attendee", "minutes"))

    # Pattern: "Motion by First Last" / "seconded by First Last"
    motion_re = re.compile(
        r'(?:motion|seconded|moved)\s+by\s+([A-Z][a-z]+)\s+([A-Z][a-z]+)',
        re.IGNORECASE
    )
    for m in motion_re.finditer(text):
        first, last = m.groups()
        if first.lower() not in NOT_A_NAME and last.lower() not in NOT_A_NAME:
            names.append((first, last, "Commissioner", "minutes"))

    # Pattern: "Commissioner/Judge First Last"
    official_re = re.compile(
        r'(?:commissioner|judge|sheriff|clerk|auditor|treasurer|chief|director)\s+'
        r'([A-Z][a-z]+)\s+([A-Z][a-z]+)',
        re.IGNORECASE
    )
    for m in official_re.finditer(text):
        first, last = m.groups()
        if first.lower() not in NOT_A_NAME and last.lower() not in NOT_A_NAME:
            names.append((first, last, "Official", "minutes"))

    return names


def extract_all_names(html, page_urls):
    """Combine all name extraction methods."""
    all_names = []

    # 1. HTML structure (tables, staff divs)
    parser = BroadNameExtractor()
    try:
        parser.feed(html)
        all_names.extend(parser.names)
    except Exception:
        pass

    # 2. URL slug names
    all_names.extend(extract_names_from_urls(page_urls))

    # 3. Contextual regex (near titles)
    all_names.extend(extract_names_contextual(html))

    # 4. Meeting minutes / public records
    all_names.extend(extract_names_from_minutes(html))

    # Deduplicate
    seen = set()
    unique = []
    for item in all_names:
        key = (item[0].lower(), item[1].lower())
        if key not in seen:
            seen.add(key)
            unique.append(item)
    return unique


# =====================================================
# EMAIL + PATTERN ENGINE
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
    domain_emails = [e for e in emails if e.endswith(f"@{domain}")]
    if not domain_emails:
        return None, None
    scores = Counter()
    for email in domain_emails:
        local = email.split("@")[0]
        if re.match(r'^[a-z]\.[a-z]+$', local):
            scores["f.last"] += 2
        elif re.match(r'^[a-z]+\.[a-z]+$', local):
            scores["first.last"] += 2
        elif "_" in local:
            scores["first_last"] += 2
        elif re.match(r'^[a-z][a-z]{2,12}$', local):
            scores["flast"] += 1
    if scores:
        best = scores.most_common(1)[0][0]
        return best, PATTERN_GENERATORS[best]
    return "flast", PATTERN_GENERATORS["flast"]


def get_cached_pattern(domain):
    """Check if we already detected a pattern for this domain."""
    try:
        r = supabase.table("domain_patterns").select("*").eq("domain", domain).single().execute()
        if r.data:
            name = r.data["pattern_name"]
            return name, PATTERN_GENERATORS.get(name)
    except Exception:
        pass
    return None, None


def cache_pattern(domain, pattern_name, sample_emails, is_catch_all=None):
    """Save detected pattern + catch-all status for future runs."""
    try:
        data = {
            "domain": domain,
            "pattern_name": pattern_name,
            "sample_emails": sample_emails[:5],
            "detected_at": datetime.now(timezone.utc).isoformat(),
        }
        if is_catch_all is not None:
            data["is_catch_all"] = is_catch_all
        supabase.table("domain_patterns").upsert(data, on_conflict="domain").execute()
    except Exception:
        pass


def get_cached_catch_all(domain):
    """Check if we already know this domain's catch-all status."""
    try:
        r = supabase.table("domain_patterns").select("is_catch_all").eq("domain", domain).single().execute()
        if r.data and r.data.get("is_catch_all") is not None:
            return r.data["is_catch_all"]
    except Exception:
        pass
    return None


def sanitize_email_local(local_part):
    """Strip non-alphanumeric chars from generated email local parts.
    Handles O'Brien → obrien, Mary-Jane → maryjane, etc."""
    return re.sub(r'[^a-z0-9.]', '', local_part.lower())


def score_dept_relevance(email, title="", department=""):
    """Score how relevant this contact is for our products."""
    text = f"{email} {title} {department}".lower()
    best = 0
    best_dept = None
    for dept, score in DEPT_RELEVANCE.items():
        if any(word in text for word in dept.split()):
            if score > best:
                best = score
                best_dept = dept.title()
    return best, best_dept


# =====================================================
# SMTP
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
            s.helo(socket.getfqdn())
            s.mail("verify@crownwoodchemicals.com")
            code, _ = s.rcpt(f"zzz_fake_99999_nonexistent@{domain}")
            return code == 250
    except Exception:
        return True


def verify_smtp_with_retry(email, mx_host, retries=2):
    """SMTP verify with retry + backoff."""
    for attempt in range(retries + 1):
        try:
            with smtplib.SMTP(mx_host, 25, timeout=10) as s:
                s.helo(socket.getfqdn())
                s.mail("verify@crownwoodchemicals.com")
                code, _ = s.rcpt(email)
                if code == 250:
                    return "verified"
                elif code == 550:
                    return "invalid"
                else:
                    return "unknown"
        except (smtplib.SMTPServerDisconnected, smtplib.SMTPConnectError, socket.timeout):
            if attempt < retries:
                time.sleep(2 ** attempt)  # Exponential backoff
            continue
        except Exception:
            return "unknown"
    return "unknown"


# =====================================================
# LINK + PAGE EXTRACTION
# =====================================================

DIRECTORY_KEYWORDS = [
    "staff", "directory", "contact", "department", "official",
    "officer", "team", "administration", "elected", "employee",
    "government", "office", "public-works", "road", "bridge",
    "purchasing", "procurement", "engineering", "commissioner",
    "judge", "clerk", "sheriff", "treasurer", "about",
    # Public records pages — goldmine for names
    "minutes", "agenda", "court", "meeting", "commissioners-court",
    "records", "proceedings", "roster", "personnel",
    # Purchasing / contracts
    "purchasing", "buyer", "contract", "vendor", "bid",
]


# =====================================================
# CLOUDFLARE EMAIL DEOBFUSCATION
# =====================================================

def decode_cloudflare_email(encoded_hex):
    """
    Decode Cloudflare's email protection obfuscation.
    The encoding is a simple XOR cipher:
    - First 2 hex chars = XOR key
    - Each subsequent 2 hex chars XOR with the key = one character
    Example: /cdn-cgi/l/email-protection#aabbccdd...
    """
    try:
        key = int(encoded_hex[:2], 16)
        email = ""
        for i in range(2, len(encoded_hex), 2):
            char_code = int(encoded_hex[i:i+2], 16) ^ key
            email += chr(char_code)
        return email.lower().strip() if '@' in email else None
    except Exception:
        return None


def extract_cloudflare_emails(html):
    """
    Find and decode all Cloudflare-obfuscated emails in HTML.
    Patterns:
    - href="/cdn-cgi/l/email-protection#hex"
    - data-cfemail="hex"
    """
    emails = []
    # Pattern 1: href links
    for m in re.finditer(r'/cdn-cgi/l/email-protection#([a-f0-9]+)', html, re.IGNORECASE):
        decoded = decode_cloudflare_email(m.group(1))
        if decoded:
            emails.append(decoded)
    # Pattern 2: data-cfemail attribute
    for m in re.finditer(r'data-cfemail="([a-f0-9]+)"', html, re.IGNORECASE):
        decoded = decode_cloudflare_email(m.group(1))
        if decoded:
            emails.append(decoded)
    return list(set(emails))


# =====================================================
# PDF EMAIL EXTRACTION
# =====================================================

def extract_emails_from_pdf(url):
    """
    Fetch a PDF and extract emails + names from raw text.
    Includes HEAD-first size gate (8MB cap) and page limit.
    """
    try:
        # HEAD check — skip oversized files
        head = requests.head(url, timeout=5, headers=HEADERS, allow_redirects=True)
        content_length = int(head.headers.get("content-length", 0))
        if content_length > MAX_PDF_BYTES:
            return [], []
        content_type = head.headers.get("content-type", "")
        if content_type and "pdf" not in content_type.lower() and "octet" not in content_type.lower():
            return [], []

        r = requests.get(url, headers=HEADERS, timeout=15)
        if r.status_code >= 400:
            return [], []

        # Try pdfplumber first (proper PDF parsing, 15-page limit)
        text = ""
        try:
            import pdfplumber
            import io
            with pdfplumber.open(io.BytesIO(r.content)) as pdf:
                for i, page in enumerate(pdf.pages):
                    if i >= 15:  # contact info is never on page 47
                        break
                    text += (page.extract_text() or "") + "\n"
        except ImportError:
            # Fallback: raw latin-1 decode
            text = r.content.decode('latin-1', errors='ignore')
        except Exception:
            text = r.content.decode('latin-1', errors='ignore')

        # Extract emails
        emails = []
        for e in EMAIL_RE.findall(text):
            cleaned = clean_email(e)
            if cleaned:
                emails.append(cleaned)

        # Extract names near title keywords
        names = []
        title_kws = BroadNameExtractor.TITLE_KEYWORDS
        for m in re.finditer(r'([A-Z][a-z]+)\s+([A-Z][a-z]+)', text):
            first, last = m.groups()
            if first.lower() not in NOT_A_NAME and last.lower() not in NOT_A_NAME:
                start = max(0, m.start() - 100)
                end = min(len(text), m.end() + 100)
                context = text[start:end].lower()
                for kw in title_kws:
                    if kw in context:
                        names.append((first, last, kw.title(), "pdf"))
                        break

        return list(set(emails)), names
    except Exception:
        return [], []


# =====================================================
# GOOGLE DORKING (via DuckDuckGo)
# =====================================================

def google_dork_emails(domain, county_name):
    """
    Search for emails from a domain via search engine dorking.
    Uses SearchRotator for rate limit protection.
    Returns (status, emails) — status is 'ok' or 'blocked'.
    """
    found_emails = set()
    overall_status = "ok"

    queries = [
        f'"@{domain}" contact',
        f'"@{domain}" purchasing OR contracts OR road OR "public works"',
        f'"@{domain}" director OR commissioner OR manager OR engineer',
    ]

    for query in queries:
        status, results = ddg_search(query, max_results=10)
        if status == "blocked":
            overall_status = "blocked"
            continue

        # Extract emails from result snippets
        for r in results:
            body = r.get("body", "") + " " + r.get("title", "")
            for e in EMAIL_RE.findall(body):
                cleaned = clean_email(e)
                if cleaned and domain in cleaned:
                    found_emails.add(cleaned)

            # Fetch promising result pages
            href = r.get("href", "")
            if domain in href or any(kw in href.lower() for kw in ['contact', 'staff', 'directory', 'purchasing']):
                try:
                    page_html, _ = fetch(href)
                    if page_html:
                        for e in EMAIL_RE.findall(page_html):
                            cleaned = clean_email(e)
                            if cleaned and domain in cleaned:
                                found_emails.add(cleaned)
                        for e in extract_cloudflare_emails(page_html):
                            cleaned = clean_email(e)
                            if cleaned and domain in cleaned:
                                found_emails.add(cleaned)
                except Exception:
                    pass
                time.sleep(0.5)

    return overall_status, list(found_emails)


class LinkExtractor(HTMLParser):
    def __init__(self, base_url):
        super().__init__()
        self.base_domain = urlparse(base_url).netloc
        self.base_url = base_url
        self.links = set()
        self.pdf_links = set()  # Collect PDFs separately

    def handle_starttag(self, tag, attrs):
        if tag == 'a':
            for attr, val in attrs:
                if attr == 'href' and val:
                    full = urljoin(self.base_url, val)
                    parsed = urlparse(full)
                    if parsed.netloc == self.base_domain or not parsed.netloc:
                        low = full.lower()
                        if not any(low.startswith(p) for p in ['mailto:', 'tel:', 'javascript:']):
                            # Collect PDFs separately for Phase 5
                            if low.endswith('.pdf'):
                                self.pdf_links.add(full.split('#')[0].split('?')[0])
                            elif not any(low.endswith(e) for e in ['.doc','.docx','.xls','.xlsx','.zip','.png','.jpg','.gif','.svg','.mp4','.mov','.csv']):
                                self.links.add(full.split('#')[0].split('?')[0])


def fetch(url, timeout=12, stealth=False):
    """Fetch a URL via Scrapling Fetcher, with StealthyFetcher fallback."""
    if not HAS_SCRAPLING:
        return fetch_simple(url, timeout=timeout)

    def _extract(page):
        """Pull HTML string and final URL from a Scrapling Response."""
        html_text = str(page)
        final_url = page.url if hasattr(page, 'url') else url
        if not html_text or len(html_text) < 100 or '<' not in html_text:
            return (None, None)
        return (html_text, final_url)

    try:
        if stealth:
            page = StealthyFetcher.fetch(url, **STEALTH_DEFAULTS)
        else:
            page = Fetcher.get(url, stealthy_headers=True, timeout=timeout)
        if page:
            result = _extract(page)
            if result[0]:
                return result
        return (None, None)
    except Exception:
        # Fallback to plain requests on Fetcher failure (not StealthyFetcher)
        return fetch_simple(url, timeout=timeout)


def fetch_simple(url, timeout=12):
    """Plain requests.get() for same-domain internal pages. Fast, no browser overhead."""
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
        return (r.text, r.url) if r.status_code < 400 else (None, None)
    except Exception:
        return None, None


def clean_email(e):
    """Validate and clean a single email string."""
    e = e.lower().strip().rstrip('.')
    if len(e) > 80 or len(e) < 5:
        return None
    domain = e.split('@')[1] if '@' in e else ''
    if domain in JUNK_DOMAINS:
        return None
    prefix = e.split('@')[0]
    if prefix in JUNK_PREFIXES:
        return None
    if not any(domain.endswith(t) for t in ['.gov', '.us', '.org', '.com', '.net', '.edu']):
        return None
    return e


# =====================================================
# CORE CRAWL ENGINE
# =====================================================

def deep_crawl(base_url, max_pages=40):
    """
    Returns:
    - mailto_emails: list — from mailto: links (HIGH confidence)
    - body_emails: list — from page body text (MEDIUM confidence)
    - cf_emails: list — from Cloudflare deobfuscation (HIGH confidence)
    - names: list of (first, last, title, source)
    - pdf_links: set — PDF URLs found during crawl
    - visited_urls: set — all URLs visited
    - pages_crawled: int
    """
    from concurrent.futures import ThreadPoolExecutor, as_completed

    visited = set()
    queue = [base_url]
    mailto_emails = set()
    body_emails = set()
    cf_emails = set()
    pdf_links = set()
    all_names = []
    all_urls = set()
    seen_names = set()

    def priority(url):
        return sum(10 for kw in DIRECTORY_KEYWORDS if kw in url.lower())

    BATCH_SIZE = 5  # concurrent fetches per batch

    def _process_page(html, url):
        """Extract emails, names, and links from a single page HTML."""
        page_mailto = set()
        page_body = set()
        page_cf = set()
        page_names = []
        page_links = set()
        page_pdfs = set()

        # Extract mailto: emails (HIGH confidence)
        mx = MailtoExtractor()
        try:
            mx.feed(html)
            for e in mx.mailto_emails:
                cleaned = clean_email(e)
                if cleaned:
                    page_mailto.add(cleaned)
        except Exception:
            pass

        # Decode Cloudflare-obfuscated emails (HIGH confidence)
        for e in extract_cloudflare_emails(html):
            cleaned = clean_email(e)
            if cleaned:
                page_cf.add(cleaned)

        # Extract body emails (MEDIUM confidence)
        for e in EMAIL_RE.findall(html):
            cleaned = clean_email(e)
            if cleaned and cleaned not in page_mailto and cleaned not in page_cf:
                page_body.add(cleaned)

        # Extract names
        page_names = extract_all_names(html, [url])

        # Follow links + collect PDFs
        try:
            ext = LinkExtractor(url)
            ext.feed(html)
            page_links = ext.links
            page_pdfs = ext.pdf_links
        except Exception:
            pass

        return page_mailto, page_body, page_cf, page_names, page_links, page_pdfs

    count = 0

    # First page: try plain requests first (fastest), fallback to StealthyFetcher
    # for JS-heavy sites that return thin HTML
    first_html, first_url = fetch_simple(base_url)
    if first_html and len(first_html) < 5000:
        # Thin page — likely JS-rendered, retry with StealthyFetcher
        stealth_html, stealth_url = fetch(base_url, stealth=True)
        if stealth_html and len(stealth_html) > len(first_html):
            first_html, first_url = stealth_html, stealth_url
    if not first_html:
        first_html, first_url = fetch(base_url, stealth=True)
    if first_html:
        visited.add(base_url.rstrip('/'))
        if first_url:
            visited.add(first_url.rstrip('/'))
        all_urls.add(base_url)
        count += 1
        pm, pb, pc, pn, pl, pp = _process_page(first_html, first_url or base_url)
        mailto_emails.update(pm)
        body_emails.update(pb)
        cf_emails.update(pc)
        pdf_links.update(pp)
        for n in pn:
            key = (n[0].lower(), n[1].lower())
            if key not in seen_names:
                seen_names.add(key)
                all_names.append(n)
        for link in pl:
            if link.rstrip('/') not in visited:
                queue.append(link)

    # Remaining pages: batch concurrent fetching
    while queue and count < max_pages:
        queue.sort(key=priority, reverse=True)

        # Pick up to BATCH_SIZE unvisited URLs
        batch = []
        while queue and len(batch) < BATCH_SIZE:
            url = queue.pop(0).rstrip('/')
            if url not in visited:
                visited.add(url)
                all_urls.add(url)
                batch.append(url)

        if not batch:
            break

        # Fetch batch concurrently using plain requests (fast, no browser)
        results = {}
        with ThreadPoolExecutor(max_workers=BATCH_SIZE) as executor:
            futures = {executor.submit(fetch_simple, url): url for url in batch}
            for future in as_completed(futures):
                url = futures[future]
                try:
                    html, final_url = future.result()
                    if html:
                        results[url] = (html, final_url)
                except Exception:
                    pass

        # Process results
        for url, (html, final_url) in results.items():
            count += 1
            if count > max_pages:
                break

            pm, pb, pc, pn, pl, pp = _process_page(html, final_url or url)
            mailto_emails.update(pm)
            body_emails.update(pb)
            cf_emails.update(pc)
            pdf_links.update(pp)
            for n in pn:
                key = (n[0].lower(), n[1].lower())
                if key not in seen_names:
                    seen_names.add(key)
                    all_names.append(n)
            for link in pl:
                if link.rstrip('/') not in visited:
                    queue.append(link)

        time.sleep(0.2)  # small delay between batches

    return list(mailto_emails), list(body_emails), list(cf_emails), all_names, pdf_links, all_urls, count


# =====================================================
# LINKEDIN NAME DISCOVERY (via Google-indexed profiles)
# =====================================================

def parse_linkedin_name(title):
    """
    Parse a LinkedIn search result title to extract name + job title.
    Format: 'First Last - Job Title - Organization | LinkedIn'
    Also:   'First Last – Job Title – Organization | LinkedIn'
    Also:   'First Last | LinkedIn'
    """
    # Strip the " | LinkedIn" suffix
    title = re.sub(r'\s*[|\-–]\s*LinkedIn\s*$', '', title, flags=re.IGNORECASE)
    # Remove location strings like " - Greater Houston Area"
    title = re.sub(r'\s*[\-–]\s*Greater\s+.+$', '', title)
    title = re.sub(r'\s*[\-–]\s*.*Area$', '', title)

    # Split on separators (-, –, —, |)
    parts = re.split(r'\s*[\-–—|]\s*', title)
    if not parts:
        return None

    name_part = parts[0].strip()
    title_part = parts[1].strip() if len(parts) > 1 else ""

    # Extract first and last name
    name_match = re.match(r'^([A-Z][a-z]+)\s+(?:[A-Z]\.\s+)?([A-Z][a-z]+)$', name_part)
    if not name_match:
        return None

    first, last = name_match.groups()
    if first.lower() in NOT_A_NAME or last.lower() in NOT_A_NAME:
        return None
    if len(first) < 2 or len(last) < 2:
        return None

    return (first, last, title_part, "linkedin")


def linkedin_name_discovery(county_name, max_queries=3, state_abbr="TX"):
    """
    Search for LinkedIn profiles of county/city employees.
    Returns (status, names) — status is 'ok' or 'blocked'.
    """
    state_names = {
        'TX': 'Texas', 'OK': 'Oklahoma', 'LA': 'Louisiana', 'NM': 'New Mexico',
        'AR': 'Arkansas', 'CA': 'California', 'FL': 'Florida', 'OH': 'Ohio',
        'PA': 'Pennsylvania', 'NY': 'New York', 'IL': 'Illinois', 'GA': 'Georgia',
        'NC': 'North Carolina', 'VA': 'Virginia', 'CO': 'Colorado', 'AZ': 'Arizona',
        'MO': 'Missouri', 'AL': 'Alabama', 'MS': 'Mississippi', 'TN': 'Tennessee',
        'KY': 'Kentucky', 'SC': 'South Carolina', 'IN': 'Indiana', 'WI': 'Wisconsin',
        'MN': 'Minnesota', 'IA': 'Iowa', 'KS': 'Kansas', 'NE': 'Nebraska',
    }
    state_full = state_names.get(state_abbr.upper(), state_abbr)
    names = []
    seen = set()
    overall_status = "ok"

    search_queries = [
        f'site:linkedin.com "{county_name}" {state_full} "public works" OR "road" OR "bridge" OR "engineer"',
        f'site:linkedin.com "{county_name}" {state_full} "purchasing" OR "procurement" OR "maintenance"',
        f'site:linkedin.com "{county_name}" {state_full} "commissioner" OR "judge" OR "director" OR "superintendent"',
    ]

    for query in search_queries[:max_queries]:
        status, results = ddg_search(query, max_results=10)
        if status == "blocked":
            overall_status = "blocked"
            continue

        for r in results:
            raw_title = r.get("title", "")
            raw_title = raw_title.replace("&amp;", "&").replace("&#x27;", "'").replace("&quot;", '"')
            parsed = parse_linkedin_name(raw_title)
            if parsed:
                key = (parsed[0].lower(), parsed[1].lower())
                if key not in seen:
                    seen.add(key)
                    names.append(parsed)

    return overall_status, names


# =====================================================
# WEBSITE FINDER
# =====================================================

SKIP_SEARCH_DOMAINS = {'wikipedia', 'facebook', 'twitter', 'linkedin', 'yelp',
                       'census.gov', 'sos.state', 'google.com', 'mapquest',
                       'yellowpages', 'zillow', 'indeed', 'nextdoor',
                       'propertyrecs', 'whitepages', 'angi.com', 'yelp.com',
                       'bbb.org', 'tripadvisor', 'glassdoor'}

def search_for_website(query, entity_name="", entity_type="county", state_abbr="TX"):
    """Search for a government website. Uses ddg_search()."""
    st = state_abbr.lower()
    status, results = ddg_search(query, max_results=10)
    if status == "blocked" or not results:
        return None

    # Clean entity name for domain matching
    clean = entity_name.lower()
    for suffix in [" county", " city", " cdp", " village", " town", " parish", " borough"]:
        clean = clean.replace(suffix, "")
    clean = clean.strip().replace(" ", "")

    for r in results:
        href = r.get("href", "")
        if not href:
            continue
        parsed = urlparse(href)
        domain = parsed.netloc.lower()

        # Skip known junk domains
        if any(skip in domain for skip in SKIP_SEARCH_DOMAINS):
            continue

        # Domain validation: must look like a government/municipal site
        is_gov = domain.endswith('.gov') or domain.endswith(f'.{st}.us')
        is_org = domain.endswith('.org')
        has_entity_name = clean in domain.replace("-", "").replace(".", "")
        has_gov_keywords = any(kw in domain for kw in ['city', 'ci.', 'town', 'gov', 'municipal'])

        if is_gov or (is_org and (has_entity_name or has_gov_keywords)):
            return f"{parsed.scheme}://{parsed.netloc}"
        if has_entity_name and has_gov_keywords:
            return f"{parsed.scheme}://{parsed.netloc}"
        # Accept .com only if domain contains the entity name
        if domain.endswith('.com') and has_entity_name:
            return f"{parsed.scheme}://{parsed.netloc}"
    return None


def find_website(entity_name, entity_type="county", state_abbr="TX"):
    """Find county/city website: try URL patterns first, then DDG search."""
    st = state_abbr.lower()
    ST = state_abbr.upper()
    # Clean entity name — strip suffixes
    c = entity_name.lower()
    for suffix in [" county", " city", " cdp", " village", " town", " parish", " borough"]:
        c = c.replace(suffix, "")
    c = c.strip()
    ch = c.replace(" ", "-")   # hyphenated
    cn = c.replace(" ", "")    # collapsed

    # State full names for URL patterns
    state_names = {
        'TX': 'texas', 'OK': 'oklahoma', 'LA': 'louisiana', 'NM': 'newmexico',
        'AR': 'arkansas', 'CA': 'california', 'FL': 'florida', 'OH': 'ohio',
        'PA': 'pennsylvania', 'NY': 'newyork', 'IL': 'illinois', 'GA': 'georgia',
        'NC': 'northcarolina', 'VA': 'virginia', 'CO': 'colorado', 'AZ': 'arizona',
        'MO': 'missouri', 'AL': 'alabama', 'MS': 'mississippi', 'TN': 'tennessee',
        'KY': 'kentucky', 'SC': 'southcarolina', 'IN': 'indiana', 'WI': 'wisconsin',
        'MN': 'minnesota', 'IA': 'iowa', 'KS': 'kansas', 'NE': 'nebraska',
    }
    sn = state_names.get(ST, st)

    # Method 1: Brute-force common URL patterns (state-aware)
    if entity_type == "county":
        urls = [
            f"https://www.co.{cn}.{st}.us",
            f"https://co.{cn}.{st}.us",
            f"https://www.{ch}county.org",
            f"https://www.{cn}county.org",
            f"https://www.{ch}county{st}.gov",
            f"https://www.{cn}county{st}.gov",
            f"https://www.{ch}county.gov",
            f"https://www.{cn}county.gov",
            f"https://{ch}county.org",
            f"https://{cn}county.org",
            f"https://{ch}county{st}.gov",
            f"https://{cn}county{st}.gov",
            f"https://www.{ch}.{st}.us",
            f"https://www.{cn}{st}.gov",
            f"https://www.{ch}county.{sn}.gov",
            f"https://www.{cn}county.{sn}.gov",
            f"https://www.{cn}county.us",
            f"https://www.{ch}county.us",
            f"https://www.{cn}county.com",
            f"https://www.{ch}county.com",
            f"https://www.{ch}county.net",
        ]
    else:  # city
        urls = [
            f"https://www.{cn}{st}.gov",
            f"https://www.{cn}{st}.org",
            f"https://www.{cn}{st}.us",
            f"https://www.ci.{cn}.{st}.us",
            f"https://ci.{cn}.{st}.us",
            f"https://www.cityof{cn}.com",
            f"https://www.cityof{cn}.org",
            f"https://www.cityof{cn}.net",
            f"https://cityof{cn}.com",
            f"https://cityof{cn}.org",
            f"https://www.{cn}.org",
            f"https://www.{cn}.us",
            f"https://www.{ch}{st}.gov",
            f"https://www.{ch}{st}.org",
            f"https://www.city-of-{ch}.com",
            f"https://www.city-of-{ch}.org",
            f"https://www.{cn}{sn}.gov",
            f"https://www.{cn}{sn}.org",
            f"https://www.townof{cn}.com",
            f"https://www.townof{cn}.org",
            f"https://www.villageof{cn}.com",
        ]

    for url in urls:
        try:
            r = requests.head(url, headers=HEADERS, timeout=8, allow_redirects=True)
            if r.status_code < 400:
                return r.url.rstrip('/')
        except Exception:
            pass

    # Method 2: DDG search fallback
    print(f"      🔎 URL patterns failed, trying search...")
    time.sleep(2)
    state_full = state_names.get(ST, ST)
    if entity_type == "county":
        query = f'"{entity_name}" {state_full} official site .gov OR .us OR .org'
    else:
        query = f'"City of {c}" {state_full} city government site .gov OR .org OR .us'
    result = search_for_website(query, entity_name=entity_name, entity_type=entity_type, state_abbr=state_abbr)
    if result:
        # Verify the result is reachable
        try:
            r = requests.head(result, headers=HEADERS, timeout=8, allow_redirects=True)
            if r.status_code < 400:
                print(f"      🔎 Found via search: {r.url}")
                return r.url.rstrip('/')
        except Exception:
            pass

    return None


# =====================================================
# SAVE / LOAD
# =====================================================

def save_contacts(contacts, state_id):
    if not contacts:
        return 0
    seen = set()
    unique = []
    for c in contacts:
        if c["email"] not in seen:
            seen.add(c["email"])
            unique.append(c)
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


def mark_entity_crawled(entity_id, website_url, table="counties"):
    """Update county/city with last crawled timestamp and website."""
    try:
        supabase.table(table).update({
            "last_crawled_at": datetime.now(timezone.utc).isoformat(),
            "website_url": website_url,
        }).eq("id", entity_id).execute()
    except Exception:
        pass


# =====================================================
# MAIN PROCESSOR
# =====================================================

def process_county(county, state_id, force=False, deep=False, entity_type="county", state_abbr="TX"):
    name = county["name"]
    cid = county["id"]
    table = "counties" if entity_type == "county" else "cities"

    # Skip if crawled recently (within 7 days) unless --force
    if not force and county.get("last_crawled_at"):
        try:
            last = datetime.fromisoformat(county["last_crawled_at"].replace("Z", "+00:00"))
            age_days = (datetime.now(timezone.utc) - last).days
            if age_days < 7:
                print(f"      ⏭️  Crawled {age_days} days ago, skipping (use --force to override)")
                return 0
        except Exception:
            pass

    print(f"\n   🔍 Finding {name} website...")
    base_url = county.get("website_url") or find_website(name, entity_type=entity_type, state_abbr=state_abbr)
    if not base_url:
        print(f"      ❌ No website found")
        return 0

    domain = urlparse(base_url).netloc
    if domain.startswith("www."):
        domain = domain[4:]
    print(f"      🌐 {base_url} (domain: {domain})")

    # PHASE 1: Deep Crawl
    print(f"      📡 Phase 1: Deep crawling...")
    mailto_emails, body_emails, cf_emails, names, pdf_links, crawled_urls, pages = deep_crawl(base_url, max_pages=40)
    print(f"         Pages: {pages} | Mailto: {len(mailto_emails)} | CF decoded: {len(cf_emails)} | Body: {len(body_emails)} | Names: {len(names)} | PDFs: {len(pdf_links)}")

    if mailto_emails:
        print(f"         📧 Mailto (HIGH): {', '.join(mailto_emails[:5])}")
    if cf_emails:
        print(f"         🔓 Cloudflare decoded (HIGH): {', '.join(cf_emails[:5])}")
    if body_emails:
        all_domain = [e for e in body_emails if domain in e]
        print(f"         📧 Body domain emails: {len(all_domain)}")

    # PHASE 1b: LinkedIn Name Discovery (skip if Phase 1 found nothing or Google blocked)
    has_phase1_results = len(mailto_emails) + len(cf_emails) + len(body_emails) + len(names) > 0
    if has_phase1_results and not search_disabled:
        print(f"      🔗 Phase 1b: LinkedIn name discovery...")
        li_status, linkedin_names = linkedin_name_discovery(name, state_abbr=state_abbr)
        existing_name_keys = {(n[0].lower(), n[1].lower()) for n in names}
        new_linkedin = [n for n in linkedin_names if (n[0].lower(), n[1].lower()) not in existing_name_keys]
        names.extend(new_linkedin)
        li_msg = f"Found {len(linkedin_names)} LinkedIn names ({len(new_linkedin)} new)"
        if li_status == "blocked":
            li_msg += " [search blocked]"
        print(f"         {li_msg}")
    elif search_disabled:
        print(f"      ⏭️ Phase 1b: Skipped (search disabled)")
    else:
        print(f"      ⏭️ Phase 1b: Skipped (no Phase 1 results)")

    # PHASE 2: Pattern Detection (check cache first, include CF emails)
    all_high_emails = mailto_emails + cf_emails
    all_domain_emails = [e for e in (all_high_emails + body_emails) if domain in e]
    pattern_name, pattern_func = get_cached_pattern(domain)
    if pattern_name:
        print(f"      🔑 Phase 2: Cached pattern = {pattern_name}@{domain}")
    else:
        pattern_name, pattern_func = detect_pattern(all_domain_emails, domain)
        if pattern_name:
            cache_pattern(domain, pattern_name, all_domain_emails)
            print(f"      🔑 Phase 2: Detected pattern = {pattern_name}@{domain}")
        else:
            print(f"      🔑 Phase 2: No pattern detected")

    # PHASE 3: Generate emails from names (with sanitization)
    generated = []
    if names and pattern_func:
        existing_set = set(mailto_emails + cf_emails + body_emails)
        for first, last, title, source in names:
            try:
                local = pattern_func(first, last)
                local = sanitize_email_local(local)  # Handle O'Brien, Mary-Jane, etc.
                if not local or len(local) < 2:
                    continue
                email = f"{local}@{domain}"
                if email not in existing_set:
                    generated.append({
                        "email": email,
                        "contact_name": f"{first} {last}",
                        "title": title,
                        "source": source,
                    })
            except Exception:
                pass
        print(f"      ⚡ Phase 3: Generated {len(generated)} from {len(names)} names")

    # PHASE 4: SMTP Verify (only generated emails, with catch-all caching)
    verified_gen = []
    is_catch_all_result = None
    mx = get_mx(domain) if HAS_DNS else None
    if mx and generated:
        print(f"      📬 Phase 4: SMTP via {mx}...")
        # Check cached catch-all status first
        cached_ca = get_cached_catch_all(domain)
        if cached_ca is True:
            print(f"         ⚠️ Cached catch-all — skipping SMTP")
            is_catch_all_result = True
            verified_gen = generated
        elif cached_ca is False:
            is_catch_all_result = False
        else:
            is_catch_all_result = check_catch_all(mx, domain)

        if is_catch_all_result and cached_ca is None:
            print(f"         ⚠️ Catch-all detected — caching & keeping unverified")
            verified_gen = generated
        elif not is_catch_all_result:
            for g in generated:
                result = verify_smtp_with_retry(g["email"], mx)
                if result == "verified":
                    verified_gen.append(g)
                    print(f"         ✅ {g['email']}")
                elif result == "invalid":
                    print(f"         ❌ {g['email']}")
                else:
                    verified_gen.append(g)
                time.sleep(0.3)
            print(f"         Kept {len(verified_gen)}/{len(generated)}")
    elif generated:
        verified_gen = generated

    # PHASE 5: Intelligence Sweep (Google dorking + PDF extraction)
    # Only runs with --deep flag
    dork_emails = []
    pdf_emails = []
    pdf_names = []
    if deep and not search_disabled:
        print(f"      🕵️ Phase 5: Intelligence sweep (--deep)...")

        # 5a: Google dorking for @domain across the web
        dork_status, dork_raw = google_dork_emails(domain, name)
        existing_all = set(mailto_emails + cf_emails + body_emails + [g["email"] for g in verified_gen])
        dork_emails = [e for e in dork_raw if e not in existing_all]
        dork_msg = f"{len(dork_emails)} new domain emails from external sites"
        if dork_status == "blocked":
            dork_msg += " [search blocked]"
        print(f"         🔍 Google dork: {dork_msg}")

        # 5b: PDF extraction (top 5 PDFs by relevance)
        priority_pdfs = sorted(pdf_links,
            key=lambda u: sum(5 for kw in ['contact', 'staff', 'directory', 'budget', 'investor', 'purchasing', 'annual']
                             if kw in u.lower()),
            reverse=True
        )[:5]
        for pdf_url in priority_pdfs:
            pe, pn = extract_emails_from_pdf(pdf_url)
            for e in pe:
                if e not in existing_all:
                    pdf_emails.append(e)
                    existing_all.add(e)
            pdf_names.extend(pn)
            time.sleep(0.5)
        if pdf_emails:
            print(f"         📄 PDFs: {len(pdf_emails)} emails from {len(priority_pdfs)} documents")
        if pdf_names:
            existing_name_keys = {(n[0].lower(), n[1].lower()) for n in names}
            new_pdf_names = [n for n in pdf_names if (n[0].lower(), n[1].lower()) not in existing_name_keys]
            names.extend(new_pdf_names)
            print(f"         📄 PDFs: {len(new_pdf_names)} new names")
    elif deep and search_disabled:
        print(f"      ⏭️ Phase 5: Skipped (search disabled)")
    else:
        print(f"      ⏭️ Phase 5: Skipped (use --deep to enable)")

    # BUILD CONTACTS
    now = datetime.now(timezone.utc).isoformat()
    contacts = []

    # 1. Mailto emails (HIGH confidence)
    for email in mailto_emails:
        relevance, dept = score_dept_relevance(email)
        contacts.append({
            "state_id": state_id,
            "county_id": cid if entity_type == "county" else county.get("county_id"),
            "city_id": cid if entity_type == "city" else None,
            "entity_name": name, "entity_type": entity_type,
            "email": email, "department": dept,
            "website_url": base_url, "verified": True,
            "confidence": "high", "source": "mailto",
            "dept_relevance": relevance,
            "last_crawled_at": now, "campaign_status": "unsent",
        })

    # 1b. Cloudflare decoded emails (HIGH confidence — intentionally published)
    for email in cf_emails:
        if email not in set(mailto_emails):  # avoid dupes with mailto
            relevance, dept = score_dept_relevance(email)
            contacts.append({
                "state_id": state_id,
            "county_id": cid if entity_type == "county" else county.get("county_id"),
            "city_id": cid if entity_type == "city" else None,
                "entity_name": name, "entity_type": entity_type,
                "email": email, "department": dept,
                "website_url": base_url, "verified": True,
                "confidence": "high", "source": "cloudflare_decoded",
                "dept_relevance": relevance,
                "last_crawled_at": now, "campaign_status": "unsent",
            })

    # 2. Body emails (MEDIUM confidence)
    for email in body_emails:
        relevance, dept = score_dept_relevance(email)
        contacts.append({
            "state_id": state_id,
            "county_id": cid if entity_type == "county" else county.get("county_id"),
            "city_id": cid if entity_type == "city" else None,
            "entity_name": name, "entity_type": entity_type,
            "email": email, "department": dept,
            "website_url": base_url, "verified": True,
            "confidence": "medium", "source": "body",
            "dept_relevance": relevance,
            "last_crawled_at": now, "campaign_status": "unsent",
        })

    # 2b. Google dork emails (MEDIUM confidence — found on external sites)
    for email in dork_emails:
        relevance, dept = score_dept_relevance(email)
        contacts.append({
            "state_id": state_id,
            "county_id": cid if entity_type == "county" else county.get("county_id"),
            "city_id": cid if entity_type == "city" else None,
            "entity_name": name, "entity_type": entity_type,
            "email": email, "department": dept,
            "website_url": base_url, "verified": True,
            "confidence": "medium", "source": "google_dork",
            "dept_relevance": relevance,
            "last_crawled_at": now, "campaign_status": "unsent",
        })

    # 2c. PDF emails (MEDIUM confidence — government docs)
    for email in pdf_emails:
        relevance, dept = score_dept_relevance(email)
        contacts.append({
            "state_id": state_id,
            "county_id": cid if entity_type == "county" else county.get("county_id"),
            "city_id": cid if entity_type == "city" else None,
            "entity_name": name, "entity_type": entity_type,
            "email": email, "department": dept,
            "website_url": base_url, "verified": True,
            "confidence": "medium", "source": "pdf_document",
            "dept_relevance": relevance,
            "last_crawled_at": now, "campaign_status": "unsent",
        })

    # 3. Generated emails — confidence depends on source
    for g in verified_gen:
        relevance, dept = score_dept_relevance(g["email"], g.get("title", ""))
        src = g.get('source', 'unknown')
        # Minutes-sourced names get very_low confidence (guessing both name AND email)
        conf = "very_low" if src == "minutes" else "low"
        contacts.append({
            "state_id": state_id,
            "county_id": cid if entity_type == "county" else county.get("county_id"),
            "city_id": cid if entity_type == "city" else None,
            "entity_name": name, "entity_type": entity_type,
            "contact_name": g.get("contact_name"),
            "title": g.get("title"),
            "email": g["email"], "department": dept or g.get("title"),
            "website_url": base_url, "verified": False,
            "confidence": conf, "source": f"generated_{src}",
            "dept_relevance": relevance,
            "last_crawled_at": now, "campaign_status": "unsent",
        })

    saved = save_contacts(contacts, state_id)

    # Update county crawl timestamp
    mark_entity_crawled(cid, base_url, table=table)

    # Cache pattern + catch-all status for future runs
    if pattern_name:
        cache_pattern(domain, pattern_name, all_domain_emails, is_catch_all=is_catch_all_result)

    # Log crawl run summary
    try:
        supabase.table("crawl_runs").insert({
            "county_id": cid if entity_type == "county" else county.get("county_id"),
            "city_id": cid if entity_type == "city" else None,
            "state_id": state_id,
            "domain": domain,
            "pages_crawled": pages,
            "mailto_found": len(mailto_emails),
            "body_found": len(body_emails),
            "names_found": len(names),
            "generated": len(verified_gen),
            "total_saved": saved,
            "pattern_detected": pattern_name,
            "is_catch_all": is_catch_all_result,
        }).execute()
    except Exception:
        pass  # crawl_runs table might not exist yet, that's ok

    hi = len(mailto_emails) + len(cf_emails)
    med = len(body_emails) + len(dork_emails) + len(pdf_emails)
    lo = len(verified_gen)
    print(f"      💾 Saved {saved} | HIGH: {hi} (mailto:{len(mailto_emails)} cf:{len(cf_emails)}) | MEDIUM: {med} (body:{len(body_emails)} dork:{len(dork_emails)} pdf:{len(pdf_emails)}) | LOW(gen): {lo}")
    return saved


# =====================================================
# MAIN
# =====================================================

def main():
    parser = argparse.ArgumentParser(description="Email Discovery Engine v3.1")
    parser.add_argument("--force", action="store_true",
                        help="Force re-crawl (ignore last_crawled_at)")
    parser.add_argument("--deep", action="store_true",
                        help="Enable Phase 5: Google dork + PDF extraction")
    parser.add_argument("--counties", nargs="+",
                        help="Target specific counties/cities (e.g. 'Bexar County' 'Houston city')")
    parser.add_argument("--state", default="TX",
                        help="State abbreviation (default: TX)")
    parser.add_argument("--type", default="county", choices=["county", "city"],
                        help="Entity type to crawl (default: county)")
    parser.add_argument("--skip-cdp", action="store_true", default=True,
                        help="Skip Census Designated Places (default: True)")
    parser.add_argument("--include-cdp", action="store_true",
                        help="Include CDPs (overrides --skip-cdp)")
    parser.add_argument("--min-pop", type=int, default=0,
                        help="Minimum population to crawl (default: 0)")
    parser.add_argument("--no-search", action="store_true",
                        help="Skip all search-dependent phases (LinkedIn, dork, website search fallback)")
    parser.add_argument("--skip", type=int, default=0,
                        help="Skip first N entities (resume from entity N+1)")
    args = parser.parse_args()

    entity_type = args.type
    table = "counties" if entity_type == "county" else "cities"
    label = "counties" if entity_type == "county" else "cities"
    Label = label.capitalize()
    skip_cdp = args.skip_cdp and not args.include_cdp

    # Wire --no-search to global flag
    global search_disabled
    if args.no_search:
        search_disabled = True

    print("=" * 65)
    print("🔥 Email Discovery Engine v3.1")
    print("   Phase 1:  Crawl (mailto + CF decode + body)")
    if search_disabled:
        print("   Phase 1b: LinkedIn name discovery [DISABLED — --no-search]")
    else:
        print("   Phase 1b: LinkedIn name discovery")
    print("   Phase 2:  Pattern detection + caching")
    print("   Phase 3:  Name → email generation")
    print("   Phase 4:  SMTP verification")
    if args.deep and not search_disabled:
        print("   Phase 5:  Intelligence sweep (DDG dork + PDF) ✅")
    elif args.deep and search_disabled:
        print("   Phase 5:  Intelligence sweep [DISABLED — --no-search]")
    else:
        print("   Phase 5:  Intelligence sweep [SKIPPED — use --deep]")
    flags = f"{'--force ' if args.force else ''}{'--deep ' if args.deep else ''}--state {args.state} --type {entity_type}"
    if skip_cdp:
        flags += " --skip-cdp"
    if args.min_pop > 0:
        flags += f" --min-pop {args.min_pop}"
    if search_disabled:
        flags += " --no-search"
    print(f"   Flags:    {flags}")
    print("=" * 65)

    state = supabase.table("states").select("id").eq("abbreviation", args.state).single().execute()
    state_id = state.data["id"]

    entities = []
    offset = 0
    while True:
        r = supabase.table(table).select("*").eq("state_id", state_id).range(offset, offset + 999).execute()
        entities.extend(r.data)
        if len(r.data) < 1000:
            break
        offset += 1000

    total_loaded = len(entities)

    # Filter out CDPs (unincorporated areas with no municipal government)
    if entity_type == "city" and skip_cdp:
        entities = [e for e in entities if not e["name"].lower().endswith(" cdp")]
        cdp_skipped = total_loaded - len(entities)
        if cdp_skipped:
            print(f"\n   ⏭️  Skipped {cdp_skipped} CDPs (use --include-cdp to override)")

    # Filter by minimum population
    if args.min_pop > 0:
        before = len(entities)
        entities = [e for e in entities if (e.get("population") or 0) >= args.min_pop]
        pop_skipped = before - len(entities)
        if pop_skipped:
            print(f"   ⏭️  Skipped {pop_skipped} entities under population {args.min_pop}")

    # Filter to specific entities if requested
    if args.counties:
        target_names = {c.lower() for c in args.counties}
        entities = [c for c in entities if c["name"].lower() in target_names]
        if not entities:
            print(f"\n❌ No {label} matched: {args.counties}")
            return

    # Skip first N entities if --skip provided
    if args.skip > 0:
        entities = entities[args.skip:]
        print(f"   ⏭️  Skipped first {args.skip} entities (--skip {args.skip})")

    print(f"\n📊 {len(entities)} {args.state} {label} to process\n")

    total = 0
    with_results = 0

    for i, entity in enumerate(entities, args.skip + 1):
        print(f"{'='*50}")
        print(f"[{i}/{len(entities)}] {entity['name']}")
        try:
            n = process_county(entity, state_id, force=args.force, deep=args.deep, entity_type=entity_type, state_abbr=args.state)
            if n > 0:
                with_results += 1
                total += n
        except Exception as e:
            print(f"      ⚠️ Error: {e}")
        time.sleep(1)

    print(f"\n{'='*65}")
    print(f"✅ COMPLETE")
    print(f"   {Label} processed:    {len(entities)}")
    print(f"   {Label} with results: {with_results}")
    print(f"   Total contacts saved:  {total}")
    print(f"{'='*65}")




if __name__ == "__main__":
    main()

