# Gamedev Portfolio — Design Overview for Polish Pass

## Project & identity context

This is one half of a dual-identity portfolio. The owner is Renato Chaves Nunes — software developer by day, game developer on the side. The two identities share the same domain but use completely separate visual languages and are accessed via an Identity Selection screen. The SW side (already shipped) is professional, cool-toned, geometric, and restrained. The GD side must be the opposite: colorful, high-motion, playful, full of personality. They must not bleed into each other visually.

The visitor enters the GD portfolio by "warping through a pipe" from the Identity Selection screen — an existing radial-mask animation that collapses a portal down to a point. The GD page must feel like a natural continuation of that warp, opening up into a new universe.

---

## The governing metaphor: a cosmic journey between gaming worlds

The entire page is structured as a journey. Each section is a different "world" the visitor travels through. Scrolling is not reading — it is moving. Every section must feel like landing somewhere new, and every transition between sections must feel like a different kind of travel.

The world order:
1. **Cosmos** (Hero) — deep space, drifting, cinematic scale
2. **Studio Room** (About) — warm pixel-art interior, personal
3. **Inventory Dimension** (Engines & Tools) — HUD overlay, RPG-loot feel
4. **Trophy Hall** (Game Jams) — horizontal shelf of achievements
5. **Portal Hub** (Games Showcase) — CSS-3D chamber with portals into each game's world
6. **Sunset Bonfire** (Contact) — dusk, warm, closing campfire, cross-portfolio exit

The transitions are designed to each have their own physical vocabulary:
- Cosmos → Studio Room: camera zooms *into* a planet surface that becomes a room
- Studio Room → Inventory: an HUD inventory panel slides over the room — the room dims behind glass
- Inventory → Trophy Hall: horizontal scroll-jack across a trophy shelf
- Trophy Hall → Portal Hub: screen flash (teleport), the 3D chamber materializes around you
- Portal Hub → Bonfire: palette shifts to dusk, camera dolly to a bonfire

---

## Current implementation state

All six sections plus the dual HUD are fully implemented and TypeScript-clean. The dev server is temporarily blocked by a root-owned `.next` cache that requires `sudo rm -rf portifolio/.next` to clear — the code itself is complete.

```
portifolio/src/components/gamedev/
  GamedevExperience.tsx              ← orchestrator (all sections + HUD)
  GamedevScrollProvider.tsx          ← Lenis smooth scroll + scroll context
  hero/CosmosHero.tsx                ← Hero: 300vh pinned, 5-phase sequence
  about/StudioRoom.tsx               ← About: pixel desk scene + speech bubble
  engines/EnginesInventory.tsx       ← Engines: RPG inventory grid/split view
  jams/GameJamsHall.tsx              ← Jams: passport-stamp cards
  showcase/PortalHub.tsx             ← Showcase: CSS-3D chamber + camera stations
  showcase/Portal.tsx                ← individual portal (frame + peek + particles)
  showcase/PortalUITiles.tsx         ← floating UI tiles around active portal
  showcase/EngineBadge.tsx           ← engine chip component
  showcase/GameJamBadge.tsx          ← wax-seal jam medal
  showcase/GameDeepDive.tsx          ← fullscreen game takeover
  showcase/ScreenshotGallery.tsx     ← image carousel
  showcase/PlayGameCTA.tsx           ← play button + external links
  hud/Minimap.tsx                    ← persistent top-right nav widget
  hud/QuestToast.tsx                 ← Skyrim-style section-enter toast
```

---

## Color tokens & palette

All GD-specific palette values live in CSS custom properties in `globals.css`:

```css
--gd-bg:       #2a1246   (deep purple — base of the cosmos)
--gd-bg-2:     #ff5a7c   (hot pink — warm accents)
--gd-ink:      #fff7dc   (warm cream — all text)
--gd-accent:   #ffd23f   (golden yellow — primary interactive color)
--gd-accent-2: #5cffb7   (mint green — secondary accent, XP-bar / badges)
--gd-accent-3: #ff6b9e   (pink — danger / hearts / close buttons)
```

The Hero background gradient: `#050018 → #1a0530 → #2a1246 → #5b1d7a`. Atmospheric scroll entry applies `hue-rotate(35deg) brightness(0.7) saturate(1.35)` to shift the scene palette toward green as the planet surface approaches.

Each game has its own per-game `palette: { primary, accent, bg }`:
- **Restoration Frontier**: `#5cffb7` / `#67b4ff` / `#0e2030` — clean sci-fi greens/cyan
- **Rushing to the Top**: `#ffd23f` / `#ff6b9e` / `#2a1015` — urgent yellows/reds
- **Plus and Minus**: `#c48eff` / `#5cffb7` / `#2a0a48` — violet/lime duality

---

## Typography system

Two typefaces carry the entire GD side:
- **Press Start 2P** — all major headings, HUD labels, section titles, badges. Strict small sizes only (8–14px). Always rendered with `imageRendering: pixelated`.
- **VT323** — body text, descriptions, subtitles, subheadings. Larger sizes (18–28px). More readable at size.

Text always carries `textShadow` stacks: `4px 4px 0 var(--gd-accent-3), 8px 8px 0 #3a0f5e, 12px 12px 0 rgba(0,0,0,0.3)` for display type — gives the pixel-font a raised, printed-on-screen feel.

---

## Animation system & keyframes

Ambient life is required everywhere. Nothing is ever fully static. Keyframes in `globals.css`:

- **`gdBob`**: `50% { transform: translateY(-4px); }` — 2–2.5s, all floating sprites/characters
- **`gdBlink`**: `50% { opacity: 0; }` — 0.9–1.4s steps(2), blinking cursors and interactive cues
- **`gdTwinkle`**: `50% { opacity: 0.5; }` — stars and distant sparkles
- **`gdSunPulse`**: `50% { scale: 1.08 }` — glowing center elements, 3–4s
- **`gdArrow`**: `50% { transform: translateX(4px); }` — directional arrows
- **`gdAmbientRise`**: opacity 0→0.9→0, translateY 0→-220px — particle streams rising from portals and the bonfire
- **`gdScroll`**: `50% { transform: translateY(6px); }` — scroll hint indicators

All scroll-tied animations use framer-motion `useScroll + useTransform` with `willChange: "transform"` or `willChange: "filter"` set explicitly. Springs use `{ stiffness: 80–100, damping: 18, mass: 0.6–0.9 }` for soft, game-feel response.

---

## Section 1 — Hero (CosmosHero.tsx)

The Hero is a `300vh` outer container with a sticky `100vh` inner panel. `effectiveProgress` (0..1) is a composite of:
1. An auto-play intro animation (0 → 0.2 on mount, eased over 2.2s) — cinematic "boot-up" before any scroll
2. Scroll progress taking over once the visitor moves

The five phases mapped against `effectiveProgress`:
- **0 – 0.05**: Continuity in — pipe-mask radial gradient collapses outward, revealing cosmos
- **0.05 – 0.30**: Drift — three parallax star layers (sparse/medium/dense) at different Y speeds, title fades in
- **0.30 – 0.70**: Approach — planet scales 0.18× → 1.4×, eases to viewport center; stars motion-blur
- **0.70 – 0.90**: Atmospheric entry — CSS filter ramp shifts palette (hue-rotate + brightness + saturate) toward green/warm
- **0.90 – 1.00**: Land — green-grass ground element rises from bottom, hero unpins

The planet is pure CSS: `radial-gradient(circle at 35% 30%, #ffd23f 0%, #ff6b9e 45%, #5b1d7a 80%)` with two-layer box-shadow bloom. No WebGL.

The title ("GAME / DEV / WORLD") fades in during drift, fades out before atmospheric entry.

**Polish opportunities:**
- Planetary surface texture could rotate into view as scale increases
- Atmospheric entry could add a chromatic aberration flash (R/G/B channel split on the title)
- The hero-to-about transition (ground rises → room) currently cuts; a true zoom-into-the-surface moment would sell the journey

---

## Section 2 — Studio Room (StudioRoom.tsx)

**Environment:** Deep forest-to-purple gradient background (`#0a2c12 → #1a4528 → #2a3458 → #1a0530`). Stars twinkling at the top (remnant of cosmos). Scanline overlay.

**Layout:** Two-column grid. Left: `CharacterCard` — a pixel-art desk scene (monitor with blinking code lines, a bobbing robot figurine, a collectibles box, a tiny night sky poster). Right: speech-bubble styled box with intro text and game-dev stats grid (CLASS / LV / ENGINES / JAMS).

**Animation:** Both columns use framer-motion `whileInView` fade/slide-in on scroll. The character card's figurine bobs with `gdBob`. The monitor's top line blinks with `gdBlink`.

**Polish opportunities:**
- The scene background transitions from hero's `#1a0530` into `#0a2c12` with a gradient fade at the top — the section-to-section connection feels abrupt rather than like zooming into the planet
- The pixel desk scene is CSS-only and minimal; it could be much richer with layered elements: bookshelves, game boxes stacked, a coffee cup, a Restoration Frontier concept sketch on the wall
- The character card has a "▢ STUDIO 02-A · ● REC" header that isn't used elsewhere; it could animate a recording indicator blinking

---

## Section 3 — Engines Inventory (EnginesInventory.tsx)

**Environment:** Dark space feel — `radial-gradient(ellipse at center, #1a0530 0%, #050018 70%)` with a dim gold grid overlay (RPG inventory feel). Scanlines at 18% opacity.

**State machine:** Two views animated with `AnimatePresence`:
- **Grid view** (default): 4 engine slots + 1 "ALL GAMES" card in auto-fit grid. Each slot shows the engine logo, name, years, blurb, and shipped games. Hover: `y: -8, rotate: -1.2`, glow box-shadow.
- **Split view** (after click): 260px left sidebar (compact engine list) + right panel. Right panel shows either engine detail card + game cards, or an "all games" panel with a sorted list.

**Engine visuals:** Real SVGs via `simple-icons` for Unity and Construct 3; glyph fallback "F" for Clickteam. Per-engine color maps (Construct 2 = yellow, Clickteam = dark blue, Unity 2D = black, Unity 3D = cream inverted).

**Polish opportunities:**
- The inventory "HUD overlay" metaphor isn't physically expressed — the section just sits in space. The design intent was for the room (Studio) to dim behind a dark glass overlay as the inventory slides in. That physical relationship is lost.
- The engine logo icons are small (48px boxes). A larger, more dramatic "item card" treatment on hover (3D tilt with `perspective`) would feel more like holding an item in a game inventory.
- The split view's left sidebar could display a visual "progress bar" (years of use) per engine.

---

## Section 4 — Game Jams Hall (GameJamsHall.tsx)

**Environment:** Dark purple to deep purple gradient (`#050018 → #2a0a48 → #3a0f5e`) with a warm golden radial glow from above (the trophy display light). Bottom fade to dark.

**Content:** 4 jam entries displayed as tilted passport-stamp cards:
- GameJaaj 5 (2021) — Rushing to the Top — theme "Torres" — thumbnail present
- GMTK Game Jam 2021 — Plus and Minus — thumbnail present — Itch.io link
- Itch.io Game Jam 2020 — Looting in the Docks — thumbnail present
- Itch.io Weekend Jam 2019 — Marines Quest — no thumbnail

**Card design:** Cream/parchment background (`#fff7dc → #f3d6a2`), dark border, drop shadow. Tilted ±1.2–1.4° at rest, animate to 0° on hover. Contains: "★ COMPLETED" label, jam name, thumbnail (or placeholder), theme + entry labels, placement if any, "VIEW JAM PAGE" link button.

**Polish opportunities:**
- Cards currently animate in with `whileInView` but the "trophy hall" metaphor (horizontal scroll-jack) isn't implemented — it's a plain vertical grid. A scroll-locked horizontal pan would make this section distinct.
- The year stamp circle (dashed border, rotated -12°) is subtle; a more dramatic wax-seal treatment would match the GameJamBadge aesthetic used in the Portal Hub.
- The thumbnail fallback ("▢ NO IMAGE") is plain; it could be a decorative hatched placeholder with "NO SCREENSHOT" in pixel font.

---

## Section 5 — Portal Hub (PortalHub.tsx + Portal.tsx)

This is the showcase centerpiece — the most technically complex section.

### Chamber geometry

A perspective container (`perspective: 1400px`) holds a zero-size anchor at screen center. From it, 3D content renders outward:
- **Floor**: 1600×1600px plane, `rotateX(80deg) translateZ(-280px)` — pixel-mosaic tile receding to vanishing point
- **Ceiling**: mirrored, dark with ambient particles
- **Center rune**: glowing circle at floor center, `gdSunPulse` animation
- **4 portals**: placed at 0°/90°/180°/270° wall angles, `translateZ(-520px)` — square chamber

### Station camera model

`worldRotY` is scroll-driven:
```
progress [0, 0.05, 0.25, 0.50, 0.75, 0.95] →
rotY    [-15°, 0°, -90°, -180°, -270°, -270°]
```
0–5%: establishing shot, all portals visible at angle.
5–25%: Portal 0 dead-center (Restoration Frontier).
25–50%: Portal 1 (Rushing to the Top).
50–75%: Portal 2 (Plus and Minus).
75–95%: Portal 3 (sealed ???).

`worldRotX` adds a -2° → 0° tilt on entry and 0° → 6° tilt on exit. `worldTz` dollies -160 → 60px (zoom in on section entry).

A white/gold radial flash fires at section entry (0–6% progress) to simulate the teleport-in.

**Cursor parallax:** `pointermove` → springs → three magnitudes (6/14/24px) for each parallax layer inside every portal.

### Portal anatomy

5 frame styles (all pure CSS):
- `stone-arch`: stone-texture gradient, `clipPath polygon` arch, corner blocks
- `tech-ring`: dark gradient, `box-shadow` glow ring, L-bracket corner accents
- `wooden-door`: plank texture gradient, iron rivet circles on edges
- `mystic-gate`: purple/gold diagonal gradient, diamond ornament at top center
- `sealed`: dark crosshatch, diagonal stripes

Inner peek: 3-layer parallax stack (sky gradient / mountain silhouette SVG / ground + character), moves at 6/14/24px per cursor unit.

Ambient particles: 12 spans per portal, `gdAmbientRise` at 3–4.4s staggered delays. Active portal = full opacity; inactive = 0.4 opacity.

### Portal UI tiles overlay

When a portal is in focus, four floating tiles appear around it:
- Title card (top-left, rotated -3°) — game name, game's primary color
- Engine badge (top-right, rotated +3°) — color-coded chip
- Game jam badge (bottom-right, rotated -2°) — wax-seal medal, conditional on `game.gameJam`
- Click prompt (bottom-center) — `gdBlink` animation

All four use staggered framer-motion entrance delays (0.05 / 0.12 / 0.18 / 0.24s).

### Engine badge

Inline-flex chip with glyph square and label. Color maps:
- Construct 2: yellow `#ffd23f` bg, dark text, "C2" glyph
- Clickteam Fusion 2.5: dark blue `#1d4cff` bg, cream text, "F"
- Unity 2D: black bg, cream text, "U"
- Unity 3D: cream bg, black text, "U" (inverted)

### Game Jam badge

Wax-seal style: `#6e1f3f → #ff6b9e` gradient bg, circular gold medallion on left, jam name + year/placement on right.

### Fullscreen deep dive (GameDeepDive.tsx)

Fixed overlay, framer-motion from `scale: 0.7, opacity: 0, filter: blur(8px)` to `scale: 1, opacity: 1, filter: blur(0)` via spring (stiffness: 130, damping: 22).

Grid layout `1.4fr / 1fr`:
- Left: `ScreenshotGallery` with prev/next, dot indicators, `AnimatePresence` fade between images
- Right: description (VT323, 20px), engine badge, jam badge, tags (chips with `border: 1px solid game.palette.primary`), `PlayGameCTA`

Background: `radial-gradient(circle at 50%, ${game.palette.primary}22, ${game.palette.bg} 65%, #050018 100%)` — each game feels like a different universe.

Peeking character (fixed bottom-left, 110px) and `gd-scanlines` overlay keep the world alive inside the takeover.

**Polish opportunities:**
- Closing animation simply reverses entrance; a FLIP from the portal's bounding box would be more cinematic
- The deep-dive background is static; adding the portal's ambient particle type (embers / sparkles / coins) drifting through the fullscreen background would make each world feel alive
- The screenshot gallery hover-zoom is wired but the zoom effect is minimal

---

## Section 6 — Contact Bonfire (ContactBonfire.tsx)

**Environment:** Portal-exit overlook at the edge of the world. The top starts in the Portal Hub's `#050018`, then opens into a dark dusk gradient with teal portal sparks, a fading portal ring at 18% from top, distant silhouettes of earlier journey beats, and a pixel cliff ledge under the campfire. The header includes the final arrival line: "YOU MADE IT TO THE EDGE OF THE WORLD."

**Campfire:** CSS-only pixel bonfire at bottom center — 4 log elements at angles, a flame `radial-gradient` with `gdSunPulse 0.9s` (fast flicker), a `repeating-linear-gradient` ring for heat shimmer. 28 ember particles (`gdAmbientRise`) cluster around x: 36–64% bottom, themed colors `[#ffd23f, #ff9567, #ff6b9e, #fff7dc]`.

**Signposts:** 4 link cards in auto-fit grid (Itch.io, Gamejolt, Steam, email). Each card is styled as a directional wooden trail sign with a left support post, arrow cap, individual accent color, label in Press Start, and value in VT323. `whileHover: { y: -6, rotate: ±1 }` spring animation.

**Cross-portfolio callout:** Dark box with teal/purple gradient border. Circular "portal" icon on left (blue radial gradient, `gdSunPulse`, ▶ glyph). Warp button (`#5cffb7` bg) triggers a radial-mask warp animation via `router.push` to the SW route.

**Polish opportunities:**
- The gradient background transitions into the Portal Hub's `#050018` at the top — but the transition is a hard gradient change. A more physically coherent connection (embers from the bonfire drifting upward from the previous section) would reinforce the sunset/travel feel.
- The campfire is functional but the fire element could use more layering: colored inner flame, outer glow, an ash ring at the base.
- The signpost cards are functional but not visually "in the world" — carved wooden post textures, directional arrow details, or rope decorations would make them feel more like actual signs on a trail.

---

## Dual HUD system

### Minimap (Minimap.tsx) — fixed top-right

172px-wide pixel-art frame (`border: 2px solid var(--gd-accent)`, dark background, `box-shadow: 4px 4px 0`) with a vertical list of 6 section checkpoints. IntersectionObserver (`rootMargin: "-50% 0px -50% 0px"`) marks the section whose center is at the viewport midpoint.

Active checkpoint: `background: var(--gd-accent)`, rotated 45° (diamond shape), glow `box-shadow`. Inactive: plain border square. Unavailable (section not yet visible): 0.35 opacity, `cursor: not-allowed`.

Click → `scrollToTarget(el)` via Lenis.

**Polish opportunities:**
- Currently a text list of section names. The design intent was a pixel-art map sketch with a traveling player sprite dot. The current version is functional but breaks the "everything feels like a game" rule.
- Section labels could be small icons instead of text (star for cosmos, house for studio, etc.)

### Quest Toast (QuestToast.tsx) — fixed top-center

Fires once per session per section on entry. Slide-in from `y: -32, scale: 0.96`, auto-dismisses after 3.2s.
- Title line: "QUEST STARTED · ENGINES & TOOLS" (Press Start 2P, 10px, `--gd-accent`)
- Body line: "Examine the tools on display" (VT323, 18px, cream)

Uses a Set ref to suppress re-triggers. `role="status" aria-live="polite"` for accessibility.

---

## Integration and coherence issues

**Backgrounds are currently islands.** Each section has its own background gradient with no visual bridge to the next. The cosmic journey metaphor needs connective tissue: gradient blending at section boundaries, overlapping particle layers, or explicit travel animations between each world.

**The HUD Minimap needs a visual upgrade** — from a text list to a small pixel-art map with a traveling player dot. The current version is functional but not "game" enough for what the page promises.

**Particle systems are limited to portal interiors and the bonfire.** Ambient particles should spill across section edges — stars drifting from Hero into the top of Studio Room, embers from Bonfire rising into the footer.

**The Portal Hub teleport-in flash is too abrupt.** It should have a ripple/shockwave expanding from center before the flash clears and the chamber is revealed.

**Atmospheric entry in Hero is underused.** The palette shift (hue-rotate + brightness) is present but subtle. A chromatic aberration moment (CSS R/G/B channel split text-shadow, or a three-layer color overlay composite) at the entry point would sell "entering atmosphere."

**Portal deep-dives need game-world ambience.** Currently the takeover background is a static gradient. The portal's ambient particle type (embers for Rushing to the Top, sparkles for Plus and Minus) should drift through the fullscreen takeover.

**Trophy Hall lacks the horizontal mechanic.** The design intent was a scroll-jacked horizontal pan across a trophy shelf. The current implementation is a vertical auto-fit grid — physically coherent with the page but not distinct.

**Section-to-section transitions are plain vertical.** Between Hero's 300vh, Studio's ~100vh, Engines' ~100vh, Jams' ~100vh, Portal Hub's 500vh, and Contact's ~100vh, the journey needs horizontal moments (Jams), overlay moments (Engines), and scale moments (Hero approach) to break the vertical monotony as designed.

---

## Assets pending from the developer

- **Restoration Frontier screenshots** — nothing in `/public/gamedev/` yet; gallery shows "Screenshot coming soon" fallback
- **Game URLs** — Restoration Frontier (YouTube trailer), Rushing to the Top (Gamejolt), Plus and Minus (Itch.io) — all `TODO` in `data.ts`; Play Game CTA disables itself gracefully until set
- **Pixel character sprites** per game for portal peeks and deep-dive peeking character — currently geometric fallback boxes
- **Game logos** as PNGs for tilted-logo treatment in GameDeepDive — currently uses game name text as the banner

---

## Tech constraints for any design polish

- **No R3F / Three.js in Phase 1.** CSS 3D transforms only for 3D depth.
- **No GSAP.** Framer-motion + Lenis only.
- **All new i18n keys must be added to both `en.ts` and `pt.ts`** in the same edit — `Dictionary = typeof en` enforces this at compile time.
- **All interactive components are `"use client"`.** Server components only handle param parsing in `page.tsx`.
- **Motion hooks are unconditional.** No `useTransform` / `useMotionValue` inside conditionals or JSX — must be at component top level.
- **`useGdScroll().reducedMotion`** must be respected — sections provide a static fallback when `true`.
- **Lenis `scrollToTarget`** is the right API for programmatic jumps (minimap clicks, warp buttons), not `window.scrollTo`.
