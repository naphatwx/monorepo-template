import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Header } from "@/components/layouts/header"
import "./globals.css"

const geistSans = Geist({
    variable: "--font-sans",
    subsets: ["latin"],
})

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Monorepo Template",
    description: "Starter monorepo: Next.js + NestJS + worker",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const locale = await getLocale()
    const messages = await getMessages()

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider>
                    <NextIntlClientProvider messages={messages}>
                        <div className="flex min-h-screen flex-col">
                            <Header />
                            <main className="page-fade-in flex-1">
                                {children}
                            </main>
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
