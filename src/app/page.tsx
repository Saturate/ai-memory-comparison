import Link from "next/link";
import { CopyPrompt } from "@/components/copy-prompt";

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold font-mono tracking-tight text-foreground">
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="grid-bg grid-bg-fade absolute inset-0 opacity-40 dark:opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[12px] font-mono text-muted-foreground mb-6">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Open source &middot; Community maintained
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              Every AI memory system,{" "}
              <span className="text-primary">compared.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Interactive comparison tables for persistent memory in coding
              assistants, agents, and chatbots. Filter, sort, and compare side
              by side.
            </p>
          </div>

          <div className="flex items-center gap-8 mt-10 pt-8 border-t border-border/60 max-w-md">
            <StatBlock value="16" label="Dev tools" />
            <div className="h-8 w-px bg-border" />
            <StatBlock value="4" label="Platforms" />
            <div className="h-8 w-px bg-border" />
            <StatBlock value="20+" label="Dimensions" />
          </div>
        </div>
      </div>

      {/* Category cards */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid gap-4 sm:grid-cols-2 stagger-in">
          <Link
            href="/developer-tools"
            className="group relative rounded-xl border border-border bg-card p-6 sm:p-8 transition-all hover:border-primary/40 hover:shadow-[0_0_0_1px_var(--color-primary)]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-mono text-sm font-bold">
                {"</>"}
              </div>
              <span className="font-mono text-[11px] text-muted-foreground border border-border rounded-full px-2 py-0.5">
                16 systems
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              Developer Tools
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Memory for coding assistants. MCP integration, vector vs graph
              search, cross-machine sync, token budgets, dedup strategies.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                "MCP",
                "Search",
                "Storage",
                "Dedup",
                "Retention",
                "Multi-user",
              ].map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>

          <Link
            href="/user-memory"
            className="group relative rounded-xl border border-border bg-card p-6 sm:p-8 transition-all hover:border-primary/40 hover:shadow-[0_0_0_1px_var(--color-primary)]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground font-mono text-sm font-bold">
                {"{ }"}
              </div>
              <span className="font-mono text-[11px] text-muted-foreground border border-border rounded-full px-2 py-0.5">
                4 platforms
              </span>
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              User Memory Platforms
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Memory for agents and chatbots. Pricing, SDKs, multi-tenancy,
              temporal knowledge graphs, self-improving memory.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Hosting", "Pricing", "SDKs", "Temporal", "Multi-tenant"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
            <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* Contributing section */}
        <div className="mt-16 border-t border-border pt-12">
          <div className="max-w-2xl">
            <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Contributing
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              This is an open-source comparison maintained by the community.
              Each memory system is a JSON file in the{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">
                data/
              </code>{" "}
              directory — easy to add, easy to update.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 stagger-in">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-success/10 text-success">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Add a system</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Create a new JSON file in{" "}
                <code className="text-xs font-mono bg-muted rounded px-1 py-0.5">
                  data/developer-tools/
                </code>{" "}
                or{" "}
                <code className="text-xs font-mono bg-muted rounded px-1 py-0.5">
                  data/user-memory/
                </code>{" "}
                and open a PR. The schema validates automatically.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Update the data</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Found outdated info? Edit the relevant JSON file and submit a
                PR. Include a source link for any claims.
              </p>
            </div>

            <div className="sm:col-span-2 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/[0.03] to-transparent p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-sm">Contribute with AI</h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Let your AI assistant research a tool, fill the schema, and
                    open a PR. Copy this prompt into Claude Code, Cursor, or any
                    coding agent.
                  </p>
                  <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
                    <span className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        1
                      </span>
                      Copy prompt
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        2
                      </span>
                      Paste in AI tool
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                        3
                      </span>
                      Review PR
                    </span>
                  </div>
                </div>
                <CopyPrompt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
