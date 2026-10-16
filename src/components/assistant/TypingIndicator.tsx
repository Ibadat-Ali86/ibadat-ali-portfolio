"use client"

import React, { useEffect, useState } from "react"

interface TypingIndicatorProps {
  statusText?: string
}

const COSMIC_THINKING_STATES = [
  "Searching verified repository embeddings 🔍",
  "Checking claim boundaries & evidence 🛡️",
  "Synthesizing architecture insight with Groq ✨",
  "Formulating verified answer... 🛸"
]

export function TypingIndicator({ statusText }: TypingIndicatorProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (statusText) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % COSMIC_THINKING_STATES.length)
    }, 1100)
    return () => clearInterval(timer)
  }, [statusText])

  const displayStatus = statusText || COSMIC_THINKING_STATES[index]

  return (
    <div
      className="flex items-center gap-3 py-2 px-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md w-fit max-w-[90%] text-xs text-slate-300 font-mono animate-fade-in shadow-sm"
      role="status"
      aria-live="polite"
    >
      {/* 21st.dev Style Audio Wave Equalizer */}
      <div className="flex items-center gap-1 h-3.5" aria-hidden="true">
        <span
          className="w-1 bg-[var(--amber)] rounded-full animate-pulse"
          style={{ height: "60%", animationDelay: "0ms", animationDuration: "800ms" }}
        />
        <span
          className="w-1 bg-[var(--blue-light)] rounded-full animate-pulse"
          style={{ height: "100%", animationDelay: "150ms", animationDuration: "800ms" }}
        />
        <span
          className="w-1 bg-[var(--amber-pale)] rounded-full animate-pulse"
          style={{ height: "45%", animationDelay: "300ms", animationDuration: "800ms" }}
        />
        <span
          className="w-1 bg-emerald-400 rounded-full animate-pulse"
          style={{ height: "85%", animationDelay: "450ms", animationDuration: "800ms" }}
        />
      </div>

      <span className="tracking-tight text-[12px] opacity-90 transition-opacity duration-300">
        {displayStatus}
      </span>
    </div>
  )
}
