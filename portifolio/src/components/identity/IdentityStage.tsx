"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";
import { SoftwarePanel } from "./SoftwarePanel";
import { GamedevPanel } from "./GamedevPanel";
import { IdentityNav } from "./IdentityNav";
import { ScrollIndicator } from "./ScrollIndicator";
import { SoftwareCursor } from "./cursors/SoftwareCursor";
import { GamedevCursor } from "./cursors/GamedevCursor";
import { useMouse } from "./cursors/useMouse";
import { useWheelProgress } from "@/lib/useWheelProgress";

type Props = { dict: Dictionary; locale: Locale };

export function IdentityStage({ dict, locale }: Props) {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);
  const [swHover, setSwHover] = useState(false);
  const [gdHover, setGdHover] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const swRef = useRef<HTMLDivElement | null>(null);
  const gdRef = useRef<HTMLDivElement | null>(null);
  const swMouse = useMouse(swRef);
  const gdMouse = useMouse(gdRef);

  const identities = useMemo(
    () => [
      {
        key: "software" as const,
        label: dict.identity.panelLabels.software,
        route: `/${locale}/software`,
      },
      {
        key: "gamedev" as const,
        label: dict.identity.panelLabels.gamedev,
        route: `/${locale}/gamedev`,
      },
    ],
    [dict, locale],
  );

  const navigateTo = useCallback(
    (route: string) => {
      setNavigating(true);
      router.push(route);
    },
    [router],
  );

  const activeRoute = identities[activeIdx].route;
  const onComplete = useCallback(() => {
    navigateTo(activeRoute);
  }, [activeRoute, navigateTo]);

  const { progress, triggerEnter, reset } = useWheelProgress({
    enabled: !transitioning && !navigating,
    onComplete,
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (transitioning || navigating) return;
      if (e.key === "ArrowRight") {
        setActiveIdx((i) => Math.min(identities.length - 1, i + 1));
        reset();
      } else if (e.key === "ArrowLeft") {
        setActiveIdx((i) => Math.max(0, i - 1));
        reset();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        triggerEnter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [transitioning, navigating, triggerEnter, reset, identities.length]);

  const switchTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= identities.length) return;
      if (idx === activeIdx || transitioning) return;
      setTransitioning(true);
      reset();
      setActiveIdx(idx);
      window.setTimeout(() => setTransitioning(false), 900);
    },
    [activeIdx, transitioning, reset, identities.length],
  );

  const isSoftware = identities[activeIdx].key === "software";
  const chromeOpacity = Math.max(0, 1 - progress * 2);

  return (
    <>
      <div className="identity-stage" style={{ transform: `translateX(${-activeIdx * 100}vw)` }}>
        <div className="absolute top-0 h-full" style={{ left: 0, width: "100vw" }}>
          <SoftwarePanel
            ref={swRef}
            dict={dict}
            hovering={swHover && activeIdx === 0}
            onHoverChange={setSwHover}
            onEnter={triggerEnter}
            scrollProgress={activeIdx === 0 ? progress : 0}
            interactive={activeIdx === 0 && !navigating}
          />
        </div>
        <div className="absolute top-0 h-full" style={{ left: "100vw", width: "100vw" }}>
          <GamedevPanel
            ref={gdRef}
            dict={dict}
            hovering={gdHover && activeIdx === 1}
            onHoverChange={setGdHover}
            onEnter={triggerEnter}
            scrollProgress={activeIdx === 1 ? progress : 0}
            interactive={activeIdx === 1 && !navigating}
          />
        </div>
      </div>

      {activeIdx === 0 && <SoftwareCursor pos={swMouse} hovering={swHover} />}
      {activeIdx === 1 && <GamedevCursor pos={gdMouse} hovering={gdHover} />}

      <IdentityNav
        identities={identities.map(({ key, label }) => ({ key, label }))}
        activeIdx={activeIdx}
        onSwitch={switchTo}
        opacity={chromeOpacity}
      />

      <ScrollIndicator
        theme={isSoftware ? "software" : "gamedev"}
        opacity={chromeOpacity * 0.9}
      />
    </>
  );
}
