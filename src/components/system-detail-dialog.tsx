"use client";

import { useEffect, useRef } from "react";
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}

interface SystemDetailDialogProps {
  system: MemorySystem | null;
  onClose: () => void;
}

export function SystemDetailDialog({
  system,
  onClose,
}: SystemDetailDialogProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!system) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [system, onClose]);

  if (!system) return null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard dismiss handled via Escape listener in useEffect
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop dismiss pattern
    <div
      ref={overlayRef}
      className="dialog-overlay fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard dismiss handled via Escape listener in useEffect */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: backdrop dismiss pattern */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="dialog-content relative w-full max-w-2xl max-h-[75vh] overflow-y-auto rounded-xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-border bg-card/95 backdrop-blur-sm p-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <a
                href={system.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-primary hover:underline"
              >
                {system.name}
              </a>
              {system.repo && system.repo !== system.url && (
                <a
                  href={system.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                  title="GitHub"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="sr-only">GitHub repository</span>
                </a>
              )}
            </div>
            {system.tagline && (
              <p className="text-xs font-medium text-primary/70 mb-1">
                {system.tagline}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              {system.description}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6">
          {/* Meta row */}
          <div className="flex flex-wrap gap-4">
            <Field label="Language">
              <ChipList items={system.language} />
            </Field>
            {system.license && (
              <Field label="License">
                <span className="text-sm font-mono">{system.license}</span>
              </Field>
            )}
            <Field label="Approach">
              <ChipList
                items={system.approach}
                detail={system.approachDetail}
              />
            </Field>
          </div>

          {/* Dev tool fields */}
          {isDevTool(system) && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Field label="Search">
                  <ChipList
                    items={system.search}
                    detail={system.searchDetail}
                  />
                </Field>
                <Field label="Storage">
                  <ChipList
                    items={system.storage}
                    detail={system.storageDetail}
                  />
                </Field>
                <Field label="MCP Support">
                  <Badge value={system.mcpSupport} detail={system.mcpDetail} />
                </Field>
                <Field label="Multi-user">
                  <Badge
                    value={system.multiUser}
                    detail={system.multiUserDetail}
                  />
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
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Field label="Scopes">
                  <ChipList
                    items={system.scopes}
                    detail={system.scopesDetail}
                  />
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
                <Field label="Token Budget">
                  <ChipList
                    items={system.tokenBudgeting}
                    detail={system.tokenBudgetingDetail}
                  />
                </Field>
                <Field label="Tool Support">
                  <ChipList
                    items={system.toolSupport}
                    detail={system.toolSupportDetail}
                  />
                </Field>
                <Field label="Context Injection">
                  <Badge
                    value={system.contextInjection}
                    detail={system.contextInjectionDetail}
                  />
                </Field>
                <Field label="Network Required">
                  <Badge
                    value={system.networkRequired}
                    detail={system.networkDetail}
                  />
                </Field>
                <Field label="Audit Trail">
                  <Badge
                    value={system.auditTrail}
                    detail={system.auditTrailDetail}
                  />
                </Field>
              </div>
              {(system.maturity || system.setupComplexity) && (
                <div className="flex gap-4">
                  {system.maturity && (
                    <Field label="Maturity">
                      <Badge value={system.maturity} />
                    </Field>
                  )}
                  {system.setupComplexity && (
                    <Field label="Setup">
                      <Badge value={system.setupComplexity} />
                    </Field>
                  )}
                </div>
              )}
            </>
          )}

          {/* User memory fields */}
          {isUserMemory(system) && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Field label="Hosting">
                  <ChipList
                    items={system.hosting}
                    detail={system.hostingDetail}
                  />
                </Field>
                <Field label="Pricing">
                  <Badge value={system.pricing} detail={system.pricingDetail} />
                </Field>
                <Field label="SDKs">
                  <ChipList items={system.sdks} detail={system.sdksDetail} />
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
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Field label="Search">
                  <ChipList
                    items={system.search}
                    detail={system.searchDetail}
                  />
                </Field>
                <Field label="Storage">
                  <ChipList
                    items={system.storage}
                    detail={system.storageDetail}
                  />
                </Field>
                <Field label="Scopes">
                  <ChipList
                    items={system.scopes}
                    detail={system.scopesDetail}
                  />
                </Field>
              </div>
              {((system as EnrichedSystem).enrichment?.githubStars !==
                undefined ||
                system.funding) && (
                <div className="flex gap-4">
                  {(() => {
                    const stars = (system as EnrichedSystem).enrichment
                      ?.githubStars;
                    return stars != null ? (
                      <Field label="Stars">
                        <span className="text-sm font-mono">
                          {formatStars(stars)}
                        </span>
                      </Field>
                    ) : null;
                  })()}
                  {system.funding && (
                    <Field label="Funding">
                      <span className="text-sm">{system.funding}</span>
                    </Field>
                  )}
                </div>
              )}
            </>
          )}

          {/* Pros / Cons */}
          {((system.pros && system.pros.length > 0) ||
            (system.cons && system.cons.length > 0)) && (
            <div className="grid gap-4 sm:grid-cols-2 border-t border-border pt-5">
              {system.pros && system.pros.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2 block">
                    Strengths
                  </span>
                  <ul className="space-y-1.5">
                    {system.pros.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-emerald-500 shrink-0 mt-0.5">
                          +
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {system.cons && system.cons.length > 0 && (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-red-500 dark:text-red-400 mb-2 block">
                    Tradeoffs
                  </span>
                  <ul className="space-y-1.5">
                    {system.cons.map((c) => (
                      <li
                        key={c}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-red-400 shrink-0 mt-0.5">-</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
