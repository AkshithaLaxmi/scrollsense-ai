import { useState } from "react";
import { Clapperboard } from "lucide-react";
import PageShell from "../components/PageShell";
import ReelCard from "../components/ReelCard";
import ReelDetail from "../components/ReelDetail";
import type { Reel } from "../data/reels";
import { useInteractions } from "../context/InteractionContext";

export default function Reels() {
  const [selected, setSelected] = useState<Reel | null>(null);
  const { reels } = useInteractions();
  const currentSelected = selected ? reels.find((reel) => reel.id === selected.id) ?? null : null;

  return (
    <PageShell
      eyebrow="Feed"
      title="Reels"
      description="The raw scroll. Every reel here is scored for technology signal before it reaches your recommendations. Tap any reel to inspect its engagement."
      icon={<Clapperboard className="h-3.5 w-3.5" />}
    >
      <div className="mb-4 flex items-center gap-2 px-1">
        <span className="text-xs font-medium text-slate-500">
          {reels.length} reels analyzed
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reels.map((reel, i) => (
          <ReelCard
            key={reel.id}
            reel={reel}
            index={i}
            onOpen={setSelected}
          />
        ))}
      </div>

      <ReelDetail reel={currentSelected} onClose={() => setSelected(null)} />
    </PageShell>
  );
}
