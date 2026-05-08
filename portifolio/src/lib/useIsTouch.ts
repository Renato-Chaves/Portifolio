"use client";

import { useEffect, useState } from "react";

const QUERY = "(pointer: coarse)";

export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    setIsTouch(mql.matches);
    const onChange = () => setIsTouch(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isTouch;
}
