'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Play } from 'lucide-react';

interface Props {
  onStart: (companyName: string) => void;
}

export default function SimulatorTrigger({ onStart }: Props) {
  const [companyName, setCompanyName] = useState('Company X');
  const [alertVisible, setAlertVisible] = useState(true);

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <AnimatePresence mode="wait">
        {alertVisible ? (
          <motion.div
            key="alert"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg text-center space-y-8"
          >
            {/* Alert header */}
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-2xl bg-lcars-amber/10 border border-lcars-amber/30 flex items-center justify-center"
                style={{ boxShadow: '0 0 40px rgba(245,158,11,0.2)' }}>
                <AlertTriangle size={28} className="text-lcars-amber" />
              </div>
              <div>
                <div className="font-mono text-xs tracking-[0.25em] text-lcars-amber uppercase mb-2">
                  Acquisition Integration Simulator
                </div>
                <h2 className="font-mono text-2xl font-semibold text-lcars-text">
                  INCOMING ACQUISITION<br />DETECTED
                </h2>
              </div>
            </motion.div>

            {/* Company input */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <div>
                <label className="font-mono text-[9px] tracking-[0.2em] text-lcars-muted uppercase block mb-2">
                  Acquisition Target
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-lcars-surface border border-lcars-border rounded-lg px-4 py-3 font-mono text-lcars-text text-sm focus:outline-none focus:border-lcars-amber/50 focus:ring-1 focus:ring-lcars-amber/20 transition-all"
                  placeholder="Enter company name..."
                />
              </div>
              <div className="font-mono text-[9px] text-lcars-dim leading-relaxed">
                This simulation will walk through the 7-step canonical integration pattern — 
                from raw data ingestion through governance activation and business user access.
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setAlertVisible(false);
                  setTimeout(() => onStart(companyName || 'Company X'), 400);
                }}
                className="flex items-center gap-3 px-8 py-3.5 rounded-xl font-mono text-sm font-semibold bg-lcars-amber/20 border border-lcars-amber/40 text-lcars-amber hover:bg-lcars-amber/30 transition-all"
                style={{ boxShadow: '0 0 30px rgba(245,158,11,0.15)' }}
              >
                <Play size={16} />
                BEGIN INTEGRATION SIMULATION
              </motion.button>
              <p className="font-mono text-[9px] text-lcars-dim tracking-wider">
                Estimated real-world target: 4–8 weeks
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
