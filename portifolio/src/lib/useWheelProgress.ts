"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DIVE_AMOUNT = 2500;
const TOUCH_MULTIPLIER = 2.5;
const DRIFT_IDLE_MS = 180;
const DRIFT_STEP = 40;

export type WheelProgress = {
  progress: number;
  triggerEnter: () => void;
  reset: () => void;
};

/**
 * Accumulates wheel + touch movement into a 0..1 progress value.
 * Eases back to 0 when idle (unless progress crossed 0.95).
 * `onComplete` fires once progress reaches 1.
 */
export function useWheelProgress({
  enabled,
  onComplete,
}: {
  enabled: boolean;
  onComplete: () => void;
}): WheelProgress {
  const [progress, setProgress] = useState(0);
  const accumRef = useRef(0);
  const progressRef = useRef(0);
  const firedRef = useRef(false);
  const rafRef = useRef(0);
  const driftRef = useRef<number | null>(null);

  const setP = useCallback((p: number) => {
    progressRef.current = p;
    setProgress(p);
  }, []);

  const reset = useCallback(() => {
    accumRef.current = 0;
    firedRef.current = false;
    setP(0);
  }, [setP]);

  const triggerEnter = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    const start = performance.now();
    const from = progressRef.current;
    const duration = 1600;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = from + (1 - from) * (t * t * t);
      setP(eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        onComplete();
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [onComplete, setP]);

  useEffect(() => {
    if (!enabled) return;

    const commit = (next: number) => {
      accumRef.current = Math.max(0, next);
      const p = Math.min(1, accumRef.current / DIVE_AMOUNT);
      setP(p);
      if (p >= 0.999 && !firedRef.current) {
        firedRef.current = true;
        window.setTimeout(onComplete, 350);
      }
    };

    const scheduleDrift = () => {
      if (driftRef.current !== null) window.clearTimeout(driftRef.current);
      driftRef.current = window.setTimeout(() => {
        if (firedRef.current) return;
        if (progressRef.current <= 0 || progressRef.current >= 0.95) return;
        const ease = () => {
          accumRef.current = Math.max(0, accumRef.current - DRIFT_STEP);
          const p = Math.min(1, accumRef.current / DIVE_AMOUNT);
          setP(p);
          if (p > 0) rafRef.current = requestAnimationFrame(ease);
        };
        ease();
      }, DRIFT_IDLE_MS);
    };

    const onWheel = (e: WheelEvent) => {
      if (firedRef.current) return;
      e.preventDefault();
      commit(accumRef.current + e.deltaY);
      scheduleDrift();
    };

    let lastTouchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (firedRef.current) return;
      const y = e.touches[0].clientY;
      const dy = lastTouchY - y;
      lastTouchY = y;
      commit(accumRef.current + dy * TOUCH_MULTIPLIER);
      scheduleDrift();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      if (driftRef.current !== null) window.clearTimeout(driftRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, onComplete, setP]);

  return { progress, triggerEnter, reset };
}
