"use client";

import Link from "next/link";
import { PORTFOLIO } from "@/lib/data";
import type { Dictionary, Locale } from "@/lib/i18n";

export function ContactSection({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const d = PORTFOLIO;
  const c = dict.contact;
  const year = new Date().getFullYear();
  return (
    <section id="contact" data-nav="CONTACT">
      <div className="container">
        <div className="contact-intro">{c.sectionLabel}</div>
        <h2 className="contact-big">
          {c.titleLine1}
          <br />
          <em>{c.titleEm}</em>
        </h2>
        <a className="contact-email" href={`mailto:${d.email}`}>
          <span>{d.email}</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M3 9h12M10 4l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </a>

        <div className="contact-grid">
          {d.socials.map((s) => (
            <a
              key={s.k}
              className="contact-cell"
              href={s.href}
              {...(s.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <div className="k">{s.k}</div>
              <div className="v">{s.v}</div>
              <svg
                className="arr"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M4 10L10 4M10 4H5M10 4V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </a>
          ))}
        </div>

        <div className="cross-port">
          <div>
            <div className="label">{c.crossLabel}</div>
            <h4>
              {c.crossH4Plain} <em>{c.crossH4Em}</em>
            </h4>
            <p>{c.crossP}</p>
          </div>
          <Link className="go" href={`/${locale}/gamedev`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M7 3l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
            {c.crossBtn}
          </Link>
        </div>

        <div className="footer">
          <div>© {year} {d.name.toUpperCase()}</div>
          <div>{c.footerIdentity}</div>
        </div>
      </div>
    </section>
  );
}
