// WHAT: Unit tests for relevance, intent routing, and zero-cost out-of-scope guardrail.
import test from "node:test"
import assert from "node:assert/strict"
import { isOutOfScope, isGreeting, detectIntent, checkEvidence } from "../src/lib/agent/relevance.ts"

test("Detects out-of-scope general trivia without Groq calls", () => {
  assert.equal(isOutOfScope("Who is the president of the United States?"), true)
  assert.equal(isOutOfScope("What is the weather forecast for tomorrow?"), true)
  assert.equal(isOutOfScope("Write a python script to calculate fibonacci"), true)
  assert.equal(isOutOfScope("What is the recipe for chocolate cake?"), true)
})

test("Permits in-scope portfolio inquiries", () => {
  assert.equal(isOutOfScope("Tell me about Ibadat Ali"), false)
  assert.equal(isOutOfScope("What is CodeScope MCP Preflight?"), false)
  assert.equal(isOutOfScope("Can Ibadat build a WhatsApp payment verification system?"), false)
  assert.equal(isOutOfScope("What are his certifications?"), false)
})

test("Detects conversational greetings", () => {
  assert.equal(isGreeting("Hello"), true)
  assert.equal(isGreeting("Hi Orbi"), true)
  assert.equal(isGreeting("Good morning"), true)
  assert.equal(isGreeting("Who are you?"), true)
  // Substantive queries are not pure greetings
  assert.equal(isGreeting("Hello, what is CodeScope?"), false)
})

test("Detects correct intent categories", () => {
  assert.equal(detectIntent("What certifications from Anthropic does he hold?"), "credentials")
  assert.equal(detectIntent("Tell me about his work experience at Soft Shack"), "experience")
  assert.equal(detectIntent("How can I hire Ibadat for a project?"), "contact")
  assert.equal(detectIntent("What is his Python and Docker stack?"), "skills")
  assert.equal(detectIntent("Tell me about the PayGuard AI project"), "project")
})

test("Evidence gate rejects empty or weak results", () => {
  const emptyDecision = checkEvidence([])
  assert.equal(emptyDecision.allowed, false)

  const weakDecision = checkEvidence([{ score: 5.0 } as any])
  assert.equal(weakDecision.allowed, false)

  const strongDecision = checkEvidence([{ score: 25.0 } as any])
  assert.equal(strongDecision.allowed, true)
})
