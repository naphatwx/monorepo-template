// Format an ISO date string for display. Example helper.
export function formatDate(
    iso: string,
    locale = "en",
    options: Intl.DateTimeFormatOptions = {
        dateStyle: "medium",
        timeStyle: "medium",
    },
): string {
    return new Intl.DateTimeFormat(locale, options).format(new Date(iso))
}
