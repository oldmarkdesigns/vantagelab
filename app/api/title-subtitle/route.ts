import { NextRequest, NextResponse } from "next/server";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { getAnthropicClient, CLAUDE_MODEL, handleAnthropicError } from "@/lib/anthropic";
import {
  titleSubtitleSchema,
  buildTitleSubtitlePrompt,
  SYSTEM_PROMPT,
} from "@/lib/prompts/titleSubtitle";
import type {
  TitleSubtitleRequest,
  TitleSubtitleResponse,
  TitleSubtitleOption,
  ApiErrorResponse,
} from "@/types/aso";

const FIELD_LIMIT = 30;

// Models aren't reliably precise at self-counting characters, and Apple's
// limit isn't enforceable via structured-output schema constraints. Prefer
// dropping non-compliant options outright (title/subtitle are user-facing
// phrases, so mid-word truncation looks broken); only fall back to
// word-boundary trimming if every option came back over the limit.
function trimToWordBoundary(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const truncated = text.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(" ");
  const trimmed = lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated;
  return trimmed.replace(/[\s,.:;&-]+$/, "");
}

export async function POST(request: NextRequest) {
  const body: TitleSubtitleRequest = await request.json();

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
      messages: [{ role: "user", content: buildTitleSubtitlePrompt(body) }],
      output_config: { format: zodOutputFormat(titleSubtitleSchema) },
    });

    const parsed = message.parsed_output;
    if (!parsed) {
      return NextResponse.json<ApiErrorResponse>(
        { error: "The AI response could not be parsed." },
        { status: 502 }
      );
    }

    const compliant = parsed.options.filter(
      (option) =>
        option.title.length <= FIELD_LIMIT &&
        option.subtitle.length <= FIELD_LIMIT
    );

    const options: TitleSubtitleOption[] =
      compliant.length > 0
        ? compliant
        : parsed.options.map((option) => ({
            title: trimToWordBoundary(option.title, FIELD_LIMIT),
            subtitle: trimToWordBoundary(option.subtitle, FIELD_LIMIT),
          }));

    return NextResponse.json<TitleSubtitleResponse>({ options });
  } catch (error) {
    return handleAnthropicError(error);
  }
}
