"""
Phase 1: Populate Supabase with all US States, Counties, and Cities
Uses official US Census Bureau FIPS data (free, no scraping required).

Usage:
  pip install supabase requests
  python scripts/populate_geography.py
"""

import os
import csv
import io
import requests
from supabase import create_client

# --- Configuration ---
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# --- US States (50 states + DC) ---
STATES = [
    ("01", "Alabama", "AL"), ("02", "Alaska", "AK"), ("04", "Arizona", "AZ"),
    ("05", "Arkansas", "AR"), ("06", "California", "CA"), ("08", "Colorado", "CO"),
    ("09", "Connecticut", "CT"), ("10", "Delaware", "DE"), ("11", "District of Columbia", "DC"),
    ("12", "Florida", "FL"), ("13", "Georgia", "GA"), ("15", "Hawaii", "HI"),
    ("16", "Idaho", "ID"), ("17", "Illinois", "IL"), ("18", "Indiana", "IN"),
    ("19", "Iowa", "IA"), ("20", "Kansas", "KS"), ("21", "Kentucky", "KY"),
    ("22", "Louisiana", "LA"), ("23", "Maine", "ME"), ("24", "Maryland", "MD"),
    ("25", "Massachusetts", "MA"), ("26", "Michigan", "MI"), ("27", "Minnesota", "MN"),
    ("28", "Mississippi", "MS"), ("29", "Missouri", "MO"), ("30", "Montana", "MT"),
    ("31", "Nebraska", "NE"), ("32", "Nevada", "NV"), ("33", "New Hampshire", "NH"),
    ("34", "New Jersey", "NJ"), ("35", "New Mexico", "NM"), ("36", "New York", "NY"),
    ("37", "North Carolina", "NC"), ("38", "North Dakota", "ND"), ("39", "Ohio", "OH"),
    ("40", "Oklahoma", "OK"), ("41", "Oregon", "OR"), ("42", "Pennsylvania", "PA"),
    ("44", "Rhode Island", "RI"), ("45", "South Carolina", "SC"), ("46", "South Dakota", "SD"),
    ("47", "Tennessee", "TN"), ("48", "Texas", "TX"), ("49", "Utah", "UT"),
    ("50", "Vermont", "VT"), ("51", "Virginia", "VA"), ("53", "Washington", "WA"),
    ("54", "West Virginia", "WV"), ("55", "Wisconsin", "WI"), ("56", "Wyoming", "WY"),
]


def insert_states():
    """Insert all 50 states + DC into Supabase."""
    print("📍 Inserting states...")
    rows = [{"fips_code": f, "name": n, "abbreviation": a} for f, n, a in STATES]
    # Upsert to avoid duplicates on re-run
    result = supabase.table("states").upsert(rows, on_conflict="fips_code").execute()
    print(f"   ✅ {len(rows)} states inserted/updated")
    return result


def get_state_id_map():
    """Fetch state fips -> id mapping from Supabase."""
    result = supabase.table("states").select("id, fips_code").execute()
    return {row["fips_code"]: row["id"] for row in result.data}


def insert_counties(state_map):
    """
    Download and insert all US counties from Census Bureau.
    Source: https://www2.census.gov/geo/docs/reference/codes2020/national_county2020.txt
    """
    print("🏛️  Downloading county data from Census Bureau...")
    url = "https://www2.census.gov/geo/docs/reference/codes2020/national_county2020.txt"
    response = requests.get(url)
    response.raise_for_status()

    reader = csv.reader(io.StringIO(response.text), delimiter="|")
    header = next(reader)  # Skip header: STATE|STATEFP|COUNTYFP|COUNTYNS|COUNTYNAME|CLASSFP|FUNCSTAT

    counties = []
    for row in reader:
        if len(row) < 5:
            continue
        state_fips = row[1].strip()       # STATEFP
        county_fips_part = row[2].strip()  # COUNTYFP
        county_name = row[4].strip()       # COUNTYNAME
        full_fips = f"{state_fips}{county_fips_part}"

        state_id = state_map.get(state_fips)
        if state_id:
            counties.append({
                "state_id": state_id,
                "fips_code": full_fips,
                "name": county_name,
            })

    # Insert in batches of 500
    print(f"   📊 Found {len(counties)} counties. Inserting...")
    batch_size = 500
    for i in range(0, len(counties), batch_size):
        batch = counties[i:i + batch_size]
        supabase.table("counties").upsert(batch, on_conflict="fips_code").execute()
        print(f"   ... batch {i // batch_size + 1}/{(len(counties) // batch_size) + 1}")

    print(f"   ✅ {len(counties)} counties inserted/updated")


def get_county_id_map():
    """Fetch county fips -> id mapping."""
    all_counties = []
    page_size = 1000
    offset = 0
    while True:
        result = supabase.table("counties").select("id, fips_code").range(offset, offset + page_size - 1).execute()
        all_counties.extend(result.data)
        if len(result.data) < page_size:
            break
        offset += page_size
    return {row["fips_code"]: row["id"] for row in all_counties}


def insert_cities(state_map):
    """
    Download and insert all US incorporated places from Census Bureau.
    Source: https://www2.census.gov/geo/docs/reference/codes2020/national_place2020.txt
    """
    print("🏙️  Downloading city/place data from Census Bureau...")
    url = "https://www2.census.gov/geo/docs/reference/codes2020/national_place2020.txt"
    response = requests.get(url)
    response.raise_for_status()

    reader = csv.reader(io.StringIO(response.text), delimiter="|")
    header = next(reader)  # Skip header: STATE|STATEFP|PLACEFP|PLACENS|PLACENAME|TYPE|CLASSFP|FUNCSTAT|COUNTIES

    cities = []
    for row in reader:
        if len(row) < 5:
            continue
        state_fips = row[1].strip()       # STATEFP
        place_fips_part = row[2].strip()  # PLACEFP
        place_name = row[4].strip()       # PLACENAME
        full_fips = f"{state_fips}{place_fips_part}"

        state_id = state_map.get(state_fips)
        if state_id:
            cities.append({
                "state_id": state_id,
                "fips_code": full_fips,
                "name": place_name,
            })

    # Insert in batches of 500
    print(f"   📊 Found {len(cities)} cities/places. Inserting...")
    batch_size = 500
    for i in range(0, len(cities), batch_size):
        batch = cities[i:i + batch_size]
        supabase.table("cities").insert(batch).execute()
        print(f"   ... batch {i // batch_size + 1}/{(len(cities) // batch_size) + 1}")

    print(f"   ✅ {len(cities)} cities/places inserted/updated")


def main():
    print("=" * 60)
    print("🇺🇸 Crownwood Chemicals — US Geography Database Builder")
    print("=" * 60)
    print()

    # Step 1: States
    insert_states()
    state_map = get_state_id_map()
    print(f"   📋 State map: {len(state_map)} entries")
    print()

    # Step 2: Counties
    insert_counties(state_map)
    print()

    # Step 3: Cities/Places
    insert_cities(state_map)
    print()

    print("=" * 60)
    print("✅ COMPLETE — All US states, counties, and cities loaded!")
    print("=" * 60)


if __name__ == "__main__":
    main()
