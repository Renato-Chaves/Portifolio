export const en = {
  identity: {
    statusLine: "02 IDENTITIES",
    sysStatus: "SYS.STATUS — ONLINE",
    nodes: "NODES · 142  ·  LAT 12ms",
    software: {
      badge: "IDENTITY_01 · ENGINEERING",
      title1: "Software",
      title2: "Developer",
      line1: "Systems, interfaces, and the quiet craft of making them reliable.",
      line2Before: "Scroll to enter, or press",
      line2After: ".",
      enterPrefix: "$",
      enterCmd: "./enter",
      enterArg: "—software",
      enterAria: "Enter Software Developer portfolio",
      statsUptime: "UPTIME",
      statsCommits: "COMMITS/WK",
      statsFocus: "FOCUS",
      statsFocusValue: "DEEP",
    },
    gamedev: {
      title1: "GAME",
      title2: "DEV",
      title3: "WORLD",
      tagline: "A COLORFUL WORLD OF TINY MACHINES",
      start: "▶ PRESS START",
      navPrev: "◀",
      navNext: "▶",
      worldLabel: "WORLD 2-1",
    },
    panelLabels: {
      software: "Software Developer",
      gamedev: "Game Developer",
    },
  },

  gamedev: {
    player: "> PLAYER 02 <",
    comingLine1: "COMING",
    comingLine2: "SOON",
    body1: "THE GAME DEVELOPER PORTFOLIO IS UNDER CONSTRUCTION.",
    body2Prefix: "CHECK BACK SOON FOR TINY MACHINES",
    back: "◀ PRESS B · BACK",
  },

  nav: {
    brandSlug: "/ software-dev",
    online: "ONLINE",
    back: "SELECT",
    backAria: "Back to identity selection",
    sections: {
      hero: "Hero",
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      github: "GitHub",
      education: "Education",
      contact: "Contact",
    },
    langSwitch: {
      en: "EN",
      pt: "PT",
    },
  },

  hero: {
    badge: "IDENTITY_01 · ENGINEERING",
    role: "ROLE",
    based: "BASED",
    focus: "FOCUS",
    roleValue: "Software Developer",
    locationValue: "São Paulo, Brasil",
    focusValue: "Tech & AI",
    sysInit: "SYS.01",
    sysInitValue: "INIT",
    actKey: "SEC.01_HERO",
    actValue: "ACT I / III",
    scroll: "Scroll",
  },

  techAct: {
    sectionLabel: "SEC.01 · ACT II",
    titleLine1: "Tech",
    titleLine2: "Stack.",
    description: "Tools I reach for first. Hold the scroll — they move through you.",
    traversal: "TECH.TRAVERSAL",
  },

  about: {
    sectionLabel: "SEC.02 · ABOUT ME",
    titlePlain: "Curious by default",
    titleEm: ", pragmatic by habit",
    portraitTag: "PORTRAIT.IMG",
    h3: "Tech and AI enthusiast — always looking for ways to sharpen what I can build.",
    paragraphs: [
      "Most of what I know came from building, breaking, and rebuilding until the pieces made sense. At my day job I lead a two-person team at a maritime-ops company where the dev function was new — so the stack, from server provisioning and Docker all the way to API security and deploys, was built and is maintained from scratch. It's the kind of environment that forces you to understand every layer, and I've come to love that.",
      "Outside of work, I chase the same instinct with side projects. Bitewise pairs a custom-trained YOLOv9 model with a typed React Native client — the phone captures, a Node backend offloads inference to a GPU workstation, and nutrition data comes back per portion. KotobaGo is a local-first Japanese tutor that runs Ollama under the hood to generate stories calibrated to your exact vocabulary. The throughline is AI applied pragmatically — enough to make a product feel smart without handing it the keys.",
    ],
    sig: {
      focus: { label: "FOCUS", value: "AI-assisted products, full-stack" },
      habits: { label: "HABITS", value: "Ship small, own the whole stack" },
      learning: { label: "LEARNING", value: "Applied ML services, DDD in Go" },
    },
  },

  experience: {
    sectionLabel: "SEC.03 · EXPERIENCE",
    titlePlain: "Where the",
    titleEm: "experience takes shape",
    dur: "~2 yrs",
    jobs: [
      {
        role: "Lead Software Developer",
        at: "Santos, SP · On-site",
        desc: "Lead dev in a two-person team — with no prior in-house dev team, every piece of the stack was built and is maintained from scratch. Own server provisioning, installation, Docker configuration, and security hardening; handle Cloudflare, domain management, and API-security design. Sit in with upper management to scope problems and deliver solutions end-to-end — covering design, performance, architecture, and maintainability — with clean-code principles throughout (the latest project adopts Domain-Driven Design). Mentor a junior developer on best practices and run task delivery through GitHub.",
      },
    ],
  },

  skills: {
    sectionLabel: "SEC.04 · SKILLS",
    titlePlain: "The",
    titleEm: "full picture",
    categories: {
      Frontend: "Frontend",
      Backend: "Backend",
      Mobile: "Mobile",
      "Infra & DevOps": "Infra & DevOps",
      Tooling: "Tooling",
      Craft: "Craft",
    } as Record<string, string>,
  },

  projects: {
    sectionLabel: "PROJECTS",
    railLabelLocked: "SCROLL · LOCKED",
    projectPrefix: "PROJECT",
    ghBtn: "GitHub Repo",
    ledes: {
      Bitewise:
        "A cross-platform mobile app that recognizes food from a photo and tracks nutrition. The React Native client captures the image and hands it to a Node backend, which offloads inference to a custom-trained YOLOv9 model running on a GPU workstation and returns normalized nutrition data per portion.",
      KotobaGo:
        "Local-first Japanese learning app built around the comprehensible-input method (Krashen's i+1). Generates stories calibrated to your exact vocabulary, with a non-intrusive dictionary and built-in spaced repetition. Next.js front-end, FastAPI back-end, Ollama for local LLM inference, MeCab/Fugashi for tokenization — all wired up via Docker Compose.",
      BeamMaps:
        "A desktop route-planner inspired by Google Maps, built in Python with an interactive canvas UI. Lets you pick origin and destination on a city graph and watch either Greedy best-first or A* traverse it in real time — comparing explored paths, totals, and heuristics side by side.",
      "weather-app":
        "A modern mobile weather client in React Native + Expo. Pulls real-time conditions from Open-Meteo — temperature, humidity, wind, UV index, visibility — and renders them with a glassmorphism UI that reacts to day/night state and weather type.",
    } as Record<string, string>,
  },

  github: {
    sectionLabel: "SEC.05 · ACTIVITY",
    titlePlain: "On the",
    titleEm: "commit log",
    blurbPrefix: "Pulled from github.com/",
    blurbSuffix: ". Numbers move; the habits stay.",
    cardLangs: "LANGUAGES · 12mo",
    cardContrib: "CONTRIBUTIONS · 52w",
    cardPinned: "PINNED",
    live: "LIVE",
    commits: "Commits",
    prs: "Pull requests",
    stars: "Stars earned",
    months: ["JAN", "APR", "JUL", "OCT", "DEC"],
  },

  education: {
    sectionLabel: "SEC.07 · LEARN",
    titleEdu: "Education",
    titleAmp: " & ",
    titleCerts: "certifications",
    titleStudy: "& study",
    certsHeading: "Certifications",
    entries: [
      {
        deg: "B.Sc. Computer Science",
        note: "Graduated December 2025. Coursework spanned systems, databases, networking, and software engineering fundamentals.",
      },
    ],
    certs: [
      {
        name: "Cambridge English C1 Advanced (CAE)",
        issuer: "Cambridge Assessment English",
      },
    ],
  },

  contact: {
    sectionLabel: "SEC.08 · HANDSHAKE",
    titleLine1: "Let's build",
    titleEm: "something real.",
    crossLabel: "PARALLEL IDENTITY · 02",
    crossH4Plain: "Also building in",
    crossH4Em: "another world.",
    crossP:
      "Colorful pixels, small machines, and games that don't take themselves too seriously.",
    crossBtn: "Visit Game Developer",
    footerBuilt: "BUILT WITH NEXT.JS · CANVAS · INTENT",
    footerIdentity: "IDENTITY_01 · ENGINEERING",
  },
};

export type Dictionary = typeof en;
