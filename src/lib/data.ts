import fs from "node:fs";
import path from "node:path";
import type { DevTool, UserMemory } from "./types";
import { DevToolSchema, UserMemorySchema } from "./types";

function loadJsonFiles<T extends { name: string }>(
  dir: string,
  schema: { parse: (data: unknown) => T },
): T[] {
  const dataDir = path.join(process.cwd(), "data", dir);
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  return files
    .map((file) => {
      const raw = JSON.parse(
        fs.readFileSync(path.join(dataDir, file), "utf-8"),
      );
      // Strip null values and $schema — Zod v4 doesn't coerce null to undefined for optional fields
      const cleaned = Object.fromEntries(
        Object.entries(raw).filter(([k, v]) => v !== null && k !== "$schema"),
      );
      return schema.parse(cleaned);
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getDevTools(): DevTool[] {
  return loadJsonFiles("developer-tools", DevToolSchema);
}

export function getUserMemory(): UserMemory[] {
  return loadJsonFiles("user-memory", UserMemorySchema);
}

export function getAllSystems(): (DevTool | UserMemory)[] {
  return [...getDevTools(), ...getUserMemory()];
}
