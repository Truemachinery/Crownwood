-- v3 Quality Fixes — Run in Supabase SQL Editor

-- 1. Add is_catch_all caching to domain_patterns
ALTER TABLE domain_patterns ADD COLUMN IF NOT EXISTS is_catch_all BOOLEAN;

-- 2. Add crawl_runs table for dashboard visibility
CREATE TABLE IF NOT EXISTS crawl_runs (
  id SERIAL PRIMARY KEY,
  county_id INT REFERENCES counties(id),
  state_id INT REFERENCES states(id),
  domain TEXT NOT NULL,
  pages_crawled INT DEFAULT 0,
  mailto_found INT DEFAULT 0,
  body_found INT DEFAULT 0,
  names_found INT DEFAULT 0,
  generated INT DEFAULT 0,
  total_saved INT DEFAULT 0,
  pattern_detected TEXT,
  is_catch_all BOOLEAN,
  crawled_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Composite index for fast dedup in save_contacts
CREATE INDEX IF NOT EXISTS idx_contacts_state_email ON municipal_contacts(state_id, email);

-- Confidence values: 'high' (mailto), 'medium' (body), 'low' (generated), 'very_low' (minutes)
