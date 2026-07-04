"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import TextField from "@/components/ui/TextField";
import TextArea from "@/components/ui/TextArea";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ClearIcon from "@/components/icons/ClearIcon";
import type {
  CritiqueCategory,
  MetadataCritiqueResponse,
} from "@/types/aso";

const CATEGORY_META: Record<
  CritiqueCategory,
  { label: string; badgeClass: string }
> = {
  stuffing: {
    label: "Keyword stuffing",
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  duplicate: {
    label: "Duplicate term",
    badgeClass: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  low_intent: {
    label: "Low intent",
    badgeClass: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  },
  opportunity: {
    label: "Opportunity",
    badgeClass: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
};

export default function MetadataCritiqueForm() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [keywordField, setKeywordField] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MetadataCritiqueResponse | null>(null);

  const hasInput = [title, subtitle, keywordField, description].some(
    (value) => value.trim().length > 0
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/metadata-critique", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, subtitle, keywordField, description }),
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

  function handleClear() {
    setTitle("");
    setSubtitle("");
    setKeywordField("");
    setDescription("");
    setError(null);
    setResult(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          id="mc-title"
          label="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="mc-subtitle"
          label="Subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
        <TextField
          id="mc-keywords"
          label="Keyword field"
          hint="The hidden 100-character keyword field, comma-separated"
          value={keywordField}
          onChange={(e) => setKeywordField(e.target.value)}
        />
        <TextArea
          id="mc-desc"
          label="Description"
          required
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="mt-2 flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading && <LoadingSpinner />}
            {loading ? "Analyzing…" : "Critique Listing"}
          </Button>
          {hasInput && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleClear}
              disabled={loading}
            >
              Clear input
              <ClearIcon />
            </Button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {error && (
          <Card className="border-red-200 bg-red-50 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </Card>
        )}
        {result?.findings.map((finding, i) => (
          <Card key={i} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_META[finding.category].badgeClass}`}
              >
                {CATEGORY_META[finding.category].label}
              </span>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                {finding.field}
              </span>
            </div>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{finding.detail}</p>
            <div className="flex items-start gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-2 text-sm text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              <svg viewBox="0 0 24 24" fill="none" className="mt-0.5 h-3.5 w-3.5 shrink-0">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path
                  d="M8.5 12.5l2.5 2.5 4.5-5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                <span className="font-medium">Suggestion: </span>
                {finding.suggestion}
              </span>
            </div>
          </Card>
        ))}
        {result && result.findings.length === 0 && (
          <Card className="text-sm text-zinc-500 dark:text-zinc-500">
            No significant issues found — this listing looks well
            optimized.
          </Card>
        )}
        {!error && !result && (
          <Card className="text-sm text-zinc-500 dark:text-zinc-500">
            Paste your current App Store listing to get a categorized
            critique: stuffing, duplicate terms, low-intent words, and
            missed keyword opportunities.
          </Card>
        )}
      </div>
    </div>
  );
}
