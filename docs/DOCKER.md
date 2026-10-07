# Running the site in Docker

## How it fits together

```
 Browser ──▶ localhost:3000 ──▶ [ rayon-sports-fc container ]
                                  Node.js 22 + TanStack Start SSR server
                                          │
                                          ▼  HTTPS
                                [ Supabase on Lovable Cloud ]
                                  Postgres: rosters, fixtures, tickets, rewards
                                  Auth: fan accounts
                                  Storage: uploaded files
```

- **One container.** The site renders pages on the server and runs server
  functions (ticketing, league table), so it needs a Node.js server. A static
  Nginx container would serve a blank shell. The image is built in three
  stages: Bun installs dependencies, Vite builds a Node server bundle, and a
  small Node.js Alpine image runs it as a non-root user.
- **Data is not in the container.** Rosters, fixtures, ticket orders, rewards
  and accounts all live in the club's Supabase database. The container keeps
  nothing on disk, so stopping, rebuilding or deleting it loses nothing, and
  the Docker site shows the same live data as the published site.
- **No volumes needed today.** `docker-compose.yml` has a commented-out named
  volume (`club-data` mounted at `/app/data`) ready for when the app starts
  keeping local files such as uploads or a SQLite database. A named volume
  survives `docker compose down` and rebuilds; only `docker compose down -v`
  deletes it.

## Files

| File                 | What it does                                                            |
| -------------------- | ----------------------------------------------------------------------- |
| `Dockerfile`         | Multi-stage build: Bun install → Vite/Nitro build → Node.js runtime     |
| `docker-compose.yml` | Port `3000:3000`, env files, restart policy, health check, volume stub  |
| `.dockerignore`      | Keeps `node_modules`, build output, `.git` and `.env*` out of the image |

## Environment variables

| Variable                        | Where it comes from  | Used for                                  |
| ------------------------------- | -------------------- | ----------------------------------------- |
| `VITE_SUPABASE_URL`             | `.env` (build time)  | Browser connects to Supabase              |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `.env` (build time)  | Browser connects to Supabase (public key) |
| `SUPABASE_URL`                  | `.env` (run time)    | Server-side rendering                     |
| `SUPABASE_PUBLISHABLE_KEY`      | `.env` (run time)    | Server-side rendering                     |
| `SUPABASE_SERVICE_ROLE_KEY`     | `.env.local` (you)   | Server admin actions such as ticketing    |
| `API_FOOTBALL_KEY`              | `.env.local` (you)   | Live league table                         |
| `APP_PORT`                      | your shell, optional | Host port (default `3000`)                |

`.env` is already in the repo. Secrets go in a `.env.local` file next to it,
which git ignores. These are the same secrets the site uses on Lovable Cloud; without them
the site still runs, but features that need them will show an error.

## Commands

Requires Docker Desktop (or Docker Engine with Compose v2.24+).

```sh
# Get the code (or download the ZIP from GitHub and open a terminal in it)
git clone https://github.com/Mzero-Patrick/stadium-central.git
cd stadium-central

# Build the image and start the site in the background
docker compose up -d --build

# Check it: STATUS should say "healthy", then open http://localhost:3000
docker compose ps
docker compose logs -f web        # Ctrl+C stops following the logs

# Stop and start again (no rebuild)
docker compose stop
docker compose start

# After pulling new code, rebuild and restart
git pull
docker compose up -d --build

# Remove the container (your data in Supabase is untouched)
docker compose down
```

Port 3000 already in use? Run `APP_PORT=8080 docker compose up -d` and open
http://localhost:8080 instead.
