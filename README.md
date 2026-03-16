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

### Schemas

Both categories have their own Zod schema — see [`src/lib/types.ts`](src/lib/types.ts) for the full definitions:

- [`DevToolSchema`](src/lib/types.ts) — developer tools (MCP, search, storage, dedup, retention, etc.)
- [`UserMemorySchema`](src/lib/types.ts) — user memory platforms (hosting, pricing, SDKs, temporal awareness, etc.)

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
