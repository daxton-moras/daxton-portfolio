'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { sections } from '@/data/portfolio-content'

function ThemeToggle({ className }: { className: string }) {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // eslint-disable-next-line react-hooks/set-state-in-effect -- theme is only known on the client
    useEffect(() => setMounted(true), [])

    const isDark = !mounted || resolvedTheme !== 'light'

    return (
        <button
            type="button"
            className={className}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDark ? <Sun size={12} /> : <Moon size={12} />}
        </button>
    )
}

export default function SectionRail() {
    const [active, setActive] = useState<string>(sections[0].id)

    useEffect(() => {
        // The active section is whichever one crosses the middle of the viewport.
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setActive(entry.target.id)
                }
            },
            { rootMargin: '-50% 0px -50% 0px' }
        )

        sections.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const goTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <nav className="left-rail" aria-label="Section navigation">
                {sections.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        className={`rail-item ${active === id ? 'active' : ''}`}
                        onClick={() => goTo(id)}
                        aria-label={`Navigate to ${label}`}
                        data-cursor={label}
                        aria-current={active === id ? 'true' : undefined}
                    >
                        <span className="rail-bar" />
                        <span className="rail-label">{label}</span>
                    </button>
                ))}
                <ThemeToggle className="theme-toggle" />
            </nav>

            <ThemeToggle className="theme-toggle theme-toggle-floating" />
        </>
    )
}
