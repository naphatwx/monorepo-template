'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Spinner } from '@repo/ui'
import { api } from '@/lib/api'
import type { HealthResponse } from '@repo/types'

// Client Component. The fetch runs in the browser after the page loads,
// through the proxy route. Shows a loading state while it waits.
export default function ClientPage() {
    const t = useTranslations('client')

    const [loading, setLoading] = useState(false)
    const [health, setHealth] = useState<HealthResponse | null>(null)
    const [ping, setPing] = useState<unknown>(null)
    const [error, setError] = useState<string | null>(null)

    async function checkHealth() {
        setLoading(true)
        setError(null)
        try {
            setHealth(await api<HealthResponse>('/health'))
        } catch (e) {
            setError(e instanceof Error ? e.message : t('error'))
        } finally {
            setLoading(false)
        }
    }

    async function sendPing() {
        setLoading(true)
        setError(null)
        try {
            setPing(
                await api('/events/ping', {
                    method: 'POST',
                    body: JSON.stringify({ message: 'ping from /client' }),
                }),
            )
        } catch (e) {
            setError(e instanceof Error ? e.message : t('error'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
                {t('description')}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={checkHealth} disabled={loading}>
                    {loading ? <Spinner /> : null}
                    {t('checkHealth')}
                </Button>
                <Button
                    variant="outline"
                    onClick={sendPing}
                    disabled={loading}
                >
                    {t('sendPing')}
                </Button>
            </div>

            <div className="mt-8 rounded-lg border p-6">
                <h2 className="text-sm font-medium text-muted-foreground">
                    {t('result')}
                </h2>
                <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm">
                    {error
                        ? error
                        : health
                          ? JSON.stringify(health, null, 2)
                          : t('idle')}
                </pre>
            </div>

            {ping ? (
                <div className="mt-4 rounded-lg border p-6">
                    <h2 className="text-sm font-medium text-muted-foreground">
                        {t('pingResult')}
                    </h2>
                    <pre className="mt-2 overflow-x-auto rounded-md bg-muted p-4 font-mono text-sm">
                        {JSON.stringify(ping, null, 2)}
                    </pre>
                </div>
            ) : null}
        </div>
    )
}
