-- Clean up all garbage contacts from v1 spider run
-- Run this in Supabase SQL Editor before running v2 engine

DELETE FROM municipal_contacts;

-- Verify cleanup
SELECT COUNT(*) as remaining FROM municipal_contacts;
