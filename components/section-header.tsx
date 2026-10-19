import { sectionCopy, sections } from '@/data/portfolio-content'

type Props = {
    id: keyof typeof sectionCopy
}

// Stage number and an accent kicker over a rule that draws in, then the title.
export default function SectionHeader({ id }: Props) {
    const index = sections.findIndex((s) => s.id === id)
    const { title, kicker } = sectionCopy[id]

    return (
        <div className="section-header">
            <div className="stage-line">
                <span className="stage-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span className="stage-eyebrow">{kicker}</span>
                <span className="stage-rule" aria-hidden="true" />
            </div>
            <h2 className="section-title">{title}</h2>
        </div>
    )
}
