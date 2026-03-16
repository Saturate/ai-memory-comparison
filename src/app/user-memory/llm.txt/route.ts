import { getUserMemory } from "@/lib/data";
import { SITE_URL, renderUserMemory, markdownResponse } from "@/lib/llm-txt";

export async function GET() {
  const userMemory = getUserMemory();

  const body = [
    "# User Memory Platforms",
    "",
    `> ${userMemory.length} memory platforms for AI agents and chatbots.`,
    `> Source: ${SITE_URL}/user-memory`,
    "",
    userMemory.map(renderUserMemory).join("\n\n"),
    "",
  ].join("\n");

  return markdownResponse(body);
}
