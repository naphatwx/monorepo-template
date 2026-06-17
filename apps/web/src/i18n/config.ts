// Add more locales here. For each one, add a JSON file at
// src/messages/<locale>.json.
export const locales = ["en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"
