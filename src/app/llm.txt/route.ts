import { getDevTools, getUserMemory } from "@/lib/data";
import { markdownResponse, SITE_URL } from "@/lib/llm-txt";

export async function GET() {
  const devTools = getDevTools();
  const userMemory = getUserMemory();

  const body = `# AI Memory Comparison

> Every AI memory system, compared.
> Interactive comparison tables for persistent memory in coding assistants, agents, and chatbots.
> Source: ${SITE_URL}

## Sections

- [Developer Memory Tools](${SITE_URL}/developer-tools/llm.txt): ${devTools.length} memory systems for AI coding assistants — MCP support, search, storage, dedup, cross-machine sync, token budgets.
- [User Memory Platforms](${SITE_URL}/user-memory/llm.txt): ${userMemory.length} memory platforms for AI agents and chatbots — pricing, SDKs, multi-tenancy, temporal knowledge graphs.

## Contributing

This is an open-source comparison maintained by the community.
Each memory system is a JSON file in the \`data/\` directory — easy to add, easy to update.

- **Add a system:** Create a new JSON file in \`data/developer-tools/\` or \`data/user-memory/\` and open a PR. The schema validates automatically.
- **Update the data:** Edit the relevant JSON file and submit a PR. Include a source link for any claims.
- **AI Contributing Guide:** [contribute.md](${SITE_URL}/contribute.md) — instructions for AI assistants to research and submit tools
- **Repo:** https://github.com/Saturate/ai-memory-comparison
`;

  return markdownResponse(body);
}
