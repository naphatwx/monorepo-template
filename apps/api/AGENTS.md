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

## Structure

```
src/
├── main.ts              # App entry — bootstrap, global prefix, CORS, pipe, Swagger
├── app.module.ts        # Root module — imports every core + feature module
├── common/              # Shared DTOs, filters, decorators, pipes
│   └── dto/             # e.g. PaginationDto
├── core/                # Cross-cutting infrastructure used by all features
│   ├── config/          # Env loading and validation
│   └── rabbitmq/        # Messaging connection + publisher service
├── integrations/        # (add when needed) External API clients
│   └── <provider>/      # One folder per external API
└── modules/             # Feature modules — one folder per domain
    └── <feature>/
        ├── <feature>.module.ts      # Wires the feature, registered in app.module.ts
        ├── <feature>.controller.ts  # HTTP routes, delegates to the service
        ├── <feature>.service.ts     # Business logic (@Injectable)
        └── dto/                     # Request + response DTOs (createZodDto)
```

- `core/` holds shared infrastructure. `modules/` holds business features.
- A feature is self-contained in its folder and exposed through its module.
- `app.module.ts` is the one place that imports every module.

### File naming

| Suffix          | Role                                   |
| --------------- | -------------------------------------- |
| `*.module.ts`   | Nest module. Declares providers + imports |
| `*.controller.ts`| HTTP routes. Thin, delegates to a service |
| `*.service.ts`  | Business logic. `@Injectable()`        |
| `*.dto.ts`      | Request/response shape via `createZodDto` |

## Conventions

- 4-space indent, no semicolons, double quotes, trailing comma all.
- ESM + `nodenext`: local imports MUST use the `.js` extension.
    - e.g. `import { AppModule } from "./app.module.js"`.
- Use catalog versions in `package.json` (`"catalog:"`), never literal versions.

## How things work here

- A global route prefix is set in `main.ts`. All routes sit under it.
- DTOs use `createZodDto` with a zod schema from `@repo/types`.
- Env is validated at boot with a zod schema from `@repo/types`.
- The Prisma client is the singleton from `@repo/database`.
- Messaging constants and event types live in `@repo/types`.

## Build and runtime

- Runtime uses `tsx`. Build uses the Nest CLI with the `swc` builder.
- `tsconfig.json` sets `rootDir` to `./src` and `outDir` to `./dist`.

## How to add an endpoint

1. Create a feature folder under `src/modules`.
2. Add its module, controller, and service.
3. Register the module in `app.module.ts`.
4. Define the request DTO with a zod schema in `@repo/types`.
5. To call it from web: add the path and a domain function in web's `lib/api`.

## Gotchas

- Publishing when the broker is down returns `503` after 5s. Start Docker first.
- Omitting the `.js` extension on local imports breaks the build.
