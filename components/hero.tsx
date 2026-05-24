import { heroContent, focusAreas } from '@/data/portfolio-content'

export default function Hero() {
    return (
        <section id="intro" className="section">
            <div className="section-inner hero-grid">
                <div>
                    <h1 className="hero-name">
                        {heroContent.firstName}
                        <span>{heroContent.lastName}</span>
                    </h1>

                    <p className="hero-summary">{heroContent.summary}</p>

                    <div className="availability">
                        ● {heroContent.availability} — {heroContent.location}
                    </div>
                </div>

                <div className="hero-side">
                    <div className="section-label">Currently</div>
                    <div style={{ marginBottom: '32px' }}>{heroContent.role}</div>

                    <div className="section-label">Focus</div>
                    <div className="chips">
                        {focusAreas.map((item) => (
                            <span className="chip" key={item}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}