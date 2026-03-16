import { createColumnHelper } from "@tanstack/react-table";
import type { UserMemory } from "./types";
import { Badge } from "@/components/badge";
import { ChipList } from "@/components/chip-list";

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
  }),
  col.accessor("approach", {
    header: "Approach",
    cell: (info) => (
      <ChipList items={info.getValue()} detail={info.row.original.approachDetail} />
    ),
  }),
  col.accessor("hosting", {
    header: "Hosting",
    cell: (info) => (
      <ChipList items={info.getValue()} detail={info.row.original.hostingDetail} />
    ),
  }),
  col.accessor("pricing", {
    header: "Pricing",
    cell: (info) => (
      <Badge value={info.getValue()} detail={info.row.original.pricingDetail} />
    ),
  }),
  col.accessor("sdks", {
    header: "SDKs",
    cell: (info) => (
      <ChipList items={info.getValue()} detail={info.row.original.sdksDetail} />
    ),
  }),
  col.accessor("scopes", {
    header: "Scopes",
    cell: (info) => (
      <ChipList items={info.getValue()} detail={info.row.original.scopesDetail} />
    ),
  }),
  col.accessor("temporalAwareness", {
    header: "Temporal",
    cell: (info) => (
      <Badge value={info.getValue()} detail={info.row.original.temporalDetail} />
    ),
    sortingFn: (a, b) => {
      const order = { yes: 0, partial: 1, no: 2 };
      return order[a.original.temporalAwareness] - order[b.original.temporalAwareness];
    },
  }),
  col.accessor("selfImproving", {
    header: "Self-improving",
    cell: (info) => (
      <Badge value={info.getValue()} detail={info.row.original.selfImprovingDetail} />
    ),
    sortingFn: (a, b) => {
      const order = { yes: 0, partial: 1, no: 2 };
      return order[a.original.selfImproving] - order[b.original.selfImproving];
    },
  }),
  col.accessor("multiTenant", {
    header: "Multi-tenant",
    cell: (info) => (
      <Badge value={info.getValue()} detail={info.row.original.multiTenantDetail} />
    ),
    sortingFn: (a, b) => {
      const order = { yes: 0, partial: 1, no: 2 };
      return order[a.original.multiTenant] - order[b.original.multiTenant];
    },
  }),
  col.accessor("search", {
    header: "Search",
    cell: (info) => (
      <ChipList items={info.getValue()} detail={info.row.original.searchDetail} />
    ),
  }),
  col.accessor("storage", {
    header: "Storage",
    cell: (info) => (
      <ChipList items={info.getValue()} detail={info.row.original.storageDetail} />
    ),
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
  }),
];
