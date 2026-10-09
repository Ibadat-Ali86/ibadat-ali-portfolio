export const publicProfile = {
  name: 'Ibadat Ali',
  headline: 'AI Engineer & AI Agent Developer building tool-using agents, model-backed products, and dependable AI systems.',
  summary: [
    'Ibadat develops AI agent workflows using n8n, Model Context Protocol (MCP), retrieval, and tool-calling patterns, with explicit validation and fallback boundaries.',
    'His AI engineering work connects model integration to APIs, product interfaces, applied machine learning, evaluation, and documented handoff.',
    'The portfolio distinguishes client work, live products, research prototypes, and compact labs, and labels the evidence available for each project.'
  ],
  capabilities: [
    {
      name: 'AI Agent Development',
      description: 'Designs tool-using agents, MCP integrations, retrieval flows, and multi-stage n8n workflows with validation and explicit fallback boundaries.'
    },
    {
      name: 'AI Engineering & Retrieval',
      description: 'Builds local-first MCP tools, syntax-aware code retrieval, and vector-backed context systems that give agent workflows relevant evidence.'
    },
    {
      name: 'AI Product Engineering',
      description: 'Connects model and agent capabilities to APIs, application interfaces, persistence, and documented handoffs for usable systems.'
    },
    {
      name: 'Applied AI & Model Systems',
      description: 'Develops forecasting, predictive-maintenance, and applied research workflows with model comparison, explainability, and clear limitations.'
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
      index: '04 / Data foundations',
      title: 'Data Foundations for AI',
      description: 'Prepare, query, and inspect structured data so AI and machine-learning workflows start from clear, usable evidence.',
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
      index: '03 / Modeling and evaluation',
      title: 'Modeling & Evaluation',
      description: 'Build and compare predictive approaches with interpretable features, forecasting methods, and clear evaluation boundaries.',
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
      index: '02 / AI engineering',
      title: 'AI Engineering & Applied Research',
      description: 'Engineer deep-learning, anomaly-detection, and retrieval systems around repeatable experiments, explainability, and practical use cases.',
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
      index: '01 / Agent development',
      title: 'AI Agent Development & Automation',
      description: 'Build tool-calling agents, MCP integrations, retrieval workflows, and AI automations with clear boundaries and dependable validation.',
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
  'What kind of AI agents does Ibadat build?',
  'How does Ibadat engineer AI systems safely?',
  'Which project shows Ibadat’s agent-development work?',
  'How can we start a conversation?'
];
