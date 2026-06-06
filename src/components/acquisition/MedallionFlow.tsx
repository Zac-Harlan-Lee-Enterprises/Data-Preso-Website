'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, RotateCcw } from 'lucide-react';
import { ACQUISITION_STEPS } from '@/data/acquisition-steps';

interface Props {
  companyName: string;
  onReset: () => void;
}

export default function MedallionFlow({ companyName, onReset }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || done) return;
    if (activeStep >= ACQUISITION_STEPS.length) {
      setDone(true);
      return;
    }
    const timer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, activeStep]);
      setActiveStep((s) => s + 1);
    }, 2400);
    return () => clearTimeout(timer);
  }, [activeStep, isAutoPlaying, done]);

  const step = ACQUISITION_STEPS[activeStep] ?? ACQUISITION_STEPS[ACQUISITION_STEPS.length - 1];
  const currentStepData = ACQUISITION_STEPS[Math.min(activeStep, ACQUISITION_STEPS.length - 1)];

  function handleNext() {
    setIsAutoPlaying(false);
    if (activeStep < ACQUISITION_STEPS.length) {
      setCompletedSteps((prev) => [...prev, activeStep]);
      setActiveStep((s) => s + 1);
      if (activeStep + 1 >= ACQUISITION_STEPS.length) setDone(true);
    }
  }

  const displayStep = ACQUISITION_STEPS[Math.min(activeStep, ACQUISITION_STEPS.length - 1)];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Company header */}
      <div className="px-6 py-4 border-b border-lcars-border/40 flex items-center justify-between shrink-0">
        <div>
          <div className="font-mono text-[9px] tracking-[0.2em] text-lcars-amber uppercase mb-0.5">
            Integrating Acquisition
          </div>
          <h2 className="font-mono text-xl font-semibold text-lcars-text">
            {companyName}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="glass rounded-xl px-4 py-2 text-center">
            <div className="font-mono text-[9px] text-lcars-muted">STEP</div>
            <div className="font-mono text-lg font-semibold text-lcars-cyan">
              {Math.min(activeStep + 1, ACQUISITION_STEPS.length)} / {ACQUISITION_STEPS.length}
            </div>
          </div>
          <button
            onClick={onReset}
            className="p-2.5 rounded-lg glass text-lcars-muted hover:text-lcars-text transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left: Step list */}
        <div className="w-72 shrink-0 border-r border-lcars-border/40 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {ACQUISITION_STEPS.map((s, i) => {
              const isDone = completedSteps.includes(i);
              const isActive = activeStep === i && !done;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveStep(i);
                  }}
                  className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200"
                  style={{
                    background: isActive ? `${s.color}12` : 'transparent',
                    border: isActive ? `1px solid ${s.color}30` : '1px solid transparent',
                  }}
                >
                  {/* Step indicator */}
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-mono text-xs font-bold transition-all"
                    style={{
                      backgroundColor: isDone ? s.color : isActive ? `${s.color}20` : '#1e3a5f20',
                      color: isDone ? '#070b12' : isActive ? s.color : '#64748b',
                      border: isDone ? 'none' : `1px solid ${isActive ? s.color : '#1e3a5f'}`,
                    }}
                  >
                    {isDone ? <Check size={12} /> : i + 1}
                  </div>
                  <div className="min-w-0">
                    <div
                      className="font-mono text-xs font-medium leading-tight"
                      style={{ color: isActive ? s.color : isDone ? '#94a3b8' : '#475569' }}
                    >
                      {s.title}
                    </div>
                    <div className="font-mono text-[9px] text-lcars-dim leading-tight mt-0.5">
                      {s.duration}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Step detail */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={displayStep.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-5"
              >
                {/* Layer badge */}
                <div className="flex items-center gap-3">
                  <div
                    className="px-3 py-1.5 rounded-lg font-mono text-xs font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: displayStep.bgColor,
                      color: displayStep.color,
                      border: `1px solid ${displayStep.color}40`,
                    }}
                  >
                    {displayStep.layer}
                  </div>
                  <div className="font-mono text-[10px] text-lcars-muted tracking-wider">
                    {displayStep.duration}
                  </div>
                </div>

                <div>
                  <h3 className="font-mono text-2xl font-semibold text-lcars-text">
                    {displayStep.title}
                  </h3>
                  <div className="font-mono text-sm mt-1" style={{ color: displayStep.color }}>
                    {displayStep.subtitle}
                  </div>
                </div>

                <p className="text-lcars-muted leading-relaxed">{displayStep.description}</p>

                <div className="glass rounded-xl p-4 lcars-bar-cyan">
                  <div className="font-mono text-[9px] tracking-[0.2em] text-lcars-muted uppercase mb-2">
                    Technical Detail
                  </div>
                  <p className="font-mono text-xs text-lcars-muted leading-relaxed">
                    {displayStep.technicalDetail}
                  </p>
                </div>

                {/* Progress through layers */}
                <div>
                  <div className="font-mono text-[9px] tracking-[0.2em] text-lcars-muted uppercase mb-3">
                    Integration Progress
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {['Raw', 'Bronze', 'Silver', 'Gold', 'AI/Semantic', 'Governed', 'Live'].map(
                      (layer, li) => {
                        const isPast = li < displayStep.step - 1;
                        const isCurrent = li === displayStep.step - 1;
                        return (
                          <div key={layer} className="flex items-center gap-2">
                            <div
                              className="px-2.5 py-1 rounded font-mono text-[9px] font-medium transition-all"
                              style={
                                isCurrent
                                  ? {
                                      backgroundColor: displayStep.bgColor,
                                      color: displayStep.color,
                                      border: `1px solid ${displayStep.color}40`,
                                    }
                                  : isPast
                                  ? { backgroundColor: '#1e3a5f30', color: '#0ea5e9', border: '1px solid #0ea5e930' }
                                  : { backgroundColor: '#0d142120', color: '#334155', border: '1px solid #1e3a5f20' }
                              }
                            >
                              {layer}
                            </div>
                            {li < 6 && (
                              <span className="text-lcars-dim text-xs">→</span>
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: `${displayStep.color}15`,
                    color: displayStep.color,
                    border: `1px solid ${displayStep.color}40`,
                  }}
                >
                  {activeStep >= ACQUISITION_STEPS.length - 1 ? 'Complete Integration' : 'Next Step'}
                  <ChevronRight size={14} />
                </button>
              </motion.div>
            ) : (
              <ComparisonPanel companyName={companyName} onReset={onReset} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ComparisonPanel({ companyName, onReset }: { companyName: string; onReset: () => void }) {
  const BENEFITS = [
    'Reusable canonical models — no bespoke integration',
    'Shared KPI definitions inherited automatically',
    'Reduced downstream rework across all consumers',
    'AI/Semantic layer activated from day one',
    'Cross-property benchmarking live immediately',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <div className="font-mono text-[9px] tracking-[0.2em] text-lcars-green uppercase mb-2">
          Integration Complete
        </div>
        <h3 className="font-mono text-2xl font-semibold text-lcars-text">
          {companyName} — Fully Integrated
        </h3>
        <p className="text-lcars-muted text-sm mt-2">
          {companyName} subscribers are now mapped to the Common Subscriber Model. 
          All 77+ Lee properties can compare performance immediately.
        </p>
      </div>

      {/* Time comparison */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-xl p-5 border border-red-500/20 text-center">
          <div className="font-mono text-[9px] text-lcars-muted tracking-wider mb-2">
            TRADITIONAL INTEGRATION
          </div>
          <div className="font-mono text-4xl font-semibold text-red-400">9–12</div>
          <div className="font-mono text-sm text-red-400/70 mt-1">MONTHS</div>
        </div>
        <div
          className="glass rounded-xl p-5 text-center"
          style={{ border: '1px solid rgba(16,185,129,0.3)', boxShadow: '0 0 24px rgba(16,185,129,0.12)' }}
        >
          <div className="font-mono text-[9px] text-lcars-muted tracking-wider mb-2">
            CANONICAL MODEL — TARGET
          </div>
          <div className="font-mono text-4xl font-semibold text-lcars-green">4–8</div>
          <div className="font-mono text-sm text-lcars-green/70 mt-1">WEEKS</div>
        </div>
      </div>

      {/* Benefits */}
      <div className="glass rounded-xl p-5">
        <div className="font-mono text-[9px] tracking-[0.2em] text-lcars-muted uppercase mb-4">
          Key Benefits Demonstrated
        </div>
        <div className="space-y-2.5">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2.5"
            >
              <Check size={14} className="text-lcars-green shrink-0" />
              <span className="text-sm text-lcars-muted">{b}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 rounded-lg glass font-mono text-xs text-lcars-muted hover:text-lcars-text transition-colors"
      >
        <RotateCcw size={12} />
        Run Another Simulation
      </button>
    </motion.div>
  );
}
