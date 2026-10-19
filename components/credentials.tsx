import { Award, BadgeCheck } from 'lucide-react'
import SectionHeader from '@/components/section-header'
import SectionReveal from '@/components/section-reveal'
import { awards, certifications, type BadgeLink } from '@/data/portfolio-content'

type Item = {
    kind: 'cert' | 'award'
    name: string
    status: string | null
    links: BadgeLink[]
}

function CredCard({ item }: { item: Item }) {
    const Icon = item.kind === 'cert' ? BadgeCheck : Award
    const body = (
        <>
            <span className="cred-icon" aria-hidden="true">
                <Icon size={18} />
            </span>
            <span className="cred-name">{item.name}</span>
            {item.status && <span className={`cred-status ${item.status === 'In progress' ? 'pending' : ''}`}>{item.status}</span>}
        </>
    )

    // A single badge makes the whole card the link; several get their own links.
    if (item.links.length === 1) {
        return (
            <a
                className="card holo-card"
                href={item.links[0].href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Verify"
                aria-label={`${item.name}: verify on Credly (opens in a new tab)`}
            >
                {body}
                <span className="cred-verify" aria-hidden="true">
                    Verify on Credly ↗
                </span>
            </a>
        )
    }

    return (
        <div className="card holo-card">
            {body}
            {item.links.length > 1 && (
                <span className="badge-links">
                    {item.links.map((l) => (
                        <a
                            key={l.href}
                            className="badge-link"
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-cursor="Verify"
                            aria-label={`${item.name} ${l.label} on Credly (opens in a new tab)`}
                        >
                            {l.label} ↗
                        </a>
                    ))}
                </span>
            )}
        </div>
    )
}

export default function Credentials() {
    const certs: Item[] = certifications.map((c) => ({
        kind: 'cert',
        name: c.name,
        status: c.status,
        links: c.href ? [{ label: 'Verify', href: c.href }] : [],
    }))
    const awardItems: Item[] = awards.map((a) => ({ kind: 'award', name: a.name, status: a.note, links: a.links }))

    return (
        <SectionReveal id="credentials" className="compact">
            <SectionHeader id="credentials" title="Certifications & Awards" eyebrow="Recognition" />

            <h3 className="cred-group-title">Certifications</h3>
            <div className="cred-wall stagger">
                {certs.map((c) => (
                    <CredCard item={c} key={c.name} />
                ))}
            </div>

            <h3 className="cred-group-title">Awards</h3>
            <div className="cred-wall stagger">
                {awardItems.map((a) => (
                    <CredCard item={a} key={a.name} />
                ))}
            </div>
        </SectionReveal>
    )
}
