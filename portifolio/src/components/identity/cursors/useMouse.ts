"use client";

import { useEffect, useState, type RefObject } from "react";

export type MousePos = {
  x: number;
  y: number;
  inside: boolean;
  down: boolean;
};

export function useMouse(targetRef: RefObject<HTMLElement | null>): MousePos {
  const [pos, setPos] = useState<MousePos>({ x: -100, y: -100, inside: false, down: false });

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      setPos((p) => ({ ...p, x: e.clientX, y: e.clientY, inside }));
    };
    const onDown = () => setPos((p) => ({ ...p, down: true }));
    const onUp = () => setPos((p) => ({ ...p, down: false }));
    const onLeave = () => setPos((p) => ({ ...p, inside: false }));

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [targetRef]);

  return pos;
}
