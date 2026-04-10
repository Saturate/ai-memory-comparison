import type { DevTool, UserMemory } from "./types";

const SITE_URL = "https://llm-memory.org";

function fmt(value: string | string[]): string {
  return Array.isArray(value) ? value.join(", ") : value;
}

export function renderDevTool(tool: DevTool): string {
  const lines = [
    `### ${tool.name}`,
    tool.description ? `> ${tool.description}` : null,
    `- **URL:** ${tool.url}`,
    tool.repo ? `- **Repo:** ${tool.repo}` : null,
    tool.license ? `- **License:** ${tool.license}` : null,
    `- **Approach:** ${fmt(tool.approach)}`,
    tool.approachDetail
      ? `- **Approach detail:** ${tool.approachDetail}`
      : null,
    `- **Search:** ${fmt(tool.search)}`,
    tool.searchDetail ? `- **Search detail:** ${tool.searchDetail}` : null,
    `- **Storage:** ${fmt(tool.storage)}`,
    tool.storageDetail ? `- **Storage detail:** ${tool.storageDetail}` : null,
    `- **MCP:** ${tool.mcpSupport}`,
    tool.mcpDetail ? `- **MCP detail:** ${tool.mcpDetail}` : null,
    `- **Scopes:** ${fmt(tool.scopes)}`,
    tool.scopesDetail ? `- **Scopes detail:** ${tool.scopesDetail}` : null,
    `- **Dedup:** ${fmt(tool.duplicateDetection)}`,
    tool.duplicateDetail ? `- **Dedup detail:** ${tool.duplicateDetail}` : null,
    `- **Retention:** ${fmt(tool.retention)}`,
    tool.retentionDetail
      ? `- **Retention detail:** ${tool.retentionDetail}`
      : null,
    `- **Multi-user:** ${tool.multiUser}`,
    tool.multiUserDetail
      ? `- **Multi-user detail:** ${tool.multiUserDetail}`
      : null,
    `- **Cross-machine:** ${tool.crossMachine}`,
    tool.crossMachineDetail
      ? `- **Cross-machine detail:** ${tool.crossMachineDetail}`
      : null,
    `- **Web UI:** ${tool.webUi}`,
    tool.webUiDetail ? `- **Web UI detail:** ${tool.webUiDetail}` : null,
    `- **Token budgeting:** ${fmt(tool.tokenBudgeting)}`,
    tool.tokenBudgetingDetail
      ? `- **Token budgeting detail:** ${tool.tokenBudgetingDetail}`
      : null,
    `- **Tool support:** ${fmt(tool.toolSupport)}`,
    tool.toolSupportDetail
      ? `- **Tool support detail:** ${tool.toolSupportDetail}`
      : null,
    `- **Language:** ${fmt(tool.language)}`,
    tool.setupComplexity
      ? `- **Setup complexity:** ${tool.setupComplexity}`
      : null,
    tool.maturity ? `- **Maturity:** ${tool.maturity}` : null,
    tool.pros ? `- **Pros:** ${tool.pros.join("; ")}` : null,
    tool.cons ? `- **Cons:** ${tool.cons.join("; ")}` : null,
    tool.notes ? `- **Notes:** ${tool.notes}` : null,
  ];

  return lines.filter(Boolean).join("\n");
}

export function renderUserMemory(platform: UserMemory): string {
  const lines = [
    `### ${platform.name}`,
    platform.description ? `> ${platform.description}` : null,
    `- **URL:** ${platform.url}`,
    platform.repo ? `- **Repo:** ${platform.repo}` : null,
    platform.license ? `- **License:** ${platform.license}` : null,
    `- **Approach:** ${fmt(platform.approach)}`,
    platform.approachDetail
      ? `- **Approach detail:** ${platform.approachDetail}`
      : null,
    `- **Hosting:** ${fmt(platform.hosting)}`,
    platform.hostingDetail
      ? `- **Hosting detail:** ${platform.hostingDetail}`
      : null,
    `- **Pricing:** ${platform.pricing}`,
    platform.pricingDetail
      ? `- **Pricing detail:** ${platform.pricingDetail}`
      : null,
    `- **SDKs:** ${fmt(platform.sdks)}`,
    platform.sdksDetail ? `- **SDKs detail:** ${platform.sdksDetail}` : null,
    `- **Scopes:** ${fmt(platform.scopes)}`,
    platform.scopesDetail
      ? `- **Scopes detail:** ${platform.scopesDetail}`
      : null,
    `- **Search:** ${fmt(platform.search)}`,
    platform.searchDetail
      ? `- **Search detail:** ${platform.searchDetail}`
      : null,
    `- **Storage:** ${fmt(platform.storage)}`,
    platform.storageDetail
      ? `- **Storage detail:** ${platform.storageDetail}`
      : null,
    `- **Temporal awareness:** ${platform.temporalAwareness}`,
    platform.temporalDetail
      ? `- **Temporal detail:** ${platform.temporalDetail}`
      : null,
    `- **Self-improving:** ${platform.selfImproving}`,
    platform.selfImprovingDetail
      ? `- **Self-improving detail:** ${platform.selfImprovingDetail}`
      : null,
    `- **Multi-tenant:** ${platform.multiTenant}`,
    platform.multiTenantDetail
      ? `- **Multi-tenant detail:** ${platform.multiTenantDetail}`
      : null,
    `- **Language:** ${fmt(platform.language)}`,
    platform.funding ? `- **Funding:** ${platform.funding}` : null,
    platform.pros ? `- **Pros:** ${platform.pros.join("; ")}` : null,
    platform.cons ? `- **Cons:** ${platform.cons.join("; ")}` : null,
    platform.notes ? `- **Notes:** ${platform.notes}` : null,
  ];

  return lines.filter(Boolean).join("\n");
}

export function markdownResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

export { SITE_URL };
