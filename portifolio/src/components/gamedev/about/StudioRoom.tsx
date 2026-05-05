"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

export function StudioRoom({ dict }: { dict: Dictionary }) {
  const stats = dict.gamedev.about.stats;
  return (
    <section
      data-gd-section="about"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        padding: "120px 24px 140px",
        background:
          "linear-gradient(180deg, #0a2c12 0%, #1a4528 35%, #2a3458 80%, #1a0530 100%)",
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
          height: 120,
          background:
            "linear-gradient(180deg, #1a0530 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(2px 2px at 12% 18%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 28% 32%, rgba(255,255,255,0.4), transparent), radial-gradient(1.5px 1.5px at 65% 22%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 84% 10%, rgba(255,255,255,0.5), transparent)",
          animation: "gdTwinkle 5s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        className="gd-scanlines"
        style={{ opacity: 0.18, zIndex: 1 }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gap: 40,
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
            ◉ {dict.gamedev.about.sectionLabel}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontWeight: 400,
              fontSize: "clamp(28px, 4.4vw, 56px)",
              lineHeight: 1.1,
              color: "var(--gd-ink)",
              textShadow:
                "3px 3px 0 var(--gd-accent-3), 6px 6px 0 #3a0f5e",
              margin: 0,
            }}
          >
            {dict.gamedev.about.title}
          </h2>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 5fr) minmax(0, 7fr)",
            gap: 36,
            alignItems: "stretch",
          }}
          className="gd-about-grid"
        >
          <CharacterCard dict={dict} />

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              padding: "26px 28px",
              background: "rgba(10,4,24,0.78)",
              border: "3px solid var(--gd-accent)",
              boxShadow:
                "6px 6px 0 rgba(0,0,0,0.55), inset 0 0 0 2px rgba(255,247,220,0.15)",
              imageRendering: "pixelated",
              display: "grid",
              gap: 16,
            }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: -16,
                top: 38,
                width: 0,
                height: 0,
                borderTop: "16px solid transparent",
                borderBottom: "16px solid transparent",
                borderRight: "16px solid var(--gd-accent)",
              }}
            />
            <span
              aria-hidden
              style={{
                position: "absolute",
                left: -10,
                top: 42,
                width: 0,
                height: 0,
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                borderRight: "12px solid rgba(10,4,24,0.78)",
              }}
            />

            <div
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: 22,
                color: "var(--gd-accent-2)",
                lineHeight: 1.4,
                letterSpacing: 1,
              }}
            >
              {dict.gamedev.about.intro}
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {dict.gamedev.about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: 18,
                    lineHeight: 1.55,
                    color: "var(--gd-ink)",
                    opacity: 0.92,
                    letterSpacing: 0.5,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div
              style={{
                marginTop: 8,
                paddingTop: 16,
                borderTop: "1px dashed rgba(255,210,63,0.35)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                gap: 12,
              }}
            >
              {(
                [
                  ["class", stats.class],
                  ["level", stats.level],
                  ["engines", stats.engines],
                  ["jams", stats.jams],
                ] as const
              ).map(([k, s]) => (
                <div key={k} style={{ display: "grid", gap: 4 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-press-start), monospace",
                      fontSize: 8,
                      letterSpacing: 2,
                      color: "var(--gd-accent)",
                    }}
                  >
                    {s.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: 16,
                      color: "var(--gd-ink)",
                    }}
                  >
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

function CharacterCard({ dict: _dict }: { dict: Dictionary }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        background:
          "linear-gradient(180deg, #1a0530 0%, #2a0a48 60%, #5b1d7a 100%)",
        border: "3px solid var(--gd-ink)",
        boxShadow:
          "6px 6px 0 rgba(0,0,0,0.55), inset 0 0 0 2px rgba(255,210,63,0.32)",
        padding: 22,
        imageRendering: "pixelated",
        minHeight: 360,
        overflow: "hidden",
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gap: 16,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,210,63,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,210,63,0.05) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "var(--font-press-start), monospace",
          fontSize: 8,
          letterSpacing: 2,
          color: "var(--gd-accent)",
        }}
      >
        <span>▢ STUDIO 02-A</span>
        <span style={{ color: "var(--gd-accent-2)" }}>● REC</span>
      </div>

      <PixelDeskScene />

      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: "var(--font-press-start), monospace",
          fontSize: 8,
          letterSpacing: 2,
          color: "var(--gd-ink)",
          opacity: 0.85,
        }}
      >
        <span style={{ color: "var(--gd-accent-3)" }}>♥ ♥ ♥ ♥ ♥</span>
        <span>SAVE 02</span>
      </div>
    </motion.div>
  );
}

function PixelDeskScene() {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "5 / 4",
        margin: "auto 0",
        background:
          "linear-gradient(180deg, #2a3458 0%, #1a1f3a 70%, #0a0a1a 100%)",
        border: "2px solid #1a0530",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "30%",
          height: 6,
          background: "#3a0f5e",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "30%",
          background:
            "repeating-linear-gradient(90deg, #5b1d7a 0 32px, #3a0f5e 32px 64px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          bottom: "30%",
          height: 14,
          background: "#9e6231",
          boxShadow:
            "inset 0 -3px 0 rgba(0,0,0,0.3), inset 0 3px 0 rgba(255,247,220,0.18)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "12%",
          width: 6,
          bottom: "0%",
          height: "30%",
          background: "#6e3520",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "12%",
          width: 6,
          bottom: "0%",
          height: "30%",
          background: "#6e3520",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "30%",
          right: "30%",
          bottom: "calc(30% + 14px)",
          height: "32%",
          background: "#1a1a1a",
          border: "3px solid #2a2a2a",
          boxShadow:
            "inset 0 0 0 2px #050018, 0 0 14px rgba(103,180,255,0.25)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 4,
            background:
              "linear-gradient(180deg, #050b16 0%, #0e2144 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 8,
            right: 8,
            height: 4,
            background: "#67b4ff",
            boxShadow: "0 0 8px #67b4ff",
            animation: "gdBlink 1.4s steps(2) infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 16,
            width: "60%",
            height: 3,
            background: "#6ef0e8",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 22,
            width: "40%",
            height: 3,
            background: "#c48eff",
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 8,
            top: 28,
            width: "70%",
            height: 3,
            background: "#67b4ff",
            opacity: 0.6,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: "38%",
          right: "38%",
          bottom: "30%",
          height: 4,
          background: "#3a3a3a",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: "16%",
          bottom: "calc(30% + 14px)",
          width: 26,
          height: 32,
          background: "#fff7dc",
          border: "2px solid #2a0a48",
          boxShadow: "inset 0 -8px 0 #ffd23f, 2px 2px 0 rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            right: 4,
            height: 6,
            background: "#9e1f3f",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: "18%",
          bottom: "calc(30% + 14px)",
          width: 18,
          height: 22,
          background: "#5cffb7",
          border: "2px solid #0a2c12",
          boxShadow: "2px 2px 0 rgba(0,0,0,0.4)",
          animation: "gdBob 2.6s ease-in-out infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            width: 4,
            height: 4,
            background: "#0a2c12",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 4,
            height: 4,
            background: "#0a2c12",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "8%",
          width: 64,
          height: 32,
          background:
            "linear-gradient(180deg, #050018 0%, #0a0a1a 100%)",
          border: "2px solid #1a0530",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 4,
            backgroundImage:
              "radial-gradient(1px 1px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 60% 50%, #fff, transparent), radial-gradient(1px 1px at 80% 20%, #ffd23f, transparent)",
            animation: "gdTwinkle 3s ease-in-out infinite",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: "8%",
          top: "10%",
          width: 28,
          height: 36,
          background: "#1a4528",
          border: "2px solid #0a2c12",
          boxShadow: "inset -3px -3px 0 rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 12,
            height: 6,
            background: "#9e6231",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 4,
            width: 4,
            height: 4,
            background: "#5cffb7",
            animation: "gdBlink 2s steps(2) infinite",
          }}
        />
      </div>
    </div>
  );
}
