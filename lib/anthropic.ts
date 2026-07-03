import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import type { ApiErrorResponse } from "@/types/aso";

let client: Anthropic | null = null;

export function getAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new MissingApiKeyError();
  }
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export class MissingApiKeyError extends Error {
  constructor() {
    super(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local and restart the dev server."
    );
    this.name = "MissingApiKeyError";
  }
}

export const CLAUDE_MODEL = "claude-sonnet-5";

export function handleAnthropicError(
  error: unknown
): NextResponse<ApiErrorResponse> {
  if (error instanceof MissingApiKeyError) {
    return NextResponse.json({ error: error.message }, { status: 503 });
  }
  if (error instanceof Anthropic.AuthenticationError) {
    return NextResponse.json(
      {
        error:
          "Invalid ANTHROPIC_API_KEY. Check .env.local and restart the dev server.",
      },
      { status: 503 }
    );
  }
  if (error instanceof Anthropic.RateLimitError) {
    return NextResponse.json(
      { error: "Rate limited by the Anthropic API. Try again shortly." },
      { status: 429 }
    );
  }
  if (error instanceof Anthropic.APIError) {
    return NextResponse.json(
      { error: `Anthropic API error: ${error.message}` },
      { status: 502 }
    );
  }
  console.error("Unexpected error calling Anthropic API:", error);
  return NextResponse.json(
    { error: "Unexpected server error." },
    { status: 500 }
  );
}
