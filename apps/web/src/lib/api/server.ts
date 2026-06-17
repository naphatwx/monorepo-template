// Low-level server-side fetch.
// Runs on the Next.js server (Server Components, route handlers) and reaches
// the API directly. Not exposed to the browser.
// Prefer the typed domain functions (health.ts) over this.
const API_URL =
    process.env.API_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:4000'

export async function serverFetch<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const res = await fetch(`${API_URL}/api${path}`, {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    })

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`)
    }

    return res.json() as Promise<T>
}
