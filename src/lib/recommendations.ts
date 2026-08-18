import type { Reel } from "../data/reels";

export function engagementScore(reel: Reel) {
  return Math.min(100, reel.watchPercentage * 0.55 + (reel.liked ? 16 : 0) + (reel.saved ? 19 : 0) + (reel.shared ? 10 : 0));
}
export function skipPenalty(reel: Reel) { return reel.skipped ? 42 : 0; }
export function educationalValue(reel: Reel) { return reel.educationalValue; }
export function hypePenalty(reel: Reel) { return reel.hypeScore * 0.55; }
export function topicInterestScore(topic: string, reels: Reel[]) {
  const matching = reels.filter((reel) => reel.topics.includes(topic));
  if (!matching.length) return 0;
  return matching.reduce((score, reel) => score + engagementScore(reel) * (educationalValue(reel) / 100) - skipPenalty(reel) - hypePenalty(reel), 0) / matching.length;
}
export function rankedTopics(reels: Reel[]) {
  const topics = [...new Set(reels.flatMap((reel) => reel.topics))];
  return topics.map((topic) => ({ topic, score: Math.max(0, topicInterestScore(topic, reels)) })).filter(({ score }) => score >= 25).sort((a, b) => b.score - a.score);
}
export function recommendationScore(reel: Reel, reels: Reel[]) {
  const topicSignal = reel.topics.reduce((total, topic) => total + topicInterestScore(topic, reels), 0) / reel.topics.length;
  return Math.max(0, Math.min(99, topicSignal * 0.58 + educationalValue(reel) * 0.42 - hypePenalty(reel)));
}
export function analysisSummary(reels: Reel[]) {
  const topics = rankedTopics(reels);
  const interacted = reels.filter((r) => r.watchPercentage > 0);
  const confidence = interacted.length ? Math.round(Math.min(98, 35 + interacted.reduce((sum, r) => sum + engagementScore(r) - skipPenalty(r), 0) / interacted.length * 0.65)) : 0;
  const hypeFiltered = reels.filter((r) => r.hypeScore >= 55 && (r.skipped || engagementScore(r) < 50)).length;
  return { topics, confidence, hypeFiltered };
}
