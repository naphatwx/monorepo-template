// Server-side fetch helper.
// Runs on the Next.js server (Server Components, route handlers) and reaches
// the NestJS API directly. Not exposed to the browser.
const API_URL =
    process.env.API_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:4000'

export async function serverApi<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const res = await fetch(`${API_URL}/api${path}`, {
        // Health is dynamic, never cache it.
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    })

    if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`)
    }

    return res.json() as Promise<T>
}
