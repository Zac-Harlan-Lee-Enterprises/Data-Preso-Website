'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import type { ComputerQA } from '@/data/computer-qa';

interface Props {
  question: string;
  response: ComputerQA['response'];
  usingLiveAI: boolean;
  onReset: () => void;
}

const SECTIONS: { key: keyof ComputerQA['response']; label: string; color: string }[] = [
  { key: 'answer', label: 'Answer', color: '#0ea5e9' },
  { key: 'strategicImpact', label: 'Strategic Impact', color: '#f59e0b' },
  { key: 'businessValue', label: 'Business Value', color: '#10b981' },
  { key: 'riskReduction', label: 'Risk Reduction', color: '#8b5cf6' },
  { key: 'supportingEvidence', label: 'Supporting Evidence', color: '#ec4899' },
  { key: 'nextStep', label: 'Recommended Next Step', color: '#f97316' },
];

export default function ResponseDisplay({ question, response, usingLiveAI, onReset }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-5"
    >
      {/* Question echo */}
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <div className="w-6 h-6 rounded-lg bg-lcars-dim flex items-center justify-center">
            <span className="font-mono text-[9px] text-lcars-text">YOU</span>
          </div>
        </div>
        <div className="glass rounded-xl px-4 py-3 flex-1">
          <span className="font-mono text-sm text-lcars-muted">Computer, </span>
          <span className="font-mono text-sm text-lcars-text">{question}</span>
        </div>
      </div>

      {/* Computer header */}
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-lcars-cyan animate-pulse-slow" />
        <span className="font-mono text-xs text-lcars-cyan tracking-wider">COMPUTER</span>
        {usingLiveAI && (
          <span className="flex items-center gap-1 font-mono text-[9px] text-lcars-violet tracking-wider">
            <Sparkles size={9} /> LIVE AI
          </span>
        )}
      </div>

      {/* Response sections */}
      <div className="space-y-3">
        {SECTIONS.map(({ key, label, color }, i) => {
          const text = response[key];
          if (!text) return null;
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-5"
              style={{ borderLeft: `3px solid ${color}` }}
            >
              <div
                className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2"
                style={{ color }}
              >
                {label}
              </div>
              <p className="text-sm text-lcars-muted leading-relaxed">{text}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 font-mono text-xs text-lcars-dim hover:text-lcars-muted transition-colors"
        >
          <ArrowLeft size={12} />
          Ask another question
        </button>
        <span className="font-mono text-[9px] text-lcars-dim">
          Response grounded in Lee platform architecture
        </span>
      </div>
    </motion.div>
  );
}
