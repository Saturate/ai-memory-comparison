import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

export interface TableUrlState {
  sort?: SortingState;
  cols?: string[];
  systems?: string[];
  q?: string;
  colors?: boolean;
  filters?: Record<string, string[]>;
}

export function parseUrlState(searchParams: URLSearchParams): TableUrlState {
  const state: TableUrlState = {};

  const sortParam = searchParams.get("sort");
  if (sortParam) {
    const [id, dir] = sortParam.split(":");
    if (id) {
      state.sort = [{ id, desc: dir === "desc" }];
    }
  }

  const colsParam = searchParams.get("cols");
  if (colsParam) {
    state.cols = colsParam.split(",").filter(Boolean);
  }

  const systemsParam = searchParams.get("systems");
  if (systemsParam) {
    state.systems = systemsParam.split(",").filter(Boolean);
  }

  const q = searchParams.get("q");
  if (q) {
    state.q = q;
  }

  if (searchParams.get("colors") === "0") {
    state.colors = false;
  }

  const filtersParam = searchParams.get("f");
  if (filtersParam) {
    const filters: Record<string, string[]> = {};
    for (const entry of filtersParam.split(",")) {
      const colonIdx = entry.indexOf(":");
      if (colonIdx === -1) continue;
      const key = entry.slice(0, colonIdx);
      const values = entry
        .slice(colonIdx + 1)
        .split("|")
        .filter(Boolean);
      if (key && values.length > 0) {
        filters[key] = values;
      }
    }
    if (Object.keys(filters).length > 0) {
      state.filters = filters;
    }
  }

  return state;
}

export function serializeUrlState(state: TableUrlState): URLSearchParams {
  const params = new URLSearchParams();

  if (state.sort && state.sort.length > 0) {
    const s = state.sort[0];
    params.set("sort", `${s.id}:${s.desc ? "desc" : "asc"}`);
  }

  if (state.cols && state.cols.length > 0) {
    params.set("cols", state.cols.join(","));
  }

  if (state.systems && state.systems.length > 0) {
    params.set("systems", state.systems.join(","));
  }

  if (state.q) {
    params.set("q", state.q);
  }

  if (state.colors === false) {
    params.set("colors", "0");
  }

  if (state.filters && Object.keys(state.filters).length > 0) {
    const entries = Object.entries(state.filters)
      .map(([key, values]) => `${key}:${values.join("|")}`)
      .join(",");
    params.set("f", entries);
  }

  return params;
}

export function colsToVisibility(
  allColumnIds: string[],
  visibleCols?: string[],
): VisibilityState {
  if (!visibleCols) return {};
  const vis: VisibilityState = {};
  for (const id of allColumnIds) {
    vis[id] = visibleCols.includes(id);
  }
  // Name column always visible
  vis.name = true;
  return vis;
}

export function filtersToColumnFilters(
  filters?: Record<string, string[]>,
): ColumnFiltersState {
  if (!filters) return [];
  return Object.entries(filters).map(([id, value]) => ({ id, value }));
}

export function columnFiltersToRecord(
  columnFilters: ColumnFiltersState,
): Record<string, string[]> | undefined {
  if (columnFilters.length === 0) return undefined;
  const record: Record<string, string[]> = {};
  for (const { id, value } of columnFilters) {
    if (Array.isArray(value) && value.length > 0) {
      record[id] = value as string[];
    }
  }
  return Object.keys(record).length > 0 ? record : undefined;
}
