'use client';

import { motion } from 'framer-motion';

const INTERACTIONS = [
  {
    question: "How are our subscription trends trending against Q3 projections across all markets?",
    answer: "Captain Harlan, digital subscriptions are up 14.2% versus Q3 projections across 61 markets. The strongest performers are Phoenix (+28%), Denver (+22%), and Austin (+19%). Three markets are below projection — all recently acquired properties now showing recovery curves consistent with canonical model stabilization.",
    metrics: ['14.2% above projection', '61 / 77 markets tracked', '3 markets in recovery'],
    color: '#0ea5e9',
  },
  {
    question: "Compare advertiser yield across all Lee properties for Q4.",
    answer: "Cross-property advertiser yield analysis complete. Enterprise-wide average CPM: $8.40, up 11% versus prior year. Top decile properties averaging $14.20 CPM, attributable to higher digital subscriber density. Canonical audience model now enables programmatic inventory packaging across all 77 properties simultaneously — estimated incremental revenue opportunity: $4.2M annually.",
    metrics: ['$8.40 avg CPM', '11% YoY increase', '$4.2M opportunity identified'],
    color: '#f59e0b',
  },
  {
    question: "What is the integration status of our Q2 acquisition?",
    answer: "The Q2 acquisition is currently in Silver Layer modeling — Day 18 of the canonical integration. Company data has cleared Bronze quality gates with 99.2% record fidelity. Canonical subscriber model mapping is in progress. Projected Gold Layer promotion: Day 28. Full analytical comparability with all 77 Lee properties expected Day 35 — 7 weeks ahead of the historical average.",
    metrics: ['Day 18 of 35 target', '99.2% data fidelity', '7 weeks ahead of historical'],
    color: '#10b981',
  },
  {
    question: "Surface any underperforming markets that need executive attention.",
    answer: "Proactive analysis complete, Captain. Three markets surfaced: Memphis (-8.2% digital subscriber growth vs cohort), Omaha (advertiser yield 22% below regional average), and Fresno (churn rate elevated 3.1 standard deviations above enterprise median). I've prepared briefing packets for each with root cause hypotheses and comparable market recovery patterns. Shall I route these to the relevant property leadership?",
    metrics: ['3 markets flagged', 'Root causes identified', 'Recovery patterns matched'],
    color: '#8b5cf6',
  },
];

const AGENTIC_WORKFLOWS = [
  {
    title: 'Automated Performance Briefing',
    description: 'Every Monday at 6 AM, an AI agent compiles cross-property performance against KPIs, surfaces anomalies, and delivers a briefing to executive leadership — without being asked.',
    frequency: 'Weekly · Automated',
    color: '#0ea5e9',
  },
  {
    title: 'Acquisition Integration Monitor',
    description: 'An agent tracks every active acquisition through the medallion integration pipeline, alerts when quality gates are at risk, and proactively surfaces integration decisions that need human review.',
    frequency: 'Continuous · Proactive',
    color: '#f59e0b',
  },
  {
    title: 'Revenue Yield Optimizer',
    description: 'An agent monitors advertiser yield across all 77 properties, identifies inventory packaging opportunities based on canonical audience segments, and generates yield optimization recommendations for revenue leadership.',
    frequency: 'Daily · Proactive',
    color: '#10b981',
  },
];

export default function CaptainsLogPage() {
  return (
    <div className="min-h-full pb-12">
      {/* Cinematic header */}
      <div className="relative overflow-hidden">
        {/* Star field — deterministic values to avoid hydration mismatch */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => {
            // Simple seeded pseudo-random using index
            const s1 = ((i * 9301 + 49297) % 233280) / 233280;
            const s2 = ((i * 6971 + 12345) % 233280) / 233280;
            const s3 = ((i * 1234 + 56789) % 233280) / 233280;
            const s4 = ((i * 4321 + 98765) % 233280) / 233280;
            const s5 = ((i * 7777 + 11111) % 233280) / 233280;
            const s6 = ((i * 3333 + 77777) % 233280) / 233280;
            return (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: s1 * 2 + 1,
                  height: s1 * 2 + 1,
                  left: `${s2 * 100}%`,
                  top: `${s3 * 100}%`,
                  opacity: s4 * 0.7 + 0.1,
                  animation: `twinkle ${2 + s5 * 4}s ease-in-out ${s6 * 4}s infinite alternate`,
                }}
              />
            );
          })}
        </div>

        <div className="relative px-8 py-14 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] tracking-[0.4em] text-lcars-amber uppercase"
          >
            Captain's Log
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-4xl font-semibold text-lcars-text"
            style={{ textShadow: '0 0 60px rgba(245,158,11,0.3)' }}
          >
            STARDATE 2028.180
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-mono text-xs text-lcars-muted tracking-widest max-w-xl mx-auto"
          >
            USS LEE ENTERPRISE · THREE YEARS INTO THE MISSION
          </motion.p>
        </div>
      </div>

      <div className="px-8 space-y-10 max-w-5xl mx-auto">
        {/* Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8 lcars-bar-amber space-y-4"
        >
          <div className="font-mono text-[9px] tracking-[0.2em] text-lcars-amber uppercase">
            Log Entry
          </div>
          <div className="space-y-4 text-lcars-muted leading-relaxed">
            <p>
              Three years ago, subscription analytics at Lee Enterprises required specialized data teams, 
              manual KPI reconciliation across 77 incompatible systems, and weeks of delay between a 
              business question and a trustworthy answer. Every acquisition triggered a 9–12 month 
              integration cycle before the new property could be compared to the rest of the portfolio.
            </p>
            <p>
              Today, the USS Lee Enterprise operates differently. Every acquisition maps into a canonical 
              enterprise model in four to six weeks. Business users interact with trusted enterprise 
              knowledge through governed AI. An analyst in Austin can benchmark their market against 
              Phoenix, Denver, or any of our 77+ properties in real time, without submitting a ticket 
              or waiting for a data team.
            </p>
            <p>
              The most significant shift is not technological — it is organizational. Lee Enterprises 
              now operates with a single version of business truth. Strategic decisions are made with 
              confidence, not qualification. The data platform is not a support function. It is the 
              operating system of the enterprise.
            </p>
            <p className="text-lcars-text italic">
              — Captain Z. Harlan, Mission Commander, USS Lee Enterprise
            </p>
          </div>
        </motion.div>

        {/* AI Interaction Demos */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="font-mono text-[9px] tracking-[0.2em] text-lcars-muted uppercase mb-2">
              Natural Language Analytics — 2028
            </div>
            <h2 className="font-mono text-xl font-semibold text-lcars-text mb-6">
              What Questions Look Like
            </h2>
          </motion.div>
          <div className="space-y-4">
            {INTERACTIONS.map((interaction, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass rounded-2xl overflow-hidden"
                style={{ borderLeft: `3px solid ${interaction.color}` }}
              >
                {/* Question */}
                <div className="px-6 py-4 border-b border-lcars-border/40">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: interaction.color }}
                    />
                    <span className="font-mono text-[9px] text-lcars-dim tracking-wider">
                      CPT. HARLAN · MISSION COMMANDER
                    </span>
                  </div>
                  <p className="text-sm text-lcars-text">"{interaction.question}"</p>
                </div>

                {/* Answer */}
                <div className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-lcars-cyan animate-pulse-slow" />
                    <span className="font-mono text-[9px] text-lcars-cyan tracking-wider">
                      COMPUTER · GOVERNED RESPONSE
                    </span>
                  </div>
                  <p className="text-sm text-lcars-muted leading-relaxed">{interaction.answer}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {interaction.metrics.map((m) => (
                      <span
                        key={m}
                        className="font-mono text-[9px] px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${interaction.color}12`,
                          color: interaction.color,
                          border: `1px solid ${interaction.color}25`,
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Agentic workflows */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="font-mono text-[9px] tracking-[0.2em] text-lcars-muted uppercase mb-2">
              Agentic AI Layer — Phase 3
            </div>
            <h2 className="font-mono text-xl font-semibold text-lcars-text mb-6">
              Intelligence Without Being Asked
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {AGENTIC_WORKFLOWS.map((workflow, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="glass rounded-2xl p-5 space-y-3"
                style={{ borderTop: `2px solid ${workflow.color}` }}
              >
                <div>
                  <div
                    className="font-mono text-[9px] tracking-wider uppercase mb-2"
                    style={{ color: workflow.color }}
                  >
                    {workflow.frequency}
                  </div>
                  <h3 className="font-semibold text-lcars-text text-sm">{workflow.title}</h3>
                </div>
                <p className="text-xs text-lcars-muted leading-relaxed">{workflow.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-8 text-center space-y-4 border border-lcars-amber/20"
          style={{ boxShadow: '0 0 60px rgba(245,158,11,0.06)' }}
        >
          <div className="font-mono text-[9px] tracking-[0.3em] text-lcars-amber uppercase">
            Mission Accomplished
          </div>
          <h2 className="font-mono text-2xl font-semibold text-lcars-text">
            The Architecture Is Bigger Than the Platform
          </h2>
          <p className="text-lcars-muted max-w-2xl mx-auto leading-relaxed">
            The data platform is not a data project. It is the foundation of Lee Enterprises' 
            future operating model — the infrastructure that makes acquisitions faster, 
            analytics trustworthy, AI responsible, and every strategic decision better than 
            the one before it.
          </p>
          <div className="font-mono text-xs text-lcars-amber/70 tracking-wider">
            END LOG ENTRY · STARDATE 2028.180
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes twinkle {
          from { opacity: 0.1; }
          to { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
