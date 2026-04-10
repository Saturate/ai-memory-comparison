"use client";

import { useState } from "react";

const PROMPT_TEXT = `Please follow this guide to evaluate a tool for the AI Memory Comparison:
https://llm-memory.org/contribute.md`;

export function CopyPrompt() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(PROMPT_TEXT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="group relative flex items-start gap-3 rounded-md border border-border bg-muted/40 px-3 py-2.5">
      <div className="flex-1 min-w-0">
        <code className="text-xs font-mono text-muted-foreground leading-relaxed break-all">
          {PROMPT_TEXT}
        </code>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-mono text-muted-foreground transition-all hover:text-foreground hover:border-foreground/20 hover:bg-accent"
      >
        {copied ? (
          <>
            <svg
              className="h-3.5 w-3.5 text-success"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}
