import type { Reel } from "../data/reels";

export type InterestProfile = {
  label: string;
  score: number;
  explanation: string;
};

export type Recommendation = {
  tag: string;
  title: string;
  match: number;
  reason: string;
};

export function getTopInterests(reels: Reel[]): InterestProfile[] {
  const totals = new Map<string, { score: number; count: number }>();

  for (const reel of reels) {
    const weight = reel.signalScore + (reel.liked ? 12 : 0) + (reel.saved ? 8 : 0) + (reel.shared ? 6 : 0);

    for (const topic of reel.topics) {
      const current = totals.get(topic) ?? { score: 0, count: 0 };
      current.score += weight;
      current.count += 1;
      totals.set(topic, current);
    }
  }

  return [...totals.entries()]
    .map(([label, entry]) => ({
      label,
      score: Math.min(99, Math.round(entry.score / Math.max(1, entry.count))),
      explanation: `Repeated across ${entry.count} relevant reels with strong dwell and save behavior.`,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

export function getAnalysisSignals(reels: Reel[]) {
  const avgWatch = Math.round(
    reels.reduce((sum, reel) => sum + reel.watchPercentage, 0) / Math.max(1, reels.length),
  );
  const avgSave = Math.round(
    (reels.filter((reel) => reel.saved).length / Math.max(1, reels.length)) * 100,
  );
  const skipPenalty = Math.round(
    (reels.filter((reel) => reel.skipped).length / Math.max(1, reels.length)) * 100,
  );

  return [
    { label: "Watch depth", value: avgWatch, color: "bg-accent-400" },
    { label: "Replay rate", value: Math.min(99, Math.round(avgWatch * 0.72)), color: "bg-signal-400" },
    { label: "Save ratio", value: avgSave, color: "bg-lime-400" },
    { label: "Skip penalty", value: skipPenalty, color: "bg-amber-400" },
  ];
}

export function getHypeFilteredCount(reels: Reel[]) {
  return reels.filter((reel) => reel.hypeScore >= 65).length;
}

export function getRecommendations(reels: Reel[]): Recommendation[] {
  const interests = getTopInterests(reels);

  return reels
    .filter((reel) => !reel.skipped && reel.hypeScore < 65)
    .map((reel) => {
      const tag = reel.topics[0] ?? "Deep Tech";
      const boost = interests.find((interest) => interest.label === tag)?.score ?? 55;
      const match = Math.min(
        99,
        Math.max(
          62,
          Math.round(
            reel.watchPercentage * 0.55 +
              reel.signalScore * 0.28 +
              (reel.liked ? 12 : 0) +
              (reel.saved ? 8 : 0) +
              (reel.shared ? 6 : 0) +
              boost * 0.2,
          ),
        ),
      );

      return {
        tag,
        title: reel.title,
        match,
        reason: reel.explanation,
      };
    })
    .sort((a, b) => b.match - a.match)
    .slice(0, 4);
}

export function getInterestNodes(reels: Reel[]) {
  const interests = getTopInterests(reels);

  const nodes = [
    { label: interests[0]?.label ?? "AI", x: "20%", y: "30%", size: "h-20 w-20", color: "from-accent-400/40 to-accent-400/5", text: "text-accent-200" },
    { label: interests[1]?.label ?? "ML", x: "55%", y: "22%", size: "h-24 w-24", color: "from-signal-400/40 to-signal-400/5", text: "text-slate-200" },
    { label: interests[2]?.label ?? "DevOps", x: "72%", y: "62%", size: "h-20 w-20", color: "from-lime-400/40 to-lime-400/5", text: "text-lime-300" },
    { label: interests[3]?.label ?? "Web3", x: "32%", y: "70%", size: "h-16 w-16", color: "from-amber-400/40 to-amber-400/5", text: "text-amber-300" },
  ];

  return nodes;
}
