// WHAT: Core domain types and interfaces for the Portfolio RAG Agent.
// WHY : Provides compile-time contract definitions for retrieval, intent routing,
//       evidence gating, and structured LLM outputs.
// TRADEOFF: Preserves both 'text' and 'content', 'keywords' and 'tags' to guarantee backward
//           compatibility across early drafts and blueprint references.

export type EntityType =
  | "project"
  | "experience"
  | "skill"
  | "credential"
  | "profile"
  | "faq"

export type Intent =
  | "project"
  | "skills"
  | "experience"
  | "credentials"
  | "services"
  | "contact"
  | "comparison"
  | "general_portfolio"

export type AgentActionType =
  | "none"
  | "open_project"
  | "open_resume"
  | "open_contact"
  | "open_link"

export interface AgentAction {
  type: AgentActionType
  target: string | null
  label?: string
  url?: string | null
}

export interface KnowledgeChunk {
  id: string
  entityId: string
  entityType: EntityType
  section: string
  title: string
  text: string
  content: string // Alias for text to support KnowledgeDocument interface
  keywords: string[]
  tags: string[]   // Alias for keywords
  technologies: string[]
  category: string[]
  domain?: string[]
  sourceUrl?: string | null
  keywordsText?: string
  technologiesText?: string
  categoryText?: string
}

export type KnowledgeDocument = KnowledgeChunk

export interface SearchResult extends KnowledgeChunk {
  score: number
  match?: Record<string, string[]>
}

export type EvidenceDecision =
  | { allowed: true; results: SearchResult[] }
  | { allowed: false; reason: "no-results" | "weak-results"; results?: SearchResult[] }

export interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export interface AgentResponse {
  answer: string
  followUps: [string, string, string]
  sourceIds: string[]
  action: AgentAction
}

export interface AgentExecuteInput {
  message: string
  history?: {
    role: "user" | "assistant"
    content: string
  }[]
}