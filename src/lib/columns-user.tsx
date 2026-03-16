import { createColumnHelper } from "@tanstack/react-table";
import { Badge } from "@/components/badge";
import { ChipList } from "@/components/chip-list";
import { arrayFilterFn, scalarFilterFn } from "./filter-fns";
import type { UserMemory } from "./types";

const col = createColumnHelper<UserMemory>();

export const userMemoryColumns = [
  col.accessor("name", {
    header: "Platform",
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="min-w-[140px]">
          <span className="font-semibold text-foreground">
            {info.getValue()}
          </span>
          {row.githubStars && (
            <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
              {row.githubStars} stars
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
  col.accessor("hosting", {
    header: "Hosting",
    cell: (info) => (
      <ChipList
        items={info.getValue()}
        detail={info.row.original.hostingDetail}
      />
    ),
    filterFn: arrayFilterFn,
  }),
  col.accessor("pricing", {
    header: "Pricing",
    cell: (info) => (
      <Badge value={info.getValue()} detail={info.row.original.pricingDetail} />
    ),
    filterFn: scalarFilterFn,
  }),
  col.accessor("sdks", {
    header: "SDKs",
    cell: (info) => (
      <ChipList items={info.getValue()} detail={info.row.original.sdksDetail} />
    ),
    filterFn: arrayFilterFn,
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
  col.accessor("temporalAwareness", {
    header: "Temporal",
    cell: (info) => (
      <Badge
        value={info.getValue()}
        detail={info.row.original.temporalDetail}
      />
    ),
    filterFn: scalarFilterFn,
    sortingFn: (a, b) => {
      const order = { yes: 0, partial: 1, no: 2 };
      return (
        order[a.original.temporalAwareness] -
        order[b.original.temporalAwareness]
      );
    },
  }),
  col.accessor("selfImproving", {
    header: "Self-improving",
    cell: (info) => (
      <Badge
        value={info.getValue()}
        detail={info.row.original.selfImprovingDetail}
      />
    ),
    filterFn: scalarFilterFn,
    sortingFn: (a, b) => {
      const order = { yes: 0, partial: 1, no: 2 };
      return order[a.original.selfImproving] - order[b.original.selfImproving];
    },
  }),
  col.accessor("multiTenant", {
    header: "Multi-tenant",
    cell: (info) => (
      <Badge
        value={info.getValue()}
        detail={info.row.original.multiTenantDetail}
      />
    ),
    filterFn: scalarFilterFn,
    sortingFn: (a, b) => {
      const order = { yes: 0, partial: 1, no: 2 };
      return order[a.original.multiTenant] - order[b.original.multiTenant];
    },
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
  col.accessor("funding", {
    header: "Funding",
    cell: (info) => {
      const val = info.getValue();
      return val ? (
        <span className="text-sm font-mono whitespace-nowrap">{val}</span>
      ) : (
        <span className="text-muted-foreground text-[11px] font-mono">--</span>
      );
    },
    enableColumnFilter: false,
  }),
];
