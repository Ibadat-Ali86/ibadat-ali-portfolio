const projectArt = (slug) => `/assets/generated/project-${slug}.webp`;

export const projects = [
  {
    slug: 'codescope', title: 'CodeScope MCP Preflight', tier: 'featured', category: 'AI Agents & Developer Tools', status: 'LOCAL TOOL',
    hook: 'Local-first MCP server serving Tree-sitter AST intelligence and vector retrieval as tool context for AI agents.',
    metric: 'Agent tool-calling · MCP & RAG', primaryFeature: true,
    problem: 'Autonomous coding agents make conflicting or hallucinated changes without structured repository context.',
    solution: 'A local-first Model Context Protocol (MCP) server combines Tree-sitter parsing and Chroma vector retrieval to ground agent reasoning before code generation.',
    stack: ['Python', 'MCP', 'Tree-sitter', 'sentence-transformers', 'Chroma', 'CLI'], github: 'https://github.com/Ibadat-Ali86/codescope-mcp-preflight', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('codescope'),
    editorialSafeguard: 'Repository figures are intentionally omitted until the current suite is reproduced.'
  },
  {
    slug: 'carevision', title: 'CareVision', tier: 'featured', category: 'AI Health & Applied ML', status: 'LIVE',
    hook: 'Multimodal clinical AI workflow integrating Gemini 2.0 Flash with explainability-first human review gates and offline-capable fallback.',
    metric: 'Multimodal clinical workflow · Gemma 4 Hackathon',
    problem: 'Assisted review requires dependable, explainable workflows with explicit confidence gates rather than opaque generative outputs.',
    solution: 'A multimodal PWA combining Gemini 2.0 Flash structured outputs, step-level audit logging, PostgreSQL persistence, and offline-capable inference fallback.',
    stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind', 'Radix UI', 'Zustand', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Gemini 2.0 Flash'], github: 'https://github.com/Ibadat-Ali86/carevision', live: 'https://carevision-chw.vercel.app/', sourceAccess: 'public', showSourceLink: true, image: projectArt('carevision'), primaryFeature: true,
    editorialSafeguard: 'Research and decision-support context only; no diagnostic, treatment, or clinical-outcome claims.'
  },
  {
    slug: 'sentineliq', title: 'SentinelIQ', tier: 'featured', category: 'Predictive Maintenance', status: 'LIVE',
    hook: 'Predictive maintenance automation combining TCN-LSTM forecasting, dual anomaly detection, SHAP attribution, and PuLP scheduling.',
    metric: 'Predictive maintenance · anomaly detection + scheduling',
    problem: 'Maintenance planning benefits from forecast, anomaly, and explanation signals in one operational flow.',
    solution: 'An automated pipeline connecting sequence models, dual anomaly detection (Isolation Forest + Autoencoder), SHAP attribution, and PuLP intervention scheduling.',
    stack: ['PyTorch', 'TCN', 'LSTM', 'Isolation Forest', 'Autoencoder', 'SHAP', 'PuLP', 'FastAPI', 'Next.js 15', 'PostgreSQL', 'Docker'], github: 'https://github.com/Ibadat-Ali86/sentinel-iq-cmpass-nasa-rul-prediction', live: 'https://sentinel-iq-nasa.vercel.app', sourceAccess: 'public', showSourceLink: true, clientProject: true, image: projectArt('sentineliq'), primaryFeature: true, hasVideo: true,
    editorialSafeguard: 'No winning-model or RMSE claim is shown while repository experiment tables remain contradictory.'
  },
  {
    slug: 'topolite', title: 'TopoLite-KD', tier: 'featured', category: 'AI Health & Research', status: 'RESEARCH',
    hook: 'Lightweight topology-aware knowledge distillation for COVID-19 CT-slice classification.',
    metric: 'Topology-aware KD research',
    problem: 'Research into compact imaging models needs transparent framing of methods and limitations.',
    solution: 'A topology-aware knowledge-distillation approach explores lightweight architectures, attention, and explainability methods.',
    stack: ['PyTorch', 'depthwise-separable CNN', 'Coordinate Attention', 'persistent homology', 'GUDHI', 'EfficientNet-B0', 'Grad-CAM'], github: 'https://github.com/Ibadat-Ali86/TopoLite-KD-Efficient-Topology-Aware-Knowledge-Distillation-for-COVID-19-CT-Slice-Classification', live: null, sourceAccess: 'public', showSourceLink: true, clientProject: true, image: projectArt('topolite'),
    editorialSafeguard: 'Academic research context only; no clinical deployment or validation claim is made.'
  },
  {
    slug: 'adaptiq', title: 'AdaptIQ / ForecastAI', tier: 'featured', category: 'Forecasting & Decision Systems', status: 'LIVE',
    hook: 'Automated demand forecasting SaaS running 4-model ensembles over 580K+ transactions with automated regime selection and scenario reports.',
    metric: 'Demand forecasting · 4-model ensemble',
    problem: 'Forecasting is only useful when teams can move from raw transaction data to automated, interpretable planning outputs.',
    solution: 'An automated forecasting workflow pairing Prophet, XGBoost, SARIMA, and LSTM with regime selection, monitoring hooks, and PDF/CSV report generation.',
    stack: ['Prophet', 'XGBoost', 'SARIMA', 'LSTM', 'FastAPI', 'React', 'Vite', 'Chart.js', 'Docker', 'Hugging Face'], github: 'https://github.com/Ibadat-Ali86/Demand-Sales-Walmart-Forecasting', live: 'https://huggingface.co/spaces/ibadatali/walmart-sales-forecasting-saas', sourceAccess: 'public', showSourceLink: true, clientProject: true, canonicalWalmart: true, image: projectArt('adaptiq'), primaryFeature: true,
    editorialSafeguard: 'This is the sole Walmart forecasting card; unsupported accuracy language is omitted.'
  },
  {
    slug: 'vital-link', title: 'VITAL-LINK', tier: 'featured', category: 'AI Health & Applied ML', status: 'PROTOTYPE',
    hook: 'Multimodal LLM clinical workflow fusing chest X-ray, lung audio, and vital-sign telemetry via Gemini 2.0 Flash into an assisted-review interface.',
    metric: 'Multimodal assisted-review prototype',
    problem: 'Multimodal health prototypes require careful assisted-review framing and useful consolidation of diverse inputs.',
    solution: 'A prototype brings image, audio, and vital-sign inputs into one review-oriented workflow with explicit model boundaries.',
    stack: ['Python', 'Flask', 'Gemini 2.0 Flash', 'Chart.js', 'jsPDF'], github: 'https://github.com/Ibadat-Ali86/data-science-portfolio/tree/main/projects/02-multimodal-medical-diagnosis-ai-gemini', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('vital-link'),
    editorialSafeguard: 'Prototype and assisted-review language only; no diagnosis or clinical validation claim is made.'
  },
  {
    slug: 'evershine', title: 'Evershine Academy LMS', tier: 'featured', category: 'Full-Stack & Client Platforms', status: 'PRIVATE CLIENT',
    hook: 'Enterprise multi-campus LMS delivered to an institutional client with 9-layer technical handoff documentation.',
    metric: 'Enterprise client delivery · Live',
    problem: 'Multi-campus institutions need reliable integration across admissions, academic portals, role-based dashboards, and LMS access.',
    solution: 'A production client platform built with Next.js 15, Prisma, and PostgreSQL, accompanied by detailed technical documentation for independent client operation.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'role-based dashboards'], github: null, live: 'https://evershineacadmey.com/', sourceAccess: 'private', showSourceLink: false, image: projectArt('evershine'), primaryFeature: true,
    clientProject: true, editorialSafeguard: 'Private client project with a live-site action only.'
  },
  {
    slug: 'ai-lead-generation', title: 'AI-Powered Lead Generation Workflow', tier: 'selected', category: 'AI Automation & Lead Generation', status: 'WORKFLOW PROOF',
    hook: 'An n8n workflow that captures, filters, enriches, summarizes, and routes qualified leads into outreach and reporting.',
    metric: 'Capture · enrich · outreach · report',
    problem: 'Lead operations become inconsistent when submissions, qualification, outreach, and tracking live in separate manual steps.',
    solution: 'The workflow captures form submissions, scrapes Google Maps, filters duplicates, classifies promising leads, checks website availability, uses a Gemini-powered agent to prepare outreach, sends Gmail messages, and records lead state in Google Sheets.',
    stack: ['n8n', 'Google Gemini', 'Google Maps', 'Gmail', 'Google Sheets', 'AI agent', 'web scraping'], github: null, live: null, sourceAccess: 'private', showSourceLink: false, workflow: true, image: '/assets/workflows/ai-lead-generation-workflow.png',
    clientProject: true, editorialSafeguard: 'Client workflow evidence; no conversion, lead-volume, or production claims are made.'
  },
  {
    slug: 'ai-restaurant-chatbot', title: 'AI-Powered WhatsApp Restaurant Chatbot', tier: 'selected', category: 'AI Automation & Conversational Systems', status: 'WORKFLOW PROOF',
    hook: 'An n8n-powered WhatsApp assistant for menu questions, order capture, inventory lookups, and contextual replies.',
    metric: 'WhatsApp trigger · memory · tool use',
    problem: 'Restaurant conversations need quick, consistent answers across FAQs, ordering, and inventory without losing context.',
    solution: 'A WhatsApp trigger routes messages to a Gemini-powered AI agent with simple memory and Google Sheets tools for FAQs, orders, and inventory before sending a reply back to the customer.',
    stack: ['n8n', 'WhatsApp Business', 'Google Gemini', 'Simple memory', 'Google Sheets', 'AI agent', 'FAQ + orders + inventory'], github: null, live: null, sourceAccess: 'private', showSourceLink: false, workflow: true, image: '/assets/workflows/ai-restaurant-chatbot.png',
    clientProject: true, editorialSafeguard: 'Client workflow evidence; no order-volume or production claims are made.'
  },
  {
    slug: 'resume-builder', title: 'AI Resume Builder', tier: 'selected', category: 'Full-Stack & Client Platforms', status: 'LIVE',
    hook: 'A guided resume-building application with structured forms, live state, authentication, and PDF export.',
    metric: 'Live resume product workflow',
    problem: 'Resume creation needs an approachable workflow without losing control of structured information and export.',
    solution: 'A guided application connects form state, authentication, and PDF generation in a focused experience.',
    stack: ['React 18', 'TypeScript', 'Tailwind', 'Supabase', 'Zustand', 'React Hook Form', 'Zod', 'Radix UI', 'html2canvas', 'jsPDF', 'Vite'], github: 'https://github.com/Ibadat-Ali86/Interactive-Resume-Builder', live: 'https://snap-resume-p8lzooqtt-ibadcodes-6074s-projects.vercel.app', sourceAccess: 'public', showSourceLink: true, image: projectArt('resume-builder'), editorialSafeguard: 'Live deployment link is retained; no unsupported outcome claims are shown.'
  },
  {
    slug: 'learning-dashboard', title: 'Personalized AI Learning Dashboard', tier: 'selected', category: 'Full-Stack & Client Platforms', status: 'CASE STUDY',
    hook: 'A learning-management workspace for goals, resources, reminders, reports, analytics, and AI-assisted study support.',
    metric: 'AI-assisted learning workspace',
    problem: 'Learners need a connected place to coordinate goals, resources, reminders, reports, and support.',
    solution: 'A full-stack workspace brings scheduled tasks, structured resources, analytics, and AI assistance together.',
    stack: ['Flask', 'SQLAlchemy', 'Alembic', 'JWT', 'APScheduler', 'Gemini', 'PyPDF2', 'Pillow', 'pytesseract', 'moviepy', 'JavaScript'], github: 'https://github.com/Ibadat-Ali86/new', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('learning-dashboard'), editorialSafeguard: 'The public title describes the work rather than mirroring the repository name.'
  },
  {
    slug: 'covid-analytics', title: 'COVID-19 Global Analytics Platform', tier: 'selected', category: 'Analytics & BI', status: 'CASE STUDY',
    hook: 'A full-stack pandemic analytics platform with automated ETL, database-backed APIs, and an interactive dashboard.',
    metric: 'Automated ETL · global analytics',
    problem: 'Analytics systems need dependable movement from source data through services to interpretable views.',
    solution: 'An automated ETL and database-backed API layer feeds an interactive analytical interface.',
    stack: ['Python', 'MySQL', 'FastAPI', 'React', 'TypeScript', 'Tailwind', 'Vite', 'Docker'], github: 'https://github.com/Ibadat-Ali86/Data_Analysis_Projects/tree/main/COVID19-Data-Analytics-Platform', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('covid-analytics'), editorialSafeguard: 'Presented as an analytics case study without medical or public-health outcome claims.'
  },
  {
    slug: 'pakistan-ecommerce', title: 'Pakistan E-commerce Price Prediction', tier: 'selected', category: 'Data Science & Forecasting', status: 'ML CASE STUDY',
    hook: 'A price-prediction workflow built around Pakistani e-commerce transaction data and deployable inference.',
    metric: 'Deployable price-prediction workflow',
    problem: 'Price-prediction work needs a disciplined path from transaction data to reproducible inference.',
    solution: 'A data-science workflow evaluates tree-based approaches and packages an inference-oriented application.',
    stack: ['Python', 'pandas', 'scikit-learn', 'Random Forest', 'Gradient Boosting', 'Flask', 'Jupyter'], github: 'https://github.com/Ibadat-Ali86/data-science-portfolio/tree/main/projects/01-pakistan-ecommerce-price-prediction', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('pakistan-ecommerce'), editorialSafeguard: 'Unverified R² and row-count figures are omitted.'
  },
  {
    slug: 'vendor-analysis', title: 'Vendor Performance Analysis', tier: 'selected', category: 'Analytics & BI', status: 'ANALYTICS',
    hook: 'A procurement and inventory analysis workflow connecting sales, purchases, pricing, invoices, and vendor performance.',
    metric: 'Procurement analytics workflow',
    problem: 'Procurement decisions become difficult when sales, purchasing, pricing, and invoices remain disconnected.',
    solution: 'An analytical workflow connects those datasets to make vendor performance and inventory questions inspectable.',
    stack: ['Python', 'pandas', 'SQL', 'SQLite', 'Jupyter', 'data visualization'], github: 'https://github.com/Ibadat-Ali86/Data_Analysis_Projects/tree/main/Vendor_Performance_Analysis_Project', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('vendor-analysis'), editorialSafeguard: 'Dataset-volume figures are omitted until independently checked.'
  },
  {
    slug: 'mnist', title: 'MNIST Logistic Regression', tier: 'lab', category: 'ML & Data Labs', status: 'ML LAB',
    hook: 'A compact handwritten-digit classification pipeline with custom IDX loading, preprocessing, training, evaluation, persistence, and CLI prediction.',
    metric: 'Foundational ML lab',
    problem: 'A foundational ML workflow is easy to hide behind a single score unless loading, preprocessing, training, and prediction remain inspectable.',
    solution: 'The lab keeps the full path visible with custom IDX loading, preprocessing, logistic-regression training, evaluation, persistence, and CLI prediction.',
    stack: ['Python', 'NumPy', 'scikit-learn', 'Logistic Regression', 'SGD', 'PCA', 'CLI'], github: 'https://github.com/Ibadat-Ali86/ML_Projects/tree/main/data/MNIST', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('mnist'), editorialSafeguard: 'Accuracy figures are omitted until reproduced.'
  },
  {
    slug: 'spam-classifier', title: 'Email / SMS Spam Classifier', tier: 'lab', category: 'ML & Data Labs', status: 'ML LAB',
    hook: 'A Streamlit text-classification app using normalized text, TF-IDF features, and logistic regression.',
    metric: 'TF-IDF text classifier',
    problem: 'Text classification needs explicit preprocessing and feature construction so the model behavior can be inspected and maintained.',
    solution: 'A compact Streamlit lab makes normalization, TF-IDF feature extraction, and logistic regression part of one readable workflow.',
    stack: ['Python', 'NLTK', 'TF-IDF', 'Logistic Regression', 'Streamlit'], github: 'https://github.com/Ibadat-Ali86/ML_Projects/tree/main/data/Spam%20Email%20Classifier/TASK%201/sms-spam-classifier-main', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('spam-classifier'), editorialSafeguard: 'Local-path limitations are retained as a maintenance consideration.'
  },
  {
    slug: 'netflix', title: 'Netflix Data Analysis', tier: 'lab', category: 'Analytics & BI', status: 'DATA LAB',
    hook: 'Exploratory analysis of movie metadata, genres, release patterns, popularity, and feature relationships.',
    metric: 'Exploratory data analysis',
    problem: 'Exploration needs a focused way to inspect distributions and relationships before deciding what is worth modeling.',
    solution: 'A notebook-based analysis turns catalog metadata into readable views of genres, release patterns, popularity, and feature relationships.',
    stack: ['Python', 'pandas', 'Matplotlib', 'seaborn', 'Jupyter'], github: 'https://github.com/Ibadat-Ali86/Netflix_DataAnalysis', live: null, sourceAccess: 'public', showSourceLink: true, clientProject: true, image: projectArt('netflix'), editorialSafeguard: 'Client analysis presented as exploratory work rather than predictive modeling.'
  },
  {
    slug: 'employee-form', title: 'Employee Information Form', tier: 'lab', category: 'ML & Data Labs', status: 'R SHINY LAB',
    hook: 'A reactive R Shiny form with validation, dates, file upload, and structured output.',
    metric: 'R Shiny exercise',
    problem: 'Structured input tools need visible validation and predictable state transitions to stay trustworthy.',
    solution: 'An R Shiny exercise combines reactive inputs, dates, file upload, validation, and structured output in one focused interface.',
    stack: ['R', 'Shiny', 'reactive programming', 'form validation'], github: 'https://github.com/Ibadat-Ali86/R_Shiny-Web_Apps/blob/main/Scenario1.R', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('employee-form'), editorialSafeguard: 'Displayed as a focused child lab, not as the parent collection.'
  },
  {
    slug: 'csv-cleaner', title: 'CSV Data Cleaner', tier: 'lab', category: 'ML & Data Labs', status: 'R SHINY TOOL',
    hook: 'A small R Shiny utility for uploading, previewing, cleaning, and downloading tabular data.',
    metric: 'R Shiny utility',
    problem: 'Small data-cleaning tasks still need transparent upload, inspection, transformation, and download steps.',
    solution: 'An R Shiny utility keeps tabular-data cleaning concise while preserving preview and export as first-class steps.',
    stack: ['R', 'Shiny', 'CSV parsing', 'reactive data cleaning'], github: 'https://github.com/Ibadat-Ali86/R_Shiny-Web_Apps/blob/main/Scenario2.R', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('csv-cleaner'), editorialSafeguard: 'Displayed as a focused child tool, not as the parent collection.'
  }
];

export const excludedProjectNames = [
  'Data_Analysis_Projects', 'ML_Projects', 'R_Shiny-Web_Apps', 'portfolio', 'Learning_Dasboard', 'My_Python_Projects', 'claw-code', 'everything-claude-code', 'data-science-portfolio'
];

export function projectPlan(project) {
  if (project.workflow) return 'Map the business trigger to deterministic qualification, agent reasoning, tool calls, and traceable output.';
  if (project.category.includes('Forecasting')) return 'Define the data horizon, establish a repeatable forecasting baseline, compare model families, and design a decision-ready delivery surface.';
  if (project.category.includes('Predictive Maintenance')) return 'Connect sensor history to a monitored prediction path, add anomaly and explanation signals, then route the result into an operational decision.';
  if (project.category.includes('Analytics')) return 'Move from raw tables to a clean analytical model, expose the important patterns, and turn them into a clear decision surface.';
  if (project.category.includes('Health')) return 'Keep the system assistive and bounded: structure the inputs, preserve human review, and make limitations visible at every decision point.';
  if (project.category.includes('Agents')) return 'Ground the agent with structured repository context, retrieval, and explicit tool boundaries before it can act.';
  if (project.category.includes('Full-Stack')) return 'Trace the work from input to usable output, keeping validation, state, and handoff visible throughout.';
  return 'Keep the workflow inspectable from input to output, with clear validation, reproducibility, and a useful handoff.';
}
