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

    const response: KeywordOptimizerResponse = {
      keywordString: parsed.keywordString,
      charCount: parsed.keywordString.length,
      excludedDuplicates: parsed.excludedDuplicates,
    };

    return NextResponse.json<KeywordOptimizerResponse>(response);
  } catch (error) {
    return handleAnthropicError(error);
  }
}
