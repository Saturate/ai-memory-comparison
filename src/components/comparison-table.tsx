"use client";

import {
  flexRender,
  type Table as TanStackTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import type { MemorySystem } from "@/lib/types";

interface ComparisonTableProps<T extends MemorySystem> {
  table: TanStackTable<T>;
  onSelectSystem: (system: T) => void;
}

export function ComparisonTable<T extends MemorySystem>({
  table,
  onSelectSystem,
}: ComparisonTableProps<T>) {
  return (
    <div className="comparison-table-wrapper rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-border">
              {headerGroup.headers.map((header, idx) => (
                <th
                  key={header.id}
                  className={cn(
                    "px-3 py-2.5 text-left text-[11px] font-mono font-medium uppercase tracking-wider text-muted-foreground whitespace-nowrap bg-muted/40",
                    idx === 0 &&
                      "sticky left-0 z-20 bg-muted/80 backdrop-blur-sm after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-border"
                  )}
                  style={
                    header.column.getCanSort()
                      ? { cursor: "pointer", userSelect: "none" }
                      : undefined
                  }
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center gap-1">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {{
                      asc: " \u2191",
                      desc: " \u2193",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            const system = row.original;
            return (
              <tr
                key={row.id}
                className="border-b border-border/60 transition-colors hover:bg-muted/20 cursor-pointer group"
                onClick={() => onSelectSystem(system)}
              >
                {row.getVisibleCells().map((cell, idx) => (
                  <td
                    key={cell.id}
                    className={cn(
                      "px-3 py-2.5",
                      idx === 0 &&
                        "sticky left-0 z-10 bg-card group-hover:bg-muted/20 transition-colors after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-border/60"
                    )}
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {table.getRowModel().rows.length === 0 && (
        <div className="p-12 text-center text-muted-foreground text-sm font-mono">
          No systems match your filters.
        </div>
      )}
    </div>
  );
}
