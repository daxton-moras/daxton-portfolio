import { FadeIn, RevealLetters, RevealWords, TypedLine } from '@/components/motion-text'
import { heroContent, focusAreas } from '@/data/portfolio-content'

export default function Hero() {
    const summary = heroContent.summary.map((s) => s.text).join('')

    return (
        <section id="intro" className="section hero">
            <div className="section-inner hero-grid">
                <div>
                    <h1 className="hero-name">
                        <RevealLetters text={heroContent.firstName} />
                        <RevealLetters text={heroContent.lastName} delay={0.25} className="hero-name-last" />
                    </h1>

                    <FadeIn delay={0.7}>
                        <TypedLine phrases={heroContent.typed} startDelay={1.1} />
                        <span className="sr-only">{heroContent.typed.join(', ')}</span>
                    </FadeIn>

                    <p className="hero-summary" aria-label={summary}>
                        <RevealWords segments={heroContent.summary} delay={0.6} />
                    </p>

                    <FadeIn delay={1.3} className="availability">
                        <span className="live-dot">{heroContent.availability}</span>
                        <span>{heroContent.location}</span>
                    </FadeIn>
                </div>

                <FadeIn delay={0.9} className="hero-side">
                    <div className="eyebrow">Currently</div>
                    <div className="currently">
                        {heroContent.currently.map((line) => (
                            <div key={line}>{line}</div>
                        ))}
                    </div>

                    <div className="eyebrow">Focus</div>
                    <div className="chips chips-pop">
                        {focusAreas.map((item, i) => (
                            <span className="chip" key={item} style={{ animationDelay: `${1.1 + i * 0.05}s` }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </FadeIn>
            </div>

            <a href="#about" className="scroll-cue" data-cursor="Scroll" aria-label="Scroll to About">
                <span />
            </a>
        </section>
    )
}
