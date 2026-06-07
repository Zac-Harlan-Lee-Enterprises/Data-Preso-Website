'use client';

import { motion } from 'framer-motion';
import { ACTIVE_CREW, DIVISION_COLORS } from '@/data/crew';
import { publicUrl } from '@/lib/utils';

export default function CrewRoster() {
  return (
    <div className="glass rounded-2xl p-6 lcars-bar-amber">
      <div className="font-mono text-[10px] tracking-[0.2em] text-lcars-muted uppercase mb-5">
        Bridge Crew
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {ACTIVE_CREW.map((member, i) => {
          const dc = DIVISION_COLORS[member.division];
          return (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="glass rounded-xl p-4 flex flex-col items-center text-center gap-3 cursor-default transition-colors hover:border-lcars-amber/30"
          >
            <div
              className="relative w-20 h-20 rounded-full overflow-hidden"
              style={{
                outline: `2px solid ${dc.color}`,
                outlineOffset: '2px',
                boxShadow: `0 0 20px ${dc.glow}`,
              }}
            >
              <img
                src={publicUrl(member.photo)}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase mb-1 text-lcars-muted">
                {member.rank}
              </div>
              <div className="font-semibold text-lcars-text text-sm">{member.name}</div>
              <div className="text-xs text-lcars-muted mt-0.5">{member.role}</div>
              <div className="font-mono text-[9px] text-lcars-dim mt-2 leading-relaxed">
                {member.strategicDomain}
              </div>
            </div>
          </motion.div>
          );
        })}
      </div>
    </div>
  );
}
