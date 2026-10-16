// WHAT: Integration tests for agent orchestrator and dynamic question bank.
import test from "node:test"
import assert from "node:assert/strict"
import { runPortfolioAgent } from "../src/lib/agent/agent.ts"
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
