# Monorepo Template

Starter monorepo for new projects. Turborepo + pnpm + TypeScript.

## What is inside

- `apps/web` — Next.js. i18n, theme (light/dark/system), client + server side rendering.
- `apps/api` — NestJS. Swagger docs, health check, publishes events to a queue.
- `apps/worker` — NestJS. Consumes events from the queue.
- `packages/` — shared code, split by concern.

## Stack

- Turborepo + pnpm (Node 22)
- Next.js 16, next-intl, next-themes, Tailwind 4, shadcn/ui
- NestJS 11, Swagger, RabbitMQ
- Prisma 6 + PostgreSQL

## Folder layout

```
apps/
  web/        Next.js frontend
  api/        NestJS REST API
  worker/     NestJS background worker
packages/
  ui/
    components/   @repo/ui                shared React components
    tailwind/     @repo/tailwind-config   shared Tailwind config
  logic/
    types/        @repo/types             shared types and zod schemas
    utils/        @repo/utils             shared helper functions
    database/     @repo/database          Prisma client and schema
  config/
    eslint/       @repo/eslint-config     shared ESLint config
    typescript/   @repo/typescript-config shared tsconfig
```

## Getting started

1. Start infrastructure (PostgreSQL + RabbitMQ).

    ```bash
    docker compose up -d
    ```

2. Copy the env file.

    ```bash
    cp .env.example .env
    ```

3. Install dependencies.

    ```bash
    pnpm install
    ```

4. Run the first database migration.

    ```bash
    pnpm db:migrate
    ```

5. Start everything in dev mode.

    ```bash
    pnpm dev
    ```

## URLs

- Web: http://localhost:3000
- API: http://localhost:4000
- Swagger docs: http://localhost:4000/api/docs
- RabbitMQ UI: http://localhost:15672 (user `rabbit`, pass `rabbit`)

## Demo pages

- `/` — landing page. Theme toggle and links.
- `/server` — Server Component. Fetches the health check on the server during render. No loading state.
- `/client` — Client Component. Fetches the health check from the browser through a proxy route. Shows a loading state.
- The `/client` page also has a button that calls `POST /api/events/ping`. The API publishes an event to RabbitMQ and the worker logs it.

## Scripts

| Command             | What it does                       |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | Run all apps in dev mode           |
| `pnpm build`        | Build all apps and packages        |
| `pnpm lint`         | Lint all packages                  |
| `pnpm typecheck`    | Type-check all packages (`tsc`)    |
| `pnpm format`       | Format the repo with Prettier      |
| `pnpm format:check` | Check formatting without writing   |
| `pnpm db:migrate`   | Run a Prisma migration (dev)       |
| `pnpm db:reset`     | Drop and recreate the dev database |
| `pnpm db:seed`      | Seed the database                  |
| `pnpm db:studio`    | Open Prisma Studio                 |

## CI

- GitHub Actions workflow at `.github/workflows/ci.yml`.
- Runs `pnpm lint`, `pnpm typecheck`, then `pnpm build`.
- Manual trigger only for now (`workflow_dispatch`).
- Uncomment the `push` / `pull_request` triggers in the file to run it automatically.

## Adding a language

1. Add a JSON file at `apps/web/src/messages/<locale>.json`.
2. Add the locale to `apps/web/src/i18n/config.ts`.

## Adding auth later

This template ships without auth to stay light. When you need it, add
`better-auth` with the Prisma adapter in `apps/api` and a matching client in
`apps/web`.
