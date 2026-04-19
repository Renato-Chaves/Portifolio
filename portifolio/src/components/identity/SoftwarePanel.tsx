"use client";

import { forwardRef } from "react";
import { SoftwareNetwork } from "@/components/canvas/SoftwareNetwork";

type Props = {
  hovering: boolean;
  onHoverChange: (h: boolean) => void;
  onEnter: () => void;
  scrollProgress: number;
  interactive: boolean;
};

export const SoftwarePanel = forwardRef<HTMLDivElement, Props>(function SoftwarePanel(
  { hovering, onHoverChange, onEnter, scrollProgress, interactive },
  ref,
) {
  const warp = scrollProgress;
  const scaleTitle = 1 + warp * 2.2;
  const fadeChrome = 1 - Math.min(1, warp * 1.8);

  return (
    <div
      ref={ref}
      className={`sw-root absolute inset-0 overflow-hidden ${interactive ? "cursor-sw" : ""}`}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #0e1f3a 0%, var(--sw-bg) 55%, #030812 100%)",
        color: "var(--sw-ink)",
        isolation: "isolate",
        filter: `brightness(${1 + warp * 0.15}) saturate(${1 + warp * 0.3})`,
        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      }}
    >
      <div
        className="sw-grid-bg"
        style={{
          transform: `scale(${1 + warp * 1.4}) translateZ(0)`,
          opacity: 1 - warp * 0.5,
          transition: hovering ? "none" : "transform 0.4s",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${1 + warp * 1.8})`,
          opacity: 1 - warp * 0.9,
        }}
      >
        <SoftwareNetwork intensity={hovering ? 2.2 : 1} />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent ${40 - warp * 35}%, rgba(103,180,255,${warp * 0.3}) ${70 - warp * 30}%, transparent 100%)`,
          opacity: warp,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-conic-gradient(from 0deg at 50% 50%,
            transparent 0deg, transparent 1deg,
            rgba(103,180,255,${0.15 + warp * 0.25}) 1deg, rgba(103,180,255,${0.15 + warp * 0.25}) 1.5deg,
            transparent 1.5deg 5deg)`,
          transform: `scale(${1 + warp * 4}) rotate(${warp * 15}deg)`,
          opacity: warp * 0.9,
          mixBlendMode: "screen",
        }}
      />

      {/* Corner brackets */}
      <div className="pointer-events-none absolute inset-[28px]" style={{ opacity: fadeChrome }}>
        <div className="sw-bracket tl" />
        <div className="sw-bracket tr" />
        <div className="sw-bracket bl" />
        <div className="sw-bracket br" />
      </div>

      {/* Chrome */}
      <div
        className="pointer-events-none absolute inset-0 grid"
        style={{
          gridTemplateRows: "auto 1fr auto",
          padding: "32px 44px 110px",
          opacity: fadeChrome,
          transform: `scale(${1 - warp * 0.1})`,
        }}
      >
        <header
          className="pointer-events-auto flex items-start justify-between"
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--sw-mute)",
          }}
        >
          <div>
            <span style={{ color: "var(--sw-accent)" }}>01</span>
            <span style={{ margin: "0 10px", opacity: 0.4 }}>/</span>
            <span>02 IDENTITIES</span>
          </div>
          <div className="text-right leading-[1.8]">
            <div>
              SYS.STATUS — ONLINE
              <span
                className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{
                  background: "var(--sw-accent-2)",
                  boxShadow: "0 0 8px var(--sw-accent-2)",
                  animation: "swBlink 1.2s infinite",
                }}
              />
            </div>
            <div style={{ opacity: 0.6 }}>NODES · 142 &nbsp;·&nbsp; LAT 12ms</div>
          </div>
        </header>

        <div
          className="pointer-events-auto grid place-content-center text-left"
          style={{
            padding: "0 40px",
            transform: `scale(${scaleTitle})`,
            transformOrigin: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.3em",
              color: "var(--sw-accent)",
              marginBottom: 24,
            }}
          >
            <span style={{ opacity: 0.5 }}>{"// "}</span>IDENTITY_01 · ENGINEERING
          </div>

          <h1
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 500,
              fontSize: "clamp(64px, 11vw, 168px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
              color: "var(--sw-ink)",
              margin: 0,
            }}
          >
            Software
            <br />
            <em
              style={{
                fontStyle: "normal",
                color: "var(--sw-accent)",
                fontWeight: 300,
              }}
            >
              Developer
              <span style={{ color: "var(--sw-accent-2)", opacity: 0.7, fontWeight: 300 }}>.</span>
            </em>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 13,
              color: "var(--sw-mute)",
              marginTop: 28,
              maxWidth: 520,
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "var(--sw-accent)" }}>&gt;</span> Systems, interfaces, and the
            quiet craft of making them reliable.
            <br />
            <span style={{ color: "var(--sw-accent)" }}>&gt;</span> Scroll to enter, or press{" "}
            <b style={{ color: "var(--sw-accent-2)" }}>ENTER</b>.
          </p>

          <button
            type="button"
            onClick={onEnter}
            aria-label="Enter Software Developer portfolio"
            className="sw-enter"
            style={{
              marginTop: 44,
              display: "inline-flex",
              alignItems: "center",
              gap: 0,
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--sw-ink)",
              background: "transparent",
              border: "none",
              padding: 0,
              position: "relative",
              cursor: "inherit",
            }}
          >
            <span className="sw-enter-inner">
              <span style={{ padding: "16px 24px" }}>
                <span style={{ color: "var(--sw-mute)" }}>$</span>
                <span style={{ color: "var(--sw-accent-2)", margin: "0 6px 0 10px" }}>
                  ./enter
                </span>
                <span>—software</span>
              </span>
              <span className="sw-enter-arrow">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                  <path
                    d="M1 6h13m0 0L9 1m5 5L9 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </span>
          </button>
        </div>

        <div />
      </div>

      {/* Stats bar */}
      <div
        className="pointer-events-auto absolute top-1/2 -translate-y-1/2"
        style={{
          left: 44,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "var(--sw-mute)",
          lineHeight: 1.9,
          opacity: fadeChrome * 0.9,
        }}
      >
        <div style={{ marginBottom: 14 }}>
          <b
            style={{
              color: "var(--sw-ink)",
              fontWeight: 400,
              display: "block",
              marginBottom: 3,
              fontSize: 9,
              letterSpacing: "0.18em",
              opacity: 0.7,
            }}
          >
            UPTIME
          </b>
          99.98%
          <span className="sw-stats-bar" style={{ "--v": "99%" } as React.CSSProperties} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <b
            style={{
              color: "var(--sw-ink)",
              fontWeight: 400,
              display: "block",
              marginBottom: 3,
              fontSize: 9,
              letterSpacing: "0.18em",
              opacity: 0.7,
            }}
          >
            COMMITS/WK
          </b>
          84
          <span className="sw-stats-bar" style={{ "--v": "72%" } as React.CSSProperties} />
        </div>
        <div>
          <b
            style={{
              color: "var(--sw-ink)",
              fontWeight: 400,
              display: "block",
              marginBottom: 3,
              fontSize: 9,
              letterSpacing: "0.18em",
              opacity: 0.7,
            }}
          >
            FOCUS
          </b>
          DEEP
          <span className="sw-stats-bar" style={{ "--v": "88%" } as React.CSSProperties} />
        </div>
      </div>

      {/* Code fragment */}
      <div
        className="sw-code pointer-events-auto absolute top-1/2 -translate-y-1/2"
        style={{
          right: 44,
          fontFamily: "var(--font-jetbrains-mono), monospace",
          fontSize: 10.5,
          lineHeight: 1.75,
          color: "var(--sw-mute)",
          textAlign: "left",
          maxWidth: 260,
          opacity: fadeChrome * 0.85,
        }}
      >
        <div>
          <span className="ln">01</span>
          <span className="cm">// identity.ts</span>
        </div>
        <div>
          <span className="ln">02</span>
          <span className="kw">const</span> identity = {"{"}
        </div>
        <div>
          <span className="ln">03</span>&nbsp;&nbsp;role: <span className="st">{"'software-dev'"}</span>,
        </div>
        <div>
          <span className="ln">04</span>&nbsp;&nbsp;stack: [<span className="st">{"'ts'"}</span>,{" "}
          <span className="st">{"'rust'"}</span>, <span className="st">{"'go'"}</span>],
        </div>
        <div>
          <span className="ln">05</span>&nbsp;&nbsp;<span className="fn">enter</span>: () ={">"}{" "}
          warp(),
        </div>
        <div>
          <span className="ln">06</span>
          {"}"};
        </div>
      </div>
    </div>
  );
});
