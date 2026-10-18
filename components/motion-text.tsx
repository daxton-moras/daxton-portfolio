'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const ease = [0.2, 0.7, 0.2, 1] as const

// Letters rise out of a blur one after another. Screen readers get the plain text.
export function RevealLetters({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
    const reduced = useReducedMotion()

    return (
        <span className={className} aria-label={text} role="text">
            {Array.from(text).map((char, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    style={{ display: 'inline-block', whiteSpace: 'pre' }}
                    initial={reduced ? false : { opacity: 0, y: '0.45em', filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.9, delay: delay + i * 0.045, ease }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    )
}

type Segment = { text: string; highlight?: boolean }

// Word-by-word reveal that keeps highlighted phrases styled.
export function RevealWords({ segments, delay = 0 }: { segments: Segment[]; delay?: number }) {
    const reduced = useReducedMotion()
    const words: { word: string; highlight?: boolean }[] = []

    segments.forEach((seg) => {
        seg.text.split(/(\s+)/).forEach((word) => {
            if (word) words.push({ word, highlight: seg.highlight })
        })
    })

    let index = 0
    return (
        <>
            {words.map((w, i) => {
                if (/^\s+$/.test(w.word)) return w.word
                const order = index++
                const content = (
                    <motion.span
                        aria-hidden="true"
                        style={{ display: 'inline-block' }}
                        initial={reduced ? false : { opacity: 0, y: 14, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.7, delay: delay + order * 0.035, ease }}
                    >
                        {w.word}
                    </motion.span>
                )
                return w.highlight ? <strong key={i}>{content}</strong> : <span key={i}>{content}</span>
            })}
        </>
    )
}

// Fades a block in after the hero text has landed.
export function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
    const reduced = useReducedMotion()
    return (
        <motion.div
            className={className}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease }}
        >
            {children}
        </motion.div>
    )
}

// Types and deletes each phrase in turn, like a terminal prompt.
export function TypedLine({ phrases, startDelay = 0 }: { phrases: string[]; startDelay?: number }) {
    const reduced = useReducedMotion()
    const [state, setState] = useState({ index: 0, length: 0, deleting: false, started: false })

    useEffect(() => {
        if (reduced) return

        const phrase = phrases[state.index]
        let wait = state.deleting ? 28 : 55
        if (!state.started) wait = startDelay * 1000
        else if (!state.deleting && state.length === phrase.length) wait = 1900
        else if (state.deleting && state.length === 0) wait = 350

        const timer = setTimeout(() => {
            setState((s) => {
                if (!s.started) return { ...s, started: true }
                const current = phrases[s.index]
                if (!s.deleting && s.length === current.length) return { ...s, deleting: true }
                if (s.deleting && s.length === 0) return { index: (s.index + 1) % phrases.length, length: 0, deleting: false, started: true }
                return { ...s, length: s.length + (s.deleting ? -1 : 1) }
            })
        }, wait)

        return () => clearTimeout(timer)
    }, [state, phrases, reduced, startDelay])

    const text = reduced ? phrases[0] : phrases[state.index].slice(0, state.length)

    return (
        <span className="typed-line" aria-hidden="true">
            <span className="typed-prompt">&gt;</span> {text}
            <span className="typed-caret" />
        </span>
    )
}
