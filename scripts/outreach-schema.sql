-- Nationwide Municipal Email Outreach System
-- Run this in Supabase SQL Editor

-- 1. States table
CREATE TABLE IF NOT EXISTS states (
  id SERIAL PRIMARY KEY,
  fips_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  abbreviation TEXT UNIQUE NOT NULL
);

-- 2. Counties table
CREATE TABLE IF NOT EXISTS counties (
  id SERIAL PRIMARY KEY,
  state_id INT REFERENCES states(id),
  fips_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL
);

-- 3. Cities / Incorporated Places
CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  state_id INT REFERENCES states(id),
  county_id INT REFERENCES counties(id),
  fips_code TEXT,
  name TEXT NOT NULL,
  population INT
);

-- 4. Municipal Contacts (scraped emails)
CREATE TABLE IF NOT EXISTS municipal_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  state_id INT REFERENCES states(id),
  county_id INT REFERENCES counties(id),
  city_id INT REFERENCES cities(id),
  entity_name TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('county', 'city')),
  department TEXT,
  contact_name TEXT,
  title TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  website_url TEXT,
  verified BOOLEAN DEFAULT false,
  last_verified_at TIMESTAMPTZ,
  campaign_status TEXT DEFAULT 'unsent' CHECK (campaign_status IN ('unsent', 'sent', 'opened', 'replied', 'bounced'))
);

-- 5. Email Campaigns
CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  product TEXT NOT NULL,
  subject_line TEXT NOT NULL,
  html_template TEXT NOT NULL,
  target_states TEXT[],
  target_entity_type TEXT,
  target_departments TEXT[],
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sending', 'completed')),
  total_sent INT DEFAULT 0,
  total_opened INT DEFAULT 0,
  total_bounced INT DEFAULT 0
);

-- 6. Email Sends (individual send tracking)
CREATE TABLE IF NOT EXISTS email_sends (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id UUID REFERENCES email_campaigns(id),
  contact_id UUID REFERENCES municipal_contacts(id),
  sent_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'opened', 'bounced')),
  resend_message_id TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_counties_state ON counties(state_id);
CREATE INDEX IF NOT EXISTS idx_cities_state ON cities(state_id);
CREATE INDEX IF NOT EXISTS idx_contacts_state ON municipal_contacts(state_id);
CREATE INDEX IF NOT EXISTS idx_contacts_campaign ON municipal_contacts(campaign_status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON municipal_contacts(email);
CREATE INDEX IF NOT EXISTS idx_sends_campaign ON email_sends(campaign_id);
CREATE INDEX IF NOT EXISTS idx_sends_contact ON email_sends(contact_id);

-- RLS policies
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE counties ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE municipal_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_sends ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for our scripts)
CREATE POLICY "Service role full access" ON states FOR ALL USING (true);
CREATE POLICY "Service role full access" ON counties FOR ALL USING (true);
CREATE POLICY "Service role full access" ON cities FOR ALL USING (true);
CREATE POLICY "Service role full access" ON municipal_contacts FOR ALL USING (true);
CREATE POLICY "Service role full access" ON email_campaigns FOR ALL USING (true);
CREATE POLICY "Service role full access" ON email_sends FOR ALL USING (true);
