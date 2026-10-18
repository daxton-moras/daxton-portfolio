import SectionReveal from '@/components/section-reveal'
import { awards, certifications } from '@/data/portfolio-content'

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
                                <span>{c.name}</span>
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
                                <span>{a.name}</span>
                                {a.note && <span className="cred-status">{a.note}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionReveal>
    )
}
