# AI Memory Comparison

Interactive comparison of persistent memory systems for AI coding tools and user-facing agents. Each system is a JSON file validated against Zod schemas at build time, rendered into sortable/filterable tables at [llm-memory.org](https://llm-memory.org).

## Project structure

```
data/
├── developer-tools/    # Memory for coding assistants (Claude Code, Cursor, etc.)
└── user-memory/        # Memory for agents and chatbots (Mem0, Zep, Letta, etc.)
schemas/                # Generated JSON Schemas (do not edit directly)
src/lib/types.ts        # Zod source of truth for both schemas
```

## Quick reference

```bash
pnpm install
pnpm dev              # Start dev server (Next.js + Turbopack)
pnpm build            # Generate schemas + build (validates all JSON)
pnpm lint             # biome check .
```

## Adding or updating a system

1. Create or edit a JSON file in `data/developer-tools/` or `data/user-memory/`.
2. Set `$schema` to point at the matching schema file (e.g. `"../../schemas/developer-tool.schema.json"`).
3. Set `slug` to match the filename without `.json`.
4. Set `category` to match the subdirectory (`developer-tools` or `user-memory`).
5. Use an existing file as a template. Copy the structure, replace the values.
6. Run `pnpm lint` before committing. Biome enforces formatting (2-space indent, double quotes, trailing commas).
7. Run `pnpm build` to validate against the Zod schema.

### Field conventions

- `description`: one or two sentences summarizing the system. Keep it short; push detail into `*Detail` fields.
- `approach`: list concrete approach types (`vector`, `graph`, `keyword`, `hybrid`). `hybrid` already implies vector + keyword, so don't list all three.
- `search`: same principle as `approach`. `hybrid` subsumes `semantic` + `keyword`.
- `retention` / `duplicateDetection` / other enum-like arrays: check existing entries for consistent terminology before inventing new values.
- `*Detail` fields: where the nuance goes. Be specific and cite implementation details.
- `pros` / `cons`: be honest. Self-submissions that only list pros will be questioned.

### Naming collisions

If another system shares a similar name, add a `notes` field explaining the distinction.

## Working with GitHub PRs, Issues, and Comments

- **Open every PR with the repository template.** `gh pr create` does not apply `.github/pull_request_template.md` automatically, so read that file and pass its filled-in contents as the PR body (`--body`/`--body-file`). Keep every section (What, Sources, Checklist), fill them in for this change, mark the checklist items, and remove only the lines the template says are inapplicable.
- **Keep PR titles and descriptions current.** When pushing new changes to a PR, review the title and description and update them if they no longer accurately reflect what the PR does.
- **Reply to and resolve review conversations.** Once a review comment has been addressed, reply to the thread with a description of the resolution including the commit hash that fixed it, then mark the conversation as resolved.
- **Sign all agent-authored content.** When posting a comment, creating an issue, or opening a PR, append a footer to the message indicating that it was written by an agent. The footer must include the name of the agent and the name of the model used. Example:

    ```markdown
    ---
    Written by an agent (Claude Code, claude-opus-4-7).
    ```

## CI

Pull requests run two checks:

1. **Lint** — `biome check .` (formatting + lint rules)
2. **Build** — `pnpm build` (schema generation + Next.js build, which validates every JSON file against the Zod schemas)

Both must pass before merge.

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): description`.

- `data: add <tool-name>` for new entries (matches existing history)
- `fix:` / `style:` for corrections and formatting
- `feat:` for site features
- `chore:` / `ci:` for infrastructure
