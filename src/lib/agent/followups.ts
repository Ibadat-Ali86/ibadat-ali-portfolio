// WHAT: Follow-up question generator and strict navigation action security whitelist.
// WHY : Ensures follow-up prompts are always engaging and contextually relevant,
//       while defending against arbitrary URL or parameter execution from LLM actions.
// TRADEOFF: Whitelists known project IDs and approved domains; unknown action targets
//           are safely converted to { type: "none", target: null }.

import type { AgentAction, Intent } from "./types"

export const APPROVED_PROJECT_IDS = new Set([
  "codescope",
  "payguard-ai",
  "sentineliq",
  "adaptiq",
  "carevision",
  "topolite",
  "vital-link",
  "ai-lead-generation",
  "ai-restaurant-chatbot",
  "evershine",
  "covid-analytics",
  "netflix",
  "pakistan-ecommerce",
  "vendor-analysis",
  "employee-form"
])

const APPROVED_DOMAIN_PREFIXES = [
  "https://ibadat-ali-portfolio.vercel.app",
  "https://github.com",
  "https://www.linkedin.com",
  "https://linkedin.com"
]

export const CONTEXTUAL_FOLLOW_UPS: Record<Intent, [string, string, string]> = {
  project: [
    "What technologies were used in this system?",
    "What were the key architectural decisions?",
    "How does this project handle evaluation boundaries?"
  ],
  skills: [
    "What is his experience with tool-calling agents and MCP?",
    "Which projects use Python, FastAPI, and Docker?",
    "Has he built production RAG systems?"
  ],
  experience: [
    "Tell me about his role at Soft Shack.",
    "What kind of systems did he deliver on Fiverr?",
    "What are his primary engineering strengths?"
  ],
  credentials: [
    "Which Anthropic certifications does Ibadat hold?",
    "What topics are covered in the Claude 101 certificate?",
    "How do these credentials apply to his AI engineering work?"
  ],
  services: [
    "How does Ibadat approach AI agent development?",
    "What does a typical project handoff include?",
    "Can he build custom RAG pipelines?"
  ],
  contact: [
    "How can I reach out for a technical consultation?",
    "What are his availability and working modes?",
    "Where can I view his public code repositories?"
  ],
  comparison: [
    "How does CodeScope compare to standard RAG?",
    "What is the difference between SentinelIQ and AdaptIQ?",
    "Which project best showcases full-stack AI delivery?"
  ],
  general_portfolio: [
    "What AI agent projects has Ibadat built?",
    "How does CodeScope MCP Preflight work?",
    "What are his core machine learning skills?"
  ]
}

/**
 * Returns 3 standard fallback follow-up questions tailored to the detected intent.
 */
export function getFallbackFollowUps(intent: Intent): [string, string, string] {
  return CONTEXTUAL_FOLLOW_UPS[intent] || CONTEXTUAL_FOLLOW_UPS.general_portfolio
}

export interface ProjectDestination {
  id: string
  title: string
  url: string
  type: "live" | "repository" | "case_study"
  actionLabel: string
}

export const PROJECT_DESTINATIONS: Record<string, ProjectDestination> = {
  codescope: {
    id: "codescope",
    title: "CodeScope MCP Preflight",
    url: "https://github.com/Ibadat-Ali86/codescope-mcp-preflight",
    type: "repository",
    actionLabel: "Explore CodeScope on GitHub"
  },
  "payguard-ai": {
    id: "payguard-ai",
    title: "PayGuard AI WhatsApp Verification",
    url: "https://ibadat-ali-portfolio.vercel.app/#featured",
    type: "case_study",
    actionLabel: "Inspect PayGuard AI Case Study"
  },
  sentineliq: {
    id: "sentineliq",
    title: "SentinelIQ NASA RUL Predictor",
    url: "https://sentinel-iq-nasa.vercel.app",
    type: "live",
    actionLabel: "Launch SentinelIQ Live System"
  },
  adaptiq: {
    id: "adaptiq",
    title: "AdaptIQ Sales Forecasting SaaS",
    url: "https://huggingface.co/spaces/ibadatali/walmart-sales-forecasting-saas",
    type: "live",
    actionLabel: "Launch AdaptIQ Live App"
  },
  carevision: {
    id: "carevision",
    title: "CareVision Multimodal Clinical AI",
    url: "https://carevision-chw.vercel.app/",
    type: "live",
    actionLabel: "Launch CareVision Live Platform"
  },
  evershine: {
    id: "evershine",
    title: "Evershine Academy LMS",
    url: "https://evershineacadmey.com/",
    type: "live",
    actionLabel: "Visit Evershine Academy Live Site"
  },
  topolite: {
    id: "topolite",
    title: "TopoLite-KD Knowledge Distillation",
    url: "https://github.com/Ibadat-Ali86/TopoLite-KD-Efficient-Topology-Aware-Knowledge-Distillation-for-COVID-19-CT-Slice-Classification",
    type: "repository",
    actionLabel: "View TopoLite-KD Research Code"
  },
  "vital-link": {
    id: "vital-link",
    title: "VITAL-LINK Multimodal Medical Diagnosis",
    url: "https://github.com/Ibadat-Ali86/data-science-portfolio/tree/main/projects/02-multimodal-medical-diagnosis-ai-gemini",
    type: "repository",
    actionLabel: "View VITAL-LINK Implementation"
  },
  "ai-lead-generation": {
    id: "ai-lead-generation",
    title: "AI-Powered Lead Generation Workflow",
    url: "https://ibadat-ali-portfolio.vercel.app/#featured",
    type: "case_study",
    actionLabel: "Inspect Lead Gen Workflow Study"
  },
  "ai-restaurant-chatbot": {
    id: "ai-restaurant-chatbot",
    title: "WhatsApp Restaurant Chatbot",
    url: "https://ibadat-ali-portfolio.vercel.app/#featured",
    type: "case_study",
    actionLabel: "Inspect Restaurant Chatbot Study"
  },
  "covid-analytics": {
    id: "covid-analytics",
    title: "COVID-19 Global Analytics Platform",
    url: "https://github.com/Ibadat-Ali86/Data_Analysis_Projects/tree/main/COVID19-Data-Analytics-Platform",
    type: "repository",
    actionLabel: "View COVID-19 Analytics on GitHub"
  },
  "pakistan-ecommerce": {
    id: "pakistan-ecommerce",
    title: "Pakistan E-Commerce Price Prediction",
    url: "https://github.com/Ibadat-Ali86/data-science-portfolio/tree/main/projects/01-pakistan-ecommerce-price-prediction",
    type: "repository",
    actionLabel: "View Price Prediction on GitHub"
  },
  "vendor-analysis": {
    id: "vendor-analysis",
    title: "Vendor Performance Analysis",
    url: "https://github.com/Ibadat-Ali86/Data_Analysis_Projects/tree/main/Vendor_Performance_Analysis_Project",
    type: "repository",
    actionLabel: "View Vendor Analysis on GitHub"
  },
  netflix: {
    id: "netflix",
    title: "Netflix Data Analysis",
    url: "https://github.com/Ibadat-Ali86/Netflix_DataAnalysis",
    type: "repository",
    actionLabel: "View Netflix Data Lab on GitHub"
  },
  "employee-form": {
    id: "employee-form",
    title: "Employee Information Form",
    url: "https://github.com/Ibadat-Ali86/R_Shiny-Web_Apps/blob/main/Scenario1.R",
    type: "repository",
    actionLabel: "View Shiny App Script on GitHub"
  }
}

/**
 * Validates and sanitizes an action proposed by the LLM against the security whitelist.
 * Automatically injects human-friendly labels and exact verified destination URLs.
 */
export function sanitizeAction(action?: AgentAction | null): AgentAction {
  if (!action || !action.type || action.type === "none") {
    return { type: "none", target: null }
  }

  if (action.type === "open_project") {
    const rawTarget = action.target ? action.target.toLowerCase().trim() : ""
    if (APPROVED_PROJECT_IDS.has(rawTarget)) {
      const dest = PROJECT_DESTINATIONS[rawTarget]
      return {
        type: "open_project",
        target: rawTarget,
        label: dest ? dest.actionLabel : `Explore Project: ${rawTarget}`,
        url: dest ? dest.url : `https://github.com/Ibadat-Ali86/${rawTarget}`
      }
    }
    return { type: "none", target: null }
  }

  if (action.type === "open_resume") {
    return {
      type: "open_resume",
      target: "resume",
      label: "Download Verified Resume 📄",
      url: "https://ibadat-ali-portfolio.vercel.app/Ibadat_Ali_Resume.pdf"
    }
  }

  if (action.type === "open_contact") {
    return {
      type: "open_contact",
      target: "contact",
      label: "Get in Touch via Email ✉️",
      url: "mailto:ibadcodes@gmail.com?subject=Technical%20Consultation%20via%20Portfolio%20Agent"
    }
  }

  if (action.type === "open_link" && typeof action.target === "string") {
    const target = action.target.trim()
    const isApproved = APPROVED_DOMAIN_PREFIXES.some((prefix) => target.startsWith(prefix))
    if (isApproved) {
      return {
        type: "open_link",
        target,
        label: "Open External Resource ↗",
        url: target
      }
    }
    return { type: "none", target: null }
  }

  return { type: "none", target: null }
}
