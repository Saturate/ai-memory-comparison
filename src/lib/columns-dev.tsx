import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/badge";
import { ChipList } from "@/components/chip-list";
import { arrayFilterFn, scalarFilterFn } from "./filter-fns";
import type { DevTool } from "./types";

const col = createColumnHelper<DevTool>();

export const devToolColumns = [
  col.accessor("name", {
    header: "System",
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="min-w-[140px]">
          <span className="font-semibold text-foreground">
            {info.getValue()}
          </span>
          {row.language.length > 0 && (
            <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
              {row.language.join(", ")}
            </div>
          )}
        </div>
      );
    },
    enableHiding: false,
    enableColumnFilter: false,
  }),
  col.accessor("approach", {
    header: "Approach",
    cell: (info) => (
      <ChipList
        items={info.getValue()}
        detail={info.row.original.approachDetail}
      />
    ),
    filterFn: arrayFilterFn,
  }),
  col.accessor("search", {
    header: "Search",
    cell: (info) => (
      <ChipList
        items={info.getValue()}
        detail={info.row.original.searchDetail}
      />
    ),
    filterFn: arrayFilterFn,
  }),
  col.accessor("storage", {
    header: "Storage",
    cell: (info) => (
      <ChipList
        items={info.getValue()}
        detail={info.row.original.storageDetail}
      />
    ),
    filterFn: arrayFilterFn,
  }),
  col.accessor("mcpSupport", {
    header: "MCP",
    cell: (info) => (
      <Badge value={info.getValue()} detail={info.row.original.mcpDetail} />
    ),
    filterFn: scalarFilterFn,
    sortingFn: (a, b) => {
      const order = { yes: 0, partial: 1, no: 2 };
      return order[a.original.mcpSupport] - order[b.original.mcpSupport];
    },
  }),
  col.accessor("scopes", {
    header: "Scopes",
    cell: (info) => (
      <ChipList
        items={info.getValue()}
        detail={info.row.original.scopesDetail}
      />
    ),
    filterFn: arrayFilterFn,
  }),
  col.accessor("duplicateDetection", {
    header: "Dedup",
    cell: (info) => (
      <ChipList
        items={info.getValue()}
        detail={info.row.original.duplicateDetail}
      />
    ),
    filterFn: arrayFilterFn,
  }),
  col.accessor("retention", {
    header: "Retention",
    cell: (info) => (
      <ChipList
        items={info.getValue()}
        detail={info.row.original.retentionDetail}
      />
    ),
    filterFn: arrayFilterFn,
  }),
  col.accessor("multiUser", {
    header: "Multi-user",
    cell: (info) => (
      <Badge
        value={info.getValue()}
        detail={info.row.original.multiUserDetail}
      />
    ),
    filterFn: scalarFilterFn,
    sortingFn: (a, b) => {
      const order = { yes: 0, partial: 1, no: 2 };
      return order[a.original.multiUser] - order[b.original.multiUser];
    },
  }),
  col.accessor("crossMachine", {
    header: "Cross-machine",
    cell: (info) => (
      <Badge
        value={info.getValue()}
        detail={info.row.original.crossMachineDetail}
      />
    ),
    filterFn: scalarFilterFn,
    sortingFn: (a, b) => {
      const order = { yes: 0, partial: 1, no: 2 };
      return order[a.original.crossMachine] - order[b.original.crossMachine];
    },
  }),
  col.accessor("webUi", {
    header: "Web UI",
    cell: (info) => (
      <Badge value={info.getValue()} detail={info.row.original.webUiDetail} />
    ),
    filterFn: scalarFilterFn,
    sortingFn: (a, b) => {
      const order = { yes: 0, partial: 1, no: 2 };
      return order[a.original.webUi] - order[b.original.webUi];
    },
  }),
  col.accessor("tokenBudgeting", {
    header: "Token Budget",
    cell: (info) => (
      <ChipList
        items={info.getValue()}
        detail={info.row.original.tokenBudgetingDetail}
      />
    ),
    filterFn: arrayFilterFn,
  }),
  col.accessor("toolSupport", {
    header: "Tool Support",
    cell: (info) => (
      <ChipList
        items={info.getValue()}
        detail={info.row.original.toolSupportDetail}
      />
    ),
    filterFn: arrayFilterFn,
  }),
];
