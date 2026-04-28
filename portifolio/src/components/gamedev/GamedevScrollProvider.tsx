"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { useMotionValue, type MotionValue } from "framer-motion";

type GdScrollContextValue = {
  scrollY: MotionValue<number>;
  pageProgress: MotionValue<number>;
  scrollHeight: number;
  scrollToTarget: (target: number | HTMLElement | string) => void;
  reducedMotion: boolean;
};

const GdScrollContext = createContext<GdScrollContextValue | null>(null);

export function useGdScroll() {
  const ctx = useContext(GdScrollContext);
  if (!ctx) {
    throw new Error("useGdScroll must be used inside <GamedevScrollProvider>");
  }
  return ctx;
}

export function GamedevScrollProvider({ children }: { children: ReactNode }) {
  const scrollY = useMotionValue(0);
  const pageProgress = useMotionValue(0);
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const computeMax = () =>
      Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );

    const sync = (y: number, max: number) => {
      scrollY.set(y);
      pageProgress.set(Math.min(1, Math.max(0, y / max)));
      setScrollHeight(max);
    };

    if (reducedMotion) {
      const update = () => sync(window.scrollY, computeMax());
      window.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      update();
      return () => {
        window.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      };
    }

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      lerp: 0.1,
    });
    lenisRef.current = lenis;

    const onScroll = (l: Lenis) => {
      const max = Math.max(1, l.limit);
      sync(l.scroll, max);
    };
    lenis.on("scroll", onScroll);

    const onResize = () => sync(lenis.scroll, Math.max(1, lenis.limit));
    window.addEventListener("resize", onResize);
    sync(lenis.scroll, Math.max(1, lenis.limit));

    return () => {
      window.removeEventListener("resize", onResize);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion, scrollY, pageProgress]);

  const scrollToTarget = useCallback(
    (target: number | HTMLElement | string) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target as Parameters<Lenis["scrollTo"]>[0]);
        return;
      }
      const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior });
      } else {
        target.scrollIntoView({ behavior });
      }
    },
    [reducedMotion],
  );

  const value = useMemo<GdScrollContextValue>(
    () => ({
      scrollY,
      pageProgress,
      scrollHeight,
      scrollToTarget,
      reducedMotion,
    }),
    [scrollY, pageProgress, scrollHeight, scrollToTarget, reducedMotion],
  );

  return (
    <GdScrollContext.Provider value={value}>
      {children}
    </GdScrollContext.Provider>
  );
}
