"use client";

import type { GameEngine } from "@/lib/data";

const ENGINE_STYLE: Record<
  GameEngine,
  { label: string; color: string; bg: string; glyph: string }
> = {
  "Construct 2": {
    label: "CONSTRUCT 2",
    color: "#1f1f1f",
    bg: "#ffd23f",
    glyph: "C2",
  },
  "Clickteam Fusion 2.5": {
    label: "FUSION 2.5",
    color: "#fff7dc",
    bg: "#1d4cff",
    glyph: "F",
  },
  "Unity 2D": {
    label: "UNITY 2D",
    color: "#fff7dc",
    bg: "#1a1a1a",
    glyph: "U",
  },
  "Unity 3D": {
    label: "UNITY 3D",
    color: "#1a1a1a",
    bg: "#fff7dc",
    glyph: "U",
  },
};

export function EngineBadge({
  engine,
  size = "sm",
}: {
  engine: GameEngine;
  size?: "sm" | "md";
}) {
  const s = ENGINE_STYLE[engine];
  const fs = size === "md" ? 12 : 10;
  const pad = size === "md" ? "8px 12px" : "6px 10px";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: pad,
        background: s.bg,
        color: s.color,
        fontFamily: "var(--font-press-start), monospace",
        fontSize: fs,
        letterSpacing: 2,
        boxShadow: "3px 3px 0 rgba(0,0,0,0.4)",
        imageRendering: "pixelated",
      }}
    >
      <span
        style={{
          display: "inline-grid",
          placeItems: "center",
          width: size === "md" ? 22 : 18,
          height: size === "md" ? 22 : 18,
          background: "rgba(0,0,0,0.18)",
          fontFamily: "var(--font-vt323), monospace",
          fontSize: size === "md" ? 16 : 14,
          letterSpacing: 0,
          fontWeight: 700,
        }}
      >
        {s.glyph}
      </span>
      <span>{s.label}</span>
    </span>
  );
}
