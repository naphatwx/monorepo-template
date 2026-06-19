import { z } from "zod"

// Validates environment variables at startup so a missing or bad value
// fails fast instead of breaking later at runtime.

// Parses an env flag. Defaults to false when unset.
// Avoids z.coerce.boolean(), which treats the string "false" as true.
const envFlag = z
    .string()
    .optional()
    .transform((v) => v === "true" || v === "1")

// RABBITMQ_URL is only needed when RabbitMQ is enabled.
const requireUrlWhenEnabled = (env: {
    RABBITMQ_ENABLE: boolean
    RABBITMQ_URL?: string
}) => !env.RABBITMQ_ENABLE || !!env.RABBITMQ_URL

const requireUrlError = {
    message: "RABBITMQ_URL is required when RABBITMQ_ENABLE is true",
    path: ["RABBITMQ_URL"],
}

export const apiEnvSchema = z
    .object({
        DATABASE_URL: z.url(),
        RABBITMQ_ENABLE: envFlag,
        RABBITMQ_URL: z.url().optional(),
        PORT: z.coerce.number().default(4000),
        FRONTEND_URL: z.url().default("http://localhost:3000"),
    })
    .refine(requireUrlWhenEnabled, requireUrlError)

export type ApiEnv = z.infer<typeof apiEnvSchema>

export const workerEnvSchema = z
    .object({
        DATABASE_URL: z.url(),
        RABBITMQ_ENABLE: envFlag,
        RABBITMQ_URL: z.url().optional(),
    })
    .refine(requireUrlWhenEnabled, requireUrlError)

export type WorkerEnv = z.infer<typeof workerEnvSchema>
