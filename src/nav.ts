import {
  Home,
  Clapperboard,
  ScanSearch,
  Sparkles,
  Network,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
  short: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/", icon: Home, short: "Home" },
  { label: "Reels", to: "/reels", icon: Clapperboard, short: "Reels" },
  { label: "AI Analysis", to: "/analysis", icon: ScanSearch, short: "Analyze" },
  { label: "Recommendations", to: "/recommendations", icon: Sparkles, short: "For You" },
  { label: "Interest Map", to: "/interest-map", icon: Network, short: "Map" },
];
