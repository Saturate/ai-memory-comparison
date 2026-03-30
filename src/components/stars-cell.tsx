import { formatStars } from "@/lib/format";
import type { EnrichedSystem, MemorySystem } from "@/lib/types";

export function StarsCell({ row }: { row: MemorySystem }) {
  const stars = (row as EnrichedSystem).enrichment?.githubStars;
  if (stars == null) {
    return (
      <span className="text-muted-foreground text-[11px] font-mono">--</span>
    );
  }
  return (
    <span className="text-sm font-mono whitespace-nowrap">
      ★ {formatStars(stars)}
    </span>
  );
}
