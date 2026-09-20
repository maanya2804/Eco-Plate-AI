/**
 * Small pill shown whenever Demo Mode is active.
 * Placed in Navbar and on pages that use AI features.
 */
export default function DemoBadge({ className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 ${className}`}
      title="No AI API key configured. Running on built-in demo responses."
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      Demo Mode
    </span>
  )
}
