"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { useGdScroll } from "../GamedevScrollProvider";

export function StudioRoom({ dict }: { dict: Dictionary }) {
  const ref = useRef<HTMLElement>(null);
  const { reducedMotion } = useGdScroll();
  const stats = dict.gamedev.about.stats;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  const entranceY = useTransform(scrollYProgress, [0, 1], ["22vh", "0vh"]);
  const entranceScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const entranceOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.25, 0.86, 1]);
  const farWallY = useTransform(scrollYProgress, [0, 1], ["-5vh", "0vh"]);
  const decorY = useTransform(scrollYProgress, [0, 1], ["8vh", "0vh"]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], ["15vh", "0vh"]);

  return (
    <motion.section
      ref={ref}
      data-gd-section="about"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        marginTop: reducedMotion ? 0 : "-100vh",
        padding: "112px 24px 140px",
        background: "#120a1f",
        overflow: "hidden",
        zIndex: 3,
        y: reducedMotion ? 0 : entranceY,
        scale: reducedMotion ? 1 : entranceScale,
        opacity: reducedMotion ? 1 : entranceOpacity,
        transformOrigin: "center top",
        willChange: "transform, opacity",
      }}
    >
      <StudioEnvironment
        reducedMotion={reducedMotion}
        farWallY={farWallY}
        decorY={decorY}
        foregroundY={foregroundY}
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

    </motion.section>
  );
}

function StudioEnvironment({
  reducedMotion,
  farWallY,
  decorY,
  foregroundY,
}: {
  reducedMotion: boolean;
  farWallY: MotionValue<string>;
  decorY: MotionValue<string>;
  foregroundY: MotionValue<string>;
}) {
  return (
    <>
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: "-8% 0 0",
          y: reducedMotion ? 0 : farWallY,
          background:
            "linear-gradient(180deg, #1a0530 0%, #162d20 16%, #25364e 44%, #211537 74%, #100817 100%)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,210,63,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,210,63,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "linear-gradient(180deg, transparent 0%, black 20%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 20%, black 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 92,
          background:
            "linear-gradient(180deg, #2ee08f 0 10px, #0a2c12 10px 28px, #5b3423 28px 56px, #271326 56px 100%)",
          boxShadow:
            "0 18px 0 rgba(0,0,0,0.18), inset 0 -6px 0 rgba(255,210,63,0.08)",
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 9,
          height: 12,
          backgroundImage:
            "repeating-linear-gradient(90deg, #5cffb7 0 18px, #2ee08f 18px 36px, #73ffc9 36px 48px)",
          imageRendering: "pixelated",
          pointerEvents: "none",
        }}
      />

      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          inset: "82px 0 auto",
          height: "58vh",
          y: reducedMotion ? 0 : decorY,
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "6%",
            top: "12%",
            width: "min(280px, 30vw)",
            height: 68,
            borderTop: "6px solid #9e6231",
            boxShadow: "0 6px 0 rgba(0,0,0,0.35)",
          }}
        >
          <PixelShelfItem left="4%" color="#ffd23f" />
          <PixelShelfItem left="22%" color="#ff6b9e" />
          <PixelShelfItem left="40%" color="#67b4ff" />
          <PixelShelfItem left="61%" color="#5cffb7" />
        </div>

        <div
          style={{
            position: "absolute",
            right: "8%",
            top: "9%",
            width: "min(210px, 28vw)",
            aspectRatio: "3 / 2",
            border: "4px solid #3a0f5e",
            background:
              "radial-gradient(2px 2px at 18% 30%, #fff7dc, transparent), radial-gradient(1.5px 1.5px at 54% 46%, #ffd23f, transparent), radial-gradient(1px 1px at 79% 24%, #fff7dc, transparent), linear-gradient(180deg, #050018 0%, #15113a 100%)",
            boxShadow: "6px 6px 0 rgba(0,0,0,0.35)",
            animation: reducedMotion ? undefined : "gdTwinkle 4.5s ease-in-out infinite",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "17%",
            bottom: "6%",
            width: "min(220px, 24vw)",
            height: 82,
            border: "4px solid #261326",
            background:
              "linear-gradient(180deg, #0e2144 0%, #050b16 100%)",
            boxShadow:
              "0 0 38px rgba(103,180,255,0.18), 6px 6px 0 rgba(0,0,0,0.3)",
            opacity: 0.78,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 14,
              right: 20,
              top: 16,
              height: 5,
              background: "#67b4ff",
              boxShadow: "0 0 12px #67b4ff",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 14,
              width: "52%",
              top: 30,
              height: 4,
              background: "#5cffb7",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 14,
              width: "70%",
              top: 43,
              height: 4,
              background: "#c48eff",
            }}
          />
        </div>
      </motion.div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 24% 48%, rgba(103,180,255,0.18), transparent 28%), radial-gradient(circle at 70% 34%, rgba(255,210,63,0.16), transparent 30%), radial-gradient(circle at 50% 105%, rgba(255,107,158,0.2), transparent 42%)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />

      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          left: "-6%",
          right: "-6%",
          bottom: 0,
          height: "24vh",
          y: reducedMotion ? 0 : foregroundY,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(16,8,23,0.35) 18%, #100817 64%, #050018 100%)",
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
    </>
  );
}

function PixelShelfItem({ left, color }: { left: string; color: string }) {
  return (
    <span
      style={{
        position: "absolute",
        left,
        bottom: 6,
        width: 22,
        height: 36,
        background: color,
        border: "2px solid #261326",
        boxShadow: "inset 0 -8px 0 rgba(0,0,0,0.2)",
      }}
    />
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
