import GuideSidebar, { GuideNavItem } from "@/components/guide/GuideSidebar";
import GuideSection from "@/components/guide/GuideSection";

const sections: GuideNavItem[] = [
  { id: "keyword-research", label: "Keyword Research Basics" },
  { id: "metadata-fields", label: "Metadata Fields" },
  { id: "visuals", label: "Icon, Screenshots & Preview Video" },
  { id: "ratings-reviews", label: "Ratings & Reviews Impact" },
  { id: "localization", label: "Localization Strategy" },
  { id: "update-cadence", label: "Update Cadence & Ranking" },
  { id: "competitor-analysis", label: "Competitor Analysis Method" },
  { id: "common-pitfalls", label: "Common Pitfalls" },
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          The ASO Guide
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
          The fundamentals of iOS App Store Search Optimization — what
          actually moves your ranking, and what wastes your character
          budget.
        </p>
      </div>

      <div className="flex items-start gap-12">
        <GuideSidebar items={sections} />

        <div className="min-w-0 flex-1">
          <GuideSection id="keyword-research" title="Keyword Research Basics">
            <p>
              Apple&apos;s Search index ranks apps primarily against three
              fields: the <strong>app title</strong> (30 characters), the{" "}
              <strong>subtitle</strong> (30 characters), and the hidden{" "}
              <strong>keyword field</strong> (100 characters, comma-separated,
              never shown to users). Title carries the most ranking weight,
              subtitle second, keyword field third — but the keyword field is
              where you fit terms that don&apos;t fit naturally in the visible
              copy.
            </p>
            <p>
              The keyword field doesn&apos;t need spaces after commas, doesn&apos;t
              need repeated words already in your title/subtitle (indexing
              already combines them), and is case-insensitive. Every
              character you spend on a word already covered elsewhere is a
              wasted character.
            </p>
          </GuideSection>

          <GuideSection id="metadata-fields" title="Metadata Fields">
            <p>
              <strong>Title</strong> — your app name plus, optionally, a
              short high-value keyword phrase. Highest ranking weight of any
              field.
            </p>
            <p>
              <strong>Subtitle</strong> — a second high-weight field. Best
              used for a value proposition that also carries keywords users
              search for.
            </p>
            <p>
              <strong>Keyword field</strong> — 100 characters of pure search
              terms, invisible to users, only read by the indexer.
            </p>
            <p>
              <strong>Promotional text</strong> — 170 characters, visible on
              your listing, editable anytime without a new build. Has no
              ranking weight, but is prime real estate for seasonal messaging
              or calls to action.
            </p>
            <p>
              <strong>In-app purchase display names</strong> — each IAP name
              is separately indexed and can surface your app for searches
              your main metadata doesn&apos;t cover.
            </p>
          </GuideSection>

          <GuideSection id="visuals" title="Icon, Screenshots & Preview Video">
            <p>
              None of these affect search ranking directly, but they
              determine your <strong>conversion rate</strong> once a user
              sees you in results — and conversion rate is itself a ranking
              signal over time.
            </p>
            <p>
              Icon should be legible at the smallest size it appears (search
              results, ~60px). Avoid text in the icon. First 2-3 screenshots
              matter most — most users don&apos;t scroll further. Lead with
              the core value proposition, not a splash/login screen. Preview
              videos autoplay muted in search results on iOS; the first 3
              seconds need to communicate value without sound.
            </p>
          </GuideSection>

          <GuideSection id="ratings-reviews" title="Ratings & Reviews Impact">
            <p>
              Rating volume and recency are ranking signals — a high average
              with very few or stale reviews carries less weight than a
              strong average with steady, recent volume. Prompt for reviews
              after a positive moment in your app&apos;s flow (via{" "}
              <code>SKStoreReviewController</code>), not immediately on
              launch.
            </p>
            <p>
              Responding to reviews doesn&apos;t directly affect ranking, but
              it affects conversion — visible responses to negative reviews
              reduce their impact on a browsing user&apos;s decision.
            </p>
          </GuideSection>

          <GuideSection id="localization" title="Localization Strategy">
            <p>
              Each App Store locale has its <strong>own independent
              keyword field, title, and subtitle</strong> — localizing isn&apos;t
              just translating your existing copy, it&apos;s separate keyword
              research per market. A literal translation often misses the
              actual terms people search for in that language/region.
            </p>
            <p>
              Prioritize localization by where your install/revenue volume
              already concentrates, or where you see organic traffic in a
              locale you haven&apos;t optimized yet — that&apos;s a signal of
              demand you&apos;re currently leaving on the table.
            </p>
          </GuideSection>

          <GuideSection id="update-cadence" title="Update Cadence & Ranking">
            <p>
              Regular updates are a (minor) freshness signal, and the
              &quot;What&apos;s New&quot; text is an opportunity to reinforce
              keywords and build user trust — but don&apos;t bump the version
              number purely for ASO; ship updates when there&apos;s a real
              reason, and use the changelog text well when you do.
            </p>
          </GuideSection>

          <GuideSection id="competitor-analysis" title="Competitor Analysis Method">
            <p>
              Identify 3-5 real competitors — apps that rank for the terms
              you want, not just apps that seem similar. For each: read
              their title/subtitle for the keywords they&apos;re explicitly
              targeting, note their category rank and rough review count,
              and check which of your target keywords they don&apos;t
              cover — that&apos;s your gap.
            </p>
            <p>
              There&apos;s no free official API for competitor keyword field
              contents or search volume; this analysis is manual (reading
              their public listing) or requires a paid third-party ASO data
              tool if you want it automated.
            </p>
          </GuideSection>

          <GuideSection id="common-pitfalls" title="Common Pitfalls">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Keyword stuffing</strong> — repeating the same word
                or near-synonyms across the keyword field wastes characters;
                the indexer doesn&apos;t rank you higher for redundancy.
              </li>
              <li>
                <strong>Duplicating title/subtitle words in the keyword
                field</strong> — those words are already indexed; re-using
                the character budget on them is pure waste.
              </li>
              <li>
                <strong>Irrelevant broad terms</strong> — chasing
                high-volume but low-relevance keywords (e.g. &quot;free&quot;,
                &quot;best&quot;) tanks your conversion rate even if it
                nudges impressions, which hurts ranking over time.
              </li>
              <li>
                <strong>Ignoring locale-specific keyword fields</strong> —
                shipping the same keyword field across every locale instead
                of researching each market separately.
              </li>
            </ul>
          </GuideSection>

          <GuideSection id="apple-resources" title="Apple's Official Resources">
            <p>
              This guide covers the practical fundamentals, but Apple
              publishes its own documentation on search, product pages, and
              review policy — worth reading directly for anything
              guideline-sensitive or subject to change.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <a
                  href="https://developer.apple.com/app-store/search/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  App Store Search
                </a>{" "}
                — Apple&apos;s own overview of how search ranking works and
                how to write effective metadata.
              </li>
              <li>
                <a
                  href="https://developer.apple.com/app-store/product-page/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  App Store Product Page
                </a>{" "}
                — guidelines for icons, screenshots, previews, and the rest
                of your listing.
              </li>
              <li>
                <a
                  href="https://developer.apple.com/app-store/review/guidelines/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  App Store Review Guidelines
                </a>{" "}
                — the rules your app and its metadata must follow to be
                approved.
              </li>
              <li>
                <a
                  href="https://help.apple.com/app-store-connect/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  App Store Connect Help
                </a>{" "}
                — reference docs for where to actually edit each metadata
                field covered in this guide.
              </li>
            </ul>
          </GuideSection>
        </div>
      </div>
    </div>
  );
}
