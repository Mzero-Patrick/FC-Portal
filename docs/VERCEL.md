# Hosting on Vercel with your own Supabase

The site runs on [Vercel](https://vercel.com) and stores its data in a
[Supabase](https://supabase.com) project in the club's own account.
[`vercel.json`](../vercel.json) holds the build settings, and every push to
`main` (including edits made in Lovable, which sync to GitHub) redeploys the site.

## 1. Create the Supabase project

1. Sign in at [supabase.com/dashboard](https://supabase.com/dashboard) and click
   **New project**. Pick a region close to your fans (for Rwanda, Frankfurt
   `eu-central-1` or London `eu-west-2`) and save the database password.
2. Open **SQL Editor → New query**, paste the whole of
   [`drizzle/migrations/0000_ticketing_and_rewards.sql`](../drizzle/migrations/0000_ticketing_and_rewards.sql),
   and click **Run**. This creates the `profiles`, `ticket_orders`, `tickets`
   and `rewards` tables, their row-level security rules, and the trigger that
   creates a profile when a fan signs up.
3. Open **Project Settings → API** and copy the **Project URL** and the
   **anon / publishable key**. You need them in step 2.

## 2. Create the Vercel project

1. Sign in at [vercel.com](https://vercel.com) with GitHub, click
   **Add New → Project**, and import `stadium-central`.
2. Leave the build settings as they are (they come from `vercel.json`).
3. Under **Environment Variables**, add:

   | Name                            | Value                                                |
   | ------------------------------- | ---------------------------------------------------- |
   | `VITE_SUPABASE_URL`             | Supabase Project URL                                 |
   | `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon / publishable key                      |
   | `VITE_SUPABASE_PROJECT_ID`      | The id in the URL (`https://<id>.supabase.co`)       |
   | `SUPABASE_URL`                  | Same Project URL                                     |
   | `SUPABASE_PUBLISHABLE_KEY`      | Same anon / publishable key                          |
   | `API_FOOTBALL_KEY`              | Optional: api-football key for the live league table |

4. Click **Deploy**, then open the `vercel.app` link when it finishes.

These variables override the Lovable Cloud values in the committed `.env`, so
the live site talks only to your Supabase project.

## 3. Point Supabase sign-in at the site

In Supabase, open **Authentication → URL Configuration**. Set **Site URL** to
the Vercel address (or your custom domain) and add `https://<your-domain>/**`
under **Redirect URLs**, so sign-up confirmation and password reset emails link
back to the live site.

## Custom domain

In Vercel, open the project's **Settings → Domains**, add the domain, and add
the DNS record Vercel shows at your registrar. Then update the Supabase URLs in
step 3.

## Good to know

- **Existing fan accounts don't move.** Accounts, tickets and rewards created on
  the Lovable-hosted site stay in Lovable Cloud, so fans sign up again on the
  new site. Squads, fixtures and news are part of the code, so they appear as
  before.
- **Lovable's editor still works.** Edits sync to GitHub and Vercel redeploys
  them. Lovable's own preview keeps using Lovable Cloud, so test data entered
  there won't show on the live site.
- **Build settings.** Lovable's build targets Cloudflare Workers by default;
  `NITRO_PRESET=vercel` makes it produce Vercel's serverless output instead.
