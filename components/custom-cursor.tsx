'use client'

import { useEffect, useRef } from 'react'

// A dot that tracks the pointer exactly and a ring that trails it. Over links and
// buttons the ring grows slightly. Mouse and trackpad only; touch devices and
// reduced-motion users keep the native cursor.
export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement | null>(null)
    const ringRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (!finePointer.matches || reducedMotion.matches) return

        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        document.documentElement.classList.add('has-custom-cursor')

        const pos = { x: -100, y: -100, rx: -100, ry: -100 }
        let frame = 0
        let visible = false

        const loop = () => {
            pos.rx += (pos.x - pos.rx) * 0.18
            pos.ry += (pos.y - pos.ry) * 0.18
            dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
            ring.style.transform = `translate3d(${pos.rx}px, ${pos.ry}px, 0)`
            frame = requestAnimationFrame(loop)
        }

        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return
            pos.x = e.clientX
            pos.y = e.clientY
            if (!visible) {
                visible = true
                pos.rx = pos.x
                pos.ry = pos.y
                document.documentElement.classList.add('cursor-visible')
            }

            const target = (e.target as Element | null)?.closest('a, button')
            ring.classList.toggle('active', Boolean(target))
        }

        const onLeave = () => {
            visible = false
            document.documentElement.classList.remove('cursor-visible')
        }

        const onDown = () => ring.classList.add('pressed')
        const onUp = () => ring.classList.remove('pressed')

        frame = requestAnimationFrame(loop)
        window.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('pointerdown', onDown)
        window.addEventListener('pointerup', onUp)
        document.addEventListener('mouseleave', onLeave)

        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerdown', onDown)
            window.removeEventListener('pointerup', onUp)
            document.removeEventListener('mouseleave', onLeave)
            document.documentElement.classList.remove('has-custom-cursor', 'cursor-visible')
        }
    }, [])

    return (
        <div className="cursor-layer" aria-hidden="true">
            <div ref={ringRef} className="cursor-ring" />
            <div ref={dotRef} className="cursor-dot" />
        </div>
    )
}
