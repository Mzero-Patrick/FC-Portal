# Hosting on Render

The site runs on [Render](https://render.com) as a Node.js web service, defined
in [`render.yaml`](../render.yaml). Every push to `main` (including edits made in
Lovable, which sync to GitHub) triggers a new deploy.

## First-time setup

1. Sign in at [dashboard.render.com](https://dashboard.render.com) with GitHub
   and allow Render to access the `stadium-central` repository.
2. Choose **New → Blueprint**, pick `stadium-central`, and click **Apply**.
   Render creates the `rayon-sports-fc` service from `render.yaml`.
3. When asked for `API_FOOTBALL_KEY`, paste the api-football key if you have
   one, or leave it blank (the league page then shows stored data).
4. Wait for the first deploy to go green, then open the
   `https://rayon-sports-fc.onrender.com` link at the top of the service page.

## Custom domain

In the service, open **Settings → Custom Domains → Add**, enter the domain,
and add the DNS record Render shows at your domain registrar. Render issues the
HTTPS certificate on its own.

## Good to know

- **Data stays where it is.** Rosters, fixtures, tickets and accounts live in
  the Supabase database that Lovable Cloud runs. Render only hosts the website,
  so the Lovable project must stay in place even after its hosting is turned off.
- **Free plan sleeps.** A free service spins down after about 15 idle minutes
  and the next visit takes up to a minute to wake it. The Starter plan stays on.
- **Build settings.** Lovable's build targets Cloudflare Workers by default;
  `NITRO_PRESET=node-server` switches it to a Node server, started with
  `node .output/server/index.mjs` on the port Render provides.
