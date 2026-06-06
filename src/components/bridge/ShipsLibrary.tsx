'use client';

import { motion } from 'framer-motion';
import { BookOpen, FileText, ExternalLink } from 'lucide-react';
import { publicUrl } from '@/lib/utils';

const DOCUMENTS = [
  {
    id: 'architecture',
    title: 'Data & AI Architecture',
    subtitle: 'Technical Blueprint',
    description:
      'System architecture diagrams covering the full medallion data pipeline — Raw through AI/Semantic — GCP infrastructure, Airflow orchestration, dbt transformation layers, and Vertex AI integration.',
    classification: 'TECHNICAL REFERENCE',
    href: '/data-ai-architecture.pdf',
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.25)',
    icon: FileText,
  },
  {
    id: 'proposal',
    title: 'Lee AI Platform Proposal',
    subtitle: 'Strategic Initiative Document',
    description:
      'The original strategic proposal for the USS Lee Enterprise data modernization mission — executive summary, investment rationale, phased roadmap, and projected business outcomes.',
    classification: 'COMMAND BRIEFING',
    href: '/lee-ai-platform-proposal.pdf',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
    icon: BookOpen,
  },
];

export default function ShipsLibrary() {
  return (
    <div className="glass rounded-2xl p-6 lcars-bar-violet">
      <div className="flex items-center gap-3 mb-5">
        <BookOpen size={14} className="text-lcars-violet shrink-0" />
        <div className="font-mono text-[10px] tracking-[0.2em] text-lcars-muted uppercase">
          Ship's Library — Mission Archives
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DOCUMENTS.map((doc, i) => {
          const Icon = doc.icon;
          return (
            <motion.a
              key={doc.id}
              href={publicUrl(doc.href)}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group glass rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 cursor-pointer"
              style={{ borderColor: 'transparent' }}
              whileHover={{
                boxShadow: `0 0 28px ${doc.glow}`,
                borderColor: `${doc.color}30`,
              }}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${doc.color}15`, border: `1px solid ${doc.color}30` }}
                >
                  <Icon size={18} style={{ color: doc.color }} />
                </div>
                <ExternalLink
                  size={12}
                  className="mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: doc.color }}
                />
              </div>

              {/* Classification badge */}
              <div>
                <div
                  className="inline-block font-mono text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 rounded mb-2"
                  style={{
                    backgroundColor: `${doc.color}12`,
                    color: doc.color,
                    border: `1px solid ${doc.color}25`,
                  }}
                >
                  {doc.classification}
                </div>
                <div className="font-mono font-semibold text-sm text-lcars-text leading-snug">
                  {doc.title}
                </div>
                <div className="font-mono text-[10px] text-lcars-muted mt-0.5">
                  {doc.subtitle}
                </div>
              </div>

              <p className="text-xs text-lcars-dim leading-relaxed">
                {doc.description}
              </p>

              <div
                className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider mt-auto"
                style={{ color: doc.color }}
              >
                <span>ACCESS DOCUMENT</span>
                <ExternalLink size={10} />
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
