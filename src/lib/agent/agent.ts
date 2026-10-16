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
import { getFallbackFollowUps, sanitizeAction } from "./followups"
import type { AgentExecuteInput, AgentResponse } from "./types"

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
      return {
        answer:
          "Greetings Earthling! 🛸 I am Orbi, operating in local demonstration mode (no API key configured). Based on verified portfolio records: Ibadat Ali is an AI Engineer and AI Agent Developer specializing in tool-calling agents (CodeScope), WhatsApp AI automation (PayGuard AI), forecasting (AdaptIQ), and anomaly detection (SentinelIQ).",
        followUps: [
          "What is CodeScope MCP Preflight?",
          "How does PayGuard AI verify payments?",
          "What forecasting models are in AdaptIQ?"
        ],
        sourceIds: evidenceCheck.results.map((e) => e.entityId),
        action: { type: "none", target: null }
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

  // Step 8: Action Security Whitelist Sanitization
  const safeAction = sanitizeAction(parsedResponse.action)

  // Step 9: Source IDs Reconciliation
  const validSourceIds =
    parsedResponse.sourceIds.length > 0
      ? parsedResponse.sourceIds
      : Array.from(new Set(evidenceCheck.results.map((r) => r.entityId))).slice(0, 4)

  return {
    answer: parsedResponse.answer,
    followUps: parsedResponse.followUps,
    sourceIds: validSourceIds,
    action: safeAction
  }
}
