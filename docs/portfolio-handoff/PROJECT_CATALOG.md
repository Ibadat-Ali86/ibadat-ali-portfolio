# PROJECT_CATALOG.md

## Canonical project inventory

| # | Project | Tier | Category | Status |
|---:|---|---|---|---|
| 01 | CodeScope MCP Preflight | FEATURED | AI Agents & Developer Tools | LOCAL TOOL |
| 02 | CareVision | FEATURED | AI Health & Applied ML | LIVE |
| 03 | SentinelIQ | FEATURED | Predictive Maintenance | LIVE |
| 04 | TopoLite-KD | FEATURED | AI Health & Research | RESEARCH |
| 05 | AdaptIQ / ForecastAI | FEATURED | Forecasting & Decision Systems | LIVE |
| 06 | VITAL-LINK | FEATURED | AI Health & Applied ML | PROTOTYPE |
| 07 | Evershine Academy LMS | FEATURED | Full-Stack & Client Platforms | PRIVATE CLIENT |
| 08 | AI Resume Builder | SELECTED | Full-Stack & Client Platforms | LIVE |
| 09 | Personalized AI Learning Dashboard | SELECTED | Full-Stack & Client Platforms | CASE STUDY |
| 10 | COVID-19 Global Analytics Platform | SELECTED | Analytics & BI | CASE STUDY |
| 11 | Pakistan E-commerce Price Prediction | SELECTED | Data Science & Forecasting | ML CASE STUDY |
| 12 | Vendor Performance Analysis | SELECTED | Analytics & BI | ANALYTICS |
| 13 | MNIST Logistic Regression | LAB | ML & Data Labs | ML LAB |
| 14 | Email / SMS Spam Classifier | LAB | ML & Data Labs | ML LAB |
| 15 | Netflix Data Analysis | LAB | Analytics & BI | DATA LAB |
| 16 | Employee Information Form | LAB | ML & Data Labs | R SHINY LAB |
| 17 | CSV Data Cleaner | LAB | ML & Data Labs | R SHINY TOOL |

## Display policy

- **Featured:** large, editorial case-study cards with problem, system architecture, responsibility, constraints, and links.
- **Selected:** medium cards with concise problem/solution/stack copy.
- **Lab:** compact cards focused on a single technical exercise or utility.
- Parent collection repositories are hidden. Their strong child projects remain visible through direct child paths.
- One project must never be represented by two cards merely because it exists in more than one repository or folder.

## 01. CodeScope MCP Preflight

- **Tier:** FEATURED
- **Category:** AI Agents & Developer Tools
- **Status label:** `LOCAL TOOL`
- **Portfolio hook:** Local-first repository intelligence that decides whether code should be reused, extended, or created.
- **Tech stack:** Python; MCP; Tree-sitter; sentence-transformers; Chroma; CLI
- **Links:** GitHub: https://github.com/Ibadat-Ali86/codescope-mcp-preflight
- **Editorial safeguard:** Use repository-documented test and coverage figures only after re-running the current suite.

## 02. CareVision

- **Tier:** FEATURED
- **Category:** AI Health & Applied ML
- **Status label:** `LIVE`
- **Portfolio hook:** Multimodal clinical decision-support PWA designed around explainability, secure workflows, and practical field use.
- **Tech stack:** React 18; TypeScript; Vite; Tailwind; Radix UI; Zustand; FastAPI; PostgreSQL; SQLAlchemy; Gemini 2.0 Flash
- **Links:** GitHub: https://github.com/Ibadat-Ali86/carevision · Live / external: https://carevision-chw.vercel.app/landing
- **Editorial safeguard:** Medical decision support only; avoid diagnostic or clinical-outcome claims.

## 03. SentinelIQ

- **Tier:** FEATURED
- **Category:** Predictive Maintenance
- **Status label:** `LIVE`
- **Portfolio hook:** NASA turbofan remaining-useful-life forecasting with anomaly detection, explainability, and maintenance planning.
- **Tech stack:** PyTorch; TCN; LSTM; Isolation Forest; Autoencoder; SHAP; PuLP; FastAPI; Next.js 15; PostgreSQL; Docker
- **Links:** GitHub: https://github.com/Ibadat-Ali86/sentinel-iq-cmpass-nasa-rul-prediction · Live / external: https://sentinel-iq-nasa.vercel.app
- **Editorial safeguard:** Do not publish a winning-model or RMSE claim until contradictory repository tables are reconciled.

## 04. TopoLite-KD

- **Tier:** FEATURED
- **Category:** AI Health & Research
- **Status label:** `RESEARCH`
- **Portfolio hook:** Lightweight topology-aware knowledge distillation for COVID-19 CT-slice classification.
- **Tech stack:** PyTorch; depthwise-separable CNN; Coordinate Attention; persistent homology; GUDHI; EfficientNet-B0; Grad-CAM
- **Links:** GitHub: https://github.com/Ibadat-Ali86/TopoLite-KD-Efficient-Topology-Aware-Knowledge-Distillation-for-COVID-19-CT-Slice-Classification · Live / external: https://www.kaggle.com/code/ibadatali/topokd-research-finalv
- **Editorial safeguard:** Present as academic research; preserve authorship and limitations; no clinical deployment claims.

## 05. AdaptIQ / ForecastAI

- **Tier:** FEATURED
- **Category:** Forecasting & Decision Systems
- **Status label:** `LIVE`
- **Portfolio hook:** An end-to-end forecasting SaaS that turns uploaded retail data into forecasts, scenarios, confidence ranges, monitoring, and reports.
- **Tech stack:** Prophet; XGBoost; SARIMA; LSTM; FastAPI; React; Vite; Chart.js; Docker; Hugging Face
- **Links:** GitHub: https://github.com/Ibadat-Ali86/Demand-Sales-Walmart-Forecasting · Live / external: https://huggingface.co/spaces/ibadatali/walmart-sales-forecasting-saas
- **Editorial safeguard:** This is the canonical Walmart case study. The standalone repository is described as an earlier development stage, not a second card. Avoid “98.77% accuracy” unless the metric is precisely verified and named.

## 06. VITAL-LINK

- **Tier:** FEATURED
- **Category:** AI Health & Applied ML
- **Status label:** `PROTOTYPE`
- **Portfolio hook:** A multimodal clinical prototype combining chest X-ray, lung audio, and patient vitals into one assisted-review workflow.
- **Tech stack:** Python; Flask; Gemini 2.0 Flash; Chart.js; jsPDF
- **Links:** GitHub: https://github.com/Ibadat-Ali86/data-science-portfolio/tree/main/projects/02-multimodal-medical-diagnosis-ai-gemini
- **Editorial safeguard:** Keep the child project while hiding its parent collection repository from the visible portfolio.

## 07. Evershine Academy LMS

- **Tier:** FEATURED
- **Category:** Full-Stack & Client Platforms
- **Status label:** `PRIVATE CLIENT`
- **Portfolio hook:** A private client education platform bringing admissions, programs, campus information, and LMS access into one public experience.
- **Tech stack:** Next.js 15; TypeScript; Tailwind CSS; Prisma; PostgreSQL; role-based dashboards
- **Links:** Source: private; must never be rendered · Live / external: https://evershineacadmey.com/
- **Editorial safeguard:** Never show a GitHub/source link, repository status, commit history, or source-access wording. Display only the live-site CTA and “Private Client Project.”

## 08. AI Resume Builder

- **Tier:** SELECTED
- **Category:** Full-Stack & Client Platforms
- **Status label:** `LIVE`
- **Portfolio hook:** A guided resume-building application with structured forms, live state, authentication, and PDF export.
- **Tech stack:** React 18; TypeScript; Tailwind; Supabase; Zustand; React Hook Form; Zod; Radix UI; html2canvas; jsPDF; Vite
- **Links:** GitHub: https://github.com/Ibadat-Ali86/Interactive-Resume-Builder · Live / external: https://snap-resume-p8lzooqtt-ibadcodes-6074s-projects.vercel.app
- **Editorial safeguard:** Use the verified live deployment; keep copy outcome-focused.

## 09. Personalized AI Learning Dashboard

- **Tier:** SELECTED
- **Category:** Full-Stack & Client Platforms
- **Status label:** `CASE STUDY`
- **Portfolio hook:** A learning-management workspace for goals, resources, reminders, reports, analytics, and AI-assisted study support.
- **Tech stack:** Flask; SQLAlchemy; Alembic; JWT; APScheduler; Gemini; PyPDF2; Pillow; pytesseract; moviepy; JavaScript
- **Links:** GitHub: https://github.com/Ibadat-Ali86/new
- **Editorial safeguard:** Display this professional title instead of the repository name “new.”

## 10. COVID-19 Global Analytics Platform

- **Tier:** SELECTED
- **Category:** Analytics & BI
- **Status label:** `CASE STUDY`
- **Portfolio hook:** A full-stack pandemic analytics platform with automated ETL, database-backed APIs, and an interactive dashboard.
- **Tech stack:** Python; MySQL; FastAPI; React; TypeScript; Tailwind; Vite; Docker
- **Links:** GitHub: https://github.com/Ibadat-Ali86/Data_Analysis_Projects/tree/main/COVID19-Data-Analytics-Platform
- **Editorial safeguard:** Keep the child project; hide the parent collection repository.

## 11. Pakistan E-commerce Price Prediction

- **Tier:** SELECTED
- **Category:** Data Science & Forecasting
- **Status label:** `ML CASE STUDY`
- **Portfolio hook:** A price-prediction workflow built around Pakistani e-commerce transaction data and deployable inference.
- **Tech stack:** Python; pandas; scikit-learn; Random Forest; Gradient Boosting; Flask; Jupyter
- **Links:** GitHub: https://github.com/Ibadat-Ali86/data-science-portfolio/tree/main/projects/01-pakistan-ecommerce-price-prediction
- **Editorial safeguard:** Do not publish R² or row-count claims until notebook outputs are checked.

## 12. Vendor Performance Analysis

- **Tier:** SELECTED
- **Category:** Analytics & BI
- **Status label:** `ANALYTICS`
- **Portfolio hook:** A procurement and inventory analysis workflow connecting sales, purchases, pricing, invoices, and vendor performance.
- **Tech stack:** Python; pandas; SQL; SQLite; Jupyter; data visualization
- **Links:** GitHub: https://github.com/Ibadat-Ali86/Data_Analysis_Projects/tree/main/Vendor_Performance_Analysis_Project
- **Editorial safeguard:** Large dataset counts are repository claims; show only after validation or label as documented scope.

## 13. MNIST Logistic Regression

- **Tier:** LAB
- **Category:** ML & Data Labs
- **Status label:** `ML LAB`
- **Portfolio hook:** A compact handwritten-digit classification pipeline with custom IDX loading, preprocessing, training, evaluation, persistence, and CLI prediction.
- **Tech stack:** Python; NumPy; scikit-learn; Logistic Regression; SGD; PCA; CLI
- **Links:** GitHub: https://github.com/Ibadat-Ali86/ML_Projects/tree/main/data/MNIST
- **Editorial safeguard:** Keep as a compact lab; verify reported accuracy before publishing.

## 14. Email / SMS Spam Classifier

- **Tier:** LAB
- **Category:** ML & Data Labs
- **Status label:** `ML LAB`
- **Portfolio hook:** A Streamlit text-classification app using normalized text, TF-IDF features, and logistic regression.
- **Tech stack:** Python; NLTK; TF-IDF; Logistic Regression; Streamlit
- **Links:** GitHub: https://github.com/Ibadat-Ali86/ML_Projects/tree/main/data/Spam%20Email%20Classifier/TASK%201/sms-spam-classifier-main
- **Editorial safeguard:** Remove the hard-coded local Windows path before calling it production-ready.

## 15. Netflix Data Analysis

- **Tier:** LAB
- **Category:** Analytics & BI
- **Status label:** `DATA LAB`
- **Portfolio hook:** Exploratory analysis of movie metadata, genres, release patterns, popularity, and feature relationships.
- **Tech stack:** Python; pandas; Matplotlib; seaborn; Jupyter
- **Links:** GitHub: https://github.com/Ibadat-Ali86/Netflix_DataAnalysis
- **Editorial safeguard:** Present as exploratory analysis, not predictive modeling.

## 16. Employee Information Form

- **Tier:** LAB
- **Category:** ML & Data Labs
- **Status label:** `R SHINY LAB`
- **Portfolio hook:** A reactive R Shiny form with validation, dates, file upload, and structured output.
- **Tech stack:** R; Shiny; reactive programming; form validation
- **Links:** GitHub: https://github.com/Ibadat-Ali86/R_Shiny-Web_Apps/blob/main/Scenario1.R
- **Editorial safeguard:** Keep the app as a child lab; hide the parent collection repository.

## 17. CSV Data Cleaner

- **Tier:** LAB
- **Category:** ML & Data Labs
- **Status label:** `R SHINY TOOL`
- **Portfolio hook:** A small R Shiny utility for uploading, previewing, cleaning, and downloading tabular data.
- **Tech stack:** R; Shiny; CSV parsing; reactive data cleaning
- **Links:** GitHub: https://github.com/Ibadat-Ali86/R_Shiny-Web_Apps/blob/main/Scenario2.R
- **Editorial safeguard:** Keep the app as a child tool; hide the parent collection repository.
