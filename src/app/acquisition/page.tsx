'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SimulatorTrigger from '@/components/acquisition/SimulatorTrigger';
import MedallionFlow from '@/components/acquisition/MedallionFlow';

export default function AcquisitionPage() {
  const [companyName, setCompanyName] = useState<string | null>(null);

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
            Module 3
          </div>
          <h1 className="font-mono text-xl font-semibold text-lcars-text">
            Acquisition Simulator
          </h1>
          <p className="text-lcars-muted text-xs mt-1">
            Demonstrate the canonical integration pattern — from raw data to business access
          </p>
        </div>
        <div className="glass rounded-xl px-4 py-2 text-right">
          <div className="font-mono text-[9px] text-lcars-muted tracking-wider">TARGET</div>
          <div className="font-mono text-sm font-semibold text-lcars-green">4 – 8 Weeks</div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-h-0 flex">
        {companyName === null ? (
          <SimulatorTrigger onStart={setCompanyName} />
        ) : (
          <MedallionFlow companyName={companyName} onReset={() => setCompanyName(null)} />
        )}
      </div>
    </div>
  );
}
