import { NextRequest, NextResponse } from "next/server";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { getAnthropicClient, CLAUDE_MODEL, handleAnthropicError } from "@/lib/anthropic";
import {
  keywordOptimizerSchema,
  buildKeywordOptimizerPrompt,
  SYSTEM_PROMPT,
} from "@/lib/prompts/keywordOptimizer";
import type {
  KeywordOptimizerRequest,
  KeywordOptimizerResponse,
  ApiErrorResponse,
} from "@/types/aso";

const KEYWORD_FIELD_LIMIT = 100;

// The Messages API doesn't support maxLength in structured outputs, and models
// aren't reliably precise at self-counting characters — enforce the limit here
// by dropping lowest-priority (trailing) terms until the string fits.
function fitToCharLimit(keywordString: string, limit: number): string {
  const terms = keywordString
    .split(",")
    .map((term) => term.trim())
    .filter(Boolean);

  const kept: string[] = [];
  let length = 0;
  for (const term of terms) {
    const addedLength = kept.length === 0 ? term.length : term.length + 1;
    if (length + addedLength > limit) break;
    kept.push(term);
    length += addedLength;
  }
  return kept.join(",");
}

export async function POST(request: NextRequest) {
  const body: KeywordOptimizerRequest = await request.json();

  if (!body.appName?.trim() || !body.description?.trim()) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "App name and description are required." },
      { status: 400 }
    );
  }

  try {
    const client = getAnthropicClient();
    const message = await client.messages.parse({
      model: CLAUDE_MODEL,
      max_tokens: 1024,
      thinking: { type: "disabled" },
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildKeywordOptimizerPrompt(body) }],
      output_config: { format: zodOutputFormat(keywordOptimizerSchema) },
    });

    const parsed = message.parsed_output;
    if (!parsed) {
      return NextResponse.json<ApiErrorResponse>(
        { error: "The AI response could not be parsed." },
        { status: 502 }
      );
    }

    const keywordString = fitToCharLimit(parsed.keywordString, KEYWORD_FIELD_LIMIT);

    const response: KeywordOptimizerResponse = {
      keywordString,
      charCount: keywordString.length,
      excludedDuplicates: parsed.excludedDuplicates,
    };

    return NextResponse.json<KeywordOptimizerResponse>(response);
  } catch (error) {
    return handleAnthropicError(error);
  }
}
