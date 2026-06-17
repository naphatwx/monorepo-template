import type { PingPayload, PingResult } from "@repo/types"
import { apiFetch } from "./client"
import { endpoints } from "./endpoints"

// Ask the API to publish a ping event to the queue.
export function sendPing(message: string) {
    return apiFetch<PingResult>(endpoints.eventsPing, {
        method: "POST",
        body: JSON.stringify({ message } satisfies PingPayload),
    })
}
