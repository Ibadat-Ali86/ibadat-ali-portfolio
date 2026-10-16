// WHAT: UI and API contract definitions for the Portfolio Assistant chat experience.
// WHY : Strictly defines message schemas, client-side conversation state, question modes,
//       and verified source metadata.
// TRADEOFF: Distinguishes between internal agent responses and UI chat items with timestamps and IDs.

import type { AgentAction, AgentResponse } from "@/lib/agent/types"

export type ConversationMode = "general" | "recruiter" | "client"

export interface UIMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: number
  followUps?: string[]
  sourceIds?: string[]
  action?: AgentAction
  isTyping?: boolean
  isError?: boolean
}

export interface AssistantRequestPayload {
  message: string
  history?: {
    role: "user" | "assistant"
    content: string
  }[]
  mode?: ConversationMode
}

export interface AssistantResponsePayload extends AgentResponse {
  timestamp?: number
  latencyMs?: number
}

export interface VerifiedSource {
  id: string
  title: string
  type: string
  description?: string
  url?: string
}
