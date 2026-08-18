import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  REELS,
  type Reel,
} from "../data/reels";
import {
  getAnalysisSignals,
  getHypeFilteredCount,
  getInterestNodes,
  getRecommendations,
  getTopInterests,
  type InterestProfile,
  type Recommendation,
} from "../lib/agent";

type ReelInteraction = "like" | "save" | "share" | "skip";

type ReelAgentContextValue = {
  reels: Reel[];
  selectedReel: Reel | null;
  setSelectedReel: (reel: Reel | null) => void;
  trackInteraction: (id: string, interaction: ReelInteraction) => void;
  interestProfiles: InterestProfile[];
  analysisSignals: { label: string; value: number; color: string }[];
  recommendations: Recommendation[];
  hypeFilteredCount: number;
  interestNodes: Array<{
    label: string;
    x: string;
    y: string;
    size: string;
    color: string;
    text: string;
  }>;
};

const ReelAgentContext = createContext<ReelAgentContextValue | undefined>(undefined);

export function ReelAgentProvider({ children }: { children: ReactNode }) {
  const [reels, setReels] = useState<Reel[]>(REELS);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);

  const trackInteraction = (id: string, interaction: ReelInteraction) => {
    setReels((current) =>
      current.map((reel) => {
        if (reel.id !== id) return reel;

        const next = { ...reel };
        const signalLift = 3;

        if (interaction === "like") {
          next.liked = !next.liked;
          next.signalScore = Math.min(99, next.signalScore + (next.liked ? signalLift : -signalLift));
        }
        if (interaction === "save") {
          next.saved = !next.saved;
          next.signalScore = Math.min(99, next.signalScore + (next.saved ? signalLift : -signalLift));
        }
        if (interaction === "share") {
          next.shared = !next.shared;
          next.signalScore = Math.min(99, next.signalScore + (next.shared ? signalLift : -signalLift));
        }
        if (interaction === "skip") {
          next.skipped = !next.skipped;
          next.signalScore = Math.max(0, next.signalScore - (next.skipped ? signalLift * 2 : -signalLift));
          next.hypeScore = Math.min(100, Math.max(0, next.hypeScore + (next.skipped ? 12 : -12)));
        }

        next.explanation = next.explanation || "Engagement behavior reinforces this topic cluster.";
        return next;
      }),
    );

    setSelectedReel((current) => {
      if (!current || current.id !== id) return current;
      return reels.find((reel) => reel.id === id) ?? current;
    });
  };

  const interestProfiles = useMemo(() => getTopInterests(reels), [reels]);
  const analysisSignals = useMemo(() => getAnalysisSignals(reels), [reels]);
  const recommendations = useMemo(() => getRecommendations(reels), [reels]);
  const hypeFilteredCount = useMemo(() => getHypeFilteredCount(reels), [reels]);
  const interestNodes = useMemo(() => getInterestNodes(reels), [reels]);

  const value = useMemo<ReelAgentContextValue>(
    () => ({
      reels,
      selectedReel,
      setSelectedReel,
      trackInteraction,
      interestProfiles,
      analysisSignals,
      recommendations,
      hypeFilteredCount,
      interestNodes,
    }),
    [reels, selectedReel, interestProfiles, analysisSignals, recommendations, hypeFilteredCount, interestNodes],
  );

  return <ReelAgentContext.Provider value={value}>{children}</ReelAgentContext.Provider>;
}

export function useReelAgent() {
  const context = useContext(ReelAgentContext);

  if (!context) {
    throw new Error("useReelAgent must be used within a ReelAgentProvider");
  }

  return context;
}
