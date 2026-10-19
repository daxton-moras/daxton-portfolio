import Image from 'next/image'
import SectionHeader from '@/components/section-header'
import SectionReveal from '@/components/section-reveal'
import { aboutContent, heroContent } from '@/data/portfolio-content'

export default function About() {
    return (
        <SectionReveal id="about">
            <SectionHeader id="about" title="About Me" eyebrow={aboutContent.eyebrow} />

            <div className="about-grid">
                <div className="avatar-wrap">
                    <div className="avatar">
                        <div className="avatar-photo">
                            <Image
                                src="/profile.jpg"
                                alt={`Portrait of ${heroContent.firstName} ${heroContent.lastName}`}
                                fill
                                sizes="(max-width: 900px) 70vw, 288px"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <p className="about-lead">{aboutContent.title}</p>
                    <div className="about-copy">
                        <p style={{ color: 'var(--foreground)' }}>{aboutContent.lead}</p>
                        {aboutContent.paragraphs.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                    </div>

                    <div className="stats stagger">
                        {aboutContent.credentials.map((c) => {
                            const body = (
                                <>
                                    <div className="stat-kicker">{c.kicker}</div>
                                    <div className="stat-value">{c.title}</div>
                                    {c.note && (
                                        <div className={`stat-label ${c.note === 'In progress' ? 'pending' : ''}`}>
                                            {c.note}
                                        </div>
                                    )}
                                </>
                            )

                            // A single badge makes the whole tile the link; several get their own links.
                            if (c.links.length === 1) {
                                return (
                                    <a
                                        className="card stat stat-link"
                                        key={c.title}
                                        href={c.links[0].href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-cursor="Verify"
                                        aria-label={`${c.title}: ${c.links[0].label} (opens in a new tab)`}
                                    >
                                        {body}
                                        <span className="stat-verify" aria-hidden="true">
                                            {c.links[0].label} ↗
                                        </span>
                                    </a>
                                )
                            }

                            return (
                                <div className="card stat" key={c.title}>
                                    {body}
                                    {c.links.length > 1 && (
                                        <div className="badge-links">
                                            {c.links.map((l) => (
                                                <a
                                                    key={l.href}
                                                    className="badge-link"
                                                    href={l.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    data-cursor="Verify"
                                                    aria-label={`${c.title} ${l.label} on Credly (opens in a new tab)`}
                                                >
                                                    {l.label} ↗
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </SectionReveal>
    )
}
