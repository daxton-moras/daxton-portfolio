import { sections } from '@/data/portfolio-content'

type Props = {
    id: (typeof sections)[number]['id']
    title: React.ReactNode
    eyebrow?: string
}

// Stage number and an accent kicker over a rule that draws in, then the title.
export default function SectionHeader({ id, title, eyebrow }: Props) {
    const index = sections.findIndex((s) => s.id === id)

    return (
        <div className="section-header">
            <div className="stage-line">
                <span className="stage-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                </span>
                {eyebrow && <span className="stage-eyebrow">{eyebrow}</span>}
                <span className="stage-rule" aria-hidden="true" />
            </div>
            <h2 className="section-title">{title}</h2>
        </div>
    )
}
