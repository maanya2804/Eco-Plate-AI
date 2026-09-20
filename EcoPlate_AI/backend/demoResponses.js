// ─────────────────────────────────────────────────
// Demo Mode responses — used when no API key is set
// These are illustrative examples, not real AI output
// ─────────────────────────────────────────────────

export const demoRecommendations = {
  low: [
    "Great work — waste is low for this item. Continue monitoring portion sizes and review preparation quantities weekly to maintain this level.",
    "Waste is within an acceptable range. Consider logging daily consumption patterns over two weeks to build a reliable demand baseline.",
    "Low waste detected. Keep tracking this item and share best practices with kitchen staff to replicate this across other food items.",
  ],
  moderate: [
    "Moderate waste detected. Consider preparing slightly smaller batches and assessing whether serving times affect consumption. Review this item's data over several days before making changes.",
    "This item shows moderate waste. It may help to survey students about portion preferences or adjust serving schedules during low-attendance periods.",
    "Moderate leftover levels suggest misalignment between preparation and demand. A trial reduction of 10–15% in preparation quantity may be worth testing over one week.",
  ],
  high: [
    "High waste detected. This item warrants close attention. Consider a short-term trial with reduced preparation quantities, and consult canteen staff before making permanent changes.",
    "Significant waste for this item. Review whether it is served at the right time, in the right portion size, and whether student demand has shifted. Data over multiple days is needed before firm conclusions.",
    "This level of waste suggests a notable mismatch between supply and demand. Review historical patterns for this item and consider replacing it with higher-demand alternatives on lower-attendance days.",
  ],
}

export function getDemoRecommendation(wastePercent, foodItem) {
  let pool
  if (wastePercent <= 10) pool = demoRecommendations.low
  else if (wastePercent <= 25) pool = demoRecommendations.moderate
  else pool = demoRecommendations.high

  // Pick deterministically based on food item name so same item gives same response
  const index = (foodItem.length + Math.floor(wastePercent)) % pool.length
  return pool[index]
}

export const demoChatResponses = [
  {
    keywords: ['reduce', 'food waste', 'college', 'university', 'canteen'],
    response:
      "Reducing food waste in a college canteen typically involves a few practical steps: tracking daily waste by food item, adjusting preparation quantities based on attendance patterns, and educating kitchen staff about portion control. Regularly reviewing data helps identify which items are consistently wasted so that preparation schedules can be refined.",
  },
  {
    keywords: ['monitor', 'track', 'measure'],
    response:
      "Useful metrics to monitor include daily prepared quantity, consumed quantity, leftover quantity, and waste percentage per item. Tracking these over time reveals patterns — for example, waste may be higher on certain days of the week or around exam periods. A simple spreadsheet or this tool can support that tracking.",
  },
  {
    keywords: ['leftover', 'leftovers'],
    response:
      "Tracking leftovers is useful because it provides concrete evidence of the gap between supply and demand. Without data, canteen managers must rely on guesswork. Even a few weeks of consistent recording can reveal whether waste is systematic or occasional, and which items are most affected.",
  },
  {
    keywords: ['demand', 'estimate', 'forecast', 'predict'],
    response:
      "Food demand can be estimated by looking at historical consumption records, student attendance patterns, day-of-week trends, and special events. Starting with a simple log of daily consumption per item is a good first step. More advanced approaches use statistical analysis, but a basic spreadsheet already offers significant insight for a canteen.",
  },
  {
    keywords: ['sdg', 'sustainable', 'sustainability', 'responsible'],
    response:
      "SDG 12 — Responsible Consumption and Production — encourages reducing waste across the food supply chain. For a canteen, this means planning purchases carefully, monitoring what is actually consumed, reducing overproduction, and considering donation or composting for unavoidable leftovers. Even small changes in preparation quantity can meaningfully reduce food waste over time.",
  },
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning'],
    response:
      "In this prototype, AI is used to generate contextual recommendations based on waste data you enter, and to answer questions about food waste and sustainability. It is important to understand that AI recommendations are suggestions — they should be reviewed by canteen staff who have operational context before any changes are made.",
  },
]

export function getDemoChatResponse(userMessage) {
  const lower = userMessage.toLowerCase()
  for (const item of demoChatResponses) {
    if (item.keywords.some((kw) => lower.includes(kw))) {
      return item.response
    }
  }
  return "That's a good question about food waste and sustainability. In this demo, I can answer questions about monitoring waste, estimating demand, responsible consumption practices, and how AI can support canteen management. Please try asking about one of those topics, or configure an API key for full AI responses."
}
