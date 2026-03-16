# AI Memory Comparison

Interactive comparison of persistent memory systems for AI tools. Two categories, two different sets of concerns:

- **[Developer Tools](https://ai-memory-comparison.vercel.app/developer-tools)** — Memory for coding assistants (Claude Code, Cursor, etc). MCP support, search approaches, storage backends, dedup, cross-machine sync, token budgets.
- **[User Memory Platforms](https://ai-memory-comparison.vercel.app/user-memory)** — Memory for agents and chatbots (Mem0, Zep, Letta, Cognee). Pricing, SDKs, multi-tenancy, temporal graphs.

## How it works

Each memory system is a JSON file in the `data/` directory:

```
data/
├── developer-tools/    # 16 systems
│   ├── husk.json
│   ├── claude-mem.json
│   └── ...
└── user-memory/        # 4 platforms
    ├── mem0.json
    ├── zep.json
    └── ...
```

Files are validated at build time with Zod schemas defined in `src/lib/types.ts`. The site renders them into interactive TanStack Tables with sorting, filtering, column toggling, and shareable URL state.

## Contributing

### Add a new system

1. Create a JSON file in `data/developer-tools/` or `data/user-memory/`
2. Follow the schema — look at any existing file as a template
3. Open a PR

The build will validate your JSON against the Zod schema automatically.

### Update existing data

Edit the relevant JSON file and submit a PR. Include a source link for any claims.

### Schema overview

**Developer tools** (`data/developer-tools/*.json`):

| Field | Type | Description |
|---|---|---|
| `slug` | string | URL-safe identifier |
| `name` | string | Display name |
| `description` | string | One paragraph |
| `url` | string | Homepage or repo URL |
| `category` | `"developer-tools"` | Always this value |
| `language` | string[] | Implementation language(s) |
| `approach` | string[] | Memory architecture |
| `search` | string[] | Retrieval methods |
| `storage` | string[] | Backing store(s) |
| `mcpSupport` | `"yes"` \| `"no"` \| `"partial"` | MCP integration |
| `scopes` | string[] | Memory organization |
| `duplicateDetection` | string[] | Dedup strategy |
| `retention` | string[] | TTL / expiry approach |
| `multiUser` | `"yes"` \| `"no"` \| `"partial"` | Multi-user support |
| `crossMachine` | `"yes"` \| `"no"` \| `"partial"` | Cross-machine access |
| `webUi` | `"yes"` \| `"no"` \| `"partial"` | Browser UI |
| `tokenBudgeting` | string[] | Context budget control |
| `toolSupport` | string[] | Compatible tools |

Most fields have an optional `*Detail` companion (e.g. `mcpDetail`) for tooltip text.

**User memory platforms** (`data/user-memory/*.json`) use a different schema focused on hosting, pricing, SDKs, temporal awareness, and multi-tenancy. See `src/lib/types.ts` for the full definition.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- [Next.js 16](https://nextjs.org/) with App Router
- [TanStack Table v8](https://tanstack.com/table) — sorting, filtering, column visibility
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Zod](https://zod.dev/) — runtime JSON validation
- [next-themes](https://github.com/pacocoursey/next-themes) — dark/light mode
- TypeScript (strict)

## License

MIT
