import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import PageHeader from '../components/PageHeader'
import DemoBadge from '../components/DemoBadge'
import { useApiMode } from '../hooks/useApiMode'

const SUGGESTED_QUESTIONS = [
  'How can a college canteen reduce food waste?',
  'What should we monitor to understand waste patterns?',
  'Why is tracking leftovers useful?',
  'How can food demand be estimated?',
  'What are responsible food consumption practices?',
  'How does this tool use AI?',
]

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    "Hello! I'm EcoPlate AI, your food waste advisor. I can help you explore strategies for reducing food waste in institutional canteens, discuss sustainable practices, and explain how data can support better decisions.\n\nTry one of the suggested questions below, or type your own.",
  id: 'welcome',
}

function ChatMessage({ message, isLatest }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} ${
        isLatest ? 'animate-fade-in-up' : ''
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5 ${
          isUser
            ? 'bg-eco-600 text-white'
            : 'bg-gradient-to-br from-eco-500 to-eco-700 text-white'
        }`}
      >
        {isUser ? '👤' : '🌿'}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? 'bg-eco-600 text-white rounded-tr-sm'
              : 'bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tl-sm'
          }`}
        >
          {message.content}
        </div>
        {message.demoMode !== undefined && (
          <span className="text-xs text-gray-400 px-1">
            {message.demoMode ? '⚠️ Demo response' : '✅ Live AI'}
          </span>
        )}
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-eco-500 to-eco-700 text-white flex items-center justify-center text-sm shrink-0">
        🌿
      </div>
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-sm px-4 py-3">
        <div className="flex gap-1.5 items-center h-5">
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

export default function Advisor() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const { demoMode } = useApiMode()

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text) {
    const userText = (text || input).trim()
    if (!userText || loading) return

    const userMsg = { role: 'user', content: userText, id: Date.now() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    setApiError(null)

    // Build conversation history (exclude welcome message id, keep role/content only)
    const history = [...messages, userMsg]
      .filter((m) => m.id !== 'welcome')
      .map(({ role, content }) => ({ role, content }))

    try {
      const { data } = await axios.post('/api/chat', { messages: history })
      const assistantMsg = {
        role: 'assistant',
        content: data.response,
        demoMode: data.demoMode,
        id: Date.now() + 1,
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch {
      setApiError('Could not reach the backend. Make sure the server is running on port 3001.')
      // Remove the user message if request totally failed
      setMessages((prev) => prev.filter((m) => m.id !== userMsg.id))
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function clearChat() {
    setMessages([WELCOME_MESSAGE])
    setApiError(null)
    inputRef.current?.focus()
  }

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <PageHeader
        icon="🤖"
        title="AI Advisor"
        subtitle="Ask questions about food waste, sustainability, and responsible canteen practices."
      >
        <div className="flex items-center gap-3">
          {demoMode ? (
            <DemoBadge />
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-eco-100/20 text-white border border-white/20">
              ✅ Live AI Connected
            </span>
          )}
        </div>
      </PageHeader>

      <div className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6">

        {/* Disclaimer banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-800">
          <span className="text-lg shrink-0">ℹ️</span>
          <p>
            EcoPlate AI provides general information about food waste and sustainability.
            Responses are AI-generated suggestions — not professional advice.
            Always consult canteen staff before making operational decisions.
            {demoMode && ' Running in Demo Mode — responses are pre-written examples, not live AI.'}
          </p>
        </div>

        {/* Suggested questions */}
        <div>
          <p className="text-sm font-medium text-gray-500 mb-3">Suggested questions</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-white border border-gray-200 text-gray-600 hover:border-eco-400 hover:text-eco-700 hover:bg-eco-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="flex-1 card p-0 overflow-hidden flex flex-col" style={{ minHeight: '400px' }}>
          {/* Chat header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-eco-500 animate-pulse" />
              <span className="text-sm font-medium text-gray-700">EcoPlate AI Advisor</span>
            </div>
            <button
              onClick={clearChat}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors px-2 py-1 rounded hover:bg-gray-100"
            >
              Clear chat
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            {messages.map((msg, idx) => (
              <ChatMessage
                key={msg.id || idx}
                message={msg}
                isLatest={idx === messages.length - 1 && msg.role === 'assistant'}
              />
            ))}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Error */}
          {apiError && (
            <div className="mx-5 mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              ⚠️ {apiError}
            </div>
          )}

          {/* Input */}
          <div className="px-5 py-4 border-t border-gray-100">
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                placeholder="Ask about food waste, sustainability, or canteen practices…"
                rows={1}
                className="flex-1 resize-none input-field py-3 min-h-[48px] max-h-36 disabled:opacity-60"
                style={{ lineHeight: '1.5' }}
                onInput={(e) => {
                  // Auto-grow textarea
                  e.target.style.height = 'auto'
                  e.target.style.height = Math.min(e.target.scrollHeight, 144) + 'px'
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="btn-primary px-4 py-3 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed self-end"
                aria-label="Send message"
              >
                {loading ? (
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* Scope note */}
        <div className="card bg-eco-50 border-eco-100">
          <h3 className="text-sm font-semibold text-eco-800 mb-2">What this advisor can help with</h3>
          <ul className="text-sm text-eco-700 space-y-1 list-disc list-inside">
            <li>Food waste reduction strategies for canteens</li>
            <li>What metrics and data to track</li>
            <li>Demand estimation approaches</li>
            <li>Responsible consumption practices (SDG 12)</li>
            <li>How AI is used in this prototype</li>
          </ul>
          <p className="text-xs text-eco-600 mt-3">
            This advisor will not invent statistics. If it doesn't know something, it will say so.
          </p>
        </div>

      </div>
    </div>
  )
}
