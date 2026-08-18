import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { REELS, type Reel } from "../data/reels";

type InteractionKey = "liked" | "saved" | "shared" | "skipped";
type InteractionContextValue = { reels: Reel[]; toggle: (id: string, key: InteractionKey) => void; setWatchPercentage: (id: string, percentage: number) => void };
const InteractionContext = createContext<InteractionContextValue | null>(null);
const STORAGE_KEY = "algorithm-knows-you-interactions";
type SavedInteractions = Record<string, Pick<Reel, "watchPercentage" | InteractionKey>>;

export function InteractionProvider({ children }: { children: React.ReactNode }) {
  const [reels, setReels] = useState<Reel[]>(() => {
    try { const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as SavedInteractions; return REELS.map((reel) => ({ ...reel, ...saved[reel.id] })); } catch { return REELS; }
  });
  useEffect(() => { const saved = Object.fromEntries(reels.map(({ id, watchPercentage, liked, saved, shared, skipped }) => [id, { watchPercentage, liked, saved, shared, skipped }])); localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); }, [reels]);
  const value = useMemo(() => ({ reels, toggle: (id: string, key: InteractionKey) => setReels((current) => current.map((r) => r.id === id ? { ...r, [key]: !r[key] } : r)), setWatchPercentage: (id: string, percentage: number) => setReels((current) => current.map((r) => r.id === id ? { ...r, watchPercentage: Math.max(0, Math.min(100, Math.round(percentage)) ) } : r)) }), [reels]);
  return <InteractionContext.Provider value={value}>{children}</InteractionContext.Provider>;
}
export function useInteractions() { const context = useContext(InteractionContext); if (!context) throw new Error("useInteractions must be used within InteractionProvider"); return context; }
