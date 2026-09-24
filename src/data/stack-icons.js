import {
  siDocker,
  siDigitalocean,
  siFastapi,
  siFlask,
  siHuggingface,
  siJavascript,
  siLangchain,
  siLanggraph,
  siN8n,
  siNetflix,
  siNodedotjs,
  siPandas,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siScikitlearn,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVite,
  siWhatsapp,
  siZapier
} from 'simple-icons';

const technologyIcons = [
  { match: ['whatsapp'], icon: siWhatsapp },
  { match: ['n8n'], icon: siN8n },
  { match: ['zapier'], icon: siZapier },
  { match: ['langchain'], icon: siLangchain },
  { match: ['langgraph'], icon: siLanggraph },
  { match: ['node.js', 'nodejs'], icon: siNodedotjs },
  { match: ['python'], icon: siPython },
  { match: ['stripe'], icon: siStripe },
  { match: ['digitalocean'], icon: siDigitalocean },
  { match: ['docker'], icon: siDocker },
  { match: ['fastapi'], icon: siFastapi },
  { match: ['react'], icon: siReact },
  { match: ['typescript'], icon: siTypescript },
  { match: ['vite'], icon: siVite },
  { match: ['tailwind'], icon: siTailwindcss },
  { match: ['postgresql', 'postgres'], icon: siPostgresql },
  { match: ['pytorch'], icon: siPytorch },
  { match: ['netflix'], icon: siNetflix },
  { match: ['pandas'], icon: siPandas },
  { match: ['scikit-learn', 'scikitlearn'], icon: siScikitlearn },
  { match: ['hugging face', 'huggingface'], icon: siHuggingface },
  { match: ['flask'], icon: siFlask },
  { match: ['javascript'], icon: siJavascript }
];

export function stackBrandFor(label) {
  const normalizedLabel = label.toLowerCase();
  return technologyIcons.find(({ match }) => match.some((alias) => normalizedLabel.includes(alias)))?.icon ?? null;
}
