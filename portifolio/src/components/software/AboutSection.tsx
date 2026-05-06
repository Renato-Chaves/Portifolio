"use client";

import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { RevealOnScroll } from "./RevealOnScroll";

export function AboutSection({ dict }: { dict: Dictionary }) {
  const a = dict.about;
  return (
    <section id="about" className="pad" data-nav="ABOUT">
      <div className="container">
        <div className="sec-label">
          <span className="k">//</span> {a.sectionLabel}
        </div>
        <h2 className="sec-title">
          {a.titlePlain} <em>{a.titleEm}<span className="bracket">.</span></em>
        </h2>
        <RevealOnScroll>
          <div className="inner">
            <div className="portrait">
              <div className="tag">
                <span className="acc">•</span> {a.portraitTag}
              </div>
              <div className="portrait-ring" aria-hidden />
              <div className="portrait-photo">
                <Image
                  src="/profile_picture.jpeg"
                  alt="Renato Chaves portrait"
                  fill
                  sizes="(max-width: 900px) 60vw, 22vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  priority
                />
                <div className="portrait-overlay" />
              </div>
              <div className="scan" />
              <div className="coord">[ TS · NEXT · GO ]</div>
            </div>
            <div className="bio">
              <h3>{a.h3}</h3>
              {a.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="sig">
                <div>
                  <b>{a.sig.focus.label}</b>
                  <span>{a.sig.focus.value}</span>
                </div>
                <div>
                  <b>{a.sig.habits.label}</b>
                  <span>{a.sig.habits.value}</span>
                </div>
                <div>
                  <b>{a.sig.learning.label}</b>
                  <span>{a.sig.learning.value}</span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
