"use client";

import { useMemo } from "react";
import type { LiveGithub } from "@/lib/github";
import type { Dictionary } from "@/lib/i18n";
import { RevealOnScroll } from "./RevealOnScroll";

function buildContribCells(): number[] {
  const cells: number[] = [];
  let seed = 1337;
  for (let i = 0; i < 52 * 7; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const v = seed % 100;
    let lvl = 0;
    if (v < 35) lvl = 0;
    else if (v < 62) lvl = 1;
    else if (v < 82) lvl = 2;
    else if (v < 95) lvl = 3;
    else lvl = 4;
    cells.push(lvl);
  }
  return cells;
}

export function GithubSection({
  data,
  dict,
}: {
  data: LiveGithub;
  dict: Dictionary;
}) {
  const gh = data;
  const g = dict.github;
  const fallbackCells = useMemo(buildContribCells, []);
  const cells = gh.contributions && gh.contributions.length > 0
    ? gh.contributions
    : fallbackCells;

  return (
    <section id="github" className="pad" data-nav="GITHUB">
      <div className="container">
        <div className="sec-label">
          <span className="k">//</span> {g.sectionLabel}
        </div>
        <h2 className="sec-title">
          {g.titlePlain} <em>{g.titleEm}<span className="bracket">.</span></em>
        </h2>
        <p
          style={{
            fontFamily: "var(--mono)",
            color: "var(--mute)",
            fontSize: 13,
            marginTop: 16,
            maxWidth: "60ch",
          }}
        >
          {g.blurbPrefix}
          {gh.username}
          {g.blurbSuffix}
        </p>
        <RevealOnScroll>
          <div className="inner">
            <div className="gh-card">
              <div className="h">
                <b>{g.cardLangs}</b>
                <span className="live">{g.live}</span>
              </div>
              <div className="gh-lang-bar">
                {gh.languages.map((l) => (
                  <div
                    key={l.name}
                    style={{ width: `${l.pct}%`, background: l.color }}
                    title={l.name}
                  />
                ))}
              </div>
              <div className="gh-lang-list">
                {gh.languages.map((l) => (
                  <div
                    key={l.name}
                    className="gh-lang-row"
                    style={
                      { ["--sw-swatch" as string]: l.color } as React.CSSProperties
                    }
                  >
                    <div className="swatch" />
                    <div className="name">{l.name}</div>
                    <div className="pct">{l.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gh-card">
              <div className="h">
                <b>{g.cardContrib}</b>
                <span className="live">{g.live}</span>
              </div>
              <div className="gh-contrib">
                {cells.map((lvl, i) => (
                  <div key={i} className={`cell l${lvl}`} />
                ))}
              </div>
              <div className="gh-contrib-legend">
                {g.months.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <div className="gh-summary">
                <div>
                  <b>{gh.summary.commits.toLocaleString()}</b>
                  <span>{g.commits}</span>
                </div>
                <div>
                  <b>{gh.summary.prs}</b>
                  <span>{g.prs}</span>
                </div>
                <div>
                  <b>{gh.summary.stars.toLocaleString()}</b>
                  <span>{g.stars}</span>
                </div>
              </div>
            </div>

            <div className="gh-card">
              <div className="h">
                <b>{g.cardPinned}</b>
                <span>★ {gh.summary.stars.toLocaleString()}</span>
              </div>
              {gh.repos.map((r) => (
                <a
                  key={r.name}
                  className="gh-repo"
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ["--c" as string]: r.color } as React.CSSProperties}
                >
                  <div className="name">{r.name}</div>
                  <div className="desc">{r.desc}</div>
                  <div className="meta">
                    <span className="lang">{r.lang}</span>
                    <span>★ {r.stars.toLocaleString()}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
