import type { CSSProperties } from 'react'

// Tiny dependency-free spinner shared across apps.
// Example of a component that lives in @repo/ui.
export function Spinner({ size = 16 }: { size?: number }) {
    const style: CSSProperties = {
        width: size,
        height: size,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'repo-ui-spin 0.6s linear infinite',
    }

    return (
        <span role="status" aria-label="loading" style={style}>
            <style>{'@keyframes repo-ui-spin{to{transform:rotate(360deg)}}'}</style>
        </span>
    )
}
