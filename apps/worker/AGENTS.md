# AGENTS.md — worker

Scoped guidance for the `worker` app. Read the repo-root `CLAUDE.md` for cross-cutting rules.

## What this app is

- The NestJS 11 background worker.
- Package name: `worker`. Lives in `apps/worker`.
- Runs as an application context. No HTTP server.
- Consumes RabbitMQ events and reads/writes PostgreSQL via Prisma.

## Stack

- NestJS 11, ESM, `nodenext` module resolution.
- RabbitMQ via `@golevelup/nestjs-rabbitmq`.

## Commands

- Run from the repo root. Target this app with a filter.

| Command                          | What it does          |
| -------------------------------- | --------------------- |
| `pnpm --filter worker dev`       | Run worker in dev mode|
| `pnpm --filter worker build`     | Build worker          |
| `pnpm --filter worker lint`      | Lint worker           |
| `pnpm --filter worker typecheck` | Type-check worker     |

## Structure

```
src/
├── main.ts              # App entry — creates the Nest application context (no HTTP)
├── app.module.ts        # Root module — imports config, messaging, consumers
├── config/              # Env loading and validation
├── rabbitmq/            # Messaging connection module
├── consumers/           # Message handlers — one file per event
│   └── <name>.consumer.ts   # @RabbitSubscribe handler for one routing key
├── services/            # (add when needed) Business logic — keeps consumers thin
├── cron/                # (add when needed) Scheduled jobs (<name>.cron.ts)
└── integrations/        # (add when needed) External API clients (<provider>/)
```

- The worker has no controllers and no routes. Work is triggered by messages.
- Each consumer subscribes to one routing key and does one job.
- `app.module.ts` is the one place that imports every module.

### File naming

| Suffix          | Role                                      |
| --------------- | ----------------------------------------- |
| `*.module.ts`   | Nest module. Declares providers + imports |
| `*.consumer.ts` | `@RabbitSubscribe` handler. `@Injectable()` |

## Conventions

- 4-space indent, no semicolons, double quotes, trailing comma all.
- ESM + `nodenext`: local imports MUST use the `.js` extension.
    - e.g. `import { AppModule } from "./app.module.js"`.
- Use catalog versions in `package.json` (`"catalog:"`), never literal versions.

## How things work here

- Env is validated at boot with a zod schema from `@repo/types`.
- The Prisma client is the singleton from `@repo/database`.
- Messaging constants and event types live in `@repo/types`.
- A consumer's event shape must match the api publisher through `@repo/types`.

## Build and runtime

- Runtime uses `tsx`. Build uses the Nest CLI with the `swc` builder.
- `tsconfig.json` sets `rootDir` to `./src` and `outDir` to `./dist`.

## How to add a consumer

1. Add the routing key and event type to `@repo/types` if new.
2. Add a `@RabbitSubscribe`-decorated handler in `src/consumers`.
3. Register its module so it loads at boot.
4. Make sure the api app publishes a matching event shape.

## Gotchas

- Start Docker (RabbitMQ) first, or the worker has nothing to connect to.
- Omitting the `.js` extension on local imports breaks the build.
