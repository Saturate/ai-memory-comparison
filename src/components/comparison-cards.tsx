import { formatStars } from "@/lib/format";
import type {
  DevTool,
  EnrichedSystem,
  MemorySystem,
  UserMemory,
} from "@/lib/types";
import { Badge } from "./badge";
import { ChipList } from "./chip-list";

function isDevTool(system: MemorySystem): system is DevTool {
  return system.category === "developer-tools";
}

function isUserMemory(system: MemorySystem): system is UserMemory {
  return system.category === "user-memory";
}

interface ComparisonCardsProps {
  systems: MemorySystem[];
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-2.5 border-b border-border/60 last:border-0">
      <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

function SystemCard({ system }: { system: MemorySystem }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 min-w-[280px] flex-1">
      <div className="mb-4 pb-4 border-b border-border">
        <a
          href={system.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold text-primary hover:underline"
        >
          {system.name}
        </a>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          {system.description}
        </p>
      </div>

      {(() => {
        const stars = (system as EnrichedSystem).enrichment?.githubStars;
        return stars != null ? (
          <Field label="Stars">
            <span className="text-sm font-mono">★ {formatStars(stars)}</span>
          </Field>
        ) : null;
      })()}
      <Field label="Approach">
        <ChipList items={system.approach} detail={system.approachDetail} />
      </Field>
      <Field label="Language">
        <ChipList items={system.language} />
      </Field>
      {system.license && (
        <Field label="License">
          <span className="text-sm font-mono">{system.license}</span>
        </Field>
      )}

      {isDevTool(system) && (
        <>
          <Field label="Search">
            <ChipList items={system.search} detail={system.searchDetail} />
          </Field>
          <Field label="Storage">
            <ChipList items={system.storage} detail={system.storageDetail} />
          </Field>
          <Field label="MCP Support">
            <Badge value={system.mcpSupport} detail={system.mcpDetail} />
          </Field>
          <Field label="Scopes">
            <ChipList items={system.scopes} detail={system.scopesDetail} />
          </Field>
          <Field label="Dedup">
            <ChipList
              items={system.duplicateDetection}
              detail={system.duplicateDetail}
            />
          </Field>
          <Field label="Retention">
            <ChipList
              items={system.retention}
              detail={system.retentionDetail}
            />
          </Field>
          <Field label="Multi-user">
            <Badge value={system.multiUser} detail={system.multiUserDetail} />
          </Field>
          <Field label="Cross-machine">
            <Badge
              value={system.crossMachine}
              detail={system.crossMachineDetail}
            />
          </Field>
          <Field label="Web UI">
            <Badge value={system.webUi} detail={system.webUiDetail} />
          </Field>
          <Field label="Token Budget">
            <ChipList
              items={system.tokenBudgeting}
              detail={system.tokenBudgetingDetail}
            />
          </Field>
        </>
      )}

      {isUserMemory(system) && (
        <>
          <Field label="Hosting">
            <ChipList items={system.hosting} detail={system.hostingDetail} />
          </Field>
          <Field label="Pricing">
            <Badge value={system.pricing} detail={system.pricingDetail} />
          </Field>
          <Field label="SDKs">
            <ChipList items={system.sdks} detail={system.sdksDetail} />
          </Field>
          <Field label="Scopes">
            <ChipList items={system.scopes} detail={system.scopesDetail} />
          </Field>
          <Field label="Temporal">
            <Badge
              value={system.temporalAwareness}
              detail={system.temporalDetail}
            />
          </Field>
          <Field label="Self-improving">
            <Badge
              value={system.selfImproving}
              detail={system.selfImprovingDetail}
            />
          </Field>
          <Field label="Multi-tenant">
            <Badge
              value={system.multiTenant}
              detail={system.multiTenantDetail}
            />
          </Field>
          <Field label="Search">
            <ChipList items={system.search} detail={system.searchDetail} />
          </Field>
          <Field label="Storage">
            <ChipList items={system.storage} detail={system.storageDetail} />
          </Field>
        </>
      )}

      {system.pros && system.pros.length > 0 && (
        <Field label="Strengths">
          <ul className="space-y-1">
            {system.pros.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-emerald-500 shrink-0">+</span>
                {p}
              </li>
            ))}
          </ul>
        </Field>
      )}
      {system.cons && system.cons.length > 0 && (
        <Field label="Tradeoffs">
          <ul className="space-y-1">
            {system.cons.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                <span className="text-red-400 shrink-0">-</span>
                {c}
              </li>
            ))}
          </ul>
        </Field>
      )}
    </div>
  );
}

export function ComparisonCards({ systems }: ComparisonCardsProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 stagger-in">
      {systems.map((system) => (
        <SystemCard key={system.slug} system={system} />
      ))}
    </div>
  );
}
