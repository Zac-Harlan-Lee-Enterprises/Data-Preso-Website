'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  virginiaModeActive: boolean;
  startVirginiaTour: () => void;
  closeVirginiaTour: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [virginiaModeActive, setVirginiaModeActive] = useState(false);

  return (
    <AppContext.Provider
      value={{
        virginiaModeActive,
        startVirginiaTour: () => setVirginiaModeActive(true),
        closeVirginiaTour: () => setVirginiaModeActive(false),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
