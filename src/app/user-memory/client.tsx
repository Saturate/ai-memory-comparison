"use client";

import type { UserMemory } from "@/lib/types";
import { userMemoryColumns } from "@/lib/columns-user";
import { ComparisonPageClient } from "@/components/comparison-page-client";
import type { ColumnDef } from "@tanstack/react-table";

export function UserMemoryTableClient({ data }: { data: UserMemory[] }) {
  return (
    <ComparisonPageClient
      data={data}
      columns={userMemoryColumns as ColumnDef<UserMemory, unknown>[]}
      category="user-memory"
    />
  );
}
