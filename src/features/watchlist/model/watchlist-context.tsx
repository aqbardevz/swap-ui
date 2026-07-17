"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "nova-swap:watchlist";
const listeners = new Set<() => void>();

function readRaw(): string {
  if (typeof window === "undefined") return "[]";
  return window.localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function parseFavorites(raw: string): string[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeFavorites(favorites: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getServerSnapshot(): string {
  return "[]";
}

interface WatchlistState {
  favorites: string[];
  isFavorite: (symbol: string) => boolean;
  toggle: (symbol: string) => void;
}

const WatchlistContext = createContext<WatchlistState | null>(null);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, readRaw, getServerSnapshot);
  const favorites = useMemo(() => parseFavorites(raw), [raw]);

  const toggle = useCallback((symbol: string) => {
    const current = parseFavorites(readRaw());
    const next = current.includes(symbol) ? current.filter((item) => item !== symbol) : [...current, symbol];
    writeFavorites(next);
  }, []);

  const isFavorite = useCallback((symbol: string) => favorites.includes(symbol), [favorites]);

  const value = useMemo<WatchlistState>(() => ({ favorites, isFavorite, toggle }), [favorites, isFavorite, toggle]);

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist(): WatchlistState {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used within a WatchlistProvider");
  return ctx;
}
