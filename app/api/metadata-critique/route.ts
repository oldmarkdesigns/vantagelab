import { NextRequest, NextResponse } from "next/server";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { getAnthropicClient, CLAUDE_MODEL, handleAnthropicError } from "@/lib/anthropic";
import {
  metadataCritiqueSchema,
  buildMetadataCritiquePrompt,
  SYSTEM_PROMPT,
} from "@/lib/prompts/metadataCritique";
import type {
  MetadataCritiqueRequest,
  MetadataCritiqueResponse,
  ApiErrorResponse,
} from "@/types/aso";

export async function POST(request: NextRequest) {
  const body: MetadataCritiqueRequest = await request.json();

  if (!body.title?.trim() || !body.description?.trim()) {
    return NextResponse.json<ApiErrorResponse>(
      { error: "Title and description are required." },
      { status: 400 }
    );
  }

  try {
    const client = getAnthropicClient();
    const message = await client.messages.parse({
      model: CLAUDE_MODEL,
      max_tokens: 2048,
      thinking: { type: "disabled" },
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: buildMetadataCritiquePrompt(body) },
      ],
      output_config: { format: zodOutputFormat(metadataCritiqueSchema) },
    });

    const parsed = message.parsed_output;
    if (!parsed) {
      return NextResponse.json<ApiErrorResponse>(
        { error: "The AI response could not be parsed." },
        { status: 502 }
      );
    }

    return NextResponse.json<MetadataCritiqueResponse>(parsed);
  } catch (error) {
    return handleAnthropicError(error);
  }
}
