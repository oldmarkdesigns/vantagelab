import { z } from "zod";
import type { KeywordOptimizerRequest } from "@/types/aso";

export const keywordOptimizerSchema = z.object({
  keywordString: z
    .string()
    .describe(
      "The full ASO keyword field content: comma-separated search terms, no spaces after commas, 100 characters or fewer total."
    ),
  excludedDuplicates: z
    .array(z.string())
    .describe(
      "Relevant words that were deliberately left out of the keyword field because they already appear in the title or subtitle."
    ),
});

export const SYSTEM_PROMPT = `You are an expert iOS App Store Search Optimization (ASO) consultant.

Your task: generate the content of an app's hidden App Store "keyword field" — a comma-separated list of search terms, invisible to users, indexed by Apple's search algorithm.

Hard rules:
- Total length of the keyword string must be 100 characters or fewer (Apple's limit).
- Comma-separated, no spaces after commas (spaces waste characters).
- Never include a word that already appears in the provided title or subtitle — the indexer already credits those words automatically. List any such words you deliberately excluded in excludedDuplicates.
- Do not repeat words or near-synonyms within the keyword field itself (e.g. don't include both "photo" and "photos" unless there's a real distinct search intent for each).
- Avoid generic, low-intent filler words ("free", "app", "best", "new") unless there is a specific, defensible reason they carry real search intent for this app.
- Prioritize specific, relevant, high-intent terms over broad/generic ones.
- Use singular/plural or word-form variants only when they represent genuinely different search queries, not as padding.`;

export function buildKeywordOptimizerPrompt(
  req: KeywordOptimizerRequest
): string {
  return `App name: ${req.appName}
App description: ${req.description}
${req.title ? `Current title: ${req.title}` : "No title provided."}
${req.subtitle ? `Current subtitle: ${req.subtitle}` : "No subtitle provided."}

Generate the optimal keyword field content for this app.`;
}
