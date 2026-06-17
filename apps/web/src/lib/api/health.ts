import type { HealthResponse } from "@repo/types"
import { apiFetch } from "./client"
import { serverFetch } from "./server"
import { endpoints } from "./endpoints"

// Client side: fetch from the browser through the proxy.
export function getHealth() {
    return apiFetch<HealthResponse>(endpoints.health)
}

// Server side: fetch on the server directly.
export function getHealthOnServer() {
    return serverFetch<HealthResponse>(endpoints.health)
}
