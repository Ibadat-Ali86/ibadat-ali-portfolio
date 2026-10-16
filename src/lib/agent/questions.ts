// WHAT: Professional question bank and dynamic context-aware recommendation engine.
// WHY : Represents realistic inquiries from hiring recruiters evaluating technical depth,
//       clients testing Ibadat's ability to solve business problems, and engineers probing system architecture.
// TRADEOFF: Curates 60 high-impact questions categorized by persona and intent, rotating them dynamically
//           to ensure fresh, non-repetitive suggestions on every turn.

import type { Intent } from "./types"

export type QuestionCategory = "recruiter" | "client" | "architecture" | "general"

export interface CuratedQuestion {
  id: string
  category: QuestionCategory
  text: string
  intent: Intent
  tags: string[]
  recommendedFor?: "recruiter" | "client" | "general"
}

export const QUESTION_BANK: CuratedQuestion[] = [
  // ==========================================
  // 1. RECRUITER & TALENT EVALUATION (20 Qs)
  // ==========================================
  {
    id: "rec-01",
    category: "recruiter",
    text: "Can you summarize Ibadat's primary engineering strengths and AI stack?",
    intent: "skills",
    tags: ["stack", "overview", "core-strengths"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-02",
    category: "recruiter",
    text: "What production AI agent architectures has Ibadat designed and deployed?",
    intent: "project",
    tags: ["agents", "production", "architecture"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-03",
    category: "recruiter",
    text: "Tell me about his ML / AI Engineer experience at Soft Shack.",
    intent: "experience",
    tags: ["soft-shack", "experience", "role"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-04",
    category: "recruiter",
    text: "Which certifications from Anthropic and deeplearning.ai does he hold?",
    intent: "credentials",
    tags: ["certifications", "anthropic", "credentials"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-05",
    category: "recruiter",
    text: "How does Ibadat handle error boundaries, rate limits, and LLM fallbacks?",
    intent: "skills",
    tags: ["resilience", "production", "system-design"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-06",
    category: "recruiter",
    text: "What is his proficiency in Python, FastAPI, Docker, and TypeScript?",
    intent: "skills",
    tags: ["languages", "backend", "full-stack"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-07",
    category: "recruiter",
    text: "How does CodeScope MCP Preflight demonstrate his tool-calling agent skills?",
    intent: "project",
    tags: ["codescope", "mcp", "agents"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-08",
    category: "recruiter",
    text: "Has he built production RAG systems with grounded retrieval pipelines?",
    intent: "project",
    tags: ["rag", "retrieval", "grounding"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-09",
    category: "recruiter",
    text: "What computer vision and anomaly detection experience does he possess?",
    intent: "skills",
    tags: ["computer-vision", "sentineliq", "deep-learning"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-10",
    category: "recruiter",
    text: "How does Ibadat ensure zero hallucination in client-facing AI systems?",
    intent: "services",
    tags: ["evaluation", "guardrails", "security"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-11",
    category: "recruiter",
    text: "What is his background with Model Context Protocol (MCP) and Cursor/Claude?",
    intent: "skills",
    tags: ["mcp", "anthropic", "developer-tools"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-12",
    category: "recruiter",
    text: "Can Ibadat lead both model development and full-stack integration?",
    intent: "skills",
    tags: ["full-stack", "end-to-end", "leadership"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-13",
    category: "recruiter",
    text: "Tell me about his freelance client delivery track record on Fiverr.",
    intent: "experience",
    tags: ["fiverr", "freelance", "delivery"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-14",
    category: "recruiter",
    text: "What is his educational background and foundational engineering training?",
    intent: "credentials",
    tags: ["education", "degree", "foundations"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-15",
    category: "recruiter",
    text: "Which project best highlights his ability to write clean, maintainable code?",
    intent: "project",
    tags: ["clean-code", "codescope", "best-practices"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-16",
    category: "recruiter",
    text: "How does he design token-efficient prompts without losing contextual accuracy?",
    intent: "skills",
    tags: ["prompt-engineering", "token-budget", "optimization"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-17",
    category: "recruiter",
    text: "What testing methodologies does he apply to AI pipelines and endpoints?",
    intent: "skills",
    tags: ["testing", "unit-tests", "integration"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-18",
    category: "recruiter",
    text: "Is Ibadat open to remote full-time AI Engineer or Agent Developer roles?",
    intent: "contact",
    tags: ["availability", "remote", "career"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-19",
    category: "recruiter",
    text: "How quickly does he adapt to emerging AI frameworks and models?",
    intent: "skills",
    tags: ["adaptability", "learning", "innovation"],
    recommendedFor: "recruiter"
  },
  {
    id: "rec-20",
    category: "recruiter",
    text: "Can you provide links to his resume, GitHub, and LinkedIn profiles?",
    intent: "contact",
    tags: ["resume", "github", "linkedin"],
    recommendedFor: "recruiter"
  },

  // ==========================================
  // 2. CLIENT & FOUNDER PROBLEM-SOLVING (20 Qs)
  // ==========================================
  {
    id: "cli-01",
    category: "client",
    text: "I need an automated WhatsApp bot that verifies payment receipts—can Ibadat build this?",
    intent: "project",
    tags: ["payguard-ai", "whatsapp", "ocr"],
    recommendedFor: "client"
  },
  {
    id: "cli-02",
    category: "client",
    text: "We want an AI customer support agent for our store with memory. How does he design it?",
    intent: "project",
    tags: ["ai-restaurant-chatbot", "support", "memory"],
    recommendedFor: "client"
  },
  {
    id: "cli-03",
    category: "client",
    text: "Our team spends hours on manual lead enrichment. Can he automate it with n8n and AI?",
    intent: "project",
    tags: ["ai-lead-generation", "n8n", "automation"],
    recommendedFor: "client"
  },
  {
    id: "cli-04",
    category: "client",
    text: "What does Ibadat's standard project delivery and milestone handoff look like?",
    intent: "services",
    tags: ["process", "milestones", "handoff"],
    recommendedFor: "client"
  },
  {
    id: "cli-05",
    category: "client",
    text: "We have internal proprietary documents. Can he build a private RAG pipeline that doesn't leak data?",
    intent: "services",
    tags: ["rag", "privacy", "security"],
    recommendedFor: "client"
  },
  {
    id: "cli-06",
    category: "client",
    text: "How does Ibadat prevent an AI agent from going rogue or taking unauthorized actions?",
    intent: "services",
    tags: ["guardrails", "security", "tool-safety"],
    recommendedFor: "client"
  },
  {
    id: "cli-07",
    category: "client",
    text: "Can he connect AI agents to our existing Postgres database, CRM, and REST APIs?",
    intent: "services",
    tags: ["integrations", "apis", "databases"],
    recommendedFor: "client"
  },
  {
    id: "cli-08",
    category: "client",
    text: "How do we start a technical discovery call to discuss my project requirements?",
    intent: "contact",
    tags: ["discovery-call", "consultation", "booking"],
    recommendedFor: "client"
  },
  {
    id: "cli-09",
    category: "client",
    text: "What is his typical turnaround timeline for an MVP or proof-of-concept AI agent?",
    intent: "services",
    tags: ["turnaround", "mvp", "timeline"],
    recommendedFor: "client"
  },
  {
    id: "cli-10",
    category: "client",
    text: "We need custom MCP tools for our team's AI coding workflow. What can he provide?",
    intent: "services",
    tags: ["mcp-tools", "developer-tools", "custom"],
    recommendedFor: "client"
  },
  {
    id: "cli-11",
    category: "client",
    text: "Can Ibadat build a demand forecasting or inventory prediction system for my business?",
    intent: "project",
    tags: ["adaptiq", "forecasting", "predictive-analytics"],
    recommendedFor: "client"
  },
  {
    id: "cli-12",
    category: "client",
    text: "Does he provide Docker containers, deployment configs, and walkthrough videos at handoff?",
    intent: "services",
    tags: ["documentation", "handoff", "deployment"],
    recommendedFor: "client"
  },
  {
    id: "cli-13",
    category: "client",
    text: "How does he manage LLM API costs to prevent surprise monthly cloud bills?",
    intent: "services",
    tags: ["cost-optimization", "token-budgets", "efficiency"],
    recommendedFor: "client"
  },
  {
    id: "cli-14",
    category: "client",
    text: "Can he build real-time visual inspection or defect detection models for physical operations?",
    intent: "project",
    tags: ["carevision", "sentineliq", "computer-vision"],
    recommendedFor: "client"
  },
  {
    id: "cli-15",
    category: "client",
    text: "What happens if an external API or model goes down? How does his system recover?",
    intent: "services",
    tags: ["reliability", "fallbacks", "uptime"],
    recommendedFor: "client"
  },
  {
    id: "cli-16",
    category: "client",
    text: "Can he audit or optimize our existing LangChain or RAG codebase for production?",
    intent: "services",
    tags: ["audit", "refactor", "optimization"],
    recommendedFor: "client"
  },
  {
    id: "cli-17",
    category: "client",
    text: "What are his contract terms: fixed-scope milestones vs. dedicated retainer?",
    intent: "services",
    tags: ["pricing", "contracts", "engagement"],
    recommendedFor: "client"
  },
  {
    id: "cli-18",
    category: "client",
    text: "Can he sign an NDA before we share our company's proprietary workflow details?",
    intent: "contact",
    tags: ["nda", "confidentiality", "security"],
    recommendedFor: "client"
  },
  {
    id: "cli-19",
    category: "client",
    text: "Does Ibadat offer post-delivery maintenance and bug fix support?",
    intent: "services",
    tags: ["maintenance", "support", "warranty"],
    recommendedFor: "client"
  },
  {
    id: "cli-20",
    category: "client",
    text: "How can I schedule a 30-minute discovery consultation with Ibadat today?",
    intent: "contact",
    tags: ["calendar", "contact", "schedule"],
    recommendedFor: "client"
  },

  // ==========================================
  // 3. TECHNICAL ARCHITECTURE & SYSTEMS (20 Qs)
  // ==========================================
  {
    id: "arc-01",
    category: "architecture",
    text: "How does CodeScope MCP Preflight leverage Tree-sitter for AST structural analysis?",
    intent: "project",
    tags: ["tree-sitter", "ast", "codescope"],
    recommendedFor: "general"
  },
  {
    id: "arc-02",
    category: "architecture",
    text: "Why did you build an in-memory MiniSearch RAG engine instead of using a vector database?",
    intent: "project",
    tags: ["rag-architecture", "minisearch", "zero-budget"],
    recommendedFor: "general"
  },
  {
    id: "arc-03",
    category: "architecture",
    text: "How does the Evidence Gate in this agent eliminate unwanted Groq API calls?",
    intent: "skills",
    tags: ["evidence-gate", "zero-cost", "relevance"],
    recommendedFor: "general"
  },
  {
    id: "arc-04",
    category: "architecture",
    text: "How does SentinelIQ process video streams and tabular telemetry for anomaly detection?",
    intent: "project",
    tags: ["sentineliq", "multimodal", "anomaly-detection"],
    recommendedFor: "general"
  },
  {
    id: "arc-05",
    category: "architecture",
    text: "What neural architecture powers AdaptIQ's multi-horizon sales forecasting?",
    intent: "project",
    tags: ["adaptiq", "deepar", "forecasting"],
    recommendedFor: "general"
  },
  {
    id: "arc-06",
    category: "architecture",
    text: "How does PayGuard AI combine EasyOCR with rule-based verification to stop fraud?",
    intent: "project",
    tags: ["payguard-ai", "ocr", "fraud-detection"],
    recommendedFor: "general"
  },
  {
    id: "arc-07",
    category: "architecture",
    text: "What prompt-injection defense mechanisms isolate visitor queries from system rules?",
    intent: "skills",
    tags: ["security", "prompt-injection", "xml-isolation"],
    recommendedFor: "general"
  },
  {
    id: "arc-08",
    category: "architecture",
    text: "How does the automated model fallback operate between Qwen 3.8 and GPT-OSS on Groq?",
    intent: "skills",
    tags: ["model-fallback", "groq", "high-availability"],
    recommendedFor: "general"
  },
  {
    id: "arc-09",
    category: "architecture",
    text: "How does the search pipeline enforce entity diversification across knowledge chunks?",
    intent: "skills",
    tags: ["diversification", "minisearch", "retrieval-depth"],
    recommendedFor: "general"
  },
  {
    id: "arc-10",
    category: "architecture",
    text: "How does the AI Restaurant Chatbot maintain conversation state across turns?",
    intent: "project",
    tags: ["state-management", "memory", "chatbot"],
    recommendedFor: "general"
  },
  {
    id: "arc-11",
    category: "architecture",
    text: "What chunking strategy was used to break down projects into searchable knowledge records?",
    intent: "skills",
    tags: ["chunking", "knowledge-base", "rag-design"],
    recommendedFor: "general"
  },
  {
    id: "arc-12",
    category: "architecture",
    text: "How does the Action Security Whitelist protect against arbitrary URL navigation?",
    intent: "skills",
    tags: ["security", "action-whitelist", "tool-calling"],
    recommendedFor: "general"
  },
  {
    id: "arc-13",
    category: "architecture",
    text: "Why use structured JSON outputs instead of raw streaming text for this agent?",
    intent: "skills",
    tags: ["structured-output", "json-schema", "reliability"],
    recommendedFor: "general"
  },
  {
    id: "arc-14",
    category: "architecture",
    text: "How does TopoLite accelerate topological data analysis and persistent homology?",
    intent: "project",
    tags: ["topolite", "math", "algorithms"],
    recommendedFor: "general"
  },
  {
    id: "arc-15",
    category: "architecture",
    text: "What is the token budget constraint across system prompt, history, and evidence?",
    intent: "skills",
    tags: ["token-budget", "groq", "performance"],
    recommendedFor: "general"
  },
  {
    id: "arc-16",
    category: "architecture",
    text: "How does CareVision assist medical imaging review while respecting clinical boundaries?",
    intent: "project",
    tags: ["carevision", "healthcare", "ai-ethics"],
    recommendedFor: "general"
  },
  {
    id: "arc-17",
    category: "architecture",
    text: "How does the normalization layer handle query typos, slang, and acronym expansion?",
    intent: "skills",
    tags: ["normalization", "aliases", "search-recall"],
    recommendedFor: "general"
  },
  {
    id: "arc-18",
    category: "architecture",
    text: "What makes MCP (Model Context Protocol) superior to ad-hoc custom function calling?",
    intent: "skills",
    tags: ["mcp", "standards", "anthropic"],
    recommendedFor: "general"
  },
  {
    id: "arc-19",
    category: "architecture",
    text: "How does the client cooldown mechanism protect the free-tier API from spamming?",
    intent: "skills",
    tags: ["rate-limiting", "client-cooldown", "dos-defense"],
    recommendedFor: "general"
  },
  {
    id: "arc-20",
    category: "architecture",
    text: "What metrics are tracked during offline RAG evaluation across retrieval and groundedness?",
    intent: "skills",
    tags: ["rag-evaluation", "hit-rate", "groundedness"],
    recommendedFor: "general"
  }
]

/**
 * Dynamically selects fresh, context-tailored suggested questions for the chat interface.
 * Ensures the user sees different, engaging questions on every response.
 */
export function getDynamicQuestions(params: {
  intent?: Intent
  query?: string
  currentFollowUps?: string[]
  count?: number
  mode?: "recruiter" | "client" | "general"
  excludeIds?: string[]
}): CuratedQuestion[] {
  const {
    intent,
    currentFollowUps = [],
    count = 3,
    mode = "general",
    excludeIds = []
  } = params

  const excluded = new Set(excludeIds)

  // 1. Filter by mode preference if specified
  let candidates = QUESTION_BANK.filter((q) => !excluded.has(q.id))

  if (mode === "recruiter") {
    candidates = candidates.filter((q) => q.category === "recruiter" || q.category === "architecture")
  } else if (mode === "client") {
    candidates = candidates.filter((q) => q.category === "client" || q.category === "architecture")
  }

  // 2. Score relevance to the current intent
  const scored = candidates.map((q) => {
    let score = 0
    if (intent && q.intent === intent) score += 5
    if (mode === "recruiter" && q.category === "recruiter") score += 3
    if (mode === "client" && q.category === "client") score += 3

    // Check overlap with LLM follow-ups to avoid exact duplicates
    const isDuplicate = currentFollowUps.some(
      (f) => f.toLowerCase().includes(q.text.toLowerCase().slice(0, 20))
    )
    if (isDuplicate) score -= 10

    // Deterministic tie-breaker across turns without triggering SSR Math.random checks
    const tieBreaker = ((q.id.charCodeAt(0) + q.id.charCodeAt(q.id.length - 1)) % 10) / 10
    score += tieBreaker

    return { question: q, score }
  })

  // 3. Sort by score descending and take the top N
  scored.sort((a, b) => b.score - a.score)

  const selected = scored.slice(0, count).map((item) => item.question)

  // Fallback if pool exhausted
  if (selected.length < count) {
    const fallback = QUESTION_BANK.slice(0, count)
    return fallback
  }

  return selected
}
