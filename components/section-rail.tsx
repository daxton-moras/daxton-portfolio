'use client'

import { useEffect, useState } from 'react'

const sections = ['intro', 'about', 'skills', 'projects', 'career', 'contact']

export default function SectionRail() {
    const [active, setActive] = useState('intro')

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting)
                if (visible?.target?.id) setActive(visible.target.id)
            },
            { threshold: 0.5 }
        )

        sections.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    return (
        <nav className="left-rail" aria-label="Section navigation">
            <div className="rail-stack">
                {sections.map((id) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        className={`rail-dot ${active === id ? 'active' : ''}`}
                        aria-label={`Go to ${id}`}
                    />
                ))}
            </div>
        </nav>
    )
}