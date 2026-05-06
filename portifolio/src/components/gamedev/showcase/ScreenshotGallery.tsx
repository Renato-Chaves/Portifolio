"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ShowcaseMedia } from "@/lib/data";

export function ScreenshotGallery({
  screenshots,
  palette,
  fallbackTitle,
  comingSoonLabel,
}: {
  screenshots: ShowcaseMedia[];
  palette: { primary: string; accent: string; bg: string };
  fallbackTitle: string;
  comingSoonLabel: string;
}) {
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const has = screenshots.length > 0;
  const total = Math.max(1, screenshots.length);
  const next = () => setIdx((i) => (i + 1) % total);
  const prev = () => setIdx((i) => (i - 1 + total) % total);

  const current = has ? screenshots[idx] : null;
  const isImage =
    current !== null &&
    !(typeof current === "object" && current.kind === "youtube");
  const expandedSrc = isImage ? (current as string) : null;

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  useEffect(() => {
    if (!isImage && expanded) setExpanded(false);
  }, [isImage, expanded]);

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
            (() => {
              const item = screenshots[idx];
              if (typeof item === "object" && item.kind === "youtube") {
                return (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${item.videoId}?rel=0&modestbranding=1`}
                    title={item.title ?? "Gameplay video"}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "100%",
                      border: 0,
                      background: "#000",
                    }}
                  />
                );
              }
              return (
                <img
                  src={item as string}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    imageRendering: "pixelated",
                  }}
                />
              );
            })()
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
                  {comingSoonLabel}
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

      {isImage && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          aria-label="View full image"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 36,
            height: 36,
            background: "rgba(0,0,0,0.6)",
            color: palette.primary,
            border: `2px solid ${palette.primary}`,
            fontFamily: "var(--font-press-start), monospace",
            fontSize: 14,
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            lineHeight: 1,
          }}
        >
          ⛶
        </button>
      )}

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

      <AnimatePresence>
        {expanded && expandedSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setExpanded(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Full screenshot view"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(0,0,0,0.92)",
              display: "grid",
              placeItems: "center",
              padding: 24,
              cursor: "zoom-out",
            }}
          >
            <motion.img
              key={expandedSrc}
              src={expandedSrc}
              alt=""
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "90vw",
                height: "85vh",
                objectFit: "contain",
                imageRendering: "pixelated",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
                cursor: "default",
              }}
            />
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close full image"
              style={{
                position: "fixed",
                top: 20,
                right: 20,
                width: 44,
                height: 44,
                background: "rgba(0,0,0,0.7)",
                color: palette.primary,
                border: `2px solid ${palette.primary}`,
                fontFamily: "var(--font-press-start), monospace",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
