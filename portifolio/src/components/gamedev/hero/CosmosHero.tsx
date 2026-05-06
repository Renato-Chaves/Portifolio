"use client";

import { useEffect, useMemo, useRef } from "react";
import { animate, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";
import { useGdScroll } from "../GamedevScrollProvider";

type Props = { dict: Dictionary };

export function CosmosHero({ dict }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useGdScroll();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Drives the intro: auto-plays 0→0.2 on mount, then scroll takes over
  const introProgress = useMotionValue(0);
  const effectiveProgress = useMotionValue(0);

  useEffect(() => {
    if (reducedMotion) return;

    const sync = () =>
      effectiveProgress.set(
        Math.max(introProgress.get(), Math.min(1, scrollYProgress.get() * 1.5)),
      );

    const unsubIntro = introProgress.on("change", sync);
    const unsubScroll = scrollYProgress.on("change", sync);

    const controls = animate(introProgress, 0.2, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => {
      controls.stop();
      unsubIntro();
      unsubScroll();
    };
  }, [reducedMotion, introProgress, effectiveProgress, scrollYProgress]);

  const continuityRadius = useTransform(effectiveProgress, [0, 0.05], [0, 1.6]);
  const continuityMask = useTransform(
    continuityRadius,
    (r) =>
      `radial-gradient(circle at 50% 55%, transparent 0, transparent ${r * 60}%, #1a0530 ${r * 60 + 6}%, #1a0530 100%)`,
  );
  const continuityOpacity = useTransform(
    continuityRadius,
    [0, 1, 1.6],
    [1, 0.35, 0],
  );

  const star1Y = useTransform(effectiveProgress, [0, 1], [0, -150]);
  const star2Y = useTransform(effectiveProgress, [0, 1], [0, -340]);
  const star3Y = useTransform(effectiveProgress, [0, 1], [0, -640]);
  const starsBlurAmt = useTransform(effectiveProgress, [0.3, 0.7], [0, 3]);
  const starsBlur = useTransform(starsBlurAmt, (b) => `blur(${b}px)`);

  const planetScale = useTransform(
    effectiveProgress,
    [0.1, 0.7, 0.95],
    [0.18, 1.4, 2.7],
  );
  const planetOpacity = useTransform(
    effectiveProgress,
    [0.05, 0.2, 0.92, 1],
    [0, 1, 1, 0.5],
  );

  const titleOpacity = useTransform(
    effectiveProgress,
    [0.05, 0.2, 0.6, 0.78],
    [0, 1, 1, 0],
  );
  const titleY = useTransform(effectiveProgress, [0.05, 0.2], [30, 0]);

  const hue = useTransform(effectiveProgress, [0.7, 0.95], [0, 35]);
  const bright = useTransform(effectiveProgress, [0.7, 0.95], [1, 0.7]);
  const sat = useTransform(effectiveProgress, [0.7, 0.95], [1, 1.35]);
  const sceneFilter = useTransform(
    [hue, bright, sat],
    ([h, b, s]) =>
      `hue-rotate(${h}deg) brightness(${b}) saturate(${s})`,
  );

  const groundY = useTransform(effectiveProgress, [0.85, 1], [200, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.04, 0.12], [1, 1, 0]);

  const sparseStars = useMemo(
    () => buildStarBg({ count: 22, sizeMin: 1.5, sizeMax: 2.5 }, "sparse"),
    [],
  );
  const mediumStars = useMemo(
    () => buildStarBg({ count: 55, sizeMin: 1, sizeMax: 1.5 }, "medium"),
    [],
  );
  const denseStars = useMemo(
    () => buildStarBg({ count: 110, sizeMin: 0.6, sizeMax: 1 }, "dense"),
    [],
  );

  if (reducedMotion) {
    return (
      <section
        ref={ref}
        className="relative w-full"
        style={{ height: "100vh" }}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #050018, #2a1246 80%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: mediumStars, backgroundRepeat: "no-repeat" }}
          />
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-press-start), monospace",
                  fontWeight: 400,
                  fontSize: "clamp(36px, 6.5vw, 92px)",
                  lineHeight: 1.05,
                  color: "var(--gd-ink)",
                  textShadow:
                    "4px 4px 0 var(--gd-accent-3), 8px 8px 0 #3a0f5e",
                  margin: 0,
                }}
              >
                {dict.gamedev.hero.title1}
                <br />
                <span style={{ color: "var(--gd-accent)" }}>
                  {dict.gamedev.hero.title2}
                </span>
                <br />
                {dict.gamedev.hero.title3}
              </h1>
              <p
                style={{
                  marginTop: 28,
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: 24,
                  color: "var(--gd-ink)",
                  letterSpacing: 4,
                }}
              >
                {dict.gamedev.hero.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      data-gd-section="hero"
      className="relative w-full"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #050018 0%, #1a0530 35%, #2a1246 70%, #5b1d7a 100%)",
            filter: sceneFilter,
            willChange: "filter",
          }}
        />

        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: sparseStars,
            backgroundRepeat: "no-repeat",
            y: star1Y,
            filter: starsBlur,
            willChange: "transform, filter",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: mediumStars,
            backgroundRepeat: "no-repeat",
            y: star2Y,
            filter: starsBlur,
            willChange: "transform, filter",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: denseStars,
            backgroundRepeat: "no-repeat",
            y: star3Y,
            filter: starsBlur,
            willChange: "transform, filter",
          }}
        />

        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{
            width: 220,
            height: 220,
            marginLeft: -110,
            marginTop: -110,
            scale: planetScale,
            opacity: planetOpacity,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 30%, #ffd23f 0%, #ff6b9e 45%, #5b1d7a 80%)",
            boxShadow:
              "0 0 80px rgba(255,210,63,0.45), 0 0 140px rgba(255,107,158,0.32)",
            willChange: "transform, opacity",
          }}
        />

        <motion.div
          className="absolute inset-0 grid place-items-center pointer-events-none px-6 text-center"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontWeight: 400,
                fontSize: "clamp(40px, 7.5vw, 110px)",
                lineHeight: 1.05,
                color: "var(--gd-ink)",
                textShadow:
                  "4px 4px 0 var(--gd-accent-3), 8px 8px 0 #3a0f5e, 12px 12px 0 rgba(0,0,0,0.3)",
              }}
            >
              {dict.gamedev.hero.title1}
              <br />
              <span style={{ color: "var(--gd-accent)" }}>
                {dict.gamedev.hero.title2}
              </span>
              <br />
              {dict.gamedev.hero.title3}
            </div>
            <div
              style={{
                marginTop: 32,
                fontFamily: "var(--font-vt323), monospace",
                fontSize: 26,
                color: "var(--gd-ink)",
                textShadow: "2px 2px 0 rgba(0,0,0,0.35)",
                letterSpacing: 4,
              }}
            >
              {dict.gamedev.hero.tagline}
            </div>
          </div>
        </motion.div>

        <div className="gd-scanlines" />

        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: continuityMask, opacity: continuityOpacity }}
        />

        <motion.div
          aria-hidden
          className="absolute left-0 right-0 bottom-0 pointer-events-none"
          style={{
            height: 240,
            y: groundY,
            background:
              "linear-gradient(180deg, transparent 0, #2a0a48 25%, #0a2c12 100%)",
            willChange: "transform",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 30,
              height: 14,
              backgroundImage:
                "repeating-linear-gradient(90deg, #5cffb7 0 16px, #2ee08f 16px 32px)",
              imageRendering: "pixelated",
              opacity: 0.95,
            }}
          />
        </motion.div>

        <motion.div
          className="absolute left-1/2 bottom-8 -translate-x-1/2 pointer-events-none"
          style={{
            opacity: hintOpacity,
            fontFamily: "var(--font-press-start), monospace",
            fontSize: 10,
            color: "var(--gd-accent)",
            letterSpacing: 4,
            animation: "gdBob 2s ease-in-out infinite",
            textShadow: "2px 2px 0 rgba(0,0,0,0.4)",
          }}
        >
          ▼ {dict.gamedev.hero.scrollHint} ▼
        </motion.div>
      </div>
    </section>
  );
}

function buildStarBg(
  cfg: { count: number; sizeMin: number; sizeMax: number },
  seed: string,
) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  const rand = () => {
    h = (h * 1664525 + 1013904223) | 0;
    return ((h >>> 0) % 100000) / 100000;
  };
  const parts: string[] = [];
  for (let i = 0; i < cfg.count; i++) {
    const x = (rand() * 100).toFixed(2);
    const y = (rand() * 150).toFixed(2);
    const size = (cfg.sizeMin + rand() * (cfg.sizeMax - cfg.sizeMin)).toFixed(1);
    const alpha = (0.5 + rand() * 0.5).toFixed(2);
    parts.push(
      `radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(255,255,255,${alpha}), transparent 60%)`,
    );
  }
  return parts.join(", ");
}
