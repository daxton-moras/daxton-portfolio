'use client'

import { useEffect, useRef } from 'react'

type Dash = { bx: number; by: number; seed: number }

// Gradient stops the ring tints dashes with, per theme.
const PALETTES = {
    dark: { base: [255, 255, 255], hues: [[96, 140, 255], [167, 123, 255], [255, 122, 182]] },
    light: { base: [43, 40, 35], hues: [[47, 95, 208], [122, 79, 214], [201, 79, 135]] },
}

const LEVELS = 6 // intensity buckets; one canvas path per bucket keeps drawing cheap

// A field of short dashes that lean away from a soft ring. The ring follows the
// pointer with easing and wanders on its own when the pointer is still, so the
// page is visibly alive even without interaction.
export default function ParticlesCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        let width = 0
        let height = 0
        let dashes: Dash[] = []
        let frame = 0
        let running = false
        let palette = PALETTES.dark
        let styles: string[][] = []
        let baseStyle = ''

        const ring = { x: 0, y: 0, tx: 0, ty: 0, radius: 0 }
        let lastPointer = -Infinity

        const buildStyles = () => {
            palette = document.documentElement.classList.contains('light') ? PALETTES.light : PALETTES.dark
            const [r, g, b] = palette.base
            baseStyle = `rgba(${r}, ${g}, ${b}, 0.16)`
            styles = palette.hues.map(([hr, hg, hb]) =>
                Array.from({ length: LEVELS }, (_, k) => `rgba(${hr}, ${hg}, ${hb}, ${(0.3 + (0.7 * (k + 1)) / LEVELS).toFixed(2)})`)
            )
        }

        const layout = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            // Jittered grid: even coverage without visible rows.
            const spacing = width < 640 ? 34 : 26
            dashes = []
            for (let y = spacing / 2; y < height; y += spacing) {
                for (let x = spacing / 2; x < width; x += spacing) {
                    dashes.push({
                        bx: x + (Math.random() - 0.5) * spacing * 0.8,
                        by: y + (Math.random() - 0.5) * spacing * 0.8,
                        seed: Math.random() * Math.PI * 2,
                    })
                }
            }

            ring.radius = Math.min(width, height) * (width < 640 ? 0.32 : 0.24)
            if (!ring.x && !ring.y) {
                ring.x = ring.tx = width * 0.62
                ring.y = ring.ty = height * 0.48
            }
        }

        const draw = (time: number) => {
            const t = time / 1000

            // Idle orbit when the pointer has been still for a while.
            if (time - lastPointer > 2500) {
                ring.tx = width * (0.55 + 0.22 * Math.cos(t * 0.23))
                ring.ty = height * (0.5 + 0.2 * Math.sin(t * 0.31))
            }
            ring.x += (ring.tx - ring.x) * 0.06
            ring.y += (ring.ty - ring.y) * 0.06

            // Strongest over the hero, calmer behind the reading sections.
            canvas.style.opacity = String(Math.max(0.35, 1 - window.scrollY / (height * 1.4)))

            ctx.clearRect(0, 0, width, height)
            ctx.lineCap = 'round'

            const R = ring.radius
            const W = R * 0.38
            const base = new Path2D()
            const buckets = styles.map((row) => row.map(() => new Path2D()))

            for (const d of dashes) {
                const dx = d.bx - ring.x
                const dy = d.by - ring.y
                const dist = Math.hypot(dx, dy) || 1
                const nx = dx / dist
                const ny = dy / dist

                const band = (dist - R) / W
                const energy = Math.exp(-band * band) // 1 on the ring, 0 far away

                // Gentle drift everywhere plus an outward push near the ring.
                const wobble = Math.sin(t * 0.8 + d.seed) * 2.2
                const push = energy * 16
                const x = d.bx + nx * push + Math.cos(d.seed + t * 0.5) * wobble
                const y = d.by + ny * push + Math.sin(d.seed + t * 0.6) * wobble

                const len = 1.2 + energy * 7
                const path = energy < 0.08 ? base : buckets[Math.floor(((Math.atan2(ny, nx) + Math.PI) / (2 * Math.PI)) * 3) % 3][Math.min(LEVELS - 1, Math.floor(energy * LEVELS))]

                path.moveTo(x - nx * len * 0.5, y - ny * len * 0.5)
                path.lineTo(x + nx * len * 0.5, y + ny * len * 0.5)
            }

            ctx.lineWidth = 1.4
            ctx.strokeStyle = baseStyle
            ctx.stroke(base)

            ctx.lineWidth = 1.8
            buckets.forEach((row, h) =>
                row.forEach((path, k) => {
                    ctx.strokeStyle = styles[h][k]
                    ctx.stroke(path)
                })
            )

            if (running) frame = requestAnimationFrame(draw)
        }

        const start = () => {
            cancelAnimationFrame(frame)
            running = !reducedMotion.matches && !document.hidden
            frame = requestAnimationFrame(draw)
        }

        const onPointer = (e: PointerEvent) => {
            ring.tx = e.clientX
            ring.ty = e.clientY
            lastPointer = performance.now()
        }

        const onResize = () => {
            layout()
            start()
        }

        const themeObserver = new MutationObserver(() => {
            buildStyles()
            start()
        })

        buildStyles()
        layout()
        start()

        window.addEventListener('pointermove', onPointer, { passive: true })
        window.addEventListener('pointerdown', onPointer, { passive: true })
        window.addEventListener('resize', onResize)
        document.addEventListener('visibilitychange', start)
        reducedMotion.addEventListener('change', start)
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

        return () => {
            running = false
            cancelAnimationFrame(frame)
            window.removeEventListener('pointermove', onPointer)
            window.removeEventListener('pointerdown', onPointer)
            window.removeEventListener('resize', onResize)
            document.removeEventListener('visibilitychange', start)
            reducedMotion.removeEventListener('change', start)
            themeObserver.disconnect()
        }
    }, [])

    return <canvas ref={canvasRef} className="particles" aria-hidden="true" />
}
