import type { DevTool, MemorySystem } from "@/lib/types";
import { Badge } from "./badge";
import { ChipList } from "./chip-list";

function isDevTool(system: MemorySystem): system is DevTool {
  return system.category === "developer-tools";
}

interface ExpandableRowProps {
  system: MemorySystem;
}

export function ExpandableRow({ system }: ExpandableRowProps) {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
      <div>
        <h4 className="font-medium mb-1">Description</h4>
        <p className="text-muted-foreground">{system.description}</p>
      </div>

      {system.pros && system.pros.length > 0 && (
        <div>
          <h4 className="font-medium mb-1 text-green-700 dark:text-green-400">
            Pros
          </h4>
          <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
            {system.pros.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {system.cons && system.cons.length > 0 && (
        <div>
          <h4 className="font-medium mb-1 text-red-700 dark:text-red-400">
            Cons
          </h4>
          <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
            {system.cons.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {isDevTool(system) && (
        <>
          {system.setupComplexity && (
            <div>
              <h4 className="font-medium mb-1">Setup Complexity</h4>
              <Badge value={system.setupComplexity} />
            </div>
          )}
          {system.maturity && (
            <div>
              <h4 className="font-medium mb-1">Maturity</h4>
              <Badge value={system.maturity} />
            </div>
          )}
        </>
      )}

      {!isDevTool(system) && (
        <>
          {system.funding && (
            <div>
              <h4 className="font-medium mb-1">Funding</h4>
              <p className="text-muted-foreground">{system.funding}</p>
            </div>
          )}
          {system.githubStars && (
            <div>
              <h4 className="font-medium mb-1">GitHub Stars</h4>
              <p className="text-muted-foreground">{system.githubStars}</p>
            </div>
          )}
        </>
      )}

      <div>
        <h4 className="font-medium mb-1">Links</h4>
        <div className="flex gap-2">
          <a
            href={system.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Homepage
          </a>
          {system.repo && (
            <a
              href={system.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {system.license && (
        <div>
          <h4 className="font-medium mb-1">License</h4>
          <p className="text-muted-foreground">{system.license}</p>
        </div>
      )}

      <div>
        <h4 className="font-medium mb-1">Language</h4>
        <ChipList items={system.language} />
      </div>
    </div>
  );
}
