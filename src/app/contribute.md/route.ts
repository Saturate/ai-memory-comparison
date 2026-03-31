import { markdownResponse, SITE_URL } from "@/lib/llm-txt";

const REPO = "https://github.com/Saturate/ai-memory-comparison";
const RAW = `${REPO}/blob/main`;

export async function GET() {
  const body = `# AI Contributing Guide

> Instructions for AI assistants to research an AI memory tool and submit it to [ai-memory-comparison](${SITE_URL}).
> Repo: ${REPO}

## Overview

This project compares AI memory systems across two categories:

1. **Developer Tools** — memory for coding assistants (Claude Code, Cursor, etc.). Stored in \`data/developer-tools/{slug}.json\`.
2. **User Memory Platforms** — memory APIs for chatbots and agents. Stored in \`data/user-memory/{slug}.json\`.

Each tool is a single JSON file validated against a schema. Your job: research the tool, fill the schema with evidence, and open a PR.

---

## Step 1: Identify the tool

Ask the user for:
- **Tool name** — the project name
- **Repo URL** — a GitHub/GitLab/etc. URL

If the user says "this repo" or similar, run:
\`\`\`sh
git remote get-url origin
\`\`\`

Then determine the category:
- If the tool is meant to be used by **developers inside coding assistants** (MCP servers, CLI tools, editor extensions) → \`developer-tools\`
- If the tool is a **platform/API for building AI apps** with user memory (SDKs, hosted APIs, multi-tenant) → \`user-memory\`

If unclear, ask the user.

---

## Step 2: Research

**Evidence hierarchy** (strongest to weakest):
1. Source code — actual implementations
2. README / docs — stated capabilities
3. Changelog / releases — recent additions
4. Marketing / website — treat with skepticism, verify in code

**What to look for:**
- Architecture: how does it store and retrieve memories?
- Dependencies: what databases, embedding models, etc.?
- Integration: MCP support? SDKs? Which tools/editors?
- Scoping: how are memories organized? Per-project, per-user, global?
- Search: vector/semantic, keyword, graph traversal?
- Unique features: dedup, TTL, token budgeting, multi-tenancy?

**For yes/no/partial fields:**
- \`"yes"\` — clearly implemented, found in source code or documented with examples
- \`"partial"\` — WIP, experimental, mentioned but incomplete
- \`"no"\` — absent from code and docs

---

## Step 3: Fill the schema

### Category: developer-tools

- **Schema:** [developer-tool.schema.json](${RAW}/schemas/developer-tool.schema.json)
- **Required fields:** \`slug\`, \`name\`, \`description\`, \`url\`, \`language\`, \`approach\`, \`category\`, \`search\`, \`storage\`, \`mcpSupport\`, \`toolSupport\`, \`scopes\`, \`duplicateDetection\`, \`retention\`, \`multiUser\`, \`crossMachine\`, \`webUi\`, \`tokenBudgeting\`, \`contextInjection\`, \`networkRequired\`, \`auditTrail\`

### Category: user-memory

- **Schema:** [user-memory.schema.json](${RAW}/schemas/user-memory.schema.json)
- **Required fields:** \`slug\`, \`name\`, \`description\`, \`url\`, \`language\`, \`approach\`, \`category\`, \`hosting\`, \`pricing\`, \`sdks\`, \`scopes\`, \`temporalAwareness\`, \`selfImproving\`, \`multiTenant\`, \`search\`, \`storage\`

### Field-by-field guide

| Field | How to fill |
|---|---|
| \`slug\` | Lowercase kebab-case of the tool name. This becomes the filename: \`{slug}.json\` |
| \`name\` | Display name exactly as the project uses it |
| \`tagline\` | Short phrase (under 10 words) clarifying what the tool is (e.g., "AI memory server with search and session tracking") |
| \`description\` | One sentence. What it does + what makes it different |
| \`url\` | Project homepage or repo URL |
| \`repo\` | GitHub/GitLab repo URL (optional if same as \`url\`) |
| \`purl\` | Package URL if published (\`pkg:npm/name\`, \`pkg:pypi/name\`, etc.) |
| \`license\` | SPDX identifier from repo (e.g., \`"MIT"\`, \`"Apache-2.0"\`) |
| \`language\` | Primary languages: \`["TypeScript"]\`, \`["Python"]\`, \`["Rust", "TypeScript"]\` |
| \`approach\` | Memory architecture: \`["vector"]\`, \`["graph"]\`, \`["key-value"]\`, \`["file-based"]\`, \`["vector", "graph"]\` |
| \`approachDetail\` | Brief explanation of the architecture |
| \`category\` | \`"developer-tools"\` or \`"user-memory"\` (must match file location) |
| \`search\` | Search methods: \`["semantic"]\`, \`["keyword"]\`, \`["graph"]\`, \`["semantic", "keyword"]\` |
| \`storage\` | Storage backends: \`["SQLite"]\`, \`["PostgreSQL"]\`, \`["local files"]\`, \`["cloud"]\` |
| \`*Detail\` fields | One-sentence clarification. Use \`null\` if the main field is self-explanatory |
| \`pros\` | 3-5 genuine strengths, sourced from code/docs |
| \`cons\` | 2-3 honest limitations |
| \`notes\` | Anything that doesn't fit elsewhere |

**Developer-tool specific fields:**

| Field | Values |
|---|---|
| \`mcpSupport\` | \`"yes"\` / \`"no"\` / \`"partial"\` — look for MCP server implementation |
| \`toolSupport\` | Which editors/tools: \`["Claude Code"]\`, \`["Cursor"]\`, \`["Any MCP client"]\` |
| \`scopes\` | Memory scoping: \`["session"]\`, \`["project"]\`, \`["global"]\`, \`["session", "project", "global"]\` |
| \`duplicateDetection\` | Dedup strategy: \`["semantic"]\`, \`["exact"]\`, \`["none"]\` |
| \`retention\` | Memory lifecycle: \`["manual"]\`, \`["per-scope TTL"]\`, \`["LRU"]\`, \`["permanent"]\` |
| \`multiUser\` | \`"yes"\` / \`"no"\` / \`"partial"\` |
| \`crossMachine\` | \`"yes"\` / \`"no"\` / \`"partial"\` — can memories sync across machines? |
| \`webUi\` | \`"yes"\` / \`"no"\` / \`"partial"\` — admin/management UI? |
| \`tokenBudgeting\` | How it limits context: \`["max_tokens"]\`, \`["top-k"]\`, \`["none"]\` |
| \`contextInjection\` | \`"auto"\` / \`"manual"\` / \`"file-based"\` — how context reaches the agent. Auto = hooks/built-in, manual = agent calls MCP tools, file-based = agent reads instruction files |
| \`networkRequired\` | \`"yes"\` / \`"no"\` / \`"partial"\` — can it work fully offline? |
| \`auditTrail\` | \`"yes"\` / \`"no"\` / \`"partial"\` — can you see how memory evolved over time? (event sourcing, version chains, etc.) |
| \`setupComplexity\` | \`"low"\` / \`"medium"\` / \`"high"\` |
| \`maturity\` | \`"experimental"\` / \`"alpha"\` / \`"beta"\` / \`"stable"\` / \`"mature"\` |

**User-memory specific fields:**

| Field | Values |
|---|---|
| \`hosting\` | \`["cloud"]\`, \`["self-hosted"]\`, \`["cloud", "self-hosted"]\` |
| \`pricing\` | \`"free"\`, \`"freemium"\`, \`"paid"\`, \`"open-source"\` |
| \`sdks\` | \`["Python"]\`, \`["TypeScript"]\`, \`["REST API"]\` |
| \`temporalAwareness\` | \`"yes"\` / \`"no"\` / \`"partial"\` — does it understand time/history? |
| \`selfImproving\` | \`"yes"\` / \`"no"\` / \`"partial"\` — does it consolidate/refine memories? |
| \`multiTenant\` | \`"yes"\` / \`"no"\` / \`"partial"\` — built for multi-tenant apps? |
| \`funding\` | Known funding info (e.g., \`"$24M Series A"\`) |

### File setup

1. Choose the filename: \`data/{category}/{slug}.json\`
2. Set \`"$schema"\` to the relative path to the schema:
   - Developer tools: \`"../../schemas/developer-tool.schema.json"\`
   - User memory: \`"../../schemas/user-memory.schema.json"\`

---

## Step 4: Check for missing dimensions

If the tool has a notable feature that no schema field captures:

1. **Do NOT modify the schema or add non-schema fields to the JSON.**
2. Instead, open a GitHub issue at ${REPO}/issues using this template:

\`\`\`markdown
Title: dimension: {field name}

## Dimension

{What capability or property should we track?}

**Proposed field name:** \`fieldName\`
**Type:** \`string\` / \`string[]\` / \`enum("yes","no","partial")\`
**Category:** developer-tools / user-memory / both

## Why it matters

{Why is this useful for comparing AI memory systems?}

## How existing tools differ

| Tool | Value |
|---|---|
| {Tool A} | {value} |
| {Tool B} | {value} |
\`\`\`

---

## Step 5: Create a PR

1. Fork ${REPO} (or create a branch if you have write access)
2. Create the JSON file in the correct \`data/\` subdirectory
3. Validate: run \`pnpm build\` — this runs schema generation and type checks
4. Open a PR using this template:

\`\`\`markdown
Title: data: add {tool name}

## What

Add {tool name} to {category}.

## Sources

- \`approach\`: {link to code/docs showing architecture}
- \`mcpSupport\`: {link to MCP server implementation}
- \`search\`: {link to search implementation}
- {... one line per non-obvious field}

## Checklist

- [ ] JSON file is in the correct \`data/\` subdirectory
- [ ] \`$schema\` path is set
- [ ] \`category\` matches file location
- [ ] \`pnpm build\` passes
- [ ] \`slug\` matches filename (without \`.json\`)
\`\`\`

---

## Re-evaluating existing tools

If updating an existing entry:

1. Read the current JSON file
2. Check the tool's repo for recent changes (releases, commits, new features)
3. Compare each field against current state
4. Update fields with sources for any changes
5. PR title: \`data: update {tool name}\` with changelog in description

---

## Full example: developer tool

See [data/developer-tools/husk.json](${RAW}/data/developer-tools/husk.json)

## Full example: user memory platform

See [data/user-memory/mem0.json](${RAW}/data/user-memory/mem0.json)
`;

  return markdownResponse(body);
}
