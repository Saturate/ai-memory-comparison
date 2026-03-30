import type { Enrichment, MemorySystem } from "./types";

const REVALIDATE = 86400; // 24 hours

function parseGitHubRepo(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

function parsePurl(purl: string): { type: string; name: string } | null {
  const match = purl.match(/^pkg:([^/]+)\/(.+)$/);
  if (!match) return null;
  return { type: match[1], name: match[2] };
}

async function fetchGitHubData(
  owner: string,
  repo: string,
): Promise<{ stars?: number; latestVersion?: string }> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers,
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return {};
    const data = await res.json();
    const stars = data.stargazers_count as number | undefined;

    // Latest release or tag
    let latestVersion: string | undefined;
    const relRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
      { headers, next: { revalidate: REVALIDATE } },
    );
    if (relRes.ok) {
      const rel = await relRes.json();
      latestVersion = rel.tag_name as string;
    } else {
      const tagRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/tags?per_page=1`,
        { headers, next: { revalidate: REVALIDATE } },
      );
      if (tagRes.ok) {
        const tags = await tagRes.json();
        if (tags.length > 0) latestVersion = tags[0].name as string;
      }
    }

    return { stars, latestVersion };
  } catch {
    return {};
  }
}

async function fetchNpmDownloads(name: string): Promise<number | undefined> {
  try {
    const res = await fetch(
      `https://api.npmjs.org/downloads/point/last-week/${name}`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return undefined;
    const data = await res.json();
    return data.downloads as number | undefined;
  } catch {
    return undefined;
  }
}

async function fetchPypiDownloads(name: string): Promise<number | undefined> {
  try {
    const res = await fetch(
      `https://pypistats.org/api/packages/${name}/recent`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return undefined;
    const data = await res.json();
    return data.data?.last_week as number | undefined;
  } catch {
    return undefined;
  }
}

async function fetchPackageDownloads(
  purl: string,
): Promise<number | undefined> {
  const parsed = parsePurl(purl);
  if (!parsed) return undefined;

  switch (parsed.type) {
    case "npm":
      return fetchNpmDownloads(parsed.name);
    case "pypi":
      return fetchPypiDownloads(parsed.name);
    default:
      return undefined;
  }
}

async function fetchEnrichment(system: MemorySystem): Promise<Enrichment> {
  const enrichment: Enrichment = {};

  if (system.repo) {
    const gh = parseGitHubRepo(system.repo);
    if (gh) {
      const { stars, latestVersion } = await fetchGitHubData(gh.owner, gh.repo);
      if (stars !== undefined) enrichment.githubStars = stars;
      if (latestVersion) enrichment.latestVersion = latestVersion;
    }
  }

  if (system.purl) {
    const downloads = await fetchPackageDownloads(system.purl);
    if (downloads !== undefined) enrichment.packageDownloads = downloads;
  }

  return enrichment;
}

export async function fetchAllEnrichments(
  systems: MemorySystem[],
): Promise<Record<string, Enrichment>> {
  const entries = await Promise.all(
    systems.map(async (s) => [s.slug, await fetchEnrichment(s)] as const),
  );
  return Object.fromEntries(entries);
}
