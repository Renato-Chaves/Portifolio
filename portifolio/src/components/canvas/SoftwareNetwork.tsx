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

type Pulse = {
  age: number;
  maxAge: number;
  origin: Node;
};

export function SoftwareNetwork({ intensity = 1 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intensityRef = useRef(intensity);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 22000);
      nodes = [];
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: 1 + Math.random() * 1.6,
          pulse: Math.random() * Math.PI * 2,
          anchor: Math.random() < 0.08,
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

    const pulseInt = window.setInterval(() => {
      if (!nodes.length) return;
      const from = nodes[Math.floor(Math.random() * nodes.length)];
      pulses.push({ age: 0, maxAge: 120, origin: from });
    }, 1200);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const inten = intensityRef.current;
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        n.x += n.vx * inten;
        n.y += n.vy * inten;
        if (n.x < -20) n.x = w + 20;
        else if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        else if (n.y > h + 20) n.y = -20;

        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 26000) {
            const d = Math.sqrt(d2) || 1;
            const force = (1 - d / 162) * 0.25;
            n.x += (dx / d) * force;
            n.y += (dy / d) * force;
          }
        }
        n.pulse += 0.03;
      }

      const maxD = 150;
      const maxD2 = maxD * maxD;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const alpha = (1 - d2 / maxD2) * 0.35;
            let boost = 0;
            if (mouse.active) {
              const mx = (a.x + b.x) / 2 - mouse.x;
              const my = (a.y + b.y) / 2 - mouse.y;
              const md2 = mx * mx + my * my;
              if (md2 < 22000) boost = (1 - md2 / 22000) * 0.6;
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
          ctx.fillStyle = `rgba(110, 240, 232, ${0.6 + p * 0.4})`;
          ctx.fillRect(-3, -3, 6, 6);
          ctx.strokeStyle = "rgba(110, 240, 232, 0.9)";
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
        p.age += 1;
        if (p.age > p.maxAge) {
          pulses.splice(i, 1);
          continue;
        }
        const t = p.age / p.maxAge;
        const radius = t * 180;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(110, 240, 232, ${(1 - t) * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.arc(p.origin.x, p.origin.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (mouse.active) {
        const grd = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
        grd.addColorStop(0, "rgba(103, 180, 255, 0.15)");
        grd.addColorStop(1, "rgba(103, 180, 255, 0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(pulseInt);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
