"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import TextField from "@/components/ui/TextField";
import TextArea from "@/components/ui/TextArea";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import type {
  CritiqueCategory,
  MetadataCritiqueResponse,
} from "@/types/aso";

const CATEGORY_META: Record<
  CritiqueCategory,
  { label: string; badgeClass: string }
> = {
  stuffing: { label: "Keyword stuffing", badgeClass: "bg-red-100 text-red-700" },
  duplicate: { label: "Duplicate term", badgeClass: "bg-red-100 text-red-700" },
  low_intent: {
    label: "Low intent",
    badgeClass: "bg-amber-100 text-amber-700",
  },
  opportunity: {
    label: "Opportunity",
    badgeClass: "bg-blue-100 text-blue-700",
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
        <Button type="submit" disabled={loading} className="mt-2 self-start">
          {loading && <LoadingSpinner />}
          {loading ? "Analyzing…" : "Critique Listing"}
        </Button>
      </form>

      <div className="flex flex-col gap-3">
        {error && (
          <Card className="border-red-200 bg-red-50 text-sm text-red-700">
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
              <span className="text-xs font-medium text-zinc-500">
                {finding.field}
              </span>
            </div>
            <p className="text-sm text-zinc-700">{finding.detail}</p>
          </Card>
        ))}
        {result && result.findings.length === 0 && (
          <Card className="text-sm text-zinc-500">
            No significant issues found — this listing looks well
            optimized.
          </Card>
        )}
        {!error && !result && (
          <Card className="text-sm text-zinc-500">
            Paste your current App Store listing to get a categorized
            critique: stuffing, duplicate terms, low-intent words, and
            missed keyword opportunities.
          </Card>
        )}
      </div>
    </div>
  );
}
