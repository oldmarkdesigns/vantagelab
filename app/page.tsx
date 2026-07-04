import FeatureCard from "@/components/home/FeatureCard";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
        For iOS developers
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
        App Store Search Optimization, kept simple.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
        Learn the fundamentals of ASO, then let an AI assistant sharpen your
        keywords, titles, and metadata — no rank trackers, no ad platforms,
        just search optimization.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <FeatureCard
          href="/guide"
          iconGradient="bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-indigo-500/30"
          glowColor="bg-indigo-400/25 dark:bg-indigo-500/20"
          title="Read the Guide"
          description="Keyword research, metadata fields, localization, and the pitfalls that quietly waste your search ranking."
          cta="Start reading"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        />

        <FeatureCard
          href="/assistant"
          iconGradient="bg-gradient-to-br from-fuchsia-400 to-violet-600 shadow-violet-500/30"
          glowColor="bg-fuchsia-400/25 dark:bg-violet-500/20"
          title="Try the AI Assistant"
          description="Generate a keyword field, draft title/subtitle options, or get a critique of your current App Store listing."
          cta="Open the assistant"
          icon={
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"
                fill="currentColor"
              />
              <path
                d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"
                fill="currentColor"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
}
