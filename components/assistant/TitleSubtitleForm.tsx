"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import TextField from "@/components/ui/TextField";
import TextArea from "@/components/ui/TextArea";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import CopyButton from "@/components/ui/CopyButton";
import CharCounter from "@/components/assistant/CharCounter";
import type { TitleSubtitleResponse } from "@/types/aso";

export default function TitleSubtitleForm() {
  const [appName, setAppName] = useState("");
  const [description, setDescription] = useState("");
  const [priorityKeywords, setPriorityKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TitleSubtitleResponse | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/title-subtitle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appName, description, priorityKeywords }),
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
          id="ts-name"
          label="App name / current title"
          required
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
        />
        <TextArea
          id="ts-desc"
          label="App description"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="ts-keywords"
          label="Priority keywords (optional)"
          hint="Comma-separated terms to try to work in"
          value={priorityKeywords}
          onChange={(e) => setPriorityKeywords(e.target.value)}
        />
        <Button type="submit" disabled={loading} className="mt-2 self-start">
          {loading && <LoadingSpinner />}
          {loading ? "Generating…" : "Generate Options"}
        </Button>
      </form>

      <div className="flex flex-col gap-4">
        {error && (
          <Card className="border-red-200 bg-red-50 text-sm text-red-700">
            {error}
          </Card>
        )}
        {result?.options.map((option, i) => (
          <Card key={i} className="flex flex-col gap-4">
            <div className="rounded-lg border border-zinc-200 p-3">
              <p className="text-xs text-zinc-400">App Store preview</p>
              <p className="mt-1 truncate text-sm font-semibold text-zinc-900">
                {option.title}
              </p>
              <p className="truncate text-xs text-zinc-500">
                {option.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">
                    Title
                  </span>
                  <CharCounter current={option.title.length} max={30} />
                </div>
                <p className="mt-0.5 truncate text-sm text-zinc-900">
                  {option.title}
                </p>
              </div>
              <CopyButton value={option.title} />
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">
                    Subtitle
                  </span>
                  <CharCounter current={option.subtitle.length} max={30} />
                </div>
                <p className="mt-0.5 truncate text-sm text-zinc-900">
                  {option.subtitle}
                </p>
              </div>
              <CopyButton value={option.subtitle} />
            </div>
          </Card>
        ))}
        {!error && !result && (
          <Card className="text-sm text-zinc-500">
            Fill in your app details and generate a few title/subtitle
            options, each within Apple&apos;s 30-character limits.
          </Card>
        )}
      </div>
    </div>
  );
}
