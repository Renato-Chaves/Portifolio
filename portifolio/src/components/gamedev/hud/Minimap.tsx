"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { useGdScroll } from "../GamedevScrollProvider";

type SectionKey = keyof Dictionary["gamedev"]["minimap"]["sections"];

const SECTIONS: SectionKey[] = [
  "hero",
  "about",
  "engines",
  "jams",
  "showcase",
  "contact",
];

export function Minimap({ dict }: { dict: Dictionary }) {
  const { scrollToTarget } = useGdScroll();
  const [activeIdx, setActiveIdx] = useState(0);
  const [available, setAvailable] = useState<Set<SectionKey>>(new Set());

  useEffect(() => {
    const present = new Set<SectionKey>();
    SECTIONS.forEach((s) => {
      if (document.querySelector(`[data-gd-section="${s}"]`)) present.add(s);
    });
    setAvailable(present);

    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s, i) => {
      const el = document.querySelector(`[data-gd-section="${s}"]`);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActiveIdx(i);
          }
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (s: SectionKey) => {
    if (!available.has(s)) return;
    const el = document.querySelector(`[data-gd-section="${s}"]`);
    if (el instanceof HTMLElement) {
      scrollToTarget(el);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        width: 172,
        zIndex: 60,
        fontFamily: "var(--font-press-start), monospace",
        color: "var(--gd-ink)",
        background: "rgba(10, 4, 24, 0.88)",
        border: "2px solid var(--gd-accent)",
        boxShadow:
          "4px 4px 0 rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,247,220,0.06)",
        padding: "10px 12px 12px",
        imageRendering: "pixelated",
      }}
      aria-label="Minimap"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 8,
          letterSpacing: 3,
          color: "var(--gd-accent)",
          marginBottom: 10,
          paddingBottom: 6,
          borderBottom: "1px dashed rgba(255,210,63,0.3)",
        }}
      >
        <span>▣ {dict.gamedev.minimap.label}</span>
        <span style={{ color: "var(--gd-accent-2)", letterSpacing: 1 }}>
          {String(activeIdx + 1).padStart(2, "0")}/0{SECTIONS.length}
        </span>
      </div>

      <ul style={{ display: "grid", gap: 5, listStyle: "none", margin: 0, padding: 0 }}>
        {SECTIONS.map((s, i) => {
          const isAvailable = available.has(s);
          const isActive = activeIdx === i;
          return (
            <li key={s}>
              <button
                type="button"
                onClick={() => handleClick(s)}
                disabled={!isAvailable}
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "10px 1fr",
                  alignItems: "center",
                  gap: 10,
                  background: isActive ? "rgba(255,210,63,0.08)" : "transparent",
                  border: "none",
                  padding: "4px 4px",
                  color: "inherit",
                  cursor: isAvailable ? "pointer" : "not-allowed",
                  opacity: isAvailable ? 1 : 0.35,
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    background: isActive ? "var(--gd-accent)" : "transparent",
                    border: `1.5px solid ${
                      isActive ? "var(--gd-accent)" : "var(--gd-ink)"
                    }`,
                    boxShadow: isActive ? "0 0 6px var(--gd-accent)" : "none",
                    transform: isActive ? "rotate(45deg)" : "none",
                    transition: "all 0.2s",
                  }}
                />
                <span
                  style={{
                    fontSize: 8,
                    letterSpacing: 2,
                    color: isActive ? "var(--gd-accent)" : "var(--gd-ink)",
                    textShadow: isActive ? "1px 1px 0 rgba(0,0,0,0.5)" : "none",
                  }}
                >
                  {dict.gamedev.minimap.sections[s]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
