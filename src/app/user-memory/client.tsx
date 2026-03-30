"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ComparisonPageClient } from "@/components/comparison-page-client";
import { userMemoryColumns } from "@/lib/columns-user";
import type { EnrichedSystem } from "@/lib/types";

export function UserMemoryTableClient({ data }: { data: EnrichedSystem[] }) {
  return (
    <ComparisonPageClient
      data={data}
      columns={userMemoryColumns as ColumnDef<EnrichedSystem, unknown>[]}
      category="user-memory"
    />
  );
}
