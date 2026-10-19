'use client'

import { useEffect, useRef, useState } from 'react'
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
            {isDark ? <Sun size={13} /> : <Moon size={13} />}
        </button>
    )
}

const stageNumber = (i: number) => String(i + 1).padStart(2, '0')

// Sections read as stages of a deployment pipeline. The line between stages fills
// as you scroll, reaching each stage as its section crosses the middle of the screen.
export default function SectionRail() {
    const [active, setActive] = useState(0)
    const railRef = useRef<HTMLElement | null>(null)
    const dockRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        let frame = 0

        const update = () => {
            frame = 0
            const mid = window.innerHeight / 2
            const tops = sections.map(({ id }) => document.getElementById(id)?.getBoundingClientRect().top ?? 0)

            let index = 0
            while (index < tops.length - 1 && tops[index + 1] <= mid) index++

            let progress = index
            if (index < tops.length - 1) {
                const span = tops[index + 1] - tops[index]
                progress += span > 0 ? Math.min(1, Math.max(0, (mid - tops[index]) / span)) : 0
            }

            // The last section rarely reaches the middle, so finish the line at the bottom of the page.
            const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
            if (atEnd) {
                index = sections.length - 1
                progress = index
            }

            const fill = String(progress / (sections.length - 1))
            railRef.current?.style.setProperty('--fill', fill)
            dockRef.current?.style.setProperty('--fill', fill)
            setActive(index)
        }

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [])

    const goTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    const stateOf = (i: number) => (i === active ? 'active' : i < active ? 'done' : '')

    return (
        <>
            <nav ref={railRef} className="pipeline" aria-label="Section navigation">
                <div className="pipeline-body">
                    <div className="pipeline-track" aria-hidden="true">
                        <span className="pipeline-fill" />
                    </div>
                    <ol className="pipeline-stages">
                        {sections.map(({ id, label }, i) => (
                            <li key={id}>
                                <button
                                    type="button"
                                    className={`stage ${stateOf(i)}`}
                                    onClick={() => goTo(id)}
                                    aria-label={`Navigate to ${label}`}
                                    aria-current={i === active ? 'true' : undefined}
                                >
                                    <span className="stage-node" />
                                    <span className="stage-num">{stageNumber(i)}</span>
                                    <span className="stage-label">{label}</span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>
                <ThemeToggle className="theme-toggle" />
            </nav>

            <nav ref={dockRef} className="dock" aria-label="Section navigation">
                <span className="dock-fill" aria-hidden="true" />
                <ol className="dock-stages">
                    {sections.map(({ id, label }, i) => (
                        <li key={id}>
                            <button
                                type="button"
                                className={`dock-stage ${stateOf(i)}`}
                                onClick={() => goTo(id)}
                                aria-label={`Navigate to ${label}`}
                                aria-current={i === active ? 'true' : undefined}
                            >
                                <span className="dock-num">{stageNumber(i)}</span>
                                <span className="dock-label">{label}</span>
                            </button>
                        </li>
                    ))}
                </ol>
                <ThemeToggle className="theme-toggle dock-theme" />
            </nav>
        </>
    )
}
