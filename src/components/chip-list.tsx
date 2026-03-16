import { cn } from "@/lib/utils";

interface ChipListProps {
  items: string[];
  detail?: string;
  className?: string;
}

export function ChipList({ items, detail, className }: ChipListProps) {
  if (items.length === 0 || (items.length === 1 && items[0] === "none")) {
    return (
      <span className="text-muted-foreground text-[11px] font-mono">--</span>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-1", className)} title={detail}>
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-mono text-foreground/80",
            detail && "cursor-help",
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
