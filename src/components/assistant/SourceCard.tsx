"use client"

import React from "react"

interface SourceCardProps {
  sourceId: string
  onClick?: (sourceId: string) => void
}

const SOURCE_METADATA: Record<string, { title: string; category: string; icon: string }> = {
  codescope: { title: "CodeScope MCP Preflight", category: "AI Tool / Agent", icon: "⚙️" },
  "payguard-ai": { title: "PayGuard AI", category: "WhatsApp Automation", icon: "🛡️" },
  sentineliq: { title: "SentinelIQ", category: "Anomaly Detection", icon: "🔍" },
  adaptiq: { title: "AdaptIQ", category: "Demand Forecasting", icon: "📈" },
  carevision: { title: "CareVision", category: "Medical Imaging", icon: "🏥" },
  topolite: { title: "TopoLite", category: "TDA & Geometry", icon: "📐" },
  "ai-lead-generation": { title: "Lead Generation Agent", category: "n8n Automation", icon: "⚡" },
  "ai-restaurant-chatbot": { title: "AI Restaurant Chatbot", category: "Stateful Agent", icon: "🍽️" },
  profile: { title: "Ibadat Ali Profile", category: "Verified Profile", icon: "🛸" },
  "who-is-ibadat-ali": { title: "About Ibadat", category: "Verified Profile", icon: "✨" },
  "soft-shack": { title: "Soft Shack Experience", category: "Career Evidence", icon: "💼" },
  experience: { title: "Work Experience", category: "Career Evidence", icon: "💼" },
  certifications: { title: "Anthropic Credentials", category: "Certifications", icon: "📜" },
  skills: { title: "Engineering Skills", category: "Technical Stack", icon: "🧠" },
  services: { title: "Client Services", category: "Delivery & Process", icon: "🤝" }
}

export function SourceCard({ sourceId, onClick }: SourceCardProps) {
  const meta = SOURCE_METADATA[sourceId.toLowerCase()] || {
    title: sourceId.charAt(0).toUpperCase() + sourceId.slice(1).replace(/-/g, " "),
    category: "Verified Evidence",
    icon: "📄"
  }

  return (
    <button
      type="button"
      onClick={() => onClick?.(sourceId)}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm group"
      title={`Verified Grounding Source: ${meta.title}`}
    >
      <span className="text-xs">{meta.icon}</span>
      <span className="font-medium truncate max-w-[130px]">{meta.title}</span>
      <span className="text-[10px] text-emerald-400 group-hover:scale-110 transition-transform">✓</span>
    </button>
  )
}
