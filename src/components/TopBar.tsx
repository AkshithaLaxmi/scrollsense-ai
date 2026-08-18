import { useLocation } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import { NAV_ITEMS } from "../nav";

export default function TopBar() {
  const { pathname } = useLocation();
  const current = NAV_ITEMS.find((i) => i.to === pathname) ?? NAV_ITEMS[0];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-ink-950/70 px-4 py-3 backdrop-blur-xl sm:px-6 lg:hidden">
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-signal-500 text-ink-950">
          <BrainCircuit className="h-4 w-4" strokeWidth={2.4} />
        </div>
        <span className="font-display text-sm font-semibold text-white">
          ScrollSense AI
        </span>
      </div>
      <span className="text-xs font-medium text-slate-400">{current.label}</span>
    </header>
  );
}
