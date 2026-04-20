"use client";

import {
  siDocker,
  siGit,
  siGo,
  siJavascript,
  siNextdotjs,
  siNginx,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTypescript,
} from "simple-icons";

type BrandIcon = { path: string; hex: string };

const ICONS: Record<string, BrandIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Next.js": siNextdotjs,
  React: siReact,
  "React Native": siReact,
  "Node.js": siNodedotjs,
  Golang: siGo,
  Python: siPython,
  SQL: siPostgresql,
  PostgreSQL: siPostgresql,
  Docker: siDocker,
  Nginx: siNginx,
  Git: siGit,
};

export function TechIcon({ name, size = 40 }: { name: string; size?: number }) {
  const icon = ICONS[name];
  if (!icon) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={icon.path} />
    </svg>
  );
}
