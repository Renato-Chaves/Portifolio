"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GameProject } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";

export function PlayGameCTA({
  game,
  dict,
}: {
  game: GameProject;
  dict: Dictionary;
}) {
  const [demoOpen, setDemoOpen] = useState(false);
  const primaryUrl =
    game.htmlEmbedUrl || game.itchUrl || game.gamejoltUrl || null;
  const hasEmbed = !!game.htmlEmbedUrl;

  const handlePrimary = () => {
    if (hasEmbed) {
      setDemoOpen((v) => !v);
      return;
    }
    if (primaryUrl) {
      window.open(primaryUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div style={{ display: "grid", gap: 16, marginTop: 8 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={handlePrimary}
          disabled={!primaryUrl && !hasEmbed}
          style={{
            background: game.palette.primary,
            color: "#1a0530",
            padding: "14px 22px",
            fontFamily: "var(--font-press-start), monospace",
            fontSize: 12,
            letterSpacing: 3,
            border: "none",
            cursor: primaryUrl || hasEmbed ? "pointer" : "not-allowed",
            boxShadow: "5px 5px 0 rgba(0,0,0,0.5)",
            imageRendering: "pixelated",
            opacity: primaryUrl || hasEmbed ? 1 : 0.45,
          }}
        >
          {dict.gamedev.portalHub.playGame}
        </button>

        {game.itchUrl && (
          <a
            href={game.itchUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "transparent",
              color: "var(--gd-ink)",
              padding: "14px 18px",
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 11,
              letterSpacing: 2,
              border: "2px solid var(--gd-ink)",
              textDecoration: "none",
              boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
            }}
          >
            {dict.gamedev.portalHub.visitItch}
          </a>
        )}
        {game.gamejoltUrl && (
          <a
            href={game.gamejoltUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "transparent",
              color: "var(--gd-ink)",
              padding: "14px 18px",
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 11,
              letterSpacing: 2,
              border: "2px solid var(--gd-ink)",
              textDecoration: "none",
              boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
            }}
          >
            {dict.gamedev.portalHub.visitGamejolt}
          </a>
        )}
        {game.trailerUrl && (
          <a
            href={game.trailerUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "transparent",
              color: "var(--gd-accent-3)",
              padding: "14px 18px",
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 11,
              letterSpacing: 2,
              border: "2px solid var(--gd-accent-3)",
              textDecoration: "none",
              boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
            }}
          >
            {dict.gamedev.portalHub.watchTrailer}
          </a>
        )}
      </div>

      <AnimatePresence>
        {demoOpen && hasEmbed && game.htmlEmbedUrl && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.5 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.5 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              background: "#000",
              boxShadow: `inset 0 0 0 2px ${game.palette.primary}`,
              overflow: "hidden",
              transformOrigin: "top",
            }}
          >
            <iframe
              src={game.htmlEmbedUrl}
              title={`${game.name} demo`}
              style={{ width: "100%", height: "100%", border: "none" }}
              allowFullScreen
            />
            <div
              aria-hidden
              className="gd-scanlines"
              style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.25 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
