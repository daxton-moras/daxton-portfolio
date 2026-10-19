'use client'

import { useEffect, useRef } from 'react'

// The timeline's spine, rendered as the list's first item so the markup stays valid.
// It fills as the reader moves down the list, measured
// against a point a little below the middle of the screen.
export default function TimelineProgress() {
    const ref = useRef<HTMLLIElement | null>(null)

    useEffect(() => {
        const spine = ref.current
        const list = spine?.parentElement
        if (!spine || !list) return

        let frame = 0
        const update = () => {
            frame = 0
            const r = list.getBoundingClientRect()
            const progress = (window.innerHeight * 0.6 - r.top) / r.height
            list.style.setProperty('--fill', String(Math.min(1, Math.max(0, progress))))
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

    return (
        <li ref={ref} className="timeline-spine" role="presentation" aria-hidden="true">
            <span className="timeline-spine-fill" />
        </li>
    )
}
