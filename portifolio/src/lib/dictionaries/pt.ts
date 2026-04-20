import type { Dictionary } from "./en";

export const pt: Dictionary = {
  identity: {
    statusLine: "02 IDENTIDADES",
    sysStatus: "SYS.STATUS — ONLINE",
    nodes: "NODES · 142  ·  LAT 12ms",
    software: {
      badge: "IDENTIDADE_01 · ENGENHARIA",
      title1: "Desenvolvedor",
      title2: "de Software",
      line1: "Sistemas, interfaces e o ofício silencioso de deixá-los confiáveis.",
      line2Before: "Role para entrar, ou pressione",
      line2After: ".",
      enterPrefix: "$",
      enterCmd: "./entrar",
      enterArg: "—software",
      enterAria: "Entrar no portfólio de Desenvolvedor de Software",
      statsUptime: "UPTIME",
      statsCommits: "COMMITS/SEM",
      statsFocus: "FOCO",
      statsFocusValue: "INTENSO",
    },
    gamedev: {
      title1: "GAME",
      title2: "DEV",
      title3: "WORLD",
      tagline: "UM MUNDO COLORIDO DE MÁQUINAS MINIATURAS",
      start: "▶ APERTE START",
      navPrev: "◀",
      navNext: "▶",
      worldLabel: "MUNDO 2-1",
    },
    panelLabels: {
      software: "Desenvolvedor de Software",
      gamedev: "Desenvolvedor de Jogos",
    },
  },

  gamedev: {
    player: "> PLAYER 02 <",
    comingLine1: "EM BREVE",
    comingLine2: "CHEGANDO",
    body1: "O PORTFÓLIO DE DESENVOLVIMENTO DE JOGOS ESTÁ EM CONSTRUÇÃO.",
    body2Prefix: "VOLTE EM BREVE PARA VER MÁQUINAS MINIATURAS",
    back: "◀ PRESSIONE B · VOLTAR",
  },

  nav: {
    brandSlug: "/ software-dev",
    online: "ONLINE",
    back: "VOLTAR",
    backAria: "Voltar para a seleção de identidade",
    sections: {
      hero: "Início",
      about: "Sobre",
      experience: "Experiência",
      skills: "Habilidades",
      projects: "Projetos",
      github: "GitHub",
      education: "Formação",
      contact: "Contato",
    },
    langSwitch: {
      en: "EN",
      pt: "PT",
    },
  },

  hero: {
    badge: "IDENTIDADE_01 · ENGENHARIA",
    role: "CARGO",
    based: "LOCAL",
    focus: "FOCO",
    roleValue: "Desenvolvedor de Software",
    locationValue: "São Paulo, Brasil",
    focusValue: "Tech & IA",
    sysInit: "SYS.01",
    sysInitValue: "INIT",
    actKey: "SEC.01_HERO",
    actValue: "ATO I / III",
    scroll: "Role",
  },

  techAct: {
    sectionLabel: "SEC.01 · ATO II",
    titleLine1: "Stack",
    titleLine2: "Técnica.",
    description: "Ferramentas que uso primeiro. Segure o scroll — elas passam por você.",
    traversal: "TRAVESSIA.TECH",
  },

  about: {
    sectionLabel: "SEC.02 · SOBRE MIM",
    titlePlain: "Curioso por padrão",
    titleEm: ", pragmático por hábito",
    portraitTag: "RETRATO.IMG",
    h3: "Entusiasta de tecnologia e IA — sempre buscando formas de afiar o que consigo construir.",
    paragraphs: [
      "A maior parte do que sei veio de construir, quebrar e reconstruir até as peças fazerem sentido. No trabalho, lidero um time de duas pessoas em uma empresa de operações marítimas onde a função de desenvolvimento era nova — então toda a stack, do provisionamento de servidor e Docker até segurança de API e deploys, foi construída e é mantida do zero. É o tipo de ambiente que te força a entender cada camada, e eu passei a amar isso.",
      "Fora do trabalho, persigo o mesmo instinto em projetos pessoais. O Bitewise combina um modelo YOLOv9 treinado sob medida com um cliente React Native tipado — o celular captura, um backend Node repassa a inferência para uma workstation com GPU, e os dados nutricionais voltam por porção. O KotobaGo é um tutor de japonês local-first que usa Ollama por baixo dos panos para gerar histórias calibradas exatamente pelo seu vocabulário. O fio condutor é IA aplicada de forma pragmática — o suficiente para fazer um produto parecer inteligente sem entregar a ele as chaves.",
    ],
    sig: {
      focus: { label: "FOCO", value: "Produtos com IA, full-stack" },
      habits: { label: "HÁBITOS", value: "Entregar pequeno, dominar toda a stack" },
      learning: { label: "ESTUDANDO", value: "Serviços de ML aplicado, DDD em Go" },
    },
  },

  experience: {
    sectionLabel: "SEC.03 · EXPERIÊNCIA",
    titlePlain: "Onde a",
    titleEm: "experiência toma forma",
    dur: "~2 anos",
    jobs: [
      {
        role: "Desenvolvedor de Software Líder",
        at: "Santos, SP · Presencial",
        desc: "Dev líder em um time de duas pessoas — sem time interno de desenvolvimento anterior, cada parte da stack foi construída e é mantida do zero. Responsável por provisionamento de servidor, instalação, configuração de Docker e hardening de segurança; cuido de Cloudflare, gerenciamento de domínios e design de segurança de API. Participo com a alta gestão para mapear problemas e entregar soluções end-to-end — cobrindo design, performance, arquitetura e manutenibilidade — sempre com princípios de clean code (o projeto mais recente adota Domain-Driven Design). Mentoro um desenvolvedor júnior em boas práticas e conduzo a entrega de tarefas via GitHub.",
      },
    ],
  },

  skills: {
    sectionLabel: "SEC.04 · HABILIDADES",
    titlePlain: "O",
    titleEm: "quadro completo",
    categories: {
      Frontend: "Frontend",
      Backend: "Backend",
      Mobile: "Mobile",
      "Infra & DevOps": "Infra & DevOps",
      Tooling: "Ferramentas",
      Craft: "Ofício",
    },
  },

  projects: {
    sectionLabel: "PROJETOS",
    railLabelLocked: "SCROLL · TRAVADO",
    projectPrefix: "PROJETO",
    ghBtn: "Repositório no GitHub",
    ledes: {
      Bitewise:
        "Um app móvel multiplataforma que reconhece comida a partir de uma foto e acompanha a nutrição. O cliente React Native captura a imagem e a entrega a um backend em Node, que repassa a inferência a um modelo YOLOv9 treinado sob medida rodando em uma workstation com GPU e devolve os dados nutricionais normalizados por porção.",
      KotobaGo:
        "App de aprendizado de japonês local-first construído em torno do método de input compreensível (i+1 de Krashen). Gera histórias calibradas ao seu vocabulário exato, com dicionário não-intrusivo e repetição espaçada embutida. Front-end em Next.js, back-end em FastAPI, Ollama para inferência local de LLM, MeCab/Fugashi para tokenização — tudo orquestrado via Docker Compose.",
      BeamMaps:
        "Um planejador de rotas de desktop inspirado no Google Maps, feito em Python com UI interativa em canvas. Permite escolher origem e destino em um grafo de cidade e assistir Greedy best-first ou A* percorrendo-o em tempo real — comparando caminhos explorados, totais e heurísticas lado a lado.",
      "weather-app":
        "Um cliente moderno de clima para celular em React Native + Expo. Puxa condições em tempo real do Open-Meteo — temperatura, umidade, vento, índice UV, visibilidade — e as renderiza com UI de glassmorphism que reage ao estado dia/noite e tipo de clima.",
    },
  },

  github: {
    sectionLabel: "SEC.05 · ATIVIDADE",
    titlePlain: "No",
    titleEm: "log de commits",
    blurbPrefix: "Puxado de github.com/",
    blurbSuffix: ". Os números mudam; os hábitos ficam.",
    cardLangs: "LINGUAGENS · 12m",
    cardContrib: "CONTRIBUIÇÕES · 52s",
    cardPinned: "FIXADOS",
    live: "AO VIVO",
    commits: "Commits",
    prs: "Pull requests",
    stars: "Estrelas",
    months: ["JAN", "ABR", "JUL", "OUT", "DEZ"],
  },

  education: {
    sectionLabel: "SEC.07 · APRENDER",
    titleEdu: "Formação",
    titleAmp: " & ",
    titleCerts: "certificações",
    titleStudy: "& estudo",
    certsHeading: "Certificações",
    entries: [
      {
        deg: "Bacharelado em Ciência da Computação",
        note: "Formado em Dezembro de 2025. A grade cobriu sistemas, bancos de dados, redes e fundamentos de engenharia de software.",
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
    sectionLabel: "SEC.08 · APERTO DE MÃO",
    titleLine1: "Vamos construir",
    titleEm: "algo real.",
    crossLabel: "IDENTIDADE PARALELA · 02",
    crossH4Plain: "Também construindo em",
    crossH4Em: "outro mundo.",
    crossP:
      "Pixels coloridos, pequenas máquinas e jogos que não se levam muito a sério.",
    crossBtn: "Visitar Desenvolvedor de Jogos",
    footerBuilt: "FEITO COM NEXT.JS · CANVAS · INTENÇÃO",
    footerIdentity: "IDENTIDADE_01 · ENGENHARIA",
  },
};
