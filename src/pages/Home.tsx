import { useNavigate } from "react-router-dom";
import {
  Play,
  ArrowRight,
  Tags,
  Gauge,
  Filter,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useInteractions } from "../context/InteractionContext";
import { analysisSummary } from "../lib/recommendations";
import { inferInterests } from "../lib/interestInference";
import { qualityGuard } from "../lib/qualityGuard";

type Stat = {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
  accent: string;
  ring: string;
  delay: string;
};

export const STATS: Stat[] = [
  {
    label: "Interests Detected",
    value: "4",
    sub: "ML, Web3, DevOps, Edge AI",
    icon: Tags,
    accent: "text-accent-300",
    ring: "from-accent-400/30 to-accent-400/0",
    delay: "0.1s",
  },
  {
    label: "Recommendation Confidence",
    value: "92%",
    sub: "High signal · low noise",
    icon: Gauge,
    accent: "text-lime-400",
    ring: "from-lime-400/30 to-lime-400/0",
    delay: "0.2s",
  },
  {
    label: "Hype Content Filtered",
    value: "1",
    sub: "Influencer fluff removed",
    icon: Filter,
    accent: "text-amber-400",
    ring: "from-amber-400/30 to-amber-400/0",
    delay: "0.3s",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { reels } = useInteractions();
  const summary = analysisSummary(reels);
  const analysis = inferInterests(reels);
  const filtered = qualityGuard(reels).filter((decision) => decision.filtered).length;
  const stats: Stat[] = [
    { label: "Interests Detected", value: String(Object.keys(analysis.interestScores).length), sub: analysis.secondaryInterests.join(", ") || "Building evidence", icon: Tags, accent: "text-accent-300", ring: "from-accent-400/30 to-accent-400/0", delay: "0.1s" },
    { label: "Recommendation Confidence", value: `${summary.confidence}%`, sub: summary.confidence >= 70 ? "High signal · low noise" : "Learning your preferences", icon: Gauge, accent: "text-lime-400", ring: "from-lime-400/30 to-lime-400/0", delay: "0.2s" },
    { label: "Hype Content Filtered", value: String(filtered), sub: "Quality Guard demotions", icon: Filter, accent: "text-amber-400", ring: "from-amber-400/30 to-amber-400/0", delay: "0.3s" },
    { label: "Strongest Interest", value: analysis.primaryInterest, sub: "Current concept profile", icon: Sparkles, accent: "text-signal-300", ring: "from-signal-400/30 to-signal-400/0", delay: "0.4s" },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      {/* profile label */}
      <div className="animate-fade-up flex justify-center lg:justify-start">
        <span className="chip border-accent-400/20 bg-accent-400/5 text-accent-200">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent-400" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
          </span>
          Demo Student Profile
        </span>
      </div>

      {/* hero */}
      <section className="mt-6 text-center lg:mt-10 lg:text-left">
        <h1 className="animate-fade-up font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
          ScrollSense
          <br className="hidden sm:block" />{" "}
          <span className="bg-gradient-to-r from-accent-300 via-accent-400 to-signal-400 bg-clip-text text-transparent">
            AI
          </span>
        </h1>

        <p
          className="animate-fade-up mt-5 text-lg font-medium text-slate-300 sm:text-xl"
          style={{ animationDelay: "0.08s" }}
        >
          Your scroll history says more about you than you think.
        </p>

        <p
          className="animate-fade-up mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400 lg:mx-0"
          style={{ animationDelay: "0.14s" }}
        >
          AI analyzes what you watch, like and save to uncover the technology
          interests hiding underneath your feed.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
          style={{ animationDelay: "0.2s" }}
        >
          <button
            onClick={() => navigate("/analysis", { state: { runDemo: true } })}
            className="btn-primary group w-full sm:w-auto"
          >
            <Play className="h-4 w-4 fill-ink-950" />
            Run Demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => navigate("/reels")}
            className="btn-secondary w-full sm:w-auto"
          >
            <Sparkles className="h-4 w-4 text-accent-300" />
            Explore Reels
          </button>
        </div>
      </section>

      {/* summary cards */}
      <section className="mt-12 lg:mt-16">
        <div className="mb-4 flex items-center gap-2 px-1">
          <TrendingUp className="h-4 w-4 text-slate-500" />
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Profile Snapshot
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="animate-fade-up card group relative overflow-hidden p-5 transition-all duration-300 hover:border-white/20 hover:bg-ink-800/80"
              style={{ animationDelay: s.delay }}
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.ring} blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative flex items-start justify-between">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] ${s.accent}`}
                >
                  <s.icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider text-slate-600">
                  live
                </span>
              </div>

              <p
                className={`relative mt-5 font-display text-4xl font-bold ${s.accent}`}
              >
                {s.value}
              </p>
              <p className="relative mt-1 text-sm font-medium text-slate-200">
                {s.label}
              </p>
              <p className="relative mt-0.5 text-xs text-slate-500">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* how it works strip */}
      <section
        className="animate-fade-up mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3"
        style={{ animationDelay: "0.35s" }}
      >
        {[
          { n: "01", t: "Watch", d: "Your reels get scored in real time" },
          { n: "02", t: "Decode", d: "Interests surface from engagement signals" },
          { n: "03", t: "Recommend", d: "Hype filtered, signal amplified" },
        ].map((step) => (
          <div
            key={step.n}
            className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.015] p-4"
          >
            <span className="font-mono text-xs text-accent-400/70">{step.n}</span>
            <div>
              <p className="text-sm font-semibold text-slate-200">{step.t}</p>
              <p className="mt-0.5 text-xs text-slate-500">{step.d}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
