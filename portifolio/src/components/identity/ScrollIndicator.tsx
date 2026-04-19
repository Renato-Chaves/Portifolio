"use client";

type Props = {
  theme: "software" | "gamedev";
  opacity: number;
};

export function ScrollIndicator({ theme, opacity }: Props) {
  const isSoftware = theme === "software";
  return (
    <div
      className="pointer-events-none fixed top-1/2 z-30 flex -translate-y-1/2 select-none flex-col items-center gap-3.5"
      style={{
        right: 32,
        opacity,
        transition: "opacity 0.4s",
      }}
    >
      {isSoftware ? (
        <>
          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 10,
              color: "var(--sw-mute)",
            }}
          >
            Scroll to enter
          </div>
          <div className="sw-scroll-track" />
        </>
      ) : (
        <>
          <div
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 9,
              color: "var(--gd-ink)",
              textShadow: "2px 2px 0 #3a0f5e",
            }}
          >
            SCROLL ↓
          </div>
          <div
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 14,
              color: "var(--gd-accent)",
              textShadow: "2px 2px 0 #3a0f5e",
              animation: "gdScroll 0.8s steps(2) infinite",
            }}
          >
            ▼
          </div>
          <div
            style={{
              fontFamily: "var(--font-press-start), monospace",
              fontSize: 14,
              color: "var(--gd-accent)",
              textShadow: "2px 2px 0 #3a0f5e",
              animation: "gdScroll 0.8s steps(2) infinite",
              animationDelay: "0.15s",
              opacity: 0.7,
            }}
          >
            ▼
          </div>
        </>
      )}
    </div>
  );
}
