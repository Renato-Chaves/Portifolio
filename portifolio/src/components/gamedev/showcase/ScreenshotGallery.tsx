"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function ScreenshotGallery({
  screenshots,
  palette,
  fallbackTitle,
}: {
  screenshots: string[];
  palette: { primary: string; accent: string; bg: string };
  fallbackTitle: string;
}) {
  const [idx, setIdx] = useState(0);
  const has = screenshots.length > 0;
  const total = Math.max(1, screenshots.length);
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 10",
        background: palette.bg,
        boxShadow:
          "0 0 0 4px rgba(255,247,220,0.1), 12px 12px 0 rgba(0,0,0,0.45)",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
          }}
        >
          {has ? (
            <img
              src={screenshots[idx]}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                imageRendering: "pixelated",
              }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                background: `linear-gradient(135deg, ${palette.bg}, ${palette.primary}33)`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-press-start), monospace",
                  fontSize: 14,
                  letterSpacing: 3,
                  color: palette.primary,
                  textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
                  textAlign: "center",
                  padding: 24,
                }}
              >
                {fallbackTitle}
                <div
                  style={{
                    fontFamily: "var(--font-vt323), monospace",
                    fontSize: 18,
                    color: "var(--gd-ink)",
                    letterSpacing: 2,
                    marginTop: 12,
                    opacity: 0.8,
                  }}
                >
                  Screenshot coming soon
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div
        aria-hidden
        className="gd-scanlines"
        style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3 }}
      />

      {has && screenshots.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous screenshot"
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 40,
              height: 40,
              background: "rgba(0,0,0,0.6)",
              color: palette.primary,
              border: `2px solid ${palette.primary}`,
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            ◀
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next screenshot"
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              width: 40,
              height: 40,
              background: "rgba(0,0,0,0.6)",
              color: palette.primary,
              border: `2px solid ${palette.primary}`,
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            ▶
          </button>

          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 12,
              transform: "translateX(-50%)",
              display: "flex",
              gap: 6,
            }}
          >
            {screenshots.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                style={{
                  width: 10,
                  height: 10,
                  background:
                    i === idx ? palette.primary : "rgba(255,247,220,0.25)",
                  border: "none",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
