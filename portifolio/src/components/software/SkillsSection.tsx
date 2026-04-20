"use client";

import { PORTFOLIO } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { RevealOnScroll } from "./RevealOnScroll";

export function SkillsSection({ dict }: { dict: Dictionary }) {
  const skills = PORTFOLIO.skills;
  const s = dict.skills;
  return (
    <section id="skills" className="pad" data-nav="SKILLS">
      <div className="container">
        <div className="sec-label">
          <span className="k">//</span> {s.sectionLabel}
        </div>
        <h2 className="sec-title">
          {s.titlePlain} <em>{s.titleEm}<span className="bracket">.</span></em>
        </h2>
        <RevealOnScroll>
          <div className="grid">
            {skills.map((c) => (
              <div key={c.cat} className="skill-card">
                <div className="head">
                  <h4>{s.categories[c.cat] ?? c.cat}</h4>
                  <span className="idx">{c.idx}</span>
                </div>
                <ul>
                  {c.items.map((item) => (
                    <li key={item.name}>
                      <span>{item.name}</span>
                      <span className="prof">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <span key={n} className={n <= item.p ? "on" : ""} />
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
