'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const ArchitectureFlow = dynamic(
  () => import('@/components/engineering/ArchitectureFlow'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-2 border-lcars-cyan border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="font-mono text-xs text-lcars-muted tracking-widest">
            LOADING SHIP SYSTEMS...
          </div>
        </div>
      </div>
    ),
  }
);

export default function EngineeringPage() {
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
            Module 2
          </div>
          <h1 className="font-mono text-xl font-semibold text-lcars-text">
            Main Engineering
          </h1>
          <p className="text-lcars-muted text-xs mt-1">
            Click any ship system to explore · Toggle access flows to trace data paths
          </p>
        </div>
        <div className="flex items-center gap-4 text-right">
          <div className="glass rounded-xl px-4 py-2 text-right">
            <div className="font-mono text-[9px] text-lcars-muted tracking-wider">SYSTEMS ONLINE</div>
            <div className="font-mono text-lg font-semibold text-lcars-cyan">10 / 10</div>
          </div>
        </div>
      </motion.div>

      {/* Flow canvas — full remaining height */}
      <div className="flex-1 min-h-0">
        <ArchitectureFlow />
      </div>
    </div>
  );
}
