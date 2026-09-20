import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'
import Advisor from './pages/Advisor'
import Dashboard from './pages/Dashboard'
import ResponsibleAI from './pages/ResponsibleAI'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/advisor" element={<Advisor />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/responsible-ai" element={<ResponsibleAI />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
