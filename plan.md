# Gamedev Portfolio — Continuation Plan

> Self-contained handoff doc. Read [DESIGN_BRIEF_GAMEDEV.md](DESIGN_BRIEF_GAMEDEV.md) and
> [MyGames.md](MyGames.md) first for hard requirements and game content.
> Phase 1 is built; this doc explains where things stand and what to build next.

---

## Status — where we are

**Phase 1 is implemented and TypeScript-clean.** The `[lang]/gamedev` route now
renders the new experience instead of the "coming soon" stub:

- **Hero (Cosmos)** — pinned 200vh canvas, 5-phase scroll-driven sequence
  (continuity flash → drift → planet approach → atmospheric entry → land).
- **Games Showcase (Portal Hub)** — sticky 500vh CSS-3D chamber. Camera
  rotates between 4 portals as the visitor scrolls; cursor parallax inside
  each portal; click → fullscreen FLIP-style takeover with screenshot
  gallery, description, engine badge, jam badge, Play Game CTA.
- **Dual HUD** — persistent minimap (top-right) + Skyrim-style transient
  quest popup that fires once on each section enter.

**Verification is blocked by a sandbox issue, not code.** `portifolio/.next/dev/`
is owned by root from a prior `sudo`-driven run, which prevents Turbopack
from acquiring its lockfile and the dev server exits immediately. Run
`sudo rm -rf portifolio/.next` to unblock; then `npm run dev` and visit
`http://localhost:3000/en` → Game Developer panel → warps into the cosmos.

Three real games are wired into [data.ts](portifolio/src/lib/data.ts)
(Restoration Frontier, Rushing to the Top, Plus and Minus) plus one sealed
`???` placeholder. URLs are left as `TODO` comments — paste them in when
ready and the buttons activate automatically.

---

## The vision (short version)

Multi-environment journey across distinct gaming worlds, unified by
cinematic CSS-3D depth and designed transitions:

```
Identity warp ──▶ Cosmos ──▶ Studio Room ──▶ Inventory dim ──▶ Trophy hall ──▶ Portal Hub ──▶ Bonfire
   (existing)     (Hero)     (About)        (Engines)        (Jams)         (Showcase)    (Contact)
```

Locked design language: pixel-only Phase 1 (voxel layer deferred to Phase 2
polish), Press Start 2P + VT323 fonts, sunset/synthwave palette tokens
(`--gd-*` in [globals.css](portifolio/src/app/globals.css#L12)),
high-motion ambient (everything bobs/blinks/twinkles), pixel-art frames
themed per game.

---

## Phase 1 — what shipped

### Routing & data

- [portifolio/src/app/[lang]/gamedev/page.tsx](portifolio/src/app/[lang]/gamedev/page.tsx)
  → renders `<GamedevExperience>`.
- [portifolio/src/lib/data.ts](portifolio/src/lib/data.ts)
  → `GameProject`, `GameEngine`, `PortalFrameStyle`, `AmbientParticle`,
  `GameJamEntry` types + `PORTFOLIO.gameProjects` array (3 real + 1 sealed).
- [portifolio/src/lib/dictionaries/en.ts](portifolio/src/lib/dictionaries/en.ts) /
  [pt.ts](portifolio/src/lib/dictionaries/pt.ts)
  → `dict.gamedev.{hero, portalHub, quests, minimap}` with full EN/PT parity.

### Components — all under `portifolio/src/components/gamedev/`

```
GamedevExperience.tsx          # orchestrator
GamedevScrollProvider.tsx      # Lenis + scroll context, prefers-reduced-motion
hero/
  CosmosHero.tsx               # pinned 200vh, 5-phase sequence
showcase/
  PortalHub.tsx                # CSS-3D chamber, station camera, deep-dive opener
  Portal.tsx                   # frame styles, parallax peek, ambient particles
  PortalUITiles.tsx            # title / engine / jam / click prompt floating tiles
  EngineBadge.tsx              # color-coded chip per Construct 2 / Fusion 2.5 / Unity 2D / 3D
  GameJamBadge.tsx             # wax-sealed achievement stamp
  GameDeepDive.tsx             # fullscreen takeover with FLIP-style entrance
  ScreenshotGallery.tsx        # prev/next + dot indicators + zoom
  PlayGameCTA.tsx              # primary play button + Itch/Gamejolt/Trailer links + iframe slot reserved
hud/
  Minimap.tsx                  # persistent top-right nav, IO-driven active state
  QuestToast.tsx               # "QUEST STARTED · X" toast, fires once per section per session
```

### Globals

- [portifolio/src/app/globals.css](portifolio/src/app/globals.css#L94)
  added `gdAmbientRise` keyframe used by particle stream in `Portal.tsx`.

### Dependencies added

- `lenis@1.3.23` (smooth scroll, scoped to GD route via component lifecycle)

---

## Locked decisions — do not re-litigate

These were converged through multiple rounds of brainstorming:

- **Multi-environment journey, not a single arcade aesthetic.**
- **Pixel-only in Phase 1.** Voxel layer is a Phase 2 polish pass. When voxel
  arrives, author in MagicaVoxel and export PNGs / sprite sheets — composite
  as 2D, no R3F runtime.
- **Showcase mechanic = Portal Hub Room.** World-map and other alternatives
  were considered and rejected. CSS-3D + parallax for depth, not R3F.
- **Camera = stations** (one project in focus per scroll segment) with smooth
  rotation between, not snap.
- **Portal frames are themed per game.** Stone arch / tech ring / wooden door /
  mystic gate / sealed-mystery for placeholders.
- **Persistent HUD is dual** — minimap (always visible) + Skyrim-style quest
  popup (transient on section enter).
- **Hero opens with continuity from IdentityStage** (pipe-mask hand-off).
- **Library set: framer-motion + Lenis.** No GSAP, no R3F.
- **Audio: out of scope** for now. Skipped in Phase 1, can revisit later.
- **Game descriptions: English-only string field.** UI labels are i18n'd via
  the dictionary; descriptions are single-string. Upgrade to `{ en, pt }` if
  PT translations become a priority.
- **3 highlighted games front-and-center; 3 secondary games deferred** to a
  future filterable view per [MyGames.md](MyGames.md).

---

## Open follow-ups / known issues

1. **`.next/dev` is root-owned** → `sudo rm -rf portifolio/.next` to unblock
   `npm run dev`. Probably caused by a previous `sudo`-driven run.
2. **Game URLs are unset.** Restoration Frontier, Rushing to the Top, and
   Plus and Minus all have `TODO` comments next to their slots in
   [data.ts](portifolio/src/lib/data.ts). The Play Game CTA disables itself
   gracefully until any of `htmlEmbedUrl`, `itchUrl`, `gamejoltUrl`,
   `trailerUrl` is filled in.
3. **`GamedevComingSoon.tsx` is dead code** — no longer rendered. Safe to
   delete after the new experience is verified live.
4. **Restoration Frontier has no screenshots yet.** Gallery shows the
   "Screenshot coming soon" fallback. Drop PNGs into `portifolio/public/gamedev/`
   and add their paths to `screenshots: [...]`.
5. **Logo / character sprite art** is optional per game. The deep-dive uses
   the game name as a tilted banner if `logoSrc` is unset; the portal renders
   a geometric placeholder if `characterSrc` is unset.

---

## Phase 2 — per-section plan

### Build order recommendation

1. Engines & Tools
2. Game Jams
3. Contact (closes the loop with cross-portfolio warp back to SW)
4. About
5. Secondary "More games" filterable view

Engines & Jams reuse existing badge components and can ship fast. Contact
unlocks the round-trip back to SW. About is content-heavy and benefits from
doing it after seeing the rhythm of the journey live.

### Section 2 — About (Studio Room)

**Environment:** Pixel-art studio interior. Desk, monitor with code on it,
scattered figurines (Restoration robot, Plus-and-Minus duo, etc.), maybe a
cat or coffee cup. Speech-bubble intro pops over a peeking pixel-art
portrait of you.

**Transition in:** zoom *into* the planet from the end of the Hero —
surface fills viewport, becomes the room. Re-uses the same scroll-tied
`useScroll` pattern as `CosmosHero`.

**Content:** the "About" copy from [en.ts](portifolio/src/lib/dictionaries/en.ts#L91)
already exists for the SW side — needs a gamedev-flavored variant (more
conversational, less corporate). New dict subtree
`dict.gamedev.about.{title, intro, paragraphs[]}`.

**Layout:** speech-bubble or "character-select"-style card on the left,
illustrated room on the right. Pixel art for the room can be a single PNG
asset (user authors) or assembled from CSS layers. Phase 1 doesn't have
this asset — fallback to a CSS-painted desk + monitor scene works.

**Section anchor for HUD:** `data-gd-section="about"` on the section root.

### Section 3 — Engines & Tools (Inventory Dimension)

**Environment:** HUD-overlay slides over the studio room — deliberately
breaks the diegetic floor and gives "menu open" feel. Dark backdrop with
slot grid, RPG inventory styling.

**Content:** 4 slots:
- Construct 2 — yellow brand color, glyph "C2"
- Clickteam Fusion 2.5 — dark blue, glyph "F"
- Unity 2D — black/white, glyph "U"
- Unity 3D — white/black, glyph "U" (inverted)

**Reuse:** [`EngineBadge`](portifolio/src/components/gamedev/showcase/EngineBadge.tsx)
already has the per-engine color/glyph mapping. Build a larger "loot slot"
variant that wraps it with hover spin/lift, tooltip with year-range and
notable shipped projects.

**Interaction:** hover lifts and rotates the item; click expands to a small
detail card showing what was built with that engine (cross-reference
`PORTFOLIO.gameProjects` filtered by `engine`).

**Layout:** 2x2 or 4x1 grid centered. New dict keys
`dict.gamedev.engines.{label, slots[].{years, blurb}}`.

### Section 4 — Game Jams (Trophy Hall)

**Environment:** horizontal scroll-jacked shelf or "quest log" scroll.

**Content (from [MyGames.md](MyGames.md)):**
- GameJaaj 5 (2021) — theme "Torres" — Rushing to the Top
- Game Jam 2021 — Plus and Minus
- Itch.io game jam (2020) — Looting in the Docks
- Itch.io weekend jam (2019) — Marines Quest

**Reuse:** [`GameJamBadge`](portifolio/src/components/gamedev/showcase/GameJamBadge.tsx)
scaled-up. Each medallion expands on click into a passport-stamp detail
panel with jam name, theme, year, your entry, placement, and a thumbnail.

**Data:** add a `gameJams` array to `PORTFOLIO` in
[data.ts](portifolio/src/lib/data.ts). Type:
```ts
type GameJamEntry = {
  slug: string;
  name: string;
  year: number;
  theme?: string;
  placement?: string;
  entry: { name: string; thumbnail?: string; url?: string };
};
```

**Section anchor:** `data-gd-section="jams"`.

### Section 5 — Contact (Sunset Bonfire)

**Environment:** palette dollies to dusk — orange/violet/dark-blue gradient,
camera pulls back to a small camp with a bonfire. Pixel ember particles
(reuse the `embers` ambient particle from
[`Portal.tsx`](portifolio/src/components/gamedev/showcase/Portal.tsx#L327)).

**Content:** Itch.io, Gamejolt, Twitter, Discord, email — each as a carved
wooden signpost or torch on a path. New dict subtree
`dict.gamedev.contact.{title, blurb, signposts[]}`.

**Cross-portfolio callout:** a literal warp-pipe back to Software. Reuse
the radial pipe-mask transition from
[`GamedevPanel.tsx`](portifolio/src/components/identity/GamedevPanel.tsx#L66-L76).
Click the pipe → `router.push("/[lang]/software")` with a brief warp
animation.

**Section anchor:** `data-gd-section="contact"`.

### Section 6 — Secondary "More games" view

**Surface:** small "MORE GAMES" board near the contact section that opens a
filterable modal. Filter by engine and/or by jam. Lighter card layout than
the Portal Hub — these are smaller projects.

**Content (from [MyGames.md](MyGames.md)):** Looting in the Docks, Marines
Quest, Platform — The Game.

**Data shape:** add a `secondary: boolean` flag to `GameProject` (or a
separate `secondaryGames: GameProject[]` array). Phase 1's gameProjects
array can stay as-is; the secondary view filters or merges accordingly.

**Reuse:** the `GameDeepDive` component is already isolated — feed
secondary games through the same fullscreen takeover for free.

---

## Reusable building blocks

When building Phase 2, reach for these first:

| Need | Existing | Path |
|------|----------|------|
| Smooth scroll + reduced-motion handling | `useGdScroll()` context | [GamedevScrollProvider.tsx](portifolio/src/components/gamedev/GamedevScrollProvider.tsx) |
| Section-local scroll-tied transforms | `useScroll({ target, offset })` from framer-motion | see [CosmosHero.tsx](portifolio/src/components/gamedev/hero/CosmosHero.tsx) for the pattern |
| Engine chip | `EngineBadge` | [EngineBadge.tsx](portifolio/src/components/gamedev/showcase/EngineBadge.tsx) |
| Jam medal | `GameJamBadge` | [GameJamBadge.tsx](portifolio/src/components/gamedev/showcase/GameJamBadge.tsx) |
| Fullscreen takeover (any expanded item) | `GameDeepDive` | [GameDeepDive.tsx](portifolio/src/components/gamedev/showcase/GameDeepDive.tsx) |
| Image carousel | `ScreenshotGallery` | [ScreenshotGallery.tsx](portifolio/src/components/gamedev/showcase/ScreenshotGallery.tsx) |
| Section enter trigger (HUD + quest toast) | IntersectionObserver with `rootMargin: "-50% 0px -50% 0px"` | see [Minimap.tsx](portifolio/src/components/gamedev/hud/Minimap.tsx#L24) and [QuestToast.tsx](portifolio/src/components/gamedev/hud/QuestToast.tsx#L29) |
| GD palette / fonts | `--gd-*` tokens | [globals.css](portifolio/src/app/globals.css#L12) |
| Ambient keyframes | `gdBob`, `gdBlink`, `gdTwinkle`, `gdSunPulse`, `gdAmbientRise` | [globals.css](portifolio/src/app/globals.css#L72-L98) |
| Warp-pipe transition | radial-mask gradient pattern | [GamedevPanel.tsx](portifolio/src/components/identity/GamedevPanel.tsx#L66) |

When adding a new section: wrap its root element with
`data-gd-section="<key>"` and `Minimap` / `QuestToast` will pick it up
automatically.

---

## Conventions & gotchas

### Next 16 specifics (per [AGENTS.md](portifolio/AGENTS.md))

- `params` in page components is async — `const { lang } = await params`.
- Page props typed via `PageProps<"/[lang]/section">` — see
  [page.tsx](portifolio/src/app/[lang]/gamedev/page.tsx) for the pattern.
- Read `node_modules/next/dist/docs/01-app/` before relying on patterns
  from older Next.js training data.

### i18n parity

`Dictionary = typeof en` — adding any new key to
[en.ts](portifolio/src/lib/dictionaries/en.ts) requires the same shape
in [pt.ts](portifolio/src/lib/dictionaries/pt.ts) or TypeScript fails.
Always update both in the same edit.

### Component patterns

- Every interactive `gamedev` component is `"use client"`. Server components
  only handle param parsing in `page.tsx`.
- Use framer-motion's `useTransform([mvA, mvB], ([a, b]) => …)` to compose
  scroll-tied motion values. All hooks must be called unconditionally at
  the top of the component (no conditional `useTransform` inside JSX).
- For pinned sections: outer container with explicit height (`200vh`,
  `500vh`, etc), inner `sticky top-0 h-screen`. `useScroll` with
  `target: ref, offset: ["start start", "end end"]` gives 0..1 across
  the whole pinned scroll range.
- Use `data-gd-section="<key>"` on every section root for HUD discovery.

### Reduced motion

`useGdScroll().reducedMotion` is `true` when the OS preference is set.
- `GamedevScrollProvider` skips Lenis init.
- Sections render a static fallback (see `CosmosHero.tsx` early-return).
- Particle / ambient animations should respect this flag too.

### Lenis

- Smooth wheel only; `syncTouch: false` so mobile keeps native momentum.
- `scrollToTarget` from `useGdScroll()` accepts a number, selector, or
  HTMLElement. Use it for HUD jumps (Minimap checkpoints, future warp
  buttons).

---

## Verification when picking back up

1. `sudo rm -rf portifolio/.next` to clear the root-owned cache.
2. `cd portifolio && npm run dev`.
3. Visit `http://localhost:3000/en` → click Game Developer panel.
4. Confirm the warp continuity hands off cleanly into the cosmos.
5. Scroll Hero — verify drift / approach / entry / land phases play.
6. Reach Portal Hub — chamber materializes, world rotates between portals
   on scroll, cursor parallax inside each.
7. Click Rushing to the Top or Plus and Minus — fullscreen deep-dive plays
   cleanly with screenshots, badges, and tags.
8. Switch to `/pt` — UI labels translate (descriptions stay English by design).
9. OS Reduce Motion — Lenis disabled, transitions snap, no layout breakage.
10. Mobile DevTools — vertical fallback for hub renders cleanly.

---

## Reference docs (in this workspace)

- [DESIGN_BRIEF_GAMEDEV.md](DESIGN_BRIEF_GAMEDEV.md) — hard requirements per
  section, must-not-break constraints.
- [MyGames.md](MyGames.md) — game content + which are highlighted vs
  secondary.
- [.claude/plans/let-s-brainstorm-some-ideas-breezy-beacon.md](.claude/plans/let-s-brainstorm-some-ideas-breezy-beacon.md)
  — full brainstorm history (rejected alternatives, why we converged here).
- [portifolio/CLAUDE.md](portifolio/CLAUDE.md) → [portifolio/AGENTS.md](portifolio/AGENTS.md)
  — Next 16 deviation notes.
