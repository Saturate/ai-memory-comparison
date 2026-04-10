# AI Memory Comparison

Interactive comparison of persistent memory systems for AI tools. Two categories, two different sets of concerns:

- **[Developer Tools](https://llm-memory.org/developer-tools)** — Memory for coding assistants (Claude Code, Cursor, etc). MCP support, search approaches, storage backends, dedup, cross-machine sync, token budgets.
- **[User Memory Platforms](https://llm-memory.org/user-memory)** — Memory for agents and chatbots (Mem0, Zep, Letta, Cognee). Pricing, SDKs, multi-tenancy, temporal graphs.

## How it works

Each memory system is a JSON file in the `data/` directory:

```
data/
├── developer-tools/
│   ├── husk.json
│   ├── claude-mem.json
│   └── ...
└── user-memory/
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

Each JSON file includes a `$schema` reference for editor validation. JSON Schemas are generated from the Zod source of truth at build time (`pnpm generate-schemas`):

- [`schemas/developer-tool.schema.json`](schemas/developer-tool.schema.json) — developer tools
- [`schemas/user-memory.schema.json`](schemas/user-memory.schema.json) — user memory platforms

Zod definitions: [`src/lib/types.ts`](src/lib/types.ts)

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## License

MIT
