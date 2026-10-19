import SectionHeader from '@/components/section-header'
import SectionReveal from '@/components/section-reveal'
import { practiceSkills, skillGroups } from '@/data/portfolio-content'

// Larger groups get wider tiles so the board packs without gaps.
const spanFor = (count: number) => (count >= 7 ? 'wide' : '')

export default function Skills() {
    const groups = [...skillGroups, practiceSkills]

    return (
        <SectionReveal id="skills">
            <SectionHeader id="skills" title="Skills & Expertise" eyebrow="Technical toolkit" />

            <div className="skills-board stagger">
                {groups.map((group, i) => (
                    <div className={`card skill-panel ${spanFor(group.items.length)}`} key={group.title}>
                        <div className="skill-head">
                            <h3 className="skill-title">{group.title}</h3>
                            <span className="skill-count" aria-hidden="true">
                                {String(i + 1).padStart(2, '0')} · {group.items.length}
                            </span>
                        </div>
                        <div className="chips">
                            {group.items.map((item) => (
                                <span className="chip" key={item}>
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </SectionReveal>
    )
}
