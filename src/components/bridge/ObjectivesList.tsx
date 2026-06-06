'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { MISSION_OBJECTIVES } from '@/data/mission-config';

const STATUS_STYLES = {
  complete:    { icon: 'text-lcars-green',  text: 'text-lcars-text',  badge: null,            strokeWidth: 2   },
  'in-progress': { icon: 'text-lcars-amber', text: 'text-lcars-muted', badge: 'IN PROGRESS',  strokeWidth: 2   },
  pending:     { icon: 'text-lcars-dim',    text: 'text-lcars-dim',   badge: 'PENDING',       strokeWidth: 1.5 },
};

export default function ObjectivesList() {
  return (
    <div className="glass rounded-2xl p-6 lcars-bar-green">
      <div className="font-mono text-[10px] tracking-[0.2em] text-lcars-muted uppercase mb-4">
        Mission Objectives
      </div>
      <div className="space-y-2.5">
        {MISSION_OBJECTIVES.map((obj, i) => {
          const s = STATUS_STYLES[obj.status];
          return (
            <motion.div
              key={obj.text}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <CheckCircle2
                size={16}
                className={`${s.icon} shrink-0`}
                strokeWidth={s.strokeWidth}
              />
              <span className={`text-sm font-medium ${s.text}`}>
                {obj.text}
              </span>
              {s.badge && (
                <span className="ml-auto font-mono text-[9px] text-lcars-muted tracking-wider shrink-0">
                  {s.badge}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
