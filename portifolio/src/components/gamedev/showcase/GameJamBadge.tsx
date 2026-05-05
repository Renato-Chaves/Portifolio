"use client";

import type { GameJamEntry } from "@/lib/data";

export function GameJamBadge({
  jam,
  size = "sm",
}: {
  jam: GameJamEntry;
  size?: "sm" | "md";
}) {
  const ringSize = size === "md" ? 64 : 48;
  const fs = size === "md" ? 9 : 8;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        padding: size === "md" ? "8px 14px 8px 8px" : "6px 12px 6px 6px",
        background: "linear-gradient(135deg, #6e1f3f, #ff6b9e)",
        color: "var(--gd-ink)",
        fontFamily: "var(--font-press-start), monospace",
        fontSize: fs,
        letterSpacing: 2,
        boxShadow:
          "3px 3px 0 rgba(0,0,0,0.4), inset 0 0 0 2px rgba(255,247,220,0.18)",
        imageRendering: "pixelated",
      }}
    >
      <div
        aria-hidden
        style={{
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          background: "radial-gradient(circle, #ffd23f, #ff6b9e 75%)",
          boxShadow:
            "0 0 0 3px #fff7dc, 0 0 0 5px #6e1f3f, 0 0 12px rgba(255,210,63,0.6)",
          display: "grid",
          placeItems: "center",
          fontFamily: "var(--font-vt323), monospace",
          fontSize: size === "md" ? 22 : 18,
          color: "#3a0f5e",
          letterSpacing: 0,
        }}
      >
        ★
      </div>
      <div style={{ display: "grid", gap: 4, lineHeight: 1.2 }}>
        <div style={{ color: "var(--gd-accent)" }}>{jam.name}</div>
        <div style={{ color: "var(--gd-ink)", opacity: 0.85 }}>
          {jam.year}
          {jam.placement ? ` · ${jam.placement}` : ""}
        </div>
      </div>
    </div>
  );
}
