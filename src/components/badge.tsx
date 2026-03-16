import { cn } from "@/lib/utils";

type BadgeVariant = "yes" | "no" | "partial" | "default";

const variantClasses: Record<BadgeVariant, string> = {
  yes: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/50",
  no: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/50",
  partial:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50",
  default:
    "bg-muted text-muted-foreground border-border",
};

const variantLabels: Record<string, string> = {
  yes: "Yes",
  no: "No",
  partial: "Partial",
};

interface BadgeProps {
  value: string;
  detail?: string;
  className?: string;
}

export function Badge({ value, detail, className }: BadgeProps) {
  const variant: BadgeVariant =
    value === "yes" || value === "no" || value === "partial"
      ? value
      : "default";

  const label = variantLabels[value] ?? value;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-mono font-medium whitespace-nowrap",
        variantClasses[variant],
        detail && "cursor-help border-dashed",
        className
      )}
      title={detail}
    >
      {label}
    </span>
  );
}
