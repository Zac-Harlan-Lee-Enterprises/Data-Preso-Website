'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ROADMAP_PHASES } from '@/data/roadmap';
import { cn } from '@/lib/utils';

const STATUS_LABELS: Record<string, string> = {
  active: 'IN PROGRESS',
  upcoming: 'UPCOMING',
  future: 'FUTURE STATE',
};

export default function RoadmapTimeline() {
  const [expanded, setExpanded] = useState<string>('phase-1');

  return (
    <div className="glass rounded-2xl p-6 lcars-bar-violet">
      <div className="font-mono text-[10px] tracking-[0.2em] text-lcars-muted uppercase mb-6">
        Strategic Roadmap
      </div>

      {/* Timeline connector */}
      <div className="relative">
        {/* Vertical spine */}
        <div className="absolute left-5 top-5 bottom-5 w-px bg-lcars-border" />

        <div className="space-y-3">
          {ROADMAP_PHASES.map((phase, i) => {
            const isExpanded = expanded === phase.id;
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
              >
                <button
                  onClick={() => setExpanded(isExpanded ? '' : phase.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-4">
                    {/* Node */}
                    <div
                      className={cn(
                        'relative z-10 w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-mono text-sm font-bold transition-all duration-300',
                        phase.status === 'active' ? 'ring-2' : 'ring-1 ring-lcars-border'
                      )}
                      style={{
                        backgroundColor:
                          phase.status === 'active'
                            ? `${phase.color}20`
                            : 'rgba(13,20,33,0.8)',
                        outline: phase.status === 'active' ? `2px solid ${phase.color}` : '1px solid #1e3a5f',
                        outlineOffset: '0px',
                        color: phase.color,
                        ...(phase.status === 'active' ? { boxShadow: `0 0 20px ${phase.color}30` } : {}),
                      }}
                    >
                      {phase.number}
                    </div>

                    {/* Header */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-lcars-text text-sm">
                          {phase.title}
                        </span>
                        <span
                          className="font-mono text-[9px] tracking-wider px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: `${phase.color}15`,
                            color: phase.color,
                            border: `1px solid ${phase.color}30`,
                          }}
                        >
                          {STATUS_LABELS[phase.status]}
                        </span>
                      </div>
                      <div className="font-mono text-xs text-lcars-muted mt-0.5">
                        {phase.timeframe}
                      </div>
                    </div>

                    <ChevronDown
                      size={14}
                      className={cn(
                        'shrink-0 text-lcars-dim transition-transform duration-300',
                        isExpanded ? 'rotate-180' : ''
                      )}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-14 pt-3 pb-2 space-y-3">
                        <p className="text-sm text-lcars-muted leading-relaxed">
                          {phase.keyDeliverable}
                        </p>
                        <div className="space-y-1.5">
                          {phase.objectives.slice(0, 4).map((obj) => (
                            <div key={obj} className="flex items-start gap-2">
                              <div
                                className="w-1 h-1 rounded-full mt-2 shrink-0"
                                style={{ backgroundColor: phase.color }}
                              />
                              <span className="text-xs text-lcars-dim leading-relaxed">{obj}</span>
                            </div>
                          ))}
                        </div>
                        <div
                          className="text-xs italic leading-relaxed pt-1 border-t"
                          style={{ color: `${phase.color}80`, borderColor: `${phase.color}20` }}
                        >
                          {phase.strategicOutcome}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
