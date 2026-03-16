import type { SortingState, VisibilityState } from "@tanstack/react-table";

export interface TableUrlState {
  sort?: SortingState;
  cols?: string[];
  systems?: string[];
  q?: string;
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
