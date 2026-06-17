// Low-level client-side fetch.
// Goes through the Next.js proxy route at /api/proxy, which forwards to the
// API. Same-origin, so cookies are sent and there is no CORS to configure.
// Prefer the typed domain functions (health.ts, events.ts) over this.
export async function apiFetch<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const res = await fetch(`/api/proxy${path}`, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    })

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`)
    }

    return res.json() as Promise<T>
}
