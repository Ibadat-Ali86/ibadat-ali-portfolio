# GITHUB_AND_KAGGLE_AUDIT.md

## Audit outcome

The portfolio uses a **project-first** rather than repository-first model. A repository is only a source container; the visible unit is a coherent project with enough implementation evidence to explain honestly.

## Inclusion logic

- Keep strong child projects from hidden collection repositories.
- Merge duplicate/evolutionary Walmart implementations into one AdaptIQ / ForecastAI case study.
- Exclude uncertain-ownership upstream repositories (`claw-code`, `everything-claude-code`).
- Exclude empty, tiny, duplicate, or generic shell repositories.
- Keep private client work without exposing source links.

## Hidden repositories

- Data_Analysis_Projects (parent collection only)
- ML_Projects (parent collection only)
- R_Shiny-Web_Apps (parent collection only)
- portfolio
- Learning_Dasboard
- My_Python_Projects
- TopoLite-KD alternate tiny duplicate
- claw-code
- everything-claude-code
- data-science-portfolio (parent collection only)

## Metric and claim gates

| Project | Claim risk | Launch rule |
|---|---|---|
| SentinelIQ | README sections disagree on TCN/LSTM RMSE and winner | Do not name a winning model or publish RMSE until current experiments reconcile the contradiction. |
| AdaptIQ / ForecastAI | “98.77% accuracy” is not a standard forecasting description | Publish only a precisely named, reproducible metric such as MAE, RMSE, MAPE, or R². |
| Pakistan E-commerce | R² and row-count claims require notebook confirmation | Omit until outputs are checked. |
| MNIST | Accuracy claim should be reproduced | Show only after running the current pipeline. |
| Vendor Analysis | Dataset-volume figures come from project documentation | Either verify or introduce as “documented dataset scope,” not as independently audited fact. |
| CareVision / VITAL-LINK / TopoLite-KD | Healthcare domain can invite overclaiming | Use research/decision-support language; never claim diagnosis, treatment, or clinical validation. |

## Link policy

- GitHub profile: https://github.com/Ibadat-Ali86
- Kaggle profile: https://www.kaggle.com/ibadatali
- Evershine Academy: live link only; no source URL.
- Parent-repository paths are acceptable for child projects only when the visible card is clearly named after the child project.

## Pre-launch freshness pass

Immediately before deployment, verify live URLs, repository visibility, default branches, and deployment availability. Do not freeze stars, forks, or “last updated” dates into static copy unless fetched at runtime from a reliable source.
