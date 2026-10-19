// The page sky behind everything: a deep navy night in dark mode and a warm
// sunrise in light mode. Switching theme crossfades the two while the new
// theme's glow rises from the bottom edge.
export default function SkyBackdrop() {
    return (
        <div className="sky-backdrop" aria-hidden="true">
            <div className="sky-layer sky-night">
                <span className="sky-glow" />
            </div>
            <div className="sky-layer sky-dawn">
                <span className="sky-glow" />
            </div>
        </div>
    )
}
