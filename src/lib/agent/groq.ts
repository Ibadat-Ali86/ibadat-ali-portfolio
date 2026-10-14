// WHAT: Resilient server-side Groq API client with automated model fallback and timeouts.
// WHY : Provides single-call LLM inference adhering to Groq free-tier rate limits,
//       with automatic fallback from Qwen 3.8 27B to GPT-OSS 20B/Llama if the preview model is offline.
// TRADEOFF: Uses native Node.js fetch with AbortSignal to eliminate heavy external SDK dependencies
//           while strictly conforming to Groq's OpenAI-compatible completions endpoint.

import type { ChatMessage } from "./types"

const DEFAULT_PRIMARY_MODEL = "qwen/qwen3.8-27b"
const DEFAULT_FALLBACK_MODEL = "openai/gpt-oss-20b"
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
const REQUEST_TIMEOUT_MS = 15000

export class GroqApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = "GroqApiError"
    this.status = status
    this.code = code
  }
}

/**
 * Invokes the Groq chat completions endpoint with structured JSON enforcement.
 */
async function callGroqModel(
  model: string,
  messages: ChatMessage[],
  apiKey: string
): Promise<string> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        max_tokens: 1024,
        response_format: { type: "json_object" }
      }),
      signal: controller.signal
    })

    if (!response.ok) {
      const errorText = await response.text()
      let errorCode: string | undefined
      try {
        const errorJson = JSON.parse(errorText)
        errorCode = errorJson?.error?.code
      } catch {
        // Ignored
      }
      throw new GroqApiError(
        `Groq API request failed (${response.status}): ${errorText}`,
        response.status,
        errorCode
      )
    }

    const json = await response.json()
    const content = json?.choices?.[0]?.message?.content

    if (!content) {
      throw new GroqApiError("Groq returned an empty response content", 500)
    }

    return content
  } finally {
    clearTimeout(timeoutId)
  }
}

/**
 * Executes a completion request with automated fallback if the primary model is unavailable.
 */
export async function generateCompletion(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new GroqApiError(
      "GROQ_API_KEY is not defined in server environment variables",
      401,
      "missing_api_key"
    )
  }

  const primaryModel = process.env.GROQ_MODEL || DEFAULT_PRIMARY_MODEL
  const fallbackModel = process.env.GROQ_FALLBACK_MODEL || DEFAULT_FALLBACK_MODEL

  try {
    return await callGroqModel(primaryModel, messages, apiKey)
  } catch (error: any) {
    // If the error is a 429 Rate Limit, do NOT try the fallback model on the same account
    if (error instanceof GroqApiError && error.status === 429) {
      throw error
    }

    // For transient server errors, 404 model not found, or model deprecation, attempt fallback
    console.warn(`Primary model ${primaryModel} failed. Attempting fallback to ${fallbackModel}...`, error)

    try {
      return await callGroqModel(fallbackModel, messages, apiKey)
    } catch (fallbackError: any) {
      console.error(`Fallback model ${fallbackModel} also failed:`, fallbackError)
      throw fallbackError
    }
  }
}
