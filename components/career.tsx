import { Briefcase, GraduationCap } from 'lucide-react'
import SectionHeader from '@/components/section-header'
import SectionReveal from '@/components/section-reveal'
import TimelineProgress from '@/components/timeline-progress'
import { career } from '@/data/portfolio-content'

export default function Career() {
    return (
        <SectionReveal id="career">
            <SectionHeader id="career" title="Experience & Education" eyebrow="Timeline" />

            <ol className="timeline stagger">
                <TimelineProgress />
                {career.map((entry) => (
                    <li className={`timeline-entry ${entry.kind}`} key={entry.title + entry.period}>
                        <span className="timeline-node" aria-hidden="true" />

                        <div className="timeline-meta">
                            <span className="timeline-period">{entry.period}</span>
                            <span className="badge">
                                {entry.kind === 'experience' ? (
                                    <>
                                        <Briefcase size={12} /> Experience
                                    </>
                                ) : (
                                    <>
                                        <GraduationCap size={12} /> Education
                                    </>
                                )}
                            </span>
                        </div>

                        <div className={entry.kind === 'experience' ? 'card timeline-card' : 'timeline-card plain'}>
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
        </SectionReveal>
    )
}
