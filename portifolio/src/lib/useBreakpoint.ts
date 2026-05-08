"use client";

import { useEffect, useState } from "react";

export type Breakpoint = "phone" | "tablet" | "desktop" | "wide";

const QUERIES: Array<{ bp: Breakpoint; query: string }> = [
  { bp: "phone", query: "(max-width: 640px)" },
  { bp: "tablet", query: "(min-width: 641px) and (max-width: 1024px)" },
  { bp: "wide", query: "(min-width: 1440px)" },
];

function resolve(): Breakpoint {
  if (typeof window === "undefined") return "desktop";
  for (const { bp, query } of QUERIES) {
    if (window.matchMedia(query).matches) return bp;
  }
  return "desktop";
}

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    setBp(resolve());
    const mqls = QUERIES.map(({ query }) => window.matchMedia(query));
    const onChange = () => setBp(resolve());
    mqls.forEach((mql) => mql.addEventListener("change", onChange));
    return () => mqls.forEach((mql) => mql.removeEventListener("change", onChange));
  }, []);

  return bp;
}
