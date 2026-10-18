'use client'

import { useEffect, useRef } from 'react'

// A thin gradient bar along the top edge that fills as the page scrolls.
export default function ScrollProgress() {
    const barRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        let frame = 0
        const update = () => {
            frame = 0
            const max = document.documentElement.scrollHeight - window.innerHeight
            const progress = max > 0 ? window.scrollY / max : 0
            if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
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

    return <div ref={barRef} className="scroll-progress" aria-hidden="true" />
}
