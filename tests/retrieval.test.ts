// WHAT: Unit tests for the portfolio retrieval pipeline and entity diversification.
import test from "node:test"
import assert from "node:assert/strict"
import { retrievePortfolioContext, diversifyByEntity } from "../src/lib/agent/retrieve.ts"
import { searchKnowledge } from "../src/lib/agent/search.ts"

test("Search returns relevant chunk for CodeScope", () => {
  const results = searchKnowledge("CodeScope MCP Preflight", 5)
  assert.ok(results.length > 0, "Expected at least 1 search result")
  assert.equal(results[0].entityId, "codescope", "Expected top result to be codescope")
})

test("Search returns relevant chunk for PayGuard", () => {
  const results = searchKnowledge("PayGuard WhatsApp OCR", 5)
  assert.ok(results.length > 0, "Expected at least 1 search result")
  assert.equal(results[0].entityId, "payguard-ai", "Expected top result to be payguard-ai")
})

test("Entity diversification caps chunks per entity to 2", () => {
  const results = retrievePortfolioContext("AI agents and machine learning", {
    maxChunks: 5
  })
  assert.ok(results.length > 0, "Expected retrieval results")

  const counts: Record<string, number> = {}
  for (const item of results) {
    counts[item.entityId] = (counts[item.entityId] || 0) + 1
    assert.ok(counts[item.entityId] <= 2, `Entity ${item.entityId} exceeded max chunks`)
  }
})
