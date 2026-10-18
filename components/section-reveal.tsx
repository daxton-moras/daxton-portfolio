'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
    id: string
    className?: string
    children: React.ReactNode
}

// A full-height section that fades in the first time it scrolls into view.
export default function SectionReveal({ id, className = '', children }: Props) {
    const ref = useRef<HTMLElement | null>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.12 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <section id={id} ref={ref} className={`section ${className}`}>
            <div className={`section-inner reveal ${visible ? 'visible' : ''}`}>{children}</div>
        </section>
    )
}
