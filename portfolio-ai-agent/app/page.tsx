"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

const quickQuestions = [
  "What kind of AI agents has Ibadat built?",
  "Show me work related to RAG and MCP.",
  "How does a project engagement start?",
];

const thinkingStates = [
  "Warming the evidence engine",
  "Tracing useful portfolio proof",
  "Checking claim boundaries",
  "Composing a grounded answer",
];

function createPreviewAnswer(question: string) {
  const query = question.toLowerCase();

  if (query.includes("rag") || query.includes("mcp")) {
    return "A strong RAG example is CodeScope MCP Preflight: a local-first developer tool that combines MCP, Tree-sitter analysis, and local retrieval to give an agent structured repository context before it proposes a change. Ibadat also lists RAG retrieval in his ML / AI Engineer experience at Soft Shack.";
  }

  if (query.includes("start") || query.includes("engagement")) {
    return "Projects start with a focused 30-minute discovery conversation around the problem, constraints, and useful outcome. From there, Ibadat works from a written plan, delivers in a fixed scope or milestones, and includes documentation plus a walkthrough for handoff.";
  }

  return "Ibadat builds tool-using agents and AI automations with clear operational boundaries. Portfolio examples include a local MCP and retrieval tool, WhatsApp-based payment-evidence review, lead-generation automation, and a restaurant assistant with memory and business tools. The production RAG connection will retrieve verified portfolio evidence before generating its answer.";
}

export default function Home() {
  const [question, setQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [response, setResponse] = useState(
    "Ask about projects, AI agents, RAG, applied ML, experience, or how Ibadat approaches a client engagement.",
  );
  const [visibleResponse, setVisibleResponse] = useState("");

  useEffect(() => {
    if (!isThinking) return;

    const interval = window.setInterval(() => {
      setThinkingIndex((current) => (current + 1) % thinkingStates.length);
    }, 1100);

    return () => window.clearInterval(interval);
  }, [isThinking]);

  useEffect(() => {
    let index = 0;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      setVisibleResponse("");
      interval = window.setInterval(() => {
        index += 1;
        setVisibleResponse(response.slice(0, index));
        if (index >= response.length && interval) window.clearInterval(interval);
      }, 10);
    }, 0);

    return () => {
      window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [response]);

  function ask(questionToAsk: string) {
    const trimmedQuestion = questionToAsk.trim();
    if (!trimmedQuestion || isThinking) return;

    setQuestion("");
    setIsThinking(true);
    setThinkingIndex(0);

    window.setTimeout(() => {
      setResponse(createPreviewAnswer(trimmedQuestion));
      setIsThinking(false);
    }, 2600);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(question);
  }

  return (
    <main className="agent-shell">
      <section className="agent-panel" aria-labelledby="agent-title">
        <div className="panel-noise" aria-hidden="true" />

        <header className="agent-header">
          <div className="identity-lockup">
            <div className="mark-wrap" aria-hidden="true">
              <Image
                src="/ibadat-agent-orb.png"
                alt=""
                width={112}
                height={112}
                priority
              />
            </div>
            <div>
              <p className="eyebrow">Ibadat AI / Portfolio assistant</p>
              <h1 id="agent-title">Ask the work behind the work.</h1>
            </div>
          </div>
          <div className={`system-status ${isThinking ? "is-thinking" : ""}`} aria-live="polite">
            <span className="status-orbit" aria-hidden="true"><span /></span>
            <span>{isThinking ? thinkingStates[thinkingIndex] : "Evidence-ready"}</span>
          </div>
        </header>

        <div className="agent-grid">
          <aside className="context-column">
            <p className="eyebrow">Built for useful conversations</p>
            <h2>Clear evidence. No polished guessing.</h2>
            <p>
              Explore Ibadat&apos;s AI engineering work without turning private-client details,
              prototypes, or research into inflated claims.
            </p>
            <div className="signal-list" aria-label="Assistant capabilities">
              <span>Agents &amp; automation</span>
              <span>RAG &amp; MCP</span>
              <span>Applied ML</span>
              <span>Delivery &amp; handoff</span>
            </div>
          </aside>

          <section className="conversation-card" aria-label="Portfolio assistant conversation">
            <div className="conversation-label">
              <span>Response channel</span>
              <span className="live-dot">Live preview</span>
            </div>

            <div className="answer-space" aria-live="polite">
              {isThinking ? (
                <div className="thinking-response">
                  <div className="loader-dots" aria-hidden="true"><i /><i /><i /></div>
                  <p>{thinkingStates[thinkingIndex]}<span className="ellipsis">...</span></p>
                </div>
              ) : (
                <p className="emerging-copy">
                  {visibleResponse}
                  <span className="text-cursor" aria-hidden="true" />
                </p>
              )}
            </div>

            <div className="question-bank">
              <span>Try a starting point</span>
              <div className="quick-question-list">
                {quickQuestions.map((item, index) => (
                  <button key={item} type="button" onClick={() => ask(item)} disabled={isThinking}>
                    <b>0{index + 1}</b>{item}
                  </button>
                ))}
              </div>
            </div>

            <form className="composer" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="portfolio-question">Ask about Ibadat&apos;s work</label>
              <input
                id="portfolio-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask about an agent, system, project, or capability..."
                maxLength={360}
                disabled={isThinking}
              />
              <button type="submit" disabled={!question.trim() || isThinking}>
                {isThinking ? "Reading" : "Ask"}
                <span aria-hidden="true">↗</span>
              </button>
            </form>
          </section>
        </div>

        <footer className="agent-footer">
          <span>AI ENGINEERING · AI AGENT DEVELOPMENT · APPLIED ML</span>
          <span>Designed to retrieve evidence before it responds.</span>
        </footer>
      </section>
    </main>
  );
}
