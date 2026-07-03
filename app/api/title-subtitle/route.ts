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
  ApiErrorResponse,
} from "@/types/aso";

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

    return NextResponse.json<TitleSubtitleResponse>(parsed);
  } catch (error) {
    return handleAnthropicError(error);
  }
}
