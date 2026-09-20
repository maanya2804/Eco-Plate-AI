/**
 * Reusable stat card for the dashboard and result summaries.
 */
export default function StatCard({ icon, label, value, sub, accent = 'green' }) {
  const accents = {
    green:  'from-eco-500 to-eco-600',
    amber:  'from-amber-400 to-amber-500',
    red:    'from-red-400 to-red-500',
    blue:   'from-blue-400 to-blue-500',
    purple: 'from-purple-400 to-purple-500',
  }

  return (
    <div className="card flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${accents[accent]} flex items-center justify-center text-white text-xl shrink-0 shadow-sm`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5 truncate">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}
