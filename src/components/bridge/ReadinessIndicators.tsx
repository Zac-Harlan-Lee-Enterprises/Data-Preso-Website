'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Brain, Shield, GitMerge, Users } from 'lucide-react';
import { READINESS_INDICATORS } from '@/data/readiness-indicators';

const ICON_MAP: Record<string, React.ElementType> = {
  Database, Brain, Shield, GitMerge, Users,
};

export default function ReadinessIndicators() {
  const [selected, setSelected] = useState<string | null>(null);
  const activeIndicator = READINESS_INDICATORS.find((r) => r.id === selected);

  return (
    <>
      <div className="glass rounded-2xl p-6 lcars-bar-cyan">
        <div className="font-mono text-[10px] tracking-[0.2em] text-lcars-muted uppercase mb-5">
          Strategic Readiness Indicators
        </div>
        <div className="space-y-4">
          {READINESS_INDICATORS.map((indicator, i) => {
            const Icon = ICON_MAP[indicator.icon] ?? Database;
            return (
              <motion.button
                key={indicator.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                onClick={() => setSelected(indicator.id === selected ? null : indicator.id)}
                className="w-full text-left group"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <Icon
                    size={14}
                    className="shrink-0 transition-colors"
                    style={{ color: indicator.color }}
                  />
                  <span className="text-sm font-medium text-lcars-text flex-1">
                    {indicator.label}
                  </span>
                  <span
                    className="font-mono text-xs font-semibold shrink-0"
                    style={{ color: indicator.color }}
                  >
                    {indicator.value}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-lcars-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: indicator.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${indicator.value}%` }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                  />
                </div>
                <div className="h-px bg-lcars-border mt-3 group-last:hidden" />
              </motion.button>
            );
          })}
        </div>
        <p className="font-mono text-[9px] text-lcars-dim mt-4 tracking-wider">
          ↑ Click any indicator for full analysis
        </p>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {activeIndicator && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-96 glass-strong border-l border-lcars-border z-50 overflow-y-auto"
          >
            <div className="sticky top-0 glass-strong border-b border-lcars-border p-5 flex items-center justify-between">
              <div>
                <div
                  className="font-mono text-xs tracking-wider mb-0.5"
                  style={{ color: activeIndicator.color }}
                >
                  READINESS ANALYSIS
                </div>
                <div className="font-semibold text-lcars-text">{activeIndicator.label}</div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="font-mono text-2xl font-semibold"
                  style={{ color: activeIndicator.color }}
                >
                  {activeIndicator.value}%
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 rounded-lg text-lcars-muted hover:text-lcars-text hover:bg-lcars-surface"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-5">
              {[
                { label: 'Current State', text: activeIndicator.currentState },
                { label: 'Target State', text: activeIndicator.targetState },
                { label: 'Business Impact', text: activeIndicator.businessImpact },
                { label: 'Strategic Value', text: activeIndicator.strategicValue },
              ].map((section) => (
                <div key={section.label}>
                  <div
                    className="font-mono text-[9px] tracking-[0.2em] uppercase mb-2"
                    style={{ color: activeIndicator.color }}
                  >
                    {section.label}
                  </div>
                  <p className="text-sm text-lcars-muted leading-relaxed">{section.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
