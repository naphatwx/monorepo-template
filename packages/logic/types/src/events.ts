import { z } from 'zod'

// Payload for POST /api/events/ping.
export const pingPayloadSchema = z.object({
    message: z.string().min(1).max(200).optional(),
})

export type PingPayload = z.infer<typeof pingPayloadSchema>

// Event published to RabbitMQ and consumed by the worker.
export interface PingEvent {
    message: string
    publishedAt: string
}

// RabbitMQ routing config shared by the API (publisher) and worker (consumer).
export const EVENTS_EXCHANGE = 'events'
export const PING_ROUTING_KEY = 'event.ping'
