import type { Reel } from "../data/reels";
import { reelSignal } from "./interestInference";

export type QualityDecision = { reel: Reel; filtered: boolean; qualityScore: number; reasons: string[] };
const sensational = /guarantee|will get you a job|overnight|secret|best .*2026|replace every|six-figure/i;

export function assessQuality(reel: Reel): QualityDecision {
  const reasons: string[] = [];
  if (reel.hypeScore >= 55) reasons.push("high hype score");
  if (sensational.test(`${reel.title} ${reel.description}`)) reasons.push("sensational claim");
  if (reel.educationalValue < 45) reasons.push("low educational value");
  if (reelSignal(reel) < 30 || reel.skipped) reasons.push("weak user engagement");
  const qualityScore = Math.max(0, Math.min(100, reel.educationalValue - reel.hypeScore * 0.45 + Math.max(0, reelSignal(reel)) * 0.18));
  return { reel, filtered: reasons.length >= 2 || (reel.hypeScore >= 70 && reel.educationalValue < 65), qualityScore: Math.round(qualityScore), reasons };
}
export function qualityGuard(reels: Reel[]) { return reels.map(assessQuality); }
