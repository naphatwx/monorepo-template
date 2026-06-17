# AGENTS.md — web

Scoped guidance for the `web` app. Read the repo-root `CLAUDE.md` for cross-cutting rules.

## What this app is

- The Next.js 16 frontend (App Router).
- Package name: `web`. Lives in `apps/web`.
- Talks to the `api` app over HTTP.

## Stack

- Next.js 16 (App Router) + React.
- `next-intl` for i18n, `next-themes` for theming.
- Tailwind 4 + shadcn/ui.

## Commands

- Run from the repo root. Target this app with a filter.

| Command                      | What it does          |
| ---------------------------- | --------------------- |
| `pnpm --filter web dev`      | Run web in dev mode   |
| `pnpm --filter web build`    | Build web             |
| `pnpm --filter web lint`     | Lint web              |
| `pnpm --filter web typecheck`| Type-check web        |

- Dev URL: http://localhost:3000

## Layout

```
src/
  app/                 App Router routes
    page.tsx           landing
    server/page.tsx    server-side fetch demo
    client/page.tsx    client-side fetch demo
    api/proxy/[...path]/route.ts   proxy: forwards /api/proxy/<path> to <API_URL>/api/<path> with cookies
  components/
    ui/                shadcn components
  i18n/                next-intl config
  lib/api/             typed API domain functions
  messages/            locale json
```

## Calling the API — the rule

- Never call `apiFetch()` / `serverFetch()` with raw path strings in pages.
- Use a typed domain function from `@/lib/api` instead.
- Pages import like: `import { getHealth, sendPing } from "@/lib/api"`.

| File           | Holds                                    |
| -------------- | ---------------------------------------- |
| `endpoints.ts` | All API paths in one object              |
| `client.ts`    | `apiFetch()` — low-level, via proxy      |
| `server.ts`    | `serverFetch()` — low-level, server only |
| `health.ts`    | `getHealth()`, `getHealthOnServer()`     |
| `events.ts`    | `sendPing()`                             |
| `index.ts`     | Re-exports everything                    |

- To add an endpoint: add the path to `endpoints.ts`, then add a function in a domain file.

## Server side vs client side

|                  | Server (`/server`)        | Client (`/client`)         |
| ---------------- | ------------------------- | -------------------------- |
| Component        | Server Component          | Client (`"use client"`)    |
| Fetch runs       | on the server at render   | in the browser after load  |
| Helper           | `serverFetch()`           | `apiFetch()`               |
| Target           | `API_INTERNAL_URL`        | `/api/proxy` route         |
| Caching          | `no-store`, `force-dynamic`| per request               |

## Conventions

- 4-space indent, no semicolons, double quotes, trailing comma all.
- Add any imported `@repo/*` package to `transpilePackages` in `next.config.ts`.
- Use catalog versions in `package.json` (`"catalog:"`), never literal versions.

## Gotchas

- The theme toggle gates render on mount to avoid hydration mismatch.
- The `eslint-disable` for `react-hooks/set-state-in-effect` there is intentional.
- Locale comes from a `locale` cookie. Default `en`.
