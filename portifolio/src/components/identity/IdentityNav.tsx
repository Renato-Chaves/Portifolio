"use client";

type Identity = { key: "software" | "gamedev"; label: string };

type Props = {
  identities: Identity[];
  activeIdx: number;
  onSwitch: (idx: number) => void;
  opacity: number;
};

export function IdentityNav({ identities, activeIdx, onSwitch, opacity }: Props) {
  const isSoftware = identities[activeIdx].key === "software";

  const dotBase: React.CSSProperties = {
    width: 10,
    height: 10,
    padding: 0,
    background: "transparent",
    border: "none",
    position: "relative",
    cursor: "inherit",
    transition: "transform 0.25s",
  };

  return (
    <div
      className="pointer-events-auto fixed left-1/2 z-40 flex -translate-x-1/2 items-center gap-5"
      style={{ bottom: 22, opacity }}
    >
      <button
        type="button"
        onClick={() => onSwitch(activeIdx - 1)}
        disabled={activeIdx === 0}
        aria-label="Previous identity"
        className="grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 hover:scale-110 disabled:pointer-events-none disabled:opacity-25"
        style={{
          background: "transparent",
          border: "none",
          color: isSoftware ? "var(--sw-accent)" : "var(--gd-accent)",
          fontFamily: isSoftware ? "inherit" : "var(--font-press-start), monospace",
          fontSize: isSoftware ? 14 : 14,
          textShadow: isSoftware ? "none" : "2px 2px 0 #3a0f5e",
          cursor: "inherit",
        }}
      >
        {isSoftware ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M11 3l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              fill="none"
            />
          </svg>
        ) : (
          "◀"
        )}
      </button>

      <div className="flex gap-3">
        {identities.map((id, i) => {
          const active = i === activeIdx;
          const innerStyle: React.CSSProperties = isSoftware
            ? {
                position: "absolute",
                inset: 0,
                transition: "all 0.3s",
                border: "1px solid var(--sw-accent)",
                transform: "rotate(45deg)",
                background: active ? "var(--sw-accent)" : "transparent",
                boxShadow: active ? "0 0 12px var(--sw-accent)" : "none",
              }
            : {
                position: "absolute",
                inset: 0,
                transition: "all 0.3s",
                background: active ? "var(--gd-accent)" : "#fff7dc",
                boxShadow: active
                  ? "2px 2px 0 #3a0f5e, 0 0 12px var(--gd-accent)"
                  : "2px 2px 0 #3a0f5e",
              };
          return (
            <button
              key={id.key}
              type="button"
              className="hover:scale-125"
              onClick={() => onSwitch(i)}
              aria-label={`Go to ${id.label}`}
              title={id.label}
              style={dotBase}
            >
              <span style={innerStyle} />
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onSwitch(activeIdx + 1)}
        disabled={activeIdx === identities.length - 1}
        aria-label="Next identity"
        className="grid h-11 w-11 place-items-center rounded-full transition-transform duration-200 hover:scale-110 disabled:pointer-events-none disabled:opacity-25"
        style={{
          background: "transparent",
          border: "none",
          color: isSoftware ? "var(--sw-accent)" : "var(--gd-accent)",
          fontFamily: isSoftware ? "inherit" : "var(--font-press-start), monospace",
          fontSize: 14,
          textShadow: isSoftware ? "none" : "2px 2px 0 #3a0f5e",
          cursor: "inherit",
        }}
      >
        {isSoftware ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M7 3l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
              fill="none"
            />
          </svg>
        ) : (
          "▶"
        )}
      </button>
    </div>
  );
}
