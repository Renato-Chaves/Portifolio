"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { AmbientParticle, GameProject, PortalFrameStyle } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { useGdScroll } from "../GamedevScrollProvider";

type Props = {
  game: GameProject;
  index: number;
  wallAngle: number;
  wallDistance: number;
  wallWidth: number;
  wallHeight: number;
  isActive: boolean;
  dict: Dictionary;
  onEnter: () => void;
};

const PORTAL_W = 320;
const PORTAL_H = 460;

export function Portal({
  game,
  wallAngle,
  wallDistance,
  wallWidth,
  wallHeight,
  isActive,
  dict,
  onEnter,
}: Props) {
  const { reducedMotion } = useGdScroll();
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const lA_x = useTransform(sx, (v) => v * 6);
  const lA_y = useTransform(sy, (v) => v * 4);
  const lB_x = useTransform(sx, (v) => v * 14);
  const lB_y = useTransform(sy, (v) => v * 10);
  const lC_x = useTransform(sx, (v) => v * 24);
  const lC_y = useTransform(sy, (v) => v * 18);
  const bgX = useTransform(sx, (v) => v * -10);
  const bgY = useTransform(sy, (v) => v * -6);

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      const cx = (e.clientX / window.innerWidth) * 2 - 1;
      const cy = (e.clientY / window.innerHeight) * 2 - 1;
      mx.set(cx);
      my.set(cy);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reducedMotion]);

  const isPlaceholder = game.status === "placeholder";
  const posterSrc = game.screenshots.find(
    (s): s is string => typeof s === "string",
  );

  return (
    <div
      style={{
        position: "absolute",
        left: -wallWidth / 2,
        top: -wallHeight / 2,
        width: wallWidth,
        height: wallHeight,
        transform: `rotateY(${wallAngle}deg) translateZ(-${wallDistance}px)`,
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      <RoomWall accent={game.palette.accent} />

      <motion.button
        type="button"
        onClick={onEnter}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        aria-label={isPlaceholder ? "Coming soon" : `Enter ${game.name}`}
        aria-hidden={!isActive}
        tabIndex={isActive ? 0 : -1}
        disabled={isPlaceholder || !isActive}
        animate={{
          scale: isActive ? (hovered ? 1.04 : 1) : 0.92,
          opacity: isActive ? 1 : 0.55,
          filter: isActive
            ? "saturate(1) brightness(1)"
            : "saturate(0.55) brightness(0.7)",
        }}
        transition={{ type: "spring", stiffness: 100, damping: 22, mass: 0.85 }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          marginLeft: -PORTAL_W / 2,
          marginTop: -PORTAL_H / 2,
          width: PORTAL_W,
          height: PORTAL_H,
          padding: 0,
          background: "transparent",
          border: "none",
          cursor: isPlaceholder ? "default" : isActive ? "pointer" : "default",
          pointerEvents: isActive ? "auto" : "none",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transformStyle: "preserve-3d",
          willChange: "transform, opacity, filter",
        }}
      >
        <PortalFrame
          frameStyle={game.frameStyle}
          accent={game.palette.accent}
          primary={game.palette.primary}
          isActive={isActive}
        >
          {isPlaceholder ? (
            <SealedPeek hint={dict.gamedev.portalHub.sealedHint} />
          ) : (
            <PortalPeek
              palette={game.palette}
              ambient={game.ambient}
              characterSrc={game.characterSrc}
              posterSrc={posterSrc}
              layerAX={lA_x}
              layerAY={lA_y}
              layerBX={lB_x}
              layerBY={lB_y}
              layerCX={lC_x}
              layerCY={lC_y}
              bgX={bgX}
              bgY={bgY}
              isActive={isActive}
            />
          )}
        </PortalFrame>
      </motion.button>
    </div>
  );
}

function RoomWall({ accent }: { accent: string }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        background: `
          radial-gradient(ellipse at 50% 0%, ${accent}1a, transparent 65%),
          repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0 1px, transparent 1px 56px),
          repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0 1px, transparent 1px 56px),
          linear-gradient(180deg, #2a1246 0%, #150428 100%)
        `,
        boxShadow:
          "inset 0 -40px 120px rgba(0,0,0,0.55), inset 0 40px 120px rgba(0,0,0,0.4)",
        pointerEvents: "none",
      }}
    />
  );
}

function PortalFrame({
  frameStyle,
  accent,
  primary,
  isActive,
  children,
}: {
  frameStyle: PortalFrameStyle;
  accent: string;
  primary: string;
  isActive: boolean;
  children: ReactNode;
}) {
  const styles = getFrameStyles(frameStyle, accent, primary);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: styles.outerBg,
        boxShadow: `${styles.outerShadow}${
          isActive
            ? `, 0 0 32px ${primary}aa, 0 0 64px ${accent}55, inset 0 0 0 2px ${primary}`
            : ", inset 0 0 0 1px rgba(255,255,255,0.08)"
        }`,
        clipPath: styles.clipPath,
        padding: styles.framePadding,
        imageRendering: "pixelated",
        transition: "box-shadow 0.4s",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: styles.framePadding,
          overflow: "hidden",
          background: "#000",
          boxShadow: "inset 0 0 24px rgba(0,0,0,0.65)",
        }}
      >
        {children}
      </div>
      {styles.decorations}
    </div>
  );
}

function getFrameStyles(
  style: PortalFrameStyle,
  accent: string,
  primary: string,
): {
  outerBg: string;
  outerShadow: string;
  clipPath?: string;
  framePadding: number;
  decorations?: ReactNode;
} {
  switch (style) {
    case "stone-arch":
      return {
        outerBg: `
          repeating-linear-gradient(0deg, #4a4a55 0 2px, #3a3a45 2px 22px),
          linear-gradient(180deg, #5a5a65, #2a2a35)
        `,
        outerShadow: "8px 8px 0 rgba(0,0,0,0.5)",
        clipPath:
          "polygon(0 18%, 18% 0, 82% 0, 100% 18%, 100% 100%, 0 100%)",
        framePadding: 26,
        decorations: (
          <>
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                width: 14,
                height: 14,
                background: "#2a2a35",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4)",
              }}
            />
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 14,
                height: 14,
                background: "#2a2a35",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.4)",
              }}
            />
          </>
        ),
      };
    case "tech-ring": {
      const corners: {
        pos: { top?: number; left?: number; right?: number; bottom?: number };
        transform: string;
      }[] = [
        { pos: { top: 4, left: 4 }, transform: "none" },
        { pos: { top: 4, right: 4 }, transform: "scaleX(-1)" },
        { pos: { bottom: 4, left: 4 }, transform: "scaleY(-1)" },
        { pos: { bottom: 4, right: 4 }, transform: "scale(-1, -1)" },
      ];
      return {
        outerBg: `linear-gradient(180deg, #1a1f3a 0%, #0a0e1a 100%)`,
        outerShadow: `0 0 0 2px ${accent}, 8px 8px 0 rgba(0,0,0,0.5)`,
        framePadding: 22,
        decorations: (
          <>
            {corners.map((c, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  position: "absolute",
                  ...c.pos,
                  width: 18,
                  height: 18,
                  background: accent,
                  clipPath:
                    "polygon(0 0, 100% 0, 100% 30%, 30% 30%, 30% 100%, 0 100%)",
                  transform: c.transform,
                  boxShadow: `0 0 8px ${accent}`,
                }}
              />
            ))}
          </>
        ),
      };
    }
    case "wooden-door":
      return {
        outerBg: `
          repeating-linear-gradient(90deg, #5a3a1f 0 4px, #4a2f17 4px 8px),
          linear-gradient(180deg, #6a4520, #3a2010)
        `,
        outerShadow: "8px 8px 0 rgba(0,0,0,0.5)",
        framePadding: 28,
        decorations: (
          <>
            {[18, 50, 82].map((pct) => (
              <span
                key={pct}
                aria-hidden
                style={{
                  position: "absolute",
                  left: 8,
                  top: `${pct}%`,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#1a1208",
                  boxShadow: "inset 0 0 0 1px #0a0804, 1px 1px 0 rgba(0,0,0,0.4)",
                }}
              />
            ))}
            {[18, 50, 82].map((pct) => (
              <span
                key={`r-${pct}`}
                aria-hidden
                style={{
                  position: "absolute",
                  right: 8,
                  top: `${pct}%`,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#1a1208",
                  boxShadow: "inset 0 0 0 1px #0a0804, 1px 1px 0 rgba(0,0,0,0.4)",
                }}
              />
            ))}
          </>
        ),
      };
    case "mystic-gate":
      return {
        outerBg: `
          radial-gradient(circle at 50% 0%, ${primary}33, transparent 60%),
          repeating-linear-gradient(45deg, #2a0f4e 0 6px, #1a0838 6px 12px),
          linear-gradient(180deg, #3a0f5e, #1a0530)
        `,
        outerShadow: `0 0 0 2px ${primary}, 8px 8px 0 rgba(0,0,0,0.5)`,
        framePadding: 28,
        decorations: (
          <>
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%)",
                width: 24,
                height: 24,
                background: primary,
                clipPath:
                  "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
                boxShadow: `0 0 12px ${primary}`,
              }}
            />
          </>
        ),
      };
    case "sealed":
      return {
        outerBg: `
          repeating-linear-gradient(45deg, #1a1a2a 0 6px, #0a0a18 6px 12px),
          linear-gradient(180deg, #1a1a2a, #050510)
        `,
        outerShadow: "8px 8px 0 rgba(0,0,0,0.5)",
        framePadding: 30,
        decorations: (
          <>
            <span
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(135deg, transparent 0 30px, rgba(255,255,255,0.04) 30px 32px)",
                pointerEvents: "none",
              }}
            />
          </>
        ),
      };
  }
}

function PortalPeek({
  palette,
  ambient,
  characterSrc,
  posterSrc,
  layerAX,
  layerAY,
  layerBX,
  layerBY,
  layerCX,
  layerCY,
  bgX,
  bgY,
  isActive,
}: {
  palette: { primary: string; accent: string; bg: string };
  ambient: AmbientParticle;
  characterSrc?: string;
  posterSrc?: string;
  layerAX: MotionValue<number>;
  layerAY: MotionValue<number>;
  layerBX: MotionValue<number>;
  layerBY: MotionValue<number>;
  layerCX: MotionValue<number>;
  layerCY: MotionValue<number>;
  bgX: MotionValue<number>;
  bgY: MotionValue<number>;
  isActive: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: `linear-gradient(180deg, ${palette.bg} 0%, ${palette.primary}33 60%, ${palette.accent}55 100%)`,
      }}
    >
      {posterSrc ? (
        <>
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              inset: -28,
              x: bgX,
              y: bgY,
              willChange: "transform",
            }}
          >
            <img
              src={posterSrc}
              alt=""
              draggable={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                imageRendering: "pixelated",
                filter: isActive
                  ? "saturate(1.05) contrast(1.05)"
                  : "saturate(0.85) brightness(0.92)",
                transition: "filter 0.5s",
              }}
            />
          </motion.div>
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: `
                radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 95%),
                linear-gradient(180deg, ${palette.bg}66 0%, transparent 30%, transparent 70%, ${palette.bg}99 100%)
              `,
              mixBlendMode: "multiply",
              pointerEvents: "none",
            }}
          />
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              inset: -16,
              x: layerBX,
              y: layerBY,
              background: `radial-gradient(ellipse at 30% 25%, ${palette.primary}33, transparent 55%), radial-gradient(ellipse at 75% 65%, ${palette.accent}26, transparent 55%)`,
              mixBlendMode: "screen",
              pointerEvents: "none",
              willChange: "transform",
            }}
          />
        </>
      ) : (
        <>
          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              inset: -20,
              x: layerAX,
              y: layerAY,
              background: `
                radial-gradient(ellipse at 30% 20%, ${palette.primary}66, transparent 55%),
                radial-gradient(ellipse at 75% 35%, ${palette.accent}44, transparent 55%)
              `,
              willChange: "transform",
            }}
          />

          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              inset: -20,
              x: layerBX,
              y: layerBY,
              willChange: "transform",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 80,
                height: 64,
                background: `linear-gradient(180deg, transparent, ${palette.bg})`,
              }}
            />
            <svg
              aria-hidden
              width="100%"
              height="100"
              viewBox="0 0 320 100"
              preserveAspectRatio="none"
              style={{ position: "absolute", left: 0, right: 0, bottom: 60 }}
            >
              <polygon
                points="0,100 40,60 80,80 120,40 160,70 200,30 240,55 280,25 320,50 320,100"
                fill={palette.primary}
                opacity={0.6}
              />
            </svg>
          </motion.div>

          <motion.div
            aria-hidden
            style={{
              position: "absolute",
              inset: -20,
              x: layerCX,
              y: layerCY,
              willChange: "transform",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 80,
                background: `linear-gradient(180deg, ${palette.bg}, ${palette.primary})`,
                boxShadow: `inset 0 1px 0 ${palette.accent}`,
              }}
            />
          </motion.div>
        </>
      )}

      {characterSrc && (
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: -10,
            x: layerCX,
            y: layerCY,
            willChange: "transform",
            pointerEvents: "none",
          }}
        >
          <img
            src={characterSrc}
            alt=""
            style={{
              position: "absolute",
              left: "50%",
              bottom: 30,
              transform: "translateX(-50%)",
              height: 80,
              imageRendering: "pixelated",
              animation: "gdBob 1.6s ease-in-out infinite",
            }}
          />
        </motion.div>
      )}

      <AmbientLayer particle={ambient} isActive={isActive} />

      <div
        aria-hidden
        className="gd-scanlines"
        style={{ opacity: 0.45 }}
      />
    </div>
  );
}

function AmbientLayer({
  particle,
  isActive,
}: {
  particle: AmbientParticle;
  isActive: boolean;
}) {
  const config = AMBIENT_CONFIG[particle];
  const intensity = isActive ? 1 : 0.4;
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        opacity: intensity,
        transition: "opacity 0.5s",
        pointerEvents: "none",
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const x = ((i * 37) % 100).toFixed(1);
        const delay = (i * 0.18).toFixed(2);
        const dur = (3 + (i % 4) * 0.6).toFixed(2);
        return (
          <span
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              bottom: "-10%",
              width: config.size,
              height: config.size,
              background: config.color,
              boxShadow: `0 0 6px ${config.color}`,
              borderRadius: config.round ? "50%" : 0,
              animation: `gdAmbientRise ${dur}s linear ${delay}s infinite`,
              imageRendering: "pixelated",
            }}
          />
        );
      })}
    </div>
  );
}

const AMBIENT_CONFIG: Record<
  AmbientParticle,
  { color: string; size: number; round: boolean }
> = {
  coins: { color: "#ffd23f", size: 6, round: true },
  sparkles: { color: "#fff7dc", size: 4, round: false },
  leaves: { color: "#5cffb7", size: 6, round: false },
  embers: { color: "#ff6b9e", size: 4, round: true },
  dust: { color: "#a89bbf", size: 3, round: true },
};

function SealedPeek({ hint }: { hint: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "repeating-linear-gradient(135deg, #0a0a18 0 12px, #1a1a2a 12px 24px)",
        display: "grid",
        placeItems: "center",
        color: "var(--gd-ink)",
        fontFamily: "var(--font-press-start), monospace",
      }}
    >
      <div style={{ textAlign: "center", padding: 20 }}>
        <div
          style={{
            fontSize: 64,
            color: "var(--gd-accent)",
            textShadow: "4px 4px 0 rgba(0,0,0,0.6)",
            marginBottom: 16,
            animation: "gdBlink 1.4s steps(2) infinite",
          }}
        >
          ?
        </div>
        <div
          style={{
            fontSize: 9,
            letterSpacing: 3,
            color: "var(--gd-accent-3)",
            textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
          }}
        >
          {hint}
        </div>
      </div>
    </div>
  );
}

