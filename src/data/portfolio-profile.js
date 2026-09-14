export const publicProfile = {
  name: 'Ibadat Ali',
  headline: 'AI Automation & Workflow Engineer building predictive models, agent systems, and client-ready software that turns manual processes into useful decisions.',
  summary: [
    'Ibadat maps real business workflows to reliable, documented automations — integrating Claude, Gemini 2.0 Flash, and MCP tool-calling with explicit fallbacks, validation layers, and model-boundary annotations.',
    'Delivered verified production systems to real clients: an offline-first retail POS (React + Electron + SQLite) and an enterprise multi-campus LMS (Next.js + PostgreSQL).',
    'The public showcase focuses on six high-signal case studies, backed by client delivery artifacts, workflow evidence, live demos, and evaluation hooks. The broader learning catalog remains preserved in the source portfolio data.'
  ],
  capabilities: [
    {
      name: 'AI Automation & LLM Workflows',
      description: 'Designs multi-stage n8n pipelines, tool-calling agents, and structured prompt flows with deterministic validation and automated error fallback routing.'
    },
    {
      name: 'Agent Architecture & MCP',
      description: 'Builds local-first Model Context Protocol (MCP) servers, AST-aware retrieval pipelines, and vector-backed RAG systems that ground agent reasoning.'
    },
    {
      name: 'Client Delivery & Offline-First Apps',
      description: 'Ships end-to-end client applications: offline-first retail POS (React + Electron + SQLite) and enterprise multi-campus school management platforms (Next.js + PostgreSQL).'
    },
    {
      name: 'Predictive ML & Decision Systems',
      description: 'Builds time-series demand forecasting (Prophet, XGBoost, LSTM) and industrial predictive maintenance (PyTorch, TCN, PuLP) with SHAP attribution.'
    }
  ],
  experience: [
    {
      period: '2025 — Present (paused Dec 2025 – Mar 2026 for full-time role)',
      role: 'Independent Data Scientist / AI Consultant',
      organization: 'Fiverr · Remote',
      duration: 'Ongoing freelance delivery',
      description: 'Delivering predictive modeling, forecasting, NLP, RAG, computer vision, and AI automation systems for international clients, with stakeholder-ready reports and structured handoff documentation.'
    },
    {
      period: 'Dec 2025 — Mar 2026',
      role: 'ML / AI Engineer',
      organization: 'Soft Shack · Full-time, on-site',
      duration: '4 months',
      description: 'Designed production ML and LLM-integrated automation pipelines with FastAPI and Docker, adding RAG retrieval, confidence gates, audit logging, and client-ready technical handoffs.'
    },
    {
      period: 'May 2025 — Aug 2025',
      role: 'Data Scientist Intern',
      organization: 'Arch Technologies · Internship',
      duration: '4 months',
      description: 'Built and evaluated forecasting and predictive analytics models with Python, Scikit-learn, XGBoost, and Pandas; engineered SQL/CSV ETL workflows and delivered SHAP-based reports.'
    }
  ],
  certifications: [
    {
      title: 'AI Fluency: Framework & Foundations',
      issuer: 'Anthropic',
      year: '2026',
      image: '/assets/certificates/ai-fluency-framework-foundations.png',
      pdf: '/assets/certificates/ai-fluency-framework-foundations.pdf'
    },
    {
      title: 'Claude 101',
      issuer: 'Anthropic',
      year: '2026',
      image: '/assets/certificates/claude-101.png',
      pdf: '/assets/certificates/claude-101.pdf'
    }
  ],
  specializations: [
    {
      slug: 'data-analysis',
      index: '01 / DATA ANALYSIS',
      title: 'Data Analysis & BI',
      description: 'From raw operational data to decision-ready analysis: query, clean, explore, visualise, and communicate the signal.',
      groups: [
        { label: 'Query & storage', tools: ['SQL', 'PostgreSQL', 'MySQL', 'SQLite'] },
        { label: 'Analysis & notebooks', tools: ['Python', 'Pandas', 'NumPy', 'Jupyter'] },
        { label: 'Visualisation', tools: ['Matplotlib', 'Seaborn', 'Chart.js'] },
        { label: 'Data workflows', tools: ['ETL pipelines', 'CSV workflows', 'R Shiny'] }
      ],
      industryGroups: [
        { label: 'Business intelligence', tools: ['Power BI', 'Tableau', 'Looker', 'Looker Studio', 'Excel', 'Google Sheets'] },
        { label: 'Semantic modelling', tools: ['Power Query', 'DAX', 'LookML', 'Data modelling', 'Row-level security'] },
        { label: 'Warehouses & lakehouse', tools: ['BigQuery', 'Snowflake', 'Redshift', 'Microsoft Fabric', 'Databricks SQL', 'DuckDB'] },
        { label: 'Transformation & quality', tools: ['dbt', 'Apache Airflow', 'Fivetran', 'Azure Data Factory', 'Great Expectations', 'Alteryx'] }
      ]
    },
    {
      slug: 'data-science',
      index: '02 / DATA SCIENCE',
      title: 'Data Science & Forecasting',
      description: 'Structured predictive work with interpretable features, robust baselines, time-series forecasting, and clear model evaluation.',
      groups: [
        { label: 'Classical ML', tools: ['Scikit-learn', 'Random Forest', 'Gradient Boosting', 'Logistic Regression'] },
        { label: 'Forecasting', tools: ['Prophet', 'SARIMA', 'XGBoost', 'LSTM'] },
        { label: 'Features & NLP', tools: ['PCA', 'TF-IDF', 'NLTK', 'Pandas'] },
        { label: 'Explainability', tools: ['SHAP', 'Grad-CAM', 'RMSE', 'MAPE'] }
      ],
      industryGroups: [
        { label: 'Scientific & statistical Python', tools: ['SciPy', 'Statsmodels', 'Polars', 'DuckDB', 'Featuretools', 'JupyterLab'] },
        { label: 'Gradient boosting & tuning', tools: ['LightGBM', 'CatBoost', 'Optuna', 'imbalanced-learn', 'Cross-validation', 'Calibration'] },
        { label: 'NLP & foundation models', tools: ['spaCy', 'Transformers', 'SentenceTransformers', 'Hugging Face Datasets', 'Tokenizers', 'Embeddings'] },
        { label: 'Reproducibility & experiments', tools: ['MLflow', 'Weights & Biases', 'DVC', 'Git', 'Conda', 'Poetry'] }
      ]
    },
    {
      slug: 'ml-engineering',
      index: '03 / ML ENGINEERING',
      title: 'ML Engineering & Applied Research',
      description: 'Deep-learning, anomaly-detection, and agent retrieval systems built around repeatable experimentation, explainability, and operational use cases.',
      groups: [
        { label: 'Deep learning', tools: ['PyTorch', 'TCN', 'LSTM', 'Autoencoder'] },
        { label: 'Agent context & retrieval', tools: ['Tree-sitter AST', 'sentence-transformers', 'Chroma', 'Semantic search'] },
        { label: 'Anomaly & optimisation', tools: ['Isolation Forest', 'PuLP', 'SHAP', 'Sequence modelling'] },
        { label: 'Computer vision & research', tools: ['EfficientNet-B0', 'CNN', 'Coordinate Attention', 'Grad-CAM'] }
      ],
      industryGroups: [
        { label: 'Frameworks & acceleration', tools: ['TensorFlow', 'Keras', 'ONNX', 'ONNX Runtime', 'TensorRT', 'CUDA'] },
        { label: 'Scalable data & compute', tools: ['PySpark', 'Ray', 'Dask', 'WebDataset', 'Hugging Face Datasets', 'Apache Arrow'] },
        { label: 'Experiment control', tools: ['MLflow', 'Weights & Biases', 'DVC', 'Hydra', 'Git LFS', 'Reproducible configs'] },
        { label: 'Pipelines & packaging', tools: ['Kubeflow Pipelines', 'Prefect', 'Metaflow', 'Docker', 'FastAPI', 'BentoML'] }
      ]
    },
    {
      slug: 'ai-products',
      index: '04 / AI AUTOMATION & DELIVERY',
      title: 'AI Automation & Product Systems',
      description: 'Production LLM workflows, agent tool-calling, APIs, and client-delivered platforms built with deterministic validation and operational telemetry.',
      groups: [
        { label: 'LLM & Agent Workflows', tools: ['n8n', 'MCP (Model Context Protocol)', 'Claude API', 'Gemini 2.0 Flash', 'LangChain'] },
        { label: 'Backend APIs & Validation', tools: ['FastAPI', 'Flask', 'SQLAlchemy', 'Alembic', 'Zod'] },
        { label: 'Client Platforms & UI', tools: ['React 18', 'Next.js 15', 'TypeScript', 'Electron (Offline-first)'] },
        { label: 'Persistence & Ops', tools: ['PostgreSQL', 'SQLite', 'Prisma', 'Docker', 'Vercel'] }
      ],
      industryGroups: [
        { label: 'Cloud ML & LLM platforms', tools: ['Google Vertex AI', 'AWS SageMaker', 'Azure Machine Learning', 'Cloud Run'] },
        { label: 'Agent orchestration & frameworks', tools: ['LangGraph', 'LlamaIndex', 'CrewAI', 'OpenTelemetry', 'Semantic Kernel'] },
        { label: 'Serving & messaging', tools: ['FastAPI', 'BentoML', 'RabbitMQ', 'Redis', 'WhatsApp Business API'] },
        { label: 'Containers & CI/CD', tools: ['Docker', 'GitHub Actions', 'Kubernetes', 'Helm', 'Vercel'] },
        { label: 'Monitoring & reliability', tools: ['Evidently', 'Arize Phoenix', 'WhyLabs', 'Prometheus', 'Grafana'] }
      ]
    }
  ],
  contact: {
    email: 'ibadcodes@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mirzaibadatali',
    github: 'https://github.com/Ibadat-Ali86',
    kaggle: 'https://www.kaggle.com/ibadatali',
    tiktok: 'https://www.tiktok.com/@deepfx6',
    instagram: 'https://www.instagram.com/expla_inableai?stkn=N2xnN3NsOHEzbjdi',
    whatsapp: 'https://wa.me/923220692321',
    resume: '/Ibadat_Ali_Resume.pdf'
  }
};

export const assistantSuggestions = [
  'Why should a client work with Ibadat?',
  'Which project best matches my needs?',
  'What can Ibadat build end to end?',
  'How can we start a conversation?'
];
