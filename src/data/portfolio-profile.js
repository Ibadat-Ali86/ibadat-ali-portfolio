export const publicProfile = {
  name: 'Ibadat Ali',
  headline: 'Data Analyst, Data Scientist & ML Engineer building decision-ready analytics, predictive systems, and full-stack AI products for real constraints.',
  summary: [
    'Ibadat works across the full lifecycle of intelligent products: data preparation, model development, backend APIs, interfaces, deployment, monitoring, and honest evaluation.',
    'His work focuses on the point where modeling meets security, usability, explainability, latency, uncertainty, and dependable delivery.',
    'The portfolio presents seven featured systems, five selected case studies, and five focused labs and tools.'
  ],
  capabilities: [
    {
      name: 'Data Analysis & BI',
      description: 'Turns fragmented operational data into decision-ready analysis through Python, SQL, ETL, notebooks, and visualisation.'
    },
    {
      name: 'Data Science & Forecasting',
      description: 'Builds reproducible predictive and forecasting workflows with scikit-learn, XGBoost, Prophet, SHAP, and explicit evaluation.'
    },
    {
      name: 'ML Engineering & Research',
      description: 'Develops deep-learning, anomaly-detection, and computer-vision systems with PyTorch, sequence models, and interpretable outputs.'
    },
    {
      name: 'ML Deployment & AI Products',
      description: 'Connects model-backed services to usable products with FastAPI, Flask, React, Next.js, PostgreSQL, Docker, and cloud deployment.'
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
      title: 'ML Engineering & Research',
      description: 'Deep-learning and anomaly-detection systems built around repeatable experimentation, explainability, and operational use cases.',
      groups: [
        { label: 'Deep learning', tools: ['PyTorch', 'TCN', 'LSTM', 'Autoencoder'] },
        { label: 'Computer vision', tools: ['EfficientNet-B0', 'CNN', 'Coordinate Attention', 'Grad-CAM'] },
        { label: 'Anomaly & optimisation', tools: ['Isolation Forest', 'PuLP', 'SHAP', 'Sequence modelling'] },
        { label: 'Research methods', tools: ['GUDHI', 'Persistent homology', 'Knowledge distillation', 'Evaluation design'] }
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
      index: '04 / ML DELIVERY',
      title: 'ML Deployment & AI Products',
      description: 'Model-backed products that connect data services, APIs, interfaces, persistence, and deployment into one usable system.',
      groups: [
        { label: 'Backend & data', tools: ['FastAPI', 'Flask', 'SQLAlchemy', 'Alembic'] },
        { label: 'Product interface', tools: ['React', 'Next.js 15', 'TypeScript', 'Vite'] },
        { label: 'Persistence & state', tools: ['PostgreSQL', 'Prisma', 'Supabase', 'Zustand'] },
        { label: 'Shipping', tools: ['Docker', 'Hugging Face', 'Vercel', 'Zod'] }
      ],
      industryGroups: [
        { label: 'Cloud ML platforms', tools: ['AWS SageMaker', 'Google Vertex AI', 'Azure Machine Learning', 'Databricks', 'Cloud Run', 'Azure Functions'] },
        { label: 'Serving & registries', tools: ['MLflow Registry', 'KServe', 'Seldon', 'BentoML', 'NVIDIA Triton', 'FastAPI'] },
        { label: 'Containers & delivery', tools: ['GitHub Actions', 'Docker', 'Kubernetes', 'Helm', 'Terraform', 'GitOps'] },
        { label: 'Monitoring & reliability', tools: ['Evidently', 'Arize', 'WhyLabs', 'Prometheus', 'Grafana', 'OpenTelemetry'] },
        { label: 'LLM & retrieval systems', tools: ['LangChain', 'LangGraph', 'LlamaIndex', 'pgvector', 'Pinecone', 'Qdrant'] }
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
    whatsapp: 'https://wa.me/923220692321'
  }
};

export const assistantSuggestions = [
  'Why should a client work with Ibadat?',
  'Which project best matches my needs?',
  'What can Ibadat build end to end?',
  'How can we start a conversation?'
];
