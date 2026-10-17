// WHAT: Query normalization, alias expansion, and input sanitization.
// WHY : Defends against prompt injection, normalizes heterogeneous user phrasing,
//       and resolves conversational references (e.g., "tell me more about it") using context.
// TRADEOFF: Alias expansion uses a deterministic dictionary rather than an embedding model,
//           ensuring 0ms latency, zero API costs, and 100% predictable keyword enrichment.

const ALIAS_MAP: Record<string, string> = {
  rag: "rag retrieval augmented generation",
  mcp: "mcp model context protocol codescope",
  codescope: "codescope mcp preflight tree-sitter",
  payguard: "payguard-ai whatsapp transaction verification stripe",
  sentinel: "sentineliq anomaly detection tcn lstm",
  sentineliq: "sentineliq anomaly detection predictive maintenance",
  adaptiq: "adaptiq forecastai sales forecasting prophet",
  carevision: "carevision fall detection computer vision pose",
  topolite: "topolite topological anomaly detection tda",
  "vital-link": "vital-link emergency dispatch optimization pulp",
  evershine: "evershine full-stack client product",
  "lead gen": "ai lead generation workflow n8n",
  leadgen: "ai lead generation workflow n8n",
  restaurant: "ai-restaurant-chatbot whatsapp ordering",
  chatbot: "ai-restaurant-chatbot conversational agent",
  forecasting: "forecasting adaptiq prophet sarima xgboost lstm",
  forecast: "forecasting adaptiq prophet sarima xgboost lstm",
  "anomaly detection": "anomaly detection sentineliq topolite",
  n8n: "n8n workflow automation payguard lead generation",
  whatsapp: "whatsapp baileys automation payguard restaurant",
  cv: "resume credentials experience profile",
  resume: "resume credentials experience profile",
  certificate: "certificate certification anthropic credentials",
  certifications: "certifications credentials anthropic",
  contact: "contact hire email reach out services",
  hire: "hire contract services consulting freelance",
  pricing: "services consulting freelance rates",
  experience: "experience career soft-shack fiverr roles",
  github: "github repositories open-source code",
  recent: "recent latest completed projects payguard-ai codescope carevision sentineliq adaptiq",
  latest: "latest recent completed projects payguard-ai codescope carevision sentineliq adaptiq",
  newest: "newest latest recent completed projects payguard-ai codescope carevision sentineliq adaptiq",
  completed: "completed production delivered projects payguard-ai codescope carevision sentineliq adaptiq",
  "recent project": "recent latest completed projects payguard-ai codescope carevision sentineliq adaptiq",
  "recent projects": "recent latest completed projects payguard-ai codescope carevision sentineliq adaptiq",
  "latest project": "latest recent completed projects payguard-ai codescope carevision sentineliq adaptiq",
  "latest projects": "latest recent completed projects payguard-ai codescope carevision sentineliq adaptiq",
  "completed project": "completed production delivered projects payguard-ai codescope carevision sentineliq adaptiq",
  "completed projects": "completed production delivered projects payguard-ai codescope carevision sentineliq adaptiq"
}

// Patterns commonly associated with prompt injection attempts
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/gi,
  /you\s+are\s+now\s+a/gi,
  /system\s*:/gi,
  /assistant\s*:/gi,
  /override\s+system\s+prompt/gi,
  /jailbreak/gi,
  /reveal\s+(your\s+)?(system\s+)?prompt/gi
]

/**
 * Sanitizes raw user input by stripping injection markers, boundary breakouts, null bytes,
 * and zero-width/non-printable evasion characters with multi-pass recursive neutralization.
 */
export function sanitizeUserInput(input: string): string {
  if (!input || typeof input !== "string") {
    return ""
  }

  // Strip null bytes, control characters, and zero-width/bidi markers used for evasion
  let cleaned = input
    .replace(/\0/g, "")
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200D\uFEFF]/g, "")

  // Neutralize XML boundary breakout tags before interpolation into prompt
  cleaned = cleaned.replace(/<\/?(?:portfolio_evidence|system|instructions?)[^>]*>/gi, "")

  // Multi-pass recursive replacement to prevent nested token reassembly
  let previous = ""
  let passes = 0
  while (cleaned !== previous && passes < 3) {
    previous = cleaned
    passes++
    for (const pattern of INJECTION_PATTERNS) {
      cleaned = cleaned.replace(pattern, "[removed]")
    }
  }

  return cleaned.trim().slice(0, 10000)
}

/**
 * Normalizes text by lowercasing and standardizing whitespace.
 */
export function normalizeQuery(query: string): string {
  return query
    .toLowerCase()
    .replace(/[^\w\s\-\+\.]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

/**
 * Expands known domain terminology and project nicknames into rich search tokens.
 */
export function expandAliases(query: string): string {
  const normalized = normalizeQuery(query)
  let expanded = normalized

  for (const [key, expansion] of Object.entries(ALIAS_MAP)) {
    const regex = new RegExp(`\\b${key}\\b`, "i")
    if (regex.test(normalized)) {
      expanded += ` ${expansion}`
    }
  }

  return expanded.trim()
}

/**
 * Resolves pronoun/anaphoric context using recent conversation history when present.
 */
export function buildRetrievalQuery(
  currentQuery: string,
  history?: { role: "user" | "assistant"; content: string }[]
): string {
  const sanitized = sanitizeUserInput(currentQuery)
  let queryText = expandAliases(sanitized)

  // If visitor asks a short context-dependent follow-up (e.g. "how does it work?", "what models did you use?")
  const isAnaphoric =
    /\b(it|this|that|project|system|model|them)\b/i.test(sanitized) &&
    sanitized.split(" ").length <= 8

  if (isAnaphoric && history && history.length > 0) {
    // Look at last user turn to extract entity context
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].role === "user") {
        const lastUserTurn = history[i].content
        const expandedPrior = expandAliases(lastUserTurn)
        queryText = `${queryText} ${expandedPrior}`
        break
      }
    }
  }

  return queryText
}
