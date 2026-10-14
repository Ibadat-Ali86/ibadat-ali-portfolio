// WHAT: Follow-up question generator and strict navigation action security whitelist.
// WHY : Ensures follow-up prompts are always engaging and contextually relevant,
//       while defending against arbitrary URL or parameter execution from LLM actions.
// TRADEOFF: Whitelists known project IDs and approved domains; unknown action targets
//           are safely converted to { type: "none", target: null }.

import type { AgentAction, Intent } from "./types"

export const APPROVED_PROJECT_IDS = new Set([
  "codescope",
  "payguard-ai",
  "sentineliq",
  "adaptiq",
  "carevision",
  "topolite",
  "vital-link",
  "ai-lead-generation",
  "ai-restaurant-chatbot",
  "evershine",
  "covid-analytics",
  "netflix",
  "pakistan-ecommerce",
  "vendor-analysis",
  "employee-form"
])

const APPROVED_DOMAIN_PREFIXES = [
  "https://ibadat-ali-portfolio.vercel.app",
  "https://github.com",
  "https://www.linkedin.com",
  "https://linkedin.com"
]

export const CONTEXTUAL_FOLLOW_UPS: Record<Intent, [string, string, string]> = {
  project: [
    "What technologies were used in this system?",
    "What were the key architectural decisions?",
    "How does this project handle evaluation boundaries?"
  ],
  skills: [
    "What is his experience with tool-calling agents and MCP?",
    "Which projects use Python, FastAPI, and Docker?",
    "Has he built production RAG systems?"
  ],
  experience: [
    "Tell me about his role at Soft Shack.",
    "What kind of systems did he deliver on Fiverr?",
    "What are his primary engineering strengths?"
  ],
  credentials: [
    "Which Anthropic certifications does Ibadat hold?",
    "What topics are covered in the Claude 101 certificate?",
    "How do these credentials apply to his AI engineering work?"
  ],
  services: [
    "How does Ibadat approach AI agent development?",
    "What does a typical project handoff include?",
    "Can he build custom RAG pipelines?"
  ],
  contact: [
    "How can I reach out for a technical consultation?",
    "What are his availability and working modes?",
    "Where can I view his public code repositories?"
  ],
  comparison: [
    "How does CodeScope compare to standard RAG?",
    "What is the difference between SentinelIQ and AdaptIQ?",
    "Which project best showcases full-stack AI delivery?"
  ],
  general_portfolio: [
    "What AI agent projects has Ibadat built?",
    "How does CodeScope MCP Preflight work?",
    "What are his core machine learning skills?"
  ]
}

/**
 * Returns 3 standard fallback follow-up questions tailored to the detected intent.
 */
export function getFallbackFollowUps(intent: Intent): [string, string, string] {
  return CONTEXTUAL_FOLLOW_UPS[intent] || CONTEXTUAL_FOLLOW_UPS.general_portfolio
}

/**
 * Validates and sanitizes an action proposed by the LLM against the security whitelist.
 */
export function sanitizeAction(action?: AgentAction | null): AgentAction {
  if (!action || !action.type || action.type === "none") {
    return { type: "none", target: null }
  }

  if (action.type === "open_project") {
    if (action.target && APPROVED_PROJECT_IDS.has(action.target.toLowerCase().trim())) {
      return {
        type: "open_project",
        target: action.target.toLowerCase().trim()
      }
    }
    return { type: "none", target: null }
  }

  if (action.type === "open_resume") {
    return { type: "open_resume", target: "resume" }
  }

  if (action.type === "open_contact") {
    return { type: "open_contact", target: "contact" }
  }

  if (action.type === "open_link" && typeof action.target === "string") {
    const target = action.target.trim()
    const isApproved = APPROVED_DOMAIN_PREFIXES.some((prefix) => target.startsWith(prefix))
    if (isApproved) {
      return { type: "open_link", target }
    }
    return { type: "none", target: null }
  }

  return { type: "none", target: null }
}
