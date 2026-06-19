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

| Command                       | What it does        |
| ----------------------------- | ------------------- |
| `pnpm --filter web dev`       | Run web in dev mode |
| `pnpm --filter web build`     | Build web           |
| `pnpm --filter web lint`      | Lint web            |
| `pnpm --filter web typecheck` | Type-check web      |

- Dev URL: http://localhost:3000

## Structure

```
src/
├── app/                 # App Router — a folder is a route, page.tsx is its page
│   ├── layout.tsx       # Root layout — wraps every page (providers, html shell)
│   ├── page.tsx         # The route's page component
│   ├── <route>/         # A nested route — add page.tsx inside
│   ├── (<group>)/       # (add when needed) Route group — shared layout, no url segment
│   └── api/<name>/route.ts   # Route handler — server-only endpoints, proxy
├── components/
│   ├── ui/              # Reusable primitives (shadcn), no app logic
│   ├── layouts/         # Page-level layout pieces (header, footer)
│   └── providers/       # Client context providers (theme, etc.)
├── config/              # Centralized constants, e.g. routes.ts (ROUTES)
├── hooks/               # Custom React hooks (use-<name>.ts)
├── lib/
│   ├── api/             # Typed API layer — only place pages call the api
│   └── utils.ts         # Shared helpers (e.g. cn)
├── i18n/                # next-intl config and request handling
└── messages/            # Locale json files, one per language
```

- `app/` is routing only. Keep components in `components/`, logic in `lib/`.
- A Server Component runs on the server. A Client Component needs `"use client"`.

## Calling the API — the rule

- Never call `apiFetch()` / `serverFetch()` with raw path strings in pages.
- Use a typed domain function from `@/lib/api` instead.
- The api layer lives in `lib/api`:

| File           | Holds                                       |
| -------------- | ------------------------------------------- |
| `endpoints.ts` | All API paths in one object                 |
| `client.ts`    | `apiFetch()` — browser, via the proxy route |
| `server.ts`    | `serverFetch()` — server only               |
| `<domain>.ts`  | Typed functions for one domain              |
| `index.ts`     | Re-exports everything                       |

- A domain file imports its path from `endpoints.ts`, picks a helper, returns a typed result.
- To add an endpoint: add the path to `endpoints.ts`, then add a function in a domain file.

## Server side vs client side

|            | Server Component        | Client Component (`"use client"`) |
| ---------- | ----------------------- | --------------------------------- |
| Fetch runs | on the server at render | in the browser after load         |
| Helper     | `serverFetch()`         | `apiFetch()`                      |
| Target     | the api directly        | the local `/api/proxy` route      |

- The proxy route forwards browser calls to the api and carries cookies.

## Conventions

- 4-space indent, no semicolons, double quotes, trailing comma all.
- Add any imported `@repo/*` package to `transpilePackages` in `next.config.ts`.
- Use catalog versions in `package.json` (`"catalog:"`), never literal versions.

## Gotchas

- The theme toggle gates render on mount to avoid hydration mismatch.
- The `eslint-disable` for `react-hooks/set-state-in-effect` there is intentional.
- Locale comes from a `locale` cookie.
