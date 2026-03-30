import type { EnrichedSystem, MemorySystem } from "@/lib/types";

export function SystemNameCell({ row }: { row: MemorySystem }) {
  const e = (row as EnrichedSystem).enrichment;

  const meta: string[] = [];
  if (row.language.length > 0) meta.push(row.language.join(", "));
  if (e?.latestVersion) meta.push(e.latestVersion);

  return (
    <div className="min-w-[140px]">
      <span className="font-semibold text-foreground">{row.name}</span>
      {row.tagline && (
        <div className="text-[11px] text-muted-foreground mt-0.5">
          {row.tagline}
        </div>
      )}
      {meta.length > 0 && (
        <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
          {meta.join(" · ")}
        </div>
      )}
    </div>
  );
}
