import type { Reel } from "../data/reels";
import { getReelConcepts, inferInterests, reelSignal, type InterestAnalysis } from "./interestInference";
import { assessQuality } from "./qualityGuard";

export type RecommendationBreakdown = { interestMatch: number; interactionSignal: number; educationalValue: number; novelty: number; hypeRisk: number };
export type DynamicRecommendation = {
  currentReel: Reel | null; interestDetected: string; why: string; recommendedReel: Reel;
  category: Reel["category"]; whyRecommendation: string; difficulty: Reel["difficulty"]; confidence: number; matchScore: number; breakdown: RecommendationBreakdown;
};

const difficultyValue: Record<Reel["difficulty"], number> = { Beginner: 1, Intermediate: 2, Advanced: 3 };
const clamp = (value: number) => Math.round(Math.max(0, Math.min(100, value)));

function preferredDifficulty(reels: Reel[]) {
  const engaged = reels.filter((reel) => reelSignal(reel) > 35 && !reel.skipped);
  if (!engaged.length) return 2;
  return engaged.reduce((sum, reel) => sum + difficultyValue[reel.difficulty], 0) / engaged.length;
}

export function getRecommendations(reels: Reel[], analysis: InterestAnalysis = inferInterests(reels)): DynamicRecommendation[] {
  const positive = reels.filter((reel) => !reel.skipped && reelSignal(reel) > 28);
  const currentReel = [...reels].sort((a, b) => reelSignal(b) - reelSignal(a))[0] ?? null;
  const consumedTopics = new Set(positive.flatMap((reel) => reel.topics));
  const consumedConcepts = new Set(positive.flatMap(getReelConcepts));
  const interestLabels = new Set([analysis.primaryInterest, ...analysis.secondaryInterests]);
  const preferred = preferredDifficulty(reels);
  const candidates = reels.filter((reel) => reel.category === "technology" || reel.category === "career").filter((reel) => !reel.skipped && reel.id !== currentReel?.id && !assessQuality(reel).filtered);
  return candidates.map((reel) => {
    const concepts = getReelConcepts(reel);
    const interestMatch = clamp((concepts.filter((concept) => interestLabels.has(concept)).length / Math.max(1, concepts.length)) * 75 + concepts.reduce((sum, concept) => sum + (analysis.interestScores[concept] ?? 0), 0) / Math.max(1, concepts.length) * 0.25);
    const conceptualSimilarity = clamp((concepts.filter((concept) => consumedConcepts.has(concept)).length / Math.max(1, concepts.length)) * 100);
    const repeatedTopics = reel.topics.filter((topic) => consumedTopics.has(topic)).length / Math.max(1, reel.topics.length);
    // Adjacent concepts are useful; exact topic repetition is intentionally penalized.
    const novelty = clamp(82 - repeatedTopics * 58 + (conceptualSimilarity > 0 && repeatedTopics < 1 ? 10 : 0));
    const interactionSignal = clamp(Math.max(0, reelSignal(reel)));
    const educationalValue = reel.educationalValue;
    const difficultyFit = clamp(100 - Math.abs(difficultyValue[reel.difficulty] - preferred) * 32);
    const hypeRisk = reel.hypeScore;
    const score = clamp(interestMatch * 0.31 + conceptualSimilarity * 0.14 + interactionSignal * 0.09 + educationalValue * 0.2 + difficultyFit * 0.12 + novelty * 0.14 - hypeRisk * 0.18 - repeatedTopics * 18);
    const adjacent = concepts.find((concept) => consumedConcepts.has(concept) && !interestLabels.has(concept));
    const whyRecommendation = `${interestMatch >= 60 ? `It supports your ${analysis.primaryInterest} interest` : "It expands a related technical area"}${adjacent ? ` through ${adjacent}` : ""}, while adding a less-repeated topic with ${reel.educationalValue}% educational value.`;
    return { currentReel, interestDetected: analysis.primaryInterest, why: `Current engagement most strongly indicates ${analysis.primaryInterest}.`, recommendedReel: reel, category: reel.category, whyRecommendation, difficulty: reel.difficulty, confidence: analysis.confidence, matchScore: score, breakdown: { interestMatch, interactionSignal, educationalValue, novelty, hypeRisk } };
  }).sort((a, b) => b.matchScore - a.matchScore).reduce<DynamicRecommendation[]>((selected, recommendation) => {
    // Keep the feed varied: no more than two recommendations led by the same concept.
    const concept = getReelConcepts(recommendation.recommendedReel)[0] ?? recommendation.category;
    return selected.filter((item) => (getReelConcepts(item.recommendedReel)[0] ?? item.category) === concept).length >= 2 ? selected : [...selected, recommendation];
  }, []).slice(0, 5);
}

export function getNextSkills(analysis: InterestAnalysis, reels: Reel[]) {
  const candidates = reels.filter((reel) => reel.category === "technology").flatMap(getReelConcepts).filter((concept) => concept !== analysis.primaryInterest && concept !== "Technology" && concept !== "Data & AI");
  return [...new Set(candidates)].sort((a, b) => (analysis.interestScores[b] ?? 0) - (analysis.interestScores[a] ?? 0)).slice(0, 3);
}
