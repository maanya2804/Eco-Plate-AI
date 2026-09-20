import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { getDemoRecommendation, getDemoChatResponse } from './demoResponses.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

// ─── Middleware ───────────────────────────────────
app.use(cors())
app.use(express.json())

// ─── Serve React frontend build ───────────────────
const frontendDist = path.join(__dirname, '../frontend/dist')
app.use(express.static(frontendDist))

// ─── Provider detection ───────────────────────────
// Supports: Groq (free) or OpenAI (paid)
// Priority: GROQ_API_KEY → OPENAI_API_KEY → Demo Mode
const groqKey   = process.env.GROQ_API_KEY?.trim()
const openaiKey = process.env.OPENAI_API_KEY?.trim()

const hasApiKey    = Boolean(groqKey || openaiKey)
const forceDemoMode = process.env.DEMO_MODE === 'true'
const isDemoMode   = forceDemoMode || !hasApiKey

const provider = groqKey ? 'Groq' : openaiKey ? 'OpenAI' : 'Demo'

// Model defaults per provider
const DEFAULT_MODELS = {
  Groq:   'openai/gpt-oss-20b',
  OpenAI: 'gpt-4o-mini',
  Demo:   'none',
}
const activeModel = process.env.AI_MODEL || DEFAULT_MODELS[provider]

console.log(`\n🌿 EcoPlate AI Backend`)
console.log(`   Port      : ${PORT}`)
console.log(`   Provider  : ${provider}`)
console.log(`   AI Mode   : ${isDemoMode ? '⚠️  Demo Mode (no API key)' : `✅  Live AI (${provider})`}`)
console.log(`   Model     : ${activeModel}\n`)

// ─── Lazy-load AI client ──────────────────────────
let aiClient = null
async function getAIClient() {
  if (aiClient) return aiClient
  const { default: OpenAI } = await import('openai')

  if (groqKey) {
    // Groq uses OpenAI-compatible API
    aiClient = new OpenAI({
      apiKey:  groqKey,
      baseURL: 'https://api.groq.com/openai/v1',
    })
  } else {
    aiClient = new OpenAI({ apiKey: openaiKey })
  }
  return aiClient
}

// ─── System prompt for AI ─────────────────────────
const SYSTEM_PROMPT = `You are EcoPlate AI, a helpful food waste advisor for institutional canteens.

Your role is to:
- Provide practical, evidence-based recommendations to reduce food waste
- Answer questions about sustainable food practices, responsible consumption, and SDG 12
- Help canteen managers understand waste data and how to act on it

Rules:
- Keep responses concise (2–4 sentences unless more detail is clearly needed)
- Do NOT invent statistics or cite specific percentages unless they are well-established facts
- If you are unsure about something, say so honestly
- Stay focused on food waste, sustainability, and canteen management
- Do not provide personal, medical, financial, or legal advice
- Remind users that your recommendations are suggestions to be reviewed by canteen staff`

// ─── Health check ─────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    demoMode: isDemoMode,
    timestamp: new Date().toISOString(),
  })
})

// ─── POST /api/analyze ────────────────────────────
// Accepts waste data, returns AI recommendation
app.post('/api/analyze', async (req, res) => {
  const { foodItem, prepared, consumed, leftover, wastePercent, wasteSeverity } = req.body

  if (!foodItem || prepared == null || consumed == null || leftover == null) {
    return res.status(400).json({ error: 'Missing required fields: foodItem, prepared, consumed, leftover' })
  }

  // Demo mode
  if (isDemoMode) {
    const recommendation = getDemoRecommendation(wastePercent, foodItem)
    return res.json({
      recommendation,
      demoMode: true,
    })
  }

  // Live AI
  try {
    const client = await getAIClient()
    const userPrompt = `Food item: ${foodItem}
Quantity prepared: ${prepared}
Quantity consumed: ${consumed}
Leftover quantity: ${leftover}
Waste percentage: ${wastePercent.toFixed(1)}%
Waste severity: ${wasteSeverity}

Please provide a short, practical recommendation for a canteen manager to address this waste level. Keep it to 2–3 sentences.`

    const completion = await client.chat.completions.create({
      model: activeModel,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 200,
      temperature: 0.7,
    })

    const recommendation = completion.choices[0]?.message?.content?.trim() || 'No recommendation generated.'
    res.json({ recommendation, demoMode: false })
  } catch (error) {
    console.error('AI error (analyze):', error.message)
    // Graceful fallback to demo
    const recommendation = getDemoRecommendation(wastePercent, foodItem)
    res.json({
      recommendation,
      demoMode: true,
      fallback: true,
      error: 'AI service unavailable — showing demo recommendation.',
    })
  }
})

// ─── POST /api/chat ───────────────────────────────
// Conversational AI advisor
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' })
  }

  const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content || ''

  // Demo mode
  if (isDemoMode) {
    const response = getDemoChatResponse(lastUserMessage)
    return res.json({ response, demoMode: true })
  }

  // Live AI
  try {
    const client = await getAIClient()
    const completion = await client.chat.completions.create({
      model: activeModel,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.slice(-10),
      ],
      max_tokens: 400,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content?.trim() || 'No response generated.'
    res.json({ response, demoMode: false })
  } catch (error) {
    console.error('AI error (chat):', error.message)
    const response = getDemoChatResponse(lastUserMessage)
    res.json({
      response,
      demoMode: true,
      fallback: true,
      error: 'AI service unavailable — showing demo response.',
    })
  }
})

// ─── Catch-all: send React app for any non-API route ─
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'))
})

// ─── Start ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
