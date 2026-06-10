'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, SkipForward } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { publicUrl } from '@/lib/utils';
import { MISSION_PROGRESS, READINESS_VALUES } from '@/data/mission-config';

interface Step {
  id: string;
  headline: string;
  subheadline?: string;
  body: string;
  visual: 'captain' | 'mission' | 'architecture' | 'acquisition' | 'ai-vision' | 'handoff';
  accent: string;
  computerVoice: string;
  navigateTo?: string;
}

const STEPS: Step[] = [
  {
    id: 'welcome',
    headline: 'WELCOME ABOARD THE USS LEE ENTERPRISE',
    subheadline: 'ADMIRAL FLETCHER — STARFLEET COMMAND',
    body: 'All systems are online. Current mission: establishing the data and AI foundation that will define Lee Enterprises for the next decade. Your command awaits.',
    visual: 'captain',
    accent: '#f59e0b',
    computerVoice: 'Welcome aboard the USS Lee Enterprise, Admiral Fletcher. Current mission: establishing the foundation for Lee\'s AI-enabled future. All systems nominal.',
  },
  {
    id: 'mission',
    headline: 'THE MISSION',
    subheadline: 'WHY THIS WORK MATTERS',
    body: 'Lee Enterprises operates 77+ properties with fragmented, inconsistent data systems. Every acquisition creates months of integration work. Every analytics question requires specialist intervention. This platform changes all of that — permanently.',
    visual: 'mission',
    accent: '#0ea5e9',
    computerVoice: 'Mission briefing: Lee Enterprises is transforming fragmented data assets into a reusable enterprise intelligence platform. Three strategic objectives have been identified.',
  },
  {
    id: 'architecture',
    headline: 'THE SHIP\'S SYSTEMS',
    subheadline: 'MAIN ENGINEERING',
    body: 'Ten integrated ship systems power the platform. Source data flows through the EPS Conduits, into the Data Transport Network, processed by the Warp Core, governed by the Navigation Computer, and delivered to Mission Specialists through three distinct access patterns.',
    visual: 'architecture',
    accent: '#22d3ee',
    computerVoice: 'Main Engineering systems online. Ten integrated components operating at full capacity. Medallion architecture: five layers active. Three data access patterns operational.',
    navigateTo: '/engineering',
  },
  {
    id: 'acquisition',
    headline: 'THE CANONICAL MODEL CHANGES EVERYTHING',
    subheadline: 'ACQUISITION INTEGRATION STRATEGY',
    body: 'Traditional acquisition integration: 9 to 12 months before data becomes analytically useful. With Lee\'s canonical subscriber model: 4 to 8 weeks. The same pattern. Every acquisition. Zero rework.',
    visual: 'acquisition',
    accent: '#f97316',
    computerVoice: 'Acquisition integration analysis complete. Target state: 4 to 8 weeks per acquisition versus historical 9 to 12 months. Canonical model pattern validated with Company X scenario.',
    navigateTo: '/acquisition',
  },
  {
    id: 'ai-vision',
    headline: 'RESPONSIBLE AI BEGINS WITH GOVERNED DATA',
    subheadline: 'AI STRATEGY & GOVERNANCE',
    body: 'Lee\'s AI platform is built on a governance-first foundation. Every AI response passes through a mandatory policy check. Every data asset is catalogued with lineage. This is what separates trusted enterprise AI from experimental technology.',
    visual: 'ai-vision',
    accent: '#8b5cf6',
    computerVoice: `Governance layer active. Dataplex policy enforcement: operational. AI readiness status: ${READINESS_VALUES.aiReadiness} percent and advancing. All AI access conditionally authorized through governance checkpoint.`,
    navigateTo: '/computer',
  },
  {
    id: 'roadmap',
    headline: 'THE COURSE IS SET',
    subheadline: 'THREE PHASES TO AI-NATIVE ENTERPRISE',
    body: 'Phase 1: Canonical Subscriber Model — the foundation. Phase 2: Semantic Governance Expansion — the acceleration. Phase 3: Agentic Enterprise AI — the transformation. Each phase delivers measurable business value before the next begins.',
    visual: 'ai-vision',
    accent: '#10b981',
    computerVoice: 'Strategic roadmap confirmed. Phase 1 active. Phase 2 projected 2026. Phase 3 projected 2027. Each phase compounding on the last. Course set for AI-native enterprise operations.',
  },
  {
    id: 'handoff',
    headline: 'THE BRIDGE IS YOURS, CAPTAIN',
    subheadline: 'BEGIN EXPLORATION',
    body: 'Every system is online. The USS Lee Enterprise is ready for your command. Explore the architecture, run the acquisition simulator, or ask the Computer any strategic question.',
    visual: 'handoff',
    accent: '#f59e0b',
    computerVoice: 'All systems standing by, Admiral Fletcher. Awaiting your command. The bridge is yours.',
    navigateTo: '/',
  },
];

const ADMIRAL_RED = '#ef4444';

function VisualCaption({ step, visible }: { step: Step; visible: boolean }) {
  if (step.visual === 'captain' || step.visual === 'handoff') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <div
          className="relative w-32 h-32 rounded-full overflow-hidden"
          style={{ boxShadow: `0 0 40px ${ADMIRAL_RED}60, 0 0 80px ${ADMIRAL_RED}20` }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(${ADMIRAL_RED} 0deg, transparent 30deg, ${ADMIRAL_RED} 60deg, transparent 90deg, ${ADMIRAL_RED} 120deg)`,
              animation: 'spin 8s linear infinite',
            }}
          />
          <div className="absolute inset-1 rounded-full overflow-hidden">
            <img
              src={publicUrl("/crew/VirginiaFletcher.jpg")}
              alt="Virginia Fletcher — Starfleet Command"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="text-center">
          <div className="font-mono text-sm tracking-widest" style={{ color: ADMIRAL_RED }}>
            VIRGINIA FLETCHER — STARFLEET COMMAND
          </div>
          <div className="font-mono text-xs text-lcars-muted mt-1 tracking-wider">
            CHIEF INFORMATION OFFICER
          </div>
        </div>
      </motion.div>
    );
  }

  if (step.visual === 'mission') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col gap-3 w-full"
      >
        {[
          { label: 'ENTERPRISE DATA\nMODERNIZATION', color: '#f59e0b', icon: '◈' },
          { label: 'ACQUISITION\nSCALABILITY', color: '#0ea5e9', icon: '◉' },
          { label: 'TRUSTED\nENTERPRISE AI', color: '#8b5cf6', icon: '◇' },
        ].map((pillar, i) => (
          <motion.div
            key={pillar.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            className="glass rounded-xl px-4 py-3 flex items-center gap-3"
            style={{ borderColor: `${pillar.color}30` }}
          >
            <div className="text-2xl shrink-0" style={{ color: pillar.color }}>
              {pillar.icon}
            </div>
            <div
              className="font-mono text-xs tracking-wider leading-relaxed"
              style={{ color: pillar.color }}
            >
              {pillar.label.split('\n').map((line, j) => (
                <div key={j}>{line}</div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (step.visual === 'architecture') {
    const systems = [
      { name: 'Sensor Array', tech: 'Source Systems', color: '#f59e0b' },
      { name: 'EPS Conduits', tech: 'MWAA · Airflow', color: '#f97316' },
      { name: 'Warp Core', tech: 'BigQuery · 5 Layers', color: '#22d3ee' },
      { name: 'Main Computer', tech: 'dbt · Semantic', color: '#f59e0b' },
      { name: 'AI Core', tech: 'Vertex AI · Gemini', color: '#ec4899' },
    ];
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        className="flex flex-col items-center gap-2 w-full max-w-sm"
      >
        {systems.map((sys, i) => (
          <motion.div
            key={sys.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="flex items-center gap-3 w-full glass rounded-lg px-4 py-2.5"
          >
            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: sys.color }} />
            <div className="flex-1 min-w-0">
              <div className="font-mono text-xs font-medium" style={{ color: sys.color }}>
                {sys.name}
              </div>
              <div className="font-mono text-[10px] text-lcars-dim">{sys.tech}</div>
            </div>
            {i < systems.length - 1 && (
              <div className="text-lcars-dim text-xs">↓</div>
            )}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (step.visual === 'acquisition') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 20 }}
        className="w-full max-w-md space-y-4"
      >
        <div className="glass rounded-xl p-5 border border-red-500/20">
          <div className="font-mono text-[10px] text-lcars-muted tracking-wider mb-2">TRADITIONAL INTEGRATION</div>
          <div className="text-4xl font-mono font-semibold text-red-400">9 – 12</div>
          <div className="font-mono text-sm text-red-400/70">MONTHS</div>
          <div className="w-full h-1.5 bg-lcars-border rounded-full mt-3">
            <div className="h-full bg-red-500/60 rounded-full w-full" />
          </div>
        </div>
        <div className="text-center font-mono text-lcars-muted text-xs tracking-widest">▼ CANONICAL MODEL</div>
        <div className="glass rounded-xl p-5 border border-lcars-green/30" style={{ boxShadow: '0 0 20px rgba(16,185,129,0.15)' }}>
          <div className="font-mono text-[10px] text-lcars-muted tracking-wider mb-2">TARGET STATE — CANONICAL MODEL</div>
          <div className="text-4xl font-mono font-semibold text-lcars-green">4 – 8</div>
          <div className="font-mono text-sm text-lcars-green/70">WEEKS</div>
          <div className="w-full h-1.5 bg-lcars-border rounded-full mt-3">
            <div className="h-full bg-lcars-green rounded-full" style={{ width: '30%' }} />
          </div>
        </div>
      </motion.div>
    );
  }

  if (step.visual === 'ai-vision') {
    const phases = [
      { label: 'Phase 1', title: 'Canonical Subscriber Model', status: 'ACTIVE', color: '#f59e0b', pct: MISSION_PROGRESS },
      { label: 'Phase 2', title: 'Semantic Governance', status: '2026', color: '#0ea5e9', pct: 0 },
      { label: 'Phase 3', title: 'Agentic Enterprise AI', status: '2027', color: '#8b5cf6', pct: 0 },
    ];
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        className="w-full max-w-md space-y-3"
      >
        {phases.map((phase, i) => (
          <motion.div
            key={phase.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12 }}
            className="glass rounded-lg px-4 py-3"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] tracking-wider" style={{ color: phase.color }}>
                  {phase.label}
                </span>
                <span className="text-xs text-lcars-text">{phase.title}</span>
              </div>
              <span className="font-mono text-[10px] text-lcars-muted">{phase.status}</span>
            </div>
            <div className="w-full h-1 bg-lcars-border rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: phase.color }}
                initial={{ width: 0 }}
                animate={{ width: `${phase.pct}%` }}
                transition={{ delay: 0.6 + i * 0.15, duration: 1 }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return null;
}

function TypewriterText({ text, visible, delay = 0 }: { text: string; visible: boolean; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!visible) { setDisplayed(''); setDone(false); return; }
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, 22);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [text, visible, delay]);

  return (
    <span className={!done ? 'cursor' : ''}>
      {displayed}
    </span>
  );
}

interface Props {
  onClose: () => void;
}

export default function VirginiaMode({ onClose }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  const step = STEPS[currentStep];
  const isLast = currentStep === STEPS.length - 1;

  const goToNext = useCallback(() => {
    if (isLast) {
      if (step.navigateTo) router.push(step.navigateTo);
      onClose();
      return;
    }
    setVisible(false);
    setTimeout(() => {
      setCurrentStep((c) => c + 1);
      setVisible(true);
    }, 400);
  }, [isLast, step, router, onClose]);

  return (
    <div className="virginia-overlay flex flex-col">
      {/* Top accent bar */}
      <div
        className="h-1 w-full transition-all duration-700"
        style={{ background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)` }}
      />

      {/* Header controls */}
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse-slow" style={{ backgroundColor: step.accent }} />
          <span className="font-mono text-xs tracking-[0.2em] text-lcars-muted uppercase">
            Virginia Mode · Step {currentStep + 1} of {STEPS.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-lcars-muted hover:text-lcars-text hover:bg-lcars-surface transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Step dots */}
      <div className="flex items-center justify-center gap-2 pb-4">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              setVisible(false);
              setTimeout(() => { setCurrentStep(i); setVisible(true); }, 300);
            }}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i === currentStep ? step.accent : '#1e3a5f',
              transform: i === currentStep ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-12"
            >
              {/* Left: text */}
              <div className="flex-1 space-y-6">
                {/* Computer voice */}
                <div className="flex items-start gap-3 glass rounded-xl p-4 border-l-2"
                  style={{ borderLeftColor: step.accent }}>
                  <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: `${step.accent}20`, border: `1px solid ${step.accent}40` }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.accent }} />
                  </div>
                  <div className="font-mono text-xs text-lcars-muted leading-relaxed">
                    <span className="text-lcars-dim">COMPUTER: </span>
                    <TypewriterText text={step.computerVoice} visible={visible} delay={0.2} />
                  </div>
                </div>

                {/* Headline */}
                {step.subheadline && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="font-mono text-[10px] tracking-[0.3em] uppercase"
                    style={{ color: step.accent }}
                  >
                    {step.subheadline}
                  </motion.div>
                )}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="font-mono text-2xl lg:text-3xl font-semibold text-lcars-text leading-tight"
                  style={{ textShadow: `0 0 40px ${step.accent}40` }}
                >
                  {step.headline}
                </motion.h2>

                {/* Body */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-lcars-muted text-base leading-relaxed max-w-lg"
                >
                  {step.body}
                </motion.p>

                {/* Navigation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="flex items-center gap-4 pt-2"
                >
                  <button
                    onClick={goToNext}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-sm font-medium transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: `${step.accent}20`,
                      border: `1px solid ${step.accent}50`,
                      color: step.accent,
                    }}
                  >
                    {isLast ? 'Begin Exploration' : 'Continue'}
                    <ChevronRight size={14} />
                  </button>
                  {!isLast && (
                    <button
                      onClick={onClose}
                      className="flex items-center gap-1.5 text-xs font-mono text-lcars-dim hover:text-lcars-muted transition-colors"
                    >
                      <SkipForward size={12} />
                      Skip Tour
                    </button>
                  )}
                </motion.div>
              </div>

              {/* Right: visual */}
              <div className="lg:w-72 flex items-center justify-center">
                <VisualCaption step={step} visible={visible} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent */}
      <div
        className="h-0.5 w-full transition-all duration-700"
        style={{ background: `linear-gradient(90deg, transparent, ${step.accent}60, transparent)` }}
      />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
