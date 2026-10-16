# Graph Report - Building RAG AGENT FOR PORTFOLIO  (2026-10-16)

## Corpus Check
- 65 files · ~181,361 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 2, .css 2, .example 1)

## Summary
- 399 nodes · 579 edges · 29 communities (23 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `252c9082`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Ibadat_Ali_Portfolio_RAG_Agent_Blueprint_v2.md
- ChatWindow.tsx
- agent.ts
- types.ts
- portfolio-ai-agent/package.json
- compilerOptions
- compilerOptions
- package.json
- 9. Internal Agent Workflow
- 51. Manual Learning Roadmap
- devDependencies
- Repository Guidelines
- 35. Free-Tier Protection
- 53. Evaluation Metrics
- 68. What You Will Learn by Building This
- 71. Build Checklist
- 37. Grounding Rules
- portfolio-ai-agent/app/layout.tsx
- 42. Error and Fallback UX
- 4. Recommended Languages
- 64. SEO / Portfolio Enhancements That Improve RAG
- portfolio-ai-agent/README.md
- 1. Important Naming and Model Correction
- portfolio-ai-agent/AGENTS.md
- 72. Definition of Done
- Ibadat Ali Portfolio Personal AI Agent

## God Nodes (most connected - your core abstractions)
1. `runPortfolioAgent()` - 20 edges
2. `compilerOptions` - 16 edges
3. `getDynamicQuestions()` - 16 edges
4. `compilerOptions` - 15 edges
5. `ChatWindow()` - 12 edges
6. `9. Internal Agent Workflow` - 11 edges
7. `Home()` - 10 edges
8. `ConversationMode` - 10 edges
9. `51. Manual Learning Roadmap` - 10 edges
10. `react` - 9 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `getDynamicQuestions()`  [EXTRACTED]
  portfolio-ai-agent/app/api/assistant/route.ts → src/lib/agent/questions.ts
- `handleModeChange()` --calls--> `getDynamicQuestions()`  [EXTRACTED]
  portfolio-ai-agent/app/page.tsx → src/lib/agent/questions.ts
- `handleReset()` --calls--> `getDynamicQuestions()`  [EXTRACTED]
  portfolio-ai-agent/app/page.tsx → src/lib/agent/questions.ts
- `POST()` --calls--> `runPortfolioAgent()`  [EXTRACTED]
  portfolio-ai-agent/app/api/assistant/route.ts → src/lib/agent/agent.ts
- `POST()` --calls--> `detectIntent()`  [EXTRACTED]
  portfolio-ai-agent/app/api/assistant/route.ts → src/lib/agent/relevance.ts

## Import Cycles
- None detected.

## Communities (29 total, 6 thin omitted)

### Community 0 - "Ibadat_Ali_Portfolio_RAG_Agent_Blueprint_v2.md"
Cohesion: 0.03
Nodes (61): 0. Final Decision, 10. Why No Vector Database in V1, 11. Knowledge Base Design, 12. Recommended Project Schema, 13. Chunking Strategy, 14. Search Index, 15. Better Retrieval Without AI Calls, 16. Code-Based Intent Routing (+53 more)

### Community 1 - "ChatWindow.tsx"
Cohesion: 0.08
Nodes (41): Home(), askQuestion(), handleModeChange(), handleReset(), handleSubmit(), INITIAL_WELCOME, nextConfig, next (+33 more)

### Community 2 - "agent.ts"
Cohesion: 0.10
Nodes (30): checkRateLimit(), POST(), rateLimitMap, checkRateLimit(), POST(), rateLimitMap, runPortfolioAgent(), APPROVED_DOMAIN_PREFIXES (+22 more)

### Community 3 - "types.ts"
Cohesion: 0.09
Nodes (29): minisearch, createChunk(), getPortfolioDataDir(), loadAllChunks(), safeReadJson(), ALIAS_MAP, buildRetrievalQuery(), expandAliases() (+21 more)

### Community 4 - "portfolio-ai-agent/package.json"
Cohesion: 0.06
Nodes (33): eslintConfig, dependencies, groq-sdk, minisearch, next, react, react-dom, zod (+25 more)

### Community 5 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowJs, baseUrl, esModuleInterop, isolatedModules, jsx, lib, module (+9 more)

### Community 7 - "package.json"
Cohesion: 0.17
Nodes (11): description, keywords, name, private, scripts, build, dev, lint (+3 more)

### Community 8 - "9. Internal Agent Workflow"
Cohesion: 0.18
Nodes (11): 9. Internal Agent Workflow, Step 10 — Remember, Step 1 — Receive, Step 2 — Validate, Step 3 — Normalize, Step 4 — Retrieve, Step 5 — Filter, Step 6 — Compose Context (+3 more)

### Community 9 - "51. Manual Learning Roadmap"
Cohesion: 0.20
Nodes (10): 51. Manual Learning Roadmap, Phase 1 — Understand the data, Phase 2 — Build local search, Phase 3 — Build evidence gating, Phase 4 — Connect Groq, Phase 5 — Add structured output, Phase 6 — Add chat UI, Phase 7 — Add memory (+2 more)

### Community 10 - "devDependencies"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, tsx, @types/node, @types/react (+2 more)

### Community 11 - "Repository Guidelines"
Cohesion: 0.25
Nodes (7): Build, Test, and Development Commands, Commits and Pull Requests, Data Style and Naming, Project Structure & Module Organization, Repository Guidelines, Security and Configuration, Testing Guidelines

### Community 12 - "35. Free-Tier Protection"
Cohesion: 0.25
Nodes (8): 35. Free-Tier Protection, A. Message length, B. History length, C. Retrieved context, D. Output size, E. No-evidence shortcut, F. Client cooldown, G. Error handling

### Community 13 - "53. Evaluation Metrics"
Cohesion: 0.25
Nodes (8): 53. Evaluation Metrics, API efficiency, Groundedness, Latency, Refusal accuracy, Retrieval hit rate, Source accuracy, Status accuracy

### Community 14 - "68. What You Will Learn by Building This"
Cohesion: 0.29
Nodes (7): 68. What You Will Learn by Building This, Agent engineering, Backend engineering, Frontend engineering, LLM engineering, Production thinking, RAG

### Community 15 - "71. Build Checklist"
Cohesion: 0.29
Nodes (7): 71. Build Checklist, Agent, Groq, Knowledge, Quality, Retrieval, UI

### Community 16 - "37. Grounding Rules"
Cohesion: 0.33
Nodes (6): 37. Grounding Rules, Rule 1, Rule 2, Rule 3, Rule 4, Rule 5

### Community 17 - "portfolio-ai-agent/app/layout.tsx"
Cohesion: 0.33
Nodes (3): geistMono, geistSans, metadata

### Community 18 - "42. Error and Fallback UX"
Cohesion: 0.40
Nodes (5): 42. Error and Fallback UX, Groq unavailable, Invalid request, No evidence, Rate limit reached

### Community 19 - "4. Recommended Languages"
Cohesion: 0.40
Nodes (5): 4. Recommended Languages, Main language: TypeScript, Python: optional, not required for runtime, SQL: optional later, Supporting formats

### Community 20 - "64. SEO / Portfolio Enhancements That Improve RAG"
Cohesion: 0.40
Nodes (5): 64. SEO / Portfolio Enhancements That Improve RAG, Add consistent project architecture blocks, Add measurable outcomes only when verified, Add “Why this stack?” fields, Keep project status visible

### Community 21 - "portfolio-ai-agent/README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 22 - "1. Important Naming and Model Correction"
Cohesion: 0.67
Nodes (3): 1. Important Naming and Model Correction, Current Qwen model on Groq, Groq vs Grok

## Knowledge Gaps
- **9 isolated node(s):** `groq-sdk`, `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react` (+4 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 261 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `ChatWindow.tsx` to `portfolio-ai-agent/app/layout.tsx`, `agent.ts`, `portfolio-ai-agent/package.json`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `groq-sdk`, `react-dom`, `@tailwindcss/turbopack` to the rest of the system?**
  _9 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Ibadat_Ali_Portfolio_RAG_Agent_Blueprint_v2.md` be split into smaller, more focused modules?**
  _Cohesion score 0.03225806451612903 - nodes in this community are weakly interconnected._
- **Why does `devDependencies` connect `devDependencies` to `portfolio-ai-agent/package.json`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Should `ChatWindow.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07609427609427609 - nodes in this community are weakly interconnected._
- **Why does `react` connect `ChatWindow.tsx` to `portfolio-ai-agent/package.json`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Should `agent.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09966777408637874 - nodes in this community are weakly interconnected._