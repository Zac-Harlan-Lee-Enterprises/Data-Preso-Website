'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ACTIVE_CREW } from '@/data/crew';

export default function CrewRoster() {
  return (
    <div className="glass rounded-2xl p-6 lcars-bar-amber">
      <div className="font-mono text-[10px] tracking-[0.2em] text-lcars-muted uppercase mb-5">
        Bridge Crew
      </div>
      <div className="grid grid-cols-2 gap-4">
        {ACTIVE_CREW.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="glass rounded-xl p-4 flex flex-col items-center text-center gap-3 hover:border-lcars-amber/30 transition-colors cursor-default"
          >
            <div
              className="relative w-20 h-20 rounded-full overflow-hidden"
              style={{
                outline: `2px solid ${i === 0 ? '#f59e0b' : '#0ea5e9'}`,
                outlineOffset: '2px',
                boxShadow: `0 0 20px ${i === 0 ? 'rgba(245,158,11,0.3)' : 'rgba(14,165,233,0.3)'}`,
              }}
            >
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-mono text-[9px] tracking-[0.15em] uppercase mb-1"
                style={{ color: i === 0 ? '#f59e0b' : '#0ea5e9' }}>
                {member.rank}
              </div>
              <div className="font-semibold text-lcars-text text-sm">{member.name}</div>
              <div className="text-xs text-lcars-muted mt-0.5">{member.role}</div>
              <div className="font-mono text-[9px] text-lcars-dim mt-2 leading-relaxed">
                {member.strategicDomain}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
