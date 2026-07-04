"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import KeywordOptimizerForm from "./KeywordOptimizerForm";
import TitleSubtitleForm from "./TitleSubtitleForm";
import MetadataCritiqueForm from "./MetadataCritiqueForm";

const TABS = [
  { id: "keyword-optimizer", label: "Keyword Optimizer" },
  { id: "title-subtitle", label: "Title/Subtitle Generator" },
  { id: "metadata-critique", label: "Metadata Critique" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AssistantTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const requested = searchParams.get("tool");
  const activeTab: TabId = TABS.some((t) => t.id === requested)
    ? (requested as TabId)
    : "keyword-optimizer";

  function setTab(tab: TabId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tool", tab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-zinc-200 dark:border-zinc-800">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setTab(tab.id)}
            className={`whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-indigo-600 text-indigo-700 dark:border-indigo-400 dark:text-indigo-400"
                : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Every tab's form stays mounted (hidden via CSS, not unmounted) so
          each tool's inputs and results survive switching between tabs. */}
      <div className="mt-8">
        <div className={activeTab === "keyword-optimizer" ? "" : "hidden"}>
          <KeywordOptimizerForm />
        </div>
        <div className={activeTab === "title-subtitle" ? "" : "hidden"}>
          <TitleSubtitleForm />
        </div>
        <div className={activeTab === "metadata-critique" ? "" : "hidden"}>
          <MetadataCritiqueForm />
        </div>
      </div>
    </div>
  );
}
