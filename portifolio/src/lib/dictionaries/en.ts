export const en = {
  identity: {
    statusLine: "02 IDENTITIES",
    sysStatus: "SYS.STATUS — ONLINE",
    nodes: "REPOS · +15  ·  YRS 2",
    software: {
      badge: "IDENTITY_01 · ENGINEERING",
      title1: "Software",
      title2: "Engineer",
      line1: "Building full-stack systems from scratch to production.",
      line2Before: "Scroll to enter, or press",
      line2After: ".",
      enterPrefix: "$",
      enterCmd: "./enter",
      enterArg: "—software",
      enterAria: "Enter Software Engineer portfolio",
      statsCuriosity: "CURIOSITY",
      statsCuriosityValue: "ALWAYS",
      statsCraft: "CRAFT",
      statsCraftValue: "CAREFUL",
      statsDesign: "DESIGN",
      statsDesignValue: "INTENT",
    },
    gamedev: {
      title1: "GAME",
      title2: "DEV",
      title3: "WORLD",
      tagline: "WHERE PROTOTYPES COME TO LIFE",
      start: "▶ PRESS START",
      navPrev: "◀",
      navNext: "▶",
      worldLabel: "WORLD 1-1",
    },
    panelLabels: {
      software: "Software Engineer",
      gamedev: "Game Developer",
    },
  },

  gamedev: {
    player: "> PLAYER 01 <",
    back: "◀ BACK",

    hero: {
      title1: "GAME",
      title2: "DEV",
      title3: "WORLD",
      tagline: "PIXELS · WORLDS · PROTOTYPES",
      scrollHint: "SCROLL TO START",
    },

    portalHub: {
      sectionLabel: "GAMES SHOWCASE",
      clickToEnter: "CLICK TO ENTER",
      placeholderName: "???",
      placeholderHint: "COMING SOON",
      sealedHint: "INSERT A COIN",
      closeLabel: "Close",
      backLabel: "Back",
      playGame: "▶ PLAY GAME",
      visitItch: "ITCH.IO",
      visitGamejolt: "GAMEJOLT",
      watchTrailer: "TRAILER",
      viewSource: "VIEW SOURCE",
      engineLabel: "ENGINE",
      jamLabel: "GAME JAM",
      tagsLabel: "TAGS",
      noDescription: "More details coming soon.",
      completedLabel: "★ COMPLETED",
      noImageLabel: "▢ NO IMAGE",
      screenshotComingSoon: "Screenshot coming soon",
    },

    quests: {
      hero: { title: "QUEST STARTED · INTRO", body: "Drift through the cosmos" },
      about: { title: "QUEST STARTED · ABOUT", body: "Step into the studio" },
      engines: {
        title: "QUEST STARTED · ENGINES & TOOLS",
        body: "Examine the tools on display",
      },
      jams: {
        title: "QUEST STARTED · GAME JAMS",
        body: "Inspect the trophy hall",
      },
      showcase: {
        title: "QUEST STARTED · SHOWCASE",
        body: "Choose a portal and step through",
      },
      contact: {
        title: "QUEST STARTED · CONTACT",
        body: "Find the bonfire",
      },
    },

    minimap: {
      label: "MAP",
      sections: {
        hero: "Cosmos",
        about: "Studio",
        engines: "Tools",
        jams: "Trophies",
        showcase: "Portals",
        contact: "Bonfire",
      },
    },

    about: {
      sectionLabel: "STUDIO ROOM",
      title: "PLAYER PROFILE",
      intro: "Hey — I'm Renato. I make games when I'm not making software.",
      paragraphs: [
        "My very first game was a 2D platformer in Construct 2 — bosses, shops, the works. I was a kid trying to figure out why the engine kept eating my save files. A few years and four engines later, the answer is still 'because I forgot to call save.' Some bugs follow you forever.",
        "Most of my games come out of jams — the kind of constraint that turns a vague idea into a tiny finished thing in 48 hours. I love the format. Solo on the design and code, sometimes teaming up with friends who handle art. Each game has its own style because each game is its own little experiment.",
        "Latest project was Restoration Frontier — a co-op multiplayer game where robots clean a polluted planet. Long stretch of weekends in Unity 3D. Multiplayer netcode is humbling and I'd recommend it to anyone who wants to feel small.",
      ],
      stats: {
        class: { label: "CLASS", value: "GAME DEV" },
        level: { label: "LV", value: "9 YRS" },
        engines: { label: "ENGINE", value: "Unity" },
        jams: { label: "JAMS", value: "4+" },
      },
    },

    engines: {
      sectionLabel: "INVENTORY · ENGINES",
      title: "TOOLS OF THE TRADE",
      hint: "HOVER A SLOT TO INSPECT",
      shippedLabel: "SHIPPED",
      yearsLabel: "YEARS",
      allGamesLabel: "ALL GAMES",
      slots: {
        "Construct 2": {
          years: "2017",
          blurb: "Where it all started — a 2D platformer with shops and bosses.",
        },
        "Clickteam Fusion 2.5": {
          years: "2018 — 2020",
          blurb: "Jam-time engine. Quick prototyping, top-down stealth, weekend builds — until I hit its performance ceiling and jumped to Unity.",
        },
        "Unity 2D": {
          years: "2019 — Now",
          blurb: "Roguelite shooter for GameJaaj 5 — survive the rising tide.",
        },
        "Unity 3D": {
          years: "2019 — Now",
          blurb: "Started in 2019 with jam projects. Now home for the bigger work — most recently Restoration Frontier (multiplayer, physics, co-op).",
        },
      },
    },

    jams: {
      sectionLabel: "TROPHY HALL · GAME JAMS",
      title: "QUEST LOG",
      themeLabel: "THEME",
      entryLabel: "ENTRY",
      hint: "EACH STAMP IS A FINISHED RUN",
      viewEntry: "▶ VIEW JAM PAGE",
    },

    contact: {
      sectionLabel: "SUNSET · CAMP",
      title: "AROUND THE BONFIRE",
      blurb: "Wandering through? Drop a message — or follow the smoke.",
      signposts: {
        itch: "ITCH.IO",
        itchValue: "@renatogamer",
        gamejolt: "GAMEJOLT",
        gamejoltValue: "@RenatoGamer100",
        steam: "STEAM",
        steamValue: "ReGamer100",
        email: "EMAIL",
      },
      crossLabel: "PARALLEL IDENTITY · 01",
      crossTitle: "ALSO BUILDING IN THE OTHER WORLD",
      crossBlurb: "Quiet systems, careful interfaces, production craft.",
      crossButton: "WARP TO SOFTWARE",
      footerNote: "BUILT WITH PIXELS · INTENT",
    },
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
    roleValue: "Software Engineer",
    locationValue: "São Paulo, Brasil",
    focusValue: "Full-stack, AI-curious.",
    sysInit: "SYS.01",
    sysInitValue: "INIT",
    actKey: "SEC.01_HERO",
    actValue: "INTRO",
    scroll: "Scroll",
  },

  techAct: {
    sectionLabel: "SEC.01 · ACT II",
    titleLine1: "Tech",
    titleLine2: "Stack.",
    description: "Stack I use when creating solutions. Hold the scroll.",
    traversal: "TECH.TRAVERSAL",
  },

  about: {
    sectionLabel: "SEC.02 · ABOUT ME",
    titlePlain: "Curious by default",
    titleEm: ", pragmatic by habit",
    portraitTag: "PORTRAIT.IMG",
    h3: "Tech and AI enthusiast — always looking for ways to sharpen what I can build.",
    paragraphs: [
      "Most of what I know came from building, breaking, and rebuilding until the pieces made sense. At my day job I lead a two-person team at a maritime-ops company where the dev function was new — so everything from server provisioning and Docker, through project design and architecture, all the way to development and deploys, was built and is maintained from scratch. It's the kind of environment that forces you to understand every layer, and I've come to love that.",
      "Outside of work, I chase the same instinct with side projects. Bitewise pairs a custom-trained YOLOv9 model with a typed React Native client — the phone captures, a Node backend offloads inference to a GPU workstation, and nutrition data comes back per portion. KotobaGo is a local-first Japanese tutor that runs Ollama under the hood to generate stories calibrated to your exact vocabulary. The throughline is AI applied pragmatically — enough to make a product feel smart without handing it the keys.",
    ],
    sig: {
      focus: { label: "FOCUS", value: "AI-assisted products, full-stack" },
      habits: { label: "HABITS", value: "Ship small, own the whole stack" },
      learning: { label: "LEARNING", value: "Software design patterns, applied" },
    },
  },

  experience: {
    sectionLabel: "SEC.03 · EXPERIENCE",
    titlePlain: "Where the",
    titleEm: "experience takes shape",
    dur: "~2 yrs",
    jobs: [
      {
        role: "Lead Software Engineer",
        at: "Santos, SP · On-site",
        desc: "Lead developer in a two-person team building internal management and automation tools end-to-end. Stack spans Next.js + TypeScript on the frontend, Node.js + Express + PostgreSQL on the backend, all containerized with Docker behind Nginx. Also handle server provisioning, Cloudflare, and domain management, plus PowerBI dashboards integrated with cloud data. Latest projects adopt Domain-Driven Design in Go. Mentor a junior dev and run delivery through GitHub.",
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
        note: "Graduated December 2025 (GPA 8.6/10). TCC: Bitewise — AI-powered nutrition tracker pairing a custom-trained YOLOv9 model with a typed React Native client.",
      },
      {
        deg: "Curso Técnico de Informática para Internet integrado ao Ensino Médio",
        note: "Integrated technical track in web development (HTML, CSS, JavaScript). TCC: Project Phobos — a collaborative document search engine.",
      },
    ],
    certs: [
      {
        name: "Cambridge English C1 Advanced (CAE)",
        issuer: "Cambridge Assessment English",
      },
      {
        name: "Santander Jornada Tech — AWS Cloud Computing (em andamento)",
        issuer: "DIO · Santander",
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
      "Where prototypes come to life — small experiments, weird ideas, tiny worlds.",
    crossBtn: "Visit gamedev portfolio",
    footerIdentity: "IDENTITY_01 · ENGINEERING",
  },
};

export type Dictionary = typeof en;
