import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import WasteSeverityBadge, { getSeverity, getSeverityColors } from '../components/WasteSeverityBadge'

// ─────────────────────────────────────────────────
// DEMO DATA
// Clearly labelled fictional data for prototype use.
// Do not present as real institutional statistics.
// ─────────────────────────────────────────────────
const DEMO_DATA = [
  { item: 'Rice',             prepared: 120, consumed: 95,  leftover: 25 },
  { item: 'Pasta',            prepared: 80,  consumed: 74,  leftover: 6  },
  { item: 'Chicken Curry',    prepared: 100, consumed: 68,  leftover: 32 },
  { item: 'Mixed Veg',        prepared: 60,  consumed: 55,  leftover: 5  },
  { item: 'Soup',             prepared: 90,  consumed: 81,  leftover: 9  },
  { item: 'Bread Rolls',      prepared: 150, consumed: 103, leftover: 47 },
  { item: 'Lentil Dal',       prepared: 70,  consumed: 63,  leftover: 7  },
  { item: 'Fried Rice',       prepared: 85,  consumed: 58,  leftover: 27 },
]

// Compute derived values once
const enriched = DEMO_DATA.map((d) => {
  const wastePercent = parseFloat(((d.leftover / d.prepared) * 100).toFixed(1))
  const severity = getSeverity(wastePercent)
  return { ...d, wastePercent, severity }
})

const totalPrepared  = enriched.reduce((s, d) => s + d.prepared,  0)
const totalConsumed  = enriched.reduce((s, d) => s + d.consumed,  0)
const totalLeftover  = enriched.reduce((s, d) => s + d.leftover,  0)
const avgWaste       = parseFloat(((totalLeftover / totalPrepared) * 100).toFixed(1))
const highestWaste   = [...enriched].sort((a, b) => b.wastePercent - a.wastePercent)[0]

// Pie chart data
const PIE_DATA = [
  { name: 'Consumed', value: totalConsumed  },
  { name: 'Leftover', value: totalLeftover  },
]
const PIE_COLORS = ['#16a34a', '#f87171']

// Severity colour map for bar chart cells
function barFill(severity) {
  if (severity === 'Low')      return '#22c55e'
  if (severity === 'Moderate') return '#f59e0b'
  return '#ef4444'
}

// Custom tooltip for bar chart
function WasteTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-bold text-gray-800 mb-1">{label}</p>
      <p className="text-gray-600">Waste: <span className="font-semibold">{d?.wastePercent}%</span></p>
      <p className="text-gray-600">Leftover: <span className="font-semibold">{d?.leftover}</span></p>
      <p className="text-gray-600">Prepared: <span className="font-semibold">{d?.prepared}</span></p>
    </div>
  )
}

// Custom bar shape coloured by severity
function ColouredBar(props) {
  const { x, y, width, height, severity } = props
  return <rect x={x} y={y} width={width} height={height} fill={barFill(severity)} rx={4} />
}

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        icon="📈"
        title="Dashboard"
        subtitle="Summary of food waste data across canteen items."
      >
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-100 border border-amber-300/30">
            ⚠️ Demo Data — not real institutional statistics
          </span>
        </div>
      </PageHeader>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10">

        {/* ── Demo data notice ─────────────────────── */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
          <span className="text-xl shrink-0">⚠️</span>
          <div>
            <p className="font-semibold mb-0.5">Demo Data</p>
            <p>
              All figures on this dashboard are fictional and created for prototype demonstration purposes only.
              They do not represent real canteen data, official statistics, or validated measurements.
            </p>
          </div>
        </div>

        {/* ── Summary stat cards ───────────────────── */}
        <div>
          <h2 className="section-title mb-5">Summary</h2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 stagger-children">
            <StatCard icon="🍳" label="Total Prepared"  value={totalPrepared}   sub="units (demo)" accent="blue"   />
            <StatCard icon="✅" label="Total Consumed"  value={totalConsumed}   sub="units (demo)" accent="green"  />
            <StatCard icon="♻️" label="Total Leftover"  value={totalLeftover}   sub="units (demo)" accent="amber"  />
            <StatCard icon="📊" label="Avg Waste"       value={`${avgWaste}%`}  sub="across items" accent={avgWaste <= 10 ? 'green' : avgWaste <= 25 ? 'amber' : 'red'} />
            <StatCard
              icon="🔴"
              label="Highest Waste"
              value={highestWaste.item}
              sub={`${highestWaste.wastePercent}% waste`}
              accent="red"
            />
          </div>
        </div>

        {/* ── Bar chart: waste % by item ───────────── */}
        <div className="card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="section-title">Waste % by Food Item</h2>
              <p className="text-sm text-gray-500 mt-1">Coloured by severity: green = Low · amber = Moderate · red = High</p>
            </div>
            <div className="flex gap-3 text-xs">
              {[['bg-eco-500','Low'],['bg-amber-500','Moderate'],['bg-red-500','High']].map(([cls, label]) => (
                <span key={label} className="flex items-center gap-1.5 text-gray-600">
                  <span className={`w-3 h-3 rounded-sm ${cls}`} />{label}
                </span>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enriched} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="item"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${v}%`}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                domain={[0, 60]}
              />
              <Tooltip content={<WasteTooltip />} />
              <Bar dataKey="wastePercent" name="Waste %" radius={[4, 4, 0, 0]}>
                {enriched.map((entry) => (
                  <Cell key={entry.item} fill={barFill(entry.severity)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Two-col: pie chart + table ───────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Pie chart */}
          <div className="card">
            <h2 className="section-title mb-1">Consumed vs Leftover</h2>
            <p className="text-sm text-gray-500 mb-4">Proportion of total prepared quantity</p>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {PIE_DATA.map((entry, i) => (
                    <Cell key={entry.name} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Legend
                  formatter={(value, entry) => (
                    <span className="text-sm text-gray-700">
                      {value} — {entry.payload.value} units ({((entry.payload.value / totalPrepared) * 100).toFixed(1)}%)
                    </span>
                  )}
                />
                <Tooltip formatter={(v) => [`${v} units`, '']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Data table */}
          <div className="card overflow-hidden p-0">
            <div className="px-6 pt-5 pb-3">
              <h2 className="section-title">Item Breakdown</h2>
              <p className="text-sm text-gray-500 mt-1">All figures are demo data</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-y border-gray-100">
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Item</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Prep</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Used</th>
                    <th className="text-right px-4 py-3 font-semibold text-gray-600">Left</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-600">Severity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {enriched
                    .slice()
                    .sort((a, b) => b.wastePercent - a.wastePercent)
                    .map((row) => {
                      const c = getSeverityColors(row.severity)
                      return (
                        <tr key={row.item} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-3 font-medium text-gray-800">{row.item}</td>
                          <td className="px-4 py-3 text-right text-gray-600">{row.prepared}</td>
                          <td className="px-4 py-3 text-right text-gray-600">{row.consumed}</td>
                          <td className={`px-4 py-3 text-right font-semibold ${c.text}`}>{row.leftover}</td>
                          <td className="px-4 py-3">
                            <WasteSeverityBadge severity={row.severity} size="sm" />
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Observations ─────────────────────────── */}
        <div className="card bg-eco-50 border-eco-100">
          <h2 className="section-title text-eco-800 mb-3">Demo observations</h2>
          <ul className="space-y-2 text-sm text-eco-700">
            <li className="flex items-start gap-2">
              <span className="text-eco-500 mt-0.5">▸</span>
              <span><strong>Bread Rolls</strong> and <strong>Chicken Curry</strong> show the highest waste in this demo dataset, both above 25% (High severity).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-eco-500 mt-0.5">▸</span>
              <span><strong>Pasta</strong>, <strong>Mixed Veg</strong>, and <strong>Lentil Dal</strong> show low waste, suggesting better demand alignment.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-eco-500 mt-0.5">▸</span>
              <span>Overall average waste of <strong>{avgWaste}%</strong> across all demo items suggests room for preparation quantity review.</span>
            </li>
          </ul>
          <p className="text-xs text-eco-600 mt-4">
            These observations are based on demo data only. In a real setting, patterns should be tracked over multiple days before drawing conclusions.
          </p>
        </div>

      </div>
    </div>
  )
}
