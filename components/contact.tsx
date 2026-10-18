'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
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
        <SectionReveal id="contact" className="compact">
            <div className="contact-grid">
                <div>
                    <h2 className="section-title">{contactContent.title}</h2>
                    <p className="contact-blurb">{contactContent.blurb}</p>

                    <div className="card email-box">
                        <a href={`mailto:${contactContent.email}`} data-cursor="Email">{contactContent.email}</a>
                        <button
                            type="button"
                            className="copy-btn"
                            data-magnetic
                            data-cursor={copied ? 'Copied' : 'Copy'}
                            onClick={copyEmail}
                            aria-label={copied ? 'Email copied' : 'Copy email to clipboard'}
                        >
                            {copied ? <Check size={15} /> : <Copy size={15} />}
                        </button>
                    </div>
                </div>

                <div>
                    <span className="eyebrow">Elsewhere</span>
                    <div className="elsewhere stagger">
                        {contactContent.links.map((link) => (
                            <a
                                className="card link-card"
                                data-magnetic
                                data-cursor="Visit"
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>
                                    {link.label}
                                    <small>{link.handle}</small>
                                </span>
                                <ArrowUpRight size={16} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="footer">
                <span>
                    © {new Date().getFullYear()} {heroContent.firstName} {heroContent.lastName}
                </span>
                <span>{heroContent.location}</span>
            </footer>
        </SectionReveal>
    )
}
