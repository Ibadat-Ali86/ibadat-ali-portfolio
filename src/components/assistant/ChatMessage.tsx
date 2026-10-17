"use client"

import React, { useState } from "react"
import Image from "next/image"
import type { UIMessage } from "@/types/chat"
import { SourceCard } from "./SourceCard"

interface ChatMessageProps {
  message: UIMessage
  onSelectFollowUp?: (question: string) => void
  onActionClick?: (type: string, target: string | null, url?: string | null) => void
  onSourceClick?: (sourceId: string) => void
}

/**
 * Parses markdown into scannable executive sections (Takeaway, Fact Cards, Closing).
 */
function renderScannableContent(rawText: string) {
  const paragraphs = rawText.split("\n\n").filter(Boolean)

  return (
    <div className="space-y-3">
      {paragraphs.map((p, idx) => {
        // Check if paragraph is a bullet list
        if (p.includes("\n- ") || p.startsWith("- ")) {
          const lines = p.split("\n").filter(Boolean)
          return (
            <div key={idx} className="facts-container space-y-1.5 my-2">
              {lines.map((line, lIdx) => {
                const cleaned = line.replace(/^-\s+/, "")
                return (
                  <div
                    key={lIdx}
                    className="fact-item group flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.05] transition-colors"
                  >
                    <span className="text-[var(--amber)] mt-0.5 text-xs select-none">▸</span>
                    <div
                      className="flex-1 text-[13.5px] leading-relaxed text-slate-200"
                      dangerouslySetInnerHTML={{ __html: formatInline(cleaned) }}
                    />
                  </div>
                )
              })}
            </div>
          )
        }

        // If it's the very first paragraph, format as lead takeaway
        if (idx === 0) {
          return (
            <div
              key={idx}
              className="takeaway-lead text-[14.5px] font-medium leading-relaxed text-slate-100 pb-2.5 border-b border-white/[0.06]"
              dangerouslySetInnerHTML={{ __html: formatInline(p) }}
            />
          )
        }

        // Subsequent paragraphs become light closing prompts
        return (
          <div
            key={idx}
            className="next-step-closer text-[13px] text-slate-400 leading-normal"
            dangerouslySetInnerHTML={{ __html: formatInline(p) }}
          />
        )
      })}
    </div>
  )
}

function formatInline(text: string): string {
  let escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

  // Bold formatting: **text**
  escaped = escaped.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-semibold text-white tracking-tight">$1</strong>'
  )
  // Inline code: `code`
  escaped = escaped.replace(
    /`([^`]+)`/g,
    '<code class="px-1.5 py-0.5 rounded bg-white/10 text-[var(--amber-pale)] font-mono text-xs border border-white/5">$1</code>'
  )

  // Markdown mailto links: [Label](mailto:email...)
  escaped = escaped.replace(
    /\[([^\]]+)\]\((mailto:[^\s)]+)\)/g,
    '<a href="$2" class="text-[var(--amber)] hover:text-[var(--amber-pale)] underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-1"><span class="select-none">✉️</span>$1</a>'
  )

  // Markdown external links: [Label](https://...)
  escaped = escaped.replace(
    /\[([^\]]+)\]\(((?:https?:\/\/)[^\s)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[var(--amber)] hover:text-[var(--amber-pale)] underline underline-offset-2 transition-colors font-medium inline-flex items-center gap-0.5">$1<span class="text-[10px] select-none opacity-80 font-mono">↗</span></a>'
  )

  // Line breaks
  escaped = escaped.replace(/\n/g, "<br />")

  return escaped
}

export function ChatMessage({
  message,
  onSelectFollowUp,
  onActionClick,
  onSourceClick
}: ChatMessageProps) {
  const isUser = message.role === "user"
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)

  function handleCopy() {
    navigator.clipboard.writeText(message.content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-fade-in">
        <div className="user-bubble max-w-[85%] sm:max-w-[70%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-600/30 to-blue-500/20 border border-blue-500/35 backdrop-blur-md px-4 py-2.5 shadow-[0_8px_20px_rgba(37,99,235,0.2)]">
          <p className="whitespace-pre-wrap text-sm text-white leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    )
  }

  // Assistant / Orbi Message Card
  const hasAction = message.action && message.action.type !== "none"
  const hasSources = message.sourceIds && message.sourceIds.length > 0
  const hasFollowUps = message.followUps && message.followUps.length > 0

  return (
    <div className="flex gap-3 mb-5 animate-fade-in group">
      {/* Living Orbi Avatar */}
      <div className="relative w-8 h-8 rounded-full border border-[var(--amber)]/50 bg-[#090b10] flex items-center justify-center flex-shrink-0 mt-1 shadow-[0_0_12px_rgba(255,173,36,0.25)]">
        <Image
          src="/orbi-mascot.png"
          alt="Orbi"
          width={32}
          height={32}
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLElement).style.display = "none"
          }}
        />
        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#090b10]" />
      </div>

      {/* Structured Scannable Card */}
      <div className="flex-1 min-w-0 space-y-2.5">
        <div className="assistant-card relative rounded-2xl border border-white/[0.08] hover:border-white/[0.14] bg-gradient-to-b from-[#181d29]/80 to-[#0d1018]/90 backdrop-blur-md p-4 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.45)] transition-all">
          {/* Top Utilities Toolbar (Copy & Feedback) */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] transition-colors cursor-pointer"
              title="Copy response to clipboard"
            >
              {copied ? (
                <>
                  <span className="text-emerald-400">✓</span>
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <span>📋</span>
                  <span>Copy</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setFeedback(feedback === "up" ? null : "up")}
              className={`p-1 rounded-md text-xs transition-colors cursor-pointer ${
                feedback === "up"
                  ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.08]"
              }`}
              title="Helpful response"
            >
              👍
            </button>
          </div>

          {/* Structured Content */}
          <div className="pr-16 sm:pr-20">
            {renderScannableContent(message.content)}
          </div>

          {/* Action Trigger Buttons */}
          {hasAction && (
            <div className="mt-4 pt-3 border-t border-white/[0.08] flex flex-wrap gap-2">
              {message.action?.type === "open_project" && (
                <button
                  type="button"
                  onClick={() => onActionClick?.("open_project", message.action?.target || null, message.action?.url)}
                  className="dock-submit-btn text-xs py-2 px-3.5 inline-flex items-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(255,173,36,0.25)] hover:shadow-[0_4px_20px_rgba(255,173,36,0.4)] transition-all"
                >
                  <span>{message.action?.label || `Explore Project: ${message.action.target}`}</span>
                  <span className="font-mono">↗</span>
                </button>
              )}
              {message.action?.type === "open_contact" && (
                <button
                  type="button"
                  onClick={() => onActionClick?.("open_contact", message.action?.target || null, message.action?.url)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 shadow-[0_4px_14px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
                >
                  <span>{message.action?.label || "Schedule Technical Discovery"}</span>
                  <span>✉️</span>
                </button>
              )}
              {message.action?.type === "open_resume" && (
                <button
                  type="button"
                  onClick={() => onActionClick?.("open_resume", message.action?.target || null, message.action?.url)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 shadow-sm transition-all cursor-pointer"
                >
                  <span>{message.action?.label || "Download Verified Resume"}</span>
                  <span>📄</span>
                </button>
              )}
              {message.action?.type === "open_link" && (message.action?.url || message.action?.target) && (
                <a
                  href={message.action?.url || message.action?.target || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 shadow-sm transition-all"
                >
                  <span>{message.action?.label || "Open Resource"}</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          )}

          {/* Verified Evidence Shelf */}
          {hasSources && (
            <div className="mt-3.5 pt-2.5 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Verified:
              </span>
              {message.sourceIds?.map((srcId) => (
                <SourceCard key={srcId} sourceId={srcId} onClick={onSourceClick} />
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Follow-Up Suggestions (21st.dev interactive chips) */}
        {hasFollowUps && (
          <div className="flex flex-col gap-1.5 pl-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Suggested Explorations:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {message.followUps?.map((fu, idx) => (
                <button
                  key={`${fu}-${idx}`}
                  type="button"
                  onClick={() => onSelectFollowUp?.(fu)}
                  className="group/fu inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-[var(--amber)]/40 text-slate-300 hover:text-white transition-all duration-150 cursor-pointer text-left shadow-sm hover:shadow-[0_2px_10px_rgba(255,173,36,0.2)] hover:-translate-y-0.5"
                >
                  <span className="text-[var(--amber)] opacity-70 group-hover/fu:opacity-100">▸</span>
                  <span>{fu}</span>
                  <span className="text-[var(--amber)] text-[10px] font-mono opacity-0 group-hover/fu:opacity-100 transition-opacity">
                    ↗
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
