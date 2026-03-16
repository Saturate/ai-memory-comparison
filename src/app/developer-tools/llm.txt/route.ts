import { getDevTools } from "@/lib/data";
import { SITE_URL, renderDevTool, markdownResponse } from "@/lib/llm-txt";

export async function GET() {
  const devTools = getDevTools();

  const body = [
    "# Developer Memory Tools",
    "",
    `> ${devTools.length} memory systems for AI coding assistants.`,
    `> Source: ${SITE_URL}/developer-tools`,
    "",
    devTools.map(renderDevTool).join("\n\n"),
    "",
  ].join("\n");

  return markdownResponse(body);
}
