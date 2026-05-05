"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { GameProject } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { EngineBadge } from "./EngineBadge";
import { GameJamBadge } from "./GameJamBadge";

export function PortalUITiles({
  game,
  dict,
}: {
  game: GameProject;
  dict: Dictionary;
}) {
  const isPlaceholder = game.status === "placeholder";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={game.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 30 }}
      >
        <motion.div
          initial={{ x: -40, y: -10, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ delay: 0.05 }}
          style={{
            position: "absolute",
            top: "calc(50% - 290px)",
            left: "calc(50% - 360px)",
            transform: "rotate(-3deg)",
            background: isPlaceholder ? "#1a1a2a" : game.palette.primary,
            color: isPlaceholder ? "var(--gd-ink)" : "#1a0530",
            padding: "12px 18px",
            fontFamily: "var(--font-press-start), monospace",
            fontSize: 13,
            letterSpacing: 2,
            boxShadow: "5px 5px 0 rgba(0,0,0,0.5)",
            imageRendering: "pixelated",
            maxWidth: 240,
          }}
        >
          {game.name}
        </motion.div>

        {game.engine && !isPlaceholder && (
          <motion.div
            initial={{ x: 40, y: -10, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: 0.12 }}
            style={{
              position: "absolute",
              top: "calc(50% - 270px)",
              right: "calc(50% - 360px)",
              transform: "rotate(3deg)",
            }}
          >
            <EngineBadge engine={game.engine} size="sm" />
          </motion.div>
        )}

        {game.gameJam && !isPlaceholder && (
          <motion.div
            initial={{ x: 40, y: 10, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: 0.18 }}
            style={{
              position: "absolute",
              bottom: "calc(50% - 270px)",
              right: "calc(50% - 360px)",
              transform: "rotate(-2deg)",
            }}
          >
            <GameJamBadge jam={game.gameJam} size="sm" />
          </motion.div>
        )}

        {!isPlaceholder && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.24 }}
            style={{
              position: "absolute",
              bottom: "calc(50% - 290px)",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 11,
              letterSpacing: 3,
              color: game.palette.primary,
              textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ animation: "gdBlink 1.4s steps(2) infinite" }}>
              ▶
            </span>{" "}
            {dict.gamedev.portalHub.clickToEnter}{" "}
            <span style={{ animation: "gdBlink 1.4s steps(2) infinite" }}>
              ◀
            </span>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
