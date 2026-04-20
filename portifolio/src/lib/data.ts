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
};

export type GithubLanguage = { name: string; pct: number; color: string };
export type GithubRepo = {
  name: string;
  desc: string;
  lang: string;
  stars: number;
  color: string;
  href: string;
};

export type Education = {
  deg: string;
  inst: string;
  note: string;
  when: string;
};

export type Cert = { name: string; issuer: string };

export type Social = { k: string; v: string; href: string; external: boolean };

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
};

export const PORTFOLIO: PortfolioData = {
  name: "Renato Chaves",
  handle: "renatochaves.dev",
  email: "renatochaves.dev@gmail.com",
  location: "São Paulo, Brasil",
  role: "Software Developer",
  focus: "Tech & AI",

  techStack: [
    { name: "Next.js", cat: "Frontend", level: 90 },
    { name: "TypeScript", cat: "Core Language", level: 94 },
    { name: "React", cat: "Frontend", level: 90 },
    { name: "Docker", cat: "Infrastructure", level: 88 },
    { name: "Node.js", cat: "Backend", level: 90 },
    { name: "Golang", cat: "Backend · DDD", level: 78 },
    { name: "Python", cat: "Tooling · ML", level: 74 },
    { name: "React Native", cat: "Mobile", level: 82 },
    { name: "PostgreSQL", cat: "Databases", level: 82 },
    { name: "Nginx", cat: "Infrastructure", level: 80 },
    { name: "Git", cat: "Tooling", level: 92 },
  ],

  experience: [
    {
      role: "Lead Software Developer",
      company: "Orion Marítima",
      at: "Santos, SP · On-site",
      when: "2024 — Now",
      dur: "~2 yrs",
      desc: "Lead dev in a two-person team — with no prior in-house dev team, every piece of the stack was built and is maintained from scratch. Own server provisioning, installation, Docker configuration, and security hardening; handle Cloudflare, domain management, and API-security design. Sit in with upper management to scope problems and deliver solutions end-to-end — covering design, performance, architecture, and maintainability — with clean-code principles throughout (the latest project adopts Domain-Driven Design). Mentor a junior developer on best practices and run task delivery through GitHub.",
      tags: [
        "TypeScript",
        "Node.js",
        "Go · DDD",
        "Docker",
        "Nginx",
        "PM2",
        "Cloudflare",
        "API Security",
        "Mentoring",
      ],
    },
  ],

  skills: [
    {
      cat: "Frontend",
      idx: "01",
      items: [
        { name: "TypeScript", p: 5 },
        { name: "React / Next.js", p: 5 },
        { name: "CSS / Tailwind", p: 5 },
        { name: "NativeWind", p: 4 },
        { name: "Figma", p: 3 },
      ],
    },
    {
      cat: "Backend",
      idx: "02",
      items: [
        { name: "Node.js", p: 5 },
        { name: "Golang (DDD)", p: 4 },
        { name: "Python", p: 3 },
        { name: "REST APIs", p: 5 },
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
        { name: "Docker / Compose", p: 5 },
        { name: "Ubuntu Server", p: 5 },
        { name: "Nginx", p: 4 },
        { name: "PM2 / Portainer", p: 4 },
        { name: "Cloudflare", p: 4 },
      ],
    },
    {
      cat: "Tooling",
      idx: "05",
      items: [
        { name: "Git / GitHub", p: 5 },
        { name: "CI/CD pipelines", p: 4 },
        { name: "Monorepos", p: 3 },
        { name: "Figma hand-off", p: 3 },
      ],
    },
    {
      cat: "Craft",
      idx: "06",
      items: [
        { name: "Legacy modernization", p: 5 },
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
      repo: "github.com/Renato-Chaves/bitewise",
      repoHref: "https://github.com/Renato-Chaves",
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
      tags: ["Python", "A* Search", "Greedy Search", "Tkinter", "SQL Server"],
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
      { name: "TypeScript", pct: 46, color: "#67b4ff" },
      { name: "JavaScript", pct: 22, color: "#ffb066" },
      { name: "Go", pct: 14, color: "#6ef0e8" },
      { name: "Python", pct: 10, color: "#c48eff" },
      { name: "Shell", pct: 5, color: "#ff6b9e" },
      { name: "Other", pct: 3, color: "#475f82" },
    ],
    summary: { commits: 812, prs: 64, stars: 28 },
    repos: [
      {
        name: "bitewise",
        desc: "AI-powered cross-platform nutrition tracker (RN + YOLOv9).",
        lang: "TypeScript",
        stars: 14,
        color: "#67b4ff",
        href: "https://github.com/Renato-Chaves",
      },
      {
        name: "portifolio",
        desc: "This site — Next.js 16 + two parallel identities.",
        lang: "TypeScript",
        stars: 6,
        color: "#67b4ff",
        href: "https://github.com/Renato-Chaves",
      },
      {
        name: "orion-services",
        desc: "Go (DDD) services powering production workflows.",
        lang: "Go",
        stars: 4,
        color: "#6ef0e8",
        href: "https://github.com/Renato-Chaves",
      },
      {
        name: "infra-playbook",
        desc: "Docker / Nginx / PM2 recipes for self-hosted Node stacks.",
        lang: "Shell",
        stars: 4,
        color: "#ff6b9e",
        href: "https://github.com/Renato-Chaves",
      },
    ],
  },

  education: [
    {
      deg: "B.Sc. Computer Science",
      inst: "UNIP — Santos, SP",
      note: "Graduated December 2025. Coursework spanned systems, databases, networking, and software engineering fundamentals.",
      when: "2021 — 2025",
    },
  ],

  certs: [
    { name: "Cambridge English C1 Advanced (CAE)", issuer: "Cambridge Assessment English" },
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
};
