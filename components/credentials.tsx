import SectionReveal from '@/components/section-reveal'
import { awards, certifications } from '@/data/portfolio-content'

function CredName({ name, href }: { name: string; href: string | null | undefined }) {
    if (!href) return <span>{name}</span>
    return (
        <a
            className="cred-link"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Verify"
            aria-label={`${name}: verify on Credly (opens in a new tab)`}
        >
            {name}
            <span className="cred-arrow" aria-hidden="true">
                ↗
            </span>
        </a>
    )
}

export default function Credentials() {
    return (
        <SectionReveal id="credentials" className="compact">
            <div className="section-header">
                <h2 className="section-title">Certifications &amp; Awards</h2>
                <span className="eyebrow">Recognition</span>
            </div>

            <div className="cred-grid stagger">
                <div className="card cred-card">
                    <h3 className="eyebrow">Certifications</h3>
                    <ul className="cred-list stagger">
                        {certifications.map((c) => (
                            <li key={c.name}>
                                <CredName name={c.name} href={c.href} />
                                <span className={`cred-status ${c.status === 'In progress' ? 'pending' : ''}`}>
                                    {c.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="card cred-card">
                    <h3 className="eyebrow">Awards</h3>
                    <ul className="cred-list stagger">
                        {awards.map((a) => (
                            <li key={a.name}>
                                <CredName name={a.name} href={a.links.length === 1 ? a.links[0].href : null} />
                                {a.links.length > 1 ? (
                                    <span className="badge-links">
                                        {a.links.map((l) => (
                                            <a
                                                key={l.href}
                                                className="badge-link"
                                                href={l.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                data-cursor="Verify"
                                                aria-label={`${a.name} ${l.label} on Credly (opens in a new tab)`}
                                            >
                                                {l.label} ↗
                                            </a>
                                        ))}
                                    </span>
                                ) : (
                                    a.note && <span className="cred-status">{a.note}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionReveal>
    )
}
