import type { Block } from "@/data/types";
import { PromptBox } from "./PromptBox";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-prose text-[17px] leading-[1.65]">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "p":
            return (
              <p key={i} className="my-4">
                {b.text}
              </p>
            );
          case "h":
            return (
              <h2 key={i} className="mb-2 mt-8 text-[20px] font-semibold">
                {b.text}
              </h2>
            );
          case "list":
            return (
              <ul key={i} className="my-4 list-disc space-y-2 pl-6 marker:text-accent">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            );
          case "terms":
            return (
              <dl key={i} className="my-4 divide-y divide-border border-y border-border">
                {b.items.map((t) => (
                  <div key={t.term} className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4">
                    <dt className="font-semibold">{t.term}</dt>
                    <dd>{t.def}</dd>
                  </div>
                ))}
              </dl>
            );
          case "prompt":
            return <PromptBox key={i} title={b.title} text={b.text} />;
          case "note":
            return (
              <p key={i} className="my-6 rounded-md bg-surface px-4 py-4">
                {b.text}
              </p>
            );
        }
      })}
    </div>
  );
}
