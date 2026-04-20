"use client";

import { PORTFOLIO } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { HeroNetwork } from "./HeroNetwork";

export function HeroAct1({
  scrollY,
  dict,
}: {
  scrollY: number;
  dict: Dictionary;
}) {
  const vh = typeof window !== "undefined" ? window.innerHeight : 1;
  const p = Math.min(1, scrollY / vh);
  const [first, ...rest] = PORTFOLIO.name.split(" ");
  const last = rest.join(" ") || first;

  return (
    <div id="hero" style={{ opacity: 1 - p * 0.8 }}>
      <div className="hero-bg">
        <div
          className="hero-grid"
          style={{
            transform: `translateY(${scrollY * 0.2}px) scale(${1 + p * 0.1})`,
          }}
        />
        <HeroNetwork density={1} />
      </div>
      <div className="hero-brackets">
        <div className="hero-bracket tl" />
        <div className="hero-bracket tr" />
        <div className="hero-bracket bl" />
        <div className="hero-bracket br" />
      </div>
      <div
        className="hero-content"
        style={{ transform: `translateY(${scrollY * -0.3}px)` }}
      >
        <div className="hero-role">{dict.hero.badge}</div>
        <h1 className="hero-name">
          <span style={{ display: "block" }}>{first}</span>
          <em>
            {last}
            <span className="bracket">.</span>
          </em>
          <span className="cursor-blink" />
        </h1>
        <div className="hero-sub">
          <div>
            <b>{dict.hero.role}</b>
            <span>{dict.hero.roleValue}</span>
          </div>
          <div>
            <b>{dict.hero.based}</b>
            <span>{dict.hero.locationValue}</span>
          </div>
          <div>
            <b>{dict.hero.focus}</b>
            <span>{dict.hero.focusValue}</span>
          </div>
        </div>
      </div>
      <div className="hero-corner-stats">
        <div>
          {dict.hero.sysInit} <b>{dict.hero.sysInitValue}</b>
        </div>
        <div>
          {dict.hero.actKey} <b>{dict.hero.actValue}</b>
        </div>
      </div>
      <div className="hero-scroll-hint">
        <div>{dict.hero.scroll}</div>
        <div className="track" />
      </div>
    </div>
  );
}
