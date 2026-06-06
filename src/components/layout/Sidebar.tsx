'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Cpu,
  GitMerge,
  Terminal,
  BookOpen,
  Play,
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { ACTIVE_CREW } from '@/data/crew';
import { cn, publicUrl } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Bridge Overview', icon: LayoutDashboard, description: 'Mission status & readiness' },
  { href: '/engineering', label: 'Main Engineering', icon: Cpu, description: 'Architecture explorer' },
  { href: '/acquisition', label: 'Acquisition Simulator', icon: GitMerge, description: 'Integration demonstration' },
  { href: '/computer', label: 'Computer Interface', icon: Terminal, description: 'Conversational intelligence' },
  { href: "/captains-log", label: "Captain's Log", icon: BookOpen, description: 'Future vision — 2028' },
];

function Stardate() {
  const now = new Date();
  const year = now.getFullYear();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(year, 0, 0).getTime()) / 86400000
  );
  const stardate = `${year}.${String(dayOfYear).padStart(3, '0')}`;
  return (
    <span className="font-mono text-xs text-lcars-muted tracking-widest">
      STARDATE {stardate}
    </span>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { startVirginiaTour } = useApp();

  return (
    <aside className="flex flex-col w-64 shrink-0 h-screen bg-[#070b12] border-r border-lcars-border/50 relative z-10">
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-lcars-amber via-lcars-cyan to-lcars-violet" />

      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-lcars-border/40">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-lcars-cyan animate-pulse-slow" />
          <span className="font-mono text-[10px] text-lcars-cyan tracking-[0.2em] uppercase">
            NCC-2026-L
          </span>
        </div>
        <h1 className="font-mono text-sm font-semibold text-lcars-amber tracking-wide leading-tight">
          USS LEE ENTERPRISE
        </h1>
        <p className="font-mono text-[9px] text-lcars-muted tracking-widest uppercase mt-1">
          Data Modernization Command
        </p>
        <div className="mt-2">
          <Stardate />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <p className="font-mono text-[9px] text-lcars-dim tracking-[0.2em] uppercase px-2 mb-3">
          Mission Modules
        </p>
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                isActive
                  ? 'bg-lcars-cyan/10 border border-lcars-cyan/30 text-lcars-cyan'
                  : 'text-lcars-muted hover:bg-lcars-surface hover:text-lcars-text border border-transparent'
              )}
            >
              {isActive && (
                <div className="absolute left-3 w-0.5 h-8 bg-lcars-cyan rounded-full" />
              )}
              <Icon
                size={16}
                className={cn(
                  'shrink-0 transition-colors',
                  isActive ? 'text-lcars-cyan' : 'text-lcars-dim group-hover:text-lcars-muted'
                )}
              />
              <div className="min-w-0">
                <div
                  className={cn(
                    'text-xs font-medium truncate',
                    isActive ? 'text-lcars-cyan' : ''
                  )}
                >
                  {item.label}
                </div>
                <div className="text-[10px] text-lcars-dim truncate mt-0.5">
                  {item.description}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Virginia Mode button */}
      <div className="px-3 pb-3">
        <button
          onClick={startVirginiaTour}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-lcars-amber/10 border border-lcars-amber/30 text-lcars-amber hover:bg-lcars-amber/20 transition-all duration-200 group"
        >
          <Play size={14} className="shrink-0" />
          <div className="text-left min-w-0">
            <div className="text-xs font-mono font-medium">Begin Tour</div>
            <div className="text-[10px] text-lcars-amber/60 font-mono">Virginia Mode</div>
          </div>
        </button>
      </div>

      {/* Crew section */}
      <div className="px-4 pb-4 border-t border-lcars-border/40 pt-4">
        <p className="font-mono text-[9px] text-lcars-dim tracking-[0.2em] uppercase mb-3">
          Bridge Crew
        </p>
        <div className="space-y-3">
          {ACTIVE_CREW.map((member) => (
            <div key={member.id} className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-lcars-amber/40">
                  <img
                    src={publicUrl(member.photo)}
                    alt={member.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-lcars-green border-2 border-[#070b12]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-lcars-text truncate">
                  {member.name}
                </div>
                <div className="text-[10px] text-lcars-muted font-mono truncate">
                  {member.rank} · {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 w-full bg-gradient-to-r from-lcars-violet via-lcars-cyan to-lcars-amber" />
    </aside>
  );
}
