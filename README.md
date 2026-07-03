# ASO Tool

A simple, focused App Store Search Optimization (ASO) toolkit for iOS app developers — a written guide plus an AI assistant for keyword and metadata work.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The **Guide** works immediately, no setup required.

## AI Assistant Setup

The AI Assistant (Keyword Optimizer, Title/Subtitle Generator, Metadata Critique) calls the Anthropic API and needs an API key:

1. Copy `.env.local.example` to `.env.local`
2. Get an API key at [console.anthropic.com](https://console.anthropic.com/)
3. Set `ANTHROPIC_API_KEY=sk-ant-...` in `.env.local`
4. Restart the dev server (`npm run dev`)

Without a key, the rest of the site works fine — the Assistant tools will show a clear configuration error when used.
