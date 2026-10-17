// WHAT: Next.js API route handler for the Portfolio AI Assistant.
// WHY : Provides a secure, validated, and rate-limited HTTP endpoint for portfolio visitors
//       to converse with Orbi.
// TRADEOFF: Uses in-memory rate limiting with sliding window; resets on serverless cold starts
//           which is safe and zero-budget for portfolio traffic.

import { NextRequest, NextResponse } from "next/server"
import { runPortfolioAgent } from "@/lib/agent/agent"
import { detectIntent } from "@/lib/agent/relevance"
import { getDynamicQuestions } from "@/lib/agent/questions"
import type { ConversationMode } from "@/types/chat"

// Bounded in-memory sliding window rate limiter with periodic cleanup
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20
const MAX_RATE_LIMIT_ENTRIES = 2_000

function checkRateLimit(clientIp: string): { allowed: boolean; remaining: number } {
  const now = Date.now()

  // Evict expired entries when map approaches size threshold to prevent heap exhaustion
  if (rateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) {
    for (const [key, record] of rateLimitMap) {
      if (now > record.resetAt) {
        rateLimitMap.delete(key)
      }
    }
    // Hard cap fallback: if still saturated, clear stale keys
    if (rateLimitMap.size > MAX_RATE_LIMIT_ENTRIES) {
      const iterator = rateLimitMap.keys()
      for (let i = 0; i < 200; i++) {
        const nextKey = iterator.next().value
        if (nextKey) rateLimitMap.delete(nextKey)
      }
    }
  }

  const record = rateLimitMap.get(clientIp)

  if (!record || now > record.resetAt) {
    rateLimitMap.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 }
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 }
  }

  record.count += 1
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - record.count }
}

const ALLOWED_ORIGIN_PATTERNS = [
  /^https?:\/\/localhost(?::\d+)?$/,
  /^https?:\/\/127\.0\.0\.1(?::\d+)?$/,
  /^https:\/\/ibadat-ali-portfolio\.vercel\.app$/,
  /^https:\/\/.*\.vercel\.app$/
]

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true // Same-origin or server-to-server request
  return ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin))
}

function extractClientIp(req: NextRequest): string {
  // Prefer direct or provider-verified IP headers before falling back to X-Forwarded-For
  const rawIp =
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-vercel-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "anonymous-visitor"

  // Sanitize and bound length to prevent key injection DoS
  return rawIp.slice(0, 45).replace(/[^a-zA-Z0-9.:_-]/g, "") || "anonymous-visitor"
}

export async function POST(req: NextRequest) {
  const startTime = Date.now()

  // 1. Origin verification to prevent unauthorized cross-origin abuse
  const origin = req.headers.get("origin")
  if (!isOriginAllowed(origin)) {
    return NextResponse.json(
      { error: "Forbidden cross-origin request." },
      { status: 403 }
    )
  }

  // 2. Client IP identification & bounded rate-limiting
  const clientIp = extractClientIp(req)
  const rateCheck = checkRateLimit(clientIp)
  if (!rateCheck.allowed) {
    return NextResponse.json(
      {
        answer:
          "Whoa there, space traveler! 🛸 You've sent quite a few messages in a short window. Please pause for 60 seconds to allow the cosmic communications array to cool down, or reach out to Ibadat directly via the contact options! ✨",
        followUps: [
          "How can I contact Ibadat directly?",
          "Where can I view his GitHub repositories?",
          "Tell me about CodeScope MCP Preflight."
        ],
        sourceIds: [],
        action: { type: "open_contact", target: "contact" }
      },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
          "Cache-Control": "no-store, max-age=0"
        }
      }
    )
  }

  // 3. Parse and validate JSON payload
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      {
        answer: "Invalid JSON payload received by Orbi.",
        followUps: [
          "What AI agent projects has Ibadat built?",
          "How does CodeScope MCP Preflight work?",
          "What are his core machine learning skills?"
        ],
        sourceIds: [],
        action: { type: "none", target: null }
      },
      { status: 400 }
    )
  }

  const message = typeof body?.message === "string" ? body.message.trim() : ""
  const history = Array.isArray(body?.history) ? body.history : []
  const mode: ConversationMode =
    body?.mode === "recruiter" || body?.mode === "client" ? body.mode : "general"

  if (!message) {
    return NextResponse.json(
      {
        answer: "Please enter a question about Ibadat Ali's work, AI agents, or engineering experience. 🛸",
        followUps: [
          "What AI agent projects has Ibadat built?",
          "How does CodeScope MCP Preflight work?",
          "What are his services and availability?"
        ],
        sourceIds: [],
        action: { type: "none", target: null }
      },
      { status: 400 }
    )
  }

  // Bound message length to protect against buffer overflow & token exhaustion (5,000 characters)
  if (message.length > 5000) {
    return NextResponse.json(
      {
        answer:
          "Your inquiry is exceptionally detailed and exceeds our 5,000-character context limit. Please condense slightly, or reach out to Ibadat directly at ibadcodes@gmail.com with your full project specifications or RFP documents! 🛸",
        followUps: [
          "How can I contact Ibadat directly?",
          "Tell me about CodeScope MCP Preflight.",
          "What AI automation systems has Ibadat built?"
        ],
        sourceIds: [],
        action: {
          type: "open_contact",
          target: "contact",
          label: "📬 Email Ibadat Directly ↗",
          url: "mailto:ibadcodes@gmail.com?subject=Detailed%20Project%20Inquiry%20via%20Portfolio%20Agent"
        }
      },
      { status: 400 }
    )
  }

  try {
    // 3. Execute Agent RAG workflow
    const agentResponse = await runPortfolioAgent({
      message,
      history
    })

    // 4. Enrich with dynamic question recommendations tailored to the mode and detected intent
    const intent = detectIntent(message)
    const dynamicSuggested = getDynamicQuestions({
      intent,
      query: message,
      currentFollowUps: agentResponse.followUps,
      mode,
      count: 3
    })

    const latencyMs = Date.now() - startTime

    return NextResponse.json(
      {
        ...agentResponse,
        dynamicSuggestions: dynamicSuggested.map((q) => q.text),
        latencyMs,
        timestamp: Date.now()
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Content-Type-Options": "nosniff"
        }
      }
    )
  } catch (err: any) {
    console.error("API route error in /api/assistant:", err)
    return NextResponse.json(
      {
        answer:
          "Cosmic static detected! 🌌 An unexpected glitch interrupted the transmission. Please try again in a moment, or reach out to Ibadat directly.",
        followUps: [
          "How can I contact Ibadat directly?",
          "Tell me about CodeScope MCP Preflight.",
          "What are his core machine learning skills?"
        ],
        sourceIds: [],
        action: { type: "none", target: null }
      },
      { status: 500 }
    )
  }
}
