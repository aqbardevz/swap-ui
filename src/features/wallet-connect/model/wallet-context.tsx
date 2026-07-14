"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

const MOCK_ADDRESS = "0x7a3fD9e2B4c1A8f6D3e5C9b2A4f7D1e8C6b3A9F2";

interface WalletState {
  isConnected: boolean;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletState | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(() => setAddress(MOCK_ADDRESS), []);
  const disconnect = useCallback(() => setAddress(null), []);

  const value = useMemo<WalletState>(
    () => ({ isConnected: address !== null, address, connect, disconnect }),
    [address, connect, disconnect]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletState {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
}
