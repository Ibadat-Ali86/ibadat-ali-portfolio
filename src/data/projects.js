const projectArt = (slug) => `/assets/generated/project-${slug}.webp`;

export const projects = [
  {
    slug: 'codescope', title: 'CodeScope MCP Preflight', tier: 'featured', category: 'AI Agents & Developer Tools', status: 'LOCAL TOOL',
    hook: 'Local-first repository intelligence that decides whether code should be reused, extended, or created.',
    problem: 'Code work often starts without enough repository context to make a safe implementation choice.',
    solution: 'A local-first MCP workflow maps relevant code, retrieves context, and supports deliberate reuse or extension decisions.',
    stack: ['Python', 'MCP', 'Tree-sitter', 'sentence-transformers', 'Chroma', 'CLI'], github: 'https://github.com/Ibadat-Ali86/codescope-mcp-preflight', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('codescope'),
    editorialSafeguard: 'Repository figures are intentionally omitted until the current suite is reproduced.'
  },
  {
    slug: 'carevision', title: 'CareVision', tier: 'featured', category: 'AI Health & Applied ML', status: 'LIVE',
    hook: 'Multimodal clinical decision-support PWA designed around explainability, secure workflows, and practical field use.',
    problem: 'Assisted review needs usable, explainable workflows rather than unsupported medical conclusions.',
    solution: 'A multimodal PWA combines structured workflows, secure application services, and explainability-oriented interfaces.',
    stack: ['React 18', 'TypeScript', 'Vite', 'Tailwind', 'Radix UI', 'Zustand', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Gemini 2.0 Flash'], github: 'https://github.com/Ibadat-Ali86/carevision', live: 'https://carevision-chw.vercel.app/', sourceAccess: 'public', showSourceLink: true, image: projectArt('carevision'),
    editorialSafeguard: 'Research and decision-support context only; no diagnostic, treatment, or clinical-outcome claims.'
  },
  {
    slug: 'sentineliq', title: 'SentinelIQ', tier: 'featured', category: 'Predictive Maintenance', status: 'LIVE',
    hook: 'NASA turbofan remaining-useful-life forecasting with anomaly detection, explainability, and maintenance planning.',
    problem: 'Maintenance planning benefits from forecast, anomaly, and explanation signals in one operational flow.',
    solution: 'A predictive-maintenance system connects sequence models, anomaly detection, explanation, planning, APIs, and an interface.',
    stack: ['PyTorch', 'TCN', 'LSTM', 'Isolation Forest', 'Autoencoder', 'SHAP', 'PuLP', 'FastAPI', 'Next.js 15', 'PostgreSQL', 'Docker'], github: 'https://github.com/Ibadat-Ali86/sentinel-iq-cmpass-nasa-rul-prediction', live: 'https://sentinel-iq-nasa.vercel.app', sourceAccess: 'public', showSourceLink: true, image: projectArt('sentineliq'),
    editorialSafeguard: 'No winning-model or RMSE claim is shown while repository experiment tables remain contradictory.'
  },
  {
    slug: 'topolite', title: 'TopoLite-KD', tier: 'featured', category: 'AI Health & Research', status: 'RESEARCH',
    hook: 'Lightweight topology-aware knowledge distillation for COVID-19 CT-slice classification.',
    problem: 'Research into compact imaging models needs transparent framing of methods and limitations.',
    solution: 'A topology-aware knowledge-distillation approach explores lightweight architectures, attention, and explainability methods.',
    stack: ['PyTorch', 'depthwise-separable CNN', 'Coordinate Attention', 'persistent homology', 'GUDHI', 'EfficientNet-B0', 'Grad-CAM'], github: 'https://github.com/Ibadat-Ali86/TopoLite-KD-Efficient-Topology-Aware-Knowledge-Distillation-for-COVID-19-CT-Slice-Classification', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('topolite'),
    editorialSafeguard: 'Academic research context only; no clinical deployment or validation claim is made.'
  },
  {
    slug: 'adaptiq', title: 'AdaptIQ / ForecastAI', tier: 'featured', category: 'Forecasting & Decision Systems', status: 'LIVE',
    hook: 'An end-to-end forecasting SaaS that turns uploaded retail data into forecasts, scenarios, confidence ranges, monitoring, and reports.',
    problem: 'Forecasting is only useful when teams can move from data intake to interpretable planning outputs.',
    solution: 'A single workflow connects multiple forecasting approaches with scenarios, confidence ranges, monitoring, and report delivery.',
    stack: ['Prophet', 'XGBoost', 'SARIMA', 'LSTM', 'FastAPI', 'React', 'Vite', 'Chart.js', 'Docker', 'Hugging Face'], github: 'https://github.com/Ibadat-Ali86/Demand-Sales-Walmart-Forecasting', live: 'https://huggingface.co/spaces/ibadatali/walmart-sales-forecasting-saas', sourceAccess: 'public', showSourceLink: true, canonicalWalmart: true, image: projectArt('adaptiq'),
    editorialSafeguard: 'This is the sole Walmart forecasting card; unsupported accuracy language is omitted.'
  },
  {
    slug: 'vital-link', title: 'VITAL-LINK', tier: 'featured', category: 'AI Health & Applied ML', status: 'PROTOTYPE',
    hook: 'A multimodal clinical prototype combining chest X-ray, lung audio, and patient vitals into one assisted-review workflow.',
    problem: 'Multimodal health prototypes require careful assisted-review framing and useful consolidation of diverse inputs.',
    solution: 'A prototype brings image, audio, and vital-sign inputs into one review-oriented workflow with explicit boundaries.',
    stack: ['Python', 'Flask', 'Gemini 2.0 Flash', 'Chart.js', 'jsPDF'], github: 'https://github.com/Ibadat-Ali86/data-science-portfolio/tree/main/projects/02-multimodal-medical-diagnosis-ai-gemini', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('vital-link'),
    editorialSafeguard: 'Prototype and assisted-review language only; no diagnosis or clinical validation claim is made.'
  },
  {
    slug: 'evershine', title: 'Evershine Academy LMS', tier: 'featured', category: 'Full-Stack & Client Platforms', status: 'PRIVATE CLIENT',
    hook: 'A private client education platform bringing admissions, programs, campus information, and LMS access into one public experience.',
    problem: 'Education journeys need a clear public path across admissions, programs, campus information, and LMS access.',
    solution: 'A private client platform unifies those public touchpoints into a coherent experience.',
    stack: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'role-based dashboards'], github: null, live: 'https://evershineacadmey.com/', sourceAccess: 'private', showSourceLink: false, image: projectArt('evershine'),
    editorialSafeguard: 'Private client project with a live-site action only.'
  },
  {
    slug: 'resume-builder', title: 'AI Resume Builder', tier: 'selected', category: 'Full-Stack & Client Platforms', status: 'LIVE',
    hook: 'A guided resume-building application with structured forms, live state, authentication, and PDF export.',
    problem: 'Resume creation needs an approachable workflow without losing control of structured information and export.',
    solution: 'A guided application connects form state, authentication, and PDF generation in a focused experience.',
    stack: ['React 18', 'TypeScript', 'Tailwind', 'Supabase', 'Zustand', 'React Hook Form', 'Zod', 'Radix UI', 'html2canvas', 'jsPDF', 'Vite'], github: 'https://github.com/Ibadat-Ali86/Interactive-Resume-Builder', live: 'https://snap-resume-p8lzooqtt-ibadcodes-6074s-projects.vercel.app', sourceAccess: 'public', showSourceLink: true, image: projectArt('resume-builder'), editorialSafeguard: 'Live deployment link is retained; no unsupported outcome claims are shown.'
  },
  {
    slug: 'learning-dashboard', title: 'Personalized AI Learning Dashboard', tier: 'selected', category: 'Full-Stack & Client Platforms', status: 'CASE STUDY',
    hook: 'A learning-management workspace for goals, resources, reminders, reports, analytics, and AI-assisted study support.',
    problem: 'Learners need a connected place to coordinate goals, resources, reminders, reports, and support.',
    solution: 'A full-stack workspace brings scheduled tasks, structured resources, analytics, and AI assistance together.',
    stack: ['Flask', 'SQLAlchemy', 'Alembic', 'JWT', 'APScheduler', 'Gemini', 'PyPDF2', 'Pillow', 'pytesseract', 'moviepy', 'JavaScript'], github: 'https://github.com/Ibadat-Ali86/new', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('learning-dashboard'), editorialSafeguard: 'The public title describes the work rather than mirroring the repository name.'
  },
  {
    slug: 'covid-analytics', title: 'COVID-19 Global Analytics Platform', tier: 'selected', category: 'Analytics & BI', status: 'CASE STUDY',
    hook: 'A full-stack pandemic analytics platform with automated ETL, database-backed APIs, and an interactive dashboard.',
    problem: 'Analytics systems need dependable movement from source data through services to interpretable views.',
    solution: 'An automated ETL and database-backed API layer feeds an interactive analytical interface.',
    stack: ['Python', 'MySQL', 'FastAPI', 'React', 'TypeScript', 'Tailwind', 'Vite', 'Docker'], github: 'https://github.com/Ibadat-Ali86/Data_Analysis_Projects/tree/main/COVID19-Data-Analytics-Platform', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('covid-analytics'), editorialSafeguard: 'Presented as an analytics case study without medical or public-health outcome claims.'
  },
  {
    slug: 'pakistan-ecommerce', title: 'Pakistan E-commerce Price Prediction', tier: 'selected', category: 'Data Science & Forecasting', status: 'ML CASE STUDY',
    hook: 'A price-prediction workflow built around Pakistani e-commerce transaction data and deployable inference.',
    problem: 'Price-prediction work needs a disciplined path from transaction data to reproducible inference.',
    solution: 'A data-science workflow evaluates tree-based approaches and packages an inference-oriented application.',
    stack: ['Python', 'pandas', 'scikit-learn', 'Random Forest', 'Gradient Boosting', 'Flask', 'Jupyter'], github: 'https://github.com/Ibadat-Ali86/data-science-portfolio/tree/main/projects/01-pakistan-ecommerce-price-prediction', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('pakistan-ecommerce'), editorialSafeguard: 'Unverified R² and row-count figures are omitted.'
  },
  {
    slug: 'vendor-analysis', title: 'Vendor Performance Analysis', tier: 'selected', category: 'Analytics & BI', status: 'ANALYTICS',
    hook: 'A procurement and inventory analysis workflow connecting sales, purchases, pricing, invoices, and vendor performance.',
    problem: 'Procurement decisions become difficult when sales, purchasing, pricing, and invoices remain disconnected.',
    solution: 'An analytical workflow connects those datasets to make vendor performance and inventory questions inspectable.',
    stack: ['Python', 'pandas', 'SQL', 'SQLite', 'Jupyter', 'data visualization'], github: 'https://github.com/Ibadat-Ali86/Data_Analysis_Projects/tree/main/Vendor_Performance_Analysis_Project', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('vendor-analysis'), editorialSafeguard: 'Dataset-volume figures are omitted until independently checked.'
  },
  {
    slug: 'mnist', title: 'MNIST Logistic Regression', tier: 'lab', category: 'ML & Data Labs', status: 'ML LAB',
    hook: 'A compact handwritten-digit classification pipeline with custom IDX loading, preprocessing, training, evaluation, persistence, and CLI prediction.',
    problem: 'A foundational ML workflow is more useful when each stage remains inspectable and runnable.',
    solution: 'The lab covers data loading, preprocessing, logistic-regression training, evaluation, persistence, and CLI prediction.',
    stack: ['Python', 'NumPy', 'scikit-learn', 'Logistic Regression', 'SGD', 'PCA', 'CLI'], github: 'https://github.com/Ibadat-Ali86/ML_Projects/tree/main/data/MNIST', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('mnist'), editorialSafeguard: 'Accuracy figures are omitted until reproduced.'
  },
  {
    slug: 'spam-classifier', title: 'Email / SMS Spam Classifier', tier: 'lab', category: 'ML & Data Labs', status: 'ML LAB',
    hook: 'A Streamlit text-classification app using normalized text, TF-IDF features, and logistic regression.',
    problem: 'Text classification benefits from explicit, inspectable preprocessing and feature construction.',
    solution: 'A compact Streamlit lab applies normalized text, TF-IDF features, and logistic regression.',
    stack: ['Python', 'NLTK', 'TF-IDF', 'Logistic Regression', 'Streamlit'], github: 'https://github.com/Ibadat-Ali86/ML_Projects/tree/main/data/Spam%20Email%20Classifier/TASK%201/sms-spam-classifier-main', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('spam-classifier'), editorialSafeguard: 'Local-path limitations are retained as a maintenance consideration.'
  },
  {
    slug: 'netflix', title: 'Netflix Data Analysis', tier: 'lab', category: 'Analytics & BI', status: 'DATA LAB',
    hook: 'Exploratory analysis of movie metadata, genres, release patterns, popularity, and feature relationships.',
    problem: 'Exploration needs a concise way to inspect distributions and relationships before modeling decisions.',
    solution: 'A notebook-based lab studies metadata, genres, release patterns, popularity, and feature relationships.',
    stack: ['Python', 'pandas', 'Matplotlib', 'seaborn', 'Jupyter'], github: 'https://github.com/Ibadat-Ali86/Netflix_DataAnalysis', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('netflix'), editorialSafeguard: 'Presented as exploratory analysis rather than predictive modeling.'
  },
  {
    slug: 'employee-form', title: 'Employee Information Form', tier: 'lab', category: 'ML & Data Labs', status: 'R SHINY LAB',
    hook: 'A reactive R Shiny form with validation, dates, file upload, and structured output.',
    problem: 'Structured input tools need visible validation and predictable state transitions.',
    solution: 'An R Shiny exercise combines reactive inputs, dates, file upload, validation, and structured output.',
    stack: ['R', 'Shiny', 'reactive programming', 'form validation'], github: 'https://github.com/Ibadat-Ali86/R_Shiny-Web_Apps/blob/main/Scenario1.R', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('employee-form'), editorialSafeguard: 'Displayed as a focused child lab, not as the parent collection.'
  },
  {
    slug: 'csv-cleaner', title: 'CSV Data Cleaner', tier: 'lab', category: 'ML & Data Labs', status: 'R SHINY TOOL',
    hook: 'A small R Shiny utility for uploading, previewing, cleaning, and downloading tabular data.',
    problem: 'Small data-cleaning tasks still need transparent upload, inspection, transformation, and download steps.',
    solution: 'An R Shiny utility supports a concise tabular-data cleaning workflow.',
    stack: ['R', 'Shiny', 'CSV parsing', 'reactive data cleaning'], github: 'https://github.com/Ibadat-Ali86/R_Shiny-Web_Apps/blob/main/Scenario2.R', live: null, sourceAccess: 'public', showSourceLink: true, image: projectArt('csv-cleaner'), editorialSafeguard: 'Displayed as a focused child tool, not as the parent collection.'
  }
];

export const excludedProjectNames = [
  'Data_Analysis_Projects', 'ML_Projects', 'R_Shiny-Web_Apps', 'portfolio', 'Learning_Dasboard', 'My_Python_Projects', 'claw-code', 'everything-claude-code', 'data-science-portfolio'
];
