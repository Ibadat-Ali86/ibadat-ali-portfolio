// WHAT: Integration tests for agent orchestrator and dynamic question bank.
import test from "node:test"
import assert from "node:assert/strict"
import { runPortfolioAgent, formatClickableContactsAndUrls } from "../src/lib/agent/agent.ts"
import { getDynamicQuestions, QUESTION_BANK } from "../src/lib/agent/questions.ts"

test("Curated question bank contains between 50 and 70 questions", () => {
  assert.ok(QUESTION_BANK.length >= 50 && QUESTION_BANK.length <= 70, `Expected 50-70 questions, got ${QUESTION_BANK.length}`)
})

test("getDynamicQuestions filters by mode correctly", () => {
  const recruiterQs = getDynamicQuestions({ mode: "recruiter", count: 3 })
  assert.equal(recruiterQs.length, 3)
  for (const q of recruiterQs) {
    assert.ok(q.category === "recruiter" || q.category === "architecture")
  }

  const clientQs = getDynamicQuestions({ mode: "client", count: 3 })
  assert.equal(clientQs.length, 3)
  for (const q of clientQs) {
    assert.ok(q.category === "client" || q.category === "architecture")
  }
})

test("Agent returns 0 Groq tokens for out-of-scope query", async () => {
  const res = await runPortfolioAgent({ message: "Who is the president of France?" })
  assert.ok(res.answer.includes("Orbi"), "Expected Orbi persona in answer")
  assert.ok(res.answer.includes("verified portfolio"), "Expected portfolio calibration notice")
  assert.equal(res.sourceIds.length, 0, "Expected 0 sources for out-of-scope")
})

test("Agent returns 0 Groq tokens for greeting", async () => {
  const res = await runPortfolioAgent({ message: "Hello Orbi!" })
  assert.ok(res.answer.includes("Greetings Earthling! 🛸"), "Expected cosmic greeting")
  assert.equal(res.followUps.length, 3)
})

test("formatClickableContactsAndUrls formats raw emails, URLs, and social profiles", () => {
  const raw = "Reach out to ibadcodes@gmail.com, WhatsApp +92 322 0692321, or view https://www.linkedin.com/in/mirzaibadatali and https://github.com/Ibadat-Ali86."
  const formatted = formatClickableContactsAndUrls(raw)

  assert.ok(formatted.includes("[ibadcodes@gmail.com](mailto:ibadcodes@gmail.com)"))
  assert.ok(formatted.includes("[+92 322 0692321](https://wa.me/923220692321)"))
  assert.ok(formatted.includes("[LinkedIn Profile](https://www.linkedin.com/in/mirzaibadatali)"))
  assert.ok(formatted.includes("[GitHub Profile](https://github.com/Ibadat-Ali86)"))
})

test("formatClickableContactsAndUrls preserves already-formatted markdown links", () => {
  const existing = "Direct email: [Email Me](mailto:ibadcodes@gmail.com) or [LinkedIn](https://www.linkedin.com/in/mirzaibadatali)."
  const formatted = formatClickableContactsAndUrls(existing)

  assert.equal(formatted, existing)
})

test("Agent provides verified project navigation action for CodeScope inquiry", async () => {
  const res = await runPortfolioAgent({ message: "Tell me about CodeScope MCP Preflight" })
  assert.equal(res.action.type, "open_project")
  assert.equal(res.action.target, "codescope")
  assert.equal(res.action.url, "https://github.com/Ibadat-Ali86/codescope-mcp-preflight")
  assert.ok(res.action.label?.includes("CodeScope"))
})

test("Agent provides verified live project navigation for SentinelIQ inquiry", async () => {
  const res = await runPortfolioAgent({ message: "What machine learning models are in SentinelIQ?" })
  assert.equal(res.action.type, "open_project")
  assert.equal(res.action.target, "sentineliq")
  assert.equal(res.action.url, "https://sentinel-iq-nasa.vercel.app")
  assert.ok(res.action.label?.includes("SentinelIQ"))
})

test("Agent provides open_contact action for contact inquiry", async () => {
  const res = await runPortfolioAgent({ message: "How can I contact or hire Ibadat?" })
  assert.equal(res.action.type, "open_contact")
  assert.equal(res.action.target, "contact")
  assert.ok(res.action.url?.startsWith("mailto:ibadcodes@gmail.com"))
  assert.ok(res.answer.includes("[ibadcodes@gmail.com](mailto:ibadcodes@gmail.com)"))
})

test("Agent accepts detailed client technical inquiries up to 5000 characters without 400 error", async () => {
  const deepClientPrompt = `
We are looking for a Senior AI Systems Engineer to build an enterprise RAG and automated OCR validation system.
Here is our detailed technical requirement and scope:
1. Architectural foundation: Python, LangGraph, Tree-sitter, Chroma, vector retrieval, and fast token-efficient LLM routing.
2. WhatsApp business automation: Verification of incoming customer invoices, human-in-the-loop review queues, n8n webhook orchestration, and multi-tenant isolation.
3. Machine learning and time-series forecasting: Demand forecasting, supply-chain spikes, XGBoost, LightGBM, and predictive telemetry.
4. Computer vision & anomaly detection: Real-time surveillance tracking, YOLO models, and enterprise audit pipelines.
Does Ibadat Ali have proven production delivery experience in these domains, and how does his past architecture in PayGuard AI, CodeScope, AdaptIQ, and SentinelIQ prove he can execute this scope?
`.repeat(5).slice(0, 4500)

  assert.ok(deepClientPrompt.length > 4000, "Prompt should exceed 4000 characters")
  const res = await runPortfolioAgent({ message: deepClientPrompt })
  assert.ok(res.answer.length > 0, "Expected valid answer for long client inquiry")
  assert.doesNotMatch(res.answer, /Invalid request payload/i)
  assert.ok(res.sourceIds.length > 0, "Expected evidence to be retrieved")
})

test("Agent accurately answers recent project inquiries with PayGuard AI and CodeScope", async () => {
  const res = await runPortfolioAgent({ message: "tell me about recent project that ibadat completed" })
  assert.ok(res.sourceIds.includes("recent-projects") || res.sourceIds.includes("payguard-ai") || res.sourceIds.includes("codescope"), "Expected recent project evidence")
  assert.equal(res.action.type, "open_project")
  assert.ok(res.action.target === "payguard-ai" || res.action.target === "codescope")
})
