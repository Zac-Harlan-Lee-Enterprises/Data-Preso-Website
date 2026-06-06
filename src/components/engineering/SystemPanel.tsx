'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { ShipSystemData } from '@/data/architecture-nodes';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'responsibilities', label: 'Responsibilities' },
  { id: 'current', label: 'Current State' },
  { id: 'future', label: 'Future State' },
  { id: 'value', label: 'Business Value' },
  { id: 'dependencies', label: 'Dependencies' },
  { id: 'strategic', label: 'Strategic Importance' },
] as const;

type TabId = (typeof TABS)[number]['id'];

interface Props {
  node: ShipSystemData;
  onClose: () => void;
}

export default function SystemPanel({ node, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  return (
    <AnimatePresence>
      <motion.div
        key={node.shipSystem}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3 }}
        className="w-96 shrink-0 glass-strong border-l border-lcars-border flex flex-col h-full overflow-hidden"
      >
        {/* Header */}
        <div
          className="px-5 py-4 border-b border-lcars-border/60"
          style={{ borderLeftColor: node.color, borderLeftWidth: 3 }}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <div
                className="font-mono text-[9px] tracking-[0.2em] uppercase mb-1"
                style={{ color: node.color }}
              >
                SHIP SYSTEM
              </div>
              <h2 className="font-mono text-base font-semibold text-lcars-text">
                {node.shipSystem}
              </h2>
              <div className="font-mono text-xs text-lcars-muted mt-0.5">
                {node.technology}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-lcars-muted hover:text-lcars-text hover:bg-lcars-surface shrink-0"
            >
              <X size={14} />
            </button>
          </div>
          <div className="font-mono text-[10px] text-lcars-dim mt-2">{node.subtitle}</div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 px-4 py-2 border-b border-lcars-border/40 overflow-x-auto shrink-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="shrink-0 px-2.5 py-1 rounded font-mono text-[9px] tracking-wide transition-all duration-150"
              style={
                activeTab === tab.id
                  ? {
                      backgroundColor: `${node.color}20`,
                      color: node.color,
                      border: `1px solid ${node.color}40`,
                    }
                  : {
                      color: '#64748b',
                      border: '1px solid transparent',
                    }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <p className="text-sm text-lcars-muted leading-relaxed">
                  {node.panel.overview}
                </p>
              )}

              {activeTab === 'responsibilities' && (
                <div className="space-y-2.5">
                  {node.panel.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: node.color }}
                      />
                      <span className="text-sm text-lcars-muted leading-relaxed">{r}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'current' && (
                <p className="text-sm text-lcars-muted leading-relaxed">
                  {node.panel.currentState}
                </p>
              )}

              {activeTab === 'future' && (
                <p className="text-sm text-lcars-muted leading-relaxed">
                  {node.panel.futureState}
                </p>
              )}

              {activeTab === 'value' && (
                <p className="text-sm text-lcars-muted leading-relaxed">
                  {node.panel.businessValue}
                </p>
              )}

              {activeTab === 'dependencies' && (
                <div className="space-y-2">
                  {node.panel.dependencies.map((dep) => (
                    <div
                      key={dep}
                      className="flex items-center gap-2 glass rounded-lg px-3 py-2"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: node.color }}
                      />
                      <span className="font-mono text-xs text-lcars-text">{dep}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'strategic' && (
                <div>
                  <p className="text-sm text-lcars-muted leading-relaxed">
                    {node.panel.strategicImportance}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
