import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../nav";

export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <div className="glass mx-auto flex max-w-md items-center justify-around rounded-t-2xl border-b-0 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-soft">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium transition-colors ${
                isActive ? "text-accent-300" : "text-slate-500"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative">
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-400" />
                  )}
                </span>
                <span className="truncate">{item.short}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
