'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Key, X, ChevronDown, ChevronUp } from 'lucide-react';
import { COMPUTER_QA, matchQuestion, type ComputerQA } from '@/data/computer-qa';
import ResponseDisplay from './ResponseDisplay';

const SUGGESTED = [
  'Why do canonical models matter?',
  'How does acquisition integration work?',
  'What is the medallion architecture?',
  'What is our AI readiness status?',
  'Explain the governance model.',
  'What is the three-phase roadmap?',
  'How does conversational analytics work?',
  'What is the role of dbt?',
];

async function callLiveAI(question: string, apiKey: string): Promise<ComputerQA['response'] | null> {
  const SYSTEM_PROMPT = `You are the Computer aboard the USS Lee Enterprise — Lee Enterprises' Data Modernization Command Center. You answer strategic questions about Lee's data platform with authority and precision.

Lee's platform: AWS MWAA (Airflow) → GCS → BigQuery (Raw/Bronze/Silver/Gold/AI-Semantic) → dbt transformation → Dataplex governance → Vertex AI + Gemini → Conversational AI via Teams → Looker/DOMO BI.

Key facts: Canonical Subscriber Model unifies 77+ properties. Acquisition integration: 4-8 weeks (vs 9-12 months traditional). Three phases: 1) Canonical Subscriber Model (active) 2) Semantic Governance Expansion (2026) 3) Agentic Enterprise AI (2027-2028). Governance-first approach with Dataplex policy checks.

Respond ONLY in this JSON format:
{
  "answer": "...",
  "strategicImpact": "...",
  "businessValue": "...",
  "riskReduction": "...",
  "supportingEvidence": "...",
  "nextStep": "..."
}`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: question }],
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const text = data.content?.[0]?.text ?? '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    return JSON.parse(jsonMatch[0]) as ComputerQA['response'];
  } catch {
    return null;
  }
}

export default function ComputerTerminal() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<ComputerQA['response'] | null>(null);
  const [matchedQuestion, setMatchedQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [usingLiveAI, setUsingLiveAI] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(question?: string) {
    const q = (question ?? input).trim();
    if (!q) return;
    setInput('');
    setLoading(true);
    setError('');
    setResponse(null);
    setMatchedQuestion(q);

    try {
      // Try live AI first if key is set
      if (apiKey) {
        const liveResponse = await callLiveAI(`Computer, ${q}`, apiKey);
        if (liveResponse) {
          setResponse(liveResponse);
          setUsingLiveAI(true);
          return;
        }
      }

      // Fall back to pre-programmed Q&A
      await new Promise((r) => setTimeout(r, 600)); // simulate thinking
      const match = matchQuestion(q);
      if (match) {
        setResponse(match.response);
        setUsingLiveAI(false);
      } else {
        setError(
          "I don't have a specific answer to that question in my knowledge base. Try asking about canonical models, the medallion architecture, acquisition integration, AI readiness, governance, or the three-phase roadmap."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Terminal header */}
      <div className="px-6 py-3 border-b border-lcars-border/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-lcars-cyan animate-pulse-slow" />
          <span className="font-mono text-xs text-lcars-cyan tracking-wider">COMPUTER INTERFACE — ACTIVE</span>
        </div>
        <button
          onClick={() => setShowApiKey(!showApiKey)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-[10px] text-lcars-muted hover:text-lcars-text glass transition-colors"
        >
          <Key size={11} />
          Live AI {apiKey ? '(Connected)' : '(Optional)'}
          {showApiKey ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
        </button>
      </div>

      {/* API Key drawer */}
      <AnimatePresence>
        {showApiKey && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-lcars-border/40 shrink-0"
          >
            <div className="px-6 py-3 bg-lcars-surface/50 flex items-center gap-3">
              <Key size={12} className="text-lcars-muted shrink-0" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Anthropic API key — for live AI responses (optional)"
                className="flex-1 bg-transparent font-mono text-xs text-lcars-text placeholder:text-lcars-dim focus:outline-none"
              />
              {apiKey && (
                <button onClick={() => setApiKey('')}>
                  <X size={12} className="text-lcars-dim hover:text-lcars-muted" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Response or welcome */}
        <div className="flex-1 overflow-y-auto p-6">
          {!response && !loading && !error && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
              <div>
                <div className="font-mono text-[9px] tracking-[0.25em] text-lcars-cyan uppercase mb-3">
                  Computer Interface
                </div>
                <h2 className="font-mono text-3xl font-semibold text-lcars-text">
                  COMPUTER
                </h2>
                <p className="text-lcars-muted mt-3 max-w-sm">
                  Ask any strategic question about Lee's data modernization platform. 
                  Start with "Computer, " or select a suggested question below.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 max-w-xl w-full">
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSubmit(q)}
                    className="text-left glass rounded-xl px-4 py-3 text-sm text-lcars-muted hover:text-lcars-text hover:border-lcars-cyan/30 transition-all duration-200 group"
                  >
                    <span className="font-mono text-[9px] text-lcars-dim group-hover:text-lcars-cyan block mb-1">
                      Computer,
                    </span>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-lcars-cyan justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-lcars-cyan animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-lcars-cyan animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-lcars-cyan animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <div className="font-mono text-xs text-lcars-muted tracking-wider">
                  PROCESSING QUERY...
                </div>
              </div>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-6 border border-lcars-amber/20 max-w-2xl mx-auto"
            >
              <div className="font-mono text-[9px] tracking-[0.2em] text-lcars-amber uppercase mb-3">
                COMPUTER: No Match Found
              </div>
              <p className="text-lcars-muted text-sm leading-relaxed">{error}</p>
              <button
                onClick={() => { setError(''); setResponse(null); }}
                className="mt-4 font-mono text-xs text-lcars-dim hover:text-lcars-muted"
              >
                ← Ask another question
              </button>
            </motion.div>
          )}

          {response && (
            <ResponseDisplay
              question={matchedQuestion}
              response={response}
              usingLiveAI={usingLiveAI}
              onReset={() => { setResponse(null); setError(''); }}
            />
          )}
        </div>

        {/* Input bar */}
        <div className="shrink-0 px-6 py-4 border-t border-lcars-border/40 bg-[#070b12]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 glass rounded-2xl px-5 py-3 max-w-3xl mx-auto">
            <span className="font-mono text-sm text-lcars-cyan shrink-0">Computer,</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="ask any question about the platform…"
              className="flex-1 bg-transparent font-mono text-sm text-lcars-text placeholder:text-lcars-dim focus:outline-none"
              disabled={loading}
            />
            <button
              onClick={() => handleSubmit()}
              disabled={loading || !input.trim()}
              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center bg-lcars-cyan/20 border border-lcars-cyan/30 text-lcars-cyan hover:bg-lcars-cyan/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
