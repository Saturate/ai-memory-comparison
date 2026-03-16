import { z } from "zod/v4";

const YesNoPartial = z.enum(["yes", "no", "partial"]);

const Maturity = z.enum(["experimental", "alpha", "beta", "stable", "mature"]);

const SetupComplexity = z.enum(["low", "medium", "high"]);

const BaseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  url: z.url(),
  repo: z.url().optional(),
  license: z.string().optional(),
  language: z.array(z.string()),
  approach: z.array(z.string()),
  approachDetail: z.string().optional(),
  notes: z.string().optional(),
});

export const DevToolSchema = BaseSchema.extend({
  category: z.literal("developer-tools"),
  search: z.array(z.string()),
  searchDetail: z.string().optional(),
  storage: z.array(z.string()),
  storageDetail: z.string().optional(),
  mcpSupport: YesNoPartial,
  mcpDetail: z.string().optional(),
  toolSupport: z.array(z.string()),
  toolSupportDetail: z.string().optional(),
  scopes: z.array(z.string()),
  scopesDetail: z.string().optional(),
  duplicateDetection: z.array(z.string()),
  duplicateDetail: z.string().optional(),
  retention: z.array(z.string()),
  retentionDetail: z.string().optional(),
  multiUser: YesNoPartial,
  multiUserDetail: z.string().optional(),
  crossMachine: YesNoPartial,
  crossMachineDetail: z.string().optional(),
  webUi: YesNoPartial,
  webUiDetail: z.string().optional(),
  tokenBudgeting: z.array(z.string()),
  tokenBudgetingDetail: z.string().optional(),
  setupComplexity: SetupComplexity.optional(),
  maturity: Maturity.optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
});

export const UserMemorySchema = BaseSchema.extend({
  category: z.literal("user-memory"),
  hosting: z.array(z.string()),
  hostingDetail: z.string().optional(),
  pricing: z.string(),
  pricingDetail: z.string().optional(),
  sdks: z.array(z.string()),
  sdksDetail: z.string().optional(),
  scopes: z.array(z.string()),
  scopesDetail: z.string().optional(),
  temporalAwareness: YesNoPartial,
  temporalDetail: z.string().optional(),
  selfImproving: YesNoPartial,
  selfImprovingDetail: z.string().optional(),
  multiTenant: YesNoPartial,
  multiTenantDetail: z.string().optional(),
  search: z.array(z.string()),
  searchDetail: z.string().optional(),
  storage: z.array(z.string()),
  storageDetail: z.string().optional(),
  githubStars: z.string().optional(),
  funding: z.string().optional(),
  pros: z.array(z.string()).optional(),
  cons: z.array(z.string()).optional(),
});

export type DevTool = z.infer<typeof DevToolSchema>;
export type UserMemory = z.infer<typeof UserMemorySchema>;
export type MemorySystem = DevTool | UserMemory;
