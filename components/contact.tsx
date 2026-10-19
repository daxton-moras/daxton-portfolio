'use client'

import { useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import SectionHeader from '@/components/section-header'
import SectionReveal from '@/components/section-reveal'
import { contactContent, heroContent } from '@/data/portfolio-content'

export default function Contact() {
    const [copied, setCopied] = useState(false)

    const copyEmail = async () => {
        let ok = false
        try {
            await navigator.clipboard.writeText(contactContent.email)
            ok = true
        } catch {
            // Older browsers and embedded views can refuse the async clipboard API.
            const field = document.createElement('textarea')
            field.value = contactContent.email
            field.setAttribute('readonly', '')
            field.style.position = 'fixed'
            field.style.opacity = '0'
            document.body.appendChild(field)
            field.select()
            ok = document.execCommand('copy')
            field.remove()
        }

        if (ok) {
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        }
    }

    return (
        <SectionReveal id="contact" className="compact contact">
            <SectionHeader id="contact" title={contactContent.title} eyebrow="Open channel" />

            <div className="contact-grid">
                <div>
                    <p className="contact-blurb">{contactContent.blurb}</p>

                    <div className="email-box">
                        <a className="email-link" href={`mailto:${contactContent.email}`} data-cursor="Email">
                            {contactContent.email}
                        </a>
                        <button
                            type="button"
                            className="copy-btn"
                            data-magnetic
                            data-cursor={copied ? 'Copied' : 'Copy'}
                            onClick={copyEmail}
                            aria-label={copied ? 'Email copied' : 'Copy email to clipboard'}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                    </div>
                </div>

                <ul className="elsewhere stagger">
                    {contactContent.links.map((link) => (
                        <li key={link.label}>
                            <a
                                className="link-row"
                                data-cursor="Visit"
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span className="link-label">{link.label}</span>
                                <span className="link-handle">{link.handle}</span>
                                <ArrowUpRight size={18} />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <footer className="footer">
                <span>
                    © {new Date().getFullYear()} {heroContent.firstName} {heroContent.lastName} · {heroContent.location}
                </span>
                <a href="#intro" className="back-top" data-cursor="Top">
                    Back to top <ArrowUp size={14} />
                </a>
            </footer>
        </SectionReveal>
    )
}
