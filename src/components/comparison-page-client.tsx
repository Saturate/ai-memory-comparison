"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { useUrlState } from "@/hooks/use-url-state";
import { ColorProvider } from "@/lib/color-context";
import type { EnrichedSystem } from "@/lib/types";
import {
  colsToVisibility,
  columnFiltersToRecord,
  filtersToColumnFilters,
} from "@/lib/url-state";
import { ComparisonTable } from "./comparison-table";
import { SystemDetailDialog } from "./system-detail-dialog";
import { TableToolbar } from "./table-toolbar";

const globalFilterFn: FilterFn<EnrichedSystem> = (
  row,
  _columnId,
  filterValue: string,
) => {
  const search = filterValue.toLowerCase();
  const values = Object.values(row.original);
  return values.some((val) => {
    if (typeof val === "string") return val.toLowerCase().includes(search);
    if (Array.isArray(val))
      return val.some((v) => String(v).toLowerCase().includes(search));
    return false;
  });
};

interface ComparisonPageClientProps {
  data: EnrichedSystem[];
  columns: ColumnDef<EnrichedSystem, unknown>[];
  category: string;
}

export function ComparisonPageClient({
  data,
  columns,
  category,
}: ComparisonPageClientProps) {
  const { state: urlState, setState: setUrlState } = useUrlState();

  const [sorting, setSorting] = useState<SortingState>(urlState.sort ?? []);
  const [globalFilter, setGlobalFilter] = useState(urlState.q ?? "");
  const [colorsEnabled, setColorsEnabled] = useState(urlState.colors !== false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    filtersToColumnFilters(urlState.filters),
  );
  const [selectedSystem, setSelectedSystem] = useState<EnrichedSystem | null>(
    null,
  );

  const allColumnIds = useMemo(
    () =>
      columns.map((c) =>
        "accessorKey" in c ? String(c.accessorKey) : (c.id ?? ""),
      ),
    [columns],
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    urlState.cols ? colsToVisibility(allColumnIds, urlState.cols) : {},
  );

  const allSlugs = useMemo(() => new Set(data.map((d) => d.slug)), [data]);
  const [visibleSlugs, setVisibleSlugs] = useState<Set<string>>(
    urlState.systems ? new Set(urlState.systems) : allSlugs,
  );

  const [selectedForCompare, setSelectedForCompare] = useState<Set<string>>(
    new Set(),
  );

  const filteredData = useMemo(
    () => data.filter((d) => visibleSlugs.has(d.slug)),
    [data, visibleSlugs],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
      columnFilters,
    },
    onSortingChange: (updater) => {
      const next = typeof updater === "function" ? updater(sorting) : updater;
      setSorting(next);
      setUrlState({ sort: next.length > 0 ? next : undefined });
    },
    onColumnVisibilityChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(columnVisibility) : updater;
      setColumnVisibility(next);
      const visibleIds = allColumnIds.filter((id) => next[id] !== false);
      setUrlState({
        cols: visibleIds.length < allColumnIds.length ? visibleIds : undefined,
      });
    },
    onColumnFiltersChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(columnFilters) : updater;
      setColumnFilters(next);
      setUrlState({ filters: columnFiltersToRecord(next) });
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleGlobalFilterChange = useCallback(
    (value: string) => {
      setGlobalFilter(value);
      setUrlState({ q: value || undefined });
    },
    [setUrlState],
  );

  const toggleColors = useCallback(() => {
    setColorsEnabled((prev) => {
      const next = !prev;
      setUrlState({ colors: next ? undefined : false });
      return next;
    });
  }, [setUrlState]);

  const toggleSystem = useCallback(
    (slug: string) => {
      setVisibleSlugs((prev) => {
        const next = new Set(prev);
        if (next.has(slug)) next.delete(slug);
        else next.add(slug);
        setUrlState({
          systems: next.size < allSlugs.size ? [...next] : undefined,
        });
        return next;
      });
    },
    [allSlugs.size, setUrlState],
  );

  const selectAllSystems = useCallback(() => {
    setVisibleSlugs(allSlugs);
    setUrlState({ systems: undefined });
  }, [allSlugs, setUrlState]);

  const deselectAllSystems = useCallback(() => {
    setVisibleSlugs(new Set());
    setUrlState({ systems: [] });
  }, [setUrlState]);

  const toggleCompare = useCallback((slug: string) => {
    setSelectedForCompare((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else if (next.size < 4) next.add(slug);
      return next;
    });
  }, []);

  const activeFilterCount = columnFilters.reduce(
    (count, f) => count + (Array.isArray(f.value) ? f.value.length : 0),
    0,
  );

  return (
    <ColorProvider value={colorsEnabled}>
      <div>
        <TableToolbar
          table={table}
          globalFilter={globalFilter}
          onGlobalFilterChange={handleGlobalFilterChange}
          allSystems={data}
          visibleSlugs={visibleSlugs}
          onToggleSystem={toggleSystem}
          onSelectAllSystems={selectAllSystems}
          onDeselectAllSystems={deselectAllSystems}
          selectedForCompare={selectedForCompare}
          onToggleCompare={toggleCompare}
          category={category}
          colorsEnabled={colorsEnabled}
          onToggleColors={toggleColors}
          activeFilterCount={activeFilterCount}
          onClearFilters={() => {
            setColumnFilters([]);
            setUrlState({ filters: undefined });
          }}
        />
        <ComparisonTable
          table={table}
          onSelectSystem={setSelectedSystem}
          allData={data}
        />
        <p className="text-[11px] text-muted-foreground font-mono mt-3">
          Click any row for details
        </p>
        <SystemDetailDialog
          system={selectedSystem}
          onClose={() => setSelectedSystem(null)}
        />
      </div>
    </ColorProvider>
  );
}
