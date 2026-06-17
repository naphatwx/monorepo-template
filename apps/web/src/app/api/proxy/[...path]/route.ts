import { NextRequest, NextResponse } from "next/server"

// Forwards browser requests to the NestJS API.
// Browser -> /api/proxy/<path> -> <API_URL>/api/<path>
const API_URL =
    process.env.API_INTERNAL_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000"

async function handler(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> },
) {
    const { path } = await params
    const url = new URL(`/api/${path.join("/")}`, API_URL)

    request.nextUrl.searchParams.forEach((value, key) => {
        url.searchParams.set(key, value)
    })

    const headers: HeadersInit = {}
    const cookie = request.headers.get("cookie")
    if (cookie) headers["cookie"] = cookie
    const contentType = request.headers.get("content-type")
    if (contentType) headers["content-type"] = contentType

    try {
        const res = await fetch(url.toString(), {
            method: request.method,
            headers,
            body:
                request.method !== "GET" && request.method !== "HEAD"
                    ? await request.arrayBuffer()
                    : undefined,
        })

        const body = await res.arrayBuffer()

        return new NextResponse(body, {
            status: res.status,
            statusText: res.statusText,
            headers: {
                "content-type":
                    res.headers.get("content-type") || "application/json",
            },
        })
    } catch {
        return NextResponse.json(
            { error: "API server is unreachable" },
            { status: 502 },
        )
    }
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
