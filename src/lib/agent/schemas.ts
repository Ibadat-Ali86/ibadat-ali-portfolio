// WHAT: Runtime validation schemas using Zod for requests, model outputs, and actions.
// WHY : Defense-in-depth: guarantees external inputs and LLM outputs strictly adhere to
//       invariants before entering internal pipelines or reaching the client UI.
// TRADEOFF: Employs schema normalization fallbacks to prevent runtime crashes if the model
//           returns slightly malformed structures (e.g. 2 or 4 follow-ups instead of 3).

import { z } from "zod"
import type { AgentResponse } from "./types"

export const RequestSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(10000, "Message length must not exceed 10000 characters"),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(8000, "History message exceeds max length")
      })
    )
    .max(10, "History cannot exceed 10 messages")
    .optional()
    .default([])
})

export type ValidatedRequest = z.infer<typeof RequestSchema>

export const AgentActionSchema = z.object({
  type: z.enum([
    "none",
    "open_project",
    "open_resume",
    "open_contact",
    "open_link"
  ]),
  target: z.string().nullable()
})

export const AgentResponseSchema = z.object({
  answer: z
    .string()
    .min(1, "Answer cannot be empty")
    .max(4000, "Answer exceeds maximum length"),
  followUps: z
    .array(z.string().min(1).max(140))
    .min(1)
    .max(5),
  sourceIds: z
    .array(z.string())
    .max(8)
    .default([]),
  action: AgentActionSchema.default({
    type: "none",
    target: null
  })
})

/**
 * Normalizes and validates any raw model output into a strictly compliant AgentResponse.
 * Ensures followUps always has exactly 3 items and action is safe.
 */
export function sanitizeAndValidateResponse(
  raw: unknown,
  fallbackFollowUps: [string, string, string]
): AgentResponse {
  let parsedJson: unknown = raw
  if (typeof raw === "string") {
    try {
      parsedJson = JSON.parse(raw)
    } catch {
      // If the LLM returned Markdown backticks or raw text, attempt extraction
      const extracted = raw.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim()
      try {
        parsedJson = JSON.parse(extracted)
      } catch {
        parsedJson = { answer: raw }
      }
    }
  }

  const result = AgentResponseSchema.safeParse(parsedJson)

  if (!result.success) {
    const fallbackAnswer =
      typeof parsedJson === "object" && parsedJson !== null && "answer" in parsedJson
        ? String((parsedJson as { answer: unknown }).answer)
        : "I can answer questions regarding Ibadat Ali's projects, skills, and experience."

    return {
      answer: fallbackAnswer.slice(0, 2000),
      followUps: fallbackFollowUps,
      sourceIds: [],
      action: { type: "none", target: null }
    }
  }

  const data = result.data
  let standardizedFollowUps: [string, string, string]

  if (data.followUps.length >= 3) {
    standardizedFollowUps = [
      data.followUps[0],
      data.followUps[1],
      data.followUps[2]
    ]
  } else {
    // Pad with fallback follow-ups if model provided fewer than 3
    const merged = [...data.followUps]
    for (const fb of fallbackFollowUps) {
      if (merged.length < 3 && !merged.includes(fb)) {
        merged.push(fb)
      }
    }
    while (merged.length < 3) {
      merged.push("Tell me more about your experience.")
    }
    standardizedFollowUps = [merged[0], merged[1], merged[2]]
  }

  return {
    answer: data.answer,
    followUps: standardizedFollowUps,
    sourceIds: data.sourceIds,
    action: {
      type: (data.action?.type as any) || "none",
      target: data.action?.target ?? null
    }
  }
}
