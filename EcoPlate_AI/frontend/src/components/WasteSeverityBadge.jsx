/**
 * Coloured badge showing Low / Moderate / High waste severity.
 *
 * Thresholds:
 *   0–10%   → Low      (green)
 *   10–25%  → Moderate (amber)
 *   >25%    → High     (red)
 *
 * NOTE: These are prototype thresholds for demonstration purposes
 * and do not represent official or regulatory standards.
 */
export function getSeverity(wastePercent) {
  if (wastePercent <= 10) return 'Low'
  if (wastePercent <= 25) return 'Moderate'
  return 'High'
}

export function getSeverityColors(severity) {
  switch (severity) {
    case 'Low':
      return {
        bg: 'bg-eco-50',
        text: 'text-eco-700',
        border: 'border-eco-200',
        dot: 'bg-eco-500',
        bar: 'bg-eco-500',
      }
    case 'Moderate':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        dot: 'bg-amber-500',
        bar: 'bg-amber-500',
      }
    case 'High':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        dot: 'bg-red-500',
        bar: 'bg-red-500',
      }
    default:
      return {
        bg: 'bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-200',
        dot: 'bg-gray-500',
        bar: 'bg-gray-500',
      }
  }
}

export default function WasteSeverityBadge({ severity, size = 'md' }) {
  const colors = getSeverityColors(severity)
  const sizes = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-3 py-1 gap-1.5',
    lg: 'text-base px-4 py-1.5 gap-2',
  }

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border ${colors.bg} ${colors.text} ${colors.border} ${sizes[size]}`}
    >
      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
      {severity} Waste
    </span>
  )
}
