"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ChatWindow } from "./ChatWindow"
import type { ConversationMode } from "@/types/chat"

interface ChatWidgetProps {
  initialOpen?: boolean
  initialMode?: ConversationMode
}

export function ChatWidget({
  initialOpen = false,
  initialMode = "general"
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const [showTeaser, setShowTeaser] = useState(true)

  // Auto-dismiss teaser after 8s or when user interacts
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(false)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  function handleOpen() {
    setIsOpen(true)
    setShowTeaser(false)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[480px] md:w-[540px] mb-3.5 shadow-[0_24px_70px_rgba(0,0,0,0.7)] animate-fade-in">
          <ChatWindow
            initialMode={initialMode}
            onClose={() => setIsOpen(false)}
            onMinimize={() => setIsOpen(false)}
          />
        </div>
      )}

      {/* Floating Trigger & Interactive Teaser */}
      {!isOpen && (
        <div className="flex items-center gap-2.5">
          {/* Teaser Notification Bubble (21st.dev Style Pill) */}
          {showTeaser && (
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0e111a]/95 border border-[var(--amber)]/35 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md animate-fade-in">
              <span className="text-xs text-slate-200">
                Explore Ibadat&apos;s verified AI projects with <strong className="text-[var(--amber)]">Orbi</strong>
              </span>
              <button
                type="button"
                onClick={() => setShowTeaser(false)}
                className="text-slate-400 hover:text-white text-xs p-0.5 rounded cursor-pointer"
                aria-label="Dismiss message"
              >
                ✕
              </button>
            </div>
          )}

          {/* Floating Trigger Pill */}
          <button
            type="button"
            onClick={handleOpen}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-[#14161e] via-[#0f1118] to-[#08090e] border border-[var(--amber)]/45 hover:border-[var(--amber)] shadow-[0_8px_30px_rgba(255,173,36,0.22)] hover:shadow-[0_8px_40px_rgba(255,173,36,0.4)] transition-all duration-300 cursor-pointer active:scale-95"
            aria-label="Open Ibadat Ali Portfolio Assistant"
          >
            {/* Cosmic Radar Aura */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[var(--amber)] to-blue-500 opacity-25 blur-md group-hover:opacity-60 transition duration-300" />

            {/* Orbi Avatar with Radar Ping */}
            <div className="relative w-8 h-8 rounded-full border border-[var(--amber)]/60 bg-[#08090d] flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src="/orbi-mascot.png"
                alt="Orbi"
                width={32}
                height={32}
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none"
                }}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#08090d]" />
            </div>

            <div className="relative flex flex-col items-start pr-1 text-left">
              <span className="text-xs font-semibold text-white group-hover:text-[var(--amber-pale)] transition-colors flex items-center gap-1.5">
                <span>Ask Orbi AI</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Verified AI Portfolio
              </span>
            </div>

            <span className="relative text-[var(--amber)] text-xs font-mono ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              ↗
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
