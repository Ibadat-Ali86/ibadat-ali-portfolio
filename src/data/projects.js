const projectArt = (slug) => `/assets/generated/project-${slug}.webp`;

export const projects = [
  {
    slug: 'payguard-ai', title: 'WhatsApp Transaction Verification AI Agent', tier: 'featured', category: 'AI Automation & Payment Verification', status: 'CLIENT DELIVERY',
    hook: 'A controlled WhatsApp workflow that turns payment screenshots into OCR-backed, Stripe-authoritative review outcomes.',
    metric: 'WhatsApp intake · OCR · duplicate detection · Stripe verification',
    problem: 'Manual payment screenshot review is slow and vulnerable to ambiguous OCR, repeated submissions, fake or unclear evidence, and transient integration failures.',
    solution: 'A Baileys Node.js bot receives images from an allowlisted WhatsApp group, persists work through a fair queue, uses FastAPI/Tesseract with a bounded Groq fallback, orchestrates n8n, verifies eligible evidence against Stripe, detects duplicates, and fails closed when proof remains ambiguous.',
    stack: ['WhatsApp / Baileys', 'Node.js', 'Python', 'FastAPI', 'Tesseract OCR', 'Groq Vision', 'n8n', 'Stripe API', 'Docker', 'DigitalOcean'], github: null, live: null, sourceAccess: 'private', showSourceLink: false, clientProject: true, primaryFeature: true, showcase: true, image: '/assets/projects/payguard-ai-thumbnail.png',
    result: 'Delivered payment-verification workflow with queueing, OCR fallback, Stripe reconciliation, duplicate handling, and handoff documentation.',
    evidence: {
      summary: 'Private client delivery. Internal validation recorded 100 Node.js tests and 153 Python tests passing on 2026-09-24. The supplied deployment visual is not an uptime guarantee.',
      links: [
        { href: '/assets/projects/payguard-digitalocean-proof.png', label: 'Supplied deployment screenshot' }
      ]
    },
    editorialSafeguard: 'The thumbnail is a supplied presentation visual; dashboard figures and uptime language inside the artwork are not treated as independently verified telemetry. No public payment-volume or accuracy claim is made.'
  },
  {
    slug: 'codescope', title: 'CodeScope MCP Preflight', tier: 'featured', category: 'AI Agents & Developer Tools', status: 'LOCAL TOOL',
    hook: 'Local-first MCP server serving Tree-sitter AST intelligence and vector retrieval as tool context for AI agents.',
    metric: 'Agent tool-calling · MCP & RAG',
    problem: 'Autonomous coding agents make conflicting or hallucinated changes without structured repository context.',
    solution: 'A local-first Model Context Protocol (MCP) server combines Tree-sitter parsing and Chroma vector retrieval to ground agent reasoning before code generation.',
    stack: ['Python', 'MCP', 'Tree-sitter', 'sentence-transformers', 'Chroma', 'CLI'], github: 'https://github.com/Ibadat-Ali86/codescope-mcp-preflight', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('codescope'),
    showcase: true, result: 'Open-source MCP tooling for structured repository context before agent actions.', editorialSafeguard: 'Repository figures are intentionally omitted until the current suite is reproduced.'
  },
  {
    slug: 'carevision', title: 'CareVision', tier: 'featured', category: 'AI Health & Applied ML', status: 'LIVE',
    hook: 'Multimodal clinical AI workflow integrating Gemini 2.0 Flash with explainability-first human review gates and offline-capable fallback.',
    metric: 'Multimodal clinical workflow · Gemma 4 Hackathon',
    problem: 'Assisted review requires dependable, explainable workflows with explicit confidence gates rather than opaque generative outputs.',
    solution: 'A multimodal PWA combining Gemini 2.0 Flash structured outputs, step-level audit logging, PostgreSQL persistence, and offline-capable inference fallback.',
    stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind', 'Radix UI', 'Zustand', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Gemini 2.0 Flash'], github: 'https://github.com/Ibadat-Ali86/carevision', live: 'https://carevision-chw.vercel.app/', sourceAccess: 'public', showSourceLink: true, image: projectArt('carevision'),
    showcase: true, result: 'Gemma hackathon submission with multimodal inputs, audit logging, and offline fallback.', editorialSafeguard: 'Research and decision-support context only; no diagnostic, treatment, or clinical-outcome claims.'
  },
  {
    slug: 'sentineliq', title: 'SentinelIQ', tier: 'featured', category: 'Predictive Maintenance', status: 'LIVE',
    hook: 'Predictive maintenance automation combining TCN-LSTM forecasting, dual anomaly detection, SHAP attribution, and PuLP scheduling.',
    metric: 'Predictive maintenance · anomaly detection + scheduling',
    problem: 'Maintenance planning benefits from forecast, anomaly, and explanation signals in one operational flow.',
    solution: 'An automated pipeline connecting sequence models, dual anomaly detection (Isolation Forest + Autoencoder), SHAP attribution, and PuLP intervention scheduling.',
    stack: ['PyTorch', 'TCN', 'LSTM', 'Isolation Forest', 'Autoencoder', 'SHAP', 'PuLP', 'FastAPI', 'Next.js 15', 'PostgreSQL', 'Docker'], github: 'https://github.com/Ibadat-Ali86/sentinel-iq-cmpass-nasa-rul-prediction', live: 'https://sentinel-iq-nasa.vercel.app', sourceAccess: 'public', showSourceLink: true, clientProject: true, image: projectArt('sentineliq'), hasVideo: true,
    showcase: true, result: 'NASA CMAPSS RUL study with anomaly detection, SHAP attribution, and scheduling.', editorialSafeguard: 'No winning-model or RMSE claim is shown while repository experiment tables remain contradictory.'
  },
  {
    slug: 'topolite', title: 'TopoLite-KD', tier: 'featured', category: 'AI Health & Research', status: 'RESEARCH',
    hook: 'Lightweight topology-aware knowledge distillation for COVID-19 CT-slice classification.',
    metric: 'Topology-aware KD research',
    problem: 'Research into compact imaging models needs transparent framing of methods and limitations.',
    solution: 'A topology-aware knowledge-distillation approach explores lightweight architectures, attention, and explainability methods.',
    stack: ['PyTorch', 'depthwise-separable CNN', 'Coordinate Attention', 'persistent homology', 'GUDHI', 'EfficientNet-B0', 'Grad-CAM'], github: 'https://github.com/Ibadat-Ali86/TopoLite-KD-Efficient-Topology-Aware-Knowledge-Distillation-for-COVID-19-CT-Slice-Classification', live: null, sourceAccess: 'public', showSourceLink: true, clientProject: true, image: projectArt('topolite'),
    result: 'Research prototype exploring topology-aware knowledge distillation for compact CT classification.', editorialSafeguard: 'Academic research context only; no clinical deployment or validation claim is made.'
  },
  {
    slug: 'adaptiq', title: 'AdaptIQ / ForecastAI', tier: 'featured', category: 'Forecasting & Decision Systems', status: 'LIVE',
    hook: 'A forecasting application connecting sales data, model comparison, and downloadable planning reports.',
    metric: 'Demand forecasting · 4-model ensemble',
    problem: 'Forecasting is only useful when teams can move from raw transaction data to automated, interpretable planning outputs.',
    solution: 'An automated forecasting workflow pairing Prophet, XGBoost, SARIMA, and LSTM with regime selection, monitoring hooks, and PDF/CSV report generation.',
    stack: ['Prophet', 'XGBoost', 'SARIMA', 'LSTM', 'FastAPI', 'React', 'Vite', 'Chart.js', 'Docker', 'Hugging Face'], github: 'https://github.com/Ibadat-Ali86/Demand-Sales-Walmart-Forecasting', live: 'https://huggingface.co/spaces/ibadatali/walmart-sales-forecasting-saas', sourceAccess: 'public', showSourceLink: true, clientProject: true, primaryFeature: true, canonicalWalmart: true, image: projectArt('adaptiq'),
    showcase: true, result: 'Four-model comparison with live inference and downloadable planning reports.', editorialSafeguard: 'This is the sole Walmart forecasting card; unsupported accuracy language is omitted.'
  },
  {
    slug: 'vital-link', title: 'VITAL-LINK', tier: 'featured', category: 'AI Health & Applied ML', status: 'PROTOTYPE',
    hook: 'Multimodal LLM clinical workflow fusing chest X-ray, lung audio, and vital-sign telemetry via Gemini 2.0 Flash into an assisted-review interface.',
    metric: 'Multimodal assisted-review prototype',
    problem: 'Multimodal health prototypes require careful assisted-review framing and useful consolidation of diverse inputs.',
    solution: 'A prototype brings image, audio, and vital-sign inputs into one review-oriented workflow with explicit model boundaries.',
    stack: ['Python', 'Flask', 'Gemini 2.0 Flash', 'Chart.js', 'jsPDF'], github: 'https://github.com/Ibadat-Ali86/data-science-portfolio/tree/main/projects/02-multimodal-medical-diagnosis-ai-gemini', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('vital-link'),
    result: 'Assisted-review prototype combining image, audio, and vital-sign inputs in one bounded workflow.', editorialSafeguard: 'Prototype and assisted-review language only; no diagnosis or clinical validation claim is made.'
  },
  {
    slug: 'evershine', title: 'Evershine Academy LMS', tier: 'featured', category: 'Full-Stack & Client Platforms', status: 'PRIVATE CLIENT',
    hook: 'A school management platform connecting admissions, academic portals, and role-based dashboards, with documentation for client handoff.',
    metric: 'Education · Client platform',
    problem: 'Multi-campus institutions need reliable integration across admissions, academic portals, role-based dashboards, and LMS access.',
    solution: 'A production client platform built with Next.js 15, Prisma, and PostgreSQL, accompanied by detailed technical documentation for independent client operation.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'role-based dashboards'], github: null, live: 'https://evershineacadmey.com/', sourceAccess: 'private', showSourceLink: false, image: projectArt('evershine'),
    showcase: true, result: 'Production client platform with documented handoff and a live website.', primaryFeature: true, clientProject: true, editorialSafeguard: 'Private client project with a live-site action only.'
  },
  {
    slug: 'ai-lead-generation', title: 'AI-Powered Lead Generation Workflow', tier: 'selected', category: 'AI Automation & Lead Generation', status: 'WORKFLOW PROOF',
    hook: 'An n8n workflow that captures, filters, enriches, summarizes, and routes qualified leads into outreach and reporting.',
    metric: 'Capture · enrich · outreach · report',
    problem: 'Lead operations become inconsistent when submissions, qualification, outreach, and tracking live in separate manual steps.',
    solution: 'The workflow captures form submissions, scrapes Google Maps, filters duplicates, classifies promising leads, checks website availability, uses a Gemini-powered agent to prepare outreach, sends Gmail messages, and records lead state in Google Sheets.',
    stack: ['n8n', 'Google Gemini', 'Google Maps', 'Gmail', 'Google Sheets', 'AI agent', 'web scraping'], github: null, live: null, sourceAccess: 'private', showSourceLink: false, workflow: true, image: '/assets/workflows/ai-lead-generation-workflow.png',
    showcase: true, result: 'Client workflow proof spanning capture, enrichment, outreach, and reporting.', primaryFeature: true, clientProject: true, editorialSafeguard: 'Client workflow evidence; no conversion, lead-volume, or production claims are made.'
  },
  {
    slug: 'ai-restaurant-chatbot', title: 'AI-Powered WhatsApp Restaurant Chatbot', tier: 'selected', category: 'AI Automation & Conversational Systems', status: 'WORKFLOW PROOF',
    hook: 'An n8n-powered WhatsApp assistant for menu questions, order capture, inventory lookups, and contextual replies.',
    metric: 'WhatsApp trigger · memory · tool use',
    problem: 'Restaurant conversations need quick, consistent answers across FAQs, ordering, and inventory without losing context.',
    solution: 'A WhatsApp trigger routes messages to a Gemini-powered AI agent with simple memory and Google Sheets tools for FAQs, orders, and inventory before sending a reply back to the customer.',
    stack: ['n8n', 'WhatsApp Business', 'Google Gemini', 'Simple memory', 'Google Sheets', 'AI agent', 'FAQ + orders + inventory'], github: null, live: null, sourceAccess: 'private', showSourceLink: false, workflow: true, image: '/assets/workflows/ai-restaurant-chatbot.png',
    clientProject: true, result: 'Client workflow proof connecting WhatsApp intake, memory, FAQ, order capture, and inventory tools.', editorialSafeguard: 'Client workflow evidence; no order-volume or production claims are made.'
  },
  {
    slug: 'resume-builder', title: 'AI Resume Builder', tier: 'selected', category: 'Full-Stack & Client Platforms', status: 'LIVE',
    hook: 'A guided resume-building application with structured forms, live state, authentication, and PDF export.',
    metric: 'Live resume product workflow',
    problem: 'Resume creation needs an approachable workflow without losing control of structured information and export.',
    solution: 'A guided application connects form state, authentication, and PDF generation in a focused experience.',
    stack: ['React 18', 'TypeScript', 'Tailwind', 'Supabase', 'Zustand', 'React Hook Form', 'Zod', 'Radix UI', 'html2canvas', 'jsPDF', 'Vite'], github: 'https://github.com/Ibadat-Ali86/Interactive-Resume-Builder', live: 'https://snap-resume-p8lzooqtt-ibadcodes-6074s-projects.vercel.app', sourceAccess: 'public', showSourceLink: true, image: projectArt('resume-builder'), result: 'Live product workflow for structured resume creation, authenticated state, and PDF export.', editorialSafeguard: 'Live deployment link is retained; no unsupported outcome claims are shown.'
  },
  {
    slug: 'learning-dashboard', title: 'Personalized AI Learning Dashboard', tier: 'selected', category: 'Full-Stack & Client Platforms', status: 'CASE STUDY',
    hook: 'A learning-management workspace for goals, resources, reminders, reports, analytics, and AI-assisted study support.',
    metric: 'AI-assisted learning workspace',
    problem: 'Learners need a connected place to coordinate goals, resources, reminders, reports, and support.',
    solution: 'A full-stack workspace brings scheduled tasks, structured resources, analytics, and AI assistance together.',
    stack: ['Flask', 'SQLAlchemy', 'Alembic', 'JWT', 'APScheduler', 'Gemini', 'PyPDF2', 'Pillow', 'pytesseract', 'moviepy', 'JavaScript'], github: 'https://github.com/Ibadat-Ali86/new', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('learning-dashboard'), result: 'Full-stack learning workspace with goals, resources, reminders, analytics, and AI-assisted study.', editorialSafeguard: 'The public title describes the work rather than mirroring the repository name.'
  },
  {
    slug: 'covid-analytics', title: 'COVID-19 Global Analytics Platform', tier: 'selected', category: 'Analytics & BI', status: 'CASE STUDY',
    hook: 'A full-stack pandemic analytics platform with automated ETL, database-backed APIs, and an interactive dashboard.',
    metric: 'Automated ETL · global analytics',
    problem: 'Analytics systems need dependable movement from source data through services to interpretable views.',
    solution: 'An automated ETL and database-backed API layer feeds an interactive analytical interface.',
    stack: ['Python', 'MySQL', 'FastAPI', 'React', 'TypeScript', 'Tailwind', 'Vite', 'Docker'], github: 'https://github.com/Ibadat-Ali86/Data_Analysis_Projects/tree/main/COVID19-Data-Analytics-Platform', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('covid-analytics'), result: 'Database-backed analytics platform connecting automated ETL, APIs, and an interactive dashboard.', editorialSafeguard: 'Presented as an analytics case study without medical or public-health outcome claims.'
  },
  {
    slug: 'pakistan-ecommerce', title: 'Pakistan E-commerce Price Prediction', tier: 'selected', category: 'Data Science & Forecasting', status: 'ML CASE STUDY',
    hook: 'A price-prediction workflow built around Pakistani e-commerce transaction data and deployable inference.',
    metric: 'Deployable price-prediction workflow',
    problem: 'Price-prediction work needs a disciplined path from transaction data to reproducible inference.',
    solution: 'A data-science workflow evaluates tree-based approaches and packages an inference-oriented application.',
    stack: ['Python', 'pandas', 'scikit-learn', 'Random Forest', 'Gradient Boosting', 'Flask', 'Jupyter'], github: 'https://github.com/Ibadat-Ali86/data-science-portfolio/tree/main/projects/01-pakistan-ecommerce-price-prediction', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('pakistan-ecommerce'), result: 'Deployable inference workflow translating e-commerce transaction data into price estimates.', editorialSafeguard: 'Unverified R² and row-count figures are omitted.'
  },
  {
    slug: 'vendor-analysis', title: 'Vendor Performance Analysis', tier: 'selected', category: 'Analytics & BI', status: 'ANALYTICS',
    hook: 'A procurement and inventory analysis workflow connecting sales, purchases, pricing, invoices, and vendor performance.',
    metric: 'Procurement analytics workflow',
    problem: 'Procurement decisions become difficult when sales, purchasing, pricing, and invoices remain disconnected.',
    solution: 'An analytical workflow connects those datasets to make vendor performance and inventory questions inspectable.',
    stack: ['Python', 'pandas', 'SQL', 'SQLite', 'Jupyter', 'data visualization'], github: 'https://github.com/Ibadat-Ali86/Data_Analysis_Projects/tree/main/Vendor_Performance_Analysis_Project', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('vendor-analysis'), result: 'Procurement analysis workflow connecting sales, purchases, pricing, invoices, and vendor performance.', editorialSafeguard: 'Dataset-volume figures are omitted until independently checked.'
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

export const showcaseProjectSlugs = ['payguard-ai', 'evershine', 'adaptiq', 'sentineliq', 'carevision', 'ai-lead-generation', 'codescope'];

export const secondaryProjectSlugs = ['ai-restaurant-chatbot', 'resume-builder', 'learning-dashboard', 'covid-analytics', 'topolite', 'vital-link', 'pakistan-ecommerce', 'vendor-analysis'];
export const professionalProjectSlugs = [...showcaseProjectSlugs, ...secondaryProjectSlugs, 'netflix'];

const caseStudyDetails = {
  'payguard-ai': {
    context: 'Payment proof arrived as an image inside a WhatsApp group. The workflow had to coordinate media intake, OCR, Stripe truth, duplicate handling, and manual review without treating OCR as final authority.',
    architecture: [
      { label: 'Intake and queue', detail: 'Allowlisted WhatsApp media is accepted, identified, and persisted through a fair queue so bursts do not reorder payment work.', tools: ['WhatsApp / Baileys', 'Node.js', 'n8n'] },
      { label: 'Evidence extraction', detail: 'OCR and a bounded vision fallback turn screenshots into candidate fields while keeping weak or incomplete evidence explicit.', tools: ['Python', 'FastAPI', 'Tesseract OCR', 'Groq Vision'] },
      { label: 'Authoritative verification', detail: 'Eligible evidence is reconciled against Stripe, duplicate submissions are detected, and ambiguous cases stay fail-closed for review.', tools: ['Stripe API', 'Docker', 'DigitalOcean'] }
    ],
    delivery: ['Designed the evidence path around bounded retries and explicit review states.', 'Documented the handoff so the client can operate the workflow without relying on the builder.']
  },
  codescope: {
    context: 'Coding agents need repository context before they decide whether to reuse, extend, or create code. The product boundary is local-first intelligence, not an autonomous code-writing platform.',
    architecture: [
      { label: 'Repository scan', detail: 'The CLI establishes a deterministic repository view before an agent asks for context.', tools: ['Python', 'CLI'] },
      { label: 'Structural analysis', detail: 'Tree-sitter exposes syntax-aware structure so retrieval can work with code relationships rather than filenames alone.', tools: ['Tree-sitter'] },
      { label: 'Context retrieval', detail: 'Embeddings and a local vector store return relevant repository evidence through MCP tool boundaries.', tools: ['sentence-transformers', 'Chroma', 'MCP'] }
    ],
    delivery: ['Kept the tool local-first to reduce unnecessary source movement.', 'Made the preflight decision inspectable before any downstream agent action.']
  },
  carevision: {
    context: 'Assisted review across multimodal inputs needs a clear boundary between model output and human judgment. The interface therefore emphasizes structured responses, auditability, and bounded fallback behavior.',
    architecture: [
      { label: 'Client workflow', detail: 'A typed React PWA presents the review flow and keeps state transitions visible to the operator.', tools: ['React 18', 'TypeScript', 'Vite', 'Tailwind', 'Radix UI', 'Zustand'] },
      { label: 'Inference boundary', detail: 'FastAPI coordinates structured multimodal inference and preserves a review-oriented response contract.', tools: ['FastAPI', 'Gemini 2.0 Flash'] },
      { label: 'Persistence and continuity', detail: 'PostgreSQL and SQLAlchemy support durable records while the offline-capable path keeps the workflow useful when connectivity is limited.', tools: ['PostgreSQL', 'SQLAlchemy'] }
    ],
    delivery: ['Presented the system as decision support, never as diagnosis or treatment.', 'Kept audit logging and fallback behavior visible as part of the product story.']
  },
  sentineliq: {
    context: 'Maintenance planning benefits from one operational path that combines remaining-useful-life signals, anomaly detection, explanations, and scheduling instead of leaving each result in a separate notebook.',
    architecture: [
      { label: 'Sequence prediction', detail: 'Sensor histories move through TCN/LSTM sequence models for remaining-useful-life estimation.', tools: ['PyTorch', 'TCN', 'LSTM'] },
      { label: 'Anomaly and explanation layer', detail: 'Two anomaly approaches and SHAP attribution expose unusual behavior and the signals behind a prediction.', tools: ['Isolation Forest', 'Autoencoder', 'SHAP'] },
      { label: 'Decision surface', detail: 'PuLP turns model and anomaly outputs into a planning step, with FastAPI and the web application providing the delivery surface.', tools: ['PuLP', 'FastAPI', 'Next.js 15', 'PostgreSQL', 'Docker'] }
    ],
    delivery: ['Separated prediction, anomaly, explainability, and scheduling responsibilities.', 'Avoided unsupported winning-model or RMSE claims while experiment tables remain unresolved.']
  },
  topolite: {
    context: 'Compact medical-imaging research needs a transparent account of representation, topology, distillation, and explainability without implying clinical deployment.',
    architecture: [
      { label: 'Compact representation', detail: 'A lightweight convolutional path is used as the student-side foundation for experimentation.', tools: ['PyTorch', 'depthwise-separable CNN', 'EfficientNet-B0'] },
      { label: 'Topology-aware learning', detail: 'Coordinate attention and persistent-homology signals are explored as structural guidance during distillation.', tools: ['Coordinate Attention', 'persistent homology', 'GUDHI'] },
      { label: 'Interpretability', detail: 'Grad-CAM provides a visual explanation surface for research inspection rather than a clinical guarantee.', tools: ['Grad-CAM'] }
    ],
    delivery: ['Framed the work as an academic research prototype with explicit limitations.', 'Kept the public story focused on method and reproducibility rather than medical outcome claims.']
  },
  adaptiq: {
    context: 'Forecasting becomes useful when a team can move from uploaded sales data to model comparison, interpretable planning outputs, and a report they can carry into a decision meeting.',
    architecture: [
      { label: 'Forecasting ensemble', detail: 'Classical, boosted, and recurrent model families are compared within one forecasting workflow.', tools: ['Prophet', 'XGBoost', 'SARIMA', 'LSTM'] },
      { label: 'Inference service', detail: 'FastAPI exposes the model path while the React/Vite client gives the operator a usable planning surface.', tools: ['FastAPI', 'React', 'Vite'] },
      { label: 'Decision and delivery', detail: 'Chart.js visualizes the comparison and Docker/Hugging Face provide the practical delivery boundary.', tools: ['Chart.js', 'Docker', 'Hugging Face'] }
    ],
    delivery: ['Made model comparison and downloadable planning reports part of the product, not an afterthought.', 'Kept unsupported accuracy language out of the public case study.']
  },
  'vital-link': {
    context: 'The prototype explores how image, audio, and vital-sign inputs can be brought into one bounded assisted-review workflow without turning a multimodal model into an unqualified clinical authority.',
    architecture: [
      { label: 'Multimodal intake', detail: 'The prototype collects the three input types into one review context rather than isolated demonstrations.', tools: ['Python', 'Flask'] },
      { label: 'Model-assisted review', detail: 'Gemini 2.0 Flash supports the synthesis step while the interface keeps the workflow explicitly assistive.', tools: ['Gemini 2.0 Flash'] },
      { label: 'Operator output', detail: 'Charts and a generated document provide a review artifact for the prototype flow.', tools: ['Chart.js', 'jsPDF'] }
    ],
    delivery: ['Kept the scope at prototype and assisted review.', 'Avoided diagnosis, clinical validation, or treatment claims.']
  },
  evershine: {
    context: 'A private education client needed a public-facing platform that could connect admissions, academic information, LMS access, and role-based experiences without exposing implementation details.',
    architecture: [
      { label: 'Web experience', detail: 'Next.js and TypeScript provide the structured application surface for public and authenticated journeys.', tools: ['Next.js 15', 'TypeScript', 'Tailwind CSS'] },
      { label: 'Data and access', detail: 'Prisma and PostgreSQL support durable application data while role-based dashboards separate user responsibilities.', tools: ['Prisma', 'PostgreSQL', 'role-based dashboards'] },
      { label: 'Handoff', detail: 'The delivery includes documentation so the client can operate and extend the system independently.', tools: ['Next.js 15', 'TypeScript'] }
    ],
    delivery: ['Show only the approved live-site action for this private client project.', 'Do not publish source links, repository names, or confidential administration details.']
  },
  'ai-lead-generation': {
    context: 'Lead operations become inconsistent when capture, qualification, enrichment, outreach, and reporting live in separate manual steps.',
    architecture: [
      { label: 'Capture and enrichment', detail: 'Submissions and map data enter the workflow, where duplicates and basic qualification signals are handled before outreach.', tools: ['n8n', 'Google Maps', 'web scraping'] },
      { label: 'Agent-assisted preparation', detail: 'Gemini prepares context-aware outreach while the workflow retains deterministic tool boundaries around the agent.', tools: ['Google Gemini', 'AI agent'] },
      { label: 'Send and record', detail: 'Gmail sends the message and Google Sheets preserves the visible lead state for reporting and follow-up.', tools: ['Gmail', 'Google Sheets'] }
    ],
    delivery: ['Presented this as workflow proof, not a conversion or lead-volume claim.', 'Kept the process understandable from trigger to recorded outcome.']
  },
  'ai-restaurant-chatbot': {
    context: 'Restaurant conversations need fast answers across menus, FAQs, orders, and inventory while preserving enough context to avoid repeating the same questions.',
    architecture: [
      { label: 'Conversation trigger', detail: 'WhatsApp messages enter an n8n workflow that owns routing and response delivery.', tools: ['WhatsApp Business', 'n8n'] },
      { label: 'Agent and memory', detail: 'Gemini handles language understanding while simple memory keeps the immediate conversation coherent.', tools: ['Google Gemini', 'AI agent', 'Simple memory'] },
      { label: 'Business tools', detail: 'Google Sheets provides the bounded FAQ, order, and inventory lookups used by the workflow.', tools: ['Google Sheets', 'FAQ + orders + inventory'] }
    ],
    delivery: ['Kept the workflow proof focused on tool use and state movement.', 'Made no order-volume or production-scale claim.']
  },
  'resume-builder': {
    context: 'Resume creation needs a guided flow that keeps structured information reliable while still giving the user immediate feedback and a usable PDF output.',
    architecture: [
      { label: 'Structured interface', detail: 'React, TypeScript, Tailwind, Radix UI, and React Hook Form provide the typed, accessible form experience.', tools: ['React 18', 'TypeScript', 'Tailwind', 'Radix UI', 'React Hook Form'] },
      { label: 'State and validation', detail: 'Zustand and Zod coordinate local application state and keep form data explicit before export.', tools: ['Zustand', 'Zod', 'Supabase'] },
      { label: 'Document output', detail: 'The browser converts the resume surface into a downloadable document through canvas capture and PDF generation.', tools: ['html2canvas', 'jsPDF', 'Vite'] }
    ],
    delivery: ['Kept the live product link visible as the primary proof surface.', 'Focused the case study on workflow clarity rather than unsupported user-outcome claims.']
  },
  'learning-dashboard': {
    context: 'Learners need one workspace for goals, resources, reminders, reports, analytics, and study support instead of a collection of disconnected notes and scheduled tasks.',
    architecture: [
      { label: 'Application and data', detail: 'Flask exposes the application boundary while SQLAlchemy and Alembic keep persistence and schema changes explicit.', tools: ['Flask', 'SQLAlchemy', 'Alembic', 'JavaScript'] },
      { label: 'Identity and scheduling', detail: 'JWT protects sessions and APScheduler coordinates time-based reminders and background activity.', tools: ['JWT', 'APScheduler'] },
      { label: 'Assisted study tools', detail: 'Gemini, PDF parsing, image handling, OCR, and media processing support the study workflow.', tools: ['Gemini', 'PyPDF2', 'Pillow', 'pytesseract', 'moviepy'] }
    ],
    delivery: ['Use the professional product title rather than mirroring the repository name.', 'Describe the workspace as AI-assisted study support, not an autonomous tutor.']
  },
  'covid-analytics': {
    context: 'Analytics work is only useful when data can move consistently from source files through storage and APIs into an interface that makes patterns inspectable.',
    architecture: [
      { label: 'Data foundation', detail: 'Python and MySQL provide the ingestion and persistence layer for the analytical dataset.', tools: ['Python', 'MySQL'] },
      { label: 'Service boundary', detail: 'FastAPI exposes the processed data through a clear API contract for the client application.', tools: ['FastAPI'] },
      { label: 'Analytical interface', detail: 'React, TypeScript, Tailwind, and Vite form the interactive dashboard surface, with Docker keeping the environment repeatable.', tools: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Docker'] }
    ],
    delivery: ['Presented the work as an analytics case study, not a public-health outcome claim.', 'Kept the child project visible while excluding the parent collection from the catalog.']
  },
  'pakistan-ecommerce': {
    context: 'Price-prediction work needs a disciplined path from transaction records to features, model comparison, and a repeatable inference surface.',
    architecture: [
      { label: 'Data preparation', detail: 'Python and pandas shape the transaction data into a reproducible modeling input.', tools: ['Python', 'pandas', 'Jupyter'] },
      { label: 'Model comparison', detail: 'Scikit-learn supports tree-based experiments with Random Forest and Gradient Boosting as inspectable approaches.', tools: ['scikit-learn', 'Random Forest', 'Gradient Boosting'] },
      { label: 'Inference surface', detail: 'Flask packages the selected path into a small application boundary for prediction-oriented use.', tools: ['Flask'] }
    ],
    delivery: ['Kept the result framed as deployable inference rather than a verified business forecast.', 'Omitted unverified R² and row-count figures.']
  },
  'vendor-analysis': {
    context: 'Procurement questions become difficult when sales, purchasing, pricing, invoices, and vendor information remain disconnected across separate tables.',
    architecture: [
      { label: 'Data assembly', detail: 'Python and pandas establish a repeatable cleaning and joining path for the operational tables.', tools: ['Python', 'pandas'] },
      { label: 'Query layer', detail: 'SQL and SQLite make the analytical questions explicit and keep the working dataset inspectable.', tools: ['SQL', 'SQLite', 'Jupyter'] },
      { label: 'Decision views', detail: 'Data visualization turns the joined data into vendor and inventory observations that can be discussed.', tools: ['data visualization'] }
    ],
    delivery: ['Focused on the analysis workflow and its questions rather than unsupported dataset-volume claims.', 'Kept the output compact enough to inspect as a portfolio case study.']
  },
  netflix: {
    context: 'The lab explores how a streaming catalog can be profiled through metadata, genres, release patterns, popularity, and feature relationships.',
    architecture: [
      { label: 'Dataset preparation', detail: 'Python and pandas provide the notebook-friendly loading, cleaning, and reshaping path.', tools: ['Python', 'pandas', 'Jupyter'] },
      { label: 'Exploration', detail: 'Matplotlib and seaborn turn catalog fields into distributions, comparisons, and relationship views.', tools: ['Matplotlib', 'seaborn'] },
      { label: 'Interpretation', detail: 'The final output remains exploratory analysis: a compact lab for asking better questions of metadata, not a prediction product.', tools: ['Python', 'Jupyter'] }
    ],
    delivery: ['Kept Netflix as the single compact data-analysis lab in the public catalog.', 'Presented it as exploratory analysis rather than predictive modeling.']
  }
};

for (const project of projects) {
  if (caseStudyDetails[project.slug]) project.caseStudy = caseStudyDetails[project.slug];
}

const stackAliases = [
  ['Python', /^python$/i], ['React', /^react(?:\s|$)/i], ['TypeScript', /^typescript$/i], ['JavaScript', /^javascript$/i],
  ['FastAPI', /^fastapi$/i], ['Flask', /^flask$/i], ['PostgreSQL', /^postgres(?:ql)?$/i], ['Docker', /^docker$/i],
  ['Google Gemini', /gemini/i], ['Google Sheets', /google sheets/i], ['n8n', /^n8n$/i], ['Jupyter', /^jupyter$/i],
  ['pandas', /^pandas$/i], ['PyTorch', /^pytorch$/i], ['scikit-learn', /scikit-learn/i], ['Shiny', /^shiny$/i]
];

export function canonicalStackLabel(label) {
  return stackAliases.find(([, pattern]) => pattern.test(label))?.[0] ?? label;
}

export function catalogStackUsage() {
  const counts = new Map();
  for (const slug of professionalProjectSlugs) {
    const project = projects.find(({ slug: projectSlug }) => projectSlug === slug);
    project?.stack.forEach((label) => {
      const key = canonicalStackLabel(label);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
  }
  return [...counts.entries()].sort(([, first], [, second]) => second - first);
}

export function projectStackUsage(project) {
  const usage = new Map(catalogStackUsage());
  return project.stack.map((label) => ({ label, count: usage.get(canonicalStackLabel(label)) ?? 1 }));
}

export function projectPlan(project) {
  if (project.workflow) return 'Map the business trigger to deterministic qualification, agent reasoning, tool calls, and traceable output.';
  if (project.category.includes('Payment Verification')) return 'Keep payment evidence bounded and auditable: receive the screenshot safely, extract deterministic fields, reconcile against Stripe, detect repeats, and require review when the evidence is not unique.';
  if (project.category.includes('Forecasting')) return 'Define the data horizon, establish a repeatable forecasting baseline, compare model families, and design a decision-ready delivery surface.';
  if (project.category.includes('Predictive Maintenance')) return 'Connect sensor history to a monitored prediction path, add anomaly and explanation signals, then route the result into an operational decision.';
  if (project.category.includes('Analytics')) return 'Move from raw tables to a clean analytical model, expose the important patterns, and turn them into a clear decision surface.';
  if (project.category.includes('Health')) return 'Keep the system assistive and bounded: structure the inputs, preserve human review, and make limitations visible at every decision point.';
  if (project.category.includes('Agents')) return 'Ground the agent with structured repository context, retrieval, and explicit tool boundaries before it can act.';
  if (project.category.includes('Full-Stack')) return 'Trace the work from input to usable output, keeping validation, state, and handoff visible throughout.';
  return 'Keep the workflow inspectable from input to output, with clear validation, reproducibility, and a useful handoff.';
}
