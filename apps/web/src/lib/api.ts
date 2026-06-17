// Client-side fetch helper.
// Calls go through the Next.js proxy route at /api/proxy, which forwards
// them to the NestJS API. Same-origin, so cookies are forwarded and there
// is no CORS to configure.
export async function api<T>(
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
