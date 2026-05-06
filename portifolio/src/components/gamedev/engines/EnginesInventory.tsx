"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siUnity, siConstruct3 } from "simple-icons";
import type { GameEngine, GameProject } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";
import { GameDeepDive } from "@/components/gamedev/showcase/GameDeepDive";

type LogoSvg = { type: "svg"; path: string };
type LogoGlyph = { type: "glyph"; text: string };

const ENGINE_VISUAL: Record<
  GameEngine,
  { logo: LogoSvg | LogoGlyph; primary: string; ink: string; aura: string }
> = {
  "Construct 2": {
    logo: { type: "svg", path: siConstruct3.path },
    primary: "#ffd23f",
    ink: "#1f1f1f",
    aura: "rgba(255,210,63,0.55)",
  },
  "Clickteam Fusion 2.5": {
    logo: { type: "glyph", text: "F" },
    primary: "#1d4cff",
    ink: "#fff7dc",
    aura: "rgba(29,76,255,0.6)",
  },
  "Unity 2D": {
    logo: { type: "svg", path: siUnity.path },
    primary: "#1a1a1a",
    ink: "#fff7dc",
    aura: "rgba(255,247,220,0.5)",
  },
  "Unity 3D": {
    logo: { type: "svg", path: siUnity.path },
    primary: "#fff7dc",
    ink: "#1a1a1a",
    aura: "rgba(255,210,63,0.45)",
  },
};

const ALL_VISUAL = {
  glyph: "★",
  primary: "var(--gd-accent)",
  ink: "#1a1a1a",
  aura: "rgba(255,210,63,0.5)",
};

function EngineLogo({
  logo,
  ink,
  size,
}: {
  logo: LogoSvg | LogoGlyph;
  ink: string;
  size: number;
}) {
  if (logo.type === "svg") {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={ink}
        aria-hidden
        style={{ display: "block", flexShrink: 0 }}
      >
        <path d={logo.path} />
      </svg>
    );
  }
  return <>{logo.text}</>;
}

function EngineLogoRow() {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      {ORDER.map((e) => {
        const ev = ENGINE_VISUAL[e];
        return (
          <span
            key={e}
            style={{
              width: 22,
              height: 22,
              background: ev.primary,
              color: ev.ink,
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--font-vt323), monospace",
              fontSize: 13,
              fontWeight: 700,
              boxShadow: "2px 2px 0 rgba(0,0,0,0.4)",
              flexShrink: 0,
            }}
          >
            <EngineLogo logo={ev.logo} ink={ev.ink} size={14} />
          </span>
        );
      })}
    </div>
  );
}

const ORDER: GameEngine[] = [
  "Construct 2",
  "Clickteam Fusion 2.5",
  "Unity 2D",
  "Unity 3D",
];

type Selection = GameEngine | "all";

export function EnginesInventory({
  dict,
  games,
}: {
  dict: Dictionary;
  games: GameProject[];
}) {
  const [selected, setSelected] = useState<Selection | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const visibleGames = games.filter((g) => g.status !== "placeholder");
  const openGame = openSlug ? visibleGames.find((g) => g.slug === openSlug) ?? null : null;
  const gamesByEngine = (engine: GameEngine) =>
    visibleGames.filter((g) => g.engine === engine);

  const toggle = (s: Selection) =>
    setSelected((prev) => (prev === s ? null : s));

  return (
    <section
      data-gd-section="engines"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        padding: "120px 24px 140px",
        background:
          "radial-gradient(ellipse at center, #1a0530 0%, #050018 70%), #050018",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,210,63,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,210,63,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
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
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gap: 36,
        }}
      >
        {/* Header */}
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
            ▣ {dict.gamedev.engines.sectionLabel}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontWeight: 400,
              fontSize: "clamp(28px, 4.2vw, 52px)",
              lineHeight: 1.1,
              color: "var(--gd-ink)",
              textShadow: "3px 3px 0 var(--gd-accent-3), 6px 6px 0 #3a0f5e",
              margin: 0,
            }}
          >
            {dict.gamedev.engines.title}
          </h2>
          <motion.div
            animate={{ opacity: 1 }}
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: 18,
              letterSpacing: 2,
              color: "var(--gd-accent-2)",
              opacity: 0.85,
            }}
          >
            {selected
              ? selected === "all"
                ? `▸ ${dict.gamedev.engines.allGamesLabel} · CLICK AGAIN TO CLOSE`
                : `▸ ${selected.toUpperCase()} SELECTED · CLICK AGAIN TO CLOSE`
              : `▾ ${dict.gamedev.engines.hint} ▾`}
          </motion.div>
        </header>

        {/* Body — grid or split */}
        <div style={{ overflow: "hidden", paddingTop: 16, marginTop: -16, paddingBottom: 4, marginBottom: -4 }}>
          <AnimatePresence mode="popLayout" initial={false}>
            {selected === null ? (
              <motion.div
                key="grid"
                initial={{ x: -32, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -32, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <GridView
                  dict={dict}
                  gamesByEngine={gamesByEngine}
                  allGamesCount={visibleGames.length}
                  onSelect={toggle}
                />
              </motion.div>
            ) : (
              <motion.div
                key="split"
                initial={{ x: 32, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 32, opacity: 0 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <SplitView
                  dict={dict}
                  selected={selected}
                  gamesByEngine={gamesByEngine}
                  allGames={visibleGames}
                  onSelect={toggle}
                  onOpen={(slug) => setOpenSlug(slug)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {openGame && (
          <GameDeepDive
            key={openGame.slug}
            game={openGame}
            dict={dict}
            onClose={() => setOpenSlug(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Grid view (default: engine slots + ALL card) ─── */
function GridView({
  dict,
  gamesByEngine,
  allGamesCount,
  onSelect,
}: {
  dict: Dictionary;
  gamesByEngine: (e: GameEngine) => GameProject[];
  allGamesCount: number;
  onSelect: (s: Selection) => void;
}) {
  const [hovered, setHovered] = useState<Selection | null>(null);

  return (
    <ul
      style={{
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 22,
      }}
    >
      {ORDER.map((engine) => {
        const v = ENGINE_VISUAL[engine];
        const slot = dict.gamedev.engines.slots[engine];
        const shipped = gamesByEngine(engine);
        const isHover = hovered === engine;

        return (
          <li key={engine}>
            <motion.button
              type="button"
              onClick={() => onSelect(engine)}
              onPointerEnter={() => setHovered(engine)}
              onPointerLeave={() => setHovered(null)}
              whileHover={{ y: -8, rotate: -1.2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              style={{
                width: "100%",
                aspectRatio: "1 / 1.05",
                position: "relative",
                background: "rgba(10,4,24,0.85)",
                border: "3px solid var(--gd-ink)",
                boxShadow: isHover
                  ? `6px 6px 0 rgba(0,0,0,0.5), 0 0 32px ${v.aura}, inset 0 0 0 2px ${v.primary}`
                  : "5px 5px 0 rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,247,220,0.18)",
                color: "var(--gd-ink)",
                fontFamily: "var(--font-press-start), monospace",
                cursor: "pointer",
                padding: 18,
                display: "grid",
                gridTemplateRows: "1fr auto",
                gap: 12,
                transition: "box-shadow 0.25s",
                imageRendering: "pixelated",
                textAlign: "left",
              }}
              aria-label={`${engine} — ${slot.years}`}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  fontSize: 8,
                  letterSpacing: 2,
                  color: "var(--gd-accent)",
                  opacity: 0.7,
                }}
              >
                SLOT 0{ORDER.indexOf(engine) + 1}
              </span>

              <div style={{ display: "grid", placeItems: "center", position: "relative" }}>
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    width: "70%",
                    aspectRatio: "1",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${v.aura} 0%, transparent 65%)`,
                    animation: isHover ? "gdSunPulse 2s ease-in-out infinite" : undefined,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    width: 84,
                    height: 84,
                    background: v.primary,
                    color: v.ink,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: 48,
                    fontWeight: 700,
                    letterSpacing: 0,
                    boxShadow:
                      "inset 0 4px 0 rgba(255,255,255,0.25), inset 0 -4px 0 rgba(0,0,0,0.18), 4px 4px 0 rgba(0,0,0,0.5)",
                    animation: "gdBob 3.4s ease-in-out infinite",
                  }}
                >
                  <EngineLogo logo={v.logo} ink={v.ink} size={48} />
                </span>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: 2,
                    color: "var(--gd-ink)",
                    textShadow: "1px 1px 0 rgba(0,0,0,0.6)",
                  }}
                >
                  {engine.toUpperCase()}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: 16,
                    letterSpacing: 1,
                    color: "var(--gd-accent)",
                  }}
                >
                  {dict.gamedev.engines.yearsLabel} · {slot.years}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: 14,
                    color: "var(--gd-ink)",
                    opacity: 0.78,
                    lineHeight: 1.35,
                    minHeight: 38,
                  }}
                >
                  {slot.blurb}
                </span>
                {shipped.length > 0 && (
                  <span
                    style={{
                      fontSize: 8,
                      letterSpacing: 2,
                      color: "var(--gd-accent-2)",
                      marginTop: 4,
                      paddingTop: 8,
                      borderTop: "1px dashed rgba(92,255,183,0.3)",
                    }}
                  >
                    ★ {dict.gamedev.engines.shippedLabel} ·{" "}
                    {shipped.map((g) => g.name).join(" · ")}
                  </span>
                )}
              </div>
            </motion.button>
          </li>
        );
      })}

      {/* ALL GAMES card */}
      <li>
        <motion.button
          type="button"
          onClick={() => onSelect("all")}
          onPointerEnter={() => setHovered("all")}
          onPointerLeave={() => setHovered(null)}
          whileHover={{ y: -8, rotate: 1.2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
          style={{
            width: "100%",
            aspectRatio: "1 / 1.05",
            position: "relative",
            background: "rgba(10,4,24,0.85)",
            border: "3px dashed rgba(255,210,63,0.5)",
            boxShadow:
              hovered === "all"
                ? `6px 6px 0 rgba(0,0,0,0.5), 0 0 32px ${ALL_VISUAL.aura}, inset 0 0 0 2px ${ALL_VISUAL.primary}`
                : "5px 5px 0 rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,247,220,0.1)",
            color: "var(--gd-ink)",
            fontFamily: "var(--font-press-start), monospace",
            cursor: "pointer",
            padding: 18,
            display: "grid",
            gridTemplateRows: "1fr auto",
            gap: 12,
            transition: "box-shadow 0.25s",
            imageRendering: "pixelated",
            textAlign: "left",
          }}
          aria-label={dict.gamedev.engines.allGamesLabel}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              fontSize: 8,
              letterSpacing: 2,
              color: "var(--gd-accent)",
              opacity: 0.7,
            }}
          >
            ★★
          </span>

          <div style={{ display: "grid", placeItems: "center", position: "relative" }}>
            <span
              aria-hidden
              style={{
                position: "absolute",
                width: "70%",
                aspectRatio: "1",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${ALL_VISUAL.aura} 0%, transparent 65%)`,
                animation: hovered === "all" ? "gdSunPulse 2s ease-in-out infinite" : undefined,
              }}
            />
            <span
              style={{
                position: "relative",
                width: 84,
                height: 84,
                background: "rgba(255,210,63,0.15)",
                border: "3px solid var(--gd-accent)",
                color: "var(--gd-accent)",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-vt323), monospace",
                fontSize: 52,
                fontWeight: 700,
                letterSpacing: 0,
                boxShadow: "4px 4px 0 rgba(0,0,0,0.5)",
                animation: "gdBob 3.4s ease-in-out infinite",
              }}
            >
              ★
            </span>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <span
              style={{
                fontSize: 11,
                letterSpacing: 2,
                color: "var(--gd-accent)",
                textShadow: "1px 1px 0 rgba(0,0,0,0.6)",
              }}
            >
              {dict.gamedev.engines.allGamesLabel}
            </span>
            <span
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: 16,
                letterSpacing: 1,
                color: "var(--gd-ink)",
                opacity: 0.7,
              }}
            >
              {allGamesCount} {dict.gamedev.engines.shippedLabel.toLowerCase()}
            </span>
            <div style={{ opacity: 0.7, minHeight: 38, display: "flex", alignItems: "center" }}>
              <EngineLogoRow />
            </div>
          </div>
        </motion.button>
      </li>
    </ul>
  );
}

/* ─── Split view (after selection) ─── */
function SplitView({
  dict,
  selected,
  gamesByEngine,
  allGames,
  onSelect,
  onOpen,
}: {
  dict: Dictionary;
  selected: Selection;
  gamesByEngine: (e: GameEngine) => GameProject[];
  allGames: GameProject[];
  onSelect: (s: Selection) => void;
  onOpen: (slug: string) => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: 22,
        alignItems: "start",
      }}
    >
      {/* Left column — ALL + compact engine list */}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gap: 12,
        }}
      >
        {/* ALL row */}
        <li>
          <motion.button
            type="button"
            onClick={() => onSelect("all")}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "56px 1fr",
              gap: 12,
              alignItems: "center",
              padding: "12px 14px",
              background:
                selected === "all" ? "rgba(10,4,24,0.95)" : "rgba(10,4,24,0.55)",
              border:
                selected === "all"
                  ? "3px solid var(--gd-accent)"
                  : "3px dashed rgba(255,210,63,0.3)",
              boxShadow:
                selected === "all"
                  ? `4px 4px 0 rgba(0,0,0,0.55), 0 0 18px ${ALL_VISUAL.aura}`
                  : "3px 3px 0 rgba(0,0,0,0.4)",
              color: "var(--gd-ink)",
              fontFamily: "var(--font-press-start), monospace",
              cursor: "pointer",
              textAlign: "left",
              imageRendering: "pixelated",
              transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
            }}
            aria-pressed={selected === "all"}
            aria-label={dict.gamedev.engines.allGamesLabel}
          >
            <span
              style={{
                width: 48,
                height: 48,
                background: "rgba(255,210,63,0.12)",
                border: "2px solid var(--gd-accent)",
                color: "var(--gd-accent)",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--font-vt323), monospace",
                fontSize: 28,
                fontWeight: 700,
                boxShadow: "2px 2px 0 rgba(0,0,0,0.4)",
                flexShrink: 0,
              }}
            >
              ★
            </span>
            <span style={{ display: "grid", gap: 3 }}>
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  color: selected === "all" ? "var(--gd-accent)" : "var(--gd-ink)",
                  lineHeight: 1.3,
                }}
              >
                {dict.gamedev.engines.allGamesLabel}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-vt323), monospace",
                  fontSize: 14,
                  color: "var(--gd-accent)",
                  letterSpacing: 1,
                }}
              >
                {allGames.length} {dict.gamedev.engines.shippedLabel.toLowerCase()}
              </span>
            </span>
          </motion.button>
        </li>

        {ORDER.map((engine) => {
          const v = ENGINE_VISUAL[engine];
          const isActive = engine === selected;
          const slot = dict.gamedev.engines.slots[engine];

          return (
            <li key={engine}>
              <motion.button
                type="button"
                onClick={() => onSelect(engine)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: 12,
                  alignItems: "center",
                  padding: "12px 14px",
                  background: isActive
                    ? `rgba(10,4,24,0.95)`
                    : "rgba(10,4,24,0.55)",
                  border: isActive
                    ? `3px solid ${v.primary}`
                    : "3px solid rgba(255,247,220,0.2)",
                  boxShadow: isActive
                    ? `4px 4px 0 rgba(0,0,0,0.55), 0 0 18px ${v.aura}`
                    : "3px 3px 0 rgba(0,0,0,0.4)",
                  color: "var(--gd-ink)",
                  fontFamily: "var(--font-press-start), monospace",
                  cursor: "pointer",
                  textAlign: "left",
                  imageRendering: "pixelated",
                  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
                }}
                aria-pressed={isActive}
                aria-label={engine}
              >
                <span
                  style={{
                    width: 48,
                    height: 48,
                    background: v.primary,
                    color: v.ink,
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: 0,
                    boxShadow:
                      "inset 0 3px 0 rgba(255,255,255,0.2), inset 0 -3px 0 rgba(0,0,0,0.15), 2px 2px 0 rgba(0,0,0,0.4)",
                    flexShrink: 0,
                  }}
                >
                  <EngineLogo logo={v.logo} ink={v.ink} size={28} />
                </span>
                <span style={{ display: "grid", gap: 3 }}>
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: 2,
                      color: isActive ? v.primary : "var(--gd-ink)",
                      lineHeight: 1.3,
                    }}
                  >
                    {engine.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-vt323), monospace",
                      fontSize: 14,
                      color: "var(--gd-accent)",
                      letterSpacing: 1,
                    }}
                  >
                    {slot.years}
                  </span>
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>

      {/* Right panel */}
      <div style={{ overflow: "hidden" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={selected}
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {selected === "all" ? (
              <AllGamesPanel dict={dict} games={allGames} onOpen={onOpen} />
            ) : (
              <EngineGamesPanel
                engine={selected}
                dict={dict}
                games={gamesByEngine(selected)}
                onOpen={onOpen}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── All games panel ─── */
function AllGamesPanel({
  dict,
  games,
  onOpen,
}: {
  dict: Dictionary;
  games: GameProject[];
  onOpen: (slug: string) => void;
}) {
  const sorted = [...games].sort((a, b) => {
    const ai = a.engine ? ORDER.indexOf(a.engine) : ORDER.length;
    const bi = b.engine ? ORDER.indexOf(b.engine) : ORDER.length;
    return ai - bi;
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "grid", gap: 18 }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px 22px",
          background: "rgba(10,4,24,0.85)",
          border: "3px solid var(--gd-accent)",
          boxShadow: `5px 5px 0 rgba(0,0,0,0.5), 0 0 24px ${ALL_VISUAL.aura}`,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 16,
          alignItems: "center",
          imageRendering: "pixelated",
        }}
      >
        <span
          style={{
            width: 64,
            height: 64,
            background: "rgba(255,210,63,0.12)",
            border: "3px solid var(--gd-accent)",
            color: "var(--gd-accent)",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-vt323), monospace",
            fontSize: 38,
            fontWeight: 700,
            boxShadow: "3px 3px 0 rgba(0,0,0,0.5)",
            animation: "gdBob 3.2s ease-in-out infinite",
          }}
        >
          ★
        </span>
        <div style={{ display: "grid", gap: 4 }}>
          <div
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 13,
              letterSpacing: 2,
              color: "var(--gd-accent)",
              textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
            }}
          >
            {dict.gamedev.engines.allGamesLabel}
          </div>
          <div style={{ lineHeight: 1.4 }}>
            <EngineLogoRow />
          </div>
          <div
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 9,
              letterSpacing: 2,
              color: "var(--gd-accent-2)",
            }}
          >
            {dict.gamedev.engines.shippedLabel} · {games.length}
          </div>
        </div>
      </div>

      {/* Game cards */}
      {sorted.length === 0 ? (
        <div
          style={{
            padding: "32px 24px",
            background: "rgba(10,4,24,0.6)",
            border: "2px dashed rgba(255,247,220,0.25)",
            textAlign: "center",
            fontFamily: "var(--font-vt323), monospace",
            fontSize: 18,
            color: "rgba(255,247,220,0.55)",
            letterSpacing: 2,
          }}
        >
          ▢ NO SHOWCASE ENTRY YET
        </div>
      ) : (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gap: 14,
          }}
        >
          {sorted.map((game, i) => (
            <GameCard
              key={game.slug}
              game={game}
              index={i}
              v={game.engine ? ENGINE_VISUAL[game.engine] : ALL_VISUAL}
              dict={dict}
              showEngine
              onOpen={onOpen}
            />
          ))}
        </ul>
      )}
    </motion.div>
  );
}

/* ─── Game cards panel ─── */
function EngineGamesPanel({
  engine,
  dict,
  games,
  onOpen,
}: {
  engine: GameEngine;
  dict: Dictionary;
  games: GameProject[];
  onOpen: (slug: string) => void;
}) {
  const v = ENGINE_VISUAL[engine];
  const slot = dict.gamedev.engines.slots[engine];

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "grid", gap: 18 }}
    >
      {/* Engine blurb header */}
      <div
        style={{
          padding: "18px 22px",
          background: "rgba(10,4,24,0.85)",
          border: `3px solid ${v.primary}`,
          boxShadow: `5px 5px 0 rgba(0,0,0,0.5), 0 0 24px ${v.aura}`,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 16,
          alignItems: "center",
          imageRendering: "pixelated",
        }}
      >
        <span
          style={{
            width: 64,
            height: 64,
            background: v.primary,
            color: v.ink,
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-vt323), monospace",
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: 0,
            boxShadow:
              "inset 0 4px 0 rgba(255,255,255,0.25), inset 0 -4px 0 rgba(0,0,0,0.18), 3px 3px 0 rgba(0,0,0,0.5)",
            animation: "gdBob 3.2s ease-in-out infinite",
          }}
        >
          <EngineLogo logo={v.logo} ink={v.ink} size={38} />
        </span>
        <div style={{ display: "grid", gap: 4 }}>
          <div
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 13,
              letterSpacing: 2,
              color: v.primary,
              textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
            }}
          >
            {engine.toUpperCase()}
          </div>
          <div
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: 18,
              color: "var(--gd-ink)",
              lineHeight: 1.4,
              letterSpacing: 1,
            }}
          >
            {slot.blurb}
          </div>
          <div
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 9,
              letterSpacing: 2,
              color: "var(--gd-accent)",
            }}
          >
            {dict.gamedev.engines.yearsLabel} · {slot.years}
          </div>
        </div>
      </div>

      {/* Game cards */}
      {games.length === 0 ? (
        <div
          style={{
            padding: "32px 24px",
            background: "rgba(10,4,24,0.6)",
            border: "2px dashed rgba(255,247,220,0.25)",
            textAlign: "center",
            fontFamily: "var(--font-vt323), monospace",
            fontSize: 18,
            color: "rgba(255,247,220,0.55)",
            letterSpacing: 2,
          }}
        >
          ▢ NO SHOWCASE ENTRY YET
        </div>
      ) : (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gap: 14,
          }}
        >
          {games.map((game, i) => (
            <GameCard key={game.slug} game={game} index={i} v={v} dict={dict} onOpen={onOpen} />
          ))}
        </ul>
      )}
    </motion.div>
  );
}

/* ─── Individual game card ─── */
function GameCard({
  game,
  index,
  v,
  dict,
  showEngine,
  onOpen,
}: {
  game: GameProject;
  index: number;
  v: { primary: string; aura: string };
  dict: Dictionary;
  showEngine?: boolean;
  onOpen: (slug: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const thumb =
    game.screenshots.find((s): s is string => typeof s === "string") ?? null;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.button
        type="button"
        onClick={() => onOpen(game.slug)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        animate={{
          boxShadow: hovered
            ? `6px 6px 0 rgba(0,0,0,0.55), 0 0 24px ${v.aura}`
            : "4px 4px 0 rgba(0,0,0,0.45)",
        }}
        style={{
          display: "grid",
          gridTemplateColumns: thumb ? "160px 1fr" : "1fr",
          background: "rgba(10,4,24,0.88)",
          border: `2px solid ${hovered ? v.primary : "rgba(255,247,220,0.2)"}`,
          transition: "border-color 0.2s",
          overflow: "hidden",
          imageRendering: "pixelated",
          width: "100%",
          cursor: "pointer",
          textAlign: "left",
          padding: 0,
        }}
      >
        {thumb && (
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              background: game.palette.bg,
              flexShrink: 0,
            }}
          >
            <img
              src={thumb}
              alt={game.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                imageRendering: "pixelated",
                display: "block",
                transition: "transform 0.3s",
                transform: hovered ? "scale(1.06)" : "scale(1)",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0 1px, transparent 1px 3px)",
                mixBlendMode: "multiply",
                pointerEvents: "none",
              }}
            />
          </div>
        )}

        <div
          style={{
            padding: "16px 18px",
            display: "grid",
            gap: 8,
            alignContent: "start",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 12,
              letterSpacing: 1.5,
              color: "var(--gd-ink)",
              textShadow: "1px 1px 0 rgba(0,0,0,0.6)",
              lineHeight: 1.3,
            }}
          >
            {game.name}
          </div>

          {showEngine && (
            <div
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontSize: 7,
                letterSpacing: 2,
                color: v.primary,
                opacity: 0.85,
              }}
            >
              {game.engine}
            </div>
          )}

          {game.description && (
            <div
              style={{
                fontFamily: "var(--font-vt323), monospace",
                fontSize: 15,
                color: "var(--gd-ink)",
                opacity: 0.85,
                lineHeight: 1.45,
                letterSpacing: 0.5,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {game.description}
            </div>
          )}

          {game.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-press-start), monospace",
                    fontSize: 7,
                    letterSpacing: 1.5,
                    padding: "4px 7px",
                    border: `1px solid ${v.primary}`,
                    color: v.primary,
                    opacity: 0.9,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {game.gameJam && (
            <div
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontSize: 8,
                letterSpacing: 2,
                color: "var(--gd-accent-3)",
                paddingTop: 8,
                borderTop: "1px dashed rgba(255,107,158,0.3)",
              }}
            >
              ★ {game.gameJam.name} {game.gameJam.year}
              {game.gameJam.placement ? ` · ${game.gameJam.placement}` : ""}
            </div>
          )}
        </div>
      </motion.button>
    </motion.li>
  );
}
