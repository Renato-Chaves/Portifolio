"use client";

import Link from "next/link";
import { GameScene } from "@/components/canvas/GameScene";
import type { Dictionary, Locale } from "@/lib/i18n";

export function GamedevComingSoon({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const g = dict.gamedev;
  return (
    <main
      className="relative h-screen w-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #2a1246 0%, #5b1d7a 35%, #d1407c 70%, #ff9567 100%)",
        color: "var(--gd-ink)",
        fontFamily: "var(--font-vt323), monospace",
        imageRendering: "pixelated",
      }}
    >
      <div className="gd-stars" />
      <div className="gd-sun" />
      <div className="gd-sun-stripes" />

      <div className="absolute inset-0">
        <GameScene intensity={1} />
      </div>

      <div className="gd-ground" />
      <div className="gd-scanlines" />

      <div className="relative z-10 grid h-full place-items-center px-6 text-center">
        <div>
          <div
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "var(--gd-accent)",
              textShadow: "3px 3px 0 rgba(0,0,0,0.4)",
              marginBottom: 20,
              animation: "gdBob 2.2s ease-in-out infinite",
            }}
          >
            {g.player}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontWeight: 400,
              fontSize: "clamp(28px, 5vw, 64px)",
              lineHeight: 1.1,
              letterSpacing: 0,
              margin: 0,
              color: "var(--gd-ink)",
              textShadow:
                "4px 4px 0 var(--gd-accent-3), 8px 8px 0 #3a0f5e, 12px 12px 0 rgba(0,0,0,0.3)",
            }}
          >
            {g.comingLine1}
            <br />
            <span style={{ color: "var(--gd-accent)" }}>{g.comingLine2}</span>
          </h1>

          <div
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: 28,
              color: "var(--gd-ink)",
              marginTop: 32,
              maxWidth: 560,
              marginInline: "auto",
              textShadow: "2px 2px 0 rgba(0,0,0,0.35)",
            }}
          >
            {g.body1}
            <br />
            {g.body2Prefix}{" "}
            <span style={{ animation: "gdBlink 0.9s steps(2) infinite" }}>▮</span>
          </div>

          <Link
            href={`/${locale}`}
            aria-label="Back to selection"
            className="gd-start"
            style={{
              marginTop: 40,
              display: "inline-block",
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 14,
              textDecoration: "none",
              transformOrigin: "center",
              transition: "transform 0.18s",
            }}
          >
            <span className="gd-start-body">{g.back}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
