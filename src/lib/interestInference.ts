import type { Reel } from "../data/reels";

export type InterestAnalysis = {
  primaryInterest: string;
  secondaryInterests: string[];
  interestScores: Record<string, number>;
  confidence: number;
  confidenceLevel: "Low" | "Medium" | "High";
  evidence: string[];
  negativeSignals: string[];
};

type Concept = { label: string; members: string[]; parents?: string[] };

// Topics contribute to their direct concept and, with a smaller weight, to related parent concepts.
const CONCEPTS: Concept[] = [
  { label: "Programming", members: ["Java", "Python", "C++", "JavaScript", "React", "Web Development", "Programming", "Developer Content"], parents: ["Software Engineering"] },
  { label: "DSA / Problem Solving", members: ["DSA", "Algorithms", "Data Structures", "Coding Interviews", "Competitive Programming"], parents: ["Computer Science", "Software Engineering"] },
  { label: "Computer Science Foundations", members: ["DBMS", "Operating Systems", "Computer Networks", "Computer Architecture", "Computer Science"], parents: ["Computer Science"] },
  { label: "Artificial Intelligence", members: ["AI", "Artificial Intelligence", "Machine Learning", "Generative AI"], parents: ["Data & AI"] },
  { label: "Software Engineering", members: ["Software Engineering", "Git/GitHub", "DevOps", "Cloud", "System Design/HLD", "Developer Practices", "Career"], parents: ["Technology"] },
  { label: "Cybersecurity", members: ["Network Security", "Web Security", "Ethical Hacking", "Cybersecurity"], parents: ["Technology"] },
  { label: "Data Science", members: ["Data Science"], parents: ["Data & AI"] },
  { label: "Gaming", members: ["Gaming", "Esports", "Speedrun", "Hardware"] },
  { label: "Comedy & Entertainment", members: ["Comedy", "Entertainment", "General Entertainment", "Programming Humor"] },
  { label: "Computer Science", members: [], parents: ["Technology"] },
  { label: "Data & AI", members: [], parents: ["Technology"] },
  { label: "Technology", members: [] },
];

const DIRECT_CONCEPTS = CONCEPTS.filter((concept) => concept.members.length > 0);
const byLabel = new Map(CONCEPTS.map((concept) => [concept.label, concept]));

export function reelSignal(reel: Reel) {
  const completion = (reel.watchPercentage / 100) * 36;
  const actions = (reel.liked ? 15 : 0) + (reel.saved ? 22 : 0) + (reel.shared ? 17 : 0);
  // Educational value amplifies an observed interaction; it must not create interest on an unseen reel.
  const interactionStrength = Math.min(1, reel.watchPercentage / 100 + (reel.liked ? 0.18 : 0) + (reel.saved ? 0.25 : 0) + (reel.shared ? 0.15 : 0));
  const learningFit = reel.educationalValue * 0.22 * interactionStrength;
  const skip = reel.skipped ? -45 : 0;
  return completion + actions + learningFit + skip;
}

export function getReelConcepts(reel: Reel) {
  const labels = new Set<string>();
  for (const concept of DIRECT_CONCEPTS) {
    if (concept.members.some((member) => reel.topics.includes(member))) labels.add(concept.label);
  }
  // Category is context: it gives a reel without a precise topic a meaningful conceptual home.
  if (reel.category === "gaming") labels.add("Gaming");
  if (reel.category === "entertainment") labels.add("Comedy & Entertainment");
  return [...labels];
}

function addWithParents(scores: Map<string, number>, label: string, value: number) {
  scores.set(label, (scores.get(label) ?? 0) + value);
  for (const parent of byLabel.get(label)?.parents ?? []) addWithParents(scores, parent, value * 0.42);
}
function relatedLabels(label: string): string[] {
  return [label, ...(byLabel.get(label)?.parents ?? []).flatMap(relatedLabels)];
}

export function inferInterests(reels: Reel[]): InterestAnalysis {
  const totals = new Map<string, number>();
  const support = new Map<string, Reel[]>();
  const negatives = new Map<string, Reel[]>();
  for (const reel of reels) {
    const concepts = getReelConcepts(reel);
    if (!concepts.length) continue;
    const signal = reelSignal(reel) / concepts.length;
    for (const concept of concepts) {
      addWithParents(totals, concept, signal);
      const bucket = reel.skipped || reel.watchPercentage < 35 ? negatives : support;
      for (const related of relatedLabels(concept)) bucket.set(related, [...(bucket.get(related) ?? []), reel]);
    }
  }
  const maxRaw = Math.max(1, ...totals.values());
  const ranked = [...totals.entries()].filter(([label]) => label !== "Technology" && label !== "Data & AI").map(([label, raw]) => ({ label, raw, score: Math.max(0, Math.min(99, Math.round(raw / maxRaw * 99))) })).sort((a, b) => b.score - a.score);
  const primary = ranked[0] ?? { label: "Undetermined", score: 0, raw: 0 };
  const secondary = ranked.filter((item) => item.label !== primary.label && item.score >= Math.max(18, primary.score * 0.5)).slice(0, 3);
  const relevant = reels.filter((reel) => reel.liked || reel.saved || reel.shared || reel.watchPercentage >= 70 || reel.skipped);
  const positive = relevant.filter((reel) => reelSignal(reel) > 25).length;
  const primarySupport = support.get(primary.label) ?? [];
  const relatedCoverage = new Set(primarySupport.flatMap(getReelConcepts)).size;
  const confidence = Math.min(98, Math.round(18 + positive * 2.4 + primarySupport.length * 3 + relatedCoverage * 7 + Math.min(20, primary.score * 0.18)));
  const confidenceLevel = confidence >= 72 ? "High" : confidence >= 48 ? "Medium" : "Low";
  const evidenceTopics = [...new Set(primarySupport.flatMap((reel) => reel.topics))].slice(0, 4);
  const evidence = primarySupport.length
    ? [`${primarySupport.length} high-intent interactions connect to ${evidenceTopics.join(", ")}.`, `Strong watch completion, saves, and shares lift ${primary.label} above isolated topic matches.`, `Related concepts are aggregated through the concept hierarchy rather than scored as separate keywords.`]
    : ["There is not yet enough positive engagement to establish a reliable interest."];
  const negativeSignals = [...negatives.entries()].filter(([, items]) => items.length >= 2).sort((a, b) => b[1].length - a[1].length).slice(0, 3).map(([label, items]) => `${label} content has ${items.length} low-completion or skipped reels, reducing its inferred weight.`);
  return { primaryInterest: primary.label, secondaryInterests: secondary.map((item) => item.label), interestScores: Object.fromEntries(ranked.slice(0, 8).map((item) => [item.label, item.score])), confidence, confidenceLevel, evidence, negativeSignals: negativeSignals.length ? negativeSignals : ["No repeated negative pattern is currently strong enough to suppress an interest."] };
}
