# AGENTS.md — api

Scoped guidance for the `api` app. Read the repo-root `CLAUDE.md` for cross-cutting rules.

## What this app is

- The NestJS 11 REST API.
- Package name: `api`. Lives in `apps/api`.
- Publishes events to RabbitMQ and reads/writes PostgreSQL via Prisma.

## Stack

- NestJS 11, ESM, `nodenext` module resolution.
- Swagger via `@nestjs/swagger`.
- Validation via `nestjs-zod` (global pipe).
- RabbitMQ via `@golevelup/nestjs-rabbitmq`.

## Commands

- Run from the repo root. Target this app with a filter.

| Command                       | What it does       |
| ----------------------------- | ------------------ |
| `pnpm --filter api dev`       | Run api in dev mode|
| `pnpm --filter api build`     | Build api          |
| `pnpm --filter api lint`      | Lint api           |
| `pnpm --filter api typecheck` | Type-check api     |

- Dev URL: http://localhost:4000
- Swagger: http://localhost:4000/api/docs

## Layout

```
src/
  main.ts              bootstrap, global prefix "api", Swagger, CORS
  app.module.ts        root module
  health.controller.ts GET /api/health
  core/
    config/            env validation module
    rabbitmq/          publisher service
  modules/
    events/            POST /api/events/ping
```

## Conventions

- 4-space indent, no semicolons, double quotes, trailing comma all.
- ESM + `nodenext`: local imports MUST use the `.js` extension.
    - e.g. `import { AppModule } from "./app.module.js"`.
- Use catalog versions in `package.json` (`"catalog:"`), never literal versions.

## How things work here

- Global route prefix is `api`. So health is at `/api/health`.
- DTOs use `createZodDto` with a zod schema from `@repo/types`.
- Env is validated at boot with `apiEnvSchema` from `@repo/types`.
- The Prisma client is the singleton from `@repo/database`.

## Endpoints

- `GET /api/health` returns `{ status: "ok", timestamp }`.
- `POST /api/events/ping` publishes an event to RabbitMQ.

## Build and runtime

- Runtime uses `tsx`. Build uses the Nest CLI with the `swc` builder.
- `tsconfig.json` sets `rootDir` to `./src` and `outDir` to `./dist`.

## RabbitMQ contract

- Exchange `events` (topic), routing key `event.ping`.
- Shared constants: `EVENTS_EXCHANGE`, `PING_ROUTING_KEY` in `@repo/types`.
- Event shape: `PingEvent` in `@repo/types`. Keep it in sync with the worker.
- Publishing has a 5 second timeout. Broker down returns `503`, does not hang.

## How to add an endpoint

1. Create a module under `src/modules`.
2. Register it in `app.module.ts`.
3. Use a zod schema in `@repo/types` for the request DTO.
4. To call it from web: add the path to web's `lib/api/endpoints.ts` and a domain function.

## Gotchas

- Start Docker (RabbitMQ) first, or the ping endpoint returns `503` after 5s.
- Omitting the `.js` extension on local imports breaks the build.
