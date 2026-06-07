'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';
import VirginiaMode from '@/components/virginia-mode/VirginiaMode';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { virginiaModeActive, closeVirginiaTour } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#070b12]">
      {/* Sidebar — always visible on md+, drawer overlay on mobile */}
      <>
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <div className={`fixed inset-y-0 left-0 z-40 md:relative md:flex md:z-auto transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Mobile header bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#070b12] border-b border-lcars-border/50 md:hidden shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-lcars-muted hover:text-lcars-text hover:bg-lcars-surface transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-lcars-cyan animate-pulse-slow" />
            <span className="font-mono text-xs font-semibold text-lcars-amber tracking-wide">USS LEE ENTERPRISE</span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto grid-bg relative">
          {children}
        </main>
        <StatusBar />
      </div>
      {virginiaModeActive && <VirginiaMode onClose={closeVirginiaTour} />}
    </div>
  );
}
