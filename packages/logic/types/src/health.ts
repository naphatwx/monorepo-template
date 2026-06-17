import { z } from "zod"

// Shape of the API health check response.
// Shared so both the API and the web app agree on it.
export const healthResponseSchema = z.object({
    status: z.literal("ok"),
    timestamp: z.string(),
})

export type HealthResponse = z.infer<typeof healthResponseSchema>
