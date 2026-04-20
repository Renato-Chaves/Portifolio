"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PORTFOLIO } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { ProjectMock } from "./ProjectMock";

export function ProjectsSection({ dict }: { dict: Dictionary }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const data = PORTFOLIO.projects;
  const pr = dict.projects;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const raw = Math.max(0, Math.min(1, -r.top / total));
      const idx = Math.min(data.length - 1, Math.floor(raw * data.length));
      setActiveIdx(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [data.length]);

  const jumpTo = (idx: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const target = el.offsetTop + ((idx + 0.5) / data.length) * total;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div id="projects-wrapper" ref={wrapRef}>
      <section id="projects" data-nav="PROJECTS">
        <div className="sticky">
          <div className="proj-stage">
            <div className="proj-rail">
              <div className="label">{pr.sectionLabel} · 0{data.length}</div>
              <div className="markers">
                {data.map((p, i) => (
                  <button
                    key={p.num}
                    className={`proj-marker ${i === activeIdx ? "active" : ""}`}
                    style={{ ["--c" as string]: p.color } as React.CSSProperties}
                    onClick={() => jumpTo(i)}
                    aria-label={`Jump to project ${p.name}`}
                  >
                    <div className="dot" />
                    <div>
                      <div className="tip">{p.name}</div>
                      <div className="idx">{p.num}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="label" style={{ opacity: 0.5 }}>
                {pr.railLabelLocked}
              </div>
            </div>

            {data.map((p, i) => (
              <div
                key={p.num}
                className={`proj-panel ${i === activeIdx ? "active" : ""}`}
                style={{ ["--c" as string]: p.color } as React.CSSProperties}
              >
                <div className="info">
                  <div className="num">
                    {pr.projectPrefix} · {p.num} / 0{data.length}
                  </div>
                  <h3>
                    {p.name.split(" ")[0]}
                    <em>.</em>
                  </h3>
                  <p className="lede">{pr.ledes[p.name] ?? p.lede}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  {!p.placeholder && (
                    <div className="links">
                      <a
                        className="btn"
                        href={p.repoHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38v-1.34c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.87 2.34.67.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.58 7.58 0 014 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        {pr.ghBtn}
                      </a>
                      <span className="repo-path">{p.repo}</span>
                    </div>
                  )}
                </div>
                {p.shape === "mobile" && p.images && p.images.length > 0 ? (
                  <div className="shot phone-shot">
                    <div
                      className={`phone-row count-${Math.min(p.images.length, 2)}`}
                    >
                      {p.images.slice(0, 2).map((src, i) => (
                        <div key={src} className="phone">
                          <Image
                            src={src}
                            alt={`${p.name} screen ${i + 1}`}
                            fill
                            sizes="(max-width: 900px) 45vw, 18vw"
                            style={{ objectFit: "cover", objectPosition: "center" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="shot">
                    <div className="chrome">
                      <i />
                      <i />
                      <i />
                      <span className="url">{p.repo}</span>
                    </div>
                    <div className="body">
                      <ProjectMock
                        kind={p.mock}
                        color={p.color}
                        image={p.images?.[0]}
                        alt={`${p.name} preview`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="proj-count">
              <b>0{activeIdx + 1}</b> / 0{data.length} · {data[activeIdx].name}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
