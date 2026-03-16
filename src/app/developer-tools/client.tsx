"use client";

import type { DevTool } from "@/lib/types";
import { devToolColumns } from "@/lib/columns-dev";
import { ComparisonPageClient } from "@/components/comparison-page-client";
import type { ColumnDef } from "@tanstack/react-table";

export function DevToolsTableClient({ data }: { data: DevTool[] }) {
  return (
    <ComparisonPageClient
      data={data}
      columns={devToolColumns as ColumnDef<DevTool, unknown>[]}
      category="developer-tools"
    />
  );
}
