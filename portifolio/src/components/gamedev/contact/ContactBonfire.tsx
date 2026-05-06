"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { siGamejolt, siItchdotio, siSteam } from "simple-icons";
import type { Dictionary, Locale } from "@/lib/i18n";
import { PORTFOLIO } from "@/lib/data";

type SignpostLogo = { type: "svg"; path: string } | { type: "email" };

type Signpost = {
  key: keyof Dictionary["gamedev"]["contact"]["signposts"];
  label: string;
  value: string;
  href: string;
  external: boolean;
  accent: string;
  logo: SignpostLogo;
};

export function ContactBonfire({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const router = useRouter();
  const [warping, setWarping] = useState(false);

  const signposts = useMemo<Signpost[]>(
    () => [
      {
        key: "itch",
        label: dict.gamedev.contact.signposts.itch,
        value: dict.gamedev.contact.signposts.itchValue,
        href: "https://renatogamer.itch.io/",
        external: true,
        accent: "#ff9567",
        logo: { type: "svg", path: siItchdotio.path },
      },
      {
        key: "gamejolt",
        label: dict.gamedev.contact.signposts.gamejolt,
        value: dict.gamedev.contact.signposts.gamejoltValue,
        href: "https://gamejolt.com/@RenatoGamer100/games",
        external: true,
        accent: "#5cffb7",
        logo: { type: "svg", path: siGamejolt.path },
      },
      {
        key: "steam",
        label: dict.gamedev.contact.signposts.steam,
        value: dict.gamedev.contact.signposts.steamValue,
        href: "https://steamcommunity.com/profiles/76561198161197140/",
        external: true,
        accent: "#67b4ff",
        logo: { type: "svg", path: siSteam.path },
      },
      {
        key: "email",
        label: dict.gamedev.contact.signposts.email,
        value: PORTFOLIO.email,
        href: `mailto:${PORTFOLIO.email}`,
        external: false,
        accent: "#ffd23f",
        logo: { type: "email" },
      },
    ],
    [dict],
  );

  const embers = useMemo(() => buildEmbers(28), []);

  const handleWarp = () => {
    if (warping) return;
    setWarping(true);
    window.setTimeout(() => {
      router.push(`/${locale}/software`);
    }, 700);
  };

  return (
    <section
      data-gd-section="contact"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        boxSizing: "border-box",
        padding: "128px 24px 90px",
        background:
          "linear-gradient(180deg, #050018 0%, #090421 14%, #170735 32%, #321041 54%, #6e214d 74%, #150727 100%)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 180,
          background:
            "linear-gradient(180deg, #050018 0%, rgba(5,0,24,0.72) 44%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: "0 0 34% 0",
          backgroundImage:
            "radial-gradient(1px 1px at 6% 12%, rgba(255,255,255,0.85), transparent 60%)," +
            "radial-gradient(1px 1px at 14% 26%, rgba(92,255,183,0.72), transparent 60%)," +
            "radial-gradient(1.5px 1.5px at 22% 8%, rgba(255,255,255,0.9), transparent 60%)," +
            "radial-gradient(1px 1px at 31% 18%, rgba(255,255,255,0.5), transparent 60%)," +
            "radial-gradient(1px 1px at 44% 4%, rgba(103,180,255,0.8), transparent 60%)," +
            "radial-gradient(1.5px 1.5px at 56% 22%, rgba(255,255,255,0.65), transparent 60%)," +
            "radial-gradient(1px 1px at 64% 6%, rgba(255,255,255,0.85), transparent 60%)," +
            "radial-gradient(1px 1px at 73% 14%, rgba(255,255,255,0.5), transparent 60%)," +
            "radial-gradient(1.5px 1.5px at 82% 26%, rgba(92,255,183,0.85), transparent 60%)," +
            "radial-gradient(1px 1px at 90% 9%, rgba(255,255,255,0.7), transparent 60%)," +
            "radial-gradient(1px 1px at 96% 18%, rgba(255,255,255,0.55), transparent 60%)",
          maskImage:
            "linear-gradient(180deg, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, black 60%, transparent 100%)",
          animation: "gdTwinkle 4.5s ease-in-out infinite",
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "18%",
          width: 760,
          height: 420,
          marginLeft: -380,
          marginTop: -210,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 52%, rgba(92,255,183,0.2) 0%, rgba(103,180,255,0.14) 34%, rgba(255,107,158,0.08) 56%, transparent 72%)",
          filter: "blur(10px)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "18%",
          width: 380,
          height: 380,
          marginLeft: -190,
          marginTop: -190,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, transparent 0 46%, rgba(92,255,183,0.95) 47% 49%, rgba(103,180,255,0.45) 50% 54%, transparent 56%), conic-gradient(from 20deg, transparent 0 11%, rgba(92,255,183,0.34) 12% 15%, transparent 16% 26%, rgba(255,210,63,0.28) 27% 30%, transparent 31% 44%, rgba(103,180,255,0.34) 45% 48%, transparent 49% 64%, rgba(255,107,158,0.28) 65% 68%, transparent 69% 100%)",
          boxShadow:
            "0 0 70px rgba(92,255,183,0.32), inset 0 0 42px rgba(103,180,255,0.18)",
          animation: "gdContactHaloPulse 5s ease-in-out infinite",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "18%",
          width: 380,
          height: 380,
          marginLeft: -190,
          marginTop: -190,
          borderRadius: "50%",
          background:
            "repeating-linear-gradient(180deg, transparent 0 10px, rgba(92,255,183,0.22) 10px 12px, transparent 12px 24px)",
          mask:
            "radial-gradient(circle, transparent 0 39%, black 43%, black 54%, transparent 58%)",
          WebkitMask:
            "radial-gradient(circle, transparent 0 39%, black 43%, black 54%, transparent 58%)",
          mixBlendMode: "screen",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "18%",
          width: 3,
          height: 310,
          background:
            "linear-gradient(180deg, rgba(92,255,183,0.65), rgba(255,210,63,0.22) 54%, transparent 100%)",
          boxShadow:
            "0 0 18px rgba(92,255,183,0.6), 0 0 42px rgba(103,180,255,0.32)",
          opacity: 0.58,
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      <svg
        aria-hidden
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 260,
          width: "100%",
          height: 220,
          pointerEvents: "none",
          opacity: 0.48,
        }}
      >
        <path
          d="M0 220 L0 154 L74 118 L136 142 L214 90 L292 130 L360 96 L418 118 L480 70 L548 122 L612 88 L686 126 L744 76 L814 124 L888 100 L948 132 L1014 84 L1080 130 L1142 102 L1200 136 L1200 220 Z"
          fill="#251040"
        />
        <rect x="150" y="104" width="42" height="72" fill="#251040" />
        <rect x="160" y="88" width="22" height="16" fill="#251040" />
        <rect x="500" y="92" width="80" height="76" fill="#251040" />
        <path
          d="M500 92 C508 54 572 54 580 92 L562 92 C554 74 526 74 518 92 Z"
          fill="#251040"
        />
        <rect x="912" y="108" width="18" height="50" fill="#251040" />
        <rect x="938" y="92" width="18" height="66" fill="#251040" />
        <rect x="964" y="116" width="18" height="42" fill="#251040" />
      </svg>

      <svg
        aria-hidden
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 146,
          width: "100%",
          height: 200,
          pointerEvents: "none",
        }}
      >
        <path
          d="M0 200 L0 138 L72 130 L134 146 L214 122 L284 140 L368 112 L446 136 L530 120 L610 138 L700 108 L784 140 L866 126 L946 142 L1028 116 L1108 138 L1200 124 L1200 200 Z"
          fill="#12051f"
        />
        <path
          d="M0 138 L72 130 L134 146 L214 122 L284 140 L368 112 L446 136 L530 120 L610 138 L700 108 L784 140 L866 126 L946 142 L1028 116 L1108 138 L1200 124"
          stroke="rgba(92,255,183,0.26)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 260,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(8,3,18,0.82) 16%, #070311 42%, #020007 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 208,
          height: 48,
          background:
            "repeating-linear-gradient(90deg, rgba(255,247,220,0.12) 0 14px, transparent 14px 28px), linear-gradient(180deg, #261235 0 8px, #16081f 8px 20px, #0b0310 20px 100%)",
          imageRendering: "pixelated",
          boxShadow:
            "0 -2px 0 rgba(92,255,183,0.28), 0 6px 0 rgba(0,0,0,0.45)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: 50,
          width: 520,
          height: 200,
          marginLeft: -260,
          background:
            "radial-gradient(ellipse 50% 55% at 50% 78%, rgba(255,210,63,0.38) 0%, rgba(255,107,158,0.22) 40%, transparent 76%)",
          mixBlendMode: "screen",
          animation: "gdGlowPulse 2.4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: 92,
          transform: "translateX(-50%)",
          width: 200,
          height: 170,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 68%, rgba(255,210,63,0.5) 0%, rgba(255,107,158,0.22) 38%, transparent 68%)",
            filter: "blur(2px)",
            animation: "gdGlowPulse 2.4s ease-in-out infinite",
          }}
        />

        <svg
          viewBox="0 0 200 170"
          width="200"
          height="170"
          style={{ position: "absolute", inset: 0 }}
          shapeRendering="crispEdges"
        >
          <ellipse cx="100" cy="158" rx="64" ry="6" fill="rgba(0,0,0,0.55)" />

          <g>
            <rect x="44" y="138" width="14" height="14" fill="#3a2545" />
            <rect x="44" y="136" width="14" height="2" fill="#5a3f60" />
            <rect x="44" y="150" width="14" height="2" fill="#1a0a26" />

            <rect x="58" y="142" width="18" height="12" fill="#4a3055" />
            <rect x="58" y="140" width="18" height="2" fill="#6a5070" />
            <rect x="58" y="152" width="18" height="2" fill="#22102a" />

            <rect x="76" y="138" width="48" height="16" fill="#5a4060" />
            <rect x="76" y="136" width="48" height="2" fill="#7a5a80" />
            <rect x="76" y="152" width="48" height="2" fill="#2a1235" />

            <rect x="124" y="142" width="18" height="12" fill="#4a3055" />
            <rect x="124" y="140" width="18" height="2" fill="#6a5070" />
            <rect x="124" y="152" width="18" height="2" fill="#22102a" />

            <rect x="142" y="138" width="14" height="14" fill="#3a2545" />
            <rect x="142" y="136" width="14" height="2" fill="#5a3f60" />
            <rect x="142" y="150" width="14" height="2" fill="#1a0a26" />
          </g>

          <g transform="rotate(-22 100 122)">
            <rect x="50" y="118" width="100" height="12" fill="#3a1810" />
            <rect x="50" y="118" width="100" height="3" fill="#7a3a26" />
            <rect x="50" y="127" width="100" height="3" fill="#1a0808" />
            <ellipse cx="50" cy="124" rx="3" ry="6" fill="#2a1208" />
            <ellipse cx="50" cy="124" rx="2" ry="4" fill="#5a2818" />
            <ellipse cx="150" cy="124" rx="3" ry="6" fill="#2a1208" />
            <ellipse cx="150" cy="124" rx="2" ry="4" fill="#5a2818" />
            <rect x="78" y="121" width="2" height="6" fill="#5a2818" opacity="0.7" />
            <rect x="100" y="121" width="2" height="6" fill="#5a2818" opacity="0.7" />
            <rect x="120" y="121" width="2" height="6" fill="#5a2818" opacity="0.7" />
          </g>

          <g transform="rotate(22 100 116)">
            <rect x="50" y="110" width="100" height="14" fill="#4a2014" />
            <rect x="50" y="110" width="100" height="3" fill="#8a4a2e" />
            <rect x="50" y="121" width="100" height="3" fill="#22100a" />
            <ellipse cx="50" cy="117" rx="4" ry="7" fill="#2a1208" />
            <ellipse cx="50" cy="117" rx="2.5" ry="5" fill="#6a3020" />
            <ellipse cx="50" cy="117" rx="1" ry="2" fill="#3a1810" />
            <ellipse cx="150" cy="117" rx="4" ry="7" fill="#2a1208" />
            <ellipse cx="150" cy="117" rx="2.5" ry="5" fill="#6a3020" />
            <ellipse cx="150" cy="117" rx="1" ry="2" fill="#3a1810" />
            <rect x="78" y="113" width="2" height="8" fill="#6a2818" opacity="0.6" />
            <rect x="100" y="113" width="2" height="8" fill="#6a2818" opacity="0.6" />
            <rect x="120" y="113" width="2" height="8" fill="#6a2818" opacity="0.6" />
            <rect x="84" y="116" width="3" height="3" fill="#ff9567" />
            <rect x="110" y="115" width="3" height="3" fill="#ffd23f" />
          </g>
        </svg>

        <div
          className="gd-flame-outer"
          style={{
            position: "absolute",
            left: "50%",
            bottom: 58,
            width: 72,
            height: 116,
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse 50% 70% at 50% 100%, #ff3e6b 0%, rgba(255,107,158,0.55) 45%, transparent 80%)",
            filter: "blur(4px)",
            mixBlendMode: "screen",
          }}
        />

        <div
          className="gd-flame-middle"
          style={{
            position: "absolute",
            left: "50%",
            bottom: 62,
            width: 46,
            height: 84,
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse 50% 70% at 50% 100%, #ffd23f 0%, #ff9567 50%, transparent 86%)",
            filter: "blur(2px)",
            mixBlendMode: "screen",
          }}
        />

        <div
          className="gd-flame-core"
          style={{
            position: "absolute",
            left: "50%",
            bottom: 66,
            width: 20,
            height: 46,
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse 50% 70% at 50% 100%, #fff7dc 0%, #ffd23f 60%, transparent 95%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {embers.map((e) => (
        <span
          key={e.key}
          aria-hidden
          style={{
            position: "absolute",
            left: `${e.x}%`,
            bottom: 200,
            width: e.size,
            height: e.size,
            background: e.color,
            boxShadow: `0 0 ${e.size * 2}px ${e.color}`,
            opacity: 0,
            animation: `gdAmbientRise ${e.dur}s linear ${e.delay}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        aria-hidden
        className="gd-scanlines"
        style={{ opacity: 0.18, zIndex: 1 }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gap: 36,
        }}
      >
        <header style={{ textAlign: "center", display: "grid", gap: 14 }}>
          <div
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 11,
              letterSpacing: 4,
              color: "var(--gd-accent)",
              textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
            }}
          >
            ☼ {dict.gamedev.contact.sectionLabel}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontWeight: 400,
              fontSize: "clamp(28px, 4.4vw, 56px)",
              lineHeight: 1.1,
              color: "var(--gd-ink)",
              textShadow:
                "3px 3px 0 var(--gd-accent-3), 6px 6px 0 #3a0f5e, 9px 9px 0 rgba(0,0,0,0.4)",
              margin: 0,
            }}
          >
            {dict.gamedev.contact.title}
          </h2>
          <div
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: 22,
              letterSpacing: 2,
              color: "var(--gd-ink)",
              opacity: 0.92,
              textShadow: "2px 2px 0 rgba(0,0,0,0.4)",
            }}
          >
            {dict.gamedev.contact.blurb}
          </div>
        </header>

        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {signposts.map((s, i) => (
            <li key={s.key}>
              <motion.a
                href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 220, damping: 16 }}
                style={{
                  display: "grid",
                  gap: 8,
                  minHeight: 118,
                  gridTemplateColumns: "46px 1fr",
                  alignItems: "center",
                  padding: "18px 20px 18px 24px",
                  background:
                    "linear-gradient(180deg, rgba(92,48,45,0.9) 0%, rgba(56,26,38,0.94) 100%)",
                  border: `3px solid ${s.accent}`,
                  boxShadow:
                    "6px 6px 0 rgba(0,0,0,0.55), inset 0 0 0 2px rgba(255,247,220,0.16), inset 0 -12px 0 rgba(0,0,0,0.12)",
                  textDecoration: "none",
                  color: "var(--gd-ink)",
                  fontFamily: "var(--font-press-start), monospace",
                  imageRendering: "pixelated",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: "8px 12px auto 18px",
                    height: 3,
                    background:
                      "repeating-linear-gradient(90deg, rgba(255,247,220,0.36) 0 18px, rgba(255,247,220,0.1) 18px 24px)",
                    opacity: 0.75,
                  }}
                />
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: -10,
                    top: 12,
                    bottom: 12,
                    width: 6,
                    background: "#9e6231",
                    boxShadow:
                      "inset 0 5px 0 rgba(255,255,255,0.22), inset 0 -5px 0 rgba(0,0,0,0.3)",
                  }}
                />
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: -18,
                    top: "50%",
                    width: 34,
                    height: 34,
                    transform: "translateY(-50%) rotate(45deg)",
                    background: "rgba(10,4,24,0.92)",
                    borderTop: `3px solid ${s.accent}`,
                    borderRight: `3px solid ${s.accent}`,
                  }}
                />
                <span
                  aria-hidden
                  style={{
                    width: 38,
                    height: 38,
                    display: "grid",
                    placeItems: "center",
                    color: "#050018",
                    background: s.accent,
                    boxShadow:
                      "3px 3px 0 rgba(0,0,0,0.48), inset 0 0 0 2px rgba(255,247,220,0.28)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <SignpostLogo logo={s.logo} />
                </span>
                <div
                  style={{
                    display: "grid",
                    gap: 8,
                    minWidth: 0,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: 9,
                      letterSpacing: 3,
                      color: s.accent,
                      textShadow: "2px 2px 0 rgba(0,0,0,0.45)",
                    }}
                  >
                    ▶ {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: 18,
                      letterSpacing: 1,
                      color: "var(--gd-ink)",
                      lineHeight: 1.05,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {s.value}
                  </div>
                </div>
              </motion.a>
            </li>
          ))}
        </ul>

        <div
          style={{
            position: "relative",
            marginTop: 16,
            padding: 28,
            background:
              "radial-gradient(ellipse at 50% 50%, #0a1638 0%, #050b1c 58%, #02030a 100%)",
            border: "3px solid #5cffb7",
            boxShadow:
              "6px 6px 0 rgba(0,0,0,0.55), inset 0 0 0 2px rgba(255,247,220,0.15)",
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 24,
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(1px 1px at 8% 18%, rgba(255,255,255,0.85), transparent 60%)," +
                "radial-gradient(1px 1px at 16% 72%, rgba(199,226,255,0.7), transparent 60%)," +
                "radial-gradient(1.5px 1.5px at 24% 36%, rgba(255,255,255,0.9), transparent 60%)," +
                "radial-gradient(1px 1px at 33% 88%, rgba(199,226,255,0.5), transparent 60%)," +
                "radial-gradient(1px 1px at 42% 14%, rgba(255,255,255,0.7), transparent 60%)," +
                "radial-gradient(1.5px 1.5px at 58% 82%, rgba(255,255,255,0.85), transparent 60%)," +
                "radial-gradient(1px 1px at 66% 28%, rgba(199,226,255,0.6), transparent 60%)," +
                "radial-gradient(1px 1px at 76% 64%, rgba(255,255,255,0.7), transparent 60%)," +
                "radial-gradient(1.5px 1.5px at 84% 22%, rgba(255,255,255,0.9), transparent 60%)," +
                "radial-gradient(1px 1px at 92% 78%, rgba(199,226,255,0.55), transparent 60%)," +
                "radial-gradient(1px 1px at 96% 42%, rgba(255,255,255,0.7), transparent 60%)",
              maskImage:
                "radial-gradient(ellipse at center, transparent 0%, black 38%, black 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, transparent 0%, black 38%, black 100%)",
              animation: "gdTwinkle 4.5s ease-in-out infinite",
              opacity: 0.85,
              pointerEvents: "none",
            }}
          />

          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            {STREAK_ANGLES.map((deg, i) => (
              <span
                key={deg}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: 0,
                  height: 0,
                  transform: `rotate(${deg}deg)`,
                  transformOrigin: "0 0",
                }}
              >
                <span
                  className="gd-warp-streak"
                  style={
                    {
                      display: "block",
                      width: 110,
                      height: 1,
                      transform: "translateX(46px)",
                      transformOrigin: "0 50%",
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(199,226,255,0.85) 55%, rgba(255,255,255,0.95) 90%, transparent 100%)",
                      animationDelay: `${(i * 0.18).toFixed(2)}s`,
                    } as CSSProperties
                  }
                />
              </span>
            ))}
          </div>

          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 18% 50%, rgba(92,255,183,0.18) 0%, transparent 28%)," +
                "radial-gradient(ellipse at center, transparent 55%, rgba(2,3,10,0.55) 100%)",
              pointerEvents: "none",
            }}
          />

          <div
            aria-hidden
            style={{
              position: "relative",
              zIndex: 1,
              width: 88,
              height: 88,
              filter: "drop-shadow(0 0 12px rgba(92,255,183,0.55))",
            }}
          >
            <svg
              viewBox="0 0 88 88"
              width="88"
              height="88"
              shapeRendering="crispEdges"
              style={{ display: "block" }}
            >
              <defs>
                <clipPath id="gd-crt-scroll">
                  <rect x="14" y="14" width="60" height="26" />
                </clipPath>
              </defs>

              <rect x="6" y="8" width="76" height="54" fill="#2a1a35" />
              <rect x="6" y="8" width="76" height="2" fill="#4a2f55" />
              <rect x="6" y="60" width="76" height="2" fill="#160820" />
              <rect x="6" y="8" width="2" height="54" fill="#3a2548" />
              <rect x="80" y="8" width="2" height="54" fill="#1a0d28" />

              <rect x="12" y="12" width="64" height="44" fill="#0a0014" />
              <rect x="14" y="14" width="60" height="40" fill="#021202" />

              <g clipPath="url(#gd-crt-scroll)">
                <g
                  className="gd-warp-boot"
                  style={
                    {
                      ["--gd-boot-shift" as string]: "-40px",
                    } as CSSProperties
                  }
                >
                  <rect x="17" y="17" width="2" height="3" fill="#5cffb7" />
                  <rect x="21" y="18" width="10" height="2" fill="#5cffb7" />
                  <rect x="33" y="18" width="6" height="2" fill="#5cffb7" />

                  <rect x="17" y="25" width="20" height="2" fill="#5cffb7" opacity="0.75" />
                  <rect x="39" y="25" width="8" height="2" fill="#5cffb7" opacity="0.75" />

                  <rect x="17" y="33" width="2" height="3" fill="#5cffb7" />
                  <rect x="21" y="34" width="14" height="2" fill="#5cffb7" />

                  <rect x="17" y="41" width="22" height="2" fill="#5cffb7" opacity="0.7" />
                  <rect x="41" y="41" width="6" height="2" fill="#5cffb7" opacity="0.7" />

                  <rect x="17" y="49" width="2" height="3" fill="#5cffb7" />
                  <rect x="21" y="50" width="8" height="2" fill="#5cffb7" />
                  <rect x="31" y="50" width="12" height="2" fill="#5cffb7" />

                  <rect x="17" y="57" width="2" height="3" fill="#5cffb7" />
                  <rect x="21" y="58" width="10" height="2" fill="#5cffb7" />
                  <rect x="33" y="58" width="6" height="2" fill="#5cffb7" />

                  <rect x="17" y="65" width="20" height="2" fill="#5cffb7" opacity="0.75" />
                  <rect x="39" y="65" width="8" height="2" fill="#5cffb7" opacity="0.75" />

                  <rect x="17" y="73" width="2" height="3" fill="#5cffb7" />
                  <rect x="21" y="74" width="14" height="2" fill="#5cffb7" />

                  <rect x="17" y="81" width="22" height="2" fill="#5cffb7" opacity="0.7" />
                  <rect x="41" y="81" width="6" height="2" fill="#5cffb7" opacity="0.7" />

                  <rect x="17" y="89" width="2" height="3" fill="#5cffb7" />
                  <rect x="21" y="90" width="8" height="2" fill="#5cffb7" />
                  <rect x="31" y="90" width="12" height="2" fill="#5cffb7" />
                </g>
              </g>

              <rect x="17" y="46" width="2" height="3" fill="#5cffb7" />
              <rect x="21" y="47" width="6" height="2" fill="#5cffb7" />
              <rect
                x="29"
                y="46"
                width="3"
                height="4"
                fill="#5cffb7"
                className="gd-warp-cursor"
              />

              <g pointerEvents="none">
                <rect x="14" y="16" width="60" height="0.5" fill="rgba(92,255,183,0.18)" />
                <rect x="14" y="20" width="60" height="0.5" fill="rgba(92,255,183,0.18)" />
                <rect x="14" y="24" width="60" height="0.5" fill="rgba(92,255,183,0.18)" />
                <rect x="14" y="28" width="60" height="0.5" fill="rgba(92,255,183,0.18)" />
                <rect x="14" y="32" width="60" height="0.5" fill="rgba(92,255,183,0.18)" />
                <rect x="14" y="36" width="60" height="0.5" fill="rgba(92,255,183,0.18)" />
                <rect x="14" y="40" width="60" height="0.5" fill="rgba(92,255,183,0.18)" />
                <rect x="14" y="44" width="60" height="0.5" fill="rgba(92,255,183,0.18)" />
                <rect x="14" y="48" width="60" height="0.5" fill="rgba(92,255,183,0.18)" />
                <rect x="14" y="52" width="60" height="0.5" fill="rgba(92,255,183,0.18)" />
              </g>

              <rect x="14" y="14" width="60" height="40" fill="none" stroke="#5cffb7" strokeWidth="0.5" opacity="0.5" />

              <rect x="74" y="56" width="2" height="2" fill="#ffd23f" />

              <rect x="36" y="62" width="16" height="6" fill="#2a1a35" />
              <rect x="36" y="62" width="16" height="1" fill="#4a2f55" />

              <rect x="22" y="68" width="44" height="4" fill="#2a1a35" />
              <rect x="22" y="68" width="44" height="1" fill="#4a2f55" />
              <rect x="22" y="71" width="44" height="1" fill="#160820" />
            </svg>
          </div>
          <div style={{ display: "grid", gap: 6 }}>
            <div
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontSize: 9,
                letterSpacing: 3,
                color: "#5cffb7",
              }}
            >
              {dict.gamedev.contact.crossLabel}
            </div>
            <div
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontSize: 14,
                letterSpacing: 1.5,
                lineHeight: 1.3,
                color: "var(--gd-ink)",
                textShadow: "2px 2px 0 rgba(0,0,0,0.45)",
              }}
            >
              {dict.gamedev.contact.crossTitle}
            </div>
            <div
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: 18,
                letterSpacing: 1,
                color: "var(--gd-ink)",
                opacity: 0.88,
              }}
            >
              {dict.gamedev.contact.crossBlurb}
            </div>
          </div>
          <motion.button
            type="button"
            onClick={handleWarp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "14px 22px",
              background: "#5cffb7",
              color: "#050018",
              border: "3px solid #fff7dc",
              boxShadow: "4px 4px 0 rgba(0,0,0,0.55)",
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 11,
              letterSpacing: 2,
              cursor: "pointer",
              imageRendering: "pixelated",
            }}
          >
            {dict.gamedev.contact.crossButton} »
          </motion.button>
        </div>

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            borderTop: "1px dashed rgba(255,247,220,0.25)",
            fontFamily: "var(--font-press-start), monospace",
            fontSize: 9,
            letterSpacing: 3,
            color: "var(--gd-ink)",
            opacity: 0.7,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>{dict.gamedev.contact.footerNote}</span>
          <span style={{ color: "var(--gd-accent)" }}>
            ◉ {PORTFOLIO.location.toUpperCase()}
          </span>
        </div>
      </div>

      <motion.div
        aria-hidden
        animate={{ opacity: warping ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background:
            "radial-gradient(circle at 50% 55%, #050b16 0%, #050b16 60%, transparent 100%)",
          pointerEvents: warping ? "auto" : "none",
        }}
      />
    </section>
  );
}

function SignpostLogo({ logo }: { logo: SignpostLogo }) {
  if (logo.type === "svg") {
    return (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="currentColor"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <path d={logo.path} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      aria-hidden="true"
      shapeRendering="crispEdges"
      style={{ display: "block" }}
    >
      <rect x="3" y="6" width="18" height="12" fill="currentColor" />
      <path d="M4 7 L12 13 L20 7" stroke="#ffd23f" strokeWidth="2" />
      <path d="M4 17 L10 12" stroke="#ffd23f" strokeWidth="2" />
      <path d="M20 17 L14 12" stroke="#ffd23f" strokeWidth="2" />
    </svg>
  );
}

const STREAK_ANGLES: number[] = [
  0, 38, 76, 118, 156, 198, 236, 278, 318,
];

function buildEmbers(count: number) {
  const arr: {
    key: number;
    x: number;
    size: number;
    dur: number;
    delay: number;
    color: string;
  }[] = [];
  let h = 0x9e3779b9;
  const rand = () => {
    h = (h * 1664525 + 1013904223) | 0;
    return ((h >>> 0) % 100000) / 100000;
  };
  const colors = ["#ffd23f", "#ff9567", "#ff6b9e", "#fff7dc"];
  for (let i = 0; i < count; i++) {
    arr.push({
      key: i,
      x: 36 + rand() * 28,
      size: 2 + Math.floor(rand() * 3),
      dur: 3.4 + rand() * 2.6,
      delay: rand() * 4,
      color: colors[Math.floor(rand() * colors.length)],
    });
  }
  return arr;
}
