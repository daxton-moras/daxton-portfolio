// A chevron that grows a shaft and nudges forward when its link is hovered.
export default function HoverArrow() {
    return (
        <svg className="hover-arrow" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path className="hover-arrow-line" d="M0 5h7" />
            <path className="hover-arrow-tip" d="M1 1l4 4-4 4" />
        </svg>
    )
}
