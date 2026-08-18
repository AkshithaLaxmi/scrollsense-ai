import { Network } from "lucide-react";
import PageShell from "../components/PageShell";
import { useInteractions } from "../context/InteractionContext";
import { rankedTopics } from "../lib/recommendations";

export const NODES = [
  { label: "Edge AI", x: "20%", y: "30%", size: "h-20 w-20", color: "from-accent-400/40 to-accent-400/5", text: "text-accent-200" },
  { label: "ML", x: "55%", y: "22%", size: "h-24 w-24", color: "from-signal-400/40 to-signal-400/5", text: "text-slate-200" },
  { label: "DevOps", x: "72%", y: "62%", size: "h-20 w-20", color: "from-lime-400/40 to-lime-400/5", text: "text-lime-300" },
  { label: "Web3", x: "32%", y: "70%", size: "h-16 w-16", color: "from-amber-400/40 to-amber-400/5", text: "text-amber-300" },
];

export default function InterestMap() {
  const { reels } = useInteractions();
  const positions = [["20%", "30%"], ["55%", "22%"], ["72%", "62%"], ["32%", "70%"], ["82%", "35%"], ["48%", "82%"]];
  const nodes = rankedTopics(reels).slice(0, 6).map((item, index) => ({ label: item.topic, x: positions[index][0], y: positions[index][1], size: item.score > 70 ? "h-24 w-24" : item.score > 50 ? "h-20 w-20" : "h-16 w-16", color: ["from-accent-400/40 to-accent-400/5", "from-signal-400/40 to-signal-400/5", "from-lime-400/40 to-lime-400/5", "from-amber-400/40 to-amber-400/5"][index % 4], text: "text-slate-200" }));
  return (
    <PageShell
      eyebrow="Topology"
      title="Interest Map"
      description="A live topology of how your detected interests connect. Node size reflects weight; proximity reflects co-occurrence in your feed."
      icon={<Network className="h-3.5 w-3.5" />}
    >
      <div className="card relative h-[28rem] overflow-hidden sm:h-[34rem]">
        <div className="absolute inset-0 bg-grid-faint [background-size:32px_32px] opacity-30" />

        {/* connection lines */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(34,211,238,0.4)" />
              <stop offset="100%" stopColor="rgba(129,140,248,0.1)" />
            </linearGradient>
          </defs>
          <line x1="20%" y1="30%" x2="55%" y2="22%" stroke="url(#line)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="55%" y1="22%" x2="72%" y2="62%" stroke="url(#line)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="72%" y1="62%" x2="32%" y2="70%" stroke="url(#line)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="32%" y1="70%" x2="20%" y2="30%" stroke="url(#line)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="20%" y1="30%" x2="72%" y2="62%" stroke="url(#line)" strokeWidth="1" strokeDasharray="2 6" opacity="0.5" />
        </svg>

        {nodes.map((n) => (
          <div
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-float"
            style={{ left: n.x, top: n.y }}
          >
            <div
              className={`grid place-items-center rounded-full bg-gradient-to-br ${n.color} ${n.size} border border-white/10 backdrop-blur-md`}
            >
              <span className={`text-xs font-semibold ${n.text}`}>{n.label}</span>
            </div>
          </div>
        ))}

        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-[11px] text-slate-500">
          <span className="h-2 w-2 rounded-full bg-accent-400" /> weight
          <span className="ml-3 h-2 w-2 rounded-full bg-signal-400" /> co-occurrence
        </div>
      </div>
    </PageShell>
  );
}
