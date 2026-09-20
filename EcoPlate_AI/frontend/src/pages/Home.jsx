import { Link } from 'react-router-dom'
import SdgBadge from '../components/SdgBadge'

const FEATURES = [
  {
    icon: '📊',
    title: 'Waste Analyzer',
    description:
      'Enter food item quantities to calculate your waste percentage and receive an AI-generated recommendation.',
    to: '/analyzer',
    cta: 'Try Analyzer',
    accent: 'eco',
  },
  {
    icon: '🤖',
    title: 'AI Advisor',
    description:
      'Ask questions about food waste, demand estimation, and sustainable canteen practices in a simple chat interface.',
    to: '/advisor',
    cta: 'Ask AI Advisor',
    accent: 'blue',
  },
  {
    icon: '📈',
    title: 'Dashboard',
    description:
      'View a summary of demo waste data across food items, including charts and key metrics.',
    to: '/dashboard',
    cta: 'View Dashboard',
    accent: 'purple',
  },
  {
    icon: '🛡️',
    title: 'Responsible AI',
    description:
      'Learn how this tool uses AI responsibly — covering transparency, privacy, and human oversight.',
    to: '/responsible-ai',
    cta: 'Learn More',
    accent: 'amber',
  },
]

const STATS = [
  { value: '~1/3', label: 'of all food produced globally is wasted', source: 'UN FAO estimate' },
  { value: 'SDG 12', label: 'targets halving per-capita food waste by 2030', source: 'UN Agenda 2030' },
  { value: 'Canteens', label: 'are a key site for measurable, actionable waste reduction', source: 'Context' },
]

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Enter waste data',
    description: 'Input the food item, quantity prepared, and quantity consumed for a meal.',
  },
  {
    step: '2',
    title: 'AI analyses the gap',
    description: 'The backend calculates waste percentage and asks an LLM for a contextual recommendation.',
  },
  {
    step: '3',
    title: 'Review and act',
    description: 'Canteen staff review the AI suggestion alongside their own knowledge before making decisions.',
  },
]

export default function Home() {
  return (
    <div className="animate-fade-in-up">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-eco-800 via-eco-700 to-eco-600 text-white">
        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            {/* SDG badge */}
            <div className="mb-6">
              <SdgBadge size="md" />
            </div>

            {/* Headline */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-4xl shrink-0 shadow-lg">
                🌿
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                  EcoPlate AI
                </h1>
                <p className="text-eco-200 text-lg font-medium">Smart Food Waste Advisor</p>
              </div>
            </div>

            <p className="text-eco-100 text-xl leading-relaxed mt-6 max-w-2xl">
              An AI-assisted prototype that helps institutional canteens understand food waste levels
              and explore practical ways to reduce avoidable waste.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/analyzer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-eco-700 font-bold rounded-xl hover:bg-eco-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-base"
              >
                📊 Try Waste Analyzer
              </Link>
              <Link
                to="/advisor"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-eco-500/30 hover:bg-eco-500/50 text-white font-bold rounded-xl border-2 border-white/30 hover:border-white/50 transition-all duration-200 active:scale-95 text-base"
              >
                🤖 Ask AI Advisor
              </Link>
            </div>

            {/* Disclaimer */}
            <p className="mt-6 text-eco-200 text-sm">
              Academic prototype · Demo Mode available · No personal data collected
            </p>
          </div>
        </div>
      </section>

      {/* ── Problem statement ────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4 border border-red-100">
              The Problem
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Canteens prepare more than they can serve
            </h2>
            <blockquote className="text-lg text-gray-600 leading-relaxed italic border-l-4 border-eco-400 pl-5 text-left mt-6">
              "How might we use AI to analyse food-waste information and provide recommendations so that
              institutional canteens can reduce avoidable food waste?"
            </blockquote>
            <p className="mt-6 text-gray-500 text-base leading-relaxed">
              Without data, canteen managers must rely on intuition. This tool demonstrates how a simple AI
              layer — applied to waste measurements — can surface actionable insights and support
              evidence-based decisions.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <section className="bg-eco-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-children">
            {STATS.map(({ value, label, source }) => (
              <div key={value} className="text-center px-4">
                <p className="text-4xl font-extrabold text-white mb-2">{value}</p>
                <p className="text-eco-100 text-base">{label}</p>
                <p className="text-eco-300 text-xs mt-1">{source}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-eco-300 text-xs mt-6">
            Note: Statistics are general context from public sources and are not verified institutional data.
          </p>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────── */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What EcoPlate AI offers</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Four simple tools designed to make food waste more visible and actionable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
            {FEATURES.map(({ icon, title, description, to, cta }) => (
              <div
                key={title}
                className="card flex flex-col hover:shadow-md transition-shadow duration-200"
              >
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{description}</p>
                <Link
                  to={to}
                  className="mt-5 inline-flex items-center gap-1.5 text-eco-600 hover:text-eco-700 text-sm font-semibold group"
                >
                  {cta}
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Three simple steps from data entry to AI-assisted insight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 stagger-children">
            {HOW_IT_WORKS.map(({ step, title, description }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-eco-600 text-white font-extrabold text-xl flex items-center justify-center mb-4 shadow-md">
                  {step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SDG alignment ────────────────────────────── */}
      <section className="bg-gradient-to-r from-amber-50 to-yellow-50 border-y border-amber-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div
              className="w-24 h-24 rounded-2xl flex items-center justify-center text-white font-extrabold text-3xl shrink-0 shadow-lg"
              style={{ backgroundColor: '#BF8B2E' }}
            >
              12
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                SDG 12 — Responsible Consumption and Production
              </h2>
              <p className="text-gray-600 leading-relaxed max-w-2xl">
                EcoPlate AI is designed in support of SDG 12, which calls for sustainable management
                and efficient use of natural resources, and the halving of per-capita food waste by 2030.
                By making waste data visible and actionable at the canteen level, this tool illustrates
                how technology can support that goal.
              </p>
              <p className="text-xs text-gray-400 mt-3">
                This is an academic prototype. It does not represent official SDG measurement or reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────── */}
      <section className="bg-eco-600 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to explore?</h2>
          <p className="text-eco-100 text-lg mb-8">
            Start with the Waste Analyzer to see how AI recommendations are generated, or ask the AI
            Advisor a question about sustainable canteen practices.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/analyzer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-eco-700 font-bold rounded-xl hover:bg-eco-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
            >
              📊 Try Waste Analyzer
            </Link>
            <Link
              to="/advisor"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-eco-500 hover:bg-eco-400 text-white font-bold rounded-xl border-2 border-white/30 hover:border-white/50 transition-all duration-200 active:scale-95"
            >
              🤖 Ask AI Advisor
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
