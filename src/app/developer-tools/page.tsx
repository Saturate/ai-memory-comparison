import { Suspense } from "react";
import { getDevTools } from "@/lib/data";
import { DevToolsTableClient } from "./client";

export const metadata = {
  title: "Developer Memory Tools — AI Memory Comparison",
  description:
    "Compare 16 persistent memory systems for AI coding assistants. MCP support, search, storage, dedup, cross-machine sync, and more.",
};

export default function DevToolsPage() {
  const data = getDevTools();

  return (
    <div className="px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          Developer Memory Tools
        </h1>
        <p className="text-sm text-muted-foreground">
          {data.length} memory systems for AI coding assistants. Click any row for details.
        </p>
      </div>
      <Suspense>
        <DevToolsTableClient data={data} />
      </Suspense>
    </div>
  );
}
