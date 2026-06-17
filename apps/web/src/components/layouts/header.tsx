"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
    const t = useTranslations("common")
    const pathname = usePathname()

    const links = [
        { href: "/", label: t("home") },
        { href: "/server", label: t("serverSide") },
        { href: "/client", label: t("clientSide") },
    ]

    return (
        <header className="border-b">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <nav className="flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent",
                                pathname === link.href
                                    ? "font-medium text-foreground"
                                    : "text-muted-foreground",
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <ThemeToggle />
            </div>
        </header>
    )
}
