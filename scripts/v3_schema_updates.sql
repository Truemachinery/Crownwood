-- v3 Schema Updates — Run in Supabase SQL Editor

-- 1. Store detected email patterns per domain (avoids re-detection on future runs)
CREATE TABLE IF NOT EXISTS domain_patterns (
  id SERIAL PRIMARY KEY,
  domain TEXT UNIQUE NOT NULL,
  pattern_name TEXT NOT NULL,           -- 'flast', 'first.last', etc.
  sample_emails TEXT[],                 -- emails used to detect pattern
  detected_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Add dept_relevance scoring and mailto confidence to contacts
ALTER TABLE municipal_contacts ADD COLUMN IF NOT EXISTS confidence TEXT DEFAULT 'low';
ALTER TABLE municipal_contacts ADD COLUMN IF NOT EXISTS dept_relevance INT DEFAULT 0;
ALTER TABLE municipal_contacts ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'crawl';
ALTER TABLE municipal_contacts ADD COLUMN IF NOT EXISTS last_crawled_at TIMESTAMPTZ;

-- 3. Add last_crawled to counties so we can skip recently-crawled ones
ALTER TABLE counties ADD COLUMN IF NOT EXISTS last_crawled_at TIMESTAMPTZ;
ALTER TABLE counties ADD COLUMN IF NOT EXISTS website_url TEXT;
