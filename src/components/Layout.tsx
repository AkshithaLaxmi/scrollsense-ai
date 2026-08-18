import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-ink-950 text-slate-200">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-faint [background-size:48px_48px] opacity-40" />
        <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[32rem] w-[32rem] rounded-full bg-signal-500/10 blur-[120px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-400/40 to-transparent" />
      </div>

      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 px-4 pb-28 pt-4 sm:px-6 lg:px-10 lg:pb-12 lg:pt-8">
            <Outlet />
          </main>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
