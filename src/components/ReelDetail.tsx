import { useEffect } from "react";
import {
  X,
  Eye,
  Heart,
  Bookmark,
  Share2,
  Play,
  SkipForward,
} from "lucide-react";
import type { Reel } from "../data/reels";
import { useInteractions } from "../context/InteractionContext";

type Props = {
  reel: Reel | null;
  onClose: () => void;
};

export default function ReelDetail({ reel, onClose }: Props) {
  const { toggle, setWatchPercentage } = useInteractions();
  useEffect(() => {
    if (!reel) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [reel, onClose]);

  if (!reel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="animate-fade-up relative z-10 max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-white/10 bg-ink-850 p-5 shadow-soft sm:rounded-2xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="chip border-accent-400/20 bg-accent-400/10 text-accent-200">
            Reel Detail
          </span>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 transition-colors hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* preview */}
        <div className="relative grid h-40 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-ink-700/50 via-ink-850 to-ink-900">
          <div className="absolute inset-0 bg-grid-faint [background-size:24px_24px] opacity-30" />
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md">
            <Play className="h-6 w-6 fill-white" />
          </span>
        </div>

        <h2 className="mt-4 font-display text-xl font-bold leading-snug text-white">
          {reel.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {reel.description}
        </p>

        {/* topics */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {reel.topics.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* watch */}
        <div className="mt-5">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Eye className="h-3.5 w-3.5" /> Watch depth
            </span>
            <span className="font-mono text-slate-200">{reel.watchPercentage}%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent-400 to-signal-400"
              style={{ width: `${reel.watchPercentage}%` }}
            />
          </div>
        </div>

        {/* engagement */}
        <input aria-label="Watch percentage" className="mt-2 w-full accent-cyan-400" type="range" min="0" max="100" value={reel.watchPercentage} onChange={(event) => setWatchPercentage(reel.id, Number(event.target.value))} />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat icon={<Heart className="h-4 w-4" />} label="Liked" active={reel.liked} onClick={() => toggle(reel.id, "liked")} />
          <Stat icon={<Bookmark className="h-4 w-4" />} label="Saved" active={reel.saved} onClick={() => toggle(reel.id, "saved")} />
          <Stat icon={<Share2 className="h-4 w-4" />} label="Shared" active={reel.shared} onClick={() => toggle(reel.id, "shared")} />
          <Stat
            icon={<SkipForward className="h-4 w-4" />}
            label="Skipped"
            active={!!reel.skipped}
            danger
            onClick={() => toggle(reel.id, "skipped")}
          />
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  active,
  danger,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  danger?: boolean;
  onClick: () => void;
}) {
  const color = active
    ? danger
      ? "text-amber-400 border-amber-400/30 bg-amber-400/10"
      : "text-accent-300 border-accent-400/30 bg-accent-400/10"
    : "text-slate-600 border-white/10 bg-white/[0.02]";

  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-colors ${color}`}>
      {icon}
      <span className="text-[11px] font-medium">{label}</span>
      <span className="text-[10px] uppercase tracking-wider opacity-70">
        {active ? "Yes" : "No"}
      </span>
    </button>
  );
}
