# ScrollSense AI

ScrollSense AI is a hackathon-ready, browser-based recommendation agent for making a student's short-form scrolling more useful. It analyzes the Reels a student watches, likes, saves, shares, or skips; infers broader technology interests; filters low-value hype; and recommends diverse, educational technology content.

## Problem it solves

Students spend significant time on short-form content. Instead of blocking scrolling, ScrollSense AI identifies the learning and career interests hidden in the student's existing behavior and redirects recommendations toward useful technology content.

The system does not rely on a single keyword. For example, engagement with Java, DSA, coding interviews, and developer content can indicate a broader Software Engineering or Computer Science interest, so it can recommend adjacent content such as System Design, Cloud, or DevOps instead of another generic Java Reel.

## Features

- 50 local fictional/anonymized Reels across technology, career, gaming, and entertainment
- Persistent interactions using browser `localStorage`
- Live tracking for watch depth, likes, saves, shares, and skips
- Concept-based interest inference for Programming, DSA, Computer Science, AI, Software Engineering, Cybersecurity, and more
- Dynamic confidence, evidence, and negative-signal analysis
- Quality Guard that filters sensational or low-value hype content
- Diversity Guard that reduces repetitive recommendations and encourages adjacent skills
- Technology-first recommendation ranking with score breakdowns
- Agent Decision card with the required recommendation output format
- Interest evolution, counterfactual confidence, next skills, and interest map views

## Recommendation output

The Recommendations page produces a live Agent Decision containing:

- Current Reel
- Interest Detected
- Why
- Recommended Tech Reel
- Category
- Why This Recommendation
- Difficulty
- Confidence

All values are calculated from the current interaction state.

## Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, typically `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

## Demo flow

1. Open **Reels**.
2. Select a few related Reels and adjust watch depth; use Like, Save, Share, or Skip.
3. Open **AI Analysis** and select **Analyze interests**.
4. Review the inferred primary interest, secondary interests, confidence, evidence, and negative signals.
5. Open **Recommendations** to view the live Agent Decision, quality filtering, score breakdown, and diverse next recommendations.

To demonstrate an AI/ML profile, strongly engage with AI, Machine Learning, and Generative AI Reels. To demonstrate a Software Engineering profile, engage with Java, DSA, coding interviews, Git/GitHub, Cloud, DevOps, and System Design Reels.

## Core architecture

- `src/context/InteractionContext.tsx` — central persisted interaction state
- `src/lib/interestInference.ts` — concept hierarchy and inferred-interest engine
- `src/lib/qualityGuard.ts` — low-value and hype content filtering
- `src/lib/recommendationEngine.ts` — diversified, technology-focused recommendation ranking
- `src/pages/AIAnalysis.tsx` — analysis dashboard
- `src/pages/Recommendations.tsx` — Agent Decision and ranked recommendations

## Privacy

This MVP uses only local TypeScript data and browser `localStorage`. No authentication, external API, or personal data collection is required.
