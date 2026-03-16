/**
 * Color assignments for chip values. Each color pair is [light, dark] using
 * Tailwind utility classes. Values not listed fall back to the default muted style.
 *
 * Colors are grouped semantically — e.g. all vector/embedding concepts share
 * violet, graph concepts share cyan, file-based concepts share stone, etc.
 */

type ColorPair = { bg: string; text: string };

const violet: ColorPair = {
  bg: "bg-violet-50 dark:bg-violet-950/30",
  text: "text-violet-600 dark:text-violet-400/80",
};
const cyan: ColorPair = {
  bg: "bg-cyan-50 dark:bg-cyan-950/30",
  text: "text-cyan-600 dark:text-cyan-400/80",
};
const amber: ColorPair = {
  bg: "bg-amber-50 dark:bg-amber-950/30",
  text: "text-amber-600 dark:text-amber-400/80",
};
const emerald: ColorPair = {
  bg: "bg-emerald-50 dark:bg-emerald-950/30",
  text: "text-emerald-600 dark:text-emerald-400/80",
};
const rose: ColorPair = {
  bg: "bg-rose-50 dark:bg-rose-950/30",
  text: "text-rose-600 dark:text-rose-400/80",
};
const sky: ColorPair = {
  bg: "bg-sky-50 dark:bg-sky-950/30",
  text: "text-sky-600 dark:text-sky-400/80",
};
const orange: ColorPair = {
  bg: "bg-orange-50 dark:bg-orange-950/30",
  text: "text-orange-600 dark:text-orange-400/80",
};
const lime: ColorPair = {
  bg: "bg-lime-50 dark:bg-lime-950/30",
  text: "text-lime-600 dark:text-lime-400/80",
};
const fuchsia: ColorPair = {
  bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  text: "text-fuchsia-600 dark:text-fuchsia-400/80",
};
const stone: ColorPair = {
  bg: "bg-stone-100 dark:bg-stone-800/30",
  text: "text-stone-500 dark:text-stone-400/80",
};
const indigo: ColorPair = {
  bg: "bg-indigo-50 dark:bg-indigo-950/30",
  text: "text-indigo-600 dark:text-indigo-400/80",
};
const teal: ColorPair = {
  bg: "bg-teal-50 dark:bg-teal-950/30",
  text: "text-teal-600 dark:text-teal-400/80",
};

const colorMap: Record<string, ColorPair> = {
  // -- approach --
  vector: violet,
  graph: cyan,
  "knowledge graph": cyan,
  "temporal knowledge graph": cyan,
  hybrid: amber,
  "file-based": stone,
  "document index": stone,
  "content-addressed": stone,
  "cloud-managed": sky,
  "client-side tool": orange,
  "OS-style memory tiers": indigo,
  FTS: emerald,
  reranking: fuchsia,

  // -- search --
  semantic: violet,
  keyword: emerald,
  fuzzy: amber,
  "graph traversal": cyan,

  // -- storage --
  SQLite: emerald,
  PostgreSQL: indigo,
  Neo4j: cyan,
  ChromaDB: violet,
  Qdrant: violet,
  "plain files": stone,
  "markdown files": stone,
  "blob store": stone,
  cloud: sky,
  "self-hosted": teal,
  "bring your own": amber,

  // -- scopes --
  global: sky,
  project: indigo,
  session: amber,
  user: rose,
  agent: fuchsia,
  "per-agent": fuchsia,
  "per-agent KB": fuchsia,

  // -- dedup --
  "content hash": emerald,
  "entity resolution": cyan,
  "AI synthesis": violet,
  "AI compression": violet,
  "LLM reflection": violet,
  consolidation: amber,
  "contradiction detection": rose,
  supersede: orange,

  // -- retention --
  "per-scope TTL": amber,
  "auto-expiry": orange,
  "importance decay": fuchsia,
  "decay scoring": fuchsia,
  "temporal tracking": cyan,

  // -- token budgeting --
  max_tokens: emerald,
  "configurable limits": amber,
  "progressive disclosure": violet,

  // -- language --
  TypeScript: sky,
  Python: amber,
  Go: cyan,
  "C++": rose,
  Shell: stone,
  "Cloud service": indigo,
  Proprietary: stone,

  // -- SDKs --
  "REST API": emerald,
  LangChain: violet,

  // -- tool support --
  "Claude Code": orange,
  "Claude Desktop": orange,
  "Claude.ai": orange,
  "Any MCP client": amber,
  "Any Claude API client": amber,
  CLI: stone,
  Web: sky,
  Desktop: indigo,
  Mobile: fuchsia,
  LangGraph: violet,
  CrewAI: teal,
  AutoGen: lime,
};

export function getChipColor(value: string): string | undefined {
  const pair = colorMap[value];
  if (!pair) return undefined;
  return `${pair.bg} ${pair.text}`;
}
