import Link from "next/link";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface Tier {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: { label: string; href?: string; disabled?: boolean };
  highlighted?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    description: "Try every tool before you commit.",
    features: [
      "Full access to the ASO Guide",
      "5 AI generations per day (all tools combined)",
      "Keyword Optimizer, Title/Subtitle Generator, Metadata Critique",
    ],
    cta: { label: "Start free", href: "/assistant" },
  },
  {
    name: "Pro",
    price: "$12",
    cadence: "/ month",
    description: "For developers actively shipping ASO updates.",
    features: [
      "Everything in Free",
      "Unlimited AI generations",
      "Priority response speed",
      "Early access to new tools",
    ],
    cta: { label: "Coming soon", disabled: true },
    highlighted: true,
  },
  {
    name: "Business",
    price: "$39",
    cadence: "/ month",
    description: "For teams managing ASO across multiple apps.",
    features: [
      "Everything in Pro",
      "Multiple team seats",
      "Manage unlimited apps under one workspace",
      "Priority support",
    ],
    cta: { label: "Coming soon", disabled: true },
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Simple pricing
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Start free, upgrade only if you outgrow it. No rank-tracking
          add-ons, no ad-spend markup — just the ASO tools.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col ${
              tier.highlighted
                ? "border-indigo-300 ring-1 ring-indigo-200 dark:border-indigo-500 dark:ring-indigo-500/30"
                : ""
            }`}
          >
            {tier.highlighted && (
              <span className="mb-3 inline-block w-fit rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
                Most popular
              </span>
            )}
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {tier.name}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {tier.description}
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
                {tier.price}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-500">
                {tier.cadence}
              </span>
            </div>

            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400"
                  >
                    <path
                      d="M4 10l4 4 8-8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {tier.cta.href ? (
              <Link href={tier.cta.href} className="mt-6">
                <Button variant={tier.highlighted ? "primary" : "secondary"} className="w-full">
                  {tier.cta.label}
                </Button>
              </Link>
            ) : (
              <Button
                variant={tier.highlighted ? "primary" : "secondary"}
                className="mt-6 w-full"
                disabled={tier.cta.disabled}
              >
                {tier.cta.label}
              </Button>
            )}
          </Card>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-zinc-500 dark:text-zinc-500">
        Pro and Business billing isn&apos;t wired up yet — this is a preview
        of the planned pricing model. The Free tier is fully functional
        today.
      </p>
    </div>
  );
}
