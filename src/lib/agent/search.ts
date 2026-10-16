// WHAT: In-memory BM25 full-text search index powered by MiniSearch.
// WHY : Provides sub-millisecond, zero-cost keyword and fuzzy retrieval across
//       all portfolio knowledge chunks without requiring a remote vector database.
// TRADEOFF: In-memory index resides on the server; rebuilds on cold-start (takes <10ms for this corpus).

import MiniSearch from "minisearch"
import { loadAllChunks } from "./knowledge"
import type { KnowledgeChunk, SearchResult } from "./types"

const STOP_WORDS = new Set([
  "a", "about", "an", "and", "are", "as", "at", "be", "by", "for", "from",
  "has", "have", "had", "how", "in", "is", "it", "of", "on", "or", "that",
  "the", "this", "to", "was", "were", "what", "when", "where", "which",
  "who", "why", "will", "won", "with", "did", "do", "does", "can", "could", "would", "should"
])

function getMiniSearchCtor(): any {
  if (typeof MiniSearch === "function") {
    return MiniSearch
  }
  if ((MiniSearch as any)?.default && typeof (MiniSearch as any).default === "function") {
    return (MiniSearch as any).default
  }
  try {
    const req = typeof require !== "undefined" ? require("minisearch") : null
    if (typeof req === "function") return req
    if (req?.default && typeof req.default === "function") return req.default
  } catch {
    // bundler environment
  }
  return MiniSearch
}

let indexInstance: MiniSearch<KnowledgeChunk> | null = null

/**
 * Initializes and populates the MiniSearch instance lazily.
 */
export function getSearchIndex(): MiniSearch<KnowledgeChunk> {
  if (indexInstance) {
    return indexInstance
  }

  const chunks = loadAllChunks()

  const Ctor = getMiniSearchCtor()
  const instance = new Ctor({
    fields: [
      "title",
      "text",
      "content",
      "keywordsText",
      "technologiesText",
      "categoryText"
    ],
    storeFields: [
      "id",
      "entityId",
      "entityType",
      "section",
      "title",
      "text",
      "content",
      "sourceUrl",
      "keywords",
      "tags",
      "technologies",
      "category",
      "domain"
    ],
    processTerm: (term: string) => {
      const lower = term.toLowerCase()
      return STOP_WORDS.has(lower) ? null : lower
    },
    searchOptions: {
      boost: {
        title: 4,
        keywordsText: 3,
        technologiesText: 2,
        categoryText: 2,
        text: 1,
        content: 1
      },
      fuzzy: 0.2,
      prefix: true
    }
  }) as MiniSearch<KnowledgeChunk>

  instance.addAll(chunks)
  indexInstance = instance
  return instance
}

/**
 * Executes a full-text search against the in-memory portfolio corpus.
 */
export function searchKnowledge(query: string, limit: number = 10): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return []
  }

  const index = getSearchIndex()
  const rawResults = index.search(query, {
    prefix: true,
    fuzzy: 0.2
  })

  return rawResults.slice(0, limit).map((r: any) => {
    return {
      id: String(r.id),
      entityId: String(r.entityId || r.id),
      entityType: r.entityType,
      section: String(r.section || "general"),
      title: String(r.title || ""),
      text: String(r.text || r.content || ""),
      content: String(r.content || r.text || ""),
      keywords: Array.isArray(r.keywords) ? r.keywords : [],
      tags: Array.isArray(r.tags) ? r.tags : (r.keywords || []),
      technologies: Array.isArray(r.technologies) ? r.technologies : [],
      category: Array.isArray(r.category) ? r.category : [],
      domain: Array.isArray(r.domain) ? r.domain : undefined,
      sourceUrl: r.sourceUrl ? String(r.sourceUrl) : null,
      score: r.score,
      match: r.match
    } as SearchResult
  })
}

// Backward-compatible alias for existing draft references
export const searchIndex = {
  search: (query: string, opts?: any) => getSearchIndex().search(query, opts),
  addAll: (docs: KnowledgeChunk[]) => getSearchIndex().addAll(docs)
}