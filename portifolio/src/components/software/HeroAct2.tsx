"use client";

import { useEffect, useRef, useState } from "react";
import { PORTFOLIO } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { TechIcon } from "./TechIcon";

export function HeroAct2({ dict }: { dict: Dictionary }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -r.top / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const stack = PORTFOLIO.techStack;
  const animProgress = 0.3 + progress * 0.4;
  const enterVw = (1 - animProgress) * 100;
  const exitPct = animProgress * 100;
  const currentIdx = Math.min(stack.length - 1, Math.floor(progress * stack.length));

  return (
    <section id="tech-act" ref={sectionRef}>
      <div className="sticky">
        <div className="tech-inner">
          <div className="tech-title">
            <div className="sec-label">
              <span className="k">//</span> {dict.techAct.sectionLabel}
            </div>
            <h2>
              {dict.techAct.titleLine1}
              <br />
              <em>{dict.techAct.titleLine2}</em>
            </h2>
            <p>{dict.techAct.description}</p>
          </div>

          <div
            className="tech-track"
            style={{
              transform: `translateX(calc(${enterVw}vw - ${exitPct}%)) translateY(-50%)`,
            }}
          >
            {stack.map((t) => (
              <div key={t.name} className="tech-item">
                <div className="tech-hex">
                  <svg viewBox="0 0 110 126">
                    <polygon
                      points="55,2 107,32 107,94 55,124 3,94 3,32"
                      fill="rgba(103,180,255,0.04)"
                      stroke="rgba(103,180,255,0.5)"
                      strokeWidth="1"
                    />
                    <polygon
                      points="55,10 99,36 99,90 55,116 11,90 11,36"
                      fill="none"
                      stroke="rgba(110,240,232,0.2)"
                      strokeWidth="1"
                    />
                  </svg>
                  <span className="glyph">
                    <TechIcon name={t.name} />
                  </span>
                </div>
                <div className="tech-meta">
                  <div className="name">{t.name}</div>
                  <div className="cat">{t.cat}</div>
                  <div
                    className="bar"
                    style={{ ["--v" as string]: `${t.level}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="tech-progress">
            <div className="idx">
              {String(currentIdx + 1).padStart(2, "0")} / {String(stack.length).padStart(2, "0")}
            </div>
            <div
              className="bar"
              style={{ ["--v" as string]: `${progress * 100}%` } as React.CSSProperties}
            />
            <div>{dict.techAct.traversal}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
