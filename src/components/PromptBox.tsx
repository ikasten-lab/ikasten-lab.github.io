"use client";

import { useState } from "react";

export function PromptBox({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <figure className="my-6 rounded-md border border-border bg-card">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
        <span className="font-semibold">{title}</span>
        <button
          type="button"
          onClick={copy}
          className="min-h-9 shrink-0 rounded border border-border-strong px-3 text-[14px] font-medium hover:border-text"
        >
          {copied ? "Copiado" : "Copiar"}
        </button>
      </figcaption>
      <p className="px-4 py-4 leading-relaxed">{text}</p>
    </figure>
  );
}
