import { Play, Heart, Bookmark, Share2, Eye } from "lucide-react";
import type { Reel } from "../data/reels";

type Props = {
  reel: Reel;
  index: number;
  onOpen: (reel: Reel) => void;
};

function watchColor(watch: number): string {
  if (watch >= 80) return "bg-lime-400";
  if (watch >= 50) return "bg-accent-400";
  return "bg-amber-400";
}

export default function ReelCard({ reel, index, onOpen }: Props) {
  return (
    <button
      onClick={() => onOpen(reel)}
      className="animate-fade-up card group flex flex-col overflow-hidden text-left transition-all duration-300 hover:border-white/20 hover:bg-ink-800/80 hover:shadow-soft"
      style={{ animationDelay: `${0.04 * index}s` }}
    >
      {/* thumbnail strip */}
      <div className="relative h-24 overflow-hidden bg-gradient-to-br from-ink-700/50 via-ink-850 to-ink-900">
        <div className="absolute inset-0 bg-grid-faint [background-size:24px_24px] opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
            <Play className="h-5 w-5 fill-white" />
          </span>
        </div>
        {reel.skipped && (
          <span className="absolute right-2 top-2 chip border-amber-400/30 bg-amber-400/10 text-amber-300">
            Skipped
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
          <div
            className={`h-full ${watchColor(reel.watchPercentage)}`}
            style={{ width: `${reel.watchPercentage}%` }}
          />
        </div>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col p-4">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">
          {reel.title}
        </p>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-400">
          {reel.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {reel.topics.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
            <Eye className="h-3.5 w-3.5" />
            <span className="font-mono">{reel.watchPercentage}%</span>
          </span>
          <div className="flex items-center gap-2.5">
            <Icon active={reel.liked} label="Liked">
              <Heart className="h-3.5 w-3.5" />
            </Icon>
            <Icon active={reel.saved} label="Saved">
              <Bookmark className="h-3.5 w-3.5" />
            </Icon>
            <Icon active={reel.shared} label="Shared">
              <Share2 className="h-3.5 w-3.5" />
            </Icon>
          </div>
        </div>
      </div>
    </button>
  );
}

function Icon({
  active,
  label,
  children,
}: {
  active: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span
      title={label}
      className={`transition-colors ${
        active ? "text-accent-300" : "text-slate-600"
      }`}
    >
      {children}
    </span>
  );
}
