"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { GameProject } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { EngineBadge } from "./EngineBadge";
import { GameJamBadge } from "./GameJamBadge";
import { ScreenshotGallery } from "./ScreenshotGallery";
import { PlayGameCTA } from "./PlayGameCTA";

export function GameDeepDive({
  game,
  dict,
  onClose,
}: {
  game: GameProject;
  dict: Dictionary;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const desc = game.description || dict.gamedev.portalHub.noDescription;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={game.name}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: `radial-gradient(circle at 50% 50%, ${game.palette.primary}22, ${game.palette.bg} 65%, #050018 100%)`,
        overflow: "auto",
      }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, filter: "blur(8px)" }}
        animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
        exit={{ scale: 0.7, opacity: 0, filter: "blur(8px)" }}
        transition={{ type: "spring", stiffness: 130, damping: 22, mass: 0.8 }}
        style={{
          minHeight: "100vh",
          padding: "32px clamp(20px, 4vw, 64px) 64px",
          color: "var(--gd-ink)",
          fontFamily: "var(--font-vt323), monospace",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.gamedev.portalHub.backLabel}
            style={{
              background: "transparent",
              color: "var(--gd-ink)",
              border: "2px solid var(--gd-ink)",
              padding: "8px 14px",
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 10,
              letterSpacing: 2,
              cursor: "pointer",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.5)",
            }}
          >
            ◀ {dict.gamedev.portalHub.backLabel}
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label={dict.gamedev.portalHub.closeLabel}
            style={{
              background: "transparent",
              color: "var(--gd-accent-3)",
              border: "2px solid var(--gd-accent-3)",
              width: 40,
              height: 40,
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 14,
              cursor: "pointer",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.5)",
            }}
          >
            ✕
          </button>
        </header>

        <motion.div
          initial={{ y: 20, opacity: 0, rotate: -2 }}
          animate={{ y: 0, opacity: 1, rotate: -2 }}
          transition={{ delay: 0.2 }}
          style={{
            display: "inline-block",
            padding: "16px 24px",
            background: game.palette.primary,
            color: "#1a0530",
            fontFamily: "var(--font-press-start), monospace",
            fontSize: "clamp(20px, 3vw, 36px)",
            letterSpacing: 2,
            boxShadow: "8px 8px 0 rgba(0,0,0,0.5)",
            imageRendering: "pixelated",
            marginBottom: 32,
          }}
        >
          {game.logoSrc ? (
            <img
              src={game.logoSrc}
              alt={game.name}
              style={{
                height: "1.4em",
                imageRendering: "pixelated",
                verticalAlign: "middle",
              }}
            />
          ) : (
            game.name
          )}
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
            gap: 36,
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ScreenshotGallery
              screenshots={game.screenshots}
              palette={game.palette}
              fallbackTitle={game.name}
            />
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ display: "grid", gap: 24 }}
          >
            <p
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: 20,
                lineHeight: 1.6,
                color: "var(--gd-ink)",
                margin: 0,
                textShadow: "2px 2px 0 rgba(0,0,0,0.4)",
              }}
            >
              {desc}
            </p>

            <div style={{ display: "grid", gap: 16 }}>
              {game.engine && (
                <Field label={dict.gamedev.portalHub.engineLabel}>
                  <EngineBadge engine={game.engine} size="md" />
                </Field>
              )}
              {game.gameJam && (
                <Field label={dict.gamedev.portalHub.jamLabel}>
                  <GameJamBadge jam={game.gameJam} size="md" />
                </Field>
              )}
              {game.tags.length > 0 && (
                <Field label={dict.gamedev.portalHub.tagsLabel}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {game.tags.map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "var(--font-press-start), monospace",
                          fontSize: 9,
                          letterSpacing: 1,
                          padding: "5px 9px",
                          color: game.palette.primary,
                          border: `1px solid ${game.palette.primary}`,
                          imageRendering: "pixelated",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Field>
              )}
            </div>

            <PlayGameCTA game={game} dict={dict} />
          </motion.div>
        </div>

        {game.characterSrc && (
          <img
            src={game.characterSrc}
            alt=""
            aria-hidden
            style={{
              position: "fixed",
              left: 24,
              bottom: 24,
              height: 110,
              imageRendering: "pixelated",
              animation: "gdBob 2s ease-in-out infinite",
              filter: "drop-shadow(4px 4px 0 rgba(0,0,0,0.5))",
              pointerEvents: "none",
            }}
          />
        )}
      </motion.div>

      <div
        aria-hidden
        className="gd-scanlines"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.3,
        }}
      />
    </motion.div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <div
        style={{
          fontFamily: "var(--font-press-start), monospace",
          fontSize: 9,
          letterSpacing: 3,
          color: "var(--gd-ink)",
          opacity: 0.7,
        }}
      >
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}
