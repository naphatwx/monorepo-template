"use client"

import { useEffect, useState } from "react"

// Returns true after first client mount. Use to avoid hydration mismatch.
export function useMounted() {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        // Intentional: flip a flag once on mount. Same gotcha as the theme toggle.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])
    return mounted
}
