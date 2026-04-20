"use client";

import { useEffect, useRef, useState } from "react";
import { PORTFOLIO } from "@/lib/data";
import type { LiveGithub } from "@/lib/github";
import type { Dictionary, Locale } from "@/lib/i18n";
import { Navbar, SECTION_IDS } from "./Navbar";
import { HeroAct1 } from "./HeroAct1";
import { HeroAct2 } from "./HeroAct2";
import { AboutSection } from "./AboutSection";
import { ExperienceSection } from "./ExperienceSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { GithubSection } from "./GithubSection";
import { EducationSection } from "./EducationSection";
import { ContactSection } from "./ContactSection";

export function SoftwarePortfolio({
  github,
  dict,
  locale,
}: {
  github: LiveGithub;
  dict: Dictionary;
  locale: Locale;
}) {
  const [scrollY, setScrollY] = useState(0);
  const [active, setActive] = useState<string>("hero");
  const [navRevealed, setNavRevealed] = useState(false);
  const [pageProgress, setPageProgress] = useState(0);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setScrollY(y);
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      setPageProgress(total > 0 ? y / total : 0);
      if (y < lastY.current - 6) setNavRevealed(true);
      else if (y > lastY.current + 6) setNavRevealed(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id;
            if (id) setActive(id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  return (
    <div className="sw-portfolio">
      <Navbar
        progress={pageProgress}
        active={active}
        revealed={navRevealed}
        brand={PORTFOLIO.name}
        dict={dict}
        locale={locale}
      />
      <HeroAct1 scrollY={scrollY} dict={dict} />
      <HeroAct2 dict={dict} />
      <AboutSection dict={dict} />
      <ExperienceSection dict={dict} />
      <SkillsSection dict={dict} />
      <ProjectsSection dict={dict} />
      <GithubSection data={github} dict={dict} />
      <EducationSection dict={dict} />
      <ContactSection dict={dict} locale={locale} />
    </div>
  );
}
