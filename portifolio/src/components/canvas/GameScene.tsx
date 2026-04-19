"use client";

import { useEffect, useRef } from "react";

type CoinParticle = {
  kind: "coin";
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  phase: number;
};

type StarParticle = {
  kind: "star";
  x: number;
  y: number;
  age: number;
  maxAge: number;
  size: number;
};

type Particle = CoinParticle | StarParticle;

const PX = 4;

const ISLAND_BLOCKS: [number, number, string][] = [
  [0, -4, "#5cffb7"], [0, -3, "#5cffb7"], [0, -2, "#5cffb7"], [0, -1, "#5cffb7"],
  [0, 0, "#5cffb7"], [0, 1, "#5cffb7"], [0, 2, "#5cffb7"], [0, 3, "#5cffb7"],
  [0, -5, "#2ee08f"], [0, 4, "#2ee08f"],
  [1, -5, "#a05a2c"], [1, -4, "#c67d3c"], [1, -3, "#c67d3c"], [1, -2, "#c67d3c"],
  [1, -1, "#c67d3c"], [1, 0, "#c67d3c"], [1, 1, "#c67d3c"], [1, 2, "#c67d3c"],
  [1, 3, "#c67d3c"], [1, 4, "#a05a2c"],
  [2, -4, "#8b4513"], [2, -3, "#a05a2c"], [2, -2, "#a05a2c"], [2, -1, "#a05a2c"],
  [2, 0, "#a05a2c"], [2, 1, "#a05a2c"], [2, 2, "#a05a2c"], [2, 3, "#8b4513"],
  [3, -3, "#6b3410"], [3, -2, "#8b4513"], [3, -1, "#8b4513"], [3, 0, "#8b4513"],
  [3, 1, "#8b4513"], [3, 2, "#6b3410"],
  [4, -2, "#4a230a"], [4, -1, "#6b3410"], [4, 0, "#6b3410"], [4, 1, "#4a230a"],
  [-4, 2, "#2a7a3a"], [-4, 3, "#2a7a3a"],
  [-3, 1, "#2a7a3a"], [-3, 2, "#5cffb7"], [-3, 3, "#2a7a3a"], [-3, 4, "#2a7a3a"],
  [-2, 1, "#2a7a3a"], [-2, 2, "#2a7a3a"], [-2, 3, "#2a7a3a"], [-2, 4, "#2a7a3a"],
  [-1, 2, "#6b3410"], [-1, 3, "#6b3410"],
];

const CLOUD_BLOCKS: [number, number][] = [
  [0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
  [-1, -1], [0, -1], [1, -1], [2, -1], [3, -1], [4, -1], [5, -1],
  [0, -2], [2, -2], [3, -2],
];

export function GameScene({ intensity = 1 }: { intensity?: number }) {
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
    const mouse = { x: -9999, y: -9999, active: false };
    const particles: Particle[] = [];

    const islands = [
      { cx: 0.22, cy: 0.72, s: 1.0, speed: 0.8, phase: 0 },
      { cx: 0.78, cy: 0.68, s: 0.85, speed: 1.2, phase: 1.5 },
      { cx: 0.5, cy: 0.78, s: 1.2, speed: 0.6, phase: 3 },
    ];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
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

    const coinInt = window.setInterval(() => {
      particles.push({
        kind: "coin",
        x: Math.random() * w,
        y: h + 20,
        vy: -1.1 - Math.random() * 1.0,
        vx: (Math.random() - 0.5) * 0.3,
        age: 0,
        maxAge: 300 + Math.random() * 200,
        phase: Math.random() * Math.PI * 2,
      });
    }, 700);

    const starInt = window.setInterval(() => {
      particles.push({
        kind: "star",
        x: Math.random() * w,
        y: Math.random() * h * 0.5,
        age: 0,
        maxAge: 120,
        size: 1 + Math.floor(Math.random() * 2),
      });
    }, 200);

    const drawIsland = (cx: number, cy: number, scale: number, tilt: number) => {
      const s = PX * scale;
      ctx.save();
      ctx.translate(cx, cy + tilt);
      for (const [row, col, color] of ISLAND_BLOCKS) {
        ctx.fillStyle = color;
        ctx.fillRect(Math.round(col * s), Math.round(row * s), Math.ceil(s), Math.ceil(s));
      }
      ctx.restore();
    };

    const drawCloud = (x: number, y: number, scale: number) => {
      const s = PX * scale;
      ctx.fillStyle = "#fff7dc";
      for (const [cx, cy] of CLOUD_BLOCKS) {
        ctx.fillRect(Math.round(x + cx * s), Math.round(y + cy * s), Math.ceil(s), Math.ceil(s));
      }
    };

    const drawCoin = (x: number, y: number, phase: number) => {
      const sq = Math.abs(Math.cos(phase));
      const w1 = Math.max(1, Math.round(3 * sq + 1));
      const h1 = 4;
      const cx = Math.round(x);
      const cy = Math.round(y);
      ctx.fillStyle = "#c89a1a";
      ctx.fillRect(cx - w1, cy - h1, w1 * 2, h1 * 2);
      ctx.fillStyle = "#ffd23f";
      ctx.fillRect(cx - w1 + 1, cy - h1 + 1, (w1 - 1) * 2, (h1 - 1) * 2);
      if (sq > 0.4) {
        ctx.fillStyle = "#fff7dc";
        ctx.fillRect(cx - w1 + 2, cy - h1 + 2, 1, 2);
      }
    };

    const drawStar = (x: number, y: number, size: number) => {
      ctx.fillStyle = "#fff7dc";
      ctx.fillRect(x, y - size, 1, size * 2 + 1);
      ctx.fillRect(x - size, y, size * 2 + 1, 1);
    };

    let raf = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.001;
      const inten = intensityRef.current;

      const cloudRows = [
        { y: 0.12, speed: 18, scale: 2 },
        { y: 0.22, speed: 12, scale: 1.5 },
        { y: 0.32, speed: 8, scale: 2.5 },
      ];
      for (const row of cloudRows) {
        for (let i = 0; i < 4; i++) {
          const baseX = ((time * row.speed + i * w * 0.33) % (w + 200)) - 100;
          drawCloud(baseX, h * row.y, row.scale);
        }
      }

      for (const isl of islands) {
        const bob = Math.sin(time * isl.speed + isl.phase) * 6;
        const hoverLift = mouse.active
          ? Math.max(0, 40 - Math.hypot(isl.cx * w - mouse.x, isl.cy * h - mouse.y) / 20)
          : 0;
        drawIsland(isl.cx * w, isl.cy * h + bob - hoverLift, isl.s, 0);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age++;
        if (p.age > p.maxAge) {
          particles.splice(i, 1);
          continue;
        }
        if (p.kind === "coin") {
          p.y += p.vy * inten;
          p.x += p.vx;
          p.phase += 0.18;
          drawCoin(p.x, p.y, p.phase);
          if (p.y < -20) {
            particles.splice(i, 1);
            continue;
          }
        } else {
          const alpha = Math.sin((p.age / p.maxAge) * Math.PI);
          ctx.globalAlpha = alpha;
          drawStar(p.x, p.y, p.size);
          ctx.globalAlpha = 1;
        }
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(coinInt);
      window.clearInterval(starInt);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}
