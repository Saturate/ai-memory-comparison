"use client";

import { getChipColor } from "@/lib/chip-colors";
import { useColors } from "@/lib/color-context";
import { cn } from "@/lib/utils";

interface ChipListProps {
  items: string[];
  detail?: string;
  className?: string;
}

export function ChipList({ items, detail, className }: ChipListProps) {
  const colorsEnabled = useColors();

  if (items.length === 0 || (items.length === 1 && items[0] === "none")) {
    return (
      <span className="text-muted-foreground text-[11px] font-mono">--</span>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-1", className)} title={detail}>
      {items.map((item) => {
        const color = colorsEnabled ? getChipColor(item) : undefined;
        return (
          <span
            key={item}
            className={cn(
              "inline-flex items-center rounded-md px-1.5 py-0.5 text-[11px] font-mono",
              color ?? "bg-muted text-foreground/80",
              detail && "cursor-help",
            )}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
}
