"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ComparisonPageClient } from "@/components/comparison-page-client";
import { devToolColumns } from "@/lib/columns-dev";
import type { DevTool, MemorySystem } from "@/lib/types";

export function DevToolsTableClient({ data }: { data: DevTool[] }) {
  return (
    <ComparisonPageClient
      data={data}
      columns={devToolColumns as ColumnDef<MemorySystem, unknown>[]}
      category="developer-tools"
    />
  );
}
