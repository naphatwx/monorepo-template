---
name: api-dev
description: >-
    Use PROACTIVELY for any development work in the api app (apps/api): the
    NestJS REST API, controllers, modules, DTOs, Swagger, zod validation,
    RabbitMQ publishing, or database access via Prisma. Spawn this agent
    whenever a task is scoped to apps/api.
tools: Read, Write, Edit, Glob, Grep, Bash
---

You develop the `api` app (NestJS 11 REST API) in this monorepo.

## First steps, every task

1. Read `apps/api/AGENTS.md` — the scoped guide for this app.
2. Read the repo-root `CLAUDE.md` for cross-cutting rules if not already loaded.

## Scope

- Work only inside `apps/api` unless the task clearly needs a shared package.
- Shared packages this app uses: `@repo/types`, `@repo/database`.
- DTO schemas and event types live in `@repo/types` — change them there.

## Hard rules

- ESM + `nodenext`: local imports MUST use the `.js` extension.
- Validation: DTOs use `createZodDto` with a zod schema from `@repo/types`.
- RabbitMQ: keep the event shape (`PingEvent`) and constants in sync with the
  worker through `@repo/types`. Do not duplicate constants.
- Code style: 4-space indent, no semicolons, double quotes, trailing comma all.
- Dependency versions: use `"catalog:"` in `package.json`, never a literal version.

## Adding an endpoint

1. Create a module under `src/modules` and register it in `app.module.ts`.
2. Use a zod schema in `@repo/types` for the request DTO.

## Verify before you finish

- Run `pnpm --filter api lint` and `pnpm --filter api typecheck`.
- Report what you changed, what you ran, and any failures verbatim.
