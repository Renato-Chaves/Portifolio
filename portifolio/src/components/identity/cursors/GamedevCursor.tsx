"use client";

import type { MousePos } from "./useMouse";

const PIX: [number, number][] = [
  [0, 0], [1, 0],
  [0, 1], [1, 1], [2, 1],
  [0, 2], [1, 2], [2, 2], [3, 2],
  [0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
  [0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4],
  [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5],
  [0, 6], [1, 6], [2, 6], [3, 6],
  [0, 7], [1, 7], [4, 7], [5, 7],
  [4, 8], [5, 8],
];

export function GamedevCursor({ pos, hovering }: { pos: MousePos; hovering: boolean }) {
  if (!pos.inside) return null;
  const { x, y, down } = pos;
  const size = 3;
  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        transform: `translate(${x - 2}px, ${y - 2}px) scale(${down ? 0.9 : 1})`,
        imageRendering: "pixelated",
        transition: "transform 80ms",
      }}
    >
      <svg width={10 * size} height={10 * size} viewBox="0 0 10 10" style={{ overflow: "visible" }}>
        {PIX.map(([px, py], i) => (
          <rect key={"o" + i} x={px - 0.15} y={py - 0.15} width={1.3} height={1.3} fill="#2a0a48" />
        ))}
        {PIX.map(([px, py], i) => (
          <rect
            key={"f" + i}
            x={px}
            y={py}
            width={1}
            height={1}
            fill={hovering ? "#ffd23f" : "#fff7dc"}
          />
        ))}
        {hovering && (
          <g transform="translate(12, -2)">
            <rect x="0" y="1" width="1" height="1" fill="#ffd23f" />
            <rect x="2" y="0" width="1" height="1" fill="#ffd23f" />
            <rect x="1" y="2" width="1" height="1" fill="#ffd23f" />
          </g>
        )}
      </svg>
    </div>
  );
}
