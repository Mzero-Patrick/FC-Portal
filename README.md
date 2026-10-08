# Rayon Sports FC — Official Web Platform

The official website of Rayon Sports FC: club news, fixtures and results, squads
(men, women and juniors), matchday ticketing with fan rewards, and club history.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR)
- [Vite](https://vite.dev) and [Tailwind CSS v4](https://tailwindcss.com)
- [Supabase](https://supabase.com) for auth and data, with [Drizzle](https://orm.drizzle.team) migrations
- [Radix UI](https://www.radix-ui.com) primitives and [Lucide](https://lucide.dev) icons

## Getting started

Requires Node.js 22+ and [Bun](https://bun.sh) (npm also works).

```sh
git clone https://github.com/Mzero-Patrick/stadium-central.git
cd stadium-central
bun install
bun run dev
```

The Supabase connection is read from `.env` (`VITE_SUPABASE_URL`,
`VITE_SUPABASE_PUBLISHABLE_KEY`, and the server-side equivalents).

## Docker

Run the production build in a container with `docker compose up -d --build`,
then open http://localhost:3000. See [docs/DOCKER.md](docs/DOCKER.md).

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `bun run dev`     | Start the dev server         |
| `bun run build`   | Production build             |
| `bun run preview` | Preview the production build |
| `bun run lint`    | Lint with ESLint             |
| `bun run format`  | Format with Prettier         |

## Project structure

```
src/
  routes/        Pages (file-based routing)
  components/    Site sections, ticketing and UI components
  lib/           Club data, server functions and utilities
  integrations/  Supabase clients and auth middleware
drizzle/         Database schema and migrations
public/          Static assets (favicon, robots.txt)
```

© Rayon Sports FC. All rights reserved.
