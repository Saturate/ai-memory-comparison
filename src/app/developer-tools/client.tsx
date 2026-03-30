"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ComparisonPageClient } from "@/components/comparison-page-client";
import { devToolColumns } from "@/lib/columns-dev";
import type { EnrichedSystem } from "@/lib/types";

export function DevToolsTableClient({ data }: { data: EnrichedSystem[] }) {
  return (
    <ComparisonPageClient
      data={data}
      columns={devToolColumns as ColumnDef<EnrichedSystem, unknown>[]}
      category="developer-tools"
    />
  );
}
