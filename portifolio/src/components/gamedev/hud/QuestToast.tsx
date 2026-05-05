"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

type SectionKey = keyof Dictionary["gamedev"]["quests"];

const SECTIONS: SectionKey[] = [
  "hero",
  "about",
  "engines",
  "jams",
  "showcase",
  "contact",
];

export function QuestToast({ dict }: { dict: Dictionary }) {
  const [active, setActive] = useState<SectionKey | null>(null);
  const seenRef = useRef<Set<SectionKey>>(new Set());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.querySelector(`[data-gd-section="${s}"]`);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            if (seenRef.current.has(s)) continue;
            seenRef.current.add(s);
            setActive(s);
            if (timerRef.current !== null) {
              window.clearTimeout(timerRef.current);
            }
            timerRef.current = window.setTimeout(() => {
              setActive((prev) => (prev === s ? null : prev));
              timerRef.current = null;
            }, 3200);
          }
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => {
      observers.forEach((o) => o.disconnect());
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={active}
          initial={{ opacity: 0, y: -32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -32, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          style={{
            position: "fixed",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 70,
            background:
              "linear-gradient(180deg, rgba(10,4,24,0.95) 0%, rgba(26,5,48,0.92) 100%)",
            color: "var(--gd-ink)",
            padding: "14px 22px",
            border: "2px solid var(--gd-accent)",
            boxShadow:
              "5px 5px 0 rgba(0,0,0,0.6), inset 0 0 0 2px rgba(255,247,220,0.08)",
            fontFamily: "var(--font-press-start), monospace",
            imageRendering: "pixelated",
            textAlign: "center",
            minWidth: 280,
            maxWidth: "90vw",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontSize: 10,
              letterSpacing: 3,
              color: "var(--gd-accent)",
              marginBottom: 8,
              textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
            }}
          >
            ★ {dict.gamedev.quests[active].title}
          </div>
          <div
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: 18,
              color: "var(--gd-ink)",
              letterSpacing: 1,
            }}
          >
            {dict.gamedev.quests[active].body}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
