"use client";

import Link from "next/link";
import { PORTFOLIO } from "@/lib/data";
import type { Dictionary, Locale } from "@/lib/i18n";
import { GamedevScrollProvider } from "./GamedevScrollProvider";
import { CosmosHero } from "./hero/CosmosHero";
import { StudioRoom } from "./about/StudioRoom";
import { EnginesInventory } from "./engines/EnginesInventory";
import { GameJamsHall } from "./jams/GameJamsHall";
import { PortalHub } from "./showcase/PortalHub";
import { ContactBonfire } from "./contact/ContactBonfire";
import { Minimap } from "./hud/Minimap";
import { QuestToast } from "./hud/QuestToast";

export function GamedevExperience({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <GamedevScrollProvider>
      <main
        style={{
          position: "relative",
          color: "var(--gd-ink)",
          overflowX: "clip",
        }}
      >
        <Link
          href={`/${locale}`}
          aria-label="Back to identity selection"
          style={{
            position: "fixed",
            top: 18,
            left: 18,
            zIndex: 60,
            padding: "10px 14px",
            fontFamily: "var(--font-press-start), monospace",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: "var(--gd-ink)",
            background: "rgba(0,0,0,0.55)",
            border: "2px solid var(--gd-accent)",
            textShadow: "2px 2px 0 #3a0f5e",
            boxShadow: "3px 3px 0 #3a0f5e",
            textDecoration: "none",
          }}
        >
          {dict.gamedev.back}
        </Link>
        <CosmosHero dict={dict} />
        <StudioRoom dict={dict} />
        <EnginesInventory dict={dict} games={PORTFOLIO.gameProjects} />
        <GameJamsHall dict={dict} jams={PORTFOLIO.gameJams} />
        <PortalHub dict={dict} games={PORTFOLIO.gameProjects} />
        <ContactBonfire dict={dict} locale={locale} />
        <Minimap dict={dict} />
        <QuestToast dict={dict} />
      </main>
    </GamedevScrollProvider>
  );
}
