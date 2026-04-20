"use client";

import { PORTFOLIO } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { RevealOnScroll } from "./RevealOnScroll";

export function EducationSection({ dict }: { dict: Dictionary }) {
  const { education, certs } = PORTFOLIO;
  const hasCerts = certs.length > 0;
  const ed = dict.education;
  return (
    <section id="education" className="pad" data-nav="EDUCATION">
      <div className="container">
        <div className="sec-label">
          <span className="k">//</span> {ed.sectionLabel}
        </div>
        <h2 className="sec-title">
          {ed.titleEdu}
          {hasCerts ? ed.titleAmp : " "}
          {hasCerts ? (
            <em>
              {ed.titleCerts}
              <span className="bracket">.</span>
            </em>
          ) : (
            <em>
              {ed.titleStudy}
              <span className="bracket">.</span>
            </em>
          )}
        </h2>
        <RevealOnScroll>
          <div className={`grid ${hasCerts ? "" : "single"}`}>
            <div className="edu-list">
              {education.map((e, i) => {
                const loc = ed.entries[i];
                return (
                  <div key={i}>
                    <div>
                      <h4>{loc?.deg ?? e.deg}</h4>
                      <div className="inst">{e.inst}</div>
                      <p>{loc?.note ?? e.note}</p>
                    </div>
                    <div className="when">{e.when}</div>
                  </div>
                );
              })}
            </div>
            {hasCerts && (
              <div className="cert-list">
                <h5>{ed.certsHeading}</h5>
                {certs.map((c, i) => (
                  <div key={i}>
                    <b>{ed.certs[i]?.name ?? c.name}</b>
                    <span>{ed.certs[i]?.issuer ?? c.issuer}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
