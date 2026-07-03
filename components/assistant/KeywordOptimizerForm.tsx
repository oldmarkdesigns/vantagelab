"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import TextField from "@/components/ui/TextField";
import TextArea from "@/components/ui/TextArea";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import CopyButton from "@/components/ui/CopyButton";
import CharCounter from "@/components/assistant/CharCounter";
import type { KeywordOptimizerResponse } from "@/types/aso";

export default function KeywordOptimizerForm() {
  const [appName, setAppName] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<KeywordOptimizerResponse | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/keyword-optimizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName, description, title, subtitle }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setResult(data);
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          id="ko-name"
          label="App name"
          required
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
        />
        <TextArea
          id="ko-desc"
          label="App description"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="ko-title"
          label="Title (optional)"
          hint="Used to avoid duplicating keywords already covered"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="ko-subtitle"
          label="Subtitle (optional)"
          hint="Used to avoid duplicating keywords already covered"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <Button type="submit" disabled={loading} className="mt-2 self-start">
          {loading && <LoadingSpinner />}
          {loading ? "Optimizing…" : "Optimize Keywords"}
        </Button>
      </form>

      <div>
        {error && (
          <Card className="border-red-200 bg-red-50 text-sm text-red-700">
            {error}
          </Card>
        )}
        {result && (
          <Card className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">
                Keyword field
              </h3>
              <CharCounter current={result.charCount} max={100} />
            </div>
            <p className="rounded-lg bg-zinc-50 p-3 font-mono text-sm text-zinc-900">
              {result.keywordString}
            </p>
            <CopyButton value={result.keywordString} />
            {result.excludedDuplicates.length > 0 && (
              <div className="border-t border-zinc-200 pt-3 text-xs text-zinc-500">
                Excluded as duplicates of title/subtitle:{" "}
                {result.excludedDuplicates.join(", ")}
              </div>
            )}
          </Card>
        )}
        {!error && !result && (
          <Card className="text-sm text-zinc-500">
            Fill in your app details and generate a keyword field optimized
            for Apple&apos;s 100-character limit.
          </Card>
        )}
      </div>
    </div>
  );
}
