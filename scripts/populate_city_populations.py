#!/usr/bin/env python3
"""
Populate city population data from Census API.
Uses the Census Bureau ACS 5-Year estimates for any US state.
Usage: python3 populate_city_populations.py [STATE_ABBR ...]
       python3 populate_city_populations.py OK LA
       python3 populate_city_populations.py  # defaults to TX
"""
import os
import sys
import requests
from supabase import create_client

SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

CENSUS_URL = "https://api.census.gov/data/2022/acs/acs5"

# State abbreviation → FIPS code
STATE_FIPS = {
    'AL': '01', 'AK': '02', 'AZ': '04', 'AR': '05', 'CA': '06',
    'CO': '08', 'CT': '09', 'DE': '10', 'FL': '12', 'GA': '13',
    'HI': '15', 'ID': '16', 'IL': '17', 'IN': '18', 'IA': '19',
    'KS': '20', 'KY': '21', 'LA': '22', 'ME': '23', 'MD': '24',
    'MA': '25', 'MI': '26', 'MN': '27', 'MS': '28', 'MO': '29',
    'MT': '30', 'NE': '31', 'NV': '32', 'NH': '33', 'NJ': '34',
    'NM': '35', 'NY': '36', 'NC': '37', 'ND': '38', 'OH': '39',
    'OK': '40', 'OR': '41', 'PA': '42', 'RI': '44', 'SC': '45',
    'SD': '46', 'TN': '47', 'TX': '48', 'UT': '49', 'VT': '50',
    'VA': '51', 'WA': '53', 'WV': '54', 'WI': '55', 'WY': '56',
    'DC': '11',
}


def fetch_census_populations(state_abbr):
    """Fetch population data for all places in a state from Census Bureau."""
    fips = STATE_FIPS.get(state_abbr.upper())
    if not fips:
        print(f"❌ Unknown state: {state_abbr}")
        return {}
    print(f"📊 Fetching {state_abbr} city populations from Census Bureau ACS 5-Year...")
    params = {
        "get": "NAME,B01001_001E",
        "for": "place:*",
        "in": f"state:{fips}",
    }
    r = requests.get(CENSUS_URL, params=params, timeout=30)
    if r.status_code != 200:
        print(f"❌ Census API returned {r.status_code}: {r.text[:300]}")
        return {}

    data = r.json()
    rows = data[1:]
    print(f"   Got {len(rows)} places from Census")

    populations = {}
    for row in rows:
        name = row[0]
        pop = int(row[1]) if row[1] else 0
        # Strip state suffix (e.g. ", Texas", ", Oklahoma")
        if ", " in name:
            name = name.rsplit(", ", 1)[0].strip()
        populations[name.lower()] = pop
    return populations


def update_supabase_populations(state_abbr, populations):
    """Update city populations in Supabase for a state."""
    state = supabase.table("states").select("id").eq("abbreviation", state_abbr.upper()).single().execute()
    state_id = state.data["id"]

    cities = []
    offset = 0
    while True:
        r = supabase.table("cities").select("id, name, population").eq("state_id", state_id).range(offset, offset + 999).execute()
        cities.extend(r.data)
        if len(r.data) < 1000:
            break
        offset += 1000

    print(f"\n📝 Updating {len(cities)} {state_abbr} cities in Supabase...")

    updated = 0
    not_found = 0

    for city in cities:
        name = city["name"].lower()
        current_pop = city.get("population") or 0

        if name in populations:
            new_pop = populations[name]
            if new_pop != current_pop:
                try:
                    supabase.table("cities").update({"population": new_pop}).eq("id", city["id"]).execute()
                    updated += 1
                    if updated % 100 == 0:
                        print(f"   Updated {updated}...")
                except Exception as e:
                    print(f"   ⚠️ Error updating {city['name']}: {e}")
        else:
            not_found += 1

    print(f"\n✅ {state_abbr} population update: {updated} updated, {not_found} not in Census")


if __name__ == "__main__":
    states = sys.argv[1:] if len(sys.argv) > 1 else ["TX"]
    for st in states:
        pops = fetch_census_populations(st)
        if pops:
            update_supabase_populations(st, pops)
        print()
