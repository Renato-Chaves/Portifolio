import type { GithubLanguage, GithubRepo, PortfolioData } from "./data";
import { PORTFOLIO } from "./data";

const USER = PORTFOLIO.github.username;
const BASE = "https://api.github.com";
const CONTRIB = `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`;
const REV = { next: { revalidate: 3600 } } as const;

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#67b4ff",
  JavaScript: "#ffb066",
  Python: "#c48eff",
  Go: "#6ef0e8",
  Shell: "#ff6b9e",
  HTML: "#ffb066",
  CSS: "#67b4ff",
  "C#": "#6ef0e8",
  Java: "#ffb066",
  Kotlin: "#c48eff",
  Swift: "#ffb066",
  Rust: "#ff6b9e",
  Dockerfile: "#67b4ff",
  Jupyter: "#ffb066",
};
const FALLBACK_COLOR = "#475f82";
const colorFor = (name: string | null | undefined) =>
  (name && LANG_COLORS[name]) || FALLBACK_COLOR;

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

export type LiveGithub = PortfolioData["github"] & {
  contributions?: number[];
  live: boolean;
};

async function fetchJson<T>(url: string, headers?: Record<string, string>): Promise<T | null> {
  try {
    const res = await fetch(url, { ...REV, headers });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function fetchGithubData(): Promise<LiveGithub> {
  const fallback: LiveGithub = { ...PORTFOLIO.github, live: false };

  const repos = await fetchJson<ApiRepo[]>(
    `${BASE}/users/${USER}/repos?per_page=100&sort=updated&type=owner`
  );
  if (!repos) return fallback;

  const owned = repos.filter((r) => !r.fork && !r.archived);
  if (owned.length === 0) return fallback;

  const topByStars = [...owned].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  );
  const sampleForLangs = topByStars.slice(0, 20);

  const langTotals: Record<string, number> = {};
  await Promise.all(
    sampleForLangs.map(async (r) => {
      const langs = await fetchJson<Record<string, number>>(
        `${BASE}/repos/${USER}/${r.name}/languages`
      );
      if (!langs) return;
      for (const [k, v] of Object.entries(langs)) {
        langTotals[k] = (langTotals[k] || 0) + v;
      }
    })
  );

  const totalBytes = Object.values(langTotals).reduce((a, b) => a + b, 0);
  let languages: GithubLanguage[] = PORTFOLIO.github.languages;
  if (totalBytes > 0) {
    const ranked = Object.entries(langTotals).sort((a, b) => b[1] - a[1]);
    const top = ranked.slice(0, 5).map(([name, bytes]) => ({
      name,
      pct: Math.round((bytes / totalBytes) * 100),
      color: colorFor(name),
    }));
    const otherPct = Math.max(0, 100 - top.reduce((a, b) => a + b.pct, 0));
    languages = otherPct > 0
      ? [...top, { name: "Other", pct: otherPct, color: FALLBACK_COLOR }]
      : top;
  }

  const stars = owned.reduce((a, r) => a + r.stargazers_count, 0);

  const prsRes = await fetchJson<{ total_count: number }>(
    `${BASE}/search/issues?q=author:${USER}+type:pr&per_page=1`
  );
  const prs = prsRes?.total_count ?? PORTFOLIO.github.summary.prs;

  const commitsRes = await fetchJson<{ total_count: number }>(
    `${BASE}/search/commits?q=author:${USER}&per_page=1`,
    { Accept: "application/vnd.github+json" }
  );
  const commits = commitsRes?.total_count ?? PORTFOLIO.github.summary.commits;

  const pinnedSource =
    topByStars[0]?.stargazers_count > 0
      ? topByStars
      : [...owned].sort(
          (a, b) =>
            new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        );
  const pinned: GithubRepo[] = pinnedSource.slice(0, 4).map((r) => ({
    name: r.name,
    desc: r.description ?? "—",
    lang: r.language ?? "—",
    stars: r.stargazers_count,
    color: colorFor(r.language),
    href: r.html_url,
  }));

  const contribData = await fetchJson<{
    contributions: { date: string; count: number; level: number }[];
  }>(CONTRIB);
  const contributions = contribData?.contributions
    ? contribData.contributions.slice(-364).map((c) => c.level ?? 0)
    : undefined;

  return {
    username: USER,
    languages,
    summary: { commits, prs, stars },
    repos: pinned,
    contributions,
    live: true,
  };
}
