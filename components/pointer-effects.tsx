'use client'

import { useEffect } from 'react'

// One delegated listener drives three hover effects:
//  - .card            a spotlight that follows the pointer (--mx / --my)
//  - [data-tilt]      a slight 3D tilt toward the pointer (--rx / --ry)
//  - [data-magnetic]  a pull toward the pointer (--tx / --ty)
export default function PointerEffects() {
    useEffect(() => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        let tilted: HTMLElement | null = null
        let magnet: HTMLElement | null = null

        const reset = (el: HTMLElement | null, vars: string[]) => {
            vars.forEach((v) => el?.style.removeProperty(v))
        }

        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return
            const target = e.target as Element | null

            const card = target?.closest<HTMLElement>('.card')
            if (card) {
                const r = card.getBoundingClientRect()
                card.style.setProperty('--mx', `${e.clientX - r.left}px`)
                card.style.setProperty('--my', `${e.clientY - r.top}px`)
            }

            if (reducedMotion.matches) return

            const tilt = target?.closest<HTMLElement>('[data-tilt]') ?? null
            if (tilt !== tilted) reset(tilted, ['--rx', '--ry'])
            tilted = tilt
            if (tilt) {
                const r = tilt.getBoundingClientRect()
                const px = (e.clientX - r.left) / r.width - 0.5
                const py = (e.clientY - r.top) / r.height - 0.5
                tilt.style.setProperty('--rx', `${(-py * 4).toFixed(2)}deg`)
                tilt.style.setProperty('--ry', `${(px * 5).toFixed(2)}deg`)
            }

            const mag = target?.closest<HTMLElement>('[data-magnetic]') ?? null
            if (mag !== magnet) reset(magnet, ['--tx', '--ty'])
            magnet = mag
            if (mag) {
                const r = mag.getBoundingClientRect()
                mag.style.setProperty('--tx', `${((e.clientX - (r.left + r.width / 2)) * 0.25).toFixed(1)}px`)
                mag.style.setProperty('--ty', `${((e.clientY - (r.top + r.height / 2)) * 0.3).toFixed(1)}px`)
            }
        }

        window.addEventListener('pointermove', onMove, { passive: true })
        return () => window.removeEventListener('pointermove', onMove)
    }, [])

    return null
}
