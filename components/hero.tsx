import HoverArrow from '@/components/hover-arrow'
import { FadeIn, RevealLetters, RevealWords, TypedLine } from '@/components/motion-text'
import { heroContent, focusAreas } from '@/data/portfolio-content'

export default function Hero() {
    const summary = heroContent.summary.map((s) => s.text).join('')
    const [role, scope] = heroContent.currently

    // A short snapshot of the current role, shown beside the name.
    const rows = [
        { key: 'Role', value: role },
        { key: 'Team', value: scope },
        { key: 'Based in', value: heroContent.location },
    ]

    return (
        <section id="intro" className="section hero">
            <div className="section-inner hero-grid">
                <div>
                    <FadeIn delay={0.2}>
                        <a href="#contact" className="announce">
                            <span className="live-dot">{heroContent.availability}</span>
                            <HoverArrow />
                        </a>
                    </FadeIn>

                    <h1 className="hero-name">
                        <RevealLetters text={heroContent.firstName} />{' '}
                        <RevealLetters text={heroContent.lastName} delay={0.25} className="hero-name-last" />
                    </h1>

                    <FadeIn delay={0.7}>
                        <TypedLine phrases={heroContent.typed} startDelay={1.1} />
                        <span className="sr-only">{heroContent.typed.join(', ')}</span>
                    </FadeIn>

                    <p className="hero-summary" aria-label={summary}>
                        <RevealWords segments={heroContent.summary} delay={0.6} />
                    </p>

                    <FadeIn delay={1.3} className="hero-ctas">
                        <a href="#contact" className="btn btn-primary">
                            Get in touch <HoverArrow />
                        </a>
                        <a href="#projects" className="btn btn-secondary">
                            See my work <HoverArrow />
                        </a>
                    </FadeIn>
                </div>

                <FadeIn delay={0.9}>
                    <div className="card status-panel" data-tilt>
                        <div className="panel-bar">
                            <span className="panel-dots" aria-hidden="true">
                                <i />
                                <i />
                                <i />
                            </span>
                            <span className="panel-title">Snapshot</span>
                        </div>

                        <dl className="panel-rows">
                            {rows.map((row) => (
                                <div className="panel-row" key={row.key}>
                                    <dt>{row.key}</dt>
                                    <dd>{row.value}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="panel-label">Working with</div>
                        <div className="chips chips-pop">
                            {focusAreas.map((item, i) => (
                                <span className="chip" key={item} style={{ animationDelay: `${1.1 + i * 0.05}s` }}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>

            <a href="#about" className="scroll-cue" aria-label="Scroll to About">
                <span />
            </a>
        </section>
    )
}
