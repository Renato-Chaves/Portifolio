"use client";

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
