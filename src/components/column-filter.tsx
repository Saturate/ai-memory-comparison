"use client";

import type { Column } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import type { EnrichedSystem } from "@/lib/types";

interface ColumnFilterProps {
  column: Column<EnrichedSystem, unknown>;
  allData: EnrichedSystem[];
}

export function ColumnFilter({ column, allData }: ColumnFilterProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const uniqueValues = (() => {
    const vals = new Set<string>();
    for (const row of allData) {
      const value = (row as Record<string, unknown>)[column.id];
      if (Array.isArray(value)) {
        for (const v of value) vals.add(String(v));
      } else if (typeof value === "string") {
        vals.add(value);
      }
    }
    return [...vals].sort();
  })();

  const filterValue = (column.getFilterValue() as string[] | undefined) ?? [];
  const isActive = filterValue.length > 0;

  function toggle(val: string) {
    const current = filterValue;
    const next = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    column.setFilterValue(next.length > 0 ? next : undefined);
  }

  function clearAll() {
    column.setFilterValue(undefined);
  }

  if (uniqueValues.length === 0) return null;

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        className={`ml-1 inline-flex items-center justify-center rounded h-4 w-4 transition-colors ${
          isActive
            ? "text-primary"
            : "text-muted-foreground/50 hover:text-muted-foreground"
        }`}
        aria-label={`Filter ${column.id}`}
      >
        <svg
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 w-48 rounded-lg border border-border bg-popover p-1.5 shadow-xl max-h-60 overflow-y-auto normal-case">
          {isActive && (
            <button
              type="button"
              onClick={clearAll}
              className="w-full text-left text-[11px] font-mono text-primary hover:underline px-2 py-1 mb-0.5"
            >
              Clear filter
            </button>
          )}
          {uniqueValues.map((val) => (
            <label
              key={val}
              className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] hover:bg-muted cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={filterValue.includes(val)}
                onChange={() => toggle(val)}
                className="rounded border-border"
              />
              <span className="font-mono truncate">{val}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
