"use client"

import React, { useEffect, useRef, useState } from "react"
import type { ConversationMode, UIMessage } from "@/types/chat"
import { ChatMessage } from "./ChatMessage"
import { ChatInput } from "./ChatInput"
import { SuggestedQuestions } from "./SuggestedQuestions"
import { TypingIndicator } from "./TypingIndicator"
import { getDynamicQuestions } from "@/lib/agent/questions"

interface ChatWindowProps {
  initialMode?: ConversationMode
  onClose?: () => void
  onMinimize?: () => void
}

const INITIAL_GREETING: UIMessage = {
  id: "greeting-0",
  role: "assistant",
  content:
    "🛸 **Greetings! I am Orbi**, Ibadat Ali's personal AI portfolio assistant.\n\nI explore verified systems from his technical universe:\n- ⚙️ **AI Agents**: Tool-calling & MCP architecture (CodeScope)\n- 🛡️ **Automations**: Production WhatsApp OCR validation (PayGuard AI)\n- 📈 **Applied ML**: Time-series forecasting (AdaptIQ) & CV anomaly detection (SentinelIQ)\n\nWhich system or engineering capability would you like to inspect?",
  timestamp: 0,
  followUps: [
    "What AI agent architectures has Ibadat built?",
    "How does CodeScope MCP Preflight work?",
    "Can Ibadat build custom WhatsApp or RAG automations?"
  ],
  sourceIds: ["profile", "who-is-ibadat-ali"]
}

export function ChatWindow({
  initialMode = "general",
  onClose,
  onMinimize
}: ChatWindowProps) {
  const [messages, setMessages] = useState<UIMessage[]>([INITIAL_GREETING])
  const [isThinking, setIsThinking] = useState(false)
  const [mode, setMode] = useState<ConversationMode>(initialMode)
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([])
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(() => {
    return getDynamicQuestions({ mode: initialMode, count: 3 }).map((q) => q.text)
  })
  const [cooldown, setCooldown] = useState<number | null>(null)
  const [showScrollBottom, setShowScrollBottom] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isThinking])

  // Track scroll position to show scroll-to-bottom button
  function handleScroll() {
    const el = scrollContainerRef.current
    if (!el) return
    const isUp = el.scrollHeight - el.scrollTop - el.clientHeight > 150
    setShowScrollBottom(isUp)
  }

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Keyboard shortcut: Escape to close
  useEffect(() => {
    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape" && onClose) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // Cooldown countdown timer
  useEffect(() => {
    if (!cooldown) return
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (!prev || prev <= 1) return null
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  // Update suggestions when mode switches
  function handleModeChange(newMode: ConversationMode) {
    setMode(newMode)
    const fresh = getDynamicQuestions({
      mode: newMode,
      count: 3,
      excludeIds: usedQuestionIds
    })
    setSuggestedQuestions(fresh.map((q) => q.text))
    setUsedQuestionIds((prev) => [...prev, ...fresh.map((q) => q.id)])
  }

  async function handleSendMessage(text: string) {
    if (isThinking || cooldown) return

    const userMessageId = `user-${Date.now()}`
    const newUserMessage: UIMessage = {
      id: userMessageId,
      role: "user",
      content: text,
      timestamp: Date.now()
    }

    setMessages((prev) => [...prev, newUserMessage])
    setIsThinking(true)

    // Build bounded conversation history (last 4 turns)
    const historyPayload = messages.slice(-4).map((m) => ({
      role: m.role,
      content: m.content
    }))

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          mode
        })
      })

      if (response.status === 429) {
        setCooldown(60)
        const errorData = await response.json().catch(() => ({}))
        const errorMessage: UIMessage = {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content:
            errorData.answer ||
            "🛸 **Rate Limit Paused**\n\nCosmic communications array temporary cooldown active. Please wait 60 seconds or reach out to Ibadat directly.",
          timestamp: Date.now(),
          action: { type: "open_contact", target: "contact" }
        }
        setMessages((prev) => [...prev, errorMessage])
        return
      }

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: UIMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        timestamp: Date.now(),
        followUps: data.followUps,
        sourceIds: data.sourceIds,
        action: data.action
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Rotate dynamic questions on each response
      if (Array.isArray(data.dynamicSuggestions) && data.dynamicSuggestions.length > 0) {
        setSuggestedQuestions(data.dynamicSuggestions)
      } else {
        const rotated = getDynamicQuestions({
          mode,
          count: 3,
          excludeIds: usedQuestionIds
        })
        setSuggestedQuestions(rotated.map((q) => q.text))
        setUsedQuestionIds((prev) => [...prev, ...rotated.map((q) => q.id)])
      }
    } catch (err: any) {
      console.error("Chat transmission failed:", err)
      const fallbackMessage: UIMessage = {
        id: `assistant-fallback-${Date.now()}`,
        role: "assistant",
        content:
          "🌌 **Transmission Glitch**\n\nCould not reach the AI gateway. You can inspect Ibadat's verified systems directly or retry in a moment.",
        timestamp: Date.now(),
        followUps: [
          "Tell me about CodeScope MCP Preflight.",
          "What is PayGuard AI?",
          "How can I contact Ibadat directly?"
        ]
      }
      setMessages((prev) => [...prev, fallbackMessage])
    } finally {
      setIsThinking(false)
    }
  }

  function handleActionClick(type: string, target: string | null) {
    if (type === "open_contact") {
      window.location.href = "mailto:ibadcodes@gmail.com?subject=Technical%20Inquiry%20via%20Portfolio%20Agent"
    } else if (type === "open_project" && target) {
      const el = document.getElementById(target)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
      } else {
        window.open(`https://github.com/ibadat-ali/${target}`, "_blank")
      }
    } else if (type === "open_resume") {
      window.open("/resume.pdf", "_blank")
    }
  }

  function handleReset() {
    setMessages([INITIAL_GREETING])
    setUsedQuestionIds([])
    const fresh = getDynamicQuestions({ mode, count: 3 })
    setSuggestedQuestions(fresh.map((q) => q.text))
  }

  return (
    <div className="flex flex-col h-full max-h-[85vh] bg-[#0c0e15]/95 backdrop-blur-2xl border border-white/[0.12] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.7)] overflow-hidden">
      {/* Header Telemetry Bar */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full border border-[var(--amber)]/50 bg-[#08090d] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(255,173,36,0.25)]">
            <span className="text-sm">🛸</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#08090d]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white flex items-center gap-2">
              <span>Orbi</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--amber)]/10 text-[var(--amber)] border border-[var(--amber)]/25">
                Groq Qwen 27B
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Verified Evidence · Zero Hallucination
            </p>
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            title="Reset conversation"
          >
            Clear
          </button>
          {onMinimize && (
            <button
              type="button"
              onClick={onMinimize}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-xs"
              aria-label="Minimize assistant"
              title="Minimize"
            >
              −
            </button>
          )}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-xs"
              aria-label="Close assistant"
              title="Close (Esc)"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Message List */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 scrollbar-thin scrollbar-thumb-white/10"
      >
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            onSelectFollowUp={handleSendMessage}
            onActionClick={handleActionClick}
          />
        ))}

        {isThinking && <TypingIndicator />}

        {cooldown && (
          <div className="py-2.5 px-4 text-center text-xs font-mono text-[var(--amber)] bg-[var(--amber)]/10 border border-[var(--amber)]/25 rounded-xl animate-pulse">
            Cooldown active: {cooldown}s remaining
          </div>
        )}

        <div ref={messagesEndRef} />

        {/* Scroll-to-bottom Floating Action */}
        {showScrollBottom && (
          <button
            type="button"
            onClick={scrollToBottom}
            className="sticky bottom-2 left-1/2 -translate-x-1/2 mx-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 text-xs text-white shadow-lg backdrop-blur-md hover:bg-black transition-all cursor-pointer"
          >
            <span>↓ Jump to latest</span>
          </button>
        )}
      </div>

      {/* Footer & Question Bank */}
      <div className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#08090d]/85 backdrop-blur-md space-y-2.5">
        <SuggestedQuestions
          questions={suggestedQuestions}
          currentMode={mode}
          onSelectQuestion={handleSendMessage}
          onSelectMode={handleModeChange}
          disabled={isThinking || Boolean(cooldown)}
        />

        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isThinking || Boolean(cooldown)}
          currentMode={mode}
          onModeChange={handleModeChange}
        />
      </div>
    </div>
  )
}
