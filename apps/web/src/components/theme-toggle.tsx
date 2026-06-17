"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { useTranslations } from "next-intl"
import { Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

const OPTIONS = [
    { value: "light", Icon: Sun },
    { value: "dark", Icon: Moon },
    { value: "system", Icon: Monitor },
] as const

export function ThemeToggle() {
    const t = useTranslations("theme")
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch: render the control only after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <div
            className="inline-flex rounded-md border border-input"
            role="group"
            aria-label={t("label")}
        >
            {OPTIONS.map(({ value, Icon }) => (
                <Button
                    key={value}
                    type="button"
                    size="icon"
                    variant={theme === value ? "secondary" : "ghost"}
                    aria-label={t(value)}
                    title={t(value)}
                    onClick={() => setTheme(value)}
                >
                    <Icon />
                </Button>
            ))}
        </div>
    )
}
