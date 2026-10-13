# Repository Guidelines

This workspace is preparing the portfolio knowledge base for the RAG agent. The architecture and project schema are defined in `Ibadat_Ali_Portfolio_RAG_Agent_Blueprint_v2.md`; follow that document when shaping data. Keep the corpus limited to projects the portfolio owner approved for representation.

## Project Structure & Module Organization

Project records live in `src/data/portfolio/projects/`, one JSON file per approved project, named with its stable kebab-case ID (for example, `codescope.json`). The workspace contains project knowledge only; no runtime source, test suite, or static assets have been added.

Do not create records for `csv-cleaner`, `learning-dashboard`, `mnist`, `resume-builder`, or `spam-classifier`. These projects are excluded from both the portfolio showcase and the RAG corpus.

## Build, Test, and Development Commands

There is no package manifest or application build command yet. To check an individual record's JSON syntax, run:

```sh
python -m json.tool src/data/portfolio/projects/codescope.json > /dev/null
```

This checks syntax, not schema completeness. Compare fields and allowed status values with the `PortfolioProject` definition in the blueprint.

## Data Style and Naming

Use two-space JSON indentation, double-quoted strings, and arrays for categories, architecture, technologies, evidence, outcomes, and claims. Keep filenames and `id` values aligned in kebab case. Preserve the documented fields; update the blueprint before changing the shared schema. Put source attribution in `evidence`, and distinguish portfolio statements from repository claims.

## Testing Guidelines

No test framework or coverage threshold is configured. Before adding or changing records, parse every affected JSON file and review its provenance, allowed claims, restricted claims, and privacy boundaries. Keep unverified metrics out of outcomes and allowed claims.

## Commits and Pull Requests

This repository was initialized for the portfolio RAG knowledge workspace and currently has no commits or remote. No convention can be inferred from Git history yet; use concise Conventional Commit messages such as `data: add CodeScope project evidence`. Pull requests should state which records changed, list sources reviewed, note unresolved evidence, and confirm a JSON syntax check.

## Security and Configuration

Do not add credentials, private client implementation details, patient information, employee submissions, or uploaded files. For private work, include only details already approved in the public portfolio case study. Treat README and live-site metrics as attributed claims unless independently supported.
