import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import DemoBadge from './DemoBadge'
import { useApiMode } from '../hooks/useApiMode'

const NAV_LINKS = [
  { to: '/',              label: 'Home' },
  { to: '/analyzer',     label: 'Waste Analyzer' },
  { to: '/advisor',      label: 'AI Advisor' },
  { to: '/dashboard',    label: 'Dashboard' },
  { to: '/responsible-ai', label: 'Responsible AI' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { demoMode } = useApiMode()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            onClick={() => setMenuOpen(false)}
          >
            <div className="w-9 h-9 rounded-xl bg-eco-600 flex items-center justify-center text-white text-lg shadow-sm group-hover:bg-eco-700 transition-colors">
              🌿
            </div>
            <div className="leading-tight">
              <span className="block text-base font-bold text-gray-900">EcoPlate AI</span>
              <span className="block text-[10px] text-eco-600 font-medium -mt-0.5">Smart Food Waste Advisor</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-eco-50 text-eco-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {demoMode && <DemoBadge className="hidden sm:inline-flex" />}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100 pt-3 space-y-1">
            {demoMode && <div className="px-3 pb-2"><DemoBadge /></div>}
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-eco-50 text-eco-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
