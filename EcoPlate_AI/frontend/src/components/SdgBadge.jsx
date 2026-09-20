/**
 * SDG 12 — Responsible Consumption and Production badge.
 * Displays the official SDG colour (#BF8B2E / orange) with the goal number and title.
 */
export default function SdgBadge({ size = 'md' }) {
  const sizes = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2.5',
  }

  return (
    <div
      className={`inline-flex items-center rounded-full font-semibold border ${sizes[size]}`}
      style={{ backgroundColor: '#FEF3C7', color: '#92400E', borderColor: '#F59E0B' }}
      title="United Nations Sustainable Development Goal 12"
    >
      {/* SDG wheel icon (simplified SVG) */}
      <svg
        viewBox="0 0 24 24"
        className={size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" fill="#BF8B2E" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="white"
        >
          12
        </text>
      </svg>
      SDG 12 · Responsible Consumption
    </div>
  )
}
