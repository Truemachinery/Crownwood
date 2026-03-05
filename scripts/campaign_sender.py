"""
Crownwood Chemicals — Resend Campaign Sender
=============================================
Sends targeted product emails to discovered municipal contacts.

Features:
- Product-specific HTML email templates
- Confidence & dept_relevance filtering
- Rate-limited sending (Resend: 10/sec on free tier)
- Individual send tracking in email_sends table
- Bounce/delivery tracking via campaign_status
- Resume support (skips already-sent contacts per campaign)

Usage:
  export RESEND_API_KEY="re_..."
  export SUPABASE_URL="..."
  export SUPABASE_SERVICE_ROLE_KEY="..."

  # Create a campaign
  python3 scripts/campaign_sender.py create \
    --product meltdown \
    --states TX \
    --min-confidence medium \
    --min-relevance 5

  # Send a campaign (dry-run first)
  python3 scripts/campaign_sender.py send <campaign_id> --dry-run
  python3 scripts/campaign_sender.py send <campaign_id>

  # Check stats
  python3 scripts/campaign_sender.py stats <campaign_id>
"""

import os
import sys
import json
import time
import argparse
import requests
from datetime import datetime, timezone
from supabase import create_client

# --- Config ---
RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
if not RESEND_API_KEY:
    raise ValueError("Set RESEND_API_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

FROM_EMAIL = "Crownwood Chemicals <outreach@sales.crownwoodchemicals.com>"
REPLY_TO = "nate@crownwoodchemicals.com"

# Resend rate limit: 10 emails/sec on free tier, 100/sec on pro
SEND_DELAY = 0.15  # ~6-7 per second with overhead

# Confidence levels ranked
CONFIDENCE_RANK = {"high": 4, "medium": 3, "low": 2, "very_low": 1}


# =====================================================
# PRODUCT EMAIL TEMPLATES
# =====================================================

def get_template(product, contact):
    """Return (subject, html_body) for a product email."""
    name = contact.get("contact_name") or "Public Works Director"
    entity = contact.get("entity_name", "your county")
    first_name = name.split()[0] if name and name != "Public Works Director" else None
    greeting = f"Hi {first_name}," if first_name else f"Hello,"

    templates = {
        "meltdown": {
            "subject": f"MeltDown De-Icer — Superior Ice Control for {entity}",
            "html": f"""
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
  <div style="background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 100%); padding: 32px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #00d4ff; margin: 0; font-size: 28px;">MeltDown</h1>
    <p style="color: #8892b0; margin: 8px 0 0 0; font-size: 14px;">Advanced Liquid De-Icer & Anti-Icer</p>
  </div>
  <div style="padding: 32px; background: #ffffff; border: 1px solid #e2e8f0; border-top: none;">
    <p style="font-size: 16px; line-height: 1.6;">{greeting}</p>
    <p style="font-size: 16px; line-height: 1.6;">
      I'm reaching out from <strong>Crownwood Chemicals</strong> regarding ice and snow management for {entity}.
      Our <strong>MeltDown</strong> liquid de-icer provides superior performance compared to traditional rock salt:
    </p>
    <ul style="font-size: 15px; line-height: 1.8; color: #334155;">
      <li>✅ <strong>Works down to -40°F</strong> — effective in extreme conditions</li>
      <li>✅ <strong>Pre-wet & anti-icing</strong> — prevents ice from bonding to pavement</li>
      <li>✅ <strong>Less corrosive</strong> than sodium chloride — protects infrastructure</li>
      <li>✅ <strong>Reduces material usage</strong> by 30-50% vs dry salt</li>
      <li>✅ <strong>Environmentally safer</strong> — lower chloride impact</li>
    </ul>
    <p style="font-size: 16px; line-height: 1.6;">
      We supply counties and municipalities across Texas and can provide <strong>bulk delivery</strong>
      in 275-gallon totes or tanker loads. Happy to provide a quote or schedule a product demo.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://crownwoodchemicals.com/chemicals/meltdown"
         style="background: linear-gradient(135deg, #00d4ff, #0099cc); color: white; padding: 14px 32px;
                border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;
                display: inline-block;">
        Learn More About MeltDown →
      </a>
    </div>
    <p style="font-size: 16px; line-height: 1.6;">
      Would you be available for a brief call this week to discuss your de-icing needs?
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin-top: 24px;">
      Best regards,<br>
      <strong>Crownwood Chemicals</strong><br>
      <span style="color: #64748b;">sales@crownwoodchemicals.com</span>
    </p>
  </div>
  <div style="padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-radius: 0 0 12px 12px;">
    Crownwood Chemicals · Texas · <a href="https://crownwoodchemicals.com" style="color: #64748b;">crownwoodchemicals.com</a>
  </div>
</div>"""
        },

        "permabase": {
            "subject": f"Permabase Soil Stabilizer — Road & Infrastructure Solutions for {entity}",
            "html": f"""
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
  <div style="background: linear-gradient(135deg, #1a3a2a 0%, #2d5a3f 100%); padding: 32px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #4ade80; margin: 0; font-size: 28px;">Permabase</h1>
    <p style="color: #86efac; margin: 8px 0 0 0; font-size: 14px;">Professional Soil Stabilizer</p>
  </div>
  <div style="padding: 32px; background: #ffffff; border: 1px solid #e2e8f0; border-top: none;">
    <p style="font-size: 16px; line-height: 1.6;">{greeting}</p>
    <p style="font-size: 16px; line-height: 1.6;">
      I'm reaching out from <strong>Crownwood Chemicals</strong> to introduce our <strong>Permabase</strong>
      soil stabilizer — designed for county road maintenance and infrastructure projects at {entity}.
    </p>
    <ul style="font-size: 15px; line-height: 1.8; color: #334155;">
      <li>✅ <strong>Stabilizes unpaved roads</strong> — reduces dust and erosion</li>
      <li>✅ <strong>Extends road life</strong> — minimizes washboarding and potholes</li>
      <li>✅ <strong>Cost-effective</strong> — reduces grading and re-graveling frequency</li>
      <li>✅ <strong>Easy application</strong> — spray-on with standard equipment</li>
      <li>✅ <strong>Proven performance</strong> on Texas county roads</li>
    </ul>
    <p style="font-size: 16px; line-height: 1.6;">
      Permabase is available in <strong>275-gallon totes</strong> or bulk delivery.
      We'd love to set up a test section on one of your roads to demonstrate the results.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://crownwoodchemicals.com/chemicals/permabase"
         style="background: linear-gradient(135deg, #4ade80, #22c55e); color: white; padding: 14px 32px;
                border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;
                display: inline-block;">
        Learn More About Permabase →
      </a>
    </div>
    <p style="font-size: 16px; line-height: 1.6;">
      Can I schedule a quick call to discuss your road maintenance challenges?
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin-top: 24px;">
      Best regards,<br>
      <strong>Crownwood Chemicals</strong><br>
      <span style="color: #64748b;">sales@crownwoodchemicals.com</span>
    </p>
  </div>
  <div style="padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-radius: 0 0 12px 12px;">
    Crownwood Chemicals · Texas · <a href="https://crownwoodchemicals.com" style="color: #64748b;">crownwoodchemicals.com</a>
  </div>
</div>"""
        },

        "permabase-black": {
            "subject": f"Permabase Black — Asphalt Preservation for {entity} Roads",
            "html": f"""
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
  <div style="background: linear-gradient(135deg, #0a0a0a 0%, #2d2d2d 100%); padding: 32px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Permabase Black</h1>
    <p style="color: #a1a1aa; margin: 8px 0 0 0; font-size: 14px;">High-Performance Asphalt Emulsion Sealer</p>
  </div>
  <div style="padding: 32px; background: #ffffff; border: 1px solid #e2e8f0; border-top: none;">
    <p style="font-size: 16px; line-height: 1.6;">{greeting}</p>
    <p style="font-size: 16px; line-height: 1.6;">
      I'm reaching out from <strong>Crownwood Chemicals</strong> about asphalt maintenance for {entity}.
      Our <strong>Permabase Black</strong> emulsion sealer extends pavement life and restores appearance:
    </p>
    <ul style="font-size: 15px; line-height: 1.8; color: #334155;">
      <li>✅ <strong>Seals & protects</strong> existing asphalt from water, UV, and oxidation</li>
      <li>✅ <strong>Fills hairline cracks</strong> — prevents water infiltration</li>
      <li>✅ <strong>Restores black appearance</strong> — like fresh pavement</li>
      <li>✅ <strong>275-gallon totes</strong> — covers ~14,000 sq ft per tote</li>
      <li>✅ <strong>Cost: fraction of repaving</strong> — extends road life 5-7 years</li>
    </ul>
    <p style="font-size: 16px; line-height: 1.6;">
      Perfect for county parking lots, subdivision streets, and low-traffic roads.
      We deliver throughout Texas.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://crownwoodchemicals.com/chemicals/permabase-black"
         style="background: linear-gradient(135deg, #3f3f46, #18181b); color: white; padding: 14px 32px;
                border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;
                display: inline-block;">
        Learn More About Permabase Black →
      </a>
    </div>
    <p style="font-size: 16px; line-height: 1.6;">
      Would you like a quote for your county's road network?
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin-top: 24px;">
      Best regards,<br>
      <strong>Crownwood Chemicals</strong><br>
      <span style="color: #64748b;">sales@crownwoodchemicals.com</span>
    </p>
  </div>
  <div style="padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-radius: 0 0 12px 12px;">
    Crownwood Chemicals · Texas · <a href="https://crownwoodchemicals.com" style="color: #64748b;">crownwoodchemicals.com</a>
  </div>
</div>"""
        },

        "phpm-50": {
            "subject": f"PHPM-50 Dust Control — Road Maintenance Solution for {entity}",
            "html": f"""
<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
  <div style="background: linear-gradient(135deg, #78350f 0%, #a16207 100%); padding: 32px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #fef3c7; margin: 0; font-size: 28px;">PHPM-50</h1>
    <p style="color: #fde68a; margin: 8px 0 0 0; font-size: 14px;">Dust Control & Road Stabilizer</p>
  </div>
  <div style="padding: 32px; background: #ffffff; border: 1px solid #e2e8f0; border-top: none;">
    <p style="font-size: 16px; line-height: 1.6;">{greeting}</p>
    <p style="font-size: 16px; line-height: 1.6;">
      Is dust on unpaved roads a challenge for {entity}? Our <strong>PHPM-50</strong>
      dust control agent provides long-lasting suppression:
    </p>
    <ul style="font-size: 15px; line-height: 1.8; color: #334155;">
      <li>✅ <strong>Suppresses dust 85-95%</strong> — immediate results</li>
      <li>✅ <strong>Lasts through multiple rain cycles</strong> — not washed away</li>
      <li>✅ <strong>Hardens road surface</strong> — reduces maintenance needs</li>
      <li>✅ <strong>Environmentally friendly</strong> — non-toxic formula</li>
      <li>✅ <strong>Easy application</strong> — standard water truck</li>
    </ul>
    <p style="font-size: 16px; line-height: 1.6;">
      PHPM-50 is ideal for unpaved county roads, construction access roads, and rural subdivisions.
      Available in 275-gallon totes and bulk delivery.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="https://crownwoodchemicals.com/chemicals/phpm-50"
         style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 14px 32px;
                border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;
                display: inline-block;">
        Learn More About PHPM-50 →
      </a>
    </div>
    <p style="font-size: 16px; line-height: 1.6;">
      I'd love to discuss how PHPM-50 can help with your dust control needs. Available for a quick call?
    </p>
    <p style="font-size: 16px; line-height: 1.6; margin-top: 24px;">
      Best regards,<br>
      <strong>Crownwood Chemicals</strong><br>
      <span style="color: #64748b;">sales@crownwoodchemicals.com</span>
    </p>
  </div>
  <div style="padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; background: #f8fafc; border-radius: 0 0 12px 12px;">
    Crownwood Chemicals · Texas · <a href="https://crownwoodchemicals.com" style="color: #64748b;">crownwoodchemicals.com</a>
  </div>
</div>"""
        },
    }

    tmpl = templates.get(product)
    if not tmpl:
        raise ValueError(f"Unknown product: {product}. Options: {', '.join(templates.keys())}")
    return tmpl["subject"], tmpl["html"]


# =====================================================
# CAMPAIGN OPERATIONS
# =====================================================

def create_campaign(product, states, min_confidence="medium", min_relevance=0, entity_type=None):
    """Create a new campaign and return the campaign ID."""
    # Build target query to count contacts
    query = supabase.table("municipal_contacts").select("id", count="exact")
    if states:
        state_rows = supabase.table("states").select("id, abbreviation").execute()
        state_map = {s["abbreviation"]: s["id"] for s in state_rows.data}
        state_ids = [state_map[s] for s in states if s in state_map]
        if state_ids:
            query = query.in_("state_id", state_ids)
    if entity_type:
        query = query.eq("entity_type", entity_type)
    if min_relevance > 0:
        query = query.gte("dept_relevance", min_relevance)

    # Filter by confidence
    conf_min = CONFIDENCE_RANK.get(min_confidence, 0)
    valid_confs = [c for c, rank in CONFIDENCE_RANK.items() if rank >= conf_min]

    result = query.in_("confidence", valid_confs).execute()
    target_count = result.count if hasattr(result, 'count') and result.count else len(result.data)

    # Get subject line for template preview
    sample_contact = {"contact_name": "John Smith", "entity_name": "Sample County"}
    subject, _ = get_template(product, sample_contact)

    # Create campaign record
    campaign = supabase.table("email_campaigns").insert({
        "name": f"{product.title()} Campaign — {', '.join(states) if states else 'All States'}",
        "product": product,
        "subject_line": subject.replace("Sample County", "{county}"),
        "html_template": f"product:{product}",
        "target_states": states or [],
        "target_entity_type": entity_type,
        "target_departments": [],
        "status": "draft",
        "total_sent": 0,
        "total_opened": 0,
        "total_bounced": 0,
    }).execute()

    cid = campaign.data[0]["id"]

    print(f"\n✅ Campaign created!")
    print(f"   ID:            {cid}")
    print(f"   Product:       {product}")
    print(f"   Target states: {', '.join(states) if states else 'All'}")
    print(f"   Min confidence:{min_confidence}")
    print(f"   Min relevance: {min_relevance}")
    print(f"   Target count:  {target_count} contacts")
    print(f"\n   To send: python3 scripts/campaign_sender.py send {cid}")
    print(f"   Dry run: python3 scripts/campaign_sender.py send {cid} --dry-run")

    return cid


def send_campaign(campaign_id, dry_run=False, batch_size=50, min_confidence="medium", min_relevance=0):
    """Send emails for a campaign."""
    # Load campaign
    camp = supabase.table("email_campaigns").select("*").eq("id", campaign_id).single().execute()
    if not camp.data:
        print(f"❌ Campaign {campaign_id} not found")
        return
    campaign = camp.data
    product = campaign["product"]
    target_states = campaign.get("target_states") or []

    print(f"\n{'='*60}")
    print(f"📧 {'DRY RUN — ' if dry_run else ''}Sending: {campaign['name']}")
    print(f"   Product: {product}")
    print(f"{'='*60}")

    # Get contacts that haven't been sent this campaign
    already_sent = supabase.table("email_sends").select("contact_id").eq("campaign_id", campaign_id).execute()
    sent_ids = {r["contact_id"] for r in already_sent.data}

    # Build contact query
    query = supabase.table("municipal_contacts").select("*")
    if target_states:
        state_rows = supabase.table("states").select("id, abbreviation").execute()
        state_map = {s["abbreviation"]: s["id"] for s in state_rows.data}
        state_ids = [state_map[s] for s in target_states if s in state_map]
        if state_ids:
            query = query.in_("state_id", state_ids)

    if min_relevance > 0:
        query = query.gte("dept_relevance", min_relevance)

    # Confidence filter
    conf_min = CONFIDENCE_RANK.get(min_confidence, 0)
    valid_confs = [c for c, rank in CONFIDENCE_RANK.items() if rank >= conf_min]
    query = query.in_("confidence", valid_confs)

    # Paginate through all contacts
    contacts = []
    offset = 0
    while True:
        r = query.range(offset, offset + 999).execute()
        contacts.extend(r.data)
        if len(r.data) < 1000:
            break
        offset += 1000

    # Filter out already-sent
    to_send = [c for c in contacts if c["id"] not in sent_ids]

    print(f"\n   Total matching contacts: {len(contacts)}")
    print(f"   Already sent:            {len(sent_ids)}")
    print(f"   To send this batch:      {len(to_send)}")

    if not to_send:
        print(f"\n   ✅ All contacts already sent!")
        return

    if dry_run:
        print(f"\n   🔍 DRY RUN — First 5 recipients:")
        for c in to_send[:5]:
            subject, _ = get_template(product, c)
            print(f"      → {c['email']} ({c.get('entity_name', 'N/A')}) [{c.get('confidence', '?')}]")
            print(f"        Subject: {subject}")
        print(f"\n   Would send {len(to_send)} emails. Run without --dry-run to send.")
        return

    # Update campaign status
    supabase.table("email_campaigns").update({"status": "sending"}).eq("id", campaign_id).execute()

    sent = 0
    failed = 0
    bounced = 0

    for i, contact in enumerate(to_send):
        if batch_size and sent >= batch_size:
            print(f"\n   ⏸️  Batch limit ({batch_size}) reached. Run again to continue.")
            break

        subject, html = get_template(product, contact)

        try:
            response = requests.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "from": FROM_EMAIL,
                    "to": [contact["email"]],
                    "reply_to": REPLY_TO,
                    "subject": subject,
                    "html": html,
                },
                timeout=10,
            )

            if response.status_code == 200:
                resend_id = response.json().get("id", "")
                # Record send
                supabase.table("email_sends").insert({
                    "campaign_id": campaign_id,
                    "contact_id": contact["id"],
                    "status": "sent",
                    "resend_message_id": resend_id,
                }).execute()
                # Update contact status
                supabase.table("municipal_contacts").update(
                    {"campaign_status": "sent"}
                ).eq("id", contact["id"]).execute()

                sent += 1
                if sent % 10 == 0:
                    print(f"   ✅ Sent {sent}/{len(to_send)} ({contact['email']})")
            else:
                error = response.json() if response.headers.get('content-type', '').startswith('application/json') else response.text
                print(f"   ⚠️ Failed: {contact['email']} — {error}")
                failed += 1

                # Check for bounce
                if response.status_code == 422:
                    supabase.table("email_sends").insert({
                        "campaign_id": campaign_id,
                        "contact_id": contact["id"],
                        "status": "bounced",
                    }).execute()
                    supabase.table("municipal_contacts").update(
                        {"campaign_status": "bounced"}
                    ).eq("id", contact["id"]).execute()
                    bounced += 1

        except Exception as e:
            print(f"   ⚠️ Error: {contact['email']} — {e}")
            failed += 1

        time.sleep(SEND_DELAY)

    # Update campaign stats
    supabase.table("email_campaigns").update({
        "status": "completed" if sent + len(sent_ids) >= len(contacts) else "sending",
        "total_sent": len(sent_ids) + sent,
        "total_bounced": bounced,
    }).eq("id", campaign_id).execute()

    print(f"\n{'='*60}")
    print(f"✅ Batch complete!")
    print(f"   Sent:    {sent}")
    print(f"   Failed:  {failed}")
    print(f"   Bounced: {bounced}")
    print(f"   Total campaign sends: {len(sent_ids) + sent}")
    print(f"{'='*60}")


def show_stats(campaign_id):
    """Show campaign statistics."""
    camp = supabase.table("email_campaigns").select("*").eq("id", campaign_id).single().execute()
    if not camp.data:
        print(f"❌ Campaign {campaign_id} not found")
        return
    c = camp.data

    sends = supabase.table("email_sends").select("status", count="exact").eq("campaign_id", campaign_id).execute()
    status_counts = {}
    for s in sends.data:
        st = s.get("status", "unknown")
        status_counts[st] = status_counts.get(st, 0) + 1

    print(f"\n{'='*50}")
    print(f"📊 Campaign: {c['name']}")
    print(f"{'='*50}")
    print(f"   Product:     {c['product']}")
    print(f"   Status:      {c['status']}")
    print(f"   Created:     {c['created_at'][:10]}")
    print(f"   States:      {', '.join(c.get('target_states') or ['All'])}")
    print(f"\n   📬 Send stats:")
    print(f"      Sent:      {status_counts.get('sent', 0)}")
    print(f"      Delivered:  {status_counts.get('delivered', 0)}")
    print(f"      Opened:    {status_counts.get('opened', 0)}")
    print(f"      Bounced:   {status_counts.get('bounced', 0)}")
    total = sum(status_counts.values())
    print(f"      Total:     {total}")
    print(f"{'='*50}")


def list_campaigns():
    """List all campaigns."""
    camps = supabase.table("email_campaigns").select("*").order("created_at", desc=True).execute()
    if not camps.data:
        print("No campaigns found.")
        return

    print(f"\n{'='*70}")
    print(f"{'ID':<38} {'Product':<18} {'Status':<12} {'Sent':<8}")
    print(f"{'='*70}")
    for c in camps.data:
        print(f"{c['id']:<38} {c['product']:<18} {c['status']:<12} {c.get('total_sent', 0):<8}")
    print(f"{'='*70}")


# =====================================================
# CLI
# =====================================================

def main():
    parser = argparse.ArgumentParser(description="Crownwood Chemicals Campaign Sender")
    subparsers = parser.add_subparsers(dest="command")

    # Create
    create_parser = subparsers.add_parser("create", help="Create a new campaign")
    create_parser.add_argument("--product", required=True,
                               choices=["meltdown", "permabase", "permabase-black", "phpm-50"])
    create_parser.add_argument("--states", nargs="+", default=["TX"],
                               help="State abbreviations (default: TX)")
    create_parser.add_argument("--min-confidence", default="medium",
                               choices=["high", "medium", "low", "very_low"])
    create_parser.add_argument("--min-relevance", type=int, default=0)
    create_parser.add_argument("--entity-type", choices=["county", "city"])

    # Send
    send_parser = subparsers.add_parser("send", help="Send a campaign")
    send_parser.add_argument("campaign_id", help="Campaign UUID")
    send_parser.add_argument("--dry-run", action="store_true")
    send_parser.add_argument("--batch-size", type=int, default=50,
                             help="Max emails per batch (default: 50)")
    send_parser.add_argument("--min-confidence", default="medium",
                             choices=["high", "medium", "low", "very_low"])
    send_parser.add_argument("--min-relevance", type=int, default=0)

    # Stats
    stats_parser = subparsers.add_parser("stats", help="Show campaign stats")
    stats_parser.add_argument("campaign_id", help="Campaign UUID")

    # List
    subparsers.add_parser("list", help="List all campaigns")

    args = parser.parse_args()

    if args.command == "create":
        create_campaign(args.product, args.states, args.min_confidence,
                       args.min_relevance, args.entity_type)
    elif args.command == "send":
        send_campaign(args.campaign_id, args.dry_run, args.batch_size,
                     args.min_confidence, args.min_relevance)
    elif args.command == "stats":
        show_stats(args.campaign_id)
    elif args.command == "list":
        list_campaigns()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
