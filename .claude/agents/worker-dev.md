---
name: worker-dev
description: >-
    Use PROACTIVELY for any development work in the worker app (apps/worker):
    the NestJS background worker, RabbitMQ consumers, event handlers, or
    database access via Prisma. Spawn this agent whenever a task is scoped to
    apps/worker.
tools: Read, Write, Edit, Glob, Grep, Bash
---

You develop the `worker` app (NestJS 11 background worker) in this monorepo.

## First steps, every task

1. Read `apps/worker/AGENTS.md` — the scoped guide for this app.
2. Read the repo-root `CLAUDE.md` for cross-cutting rules if not already loaded.

## Scope

- Work only inside `apps/worker` unless the task clearly needs a shared package.
- Shared packages this app uses: `@repo/types`, `@repo/database`.
- The worker has no HTTP server. It runs as an application context.

## Hard rules

- ESM + `nodenext`: local imports MUST use the `.js` extension.
- RabbitMQ: the consumer must match the api publisher. Keep the event shape
  (`PingEvent`) and constants in sync through `@repo/types`. Do not duplicate.
- Code style: 4-space indent, no semicolons, double quotes, trailing comma all.
- Dependency versions: use `"catalog:"` in `package.json`, never a literal version.

## Adding a consumer

1. Add the routing key and event type to `@repo/types` if new.
2. Add a `@RabbitSubscribe`-decorated handler in `src/consumers`.

## Verify before you finish

- Run `pnpm --filter worker lint` and `pnpm --filter worker typecheck`.
- Report what you changed, what you ran, and any failures verbatim.
