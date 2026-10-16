// WHAT: Intent detection, evidence gating, and deterministic zero-cost out-of-scope handling.
// WHY : Protects Groq free-tier quotas by short-circuiting unsupported, general trivia,
//       or non-portfolio queries in code, saving 100% of LLM credits and preventing hallucinations.
// TRADEOFF: Rule-based intent detection and early out-of-scope filtering provide sub-millisecond,
//           zero-latency heuristic matching without requiring continuous neural classifier APIs.

import type { Intent, SearchResult, EvidenceDecision, AgentResponse } from "./types"

const WEAK_EVIDENCE_THRESHOLD = 12.0

// Explicit out-of-scope signals (trivia, unrelated world knowledge, general homework, etc.)
const OUT_OF_SCOPE_PATTERNS: RegExp[] = [
  /\b(weather|forecast for tomorrow|temperature in)\b/i,
  /\b(capital of|who is the president|who was president|prime minister of)\b/i,
  /\b(world cup|fifa|olympics|super bowl|champions league|cricket score)\b/i,
  /\b(recipe for|how to bake|how to cook|ingredients for)\b/i,
  /\b(write a poem|write a song|write a story|tell me a joke)\b/i,
  /\b(bitcoin price|crypto price|stock market price|invest in)\b/i,
  /\b(horoscope|astrology|zodiac sign)\b/i,
  /\b(movie review|latest movies|box office|actor in)\b/i,
  /\b(solve this math|algebra equation|homework help|physics equation)\b/i,
  /\b(translate .* to (french|spanish|german|arabic|urdu|hindi|mandarin))\b/i,
  /\b(write a (python|javascript|c\+\+|java) script to (reverse|sort|find|calculate fibonacci))\b/i
]

// Explicit portfolio keywords that indicate the query is definitely about Ibadat or his work
const PORTFOLIO_ANCHORS = new Set([
  "ibadat", "ali", "orbi", "codescope", "payguard", "sentinel", "sentineliq",
  "adaptiq", "carevision", "topolite", "soft shack", "fiverr", "tree-sitter",
  "mcp", "n8n", "portfolio", "projects", "resume", "cv", "hire", "contact",
  "certifications", "anthropic", "experience", "services", "skills", "rate"
])

/**
 * Checks if a query is clearly out of domain (general world trivia, homework, unrelated coding requests)
 * so we can short-circuit before spending any Groq API tokens.
 */
export function isOutOfScope(query: string): boolean {
  const normalized = query.toLowerCase().trim()

  // If it mentions any specific portfolio anchor, it's NOT out of scope
  const words = normalized.split(/[^a-z0-9_-]+/).filter(Boolean)
  if (words.some((w) => PORTFOLIO_ANCHORS.has(w))) {
    return false
  }

  // Check pattern matches
  for (const pattern of OUT_OF_SCOPE_PATTERNS) {
    if (pattern.test(normalized)) {
      return true
    }
  }

  return false
}

/**
 * Categorizes the high-level intent of the user's message using deterministic keyword matching.
 */
export function detectIntent(query: string): Intent {
  const q = query.toLowerCase()

  if (
    q.includes("certificate") ||
    q.includes("credential") ||
    q.includes("certification") ||
    q.includes("certified")
  ) {
    return "credentials"
  }

  if (
    q.includes("experience") ||
    q.includes("worked at") ||
    q.includes("career") ||
    q.includes("employment") ||
    q.includes("role")
  ) {
    return "experience"
  }

  if (
    q.includes("contact") ||
    q.includes("hire") ||
    q.includes("email") ||
    q.includes("reach") ||
    q.includes("message") ||
    q.includes("consult") ||
    q.includes("call")
  ) {
    return "contact"
  }

  if (
    q.includes("compare") ||
    q.includes("difference") ||
    q.includes("versus") ||
    q.includes("vs")
  ) {
    return "comparison"
  }

  if (
    q.includes("skill") ||
    q.includes("technolog") ||
    q.includes("tools") ||
    q.includes("stack") ||
    q.includes("framework") ||
    q.includes("python") ||
    q.includes("docker") ||
    q.includes("fastapi")
  ) {
    return "skills"
  }

  if (
    q.includes("service") ||
    q.includes("offer") ||
    q.includes("can you build") ||
    q.includes("help with") ||
    q.includes("milestone") ||
    q.includes("handoff")
  ) {
    return "services"
  }

  if (
    q.includes("project") ||
    q.includes("built") ||
    q.includes("system") ||
    q.includes("agent") ||
    q.includes("portfolio") ||
    q.includes("codescope") ||
    q.includes("payguard") ||
    q.includes("sentinel") ||
    q.includes("adaptiq") ||
    q.includes("carevision") ||
    q.includes("topolite")
  ) {
    return "project"
  }

  return "general_portfolio"
}

/**
 * Evaluates whether retrieved search results contain sufficient score and density to justify an LLM call.
 */
export function checkEvidence(results: SearchResult[]): EvidenceDecision {
  if (results.length === 0) {
    return {
      allowed: false,
      reason: "no-results",
      results: []
    }
  }

  const topScore = results[0].score

  if (topScore < WEAK_EVIDENCE_THRESHOLD) {
    return {
      allowed: false,
      reason: "weak-results",
      results
    }
  }

  return {
    allowed: true,
    results
  }
}

const GREETING_KEYWORDS = new Set([
  "hi",
  "hello",
  "hey",
  "greetings",
  "howdy",
  "yo",
  "sup",
  "hola"
])

const SUBSTANTIVE_KEYWORDS = new Set([
  "project", "projects", "codescope", "payguard", "sentinel", "sentineliq",
  "adaptiq", "carevision", "topolite", "skills", "experience", "work",
  "contact", "hire", "n8n", "models", "rag", "mcp", "architecture",
  "technologies", "certificates", "certifications", "services"
])

/**
 * Detects if the user query is purely a conversational greeting or persona introduction.
 */
export function isGreeting(query: string): boolean {
  const normalized = query.toLowerCase().trim().replace(/[?!.,]/g, "")
  const words = normalized.split(/\s+/).filter(Boolean)

  if (words.length === 0) return false

  // Direct keyword match for single/short greetings
  if (words.length <= 3 && words.some((w) => GREETING_KEYWORDS.has(w))) {
    return true
  }

  // Greeting phrases
  if (
    normalized.startsWith("good morning") ||
    normalized.startsWith("good afternoon") ||
    normalized.startsWith("good evening") ||
    normalized.startsWith("good day") ||
    normalized.startsWith("who are you") ||
    normalized.startsWith("what are you") ||
    normalized.startsWith("what is your name") ||
    normalized.startsWith("tell me about yourself") ||
    normalized.startsWith("introduce yourself") ||
    normalized.startsWith("what can you do") ||
    normalized === "help"
  ) {
    const hasSubstantive = words.some((w) => SUBSTANTIVE_KEYWORDS.has(w))
    return !hasSubstantive
  }

  return false
}

/**
 * Returns a welcoming greeting response directly from Orbi (0 Groq tokens consumed).
 */
export function buildGreetingResponse(): AgentResponse {
  return {
    answer:
      "Greetings Earthling! 🛸 I am **Orbi**, Ibadat Ali's personal AI portfolio assistant.\n\nI explore verified systems from his technical universe:\n- ⚙️ **AI Agents**: Tool-calling & MCP architecture (CodeScope)\n- 🛡️ **Automations**: Production WhatsApp OCR validation (PayGuard AI)\n- 📈 **Applied ML**: Time-series forecasting (AdaptIQ) & CV anomaly detection (SentinelIQ)\n\nWhich system or engineering capability would you like to inspect?",
    followUps: [
      "What AI agent architectures has Ibadat built?",
      "How does CodeScope MCP Preflight work?",
      "Can Ibadat build custom WhatsApp or RAG automations?"
    ],
    sourceIds: ["profile", "who-is-ibadat-ali"],
    action: {
      type: "none",
      target: null
    }
  }
}

/**
 * Returns a polite, emotionally warm, bounded fallback response without calling Groq.
 * Protects 100% of LLM API quota on irrelevant or out-of-scope inquiries.
 */
export function buildNoEvidenceResponse(query: string): AgentResponse {
  return {
    answer:
      "🛸 **Query Outside Scope**\n\nI am **Orbi**, calibrated strictly to **Ibadat Ali's verified portfolio** records to guarantee zero hallucinations:\n- ⚙️ **Production Systems**: CodeScope (MCP), PayGuard AI, AdaptIQ, SentinelIQ\n- 🤝 **Client Services**: AI agent workflows, RAG pipelines, and full-stack delivery\n\nWould you like to examine one of these verified projects or discuss an engineering scope?",
    followUps: [
      "What AI agent architectures has Ibadat built?",
      "Tell me about CodeScope MCP Preflight.",
      "How can I book a discovery call with Ibadat?"
    ],
    sourceIds: [],
    action: {
      type: "none",
      target: null
    }
  }
}
