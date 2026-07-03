import { z } from "zod";
import type { TitleSubtitleRequest } from "@/types/aso";

export const titleSubtitleSchema = z.object({
  options: z
    .array(
      z.object({
        title: z
          .string()
          .describe("App Store title, 30 characters or fewer."),
        subtitle: z
          .string()
          .describe("App Store subtitle, 30 characters or fewer."),
      })
    )
    .min(2)
    .max(3)
    .describe("2-3 distinct title/subtitle option pairs."),
});

export const SYSTEM_PROMPT = `You are an expert iOS App Store Search Optimization (ASO) consultant.

Your task: write App Store title and subtitle options for an app.

Hard rules:
- Title must be 30 characters or fewer (Apple's limit).
- Subtitle must be 30 characters or fewer (Apple's limit).
- Naturally weave in the app's highest-intent, most relevant search keywords — don't just restate the app name.
- Subtitle should communicate a clear value proposition, not just repeat words from the title.
- Provide 2-3 genuinely different options (different angles/keyword emphasis), not minor rewordings of the same idea.
- If the user provided priority keywords, prioritize working those in naturally without sacrificing readability.
- Never sacrifice clarity for keyword stuffing — these are also user-facing, unlike the keyword field.`;

export function buildTitleSubtitlePrompt(req: TitleSubtitleRequest): string {
  return `App name / current title: ${req.appName}
App description: ${req.description}
${req.priorityKeywords ? `Priority keywords to consider: ${req.priorityKeywords}` : "No specific priority keywords provided."}

Generate 2-3 title/subtitle option pairs for this app.`;
}
