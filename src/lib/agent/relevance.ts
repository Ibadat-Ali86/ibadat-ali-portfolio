// WHAT: Intent detection, evidence gating, and deterministic zero-cost out-of-scope handling.
// WHY : Protects Groq free-tier quotas by short-circuiting unsupported or weak queries in code,
//       preventing LLM hallucinations on out-of-domain prompts.
// TRADEOFF: Rule-based intent detection trades continuous semantic classifiers for instantaneous,
//           zero-latency heuristic matching.

import type { Intent, SearchResult, EvidenceDecision, AgentResponse } from "./types"

const WEAK_EVIDENCE_THRESHOLD = 12.0

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
    q.includes("consult")
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
    q.includes("framework")
  ) {
    return "skills"
  }

  if (
    q.includes("service") ||
    q.includes("offer") ||
    q.includes("can you build") ||
    q.includes("help with")
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
    q.includes("adaptiq")
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
    // If it also contains substantive project queries (e.g. "who are you and tell me about codescope"), let retrieval run
    const hasSubstantive = words.some((w) => SUBSTANTIVE_KEYWORDS.has(w))
    return !hasSubstantive
  }

  return false
}

/**
 * Returns a welcoming greeting response directly from Orbi (0 tokens consumed).
 */
export function buildGreetingResponse(): AgentResponse {
  return {
    answer:
      "Greetings Earthling! 🛸 I am Orbi, a cosmic alien species and personal AI assistant for Ibadat Ali! I've traveled across space to guide you through his verified technical universe—including his AI agents (like CodeScope), automation pipelines (like PayGuard AI), forecasting systems (like AdaptIQ), and full-stack engineering. What would you like to explore?",
    followUps: [
      "What AI agent projects has Ibadat built?",
      "How does CodeScope MCP Preflight work?",
      "What are his core machine learning skills?"
    ],
    sourceIds: ["profile", "who-is-ibadat-ali"],
    action: {
      type: "none",
      target: null
    }
  }
}

/**
 * Returns a polite, bounded fallback response in structured JSON format without calling Groq.
 */
export function buildNoEvidenceResponse(query: string): AgentResponse {
  return {
    answer:
      "Greetings! I'm Orbi, Ibadat Ali's AI assistant. My sensors are calibrated specifically to Ibadat Ali's verified portfolio, AI systems, engineering experience, and technical projects. I don't have verified records on that topic in his portfolio archives, but I can beam down details about his AI agents, forecasting models, automation workflows, or full-stack applications.",
    followUps: [
      "What AI agent projects has Ibadat built?",
      "How does CodeScope MCP Preflight work?",
      "What are his core machine learning skills?"
    ],
    sourceIds: [],
    action: {
      type: "none",
      target: null
    }
  }
}
