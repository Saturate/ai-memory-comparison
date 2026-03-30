import { connection } from "next/server";
import { getUserMemory } from "@/lib/data";
import { fetchAllEnrichments } from "@/lib/enrichments";
import { UserMemoryTableClient } from "./client";

export const metadata = {
  title: "User Memory Platforms — AI Memory Comparison",
  description:
    "Compare agent and chatbot memory platforms. Mem0, Zep, Letta, Cognee — pricing, SDKs, temporal awareness, and more.",
};

export default async function UserMemoryPage() {
  await connection();
  const data = getUserMemory();
  const enrichments = await fetchAllEnrichments(data);

  return (
    <div className="px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          User Memory Platforms
        </h1>
        <p className="text-sm text-muted-foreground">
          {data.length} memory platforms for AI agents and chatbots. Click any
          row for details.
        </p>
      </div>
      <UserMemoryTableClient
        data={data.map((d) => ({ ...d, enrichment: enrichments[d.slug] }))}
      />
    </div>
  );
}
