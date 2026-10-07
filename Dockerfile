# syntax=docker/dockerfile:1
#
# Rayon Sports FC web platform: production image.
#
# The app is TanStack Start with server-side rendering, so it needs a Node.js
# server at runtime (a static Nginx container can't run its server functions).
#
#   Stage 1 (deps)    install dependencies with Bun from bun.lock
#   Stage 2 (build)   vite build, targeting Nitro's "node-server" preset
#   Stage 3 (runtime) Node.js on Alpine running the self-contained .output/

ARG BUN_VERSION=1.4
ARG NODE_VERSION=22

# ---------------------------------------------------------------- deps ----
FROM oven/bun:${BUN_VERSION}-alpine AS deps
WORKDIR /app

# Copy only the manifests first so this layer stays cached until they change.
COPY package.json bun.lock bunfig.toml ./
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# --------------------------------------------------------------- build ----
FROM deps AS build

# Public Supabase settings are baked into the browser bundle at build time.
# They are publishable (not secret) values; docker-compose passes them from .env.
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_PUBLISHABLE_KEY
ARG VITE_SUPABASE_PROJECT_ID
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_PUBLISHABLE_KEY=$VITE_SUPABASE_PUBLISHABLE_KEY \
    VITE_SUPABASE_PROJECT_ID=$VITE_SUPABASE_PROJECT_ID

COPY . .

# Lovable's build preset defaults to Cloudflare Workers; build a Node server instead.
ENV NITRO_PRESET=node-server
RUN bun run build

# ------------------------------------------------------------- runtime ----
FROM node:${NODE_VERSION}-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000

# .output is self-contained (server bundle + its own node_modules + static
# assets), so no npm install is needed here.
COPY --from=build --chown=node:node /app/.output ./.output

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT}/" || exit 1

CMD ["node", ".output/server/index.mjs"]
