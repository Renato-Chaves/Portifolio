export type TechItem = {
  name: string;
  cat: string;
  level: number;
};

export type Experience = {
  role: string;
  company: string;
  at: string;
  when: string;
  dur: string;
  desc: string;
  tags: string[];
};

export type SkillCategory = {
  cat: string;
  idx: string;
  items: { name: string; p: number }[];
};

export type ProjectMockKind =
  | "editor"
  | "graph"
  | "dashboard"
  | "palette"
  | "placeholder";

export type Project = {
  name: string;
  tagline: string;
  color: string;
  num: string;
  lede: string;
  tags: string[];
  repo: string;
  repoHref: string;
  mock: ProjectMockKind;
  images?: string[];
  shape?: "mobile" | "desktop";
  placeholder?: boolean;
  comingSoon?: boolean;
};

export type GithubLanguage = { name: string; pct: number; color: string };
export type GithubRepo = {
  name: string;
  desc: string;
  lang: string;
  stars: number;
  color: string;
  href: string;
  disabled?: boolean;
};

export type Education = {
  deg: string;
  inst: string;
  note: string;
  when: string;
};

export type Cert = { name: string; issuer: string };

export type Social = { k: string; v: string; href: string; external: boolean };

export type GameEngine =
  | "Construct 2"
  | "Clickteam Fusion 2.5"
  | "Unity 2D"
  | "Unity 3D";

export type PortalFrameStyle =
  | "stone-arch"
  | "tech-ring"
  | "wooden-door"
  | "mystic-gate"
  | "sealed";

export type AmbientParticle =
  | "coins"
  | "sparkles"
  | "leaves"
  | "embers"
  | "dust";

export type GameJamEntry = {
  name: string;
  year: number;
  theme?: string;
  placement?: string;
};

export type GameJam = {
  slug: string;
  name: string;
  year: number;
  theme?: string;
  placement?: string;
  entry: {
    name: string;
    thumbnail?: string;
    url?: string;
  };
};

export type ShowcaseMedia =
  | string
  | { kind: "youtube"; videoId: string; title?: string };

export type GameProject = {
  name: string;
  slug: string;
  status: "shipped" | "wip" | "placeholder";
  featured?: boolean;
  // visual identity
  logoSrc?: string;
  characterSrc?: string;
  frameStyle: PortalFrameStyle;
  palette: { primary: string; accent: string; bg: string };
  ambient: AmbientParticle;
  // takeover content
  description?: string;
  screenshots: ShowcaseMedia[];
  engine?: GameEngine;
  year?: number;
  gameJam?: GameJamEntry;
  tags: string[];
  itchUrl?: string;
  gamejoltUrl?: string;
  htmlEmbedUrl?: string;
  trailerUrl?: string;
  githubUrl?: string;
};

export type PortfolioData = {
  name: string;
  handle: string;
  email: string;
  location: string;
  role: string;
  focus: string;
  techStack: TechItem[];
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  github: {
    username: string;
    languages: GithubLanguage[];
    summary: { commits: number; prs: number; stars: number };
    repos: GithubRepo[];
  };
  education: Education[];
  certs: Cert[];
  socials: Social[];
  gameProjects: GameProject[];
  gameJams: GameJam[];
};

export const PORTFOLIO: PortfolioData = {
  name: "Renato Chaves",
  handle: "renatochaves.dev",
  email: "renatochaves.dev@gmail.com",
  location: "São Paulo, Brasil",
  role: "Software Engineer",
  focus: "Full-stack, AI-curious.",

  techStack: [
    { name: "Next.js", cat: "Frontend", level: 82 },
    { name: "TypeScript", cat: "Core Language", level: 82 },
    { name: "Golang", cat: "Backend · DDD", level: 78 },
    { name: "Docker", cat: "Infrastructure", level: 80 },
    { name: "Node.js", cat: "Backend", level: 82 },
    { name: "React", cat: "Frontend", level: 82 },
    { name: "Python", cat: "Tooling · ML", level: 60 },
    { name: "PostgreSQL", cat: "Databases", level: 82 },
    { name: "Nginx", cat: "Infrastructure", level: 80 },
    { name: "Git", cat: "Tooling", level: 82 },
    { name: "React Native", cat: "Mobile", level: 82 },
    { name: "PowerBI", cat: "Data Viz", level: 70 },
  ],

  experience: [
    {
      role: "Lead Software Engineer",
      company: "Orion Marítima",
      at: "Santos, SP · On-site",
      when: "2024 — Now",
      dur: "~2 yrs",
      desc: "Lead developer in a two-person team building internal management and automation tools end-to-end. Stack spans Next.js + TypeScript on the frontend, Node.js + Express + PostgreSQL on the backend, all containerized with Docker behind Nginx. Also handle server provisioning, Cloudflare, and domain management, plus PowerBI dashboards integrated with cloud data. Latest projects adopt Domain-Driven Design in Go. Mentor a junior dev and run delivery through GitHub.",
      tags: [
        "TypeScript",
        "Next.js",
        "Node.js",
        "Express",
        "PostgreSQL",
        "Docker",
        "Nginx",
        "PowerBI",
        "Go · DDD",
        "Cloudflare",
        "Mentoring",
      ],
    },
  ],

  skills: [
    {
      cat: "Frontend",
      idx: "01",
      items: [
        { name: "TypeScript", p: 4 },
        { name: "React / Next.js", p: 4 },
        { name: "CSS / Tailwind", p: 4 },
        { name: "Figma", p: 3 },
      ],
    },
    {
      cat: "Backend",
      idx: "02",
      items: [
        { name: "Node.js", p: 4 },
        { name: "Golang (DDD)", p: 4 },
        { name: "Python", p: 3 },
        { name: "REST APIs", p: 4 },
        { name: "SQL", p: 4 },
      ],
    },
    {
      cat: "Mobile",
      idx: "03",
      items: [
        { name: "React Native", p: 4 },
        { name: "NativeWind", p: 4 },
        { name: "Expo & native build", p: 3 },
        { name: "Custom-trained YOLOv9", p: 3 },
      ],
    },
    {
      cat: "Infra & DevOps",
      idx: "04",
      items: [
        { name: "Docker / Compose", p: 4 },
        { name: "Ubuntu Server", p: 4 },
        { name: "Nginx", p: 4 },
        { name: "PM2 / Portainer", p: 4 },
        { name: "Cloudflare", p: 4 },
      ],
    },
    {
      cat: "Tooling",
      idx: "05",
      items: [
        { name: "Git / GitHub", p: 4 },
        { name: "CI/CD pipelines", p: 4 },
        { name: "Monorepos", p: 3 },
      ],
    },
    {
      cat: "Craft",
      idx: "06",
      items: [
        { name: "Legacy modernization", p: 4 },
        { name: "Performance budgeting", p: 4 },
        { name: "Production ops", p: 4 },
        { name: "Technical writing", p: 3 },
      ],
    },
  ],

  projects: [
    {
      name: "Bitewise",
      tagline: "AI-powered nutrition tracker",
      color: "#6ef0e8",
      num: "01",
      lede: "A cross-platform mobile app that recognizes food from a photo and tracks nutrition. The React Native client captures the image and hands it to a Node backend, which offloads inference to a custom-trained YOLOv9 model running on a GPU workstation and returns normalized nutrition data per portion.",
      tags: ["React Native", "TypeScript", "YOLOv9", "Python", "Node"],
      repo: "coming soon",
      repoHref: "#",
      comingSoon: true,
      mock: "dashboard",
      images: [
        "/software/BitewiseBG_Mobile.png",
        "/software/BitewiseBG_Mobile2.png",
      ],
      shape: "mobile",
    },
    {
      name: "KotobaGo",
      tagline: "Local-first AI Japanese tutor",
      color: "#c48eff",
      num: "02",
      lede: "Local-first Japanese learning app built around the comprehensible-input method (Krashen's i+1). Generates stories calibrated to your exact vocabulary, with a non-intrusive dictionary and built-in spaced repetition. Next.js front-end, FastAPI back-end, Ollama for local LLM inference, MeCab/Fugashi for tokenization — all wired up via Docker Compose.",
      tags: ["Next.js", "FastAPI", "Ollama", "Docker", "Python", "SQLite"],
      repo: "github.com/Renato-Chaves/KotobaGo",
      repoHref: "https://github.com/Renato-Chaves/KotobaGo",
      mock: "editor",
      images: ["/software/KotobaGo.png"],
      shape: "desktop",
    },
    {
      name: "BeamMaps",
      tagline: "Route-search visualizer",
      color: "#67b4ff",
      num: "03",
      lede: "A desktop route-planner inspired by Google Maps, built in Python with an interactive canvas UI. Lets you pick origin and destination on a city graph and watch either Greedy best-first or A* traverse it in real time — comparing explored paths, totals, and heuristics side by side.",
      tags: ["Python", "A* Search", "Greedy Search", "CustomTkinter", "SQL Server"],
      repo: "github.com/Renato-Chaves/BeamMaps",
      repoHref: "https://github.com/Renato-Chaves/BeamMaps",
      mock: "graph",
      images: ["/software/BeamMapsBG.png"],
      shape: "desktop",
    },
    {
      name: "weather-app",
      tagline: "React Native weather client",
      color: "#ffb066",
      num: "04",
      lede: "A modern mobile weather client in React Native + Expo. Pulls real-time conditions from Open-Meteo — temperature, humidity, wind, UV index, visibility — and renders them with a glassmorphism UI that reacts to day/night state and weather type.",
      tags: ["React Native", "Expo", "TypeScript", "Open-Meteo"],
      repo: "github.com/Renato-Chaves/weather-app",
      repoHref: "https://github.com/Renato-Chaves/weather-app",
      mock: "palette",
      images: [
        "/software/WeatherAppBG_Mobile.jpg",
        "/software/WeatherAppBG_Mobile2.jpg",
      ],
      shape: "mobile",
    },
  ],

  github: {
    username: "Renato-Chaves",
    languages: [
      { name: "TypeScript", pct: 38, color: "#67b4ff" },
      { name: "Python", pct: 27, color: "#c48eff" },
      { name: "C#", pct: 13, color: "#6ef0e8" },
      { name: "JavaScript", pct: 12, color: "#ffb066" },
      { name: "Go", pct: 6, color: "#5cffb7" },
      { name: "Other", pct: 4, color: "#475f82" },
    ],
    summary: { commits: 753, prs: 2, stars: 13 },
    repos: [
      {
        name: "bitewise",
        desc: "AI-powered cross-platform nutrition tracker (React Native + YOLOv9). Repo is currently private.",
        lang: "TypeScript",
        stars: 0,
        color: "#67b4ff",
        href: "#",
        disabled: true,
      },
      {
        name: "KotobaGo",
        desc: "AI-powered Japanese learning app around comprehensible-input method (Krashen i+1).",
        lang: "TypeScript",
        stars: 0,
        color: "#67b4ff",
        href: "https://github.com/Renato-Chaves/KotobaGo",
      },
      {
        name: "BeamMaps",
        desc: "Python GUI route-search visualizer (A* / Greedy) inspired by Google Maps.",
        lang: "Python",
        stars: 2,
        color: "#c48eff",
        href: "https://github.com/Renato-Chaves/BeamMaps",
      },
      {
        name: "Portifolio",
        desc: "Interactive Next.js portfolio with two parallel identities (Software + GameDev).",
        lang: "TypeScript",
        stars: 0,
        color: "#67b4ff",
        href: "https://github.com/Renato-Chaves/Portifolio",
      },
      {
        name: "Phone-Finder",
        desc: "App to search phones by parts and specs, with backlog of devices and features.",
        lang: "TypeScript",
        stars: 1,
        color: "#67b4ff",
        href: "https://github.com/Renato-Chaves/Phone-Finder",
      },
    ],
  },

  education: [
    {
      deg: "B.Sc. Computer Science",
      inst: "UNIP — Santos, SP",
      note: "Graduated December 2025 (GPA 8.6/10). TCC: Bitewise — AI-powered nutrition tracker pairing a custom-trained YOLOv9 model with a typed React Native client.",
      when: "2021 — 2025",
    },
    {
      deg: "Curso Técnico de Informática para Internet integrado ao Ensino Médio",
      inst: "ETEC de Itanhaém",
      note: "Integrated technical track in web development (HTML, CSS, JavaScript). TCC: Project Phobos — a collaborative document search engine.",
      when: "2019 — 2021",
    },
  ],

  certs: [
    { name: "Cambridge English C1 Advanced (CAE)", issuer: "Cambridge Assessment English" },
    {
      name: "Santander Jornada Tech — AWS Cloud Computing (em andamento)",
      issuer: "DIO · Santander",
    },
  ],

  socials: [
    {
      k: "GitHub",
      v: "@Renato-Chaves",
      href: "https://github.com/Renato-Chaves",
      external: true,
    },
    {
      k: "LinkedIn",
      v: "in/renato-chaves-nunes",
      href: "https://linkedin.com/in/renato-chaves-nunes",
      external: true,
    },
    {
      k: "Email",
      v: "renatochaves.dev@gmail.com",
      href: "mailto:renatochaves.dev@gmail.com",
      external: false,
    },
  ],

  gameProjects: [
    {
      name: "Restoration Frontier",
      slug: "restoration-frontier",
      status: "shipped",
      featured: true,
      year: 2024,
      frameStyle: "tech-ring",
      palette: { primary: "#5cffb7", accent: "#67b4ff", bg: "#0e2030" },
      ambient: "sparkles",
      description:
        "A cooperative multiplayer game where a team of robots cleans pollution from a planet. Collect scrap, bring it to recycling stations to build automation machines, destroy pollution sources, and ultimately reach and demolish a mega-factory. Pollution clouds block vision, resources gate progression, and the map opens up as the world is restored.",
      screenshots: [
        {
          kind: "youtube",
          videoId: "PvMco2QSBqA",
          title: "Restoration Frontier — Gameplay Showcase (APS CC5Q41)",
        },
        "/gamedev/RestorationFrontier_Menu.png",
        "/gamedev/RestorationFrontier_1.png",
        "/gamedev/RestorationFrontier_2.png",
        "/gamedev/RestorationFrontier_3.png",
        "/gamedev/RestorationFrontier_4.png",
        "/gamedev/RestorationFrontier_5.png",
        "/gamedev/RestorationFrontier_6.png",
      ],
      engine: "Unity 3D",
      tags: ["3D", "Multiplayer", "Co-op", "Sci-Fi"],
      trailerUrl: "https://www.youtube.com/watch?v=PvMco2QSBqA",
      githubUrl: "https://github.com/Renato-Chaves/Restoration-Frontier",
    },
    {
      name: "Rushing to the Top",
      slug: "rushing-to-the-top",
      status: "shipped",
      featured: true,
      year: 2021,
      frameStyle: "stone-arch",
      palette: { primary: "#ffd23f", accent: "#ff6b9e", bg: "#2a1015" },
      ambient: "embers",
      description:
        "A roguelite 2D shooter. The ocean is rising — survive by climbing to the top of a building. Buy and upgrade guns between runs, shoot enemies floor by floor, and fix elevators to keep ascending. Linger too long on a floor and the rising water catches you.",
      screenshots: [
        "/gamedev/RushingToTheTopMenu.png",
        "/gamedev/RushingToTheTop_1.jpg",
        "/gamedev/RushingToTheTop_2.jpg",
        "/gamedev/RushingToTheTop_3.jpg",
        "/gamedev/RushingToTheTop_4.jpg",
      ],
      engine: "Unity 2D",
      gameJam: { name: "GameJaaj 5", year: 2021, theme: "Torres" },
      tags: ["2D", "Roguelite", "Shooter", "Pixel"],
      gamejoltUrl: "https://gamejolt.com/games/rushingtothetop/574222",
    },
    {
      name: "Plus and Minus",
      slug: "plus-and-minus",
      status: "shipped",
      featured: true,
      year: 2021,
      frameStyle: "mystic-gate",
      palette: { primary: "#c48eff", accent: "#5cffb7", bg: "#2a0a48" },
      ambient: "sparkles",
      description:
        "A two-player physics game. It opens as a 1v1 fight in a ring — but hidden clues hint at how to escape your chains. Find them and the game shifts into a cooperative escape platformer where both players are physically tethered, forcing you to navigate together using physics.",
      screenshots: [
        "/gamedev/PlusAndMinusBackgroundBanner.png",
        "/gamedev/PlusAndMinus_1.png",
        "/gamedev/PlusAndMinus_2.png",
        "/gamedev/PlusAndMinus_3.png",
      ],
      engine: "Unity 3D",
      gameJam: { name: "GMTK Game Jam 2021", year: 2021, theme: "Joined Together" },
      tags: ["3D", "Local Co-op", "Physics", "Puzzle"],
      itchUrl: "https://renatogamer.itch.io/plus-and-minus",
    },
    {
      name: "???",
      slug: "more-coming",
      status: "placeholder",
      frameStyle: "sealed",
      palette: { primary: "#67b4ff", accent: "#c48eff", bg: "#1a1a3a" },
      ambient: "dust",
      screenshots: [],
      tags: [],
    },
    {
      name: "Hero of the Shield",
      slug: "hero-of-the-shield",
      status: "shipped",
      featured: false,
      year: 2019,
      frameStyle: "stone-arch",
      palette: { primary: "#67b4ff", accent: "#5cffb7", bg: "#0e1830" },
      ambient: "sparkles",
      description:
        "A dungeon traversal game where your only weapon is a shield — reflect enemy bullets and solve puzzles to escape.",
      screenshots: ["/gamedev/HeroOfTheShield_Menu.png"],
      engine: "Unity 3D",
      gameJam: {
        name: "GameJaaj 4",
        year: 2019,
        theme: "Seus inimigos são suas armas",
      },
      tags: ["3D", "Action", "Puzzle", "Jam"],
      gamejoltUrl: "https://gamejolt.com/games/shieldhero/460375",
    },
    {
      name: "Looting in the Docks",
      slug: "looting-in-the-docks",
      status: "shipped",
      featured: false,
      year: 2020,
      frameStyle: "wooden-door",
      palette: { primary: "#ffd23f", accent: "#67b4ff", bg: "#1a1a2a" },
      ambient: "coins",
      description:
        "Top-down stealth game — sneak through the docks, avoid guards, and collect 20 gold pieces to win.",
      screenshots: [
        "/gamedev/LootingInTheDocks_Menu.png",
        "/gamedev/LootinInTheDocks_1.png",
      ],
      engine: "Clickteam Fusion 2.5",
      tags: ["2D", "Stealth", "Top-down", "Pixel"],
      itchUrl: "https://renatogamer.itch.io/looting-in-the-docks",
    },
    {
      name: "Marines Quest",
      slug: "marines-quest",
      status: "shipped",
      featured: false,
      year: 2019,
      frameStyle: "wooden-door",
      palette: { primary: "#5cffb7", accent: "#67b4ff", bg: "#0a1830" },
      ambient: "sparkles",
      description:
        "Submarine combat game — destroy the great wall blocking the path to let your army through, fighting past obstacles and enemies.",
      screenshots: ["/gamedev/MarinesQuestBackgroundBanner.png"],
      engine: "Clickteam Fusion 2.5",
      gameJam: { name: "Mini Jam 33", year: 2019, theme: "Underwater" },
      tags: ["2D", "Action", "Submarine", "Jam"],
      itchUrl: "https://renatogamer.itch.io/marines-quest",
    },
    {
      name: "Printer Game",
      slug: "printer-game",
      status: "shipped",
      featured: false,
      year: 2023,
      frameStyle: "tech-ring",
      palette: { primary: "#ffd23f", accent: "#c48eff", bg: "#1a1a2a" },
      ambient: "dust",
      description:
        "Idle game where you control a printer — manage demands and upgrade yourself to be the best printer in the office.",
      screenshots: [
        "/gamedev/PrinterGame_01.png",
        "/gamedev/PrinterGame_02.png",
      ],
      engine: "Unity 3D",
      gameJam: { name: "GMTK Game Jam 2023", year: 2023, theme: "Roles Reversed" },
      tags: ["3D", "Idle", "Office", "Jam"],
      itchUrl: "https://renatogamer.itch.io/printer-game",
    },
    {
      name: "Platform — The Game",
      slug: "platform-the-game",
      status: "shipped",
      featured: false,
      year: 2017,
      frameStyle: "wooden-door",
      palette: { primary: "#ff6b9e", accent: "#ffd23f", bg: "#1a0a2a" },
      ambient: "embers",
      description:
        "First-ever game. A 2D platformer with upgrades, shops, and boss fights — built in Construct 2 as a kid.",
      screenshots: ["/gamedev/PlatformTheGame_Menu.png"],
      engine: "Construct 2",
      tags: ["2D", "Platformer", "First Game"],
      itchUrl: "https://renatogamer.itch.io/platform-the-game",
      gamejoltUrl: "https://gamejolt.com/games/Platform-TheGame/338795",
    },
  ],

  gameJams: [
    {
      slug: "mini-jam-33-2019",
      name: "Mini Jam 33",
      year: 2019,
      theme: "Underwater",
      entry: {
        name: "Marines Quest",
        thumbnail: "/gamedev/MarinesQuestBackgroundBanner.png",
        url: "https://itch.io/jam/mini-jam-33-underwater",
      },
    },
    {
      slug: "gamejaaj-4-2019",
      name: "GameJaaj 4",
      year: 2019,
      theme: "Seus inimigos são suas armas",
      entry: {
        name: "Hero of the Shield",
        thumbnail: "/gamedev/HeroOfTheShield_Menu.png",
        url: "https://gamejolt.com/search/games?q=%23gamejaaj4",
      },
    },
    {
      slug: "gamejaaj-5-2021",
      name: "GameJaaj 5",
      year: 2021,
      theme: "Torres",
      entry: {
        name: "Rushing to the Top",
        thumbnail: "/gamedev/RushingToTheTopMenu.png",
      },
    },
    {
      slug: "gmtk-21",
      name: "GMTK Game Jam 2021",
      year: 2021,
      theme: "Joined Together",
      entry: {
        name: "Plus and Minus",
        thumbnail: "/gamedev/PlusAndMinusBackgroundBanner.png",
        url: "https://itch.io/jam/gmtk-2021",
      },
    },
    {
      slug: "gmtk-23-2023",
      name: "GMTK Game Jam 2023",
      year: 2023,
      theme: "Roles Reversed",
      entry: {
        name: "Printer Game",
        thumbnail: "/gamedev/PrinterGame_01.png",
        url: "https://itch.io/jam/gmtk-2023",
      },
    },
  ],
};
