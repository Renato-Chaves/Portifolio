"use client";

import { PORTFOLIO } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { RevealOnScroll } from "./RevealOnScroll";

export function ExperienceSection({ dict }: { dict: Dictionary }) {
  const jobs = PORTFOLIO.experience;
  const e = dict.experience;
  return (
    <section id="experience" className="pad" data-nav="EXPERIENCE">
      <div className="container">
        <div className="sec-label">
          <span className="k">//</span> {e.sectionLabel}
        </div>
        <h2 className="sec-title">
          {e.titlePlain} <em>{e.titleEm}<span className="bracket">.</span></em>
        </h2>
        <RevealOnScroll>
          <div className="timeline">
            {jobs.map((j, i) => {
              const loc = e.jobs[i];
              return (
                <div key={i} className="job">
                  <div className="when">
                    <b>{j.when}</b>
                    {e.dur}
                  </div>
                  <h3 className="role">
                    <span className="co">{j.company}</span>{" "}
                    <span className="at">· {loc?.role ?? j.role}</span>
                  </h3>
                  <div className="loc">{loc?.at ?? j.at}</div>
                  <p className="desc">{loc?.desc ?? j.desc}</p>
                  <div className="chips">
                    {j.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
