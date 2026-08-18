import { NavLink } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import { NAV_ITEMS } from "../nav";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-ink-900/60 px-4 py-6 backdrop-blur-xl lg:flex">
      <div className="flex items-center gap-2.5 px-2">
        <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent-400 to-signal-500 text-ink-950 shadow-glow">
          <BrainCircuit className="h-5 w-5" strokeWidth={2.4} />
        </div>
        <div className="leading-tight">
          <p className="font-display text-sm font-semibold text-white">ScrollSense</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            AI
          </p>
        </div>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          Navigate
        </p>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `nav-link ${isActive ? "nav-link-active" : ""}`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="h-[18px] w-[18px]" strokeWidth={2} />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute right-2 h-1.5 w-1.5 rounded-full bg-accent-400" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-white/10 bg-white/[0.02] p-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-lime-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
          </span>
          <p className="text-xs font-medium text-slate-300">Demo mode</p>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
          Static profile. No data leaves your browser.
        </p>
      </div>
    </aside>
  );
}
