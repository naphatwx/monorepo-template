import Link from "next/link"
import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
    const t = useTranslations("home")

    const cards = [
        {
            href: "/server",
            title: t("serverCard"),
            desc: t("serverCardDesc"),
        },
        {
            href: "/client",
            title: t("clientCard"),
            desc: t("clientCardDesc"),
        },
    ]

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
            <p className="mt-3 max-w-xl text-muted-foreground">
                {t("subtitle")}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {cards.map((card) => (
                    <Link
                        key={card.href}
                        href={card.href}
                        className="group rounded-lg border p-6 transition-colors hover:bg-accent"
                    >
                        <h2 className="text-lg font-semibold">{card.title}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {card.desc}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium">
                            {t("open")}
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}
