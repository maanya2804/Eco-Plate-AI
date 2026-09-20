import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-eco-600 flex items-center justify-center text-white">
                🌿
              </div>
              <span className="text-white font-bold">EcoPlate AI</span>
            </div>
            <p className="text-sm leading-relaxed">
              An academic prototype demonstrating AI-assisted food waste analysis for institutional canteens.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/analyzer" className="hover:text-white transition-colors">Waste Analyzer</Link></li>
              <li><Link to="/advisor" className="hover:text-white transition-colors">AI Advisor</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/responsible-ai" className="hover:text-white transition-colors">Responsible AI</Link></li>
            </ul>
          </div>

          {/* SDG */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">SDG Alignment</h3>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
              style={{ backgroundColor: '#78350F', color: '#FDE68A', border: '1px solid #92400E' }}
            >
              <span className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">12</span>
              Responsible Consumption
            </div>
            <p className="text-xs mt-3 leading-relaxed">
              This project supports SDG 12 — Responsible Consumption and Production by helping reduce avoidable food waste.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} EcoPlate AI — Academic Prototype. Not for production use.</p>
          <p className="text-gray-600">
            AI recommendations are suggestions only. Always review with canteen staff.
          </p>
        </div>
      </div>
    </footer>
  )
}
