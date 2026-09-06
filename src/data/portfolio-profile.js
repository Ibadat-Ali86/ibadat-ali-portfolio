export const publicProfile = {
  name: 'Ibadat Ali',
  headline: 'AI Automation Engineer & Systems Builder shipping reliable LLM workflows, agent tool-calling, predictive ML, and client-delivered platforms.',
  summary: [
    'Ibadat maps real business workflows to reliable, documented automations — integrating Claude, Gemini 2.0 Flash, and MCP tool-calling with explicit fallbacks, validation layers, and model-boundary annotations.',
    'Delivered verified production systems to real clients: an offline-first retail POS (React + Electron + SQLite) and an enterprise multi-campus LMS (Next.js + PostgreSQL).',
    'The portfolio presents seven featured systems, five selected case studies, and five focused labs, backed by verified telemetry, client delivery artifacts, and evaluation hooks.'
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
    instagram: 'https://www.instagram.com/deepfx_ai/',
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
