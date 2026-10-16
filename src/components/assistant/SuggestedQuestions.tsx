"use client"

import React from "react"
import type { ConversationMode } from "@/types/chat"

interface SuggestedQuestionsProps {
  questions: string[]
  currentMode: ConversationMode
  onSelectQuestion: (question: string) => void
  onSelectMode: (mode: ConversationMode) => void
  disabled?: boolean
}

export function SuggestedQuestions({
  questions,
  currentMode,
  onSelectQuestion,
  onSelectMode,
  disabled = false
}: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-col gap-2.5 py-1">
      {/* 21st.dev Tactile Perspective Switcher Bar */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-0.5">
        <div className="stitch-segmented inline-flex items-center p-1 rounded-xl border border-white/[0.08] bg-black/40 shadow-inner">
          <button
            type="button"
            onClick={() => onSelectMode("general")}
            className={`segmented-option flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              currentMode === "general"
                ? "active bg-gradient-to-r from-[#ffc466] to-[#ffad24] text-black font-semibold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
            disabled={disabled}
          >
            <span>Explore Universe 🛸</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectMode("recruiter")}
            className={`segmented-option flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              currentMode === "recruiter"
                ? "active bg-gradient-to-r from-[#ffc466] to-[#ffad24] text-black font-semibold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
            disabled={disabled}
          >
            <span>Recruiter Lens 💼</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectMode("client")}
            className={`segmented-option flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              currentMode === "client"
                ? "active bg-gradient-to-r from-[#ffc466] to-[#ffad24] text-black font-semibold shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
            disabled={disabled}
          >
            <span>Client Direct 💡</span>
          </button>
        </div>
      </div>

      {/* Suggested Questions Grid (21st.dev micro-cards) */}
      <div className="flex flex-wrap gap-2">
        {questions.map((q, idx) => (
          <button
            key={`${q}-${idx}`}
            type="button"
            onClick={() => onSelectQuestion(q)}
            disabled={disabled}
            className="group/q inline-flex items-center gap-2 text-left px-3 py-1.5 rounded-xl text-xs bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-[var(--amber)]/50 text-slate-300 hover:text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-sm hover:shadow-[0_2px_12px_rgba(255,173,36,0.18)] hover:-translate-y-0.5"
          >
            <span className="font-mono text-[10px] text-[var(--amber)] opacity-70 group-hover/q:opacity-100">
              0{idx + 1}
            </span>
            <span className="line-clamp-1">{q}</span>
            <span className="text-white/30 group-hover/q:text-[var(--amber)] transition-colors text-xs font-mono">
              ↗
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
