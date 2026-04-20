"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
  anchor: boolean;
};

type Pulse = { age: number; max: number; origin: Node };

export function HeroNetwork({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let nodes: Node[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const pulses: Pulse[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(((w * h) / 26000) * density);
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: 1 + Math.random() * 1.4,
          pulse: Math.random() * Math.PI * 2,
          anchor: Math.random() < 0.07,
        });
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const pulseInt = reduced
      ? 0
      : window.setInterval(() => {
          if (!nodes.length) return;
          const o = nodes[Math.floor(Math.random() * nodes.length)];
          pulses.push({ age: 0, max: 130, origin: o });
        }, 1600);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;

        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22000) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / 148) * 0.18;
            n.x += (dx / d) * f;
            n.y += (dy / d) * f;
          }
        }
        n.pulse += 0.03;
      }

      const maxD2 = 150 * 150;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const alpha = (1 - d2 / maxD2) * 0.28;
            let boost = 0;
            if (mouse.active) {
              const mx = (a.x + b.x) / 2 - mouse.x;
              const my = (a.y + b.y) / 2 - mouse.y;
              const md2 = mx * mx + my * my;
              if (md2 < 20000) boost = (1 - md2 / 20000) * 0.5;
            }
            ctx.strokeStyle = `rgba(103, 180, 255, ${alpha + boost * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const p = 0.5 + 0.5 * Math.sin(n.pulse);
        if (n.anchor) {
          ctx.save();
          ctx.translate(n.x, n.y);
          ctx.rotate(Math.PI / 4);
          ctx.fillStyle = `rgba(110, 240, 232, ${0.55 + p * 0.4})`;
          ctx.fillRect(-3, -3, 6, 6);
          ctx.strokeStyle = "rgba(110, 240, 232, 0.8)";
          ctx.strokeRect(-4.5, -4.5, 9, 9);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.fillStyle = `rgba(103, 180, 255, ${0.5 + p * 0.3})`;
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.fillStyle = "rgba(103, 180, 255, 0.08)";
          ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.age++;
        if (p.age > p.max) {
          pulses.splice(i, 1);
          continue;
        }
        const t = p.age / p.max;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(110, 240, 232, ${(1 - t) * 0.55})`;
        ctx.lineWidth = 1.5;
        ctx.arc(p.origin.x, p.origin.y, t * 180, 0, Math.PI * 2);
        ctx.stroke();
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (pulseInt) window.clearInterval(pulseInt);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [density]);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}
