import { getTranslations } from 'next-intl/server'
import { getHealthOnServer } from '@/lib/api'
import type { HealthResponse } from '@repo/types'

// Server Component. Runs on the server, so the fetch happens during render
// and the result is baked into the HTML. No loading state on the client.
export const dynamic = 'force-dynamic'

export default async function ServerPage() {
    const t = await getTranslations('server')

    let health: HealthResponse | null = null
    let error: string | null = null
    try {
        health = await getHealthOnServer()
    } catch (e) {
        error = e instanceof Error ? e.message : 'Request failed'
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
                {t('description')}
            </p>

            <div className="mt-8 rounded-lg border p-6">
                <h2 className="text-sm font-medium text-muted-foreground">
                    {t('result')}
                </h2>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm">
                    {error ? error : JSON.stringify(health, null, 2)}
                </pre>
            </div>
        </div>
    )
}
