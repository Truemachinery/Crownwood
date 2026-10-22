# Crownwood database checks

The production endpoint is `https://www.crownwoodchemicals.com/api/health/database`.
Each request performs an uncached, read-only Supabase query against `inquiries`,
limited to one row, using HEAD so no record data is returned. An empty table is
healthy. The query times out after eight seconds. Responses contain only
`{"status":"ok"}` (HTTP 200) or `{"status":"unavailable"}` (HTTP 503).
The existing Vercel server-side Supabase credentials stay on Vercel.

## Schedules

- Vercel checks at 03:43, 09:43, 15:43, and 21:43 UTC every day, using the site's
  existing Pro hosting plan. This is the primary schedule and does not depend on
  GitHub repository activity. Supabase remains on Free.
- GitHub Actions independently checks at 00:17, 06:17, 12:17, and 18:17 UTC every day. It retries
  twice before failing. Run **Crownwood database health** manually from the
  repository's Actions tab when needed.

No plan upgrade, new database records, or new credentials are required. Both
schedulers run in the cloud. Supabase Free inactivity prevention remains best
effort; only a paid Supabase plan removes automatic inactivity pausing.

## Failures and maintenance

Review [workflow runs](https://github.com/Truemachinery/Crownwood/actions/workflows/database-health.yml).
For failure notifications, enable **Actions > Send notifications for failed
workflows only** in the GitHub account's notification settings. GitHub sends
scheduled-workflow notifications according to the workflow creator/last schedule
editor's preferences; this setup does not change account notification settings.

GitHub can delay scheduled runs and disables scheduled workflows in public
repositories after 60 days without repository activity. Re-enable the workflow
from Actions if necessary. The four daily Vercel checks continue independently.
Vercel cron runs and failures are visible in the project's Cron Jobs and logs.
If Vercel hosting is later downgraded to Hobby, reduce its schedule to once daily
or choose another external scheduler; Hobby does not allow multiple daily runs.

If a check fails, inspect the Supabase project status and Vercel function logs.
Resume the Supabase project if paused. These checks do not automatically resume
projects, test writes, or send inquiry emails.

To remove the schedules, remove the workflow and the `crons` entry from
`vercel.json`, then deploy the change to production.

References: [Supabase pausing](https://supabase.com/docs/guides/platform/free-project-pausing),
[GitHub schedules](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule),
[Vercel cron limits](https://vercel.com/docs/cron-jobs/usage-and-pricing).
