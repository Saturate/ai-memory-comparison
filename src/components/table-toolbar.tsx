"use client";

import type { Table } from "@tanstack/react-table";
import { useEffect, useRef, useState } from "react";
import type { MemorySystem } from "@/lib/types";

interface TableToolbarProps<T extends MemorySystem> {
  table: Table<T>;
  globalFilter: string;
  onGlobalFilterChange: (value: string) => void;
  allSystems: T[];
  visibleSlugs: Set<string>;
  onToggleSystem: (slug: string) => void;
  onSelectAllSystems: () => void;
  onDeselectAllSystems: () => void;
  selectedForCompare: Set<string>;
  onToggleCompare: (slug: string) => void;
  category: string;
  colorsEnabled: boolean;
  onToggleColors: () => void;
  activeFilterCount: number;
  onClearFilters: () => void;
}

function ToolbarButton({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 rounded-md border px-2.5 text-[12px] font-mono transition-colors ${
        active
          ? "border-primary/40 bg-primary/5 text-primary"
          : "border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  );
}

export function TableToolbar<T extends MemorySystem>({
  table,
  globalFilter,
  onGlobalFilterChange,
  allSystems,
  visibleSlugs,
  onToggleSystem,
  onSelectAllSystems,
  onDeselectAllSystems,
  selectedForCompare,
  onToggleCompare,
  category,
  colorsEnabled,
  onToggleColors,
  activeFilterCount,
  onClearFilters,
}: TableToolbarProps<T>) {
  const [showCols, setShowCols] = useState(false);
  const [showSystems, setShowSystems] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const colsRef = useRef<HTMLDivElement>(null);
  const systemsRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (colsRef.current && !colsRef.current.contains(e.target as Node))
        setShowCols(false);
      if (systemsRef.current && !systemsRef.current.contains(e.target as Node))
        setShowSystems(false);
      if (compareRef.current && !compareRef.current.contains(e.target as Node))
        setShowCompare(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const allColumns = table.getAllLeafColumns().filter((c) => c.getCanHide());

  function copyAsMarkdown() {
    const visibleCols = table.getVisibleLeafColumns();
    const headers = visibleCols.map((c) => {
      const header = c.columnDef.header;
      return typeof header === "string" ? header : c.id;
    });
    const rows = table.getFilteredRowModel().rows;
    const lines = [
      `| ${headers.join(" | ")} |`,
      `| ${headers.map(() => "---").join(" | ")} |`,
      ...rows.map((row) => {
        const cells = visibleCols.map((col) => {
          const value = row.getValue(col.id);
          if (Array.isArray(value)) return value.join(", ");
          return String(value ?? "");
        });
        return `| ${cells.join(" | ")} |`;
      }),
    ];
    navigator.clipboard.writeText(lines.join("\n"));
  }

  const compareUrl =
    selectedForCompare.size >= 2
      ? `/compare?systems=${[...selectedForCompare].join(",")}&category=${category}`
      : null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Filter..."
          value={globalFilter}
          onChange={(e) => onGlobalFilterChange(e.target.value)}
          className="h-8 w-40 rounded-md border border-border bg-card pl-8 pr-3 text-[12px] font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-colors"
        />
      </div>

      {/* Column visibility */}
      <div className="relative" ref={colsRef}>
        <ToolbarButton onClick={() => setShowCols(!showCols)} active={showCols}>
          Columns
        </ToolbarButton>
        {showCols && (
          <div className="absolute left-0 top-full mt-1 z-50 w-52 rounded-lg border border-border bg-popover p-1.5 shadow-xl">
            {allColumns.map((col) => (
              <label
                key={col.id}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] hover:bg-muted cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={col.getIsVisible()}
                  onChange={col.getToggleVisibilityHandler()}
                  className="rounded border-border"
                />
                <span className="font-mono">
                  {typeof col.columnDef.header === "string"
                    ? col.columnDef.header
                    : col.id}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* System filter */}
      <div className="relative" ref={systemsRef}>
        <ToolbarButton
          onClick={() => setShowSystems(!showSystems)}
          active={visibleSlugs.size < allSystems.length}
        >
          Systems {visibleSlugs.size}/{allSystems.length}
        </ToolbarButton>
        {showSystems && (
          <div className="absolute left-0 top-full mt-1 z-50 w-56 rounded-lg border border-border bg-popover p-1.5 shadow-xl max-h-72 overflow-y-auto">
            <div className="flex gap-2 mb-1 px-2 py-1">
              <button
                type="button"
                onClick={onSelectAllSystems}
                className="text-[11px] font-mono text-primary hover:underline"
              >
                All
              </button>
              <span className="text-border">/</span>
              <button
                type="button"
                onClick={onDeselectAllSystems}
                className="text-[11px] font-mono text-primary hover:underline"
              >
                None
              </button>
            </div>
            {allSystems.map((sys) => (
              <label
                key={sys.slug}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] hover:bg-muted cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={visibleSlugs.has(sys.slug)}
                  onChange={() => onToggleSystem(sys.slug)}
                  className="rounded border-border"
                />
                {sys.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Compare */}
      <div className="relative" ref={compareRef}>
        <ToolbarButton
          onClick={() => setShowCompare(!showCompare)}
          active={selectedForCompare.size > 0}
        >
          Compare
          {selectedForCompare.size > 0 ? ` (${selectedForCompare.size})` : ""}
        </ToolbarButton>
        {showCompare && (
          <div className="absolute left-0 top-full mt-1 z-50 w-56 rounded-lg border border-border bg-popover p-1.5 shadow-xl max-h-72 overflow-y-auto">
            <p className="text-[11px] font-mono text-muted-foreground mb-1 px-2 py-1">
              Select 2-4 systems
            </p>
            {allSystems.map((sys) => (
              <label
                key={sys.slug}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[12px] hover:bg-muted cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedForCompare.has(sys.slug)}
                  onChange={() => onToggleCompare(sys.slug)}
                  disabled={
                    !selectedForCompare.has(sys.slug) &&
                    selectedForCompare.size >= 4
                  }
                  className="rounded border-border"
                />
                {sys.name}
              </label>
            ))}
            {compareUrl && (
              <a
                href={compareUrl}
                className="mt-1 block rounded-md bg-primary px-3 py-1.5 text-center text-[12px] font-mono font-medium text-primary-foreground hover:opacity-90 transition-opacity mx-1.5 mb-1"
              >
                Compare →
              </a>
            )}
          </div>
        )}
      </div>

      {/* Colors toggle */}
      <ToolbarButton onClick={onToggleColors} active={colorsEnabled}>
        Colors
      </ToolbarButton>

      {/* Active filters indicator */}
      {activeFilterCount > 0 && (
        <ToolbarButton onClick={onClearFilters} active>
          {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""} ✕
        </ToolbarButton>
      )}

      {/* Copy markdown */}
      <ToolbarButton onClick={copyAsMarkdown}>Copy MD</ToolbarButton>
    </div>
  );
}
