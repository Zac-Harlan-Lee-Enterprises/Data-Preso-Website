'use client';

import { useEffect, useState } from 'react';
import { Activity, Wifi, Server, Database } from 'lucide-react';

const TICKER_ITEMS = [
  'CANONICAL SUBSCRIBER MODEL: OPERATIONAL',
  'MEDALLION ARCHITECTURE: 5 LAYERS ACTIVE',
  'DBT TRANSFORMATION ENGINE: NOMINAL',
  'DATAPLEX GOVERNANCE: ENFORCED',
  'BIGQUERY WARP CORE: ONLINE',
  'AIRFLOW ORCHESTRATION: 12 DAGS RUNNING',
  'CONVERSATIONAL AI: READY',
  'GCS DATA TRANSPORT: NOMINAL',
  'VERTEX AI CORE: STANDBY',
  'ACQUISITION INTEGRATION PATTERN: VALIDATED',
  'PHASE 1 MISSION: IN PROGRESS',
  'ENTERPRISE DATA PLATFORM: USS LEE ENTERPRISE',
];

const SYSTEM_STATUS = [
  { label: 'WARP CORE', icon: Database, status: 'nominal', color: '#10b981' },
  { label: 'SENSORS', icon: Wifi, status: 'active', color: '#0ea5e9' },
  { label: 'SHIELDS', icon: Activity, status: 'engaged', color: '#f59e0b' },
  { label: 'COMPUTE', icon: Server, status: 'nominal', color: '#10b981' },
];

function Stardate() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className="font-mono text-[10px] text-lcars-cyan tracking-widest">
      {time}
    </span>
  );
}

export default function StatusBar() {
  const tickerText = (TICKER_ITEMS.join('  ✦  ') + '  ✦  ').repeat(2);

  return (
    <div className="h-9 shrink-0 flex items-center border-t border-lcars-border/50 bg-[#070b12]/90 backdrop-blur-sm overflow-hidden px-4 gap-4">
      {/* Left: status indicators */}
      <div className="flex items-center gap-4 shrink-0">
        {SYSTEM_STATUS.map((sys) => {
          const Icon = sys.icon;
          return (
            <div key={sys.label} className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse-slow"
                style={{ backgroundColor: sys.color }}
              />
              <span className="font-mono text-[9px] tracking-widest text-lcars-dim">
                {sys.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center: scrolling ticker */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className="whitespace-nowrap font-mono text-[9px] text-lcars-muted tracking-widest animate-ticker"
          style={{ display: 'inline-block' }}
        >
          {tickerText}
        </div>
      </div>

      {/* Right: time */}
      <div className="shrink-0 flex items-center gap-3">
        <div className="w-px h-4 bg-lcars-border" />
        <Stardate />
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-lcars-green animate-pulse-slow" />
          <span className="font-mono text-[9px] text-lcars-dim tracking-widest">ALL SYSTEMS</span>
        </div>
      </div>
    </div>
  );
}
