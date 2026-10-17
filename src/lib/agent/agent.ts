// WHAT: Main agent orchestrator connecting validation, retrieval, evidence gating, and LLM inference.
// WHY : Centralizes the end-to-end RAG workflow into a single, cohesive, and testable function.
// TRADEOFF: Employs an early evidence gate in code to save Groq API quota on out-of-scope queries.

import { RequestSchema, sanitizeAndValidateResponse } from "./schemas"
import { sanitizeUserInput, normalizeQuery, buildRetrievalQuery } from "./normalize"
import { retrievePortfolioContext } from "./retrieve"
import {
  detectIntent,
  checkEvidence,
  buildNoEvidenceResponse,
  isGreeting,
  buildGreetingResponse,
  isOutOfScope
} from "./relevance"
import { buildPrompt } from "./prompt"
import { generateCompletion, GroqApiError } from "./groq"
import { getFallbackFollowUps, sanitizeAction, APPROVED_PROJECT_IDS } from "./followups"
import type { AgentExecuteInput, AgentResponse } from "./types"

/**
 * Normalizes email addresses, social media profile links, and URLs in agent responses
 * into clickable markdown links if they are not already formatted as markdown links.
 */
export function formatClickableContactsAndUrls(text: string): string {
  let formatted = text

  // 1. Email addresses (e.g. ibadcodes@gmail.com -> [ibadcodes@gmail.com](mailto:ibadcodes@gmail.com))
  formatted = formatted.replace(
    /(?<!\[[^\]]*|mailto:)\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b(?![^\[]*\]|\))/g,
    "[$1](mailto:$1)"
  )

  // 2. Specific social & profile URLs (if plain text)
  formatted = formatted.replace(
    /(?<!\]\()(https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?)(?!\))/gi,
    "[LinkedIn Profile]($1)"
  )
  formatted = formatted.replace(
    /(?<!\]\()(https?:\/\/(?:www\.)?github\.com\/Ibadat-Ali86\/?)(?!\))/gi,
    "[GitHub Profile]($1)"
  )
  formatted = formatted.replace(
    /(?<!\]\()(https?:\/\/(?:www\.)?kaggle\.com\/[A-Za-z0-9_-]+\/?)(?!\))/gi,
    "[Kaggle Profile]($1)"
  )

  // 3. WhatsApp phone representations
  formatted = formatted.replace(
    /(?<!\]\()\+92\s*322\s*0692321\b(?!\))/g,
    "[+92 322 0692321](https://wa.me/923220692321)"
  )

  // 4. Any remaining raw http/https URLs not already in markdown link format [text](url)
  formatted = formatted.replace(
    /(?<!\]\()(https?:\/\/[^\s<)]+)(?!\))/g,
    (match) => {
      let cleanUrl = match
      if (cleanUrl.endsWith(".") || cleanUrl.endsWith(",")) {
        cleanUrl = cleanUrl.slice(0, -1)
      }
      return `[${cleanUrl}](${cleanUrl})`
    }
  )

  return formatted
}

/**
 * Main execution entry point for the Ibadat Ali Portfolio AI Assistant.
 *
 * Workflow:
 * 1. Validates and sanitizes visitor message and history.
 * 2. Detects user intent.
 * 3. Enriches query and retrieves diversified portfolio chunks via MiniSearch.
 * 4. Passes retrieved evidence through the Evidence Gate.
 * 5. If evidence is inadequate, returns a deterministic code response (0 Groq tokens used).
 * 6. Assembles grounded prompt with strict injection boundaries.
 * 7. Calls Groq with automated model fallback (Qwen 3.8 27B -> GPT-OSS 20B).
 * 8. Sanitizes and validates the structured response and action payload.
 */
export async function runPortfolioAgent(input: AgentExecuteInput): Promise<AgentResponse> {
  // Step 1: Input Validation
  const validation = RequestSchema.safeParse(input)
  if (!validation.success) {
    const errorMsg =
      (validation.error as any).issues?.[0]?.message ||
      (validation.error as any).errors?.[0]?.message ||
      validation.error.message ||
      "Invalid request payload."
    return {
      answer: `Please provide a valid question: ${errorMsg}`,
      followUps: [
        "What AI agent projects has Ibadat built?",
        "How does CodeScope MCP Preflight work?",
        "What are his core machine learning skills?"
      ],
      sourceIds: [],
      action: { type: "none", target: null }
    }
  }

  const message = validation.data.message
  const history: { role: "user" | "assistant"; content: string }[] = (
    validation.data.history || []
  ).map((h) => ({
    role: (h.role as "user" | "assistant") || "user",
    content: h.content || ""
  }))
  const sanitizedMessage = sanitizeUserInput(message)

  if (sanitizedMessage.length === 0) {
    return {
      answer: "Please ask a question regarding Ibadat Ali's projects, experience, or skills.",
      followUps: [
        "Tell me about CodeScope MCP Preflight.",
        "What AI automation systems has he built?",
        "What are his services and availability?"
      ],
      sourceIds: [],
      action: { type: "none", target: null }
    }
  }

  // Step 2: Instant Greeting & Persona Handler (0ms latency, 0 Groq tokens)
  if (isGreeting(sanitizedMessage)) {
    return buildGreetingResponse()
  }

  // Step 3: Zero-Cost Out-of-Scope Guardrail (0 Groq tokens)
  if (isOutOfScope(sanitizedMessage)) {
    return buildNoEvidenceResponse(sanitizedMessage)
  }

  // Step 4: Intent Detection
  const intent = detectIntent(sanitizedMessage)
  const fallbackFollowUps = getFallbackFollowUps(intent)

  // Step 3: Context-Aware Query Assembly & Retrieval
  const retrievalQuery = buildRetrievalQuery(sanitizedMessage, history)
  const evidence = retrievePortfolioContext(retrievalQuery, {
    maxChunks: 5,
    minScore: 10.0
  })

  // Step 4: Evidence Gate Check
  const evidenceCheck = checkEvidence(evidence)
  if (!evidenceCheck.allowed) {
    // 0 Groq calls made for out-of-scope or unverified inquiries
    return buildNoEvidenceResponse(sanitizedMessage)
  }

  // Step 5: Grounded Prompt Construction
  const promptMessages = buildPrompt({
    query: sanitizedMessage,
    history,
    evidence: evidenceCheck.results
  })

  // Step 6: Groq LLM Inference with Automated Fallback
  let rawCompletion: string
  try {
    rawCompletion = await generateCompletion(promptMessages)
  } catch (error: any) {
    if (error instanceof GroqApiError && error.status === 429) {
      return {
        answer:
          "The portfolio assistant is currently experiencing high inquiry volume and has reached the temporary free-tier rate limit. Please try again in a moment, or reach out to Ibadat directly.",
        followUps: [
          "How can I contact Ibadat directly?",
          "Where can I view his GitHub repositories?",
          "Tell me about CodeScope MCP Preflight."
        ],
        sourceIds: [],
        action: { type: "open_contact", target: "contact" }
      }
    }

    if (error instanceof GroqApiError && error.code === "missing_api_key") {
      // Offline / unconfigured environment fallback
      const projectEvidence = evidenceCheck.results.find(
        (chunk) => chunk.entityType === "project" && APPROVED_PROJECT_IDS.has(chunk.entityId.toLowerCase())
      )
      const offlineAction = projectEvidence
        ? sanitizeAction({ type: "open_project", target: projectEvidence.entityId })
        : intent === "contact"
        ? sanitizeAction({ type: "open_contact", target: "contact" })
        : { type: "none" as const, target: null }

      return {
        answer: formatClickableContactsAndUrls(
          "Greetings Earthling! 🛸 I am Orbi, operating in local demonstration mode (no API key configured). Based on verified portfolio records: Ibadat Ali is an AI Engineer and AI Agent Developer specializing in tool-calling agents (CodeScope), WhatsApp AI automation (PayGuard AI), forecasting (AdaptIQ), and anomaly detection (SentinelIQ). Contact: ibadcodes@gmail.com, WhatsApp: +92 322 0692321, LinkedIn: https://www.linkedin.com/in/mirzaibadatali."
        ),
        followUps: [
          "What is CodeScope MCP Preflight?",
          "How does PayGuard AI verify payments?",
          "What forecasting models are in AdaptIQ?"
        ],
        sourceIds: evidenceCheck.results.map((e) => e.entityId),
        action: offlineAction
      }
    }

    console.error("Agent execution failure:", error)
    return {
      answer:
        "An unexpected error occurred while communicating with the AI service. You can explore Ibadat's verified projects and documentation directly on this site.",
      followUps: fallbackFollowUps,
      sourceIds: [],
      action: { type: "none", target: null }
    }
  }

  // Step 7: Response Validation and Normalization
  const parsedResponse = sanitizeAndValidateResponse(rawCompletion, fallbackFollowUps)

  // Step 8: Action Security Whitelist Sanitization & Guaranteed Project Navigation Option
  let safeAction = sanitizeAction(parsedResponse.action)

  // Automatic Project Option: Whenever the agent fetches details about a specific project,
  // ensure the visitor is provided with an option to take them to that project and open it.
  if (safeAction.type === "none") {
    // 1. Check if retrieved evidence contains a verified project
    const projectEvidence = evidenceCheck.results.find(
      (chunk) => chunk.entityType === "project" && APPROVED_PROJECT_IDS.has(chunk.entityId.toLowerCase())
    )

    // 2. Or check if the user query explicitly mentioned an approved project
    const normalizedMsg = sanitizedMessage.toLowerCase()
    const mentionedProject = Array.from(APPROVED_PROJECT_IDS).find((id) =>
      normalizedMsg.includes(id.replace(/-/g, " ")) || normalizedMsg.includes(id)
    )

    const targetProject = projectEvidence?.entityId || mentionedProject

    if (targetProject) {
      safeAction = sanitizeAction({
        type: "open_project",
        target: targetProject
      })
    } else if (intent === "contact") {
      safeAction = sanitizeAction({
        type: "open_contact",
        target: "contact"
      })
    }
  }

  // Step 9: Make all contacts, emails, and URLs clickable in the generated answer
  const clickableAnswer = formatClickableContactsAndUrls(parsedResponse.answer)

  // Step 10: Source IDs Reconciliation
  const validSourceIds =
    parsedResponse.sourceIds.length > 0
      ? parsedResponse.sourceIds
      : Array.from(new Set(evidenceCheck.results.map((r) => r.entityId))).slice(0, 4)

  return {
    answer: clickableAnswer,
    followUps: parsedResponse.followUps,
    sourceIds: validSourceIds,
    action: safeAction
  }
}
