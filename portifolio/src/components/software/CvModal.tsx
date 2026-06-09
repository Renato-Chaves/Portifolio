"use client";

import { useEffect, useState } from "react";
import { PORTFOLIO } from "@/lib/data";
import type { Dictionary, Locale } from "@/lib/i18n";

const FILENAME: Record<Locale, string> = {
  en: "Renato Chaves Nunes - CV.pdf",
  pt: "Renato Chaves Nunes - CV - Pt Br.pdf",
};

export function CvModal({
  open,
  onClose,
  dict,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  dict: Dictionary;
  locale: Locale;
}) {
  const m = dict.cvModal;
  const [lang, setLang] = useState<Locale>(locale);

  // Reset to the page language each time the modal is opened.
  useEffect(() => {
    if (open) setLang(locale);
  }, [open, locale]);

  // Esc to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const url = PORTFOLIO.cv[lang];

  return (
    <div className={`cv-modal ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="cv-modal-backdrop" onClick={onClose} aria-hidden />
      <div
        className="cv-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={m.title}
      >
        <div className="cv-modal-head">
          <span className="cv-modal-title">{m.title}</span>
          <div className="cv-modal-tabs" role="tablist">
            <button
              type="button"
              className={`cv-modal-tab ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              {m.langEn}
            </button>
            <button
              type="button"
              className={`cv-modal-tab ${lang === "pt" ? "active" : ""}`}
              onClick={() => setLang("pt")}
              aria-pressed={lang === "pt"}
            >
              {m.langPt}
            </button>
          </div>
          <button
            type="button"
            className="cv-modal-close"
            onClick={onClose}
            aria-label={m.close}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </button>
        </div>

        <div className="cv-modal-body">
          {open && (
            <iframe
              key={lang}
              className="cv-modal-frame"
              src={`${url}#view=FitH`}
              title={`${m.title} — ${lang === "en" ? m.langEn : m.langPt}`}
            />
          )}
        </div>

        <div className="cv-modal-foot">
          <a
            className="cv-modal-download"
            href={url}
            download={FILENAME[lang]}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M7 1v8M3.5 6.5L7 10l3.5-3.5M2 12.5h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
            {m.download}
          </a>
        </div>
      </div>
    </div>
  );
}
