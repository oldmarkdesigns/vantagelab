"use client";

import { useState } from "react";
import Button from "./Button";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleCopy}
      className="self-start px-3 py-1.5 text-xs"
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
