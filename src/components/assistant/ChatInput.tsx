"use client"

import React, {
  FormEvent,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent
} from "react"
import type { ConversationMode } from "@/types/chat"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
  placeholder?: string
  currentMode?: ConversationMode
  onModeChange?: (mode: ConversationMode) => void
}

const MAX_CHARS = 10000

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder,
  currentMode,
  onModeChange
}: ChatInputProps) {
  const [input, setInput] = useState("")
  const [isTruncatedNotice, setIsTruncatedNotice] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea to fit multi-line queries (up to 180px)
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    const nextHeight = Math.min(el.scrollHeight, 180)
    el.style.height = `${Math.max(42, nextHeight)}px`
  }, [input])

  function handleSubmit(e?: FormEvent) {
    if (e) e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || disabled) return

    onSendMessage(trimmed)
    setInput("")
    setIsTruncatedNotice(false)

    if (textareaRef.current) {
      textareaRef.current.style.height = "42px"
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value
    if (val.length > MAX_CHARS) {
      setInput(val.slice(0, MAX_CHARS))
      setIsTruncatedNotice(true)
    } else {
      setInput(val)
      if (isTruncatedNotice) setIsTruncatedNotice(false)
    }
  }

  function handleClear() {
    setInput("")
    setIsTruncatedNotice(false)
    if (textareaRef.current) {
      textareaRef.current.style.height = "42px"
      textareaRef.current.focus()
    }
  }

  const defaultPlaceholder =
    currentMode === "recruiter"
      ? "Ask about architecture choices, production AI stack, or experience..."
      : currentMode === "client"
      ? "Describe your business automation problem or ask how Ibadat builds..."
      : "Ask about an AI agent, system architecture, RAG, or hiring Ibadat..."

  const activePlaceholder = placeholder || defaultPlaceholder

  return (
    <form
      onSubmit={handleSubmit}
      className="stitch-dock-21st group relative flex flex-col rounded-2xl border border-white/[0.12] bg-[#0d1017]/90 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.6)] focus-within:border-[var(--amber)]/60 focus-within:shadow-[0_0_0_3px_rgba(255,173,36,0.15),0_16px_40px_rgba(0,0,0,0.7)] transition-all duration-200"
    >
      <label htmlFor="agent-chat-input" className="sr-only">
        Ask a question about Ibadat Ali
      </label>

      {/* Truncation & Context Safety Notice */}
      {isTruncatedNotice && (
        <div className="px-3.5 py-1.5 text-[11px] bg-amber-500/10 border-b border-amber-500/20 text-amber-300 flex items-center justify-between">
          <span>Inquiry smoothly capped at 10,000 characters for optimal agent context. For large RFPs, email ibadcodes@gmail.com.</span>
          <button
            type="button"
            onClick={() => setIsTruncatedNotice(false)}
            className="text-amber-400 hover:text-white ml-2 text-xs cursor-pointer"
            aria-label="Dismiss notice"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Textarea Area */}
      <div className="relative flex items-start px-3.5 pt-2.5 pb-1.5">
        <textarea
          id="agent-chat-input"
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={activePlaceholder}
          maxLength={MAX_CHARS}
          rows={1}
          autoComplete="off"
          className="w-full resize-none bg-transparent text-sm text-white placeholder-slate-400/70 outline-none leading-relaxed min-h-[42px] max-h-[180px] scrollbar-thin scrollbar-thumb-white/10"
        />

        {input.length > 0 && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer text-xs ml-1 mt-1 flex-shrink-0"
            title="Clear prompt"
          >
            ✕
          </button>
        )}
      </div>

      {/* Bottom Action Bar (21st.dev Prompt Composer Style) */}
      <div className="flex items-center justify-between px-3 pb-2 pt-1 border-t border-white/[0.05]">
        {/* Left Tools: Mode Selector or Engine Indicator */}
        <div className="flex items-center gap-2">
          {onModeChange && currentMode ? (
            <div className="flex items-center gap-1 bg-black/40 rounded-lg p-0.5 border border-white/[0.06]">
              <button
                type="button"
                onClick={() => onModeChange("general")}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                  currentMode === "general"
                    ? "bg-[var(--amber)] text-black font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Explore Projects & Universe"
              >
                🛸 General
              </button>
              <button
                type="button"
                onClick={() => onModeChange("recruiter")}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                  currentMode === "recruiter"
                    ? "bg-[var(--amber)] text-black font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Recruiter Lens & Technical Skills"
              >
                💼 Recruiter
              </button>
              <button
                type="button"
                onClick={() => onModeChange("client")}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                  currentMode === "client"
                    ? "bg-[var(--amber)] text-black font-semibold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                title="Client Direct & Business Solutions"
              >
                💡 Client
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/[0.05]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Groq Qwen 27B · MiniSearch</span>
            </div>
          )}
        </div>

        {/* Right Tools: Character Counter & Send Button */}
        <div className="flex items-center gap-2.5">
          {input.length > 500 && (
            <span
              className={`text-[10px] font-mono select-none transition-colors ${
                input.length >= 9000
                  ? "text-amber-400 font-semibold"
                  : "text-slate-400"
              }`}
            >
              {input.length} / {MAX_CHARS}
            </span>
          )}

          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className="group/btn relative inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl font-medium text-xs text-black bg-gradient-to-r from-[#ffc059] to-[#ffad24] hover:from-[#ffd27d] hover:to-[#ffb83d] disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_2px_10px_rgba(255,173,36,0.3)] hover:shadow-[0_4px_16px_rgba(255,173,36,0.45)] active:scale-95 transition-all duration-150 cursor-pointer"
            aria-label="Send message"
          >
            {disabled ? (
              <>
                <svg
                  className="animate-spin -ml-0.5 mr-1 h-3.5 w-3.5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <span className="font-semibold">Ask Orbi</span>
                <span className="font-mono text-xs leading-none transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                  ↗
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
