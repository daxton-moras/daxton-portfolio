import { Briefcase, GraduationCap } from 'lucide-react'
import SectionReveal from '@/components/section-reveal'
import { career } from '@/data/portfolio-content'

export default function Career() {
    return (
        <SectionReveal id="career">
            <div className="section-header">
                <h2 className="section-title">Experience &amp; Education</h2>
                <span className="eyebrow">Timeline</span>
            </div>

            <div className="timeline stagger">
                {career.map((entry) => (
                    <article className="timeline-row" key={entry.title + entry.period}>
                        <div className="timeline-period">{entry.period}</div>

                        <div>
                            <h3 className="timeline-title">
                                {entry.title}
                                {entry.subtitle && <span className="timeline-subtitle"> · {entry.subtitle}</span>}
                            </h3>

                            {entry.summary && <p className="timeline-summary">{entry.summary}</p>}

                            {entry.highlights.length > 0 && (
                                <ul className="timeline-highlights">
                                    {entry.highlights.map((h) => (
                                        <li key={h}>{h}</li>
                                    ))}
                                </ul>
                            )}

                            <div className="timeline-meta">
                                <span>{entry.org}</span>
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
                        </div>

                        <div className="timeline-tags">
                            {entry.tags.map((tag) => (
                                <span className="tag" key={tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </SectionReveal>
    )
}
