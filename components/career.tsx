import { GraduationCap } from 'lucide-react'
import SectionHeader from '@/components/section-header'
import SectionReveal from '@/components/section-reveal'
import TimelineProgress from '@/components/timeline-progress'
import { career } from '@/data/portfolio-content'

export default function Career() {
    const roles = career.filter((entry) => entry.kind === 'experience')
    const study = career.filter((entry) => entry.kind === 'education')

    return (
        <SectionReveal id="career">
            <SectionHeader id="career" />

            <ol className="timeline stagger">
                <TimelineProgress />
                {roles.map((entry) => (
                    <li className="timeline-entry" key={entry.title + entry.period}>
                        <span className="timeline-node" aria-hidden="true" />
                        <span className="timeline-period">{entry.period}</span>

                        <div className="card timeline-card">
                            <h3 className="timeline-title">
                                {entry.title}
                                {entry.subtitle && <span className="timeline-subtitle"> · {entry.subtitle}</span>}
                            </h3>
                            <div className="timeline-org">{entry.org}</div>

                            {entry.summary && <p className="timeline-summary">{entry.summary}</p>}

                            {entry.highlights.length > 0 && (
                                <ul className="timeline-highlights">
                                    {entry.highlights.map((h) => (
                                        <li key={h}>{h}</li>
                                    ))}
                                </ul>
                            )}

                            {entry.tags.length > 0 && (
                                <div className="tags">
                                    {entry.tags.map((tag) => (
                                        <span className="tag" key={tag}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ol>

            <h3 className="cred-group-title study-title">Study</h3>
            <div className="study-grid stagger">
                {study.map((entry) => (
                    <div className="card study-card" key={entry.title + entry.period}>
                        <span className="cred-icon" aria-hidden="true">
                            <GraduationCap size={18} />
                        </span>
                        <div>
                            <div className="study-name">{entry.title}</div>
                            <div className="timeline-org">{entry.org}</div>
                        </div>
                        <span className="study-period">{entry.period}</span>
                    </div>
                ))}
            </div>
        </SectionReveal>
    )
}
