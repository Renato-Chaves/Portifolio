"use client";

import { motion } from "framer-motion";
import type { GameJam } from "@/lib/data";
import type { Dictionary } from "@/lib/i18n";

export function GameJamsHall({
  dict,
  jams,
}: {
  dict: Dictionary;
  jams: GameJam[];
}) {
  return (
    <section
      data-gd-section="jams"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        padding: "120px 24px 140px",
        background:
          "linear-gradient(180deg, #050018 0%, #2a0a48 60%, #3a0f5e 100%)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 800px 400px at 50% 30%, rgba(255,210,63,0.1), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 120,
          background:
            "linear-gradient(180deg, transparent 0, #1a0530 30%, #050018 100%)",
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
            ★ {dict.gamedev.jams.sectionLabel}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontWeight: 400,
              fontSize: "clamp(28px, 4.2vw, 52px)",
              lineHeight: 1.1,
              color: "var(--gd-ink)",
              textShadow:
                "3px 3px 0 var(--gd-accent-3), 6px 6px 0 #3a0f5e",
              margin: 0,
            }}
          >
            {dict.gamedev.jams.title}
          </h2>
          <div
            style={{
              fontFamily: "var(--font-vt323), monospace",
              fontSize: 18,
              letterSpacing: 2,
              color: "var(--gd-accent-2)",
              opacity: 0.85,
            }}
          >
            ▾ {dict.gamedev.jams.hint} ▾
          </div>
        </header>

        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {jams.map((jam, i) => (
            <JamStamp
              key={jam.slug}
              jam={jam}
              index={i}
              dict={dict}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function JamStamp({
  jam,
  index,
  dict,
}: {
  jam: GameJam;
  index: number;
  dict: Dictionary;
}) {
  const tilt = index % 2 === 0 ? -1.2 : 1.4;

  return (
    <motion.li
      initial={{ opacity: 0, y: 30, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #fff7dc 0%, #f3d6a2 100%)",
        color: "#2a0a48",
        border: "3px solid #2a0a48",
        boxShadow:
          "5px 5px 0 rgba(0,0,0,0.55), inset 0 0 0 2px rgba(42,10,72,0.2)",
        padding: 18,
        display: "grid",
        gap: 12,
        imageRendering: "pixelated",
        fontFamily: "var(--font-press-start), monospace",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          width: 56,
          height: 56,
          borderRadius: "50%",
          border: "2px dashed rgba(42,10,72,0.4)",
          display: "grid",
          placeItems: "center",
          fontFamily: "var(--font-vt323), monospace",
          fontSize: 16,
          color: "rgba(42,10,72,0.55)",
          letterSpacing: 0,
          transform: "rotate(-12deg)",
        }}
      >
        {jam.year}
      </div>

      <div
        style={{
          display: "grid",
          gap: 4,
          paddingRight: 64,
        }}
      >
        <div
          style={{
            fontSize: 8,
            letterSpacing: 3,
            color: "#9e1f3f",
          }}
        >
          ★ COMPLETED
        </div>
        <div
          style={{
            fontSize: 13,
            letterSpacing: 1,
            lineHeight: 1.25,
            color: "#2a0a48",
            textShadow: "1px 1px 0 rgba(255,247,220,0.6)",
          }}
        >
          {jam.name}
        </div>
      </div>

      {jam.entry.thumbnail ? (
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            border: "2px solid #2a0a48",
            background: "#1a0530",
            boxShadow: "inset 0 0 0 2px rgba(255,247,220,0.25)",
          }}
        >
          <img
            src={jam.entry.thumbnail}
            alt={jam.entry.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              imageRendering: "pixelated",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 3px)",
              mixBlendMode: "multiply",
              pointerEvents: "none",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            aspectRatio: "16 / 9",
            display: "grid",
            placeItems: "center",
            border: "2px dashed rgba(42,10,72,0.45)",
            background:
              "repeating-linear-gradient(45deg, rgba(42,10,72,0.07) 0 8px, transparent 8px 16px)",
            color: "#6e1f3f",
            fontFamily: "var(--font-vt323), monospace",
            fontSize: 16,
            letterSpacing: 2,
          }}
        >
          ▢ NO IMAGE
        </div>
      )}

      <div
        style={{
          display: "grid",
          gap: 6,
          fontFamily: "var(--font-vt323), monospace",
          fontSize: 16,
          color: "#2a0a48",
        }}
      >
        {jam.theme && (
          <div>
            <span
              style={{
                fontFamily: "var(--font-press-start), monospace",
                fontSize: 9,
                letterSpacing: 2,
                color: "#9e1f3f",
                marginRight: 8,
              }}
            >
              {dict.gamedev.jams.themeLabel}
            </span>
            {jam.theme}
          </div>
        )}
        <div>
          <span
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 9,
              letterSpacing: 2,
              color: "#9e1f3f",
              marginRight: 8,
            }}
          >
            {dict.gamedev.jams.entryLabel}
          </span>
          {jam.entry.name}
        </div>
        {jam.placement && (
          <div style={{ color: "#6e1f3f", fontStyle: "italic" }}>
            {jam.placement}
          </div>
        )}
      </div>

      {jam.entry.url && (
        <a
          href={jam.entry.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            textAlign: "center",
            padding: "8px 12px",
            background: "#2a0a48",
            color: "#fff7dc",
            fontFamily: "var(--font-press-start), monospace",
            fontSize: 8,
            letterSpacing: 2,
            border: "2px solid #2a0a48",
            boxShadow: "2px 2px 0 rgba(0,0,0,0.45)",
            textDecoration: "none",
            cursor: "pointer",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#9e1f3f";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#9e1f3f";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#2a0a48";
            (e.currentTarget as HTMLAnchorElement).style.borderColor = "#2a0a48";
          }}
        >
          {dict.gamedev.jams.viewEntry}
        </a>
      )}
    </motion.li>
  );
}
