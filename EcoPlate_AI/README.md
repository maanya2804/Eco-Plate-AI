# 🌿 EcoPlate AI — Smart Food Waste Advisor

> An AI-assisted web application that helps institutional canteens understand food waste levels and explore practical ways to reduce avoidable waste.

![SDG 12](https://img.shields.io/badge/SDG%2012-Responsible%20Consumption-BF8B2E?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss)

---

## Overview

EcoPlate AI is a beginner-friendly academic prototype that demonstrates how artificial intelligence can support food waste reduction in a college or institutional canteen. Users can enter food waste data, receive AI-generated recommendations, ask questions to a conversational AI advisor, and explore a demo dashboard summarising waste patterns.

This project was built as a GitHub portfolio piece aligned with **UN Sustainable Development Goal 12 — Responsible Consumption and Production**.

> **Important:** This is an academic prototype only. It has not been validated in a real institutional setting and should not be used for compliance, reporting, or production purposes.

---

## Problem Statement

> *"How might we use AI to analyse food-waste information and provide recommendations so that institutional canteens can reduce avoidable food waste?"*

Canteens often prepare more food than is consumed, leading to avoidable waste. Without data, managers rely on intuition. EcoPlate AI demonstrates how a lightweight AI layer — applied to simple waste measurements — can surface actionable insights to support evidence-based decisions.

---

## SDG Alignment

| Goal | Target |
|------|--------|
| **SDG 12 — Responsible Consumption and Production** | Support target 12.3: halve per-capita global food waste by 2030 |

EcoPlate AI addresses this goal by making food waste visible and measurable at the canteen level, and by providing AI-assisted guidance on how to reduce it.

---

## Features

### 1. 🏠 Home Page
- Polished landing page with hero section, SDG badge, and problem statement
- Feature overview cards and "how it works" steps
- Direct links to all tools

### 2. 📊 Food Waste Analyzer
- Form to enter food item, prepared quantity, consumed quantity, and leftover quantity
- Calculates waste percentage: `(Leftover ÷ Prepared) × 100`
- Classifies severity as **Low** (0–10%), **Moderate** (10–25%), or **High** (>25%)
- Displays animated waste bar, stat cards, and severity badge
- Calls the backend to generate a short AI recommendation
- Quick-fill example buttons for fast testing

> Severity thresholds are prototype values for demonstration only — not official standards.

### 3. 🤖 AI Advisor
- Conversational chatbot interface
- Suggested question chips to get started quickly
- Maintains conversation history (last 10 turns sent to backend)
- Typing indicator, auto-scroll, auto-grow textarea, Enter-to-send
- Clearly labelled Demo Mode when no API key is configured

### 4. 📈 Dashboard
- Summary statistics: total prepared, consumed, leftover, average waste %, highest-waste item
- Colour-coded bar chart (green/amber/red by severity) using Recharts
- Donut pie chart showing consumed vs leftover proportion
- Data table sorted by waste percentage with severity badges
- All data clearly labelled as **DEMO DATA**

### 5. 🛡️ Responsible AI
- Covers Transparency, Privacy, Human Oversight, and Limitations
- Explains exactly how AI is used in each feature
- Lists what the tool does NOT do
- Guidance on using AI recommendations responsibly

---

## How AI is Used

EcoPlate AI uses a Large Language Model (LLM) through the OpenAI API in two places:

| Feature | How AI is used |
|---------|---------------|
| **Waste Analyzer** | Waste data (item, quantities, waste %, severity) is sent to the LLM. It returns a short, practical recommendation for canteen staff. |
| **AI Advisor** | User messages and conversation history are sent to the LLM. A system prompt restricts responses to food waste, sustainability, and responsible consumption topics. |

A backend **system prompt** controls AI behaviour:
- Stay focused on food waste and sustainability
- Keep responses concise (2–4 sentences)
- Do not invent statistics — acknowledge uncertainty
- Remind users that recommendations are suggestions for staff review

**Demo Mode** is used automatically when no API key is configured. Pre-written example responses are shown instead of live AI output, and a clear "Demo Mode" badge is displayed throughout the app.

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Routing | React Router DOM 6 |
| Charts | Recharts 2 |
| HTTP client | Axios |
| Backend | Node.js + Express 4 |
| AI provider | OpenAI API (gpt-4o-mini by default) |
| Environment | dotenv |

No database, Docker, Kubernetes, microservices, or complex ML pipelines are used. The stack is intentionally simple and beginner-friendly.

---

## Project Structure

```
EcoPlate_AI/
├── README.md
├── .gitignore
├── package.json              ← root convenience scripts
│
├── frontend/
│   ├── index.html
│   ├── vite.config.js        ← dev server + /api proxy to :3001
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx          ← React entry point
│       ├── App.jsx           ← Router + layout wrapper
│       ├── index.css         ← Tailwind imports + custom classes
│       ├── hooks/
│       │   └── useApiMode.js ← polls /api/health for demo mode
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── PageHeader.jsx
│       │   ├── DemoBadge.jsx
│       │   ├── SdgBadge.jsx
│       │   ├── StatCard.jsx
│       │   └── WasteSeverityBadge.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Analyzer.jsx
│           ├── Advisor.jsx
│           ├── Dashboard.jsx
│           └── ResponsibleAI.jsx
│
└── backend/
    ├── server.js             ← Express API server
    ├── demoResponses.js      ← pre-written demo responses
    ├── package.json
    ├── .env                  ← local secrets (gitignored)
    └── .env.example          ← template — copy to .env
```

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ecoplate-ai.git
cd ecoplate-ai
```

### 2. Install dependencies

```bash
# Install frontend dependencies
npm install --prefix frontend

# Install backend dependencies
npm install --prefix backend
```

Or use the root convenience script:

```bash
npm run install:all
```

---

## Environment Variables

The backend uses a `.env` file. Copy the example and edit it:

```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and fill in your values:

```env
PORT=3001

# OpenAI API key — get one at https://platform.openai.com/api-keys
# Leave blank to run in Demo Mode
OPENAI_API_KEY=

# Model to use (default: gpt-4o-mini — cheap and fast)
OPENAI_MODEL=gpt-4o-mini

# Force demo mode even if a key is present (true/false)
DEMO_MODE=false
```

> **No API key?** Leave `OPENAI_API_KEY` blank. The app runs fully in Demo Mode with pre-written example responses.

---

## How to Run

### Start the backend

```bash
cd backend
node server.js
```

Or with auto-restart on file changes (Node.js 18+):

```bash
node --watch server.js
```

The backend starts on **http://localhost:3001**. You will see:

```
🌿 EcoPlate AI Backend
   Port      : 3001
   AI Mode   : ⚠️  Demo Mode (no API key)
   Model     : gpt-4o-mini

✅ Server running at http://localhost:3001
```

### Start the frontend (separate terminal)

```bash
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

The Vite dev server proxies all `/api` requests to the backend automatically — no CORS configuration needed during development.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Returns server status and demo mode flag |
| `POST` | `/api/analyze` | Accepts waste data, returns AI recommendation |
| `POST` | `/api/chat` | Accepts message history, returns AI advisor response |

### Example: POST /api/analyze

**Request:**
```json
{
  "foodItem": "Rice",
  "prepared": 100,
  "consumed": 72,
  "leftover": 28,
  "wastePercent": 28,
  "wasteSeverity": "High"
}
```

**Response (Demo Mode):**
```json
{
  "recommendation": "This level of waste suggests a notable mismatch between supply and demand. Review historical patterns for this item and consider replacing it with higher-demand alternatives on lower-attendance days.",
  "demoMode": true
}
```

---

## Screenshots

> Add screenshots here after running the app locally.

| Page | Description |
|------|-------------|
| `screenshots/home.png` | Landing page with hero and feature cards |
| `screenshots/analyzer.png` | Waste Analyzer form and AI recommendation result |
| `screenshots/advisor.png` | AI Advisor chat interface |
| `screenshots/dashboard.png` | Dashboard with bar chart and data table |
| `screenshots/responsible-ai.png` | Responsible AI principles page |

---

## Responsible AI

EcoPlate AI was designed with four responsible AI principles:

| Principle | Summary |
|-----------|---------|
| **Transparency** | AI mode (Demo/Live) is always visible. Formulas and thresholds are documented. The system prompt is open in source code. |
| **Privacy** | No personal data is collected or stored. Waste data is not persisted. No cookies or tracking. |
| **Human Oversight** | All recommendations are clearly labelled as suggestions for staff review. The AI does not make autonomous decisions. |
| **Limitations** | The tool is an academic prototype. AI responses may be incomplete. Demo data is not real. Thresholds are illustrative only. |

---

## Limitations

- Academic prototype only — not validated in a real institution
- AI recommendations may not reflect local context, cultural preferences, or seasonal variation
- Waste severity thresholds are illustrative and not based on published standards
- Demo Mode uses pre-written responses, not a live AI model
- No data persistence — entries are not saved between sessions
- A single day of data is insufficient to draw reliable conclusions

---

## Future Improvements

These are potential directions for a more mature version of this project:

- **Data persistence** — store waste entries in a database to track trends over time
- **Multi-day analysis** — chart waste patterns across a week or month
- **Export to CSV** — allow canteen managers to download their data
- **User authentication** — support multiple canteens with separate data
- **Improved AI context** — pass historical data to the LLM for richer recommendations
- **Offline support** — local AI models (e.g. Ollama) for fully offline deployments
- **Accessibility audit** — full WCAG 2.1 AA compliance review with assistive technologies

---

## Acknowledgements

- [United Nations SDG 12](https://sdgs.un.org/goals/goal12) — Responsible Consumption and Production
- [OpenAI](https://platform.openai.com/) — LLM API
- [Recharts](https://recharts.org/) — charting library
- [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS framework
- [Vite](https://vitejs.dev/) — frontend build tool

---

## Licence

MIT — free to use, modify, and distribute for academic and personal projects.

---

*EcoPlate AI — Academic Prototype · SDG 12 · Not for production use*
