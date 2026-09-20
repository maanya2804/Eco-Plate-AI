import { useState } from 'react'
import axios from 'axios'
import PageHeader from '../components/PageHeader'
import DemoBadge from '../components/DemoBadge'
import WasteSeverityBadge, { getSeverity, getSeverityColors } from '../components/WasteSeverityBadge'
import StatCard from '../components/StatCard'

const INITIAL_FORM = {
  foodItem: '',
  prepared: '',
  consumed: '',
  leftover: '',
}

const EXAMPLE_ITEMS = ['Rice', 'Pasta', 'Chicken Curry', 'Mixed Vegetables', 'Soup', 'Bread Rolls']

export default function Analyzer() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)

  // ── Validation ──────────────────────────────────
  function validate() {
    const e = {}
    if (!form.foodItem.trim()) e.foodItem = 'Food item name is required.'
    const p = parseFloat(form.prepared)
    const c = parseFloat(form.consumed)
    const l = parseFloat(form.leftover)
    if (isNaN(p) || p <= 0) e.prepared = 'Enter a positive number.'
    if (isNaN(c) || c < 0) e.consumed = 'Enter a non-negative number.'
    if (isNaN(l) || l < 0) e.leftover = 'Enter a non-negative number.'
    if (!isNaN(p) && !isNaN(c) && !isNaN(l)) {
      if (c + l > p + 0.001) e.consumed = 'Consumed + leftover cannot exceed prepared quantity.'
    }
    return e
  }

  // ── Handle input ─────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  function fillExample(item) {
    // Randomise plausible demo values
    const prepared = Math.floor(Math.random() * 60 + 60)
    const consumed  = Math.floor(prepared * (Math.random() * 0.4 + 0.5))
    const leftover  = prepared - consumed
    setForm({ foodItem: item, prepared: String(prepared), consumed: String(consumed), leftover: String(leftover) })
    setErrors({})
    setResult(null)
  }

  // ── Submit ───────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    const prepared     = parseFloat(form.prepared)
    const consumed     = parseFloat(form.consumed)
    const leftover     = parseFloat(form.leftover)
    const wastePercent = (leftover / prepared) * 100
    const wasteSeverity = getSeverity(wastePercent)

    setLoading(true)
    setApiError(null)
    setResult(null)

    try {
      const { data } = await axios.post('/api/analyze', {
        foodItem:    form.foodItem.trim(),
        prepared,
        consumed,
        leftover,
        wastePercent,
        wasteSeverity,
      })
      setResult({ prepared, consumed, leftover, wastePercent, wasteSeverity, ...data })
    } catch (err) {
      setApiError('Could not reach the backend. Make sure the server is running on port 3001.')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setForm(INITIAL_FORM)
    setErrors({})
    setResult(null)
    setApiError(null)
  }

  const colors = result ? getSeverityColors(result.wasteSeverity) : null

  return (
    <div>
      <PageHeader
        icon="📊"
        title="Food Waste Analyzer"
        subtitle="Enter the quantities for a food item to calculate waste and receive an AI recommendation."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── Left: Form ───────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="section-title mb-1">Enter waste data</h2>
              <p className="text-sm text-gray-500 mb-6">
                All quantities should use the same unit (e.g. portions, kg, or litres).
              </p>

              {/* Quick-fill examples */}
              <div className="mb-5">
                <p className="label">Quick-fill example</p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_ITEMS.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => fillExample(item)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-eco-50 text-eco-700 hover:bg-eco-100 border border-eco-200 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Food item */}
                <div>
                  <label htmlFor="foodItem" className="label">Food item *</label>
                  <input
                    id="foodItem"
                    name="foodItem"
                    type="text"
                    placeholder="e.g. Rice, Chicken Curry"
                    value={form.foodItem}
                    onChange={handleChange}
                    className={`input-field ${errors.foodItem ? 'border-red-400 ring-1 ring-red-300' : ''}`}
                  />
                  {errors.foodItem && <p className="text-red-500 text-xs mt-1">{errors.foodItem}</p>}
                </div>

                {/* Prepared */}
                <div>
                  <label htmlFor="prepared" className="label">Quantity prepared *</label>
                  <input
                    id="prepared"
                    name="prepared"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 100"
                    value={form.prepared}
                    onChange={handleChange}
                    className={`input-field ${errors.prepared ? 'border-red-400 ring-1 ring-red-300' : ''}`}
                  />
                  {errors.prepared && <p className="text-red-500 text-xs mt-1">{errors.prepared}</p>}
                </div>

                {/* Consumed */}
                <div>
                  <label htmlFor="consumed" className="label">Quantity consumed *</label>
                  <input
                    id="consumed"
                    name="consumed"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 72"
                    value={form.consumed}
                    onChange={handleChange}
                    className={`input-field ${errors.consumed ? 'border-red-400 ring-1 ring-red-300' : ''}`}
                  />
                  {errors.consumed && <p className="text-red-500 text-xs mt-1">{errors.consumed}</p>}
                </div>

                {/* Leftover */}
                <div>
                  <label htmlFor="leftover" className="label">Leftover quantity *</label>
                  <input
                    id="leftover"
                    name="leftover"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 28"
                    value={form.leftover}
                    onChange={handleChange}
                    className={`input-field ${errors.leftover ? 'border-red-400 ring-1 ring-red-300' : ''}`}
                  />
                  {errors.leftover && <p className="text-red-500 text-xs mt-1">{errors.leftover}</p>}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex-1 justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Analysing…
                      </>
                    ) : (
                      '📊 Analyse Waste'
                    )}
                  </button>
                  {result && (
                    <button type="button" onClick={handleReset} className="btn-secondary px-4">
                      Reset
                    </button>
                  )}
                </div>
              </form>

              {apiError && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                  ⚠️ {apiError}
                </div>
              )}
            </div>

            {/* Formula note */}
            <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600">
              <p className="font-semibold text-gray-700 mb-1">Waste % formula</p>
              <code className="text-eco-700 font-mono text-sm">
                (Leftover ÷ Prepared) × 100
              </code>
              <p className="mt-2 text-xs text-gray-400">
                Severity thresholds: 0–10% = Low · 10–25% = Moderate · &gt;25% = High.
                These are prototype values for demonstration purposes only.
              </p>
            </div>
          </div>

          {/* ── Right: Results ───────────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            {!result && !loading && (
              <div className="card flex flex-col items-center justify-center py-20 text-center text-gray-400">
                <div className="text-5xl mb-4">🍽️</div>
                <p className="text-lg font-medium text-gray-500">Results will appear here</p>
                <p className="text-sm mt-2 max-w-xs">
                  Fill in the form and click "Analyse Waste" to see your waste breakdown and AI recommendation.
                </p>
              </div>
            )}

            {loading && (
              <div className="card flex flex-col items-center justify-center py-20 text-center">
                <div className="w-12 h-12 border-4 border-eco-200 border-t-eco-600 rounded-full animate-spin mb-4" />
                <p className="text-gray-600 font-medium">Analysing waste data…</p>
                <p className="text-gray-400 text-sm mt-1">Asking AI for a recommendation</p>
              </div>
            )}

            {result && (
              <div className="animate-fade-in-up space-y-5">

                {/* Demo/AI mode indicator */}
                <div className="flex items-center gap-2">
                  {result.demoMode
                    ? <DemoBadge />
                    : <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-eco-100 text-eco-700 border border-eco-200">✅ Live AI</span>
                  }
                  {result.fallback && (
                    <span className="text-xs text-amber-600">AI unavailable — showing demo response</span>
                  )}
                </div>

                {/* Waste percentage hero */}
                <div className={`card border-2 ${colors.border}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Food item</p>
                      <p className="text-xl font-bold text-gray-900">{form.foodItem}</p>
                    </div>
                    <WasteSeverityBadge severity={result.wasteSeverity} size="lg" />
                  </div>

                  {/* Waste % big display */}
                  <div className="text-center py-4">
                    <p className={`text-7xl font-extrabold ${colors.text}`}>
                      {result.wastePercent.toFixed(1)}%
                    </p>
                    <p className="text-gray-500 text-sm mt-2">waste percentage</p>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2">
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-700 ${colors.bar}`}
                        style={{ width: `${Math.min(result.wastePercent, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0% (Low)</span>
                      <span>10%</span>
                      <span>25%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  <StatCard icon="🍳" label="Prepared" value={result.prepared} accent="blue" />
                  <StatCard icon="✅" label="Consumed" value={result.consumed} accent="green" />
                  <StatCard icon="♻️" label="Leftover" value={result.leftover} accent={result.wasteSeverity === 'Low' ? 'green' : result.wasteSeverity === 'Moderate' ? 'amber' : 'red'} />
                </div>

                {/* AI Recommendation */}
                <div className={`card border ${colors.border} ${colors.bg}`}>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl shrink-0">🤖</div>
                    <div>
                      <p className={`font-bold text-base mb-2 ${colors.text}`}>
                        AI Recommendation
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {result.recommendation}
                      </p>
                      <p className="text-xs text-gray-400 mt-3 pt-3 border-t border-gray-200">
                        ⚠️ This recommendation is a suggestion generated by AI. It should be reviewed
                        by canteen staff with knowledge of local context before any operational changes are made.
                        AI does not guarantee waste reduction.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Severity guide */}
                <div className="card">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Severity thresholds (prototype)</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Low', range: '0 – 10%', color: 'bg-eco-500' },
                      { label: 'Moderate', range: '10 – 25%', color: 'bg-amber-500' },
                      { label: 'High', range: 'Above 25%', color: 'bg-red-500' },
                    ].map(({ label, range, color }) => (
                      <div key={label} className="flex items-center gap-3 text-sm">
                        <span className={`w-3 h-3 rounded-full ${color} shrink-0`} />
                        <span className="font-medium text-gray-700 w-20">{label}</span>
                        <span className="text-gray-500">{range}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    These thresholds are defined for this prototype only and are not official standards.
                  </p>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
