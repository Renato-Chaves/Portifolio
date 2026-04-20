"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";

export const SECTION_IDS = [
  "hero",
  "about",
  "experience",
  "skills",
  "projects",
  "github",
  "education",
  "contact",
] as const;

const IDX_BY_ID: Record<(typeof SECTION_IDS)[number], string> = {
  hero: "01",
  about: "02",
  experience: "03",
  skills: "04",
  projects: "05",
  github: "06",
  education: "07",
  contact: "08",
};

type Props = {
  progress: number;
  active: string;
  revealed: boolean;
  brand: string;
  dict: Dictionary;
  locale: Locale;
};

export function Navbar({ progress, active, revealed, brand, dict, locale }: Props) {
  const pathname = usePathname();
  const other: Locale = locale === "en" ? "pt" : "en";
  const otherPath = pathname.replace(/^\/(en|pt)(?=\/|$)/, `/${other}`);
  return (
    <nav className={`nav ${revealed ? "reveal" : ""}`}>
      <Link href={`/${locale}`} className="back-select" aria-label={dict.nav.backAria}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path
            d="M7.5 2L3.5 6l4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="none"
          />
        </svg>
        <span>{dict.nav.back}</span>
      </Link>
      <div className="brand">
        <span className="dot" />
        <b>{brand.toUpperCase()}</b>
        <span>{dict.nav.brandSlug}</span>
      </div>
      <div className="links">
        {SECTION_IDS.map((id) => (
          <a key={id} href={`#${id}`} className={active === id ? "active" : ""}>
            <span className="idx">{IDX_BY_ID[id]}</span>
            {dict.nav.sections[id]}
          </a>
        ))}
      </div>
      <div className="status">
        <Link href={otherPath} className="lang-switch" aria-label={`Switch to ${other.toUpperCase()}`}>
          <span className={locale === "en" ? "on" : ""}>{dict.nav.langSwitch.en}</span>
          <span className="sep">·</span>
          <span className={locale === "pt" ? "on" : ""}>{dict.nav.langSwitch.pt}</span>
        </Link>
        <span className="pulse" />
        <span>{dict.nav.online}</span>
      </div>
      <div className="progress" style={{ width: `${progress * 100}%` }} />
    </nav>
  );
}
