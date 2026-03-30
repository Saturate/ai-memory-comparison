import Link from "next/link";
import { ComparisonCards } from "@/components/comparison-cards";
import { getAllSystems } from "@/lib/data";
import { fetchAllEnrichments } from "@/lib/enrichments";

export const metadata = {
  title: "Compare — AI Memory Comparison",
  description: "Side-by-side comparison of AI memory systems.",
};

interface ComparePageProps {
  searchParams: Promise<{ systems?: string; category?: string }>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const params = await searchParams;
  const slugs = params.systems?.split(",").filter(Boolean) ?? [];

  if (slugs.length < 2) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Compare</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Select 2-4 systems from the{" "}
          <Link
            href="/developer-tools"
            className="text-primary hover:underline font-medium"
          >
            developer tools
          </Link>{" "}
          or{" "}
          <Link
            href="/user-memory"
            className="text-primary hover:underline font-medium"
          >
            user memory
          </Link>{" "}
          table to compare side by side.
        </p>
      </div>
    );
  }

  const all = getAllSystems();
  const selected = slugs
    .map((slug) => all.find((s) => s.slug === slug))
    .filter(Boolean) as typeof all;

  if (selected.length < 2) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Compare</h1>
        <p className="text-sm text-muted-foreground">
          Could not find the requested systems.
        </p>
      </div>
    );
  }

  const enrichments = await fetchAllEnrichments(selected);
  const enriched = selected.map((s) => ({
    ...s,
    enrichment: enrichments[s.slug],
  }));

  const backHref =
    params.category === "user-memory" ? "/user-memory" : "/developer-tools";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link
          href={backHref}
          className="text-[12px] font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </Link>
        <div className="h-4 w-px bg-border" />
        <h1 className="text-lg font-bold tracking-tight">
          {selected.map((s) => s.name).join(" vs ")}
        </h1>
      </div>
      <ComparisonCards systems={enriched} />
    </div>
  );
}
