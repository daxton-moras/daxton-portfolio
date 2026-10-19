import { ArrowUpRight, Lock } from 'lucide-react'
import SectionHeader from '@/components/section-header'
import SectionReveal from '@/components/section-reveal'
import { projects } from '@/data/portfolio-content'

export default function Projects() {
    return (
        <SectionReveal id="projects">
            <SectionHeader id="projects" />

            <div className="project-bento stagger">
                {projects.map((project, i) => (
                    <article className={`card project-card ${i === 0 ? 'feature' : ''}`} key={project.title} data-tilt>
                        {/* A generated cover: each project gets its own angle of the accent gradient. */}
                        <div className="project-cover" style={{ '--angle': `${40 + i * 110}deg` } as React.CSSProperties} aria-hidden="true">
                            <span className="project-index">{String(i + 1).padStart(2, '0')}</span>
                        </div>

                        <div className="project-body">
                            <div className="project-head">
                                <div>
                                    <h3 className="project-title">{project.title}</h3>
                                    <div className="project-context">{project.context}</div>
                                </div>

                                {project.href ? (
                                    <a
                                        className="project-link"
                                        href={project.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${project.linkLabel}: ${project.title}`}
                                    >
                                        {project.linkLabel} <ArrowUpRight size={14} />
                                    </a>
                                ) : project.linkLabel ? (
                                    <span className="project-link">
                                        <Lock size={13} /> {project.linkLabel}
                                    </span>
                                ) : null}
                            </div>

                            <p className="project-desc">{project.description}</p>

                            <div className="tags">
                                {project.tags.map((tag) => (
                                    <span className="tag" key={tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </SectionReveal>
    )
}
