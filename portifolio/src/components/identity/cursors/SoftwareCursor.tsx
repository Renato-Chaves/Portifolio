"use client";

import type { MousePos } from "./useMouse";

export function SoftwareCursor({ pos, hovering }: { pos: MousePos; hovering: boolean }) {
  if (!pos.inside) return null;
  const { x, y } = pos;
  const active = hovering;
  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        mixBlendMode: "screen",
      }}
    >
      <svg width="48" height="48" viewBox="-24 -24 48 48" style={{ overflow: "visible" }}>
        <circle
          r={active ? 18 : 14}
          fill="none"
          stroke="#67b4ff"
          strokeWidth="1"
          opacity={active ? 0.9 : 0.5}
          style={{ transition: "r 0.2s, opacity 0.2s" }}
        />
        <line x1="-22" y1="0" x2="-6" y2="0" stroke="#67b4ff" strokeWidth="1" />
        <line x1="6" y1="0" x2="22" y2="0" stroke="#67b4ff" strokeWidth="1" />
        <line x1="0" y1="-22" x2="0" y2="-6" stroke="#67b4ff" strokeWidth="1" />
        <line x1="0" y1="6" x2="0" y2="22" stroke="#67b4ff" strokeWidth="1" />
        <circle r="2" fill="#6ef0e8" />
        {active &&
          [0, 90, 180, 270].map((a) => (
            <line
              key={a}
              x1="0"
              y1="-20"
              x2="0"
              y2="-16"
              stroke="#6ef0e8"
              strokeWidth="1.5"
              transform={`rotate(${a})`}
            />
          ))}
        <g
          transform="translate(16, 16)"
          fontFamily="var(--font-jetbrains-mono), monospace"
          fontSize="8"
          fill="#67b4ff"
        >
          <text opacity="0.7">x:{String(Math.round(x)).padStart(4, "0")}</text>
          <text y="9" opacity="0.5">
            y:{String(Math.round(y)).padStart(4, "0")}
          </text>
        </g>
      </svg>
    </div>
  );
}
