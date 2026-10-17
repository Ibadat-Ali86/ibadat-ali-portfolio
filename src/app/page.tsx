"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { getDynamicQuestions } from "@/lib/agent/questions"
import type { ConversationMode, UIMessage } from "@/types/chat"
import { ChatMessage } from "@/components/assistant/ChatMessage"
import { ChatInput } from "@/components/assistant/ChatInput"
import { TypingIndicator } from "@/components/assistant/TypingIndicator"
import { SuggestedQuestions } from "@/components/assistant/SuggestedQuestions"

const INITIAL_WELCOME: UIMessage = {
  id: "welcome-msg",
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

export default function Home() {
  const [messages, setMessages] = useState<UIMessage[]>([INITIAL_WELCOME])
  const [isThinking, setIsThinking] = useState(false)
  const [mode, setMode] = useState<ConversationMode>("general")
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([])
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>(() => {
    return getDynamicQuestions({ mode: "general", count: 3 }).map((q) => q.text)
  })
  const [cooldown, setCooldown] = useState<number | null>(null)
  const [lastLatencyMs, setLastLatencyMs] = useState<number | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isThinking])

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

  async function askQuestion(textToAsk: string) {
    const trimmed = textToAsk.trim()
    if (!trimmed || isThinking || cooldown) return

    const userMessage: UIMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: Date.now()
    }

    setMessages((prev) => [...prev, userMessage])
    setIsThinking(true)

    // Send bounded history (last 4 turns)
    const historyPayload = messages.slice(-4).map((m) => ({
      role: m.role,
      content: m.content
    }))

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload,
          mode
        })
      })

      if (res.status === 429) {
        setCooldown(60)
        const errorData = await res.json().catch(() => ({}))
        const errorMessage: UIMessage = {
          id: `assistant-rate-${Date.now()}`,
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

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`)
      }

      const data = await res.json()

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

      if (typeof data.latencyMs === "number") {
        setLastLatencyMs(data.latencyMs)
      }

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
      console.error("Agent query failed:", err)
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

  function handleActionClick(type: string, target: string | null, url?: string | null) {
    if (type === "open_contact") {
      const mailtoUrl = url || "mailto:ibadcodes@gmail.com?subject=Technical%20Consultation%20via%20Portfolio%20Agent"
      window.open(mailtoUrl, "_blank", "noopener,noreferrer")
    } else if (type === "open_project") {
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer")
      } else if (target) {
        const el = document.getElementById(target)
        if (el) {
          el.scrollIntoView({ behavior: "smooth" })
        } else {
          window.open(`https://github.com/Ibadat-Ali86/${target}`, "_blank", "noopener,noreferrer")
        }
      }
    } else if (type === "open_resume") {
      const resumeUrl = url || "https://ibadat-ali-portfolio.vercel.app/Ibadat_Ali_Resume.pdf"
      window.open(resumeUrl, "_blank", "noopener,noreferrer")
    } else if (type === "open_link" && (url || target)) {
      window.open(url || target!, "_blank", "noopener,noreferrer")
    }
  }

  function handleReset() {
    setMessages([INITIAL_WELCOME])
    setUsedQuestionIds([])
    const fresh = getDynamicQuestions({ mode, count: 3 })
    setSuggestedQuestions(fresh.map((q) => q.text))
    setLastLatencyMs(null)
  }

  return (
    <main className="cosmic-viewport">
      <section className="stitch-terminal" aria-labelledby="terminal-title">
        {/* Terminal Header Telemetry Bar */}
        <header className="stitch-header">
          <div className="flex items-center gap-3.5">
            <div className="orbi-avatar-wrap">
              <Image
                src="/orbi-mascot.png"
                alt="Orbi"
                width={40}
                height={40}
                priority
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/ibadat-agent-orb.png"
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 id="terminal-title" className="text-sm font-semibold text-white tracking-tight">
                  Orbi
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--amber)]/10 text-[var(--amber)] border border-[var(--amber)]/25">
                  RAG Agent v1.0
                </span>
              </div>
              <p className="text-[11px] text-[var(--muted)] font-mono">
                Ibadat Ali · AI Systems Engineer
              </p>
            </div>
          </div>

          {/* Right Status Controls */}
          <div className="flex items-center gap-3">
            {lastLatencyMs !== null && (
              <span className="hidden sm:inline-block text-[11px] font-mono text-[var(--muted-dark)]">
                {lastLatencyMs}ms
              </span>
            )}

            <div className={`status-beacon ${isThinking ? "thinking" : ""}`}>
              <span className="beacon-pulse" aria-hidden="true" />
              <span>{isThinking ? "Searching Evidence..." : "Evidence Ready"}</span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-mono text-[var(--muted)] hover:text-white px-2.5 py-1 rounded-lg border border-white/5 hover:border-white/15 hover:bg-white/5 transition-all cursor-pointer"
              title="Reset session"
            >
              Reset
            </button>
          </div>
        </header>

        {/* Conversation Canvas */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onSelectFollowUp={askQuestion}
              onActionClick={handleActionClick}
            />
          ))}

          {isThinking && <TypingIndicator />}

          {cooldown && (
            <div className="py-2.5 px-4 text-center text-xs font-mono text-[var(--amber)] bg-[var(--amber)]/10 border border-[var(--amber)]/25 rounded-xl animate-pulse">
              Cooldown active: {cooldown}s remaining before next transmission
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Interactive Deck (Perspective Switcher + Dynamic Questions + Composer) */}
        <footer className="p-4 sm:p-5 border-t border-white/[0.08] bg-black/40 backdrop-blur-xl space-y-3">
          <SuggestedQuestions
            questions={suggestedQuestions}
            currentMode={mode}
            onSelectQuestion={askQuestion}
            onSelectMode={handleModeChange}
            disabled={isThinking || Boolean(cooldown)}
          />

          <ChatInput
            onSendMessage={askQuestion}
            disabled={isThinking || Boolean(cooldown)}
            currentMode={mode}
            onModeChange={handleModeChange}
          />

          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--muted-dark)] pt-1 px-1">
            <span>In-Memory MiniSearch + Groq Qwen 27B</span>
            <span className="hidden sm:inline">Zero-Cost Evidence Gating · Zero Hallucination</span>
          </div>
        </footer>
      </section>
    </main>
  )
}
