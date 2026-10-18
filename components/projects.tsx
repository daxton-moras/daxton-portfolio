import { ArrowUpRight, Lock } from 'lucide-react'
import SectionReveal from '@/components/section-reveal'
import { projects } from '@/data/portfolio-content'

export default function Projects() {
    return (
        <SectionReveal id="projects">
            <div className="section-header">
                <h2 className="section-title">Projects</h2>
                <span className="eyebrow">Built on my own time</span>
            </div>

            <div className="project-list stagger">
                {projects.map((project) => (
                    <article className="card project-card" key={project.title} data-tilt>
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
                    </article>
                ))}
            </div>
        </SectionReveal>
    )
}
