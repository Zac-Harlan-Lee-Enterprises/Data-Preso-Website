'use client';

import { useApp } from '@/contexts/AppContext';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';
import VirginiaMode from '@/components/virginia-mode/VirginiaMode';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { virginiaModeActive, closeVirginiaTour } = useApp();

  return (
    <div className="flex h-screen overflow-hidden bg-[#070b12]">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto grid-bg relative">
          {children}
        </main>
        <StatusBar />
      </div>
      {virginiaModeActive && <VirginiaMode onClose={closeVirginiaTour} />}
    </div>
  );
}
