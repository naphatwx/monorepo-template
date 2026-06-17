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

## Layout

```
src/
  main.ts              bootstrap as application context
  app.module.ts        root module
  config/              env validation module
  consumers/
    event.consumer.ts  listens on routing key event.ping
  rabbitmq/            connection module
```

## Conventions

- 4-space indent, no semicolons, double quotes, trailing comma all.
- ESM + `nodenext`: local imports MUST use the `.js` extension.
    - e.g. `import { AppModule } from "./app.module.js"`.
- Use catalog versions in `package.json` (`"catalog:"`), never literal versions.

## How things work here

- Env is validated at boot with `workerEnvSchema` from `@repo/types`.
- The Prisma client is the singleton from `@repo/database`.
- `EventConsumer` listens on routing key `event.ping` and logs the message.

## Build and runtime

- Runtime uses `tsx`. Build uses the Nest CLI with the `swc` builder.
- `tsconfig.json` sets `rootDir` to `./src` and `outDir` to `./dist`.

## RabbitMQ contract — must match the api app

- Exchange `events` (topic), routing key `event.ping`.
- Worker queue `worker.event.ping`.
- Shared constants: `EVENTS_EXCHANGE`, `PING_ROUTING_KEY` in `@repo/types`.
- Event shape: `PingEvent` in `@repo/types`. Keep it in sync with the publisher in api.

## How to add a consumer

1. Add the routing key and event type to `@repo/types` (if new).
2. Add a `@RabbitSubscribe`-decorated handler in `src/consumers`.
3. Make sure the api app publishes a matching event shape.

## Gotchas

- Start Docker (RabbitMQ) first, or the worker has nothing to connect to.
- Omitting the `.js` extension on local imports breaks the build.
