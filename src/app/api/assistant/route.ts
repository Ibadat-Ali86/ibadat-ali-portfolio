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

// Simple in-memory sliding window rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20

function checkRateLimit(clientIp: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
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

export async function POST(req: NextRequest) {
  const startTime = Date.now()

  // 1. Client IP identification for rate-limiting
  const forwarded = req.headers.get("x-forwarded-for")
  const clientIp = forwarded ? forwarded.split(",")[0].trim() : "anonymous-visitor"

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

  // 2. Parse and validate JSON payload
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

  // Bound message length to protect against abuse
  if (message.length > 500) {
    return NextResponse.json(
      {
        answer:
          "Your transmission exceeds the maximum allowed message length (500 characters). Please condense your inquiry so Orbi's cosmic receiver can process it! 🛸",
        followUps: [
          "Summarize Ibadat's core AI skills.",
          "What is CodeScope MCP Preflight?",
          "How can I contact Ibadat?"
        ],
        sourceIds: [],
        action: { type: "none", target: null }
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
