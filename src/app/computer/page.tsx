'use client';

import { motion } from 'framer-motion';
import ComputerTerminal from '@/components/computer/ComputerTerminal';

export default function ComputerPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-6 py-4 border-b border-lcars-border/40 shrink-0"
      >
        <div>
          <div className="font-mono text-[9px] tracking-[0.25em] text-lcars-cyan uppercase mb-1">
            Module 4
          </div>
          <h1 className="font-mono text-xl font-semibold text-lcars-text">
            Computer Interface
          </h1>
          <p className="text-lcars-muted text-xs mt-1">
            Strategic Q&A grounded in Lee's platform architecture · Optional live AI via API key
          </p>
        </div>
        <div className="glass rounded-xl px-4 py-2">
          <div className="font-mono text-[9px] text-lcars-muted tracking-wider">STATUS</div>
          <div className="font-mono text-sm font-semibold text-lcars-cyan">READY</div>
        </div>
      </motion.div>
      <div className="flex-1 min-h-0">
        <ComputerTerminal />
      </div>
    </div>
  );
}
