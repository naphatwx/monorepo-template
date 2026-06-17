import type { Config } from "tailwindcss"

const config: Config = {
    darkMode: "class",
    content: [
        "../../apps/web/src/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/components/src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config
