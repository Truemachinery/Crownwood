-- Add sequence_step tracking to email_sends
-- Tracks which step of a multi-email sequence was sent to each contact
ALTER TABLE email_sends ADD COLUMN IF NOT EXISTS sequence_step integer DEFAULT 1;

-- Index for efficient step-level deduplication queries
CREATE INDEX IF NOT EXISTS idx_email_sends_step ON email_sends (campaign_id, contact_id, sequence_step);
