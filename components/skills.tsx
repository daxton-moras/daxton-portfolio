import SectionReveal from '@/components/section-reveal'
import { practiceSkills, skillGroups } from '@/data/portfolio-content'

export default function Skills() {
    return (
        <SectionReveal id="skills">
            <div className="section-header">
                <h2 className="section-title">Skills &amp; Expertise</h2>
                <span className="eyebrow">Technical toolkit</span>
            </div>

            <div className="skills-grid">
                <div className="skills-main stagger">
                    {skillGroups.map((group) => (
                        <div className="card skill-card" key={group.title}>
                            <h3 className="eyebrow">{group.title}</h3>
                            <div className="chips stagger">
                                {group.items.map((item) => (
                                    <span className="chip" key={item}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card skill-card tall">
                    <h3 className="eyebrow">{practiceSkills.title}</h3>
                    <div className="chips stagger">
                        {practiceSkills.items.map((item) => (
                            <span className="chip" key={item}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </SectionReveal>
    )
}
