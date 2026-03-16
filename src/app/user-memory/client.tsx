"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ComparisonPageClient } from "@/components/comparison-page-client";
import { userMemoryColumns } from "@/lib/columns-user";
import type { MemorySystem, UserMemory } from "@/lib/types";

export function UserMemoryTableClient({ data }: { data: UserMemory[] }) {
  return (
    <ComparisonPageClient
      data={data}
      columns={userMemoryColumns as ColumnDef<MemorySystem, unknown>[]}
      category="user-memory"
    />
  );
}
