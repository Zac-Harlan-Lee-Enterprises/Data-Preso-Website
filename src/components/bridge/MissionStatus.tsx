'use client';

import { motion } from 'framer-motion';

interface MissionStatusProps {
  progress?: number;
}

export default function MissionStatus({ progress = 78 }: MissionStatusProps) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="glass rounded-2xl p-6 lcars-bar-amber">
      <div className="font-mono text-[10px] tracking-[0.2em] text-lcars-muted uppercase mb-4">
        Mission Status
      </div>
      <div className="flex items-center gap-8">
        {/* Radial progress */}
        <div className="relative shrink-0">
          <svg width="128" height="128" className="radial-progress">
            {/* Background ring */}
            <circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke="#1e3a5f"
              strokeWidth="8"
            />
            {/* Progress ring */}
            <motion.circle
              cx="64"
              cy="64"
              r="54"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.8, delay: 0.4, ease: 'easeOut' }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="font-mono text-3xl font-semibold text-lcars-amber"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {progress}%
            </motion.span>
            <span className="font-mono text-[9px] text-lcars-muted tracking-widest">PROGRESS</span>
          </div>
        </div>

        {/* Mission details */}
        <div className="flex-1 min-w-0 space-y-3">
          <div>
            <div className="font-mono text-[9px] text-lcars-muted tracking-widest uppercase">
              Current Mission
            </div>
            <div className="font-mono text-lg font-semibold text-lcars-text mt-1">
              Data Modernization
            </div>
            <div className="font-mono text-xs text-lcars-muted mt-0.5">
              Phase 1 · Canonical Subscriber Model
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {['Platform Architecture', 'Canonical Models', 'AI Governance'].map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded font-mono text-[9px] tracking-wider bg-lcars-amber/10 text-lcars-amber border border-lcars-amber/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lcars-green animate-pulse-slow" />
            <span className="font-mono text-xs text-lcars-green tracking-wider">
              Mission Active · All Systems Nominal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
