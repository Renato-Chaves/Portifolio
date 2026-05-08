"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import type { GameProject } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { useGdScroll } from "../GamedevScrollProvider";
import { Portal } from "./Portal";
import { PortalUITiles } from "./PortalUITiles";
import { GameDeepDive } from "./GameDeepDive";

const WORLD = {
  desktop: { wallDistance: 380, wallWidth: 900, wallHeight: 600, floorRadius: 1200, scrollVH: 500, perspective: 1400, portalWidth: 320, portalHeight: 460 },
  tablet: { wallDistance: 320, wallWidth: 720, wallHeight: 520, floorRadius: 1000, scrollVH: 400, perspective: 1200, portalWidth: 300, portalHeight: 420 },
  phone: { wallDistance: 260, wallWidth: 420, wallHeight: 320, floorRadius: 720, scrollVH: 300, perspective: 900, portalWidth: 220, portalHeight: 300 },
} as const;

export function PortalHub({
  dict,
  games,
}: {
  dict: Dictionary;
  games: GameProject[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useGdScroll();
  const breakpoint = useBreakpoint();
  const world =
    breakpoint === "phone" ? WORLD.phone : breakpoint === "tablet" ? WORLD.tablet : WORLD.desktop;
  const WALL_DISTANCE = world.wallDistance;
  const WALL_WIDTH = world.wallWidth;
  const WALL_HEIGHT = world.wallHeight;
  const FLOOR_Y = WALL_HEIGHT / 2;
  const FLOOR_RADIUS = world.floorRadius;
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const worldRotY = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25, 0.5, 0.75, 0.95, 1],
    [-15, 0, -90, -180, -270, -270, -270],
  );
  const worldRotX = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [-2, 0, 0, 6],
  );
  const worldTz = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [-160, 60, 60, -160],
  );
  const flashOpacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.06, 1],
    [0, 0.85, 0, 0],
  );

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    let idx = -1;
    if (p < 0.04) idx = -1;
    else if (p < 0.15) idx = 0;
    else if (p < 0.375) idx = 1;
    else if (p < 0.625) idx = 2;
    else if (p < 0.96) idx = 3;
    else idx = -1;
    if (idx !== activeIndex) setActiveIndex(idx);
  });

  const visible = games.slice(0, 4);
  const activeGame =
    activeIndex >= 0 && visible[activeIndex] ? visible[activeIndex] : null;
  const dialogGame = openSlug
    ? visible.find((g) => g.slug === openSlug) ?? null
    : null;

  return (
    <section
      ref={ref}
      data-gd-section="showcase"
      className="relative w-full"
      style={{ height: `${world.scrollVH}vh`, background: "#050018" }}
    >
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 5 }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, #2a1246 0%, #050018 75%)",
            }}
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            perspective: `${world.perspective}px`,
            perspectiveOrigin: "50% 50%",
            zIndex: 10,
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 0,
              height: 0,
              transformStyle: "preserve-3d",
              rotateX: reducedMotion ? 0 : worldRotX,
              rotateY: reducedMotion ? 0 : worldRotY,
              z: reducedMotion ? 0 : worldTz,
              willChange: "transform",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: -FLOOR_RADIUS / 2,
                top: -FLOOR_RADIUS / 2,
                width: FLOOR_RADIUS,
                height: FLOOR_RADIUS,
                transform: `rotateX(90deg) translateZ(-${FLOOR_Y}px)`,
                transformOrigin: "center",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: `
                  radial-gradient(circle at center, rgba(255,210,63,0.16) 0%, transparent 32%),
                  repeating-linear-gradient(0deg, rgba(255,247,220,0.06) 0 1px, transparent 1px 60px),
                  repeating-linear-gradient(90deg, rgba(255,247,220,0.06) 0 1px, transparent 1px 60px),
                  radial-gradient(ellipse at center, #1a0530 0%, #050018 65%)
                `,
              }}
            />

            <div
              aria-hidden
              style={{
                position: "absolute",
                left: -FLOOR_RADIUS / 2,
                top: -FLOOR_RADIUS / 2,
                width: FLOOR_RADIUS,
                height: FLOOR_RADIUS,
                transform: `rotateX(-90deg) translateZ(-${FLOOR_Y}px)`,
                transformOrigin: "center",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                background: `
                  radial-gradient(circle at 30% 40%, rgba(255,210,63,0.08), transparent 40%),
                  radial-gradient(circle at 70% 60%, rgba(92,255,183,0.08), transparent 40%),
                  #08001c
                `,
              }}
            />

            <div
              aria-hidden
              style={{
                position: "absolute",
                left: -60,
                top: -60,
                width: 120,
                height: 120,
                transform: `rotateX(90deg) translateZ(-${FLOOR_Y - 1}px)`,
                background:
                  "radial-gradient(circle, rgba(255,210,63,0.55), transparent 60%)",
                animation: "gdSunPulse 3s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />

            {visible.map((g, i) => (
              <Portal
                key={g.slug}
                game={g}
                index={i}
                wallAngle={i * 90}
                wallDistance={WALL_DISTANCE}
                wallWidth={WALL_WIDTH}
                wallHeight={WALL_HEIGHT}
                portalWidth={world.portalWidth}
                portalHeight={world.portalHeight}
                isActive={activeIndex === i}
                dict={dict}
                onEnter={() => setOpenSlug(g.slug)}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,247,220,0.9), rgba(255,210,63,0.4) 30%, transparent 60%)",
            opacity: reducedMotion ? 0 : flashOpacity,
            zIndex: 20,
          }}
        />

        <div
          className="absolute pointer-events-none"
          style={{
            top: 36,
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-press-start), monospace",
            fontSize: 11,
            color: "var(--gd-accent)",
            letterSpacing: 4,
            textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
            zIndex: 25,
          }}
        >
          {dict.gamedev.portalHub.sectionLabel}
        </div>

        {activeGame && <PortalUITiles game={activeGame} dict={dict} />}

        <div
          aria-hidden
          className="gd-scanlines"
          style={{ zIndex: 35, opacity: 0.25 }}
        />
      </div>

      <AnimatePresence>
        {dialogGame && (
          <GameDeepDive
            key={dialogGame.slug}
            game={dialogGame}
            dict={dict}
            onClose={() => setOpenSlug(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
