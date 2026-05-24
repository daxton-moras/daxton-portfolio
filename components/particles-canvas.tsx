'use client'

import { useEffect, useRef } from 'react'

export default function ParticlesCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let width = window.innerWidth
        let height = window.innerHeight
        let frame = 0

        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.6 + 0.2,
            vx: (Math.random() - 0.5) * 0.08,
            vy: (Math.random() - 0.5) * 0.08,
        }))

        const resize = () => {
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width
            canvas.height = height
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height)

            for (const p of particles) {
                p.x += p.vx
                p.y += p.vy

                if (p.x < 0) p.x = width
                if (p.x > width) p.x = 0
                if (p.y < 0) p.y = height
                if (p.y > height) p.y = 0

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = 'rgba(255,255,255,0.45)'
                ctx.fill()
            }

            frame = requestAnimationFrame(draw)
        }

        resize()
        draw()
        window.addEventListener('resize', resize)

        return () => {
            cancelAnimationFrame(frame)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                pointerEvents: 'none',
                opacity: 0.15,
            }}
        />
    )
}