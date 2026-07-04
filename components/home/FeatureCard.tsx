import Link from "next/link";
import { ReactNode } from "react";

interface FeatureCardProps {
  href: string;
  icon: ReactNode;
  iconGradient: string;
  glowColor: string;
  title: string;
  description: string;
  cta: string;
}

export default function FeatureCard({
  href,
  icon,
  iconGradient,
  glowColor,
  title,
  description,
  cta,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${glowColor}`}
      />

      <div className="relative">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${iconGradient}`}
        >
          {icon}
        </div>
        <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          {cta}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M5 12h14M13 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
