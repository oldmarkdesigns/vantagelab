import Link from "next/link";
import Card from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">
        For iOS developers
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
        App Store Search Optimization, kept simple.
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-lg text-zinc-600">
        Learn the fundamentals of ASO, then let an AI assistant sharpen your
        keywords, titles, and metadata — no rank trackers, no ad platforms,
        just search optimization.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/guide">
          <Card className="h-full text-left transition-shadow hover:shadow-md">
            <h2 className="text-lg font-semibold text-zinc-900">
              Read the Guide
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Keyword research, metadata fields, localization, and the
              pitfalls that quietly waste your search ranking.
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-indigo-600">
              Start reading →
            </span>
          </Card>
        </Link>

        <Link href="/assistant">
          <Card className="h-full text-left transition-shadow hover:shadow-md">
            <h2 className="text-lg font-semibold text-zinc-900">
              Try the AI Assistant
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Generate a keyword field, draft title/subtitle options, or get
              a critique of your current App Store listing.
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-indigo-600">
              Open the assistant →
            </span>
          </Card>
        </Link>
      </div>
    </div>
  );
}
