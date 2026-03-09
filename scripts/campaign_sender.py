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

# Lazy init — preview command doesn't need these
supabase = None
def _get_supabase():
    global supabase
    if supabase is None:
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise ValueError("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    return supabase

def _require_resend():
    if not RESEND_API_KEY:
        raise ValueError("Set RESEND_API_KEY")

FROM_EMAIL = "Crownwood Chemicals <outreach@sales.crownwoodchemicals.com>"
REPLY_TO = "nate@crownwoodchemicals.com"

# Resend rate limit: 10 emails/sec on free tier, 100/sec on pro
SEND_DELAY = 0.15  # ~6-7 per second with overhead

# Confidence levels ranked
CONFIDENCE_RANK = {"high": 4, "medium": 3, "low": 2, "very_low": 1}


# =====================================================
# SEQUENCE TEMPLATES
# =====================================================

# Max steps per product sequence
SEQUENCE_STEPS = {"permabase-black": 4, "permabase": 1, "meltdown": 1, "phpm-50": 1}

# Day delays between steps (index 0 = delay before step 2, etc.)
STEP_DELAYS = {1: 0, 2: 4, 3: 9, 4: 16}


def get_sequence_template(product, contact, step=1):
    """Return (subject, html_body, preview_text) for a product email at a given sequence step."""
    name = contact.get("contact_name") or "Public Works Director"
    entity = contact.get("entity_name", "your county")
    first_name = name.split()[0] if name and name != "Public Works Director" else None
    greeting = f"Hi {first_name}," if first_name else "Hello,"

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

        "permabase-black": _pb_black_sequence(greeting, first_name, entity, step),

        "phpm-50": {
            1: {
                "subject": f"PHPM-50 Dust Control — Road Maintenance Solution for {entity}",
                "preview": "Permanent dust suppression for unpaved county roads.",
                "html": f"""<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
  <div style="padding: 32px; background: #ffffff;">
    <p style="font-size: 16px; line-height: 1.6;">{greeting}</p>
    <p style="font-size: 16px; line-height: 1.6;">
      Is dust on unpaved roads a challenge for {entity}? Our <strong>PHPM-50</strong>
      dust control agent provides long-lasting suppression — 85-95% reduction, lasts through
      multiple rain cycles, and hardens the road surface. Non-toxic, spray-on with a standard water truck.
    </p>
    <p style="font-size: 16px; line-height: 1.6;">Available in 275-gallon totes. We deliver throughout Texas.</p>
    <p style="font-size: 16px; line-height: 1.6;">Worth a look?</p>
    <p style="font-size: 16px; line-height: 1.6; margin-top: 24px;">
      — Nathaniel Jose<br>Crownwood Chemicals · San Antonio, TX<br>
      <span style="color: #64748b;">Nate@crownwoodchemicals.com · (210) 792-5236</span>
    </p>
  </div>
</div>"""
            },
        },
    }

    tmpl = templates.get(product)
    if not tmpl:
        raise ValueError(f"Unknown product: {product}. Options: {', '.join(templates.keys())}")

    # For products with sequences, tmpl is already the step dict
    # For products without sequences, tmpl is a dict with step keys
    if isinstance(tmpl, dict) and "subject" in tmpl:
        return tmpl["subject"], tmpl["html"], tmpl.get("preview", "")
    elif isinstance(tmpl, dict) and step in tmpl:
        s = tmpl[step]
        return s["subject"], s["html"], s.get("preview", "")
    else:
        raise ValueError(f"No step {step} for product {product}")


def _pb_black_sequence(greeting, first_name, entity, step):
    """Permabase Black 4-step cold outreach sequence."""
    PRODUCT_URL = "https://www.crownwoodchemicals.com/chemicals/permabase-black"
    SIG_FULL = """
— Nathaniel Jose
Crownwood Chemicals · San Antonio, TX
Nate@crownwoodchemicals.com · (210) 792-5236
crownwoodchemicals.com"""
    SIG_SHORT = """
— Nate
(210) 792-5236"""

    sequences = {
        # ── STEP 1: THE HOOK (~110 words, minimal HTML with button) ──
        1: {
            "subject": f"Stabilize + prime 1 mile of county road for $5,400 — {entity}",
            "preview": "No heat required. Shoots from any water truck or spray trailer.",
            "html": f"""<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; color: #27272a; font-size: 16px; line-height: 1.7;">

<p>{greeting}</p>

<p>Most counties are facing the same math: miles of failing dirt and chipseal roads, a shrinking budget, and no asphalt money.</p>

<p><strong>Permabase Black</strong> closes that gap. It's a polymer emulsion that permanently stabilizes the subgrade and doubles as the prime coat and tack coat underseal — one product, one pass, three jobs done. Shoots cold from any water truck or spray trailer. No heat, no special equipment.</p>

<p>One 275-gallon tote covers ~1 mile at 20ft wide. <strong>$5,400 delivered</strong> to your job site. Made in Texas.</p>

<div style="text-align: center; margin: 28px 0;">
  <a href="{PRODUCT_URL}" target="_blank"
     style="background-color:#18181b;color:#ffffff;font-family:Arial,sans-serif;font-size:15px;font-weight:700;
            text-decoration:none;padding:14px 36px;border-radius:4px;display:inline-block;">
    Watch the Field Demo →
  </a>
</div>

<p>Worth a look for your road program?</p>

<p style="margin-top: 28px; font-size: 14px; color: #52525b; border-top: 1px solid #e4e4e7; padding-top: 20px;">
  <strong>Nathaniel Jose</strong><br>
  Crownwood Chemicals · San Antonio, TX<br>
  <a href="mailto:Nate@crownwoodchemicals.com" style="color:#2563eb;text-decoration:none;">Nate@crownwoodchemicals.com</a> · <a href="tel:+12107925236" style="color:#2563eb;text-decoration:none;">(210) 792-5236</a><br>
  <a href="https://www.crownwoodchemicals.com" style="color:#71717a;text-decoration:none;">crownwoodchemicals.com</a>
</p>

</div>"""
        },

        # ── STEP 2: ANGLE SHIFT — "no heat, any equipment" (Day 4, plain text) ──
        2: {
            "subject": f"re: quick follow-up — {entity} road question",
            "preview": "One detail I didn't mention — no heat required.",
            "html": f"""<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; color: #27272a; font-size: 16px; line-height: 1.7;">

<p>{greeting}</p>

<p>Sent a note a few days ago about Permabase Black — wanted to add one detail.</p>

<p>Unlike tack or prime emulsions, it requires no heat. Apply it cold, straight from whatever you already have — water truck, distributor, or even a homemade trailer with a trash pump. If it sprays water, it sprays Permabase Black.</p>

<p>Here's the field demo: <a href="{PRODUCT_URL}" style="color:#2563eb;">{PRODUCT_URL}</a></p>

<p style="white-space: pre-line;">{SIG_SHORT}</p>

</div>"""
        },

        # ── STEP 3: VALUE ADD — cost comparison (Day 9, plain text) ──
        3: {
            "subject": f"cost comparison for your files — {entity}",
            "preview": "$5,400/mile vs. $80,000+/mile — the budget math.",
            "html": f"""<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; color: #27272a; font-size: 16px; line-height: 1.7;">

<p>{greeting}</p>

<p>Figured this might be useful for road budget planning:</p>

<p>
• Permabase Black: ~$5,400/mile (base stabilization + prime coat, one pass)<br>
• Hot-mix asphalt: $80,000–$120,000+/mile<br>
• Lime + asphalt cap: two mobilizations, double the cost
</p>

<p>Happy to put together a quote for specific footage if anything's on the radar.</p>

<p style="white-space: pre-line;">{SIG_SHORT}</p>

</div>"""
        },

        # ── STEP 4: BREAKUP (Day 16, plain text) ──
        4: {
            "subject": "closing your file",
            "preview": "",
            "html": f"""<div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; color: #27272a; font-size: 16px; line-height: 1.7;">

<p>{greeting}</p>

<p>Haven't heard back, so I'll assume the timing isn't right — closing your file.</p>

<p>If road stabilization or dust control ever comes around, you can reach me directly at <a href="mailto:Nate@crownwoodchemicals.com" style="color:#2563eb;">Nate@crownwoodchemicals.com</a> or (210) 792-5236.</p>

<p>Good luck with the season.</p>

<p style="white-space: pre-line;">{SIG_SHORT}</p>

</div>"""
        },
    }

    return sequences.get(step, sequences[1])


# =====================================================
# CAMPAIGN OPERATIONS
# =====================================================

def create_campaign(product, states, min_confidence="medium", min_relevance=0, entity_type=None):
    """Create a new campaign and return the campaign ID."""
    # Build target query to count contacts
    query = _get_supabase().table("municipal_contacts").select("id", count="exact")
    if states:
        state_rows = _get_supabase().table("states").select("id, abbreviation").execute()
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
    subject, _, _ = get_sequence_template(product, sample_contact, step=1)

    # Create campaign record
    campaign = _get_supabase().table("email_campaigns").insert({
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


def send_campaign(campaign_id, dry_run=False, batch_size=50, min_confidence="medium", min_relevance=0, step=1):
    """Send emails for a campaign."""
    # Load campaign
    camp = _get_supabase().table("email_campaigns").select("*").eq("id", campaign_id).single().execute()
    if not camp.data:
        print(f"❌ Campaign {campaign_id} not found")
        return
    campaign = camp.data
    product = campaign["product"]
    target_states = campaign.get("target_states") or []

    max_steps = SEQUENCE_STEPS.get(product, 1)
    if step > max_steps:
        print(f"❌ Product '{product}' only has {max_steps} step(s). Requested step {step}.")
        return

    print(f"\n{'='*60}")
    print(f"📧 {'DRY RUN — ' if dry_run else ''}Sending: {campaign['name']}")
    print(f"   Product: {product}  |  Step: {step}/{max_steps}  |  Day {STEP_DELAYS.get(step, 0)}")
    print(f"{'='*60}")

    # Get contacts that have already received emails for this campaign
    try:
        already_sent = _get_supabase().table("email_sends").select("contact_id, sequence_step").eq("campaign_id", campaign_id).execute()
    except Exception:
        # sequence_step column might not exist yet
        already_sent = _get_supabase().table("email_sends").select("contact_id").eq("campaign_id", campaign_id).execute()
    # Track which contacts received which steps
    sent_steps = {}
    for r in already_sent.data:
        cid = r["contact_id"]
        s = r.get("sequence_step") or 1
        sent_steps.setdefault(cid, set()).add(s)
    # For this step, skip contacts who already received it
    sent_ids = {cid for cid, steps in sent_steps.items() if step in steps}

    # Build contact query
    query = _get_supabase().table("municipal_contacts").select("*")
    if target_states:
        state_rows = _get_supabase().table("states").select("id, abbreviation").execute()
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
        print(f"\n   🔍 DRY RUN — Step {step} — First 5 recipients:")
        for c in to_send[:5]:
            subject, _, preview = get_sequence_template(product, c, step=step)
            print(f"      → {c['email']} ({c.get('entity_name', 'N/A')}) [{c.get('confidence', '?')}]")
            print(f"        Subject: {subject}")
            if preview:
                print(f"        Preview: {preview}")
        print(f"\n   Would send {len(to_send)} emails (step {step}). Run without --dry-run to send.")
        return

    # Update campaign status
    _get_supabase().table("email_campaigns").update({"status": "sending"}).eq("id", campaign_id).execute()

    sent = 0
    failed = 0
    bounced = 0

    for i, contact in enumerate(to_send):
        if batch_size and sent >= batch_size:
            print(f"\n   ⏸️  Batch limit ({batch_size}) reached. Run again to continue.")
            break

        subject, html, preview = get_sequence_template(product, contact, step=step)

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
                    **({
                        "headers": {"X-Entity-Ref-ID": f"{campaign_id}-{contact['id']}-s{step}"}
                    } if step > 1 else {}),
                },
                timeout=10,
            )

            if response.status_code == 200:
                resend_id = response.json().get("id", "")
                # Record send
                send_record = {
                    "campaign_id": campaign_id,
                    "contact_id": contact["id"],
                    "status": "sent",
                    "resend_message_id": resend_id,
                }
                try:
                    send_record["sequence_step"] = step
                    _get_supabase().table("email_sends").insert(send_record).execute()
                except Exception:
                    del send_record["sequence_step"]
                    _get_supabase().table("email_sends").insert(send_record).execute()
                # Update contact status
                _get_supabase().table("municipal_contacts").update(
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
                    _get_supabase().table("email_sends").insert({
                        "campaign_id": campaign_id,
                        "contact_id": contact["id"],
                        "status": "bounced",
                    }).execute()
                    _get_supabase().table("municipal_contacts").update(
                        {"campaign_status": "bounced"}
                    ).eq("id", contact["id"]).execute()
                    bounced += 1

        except Exception as e:
            print(f"   ⚠️ Error: {contact['email']} — {e}")
            failed += 1

        time.sleep(SEND_DELAY)

    # Update campaign stats
    _get_supabase().table("email_campaigns").update({
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
    camp = _get_supabase().table("email_campaigns").select("*").eq("id", campaign_id).single().execute()
    if not camp.data:
        print(f"❌ Campaign {campaign_id} not found")
        return
    c = camp.data

    sends = _get_supabase().table("email_sends").select("status", count="exact").eq("campaign_id", campaign_id).execute()
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
    camps = _get_supabase().table("email_campaigns").select("*").order("created_at", desc=True).execute()
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
    send_parser.add_argument("--step", type=int, default=1,
                             help="Sequence step to send (1-4, default: 1)")

    # Stats
    stats_parser = subparsers.add_parser("stats", help="Show campaign stats")
    stats_parser.add_argument("campaign_id", help="Campaign UUID")

    # List
    subparsers.add_parser("list", help="List all campaigns")

    # Preview
    preview_parser = subparsers.add_parser("preview", help="Preview a template")
    preview_parser.add_argument("--product", required=True,
                                choices=["meltdown", "permabase", "permabase-black", "phpm-50"])
    preview_parser.add_argument("--step", type=int, default=1,
                                help="Sequence step to preview (1-4)")

    args = parser.parse_args()

    if args.command == "create":
        create_campaign(args.product, args.states, args.min_confidence,
                       args.min_relevance, args.entity_type)
    elif args.command == "send":
        send_campaign(args.campaign_id, args.dry_run, args.batch_size,
                     args.min_confidence, args.min_relevance, step=args.step)
    elif args.command == "stats":
        show_stats(args.campaign_id)
    elif args.command == "list":
        list_campaigns()
    elif args.command == "preview":
        sample = {"contact_name": "John Smith", "entity_name": "Bexar County"}
        subject, html, preview = get_sequence_template(args.product, sample, step=args.step)
        print(f"\nSubject: {subject}")
        print(f"Preview: {preview}")
        print(f"\n--- HTML Body ---\n{html}")
        print(f"\nWord count (visible text): ~{len(html.split())} tokens")
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
