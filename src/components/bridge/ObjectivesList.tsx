'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const OBJECTIVES = [
  { text: 'Establish Canonical Subscriber Models', done: true },
  { text: 'Build Medallion Architecture (5 Layers)', done: true },
  { text: 'Deploy dbt Transformation Governance', done: true },
  { text: 'Govern Enterprise Data with Dataplex', done: true },
  { text: 'Enable Conversational Analytics (Teams)', done: false },
  { text: 'Validate Acquisition Onboarding Pattern', done: true },
  { text: 'Activate AI/Semantic Layer', done: false },
  { text: 'Prepare Agentic AI Foundation', done: false },
];

export default function ObjectivesList() {
  return (
    <div className="glass rounded-2xl p-6 lcars-bar-green">
      <div className="font-mono text-[10px] tracking-[0.2em] text-lcars-muted uppercase mb-4">
        Mission Objectives
      </div>
      <div className="space-y-2.5">
        {OBJECTIVES.map((obj, i) => (
          <motion.div
            key={obj.text}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex items-center gap-3"
          >
            <CheckCircle2
              size={16}
              className={obj.done ? 'text-lcars-green shrink-0' : 'text-lcars-dim shrink-0'}
              strokeWidth={obj.done ? 2 : 1.5}
            />
            <span
              className={`text-sm font-medium ${
                obj.done ? 'text-lcars-text' : 'text-lcars-muted'
              }`}
            >
              {obj.text}
            </span>
            {!obj.done && (
              <span className="ml-auto font-mono text-[9px] text-lcars-muted tracking-wider shrink-0">
                IN PROGRESS
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
