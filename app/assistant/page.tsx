import { Suspense } from "react";
import AssistantTabs from "@/components/assistant/AssistantTabs";

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          AI Assistant
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-600">
          Three focused tools for App Store metadata — no ad platforms, no
          rank tracking, just keywords, titles, and a second opinion on your
          listing.
        </p>
      </div>

      <Suspense fallback={null}>
        <AssistantTabs />
      </Suspense>
    </div>
  );
}
