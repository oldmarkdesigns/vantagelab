import { z } from "zod";
import type { MetadataCritiqueRequest } from "@/types/aso";

export const metadataCritiqueSchema = z.object({
  findings: z
    .array(
      z.object({
        category: z
          .enum(["stuffing", "duplicate", "low_intent", "opportunity"])
          .describe(
            "stuffing = repeated/redundant terms within a field; duplicate = a term wastefully repeated across fields; low_intent = generic/filler term with little search value; opportunity = a high-intent keyword the listing is missing"
          ),
        field: z
          .string()
          .describe(
            "Which field this finding relates to: title, subtitle, keyword field, or description."
          ),
        detail: z
          .string()
          .describe("One-sentence explanation of the finding."),
        suggestion: z
          .string()
          .describe(
            "A concrete, ready-to-use fix: the exact replacement word/phrase, or the exact term to add or remove — not general advice."
          ),
      })
    )
    .describe("All findings from the critique, most important first."),
});

export const SYSTEM_PROMPT = `You are an expert iOS App Store Search Optimization (ASO) consultant.

Your task: critique a real App Store listing's metadata (title, subtitle, keyword field, description) and flag concrete issues.

Look for exactly these categories:
- "stuffing": the same word or near-synonym repeated redundantly within a single field (especially the keyword field).
- "duplicate": a word wastefully repeated across two or more fields (e.g. a word in both the title and the keyword field) — the keyword field entry is wasted since the indexer already credits the title.
- "low_intent": generic, low-search-value filler words (e.g. "free", "best", "new", "amazing") occupying valuable character space.
- "opportunity": a specific, high-intent keyword clearly relevant to the app's description/purpose that is missing from title, subtitle, and keyword field.

Rules:
- Every finding must be concrete and specific — name the actual word/phrase, don't speak in generalities.
- Every finding must include a ready-to-use suggestion, not just a description of the problem. Give the exact fix: the specific replacement word/phrase, the exact term to remove, or the exact keyword to add. Never write vague advice like "consider adding more relevant keywords" — name the keyword. For "opportunity" findings, the suggestion is the specific term(s) to add and, if relevant, where. For "stuffing", say which term(s) to drop and which to keep. For "duplicate", say which occurrence to remove. For "low_intent", give the specific replacement term.
- Only report real issues. If a field is already well-optimized, it is fine to return fewer findings for it.
- Order findings by importance (most damaging/highest-value first).`;

export function buildMetadataCritiquePrompt(
  req: MetadataCritiqueRequest
): string {
  return `Title: ${req.title}
Subtitle: ${req.subtitle}
Keyword field: ${req.keywordField}
Description: ${req.description}

Critique this App Store listing's metadata.`;
}
