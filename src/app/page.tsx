'use client';

import { motion } from 'framer-motion';
import MissionStatus from '@/components/bridge/MissionStatus';
import ObjectivesList from '@/components/bridge/ObjectivesList';
import ReadinessIndicators from '@/components/bridge/ReadinessIndicators';
import RoadmapTimeline from '@/components/bridge/RoadmapTimeline';
import CrewRoster from '@/components/bridge/CrewRoster';
import { MISSION_PROGRESS } from '@/data/mission-config';

export default function BridgePage() {
  return (
    <div className="min-h-full p-6 space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="font-mono text-[9px] tracking-[0.25em] text-lcars-cyan uppercase mb-1">
            Module 1
          </div>
          <h1 className="font-mono text-2xl font-semibold text-lcars-text">
            Bridge Overview
          </h1>
          <p className="text-lcars-muted text-sm mt-1">
            Executive mission status · Strategic readiness · Three-phase roadmap
          </p>
        </div>
        <div className="flex items-center gap-2 glass rounded-xl px-4 py-2">
          <div className="w-1.5 h-1.5 rounded-full bg-lcars-green animate-pulse-slow" />
          <span className="font-mono text-xs text-lcars-green tracking-wider">MISSION ACTIVE</span>
        </div>
      </motion.div>

      {/* Primary row: Mission Status + Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <MissionStatus progress={MISSION_PROGRESS} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <ObjectivesList />
        </motion.div>
      </div>

      {/* Readiness indicators */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <ReadinessIndicators />
      </motion.div>

      {/* Roadmap + Crew */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <RoadmapTimeline />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <CrewRoster />
        </motion.div>
      </div>
    </div>
  );
}
