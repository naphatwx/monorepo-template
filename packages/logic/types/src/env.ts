import { z } from 'zod'

// Validates environment variables at startup so a missing or bad value
// fails fast instead of breaking later at runtime.

export const apiEnvSchema = z.object({
    DATABASE_URL: z.url(),
    RABBITMQ_URL: z.url(),
    PORT: z.coerce.number().default(4000),
    FRONTEND_URL: z.url().default('http://localhost:3000'),
})

export type ApiEnv = z.infer<typeof apiEnvSchema>

export const workerEnvSchema = z.object({
    DATABASE_URL: z.url(),
    RABBITMQ_URL: z.url(),
})

export type WorkerEnv = z.infer<typeof workerEnvSchema>
