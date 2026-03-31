import fs from "node:fs";
import path from "node:path";
import { z } from "zod/v4";
import { DevToolSchema, UserMemorySchema } from "../src/lib/types";

const schemasDir = path.join(process.cwd(), "schemas");

function writeSchema(
  filename: string,
  schema: z.ZodType,
  meta: { title: string; description: string },
) {
  const jsonSchema = z.toJSONSchema(schema, {
    target: "draft-2020-12",
  });

  // Add metadata
  const output = {
    ...jsonSchema,
    $id: `https://github.com/Saturate/ai-memory-comparison/schemas/${filename}`,
    title: meta.title,
    description: meta.description,
  };

  fs.writeFileSync(
    path.join(schemasDir, filename),
    `${JSON.stringify(output, null, 2)}\n`,
  );

  console.log(`Generated schemas/${filename}`);
}

fs.mkdirSync(schemasDir, { recursive: true });

writeSchema("developer-tool.schema.json", DevToolSchema, {
  title: "Developer Tool",
  description:
    "Schema for AI developer memory tool entries in data/developer-tools/",
});

writeSchema("user-memory.schema.json", UserMemorySchema, {
  title: "User Memory Platform",
  description:
    "Schema for AI user memory platform entries in data/user-memory/",
});
