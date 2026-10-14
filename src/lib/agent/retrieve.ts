// WHAT: Multi-stage retrieval pipeline with score filtering and entity diversification.
// WHY : Prevents search result monopolization by a single project and guarantees
//       that broad inquiries retrieve cross-cutting evidence from multiple entities.
// TRADEOFF: Diversification caps chunks per entity to 2, trading hyper-deep single-entity
//           context for balanced portfolio coverage.

import { searchKnowledge } from "./search"
import { normalizeQuery, expandAliases } from "./normalize"
import type { SearchResult } from "./types"

const DEFAULT_MIN_SCORE = 10.0
const DEFAULT_MAX_CHUNKS = 5
const MAX_CHUNKS_PER_ENTITY = 2

/**
 * Ensures returned chunks span diverse entities rather than clustering under one single project.
 */
export function diversifyByEntity(
  results: SearchResult[],
  maxResults: number = DEFAULT_MAX_CHUNKS,
  maxPerEntity: number = MAX_CHUNKS_PER_ENTITY
): SearchResult[] {
  const entityCounts = new Map<string, number>()
  const selected: SearchResult[] = []
  const overflow: SearchResult[] = []

  for (const item of results) {
    const count = entityCounts.get(item.entityId) || 0
    if (count < maxPerEntity) {
      entityCounts.set(item.entityId, count + 1)
      selected.push(item)
    } else {
      overflow.push(item)
    }

    if (selected.length >= maxResults) {
      break
    }
  }

  // If we haven't reached maxResults and have overflow chunks, backfill
  if (selected.length < maxResults && overflow.length > 0) {
    for (const item of overflow) {
      selected.push(item)
      if (selected.length >= maxResults) {
        break
      }
    }
  }

  return selected
}

/**
 * Retrieves the most relevant, diversified portfolio chunks for a query.
 */
export function retrievePortfolioContext(
  query: string,
  options?: {
    minScore?: number
    maxChunks?: number
  }
): SearchResult[] {
  const minScore = options?.minScore ?? DEFAULT_MIN_SCORE
  const maxChunks = options?.maxChunks ?? DEFAULT_MAX_CHUNKS

  const normalized = normalizeQuery(query)
  const expanded = expandAliases(normalized)

  // Stage 1 & 2: Search with expanded query
  const rawResults = searchKnowledge(expanded, 15)

  // Stage 3: Score filtering
  const filtered = rawResults.filter((r) => r.score >= minScore)

  // If score filtering was too aggressive and produced zero results, keep the top match if score > 0.3
  const candidatePool =
    filtered.length > 0
      ? filtered
      : rawResults.filter((r) => r.score >= 0.3).slice(0, 3)

  // Stage 4: Entity diversification
  return diversifyByEntity(candidatePool, maxChunks)
}

// Backward-compatible basic retrieval
export function retrieve(query: string): SearchResult[] {
  return retrievePortfolioContext(query)
}
