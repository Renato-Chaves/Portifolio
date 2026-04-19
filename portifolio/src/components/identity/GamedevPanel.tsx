"use client";

import { forwardRef } from "react";
import { GameScene } from "@/components/canvas/GameScene";

type Props = {
  hovering: boolean;
  onHoverChange: (h: boolean) => void;
  onEnter: () => void;
  scrollProgress: number;
  interactive: boolean;
};

export const GamedevPanel = forwardRef<HTMLDivElement, Props>(function GamedevPanel(
  { hovering, onHoverChange, onEnter, scrollProgress, interactive },
  ref,
) {
  const warp = scrollProgress;
  const pipeScale = 1 + warp * 0.8;
  const chromeFade = 1 - Math.min(1, warp * 1.6);
  const pipeMaskRadius = (1 - warp) * 180;

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden ${interactive ? "cursor-gd" : ""}`}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      style={{
        background:
          "linear-gradient(180deg, #2a1246 0%, #5b1d7a 35%, #d1407c 70%, #ff9567 100%)",
        color: "var(--gd-ink)",
        isolation: "isolate",
        fontFamily: "var(--font-vt323), monospace",
        imageRendering: "pixelated",
        filter: `brightness(${1 - warp * 0.15}) contrast(${1 + warp * 0.2})`,
      }}
    >
      <div className="gd-stars" />
      <div
        className="gd-sun"
        style={{ transform: `translate(-50%, -50%) scale(${1 + warp * 2})` }}
      />
      <div className="gd-sun-stripes" />

      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${1 - warp * 0.4}) translateY(${warp * 60}px)`,
          opacity: 1 - warp * 0.3,
        }}
      >
        <GameScene intensity={hovering ? 1.8 : 1} />
      </div>

      <div
        className="gd-ground"
        style={{ transform: `translateY(${warp * 60}px) scaleX(${1 + warp * 0.3})` }}
      />

      {/* Pipe dive overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 55%,
            transparent 0,
            transparent ${pipeMaskRadius * 0.9}px,
            #2a0a48 ${pipeMaskRadius * 0.95}px,
            #2a0a48 100%)`,
          opacity: warp > 0.1 ? Math.min(1, (warp - 0.1) * 1.5) : 0,
        }}
      />

      <div className="gd-scanlines" />

      {/* Chrome */}
      <div
        className="pointer-events-none absolute inset-0 grid text-center"
        style={{
          gridTemplateRows: "auto 1fr auto",
          padding: "28px 44px 120px",
          opacity: chromeFade,
          transform: `scale(${pipeScale})`,
        }}
      >
        <header
          className="pointer-events-auto flex items-start justify-between"
          style={{
            fontFamily: "var(--font-press-start), monospace",
            fontSize: 10,
            letterSpacing: "0.04em",
            color: "var(--gd-ink)",
            textShadow: "2px 2px 0 rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ color: "var(--gd-accent-3)", letterSpacing: 4 }}>♥ ♥ ♥ ♡ ♡</div>
          <div>WORLD 2-1</div>
          <div style={{ color: "var(--gd-accent)" }}>
            <span style={{ color: "#fff7dc" }}>◉</span> × 0042
          </div>
        </header>

        <div className="pointer-events-auto grid place-content-center text-center">
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
            &gt; PLAYER 02 &lt;
          </div>

          <h1
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontWeight: 400,
              fontSize: "clamp(36px, 6.5vw, 92px)",
              lineHeight: 1.05,
              letterSpacing: 0,
              margin: 0,
              color: "var(--gd-ink)",
              textShadow:
                "4px 4px 0 var(--gd-accent-3), 8px 8px 0 #3a0f5e, 12px 12px 0 rgba(0,0,0,0.3)",
            }}
          >
            GAME
            <br />
            <span style={{ color: "var(--gd-accent)" }}>DEV</span>
            <br />
            WORLD
          </h1>

          <div
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: 26,
              color: "var(--gd-ink)",
              marginTop: 28,
              textShadow: "2px 2px 0 rgba(0,0,0,0.35)",
            }}
          >
            A COLORFUL WORLD OF TINY MACHINES{" "}
            <span style={{ animation: "gdBlink 0.9s steps(2) infinite" }}>▮</span>
          </div>

          <button
            type="button"
            onClick={onEnter}
            aria-label="Enter Game Developer portfolio"
            className="gd-start"
            style={{
              marginTop: 36,
              background: "none",
              border: "none",
              padding: 0,
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 14,
              position: "relative",
              display: "inline-block",
              transformOrigin: "center",
              transition: "transform 0.18s",
              cursor: "inherit",
            }}
          >
            <span className="gd-start-body">
              ▶ PRESS START
              <span
                style={{
                  display: "inline-block",
                  marginLeft: 10,
                  animation: "gdArrow 0.8s ease-in-out infinite",
                }}
              >
                »
              </span>
            </span>
          </button>
        </div>

        <div />
      </div>

      {/* Bottom HUD */}
      <div
        className="pointer-events-none absolute left-0 right-0 flex items-end justify-between"
        style={{
          top: 92,
          padding: "0 44px",
          fontFamily: "var(--font-press-start), monospace",
          fontSize: 9,
          color: "var(--gd-ink)",
          textShadow: "2px 2px 0 rgba(0,0,0,0.4)",
          opacity: chromeFade,
        }}
      >
        <div>
          LV <b style={{ color: "var(--gd-accent-2)" }}>24</b> · XP 4820/5000
        </div>
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            padding: "8px 10px",
            border: "2px solid #fff7dc",
          }}
        >
          SAVE SLOT · 02
        </div>
      </div>
    </div>
  );
});
