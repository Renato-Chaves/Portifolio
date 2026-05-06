"use client";

import { forwardRef } from "react";
import { SoftwareNetwork } from "@/components/canvas/SoftwareNetwork";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  hovering: boolean;
  onHoverChange: (h: boolean) => void;
  onEnter: () => void;
  scrollProgress: number;
  interactive: boolean;
};

export const SoftwarePanel = forwardRef<HTMLDivElement, Props>(function SoftwarePanel(
  { dict, hovering, onHoverChange, onEnter, scrollProgress, interactive },
  ref,
) {
  const s = dict.identity.software;
  const head = dict.identity;
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

      {warp > 0 && (
        <>
          <div
            aria-hidden
            className="sw-starfield pointer-events-none absolute inset-0"
            style={{
              transform: `scale(${1 + warp * 16})`,
              opacity: Math.min(1, warp * 1.5),
              filter: `blur(${warp * 1.2}px)`,
              mixBlendMode: "screen",
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `repeating-conic-gradient(from ${warp * 6}deg at 50% 50%,
                transparent 0deg, transparent 1.4deg,
                rgba(103,180,255,0.55) 1.4deg, rgba(103,180,255,0.55) 1.65deg,
                transparent 1.65deg 3.2deg)`,
              transform: `scale(${1 + warp * 6})`,
              opacity: warp * 0.75,
              mixBlendMode: "screen",
              maskImage:
                "radial-gradient(circle, transparent 0%, black 35%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 0%, black 35%, black 85%, transparent 100%)",
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `repeating-conic-gradient(from ${-warp * 14}deg at 50% 50%,
                transparent 0deg, transparent 4.2deg,
                rgba(200,235,255,${0.75 + warp * 0.25}) 4.2deg, rgba(200,235,255,${0.75 + warp * 0.25}) 4.75deg,
                transparent 4.75deg 11deg)`,
              transform: `scale(${1 + warp * 13})`,
              opacity: warp,
              mixBlendMode: "screen",
              maskImage:
                "radial-gradient(circle, transparent 8%, black 55%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle, transparent 8%, black 55%, transparent 100%)",
              filter: `blur(${warp * 2}px)`,
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 50%,
                rgba(255,255,255,${warp * 0.9}) 0%,
                rgba(110,240,232,${warp * 0.55}) ${8 + warp * 12}%,
                rgba(103,180,255,${warp * 0.3}) ${28 + warp * 18}%,
                transparent ${58 + warp * 15}%)`,
              opacity: warp,
              mixBlendMode: "screen",
            }}
          />
        </>
      )}

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
            <span>{head.statusLine}</span>
          </div>
          <div className="text-right leading-[1.8]">
            <div>
              {head.sysStatus}
              <span
                className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                style={{
                  background: "var(--sw-accent-2)",
                  boxShadow: "0 0 8px var(--sw-accent-2)",
                  animation: "swBlink 1.2s infinite",
                }}
              />
            </div>
            <div style={{ opacity: 0.6 }}>{head.nodes}</div>
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
            <span style={{ opacity: 0.5 }}>{"// "}</span>{s.badge}
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
              filter:
                warp > 0
                  ? `drop-shadow(-${warp * 4}px 0 rgba(255,90,140,${warp * 0.55})) drop-shadow(${warp * 4}px 0 rgba(110,240,232,${warp * 0.7}))`
                  : undefined,
            }}
          >
            {s.title1}
            <br />
            <em
              style={{
                fontStyle: "normal",
                color: "var(--sw-accent)",
                fontWeight: 300,
              }}
            >
              {s.title2}
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
            <span style={{ color: "var(--sw-accent)" }}>&gt;</span> {s.line1}
            <br />
            <span style={{ color: "var(--sw-accent)" }}>&gt;</span> {s.line2Before}{" "}
            <b style={{ color: "var(--sw-accent-2)" }}>ENTER</b>{s.line2After}
          </p>

          <button
            type="button"
            onClick={onEnter}
            aria-label={s.enterAria}
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
                <span style={{ color: "var(--sw-mute)" }}>{s.enterPrefix}</span>
                <span style={{ color: "var(--sw-accent-2)", margin: "0 6px 0 10px" }}>
                  {s.enterCmd}
                </span>
                <span>{s.enterArg}</span>
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
            {s.statsCuriosity}
          </b>
          {s.statsCuriosityValue}
          <span className="sw-stats-bar" style={{ "--v": "92%" } as React.CSSProperties} />
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
            {s.statsCraft}
          </b>
          {s.statsCraftValue}
          <span className="sw-stats-bar" style={{ "--v": "86%" } as React.CSSProperties} />
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
            {s.statsDesign}
          </b>
          {s.statsDesignValue}
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
          <span className="st">{"'next'"}</span>, <span className="st">{"'go'"}</span>],
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

      {warp > 0.42 && (
        <div
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            bottom: "22%",
            left: "50%",
            transform: `translateX(-50%) scale(${1 + warp * 0.25})`,
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--sw-accent-2)",
            opacity: Math.min(1, (warp - 0.42) * 3.5),
            textShadow: "0 0 10px rgba(110,240,232,0.7)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ opacity: 0.55, color: "var(--sw-mute)", marginRight: 8 }}>&gt;</span>
          warp.init<span style={{ color: "var(--sw-accent)" }}>()</span>
          <span
            style={{
              display: "inline-block",
              width: 7,
              height: 13,
              background: "var(--sw-accent-2)",
              marginLeft: 8,
              verticalAlign: "-2px",
              animation: "swBlink 0.6s infinite",
            }}
          />
        </div>
      )}

      {warp > 0.82 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "white",
            opacity: Math.min(1, (warp - 0.82) * 5.5),
          }}
        />
      )}
    </div>
  );
});
