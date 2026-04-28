"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useGdScroll } from "../GamedevScrollProvider";

type Props = {
  children: ReactNode;
  perspective?: number;
  maxTilt?: number;
  className?: string;
  style?: CSSProperties;
};

export function CssPerspectiveStage({
  children,
  perspective = 1200,
  maxTilt = 4,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useGdScroll();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 18, mass: 0.6 });
  const rotY = useTransform(sx, (v) => v * maxTilt);
  const rotX = useTransform(sy, (v) => -v * maxTilt);

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;
      mx.set(cx * 2 - 1);
      my.set(cy * 2 - 1);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [mx, my, reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: `${perspective}px`, ...style }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          rotateX: rotX,
          rotateY: rotY,
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
