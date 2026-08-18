import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  icon: ReactNode;
  children?: ReactNode;
};

export default function PageShell({
  eyebrow,
  title,
  description,
  icon,
  children,
}: Props) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-center gap-2">
        <span className="chip border-accent-400/20 bg-accent-400/5 text-accent-200">
          {icon}
          {eyebrow}
        </span>
      </div>

      <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-400">
        {description}
      </p>

      <div className="mt-8">{children}</div>
    </div>
  );
}
