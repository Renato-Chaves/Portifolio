"use client";

import Image from "next/image";
import type { ProjectMockKind } from "@/lib/data";

export function ProjectMock({
  kind,
  color,
  image,
  alt,
}: {
  kind: ProjectMockKind;
  color: string;
  image?: string;
  alt?: string;
}) {
  if (image) {
    return (
      <div style={{ position: "absolute", inset: 0 }}>
        <Image
          src={image}
          alt={alt ?? ""}
          fill
          sizes="(max-width: 900px) 90vw, 45vw"
          style={{ objectFit: "cover", objectPosition: "top center" }}
        />
      </div>
    );
  }

  if (kind === "editor") {
    const bars = [84, 100, 62, 92, 70, 88, 54];
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: 18,
          display: "grid",
          gap: 10,
        }}
      >
        {bars.map((w, i) => (
          <div
            key={i}
            style={{
              height: 8,
              width: `${w}%`,
              background: i === 3 ? color : "rgba(255,255,255,0.08)",
              opacity: i === 3 ? 0.9 : 0.3,
            }}
          />
        ))}
        <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
          {["A", "B", "C"].map((_, i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: i === 0 ? color : "rgba(255,255,255,0.15)",
                border: `2px solid ${i === 0 ? color : "rgba(255,255,255,0.25)"}`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (kind === "graph") {
    const pts: [number, number][] = [
      [60, 60],
      [200, 40],
      [340, 80],
      [120, 150],
      [280, 170],
      [200, 230],
    ];
    return (
      <svg
        viewBox="0 0 400 260"
        style={{
          position: "absolute",
          inset: 18,
          width: "calc(100% - 36px)",
          height: "calc(100% - 36px)",
        }}
      >
        {pts.map(([x, y], i) => (
          <g key={i}>
            {pts.slice(i + 1).map(([x2, y2], j) => {
              const hit = (x - 200) ** 2 + (y - 120) ** 2 < 16000;
              return (
                <line
                  key={j}
                  x1={x}
                  y1={y}
                  x2={x2}
                  y2={y2}
                  stroke={color}
                  strokeOpacity={hit ? 0.6 : 0.18}
                  strokeWidth="1"
                />
              );
            })}
          </g>
        ))}
        {pts.map(([x, y], i) => (
          <g key={`n${i}`}>
            <circle
              cx={x}
              cy={y}
              r="14"
              fill="rgba(103,180,255,0.08)"
              stroke={color}
              strokeWidth="1"
            />
            <circle cx={x} cy={y} r="3" fill={color} />
          </g>
        ))}
      </svg>
    );
  }

  if (kind === "dashboard") {
    return (
      <div
        style={{
          position: "absolute",
          inset: 18,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        <div
          style={{
            gridColumn: "span 2",
            height: 110,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: 8,
            position: "relative",
          }}
        >
          <svg viewBox="0 0 300 90" style={{ width: "100%", height: "100%" }}>
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="1.5"
              points="0,60 30,55 60,50 90,62 120,30 150,40 180,22 210,35 240,15 270,28 300,10"
            />
            <polyline
              fill={color}
              fillOpacity="0.15"
              stroke="none"
              points="0,60 30,55 60,50 90,62 120,30 150,40 180,22 210,35 240,15 270,28 300,10 300,90 0,90"
            />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: 4,
            height: 80,
          }}
        >
          {[30, 45, 65, 40, 80, 55, 72].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                background: color,
                opacity: 0.3 + i * 0.08,
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gap: 4,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 9,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div>
            KCAL <span style={{ color, float: "right" }}>1,820</span>
          </div>
          <div>
            PROTEIN <span style={{ color, float: "right" }}>134g</span>
          </div>
          <div>
            CARBS <span style={{ color, float: "right" }}>192g</span>
          </div>
          <div>
            FAT <span style={{ color, float: "right" }}>58g</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "palette") {
    const swatches = [
      color,
      "#67b4ff",
      "#6ef0e8",
      "#c48eff",
      "#ffb066",
      "#ff6b9e",
      "#dbe7f5",
      "#6b84a6",
    ];
    return (
      <div
        style={{
          position: "absolute",
          inset: 18,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridAutoRows: "1fr",
          gap: 6,
        }}
      >
        {swatches.map((c, i) => (
          <div
            key={i}
            style={{ background: c, opacity: 0.9, position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 4,
                left: 4,
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: 8,
                color: "rgba(0,0,0,0.6)",
                letterSpacing: "0.1em",
              }}
            >
              {c.slice(1).toUpperCase()}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="proj-placeholder"
      style={{ ["--c" as string]: color } as React.CSSProperties}
    >
      <div>
        <div className="tag-line">// SLOT AVAILABLE</div>
        <div>Reserved project slot</div>
        <div className="hint">Details coming soon</div>
      </div>
    </div>
  );
}
