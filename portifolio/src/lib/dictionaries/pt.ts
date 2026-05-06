import type { Dictionary } from "./en";

export const pt: Dictionary = {
  identity: {
    statusLine: "02 IDENTIDADES",
    sysStatus: "SYS.STATUS — ONLINE",
    nodes: "REPOS · +15  ·  YRS 2",
    software: {
      badge: "IDENTIDADE_01 · ENGENHARIA",
      title1: "Desenvolvedor",
      title2: "de Software",
      line1: "Construindo sistemas full-stack do zero à produção.",
      line2Before: "Role para entrar, ou pressione",
      line2After: ".",
      enterPrefix: "$",
      enterCmd: "./entrar",
      enterArg: "—software",
      enterAria: "Entrar no portfólio de Desenvolvedor de Software",
      statsCuriosity: "CURIOSIDADE",
      statsCuriosityValue: "SEMPRE",
      statsCraft: "QUALIDADE",
      statsCraftValue: "ATENCIOSO",
      statsDesign: "DESIGN",
      statsDesignValue: "MODERNO",
    },
    gamedev: {
      title1: "GAME",
      title2: "DEV",
      title3: "WORLD",
      tagline: "ONDE PROTÓTIPOS GANHAM VIDA",
      start: "▶ APERTE START",
      navPrev: "◀",
      navNext: "▶",
      worldLabel: "MUNDO 1-1",
    },
    panelLabels: {
      software: "Desenvolvedor de Software",
      gamedev: "Desenvolvedor de Jogos",
    },
  },

  gamedev: {
    player: "> PLAYER 01 <",
    back: "◀ VOLTAR",

    hero: {
      title1: "GAME",
      title2: "DEV",
      title3: "WORLD",
      tagline: "PIXELS · MUNDOS · PROTÓTIPOS",
      scrollHint: "ROLE PARA COMEÇAR",
    },

    portalHub: {
      sectionLabel: "VITRINE DE JOGOS",
      clickToEnter: "CLIQUE PARA ENTRAR",
      placeholderName: "???",
      placeholderHint: "EM BREVE",
      sealedHint: "INSIRA UMA FICHA",
      closeLabel: "Fechar",
      backLabel: "Voltar",
      playGame: "▶ JOGAR",
      visitItch: "ITCH.IO",
      visitGamejolt: "GAMEJOLT",
      watchTrailer: "TRAILER",
      viewSource: "VER CÓDIGO",
      engineLabel: "ENGINE",
      jamLabel: "GAME JAM",
      tagsLabel: "TAGS",
      noDescription: "Mais detalhes em breve.",
      completedLabel: "★ COMPLETO",
      noImageLabel: "▢ SEM IMAGEM",
      screenshotComingSoon: "Screenshot em breve",
    },

    quests: {
      hero: {
        title: "MISSÃO INICIADA · INTRO",
        body: "Navegue pelo cosmos",
      },
      about: {
        title: "MISSÃO INICIADA · SOBRE",
        body: "Entre no estúdio",
      },
      engines: {
        title: "MISSÃO INICIADA · ENGINES & FERRAMENTAS",
        body: "Examine as ferramentas em exibição",
      },
      jams: {
        title: "MISSÃO INICIADA · GAME JAMS",
        body: "Inspecione o salão de troféus",
      },
      showcase: {
        title: "MISSÃO INICIADA · VITRINE",
        body: "Escolha um portal e atravesse",
      },
      contact: {
        title: "MISSÃO INICIADA · CONTATO",
        body: "Encontre a fogueira",
      },
    },

    minimap: {
      label: "MAPA",
      sections: {
        hero: "Cosmos",
        about: "Estúdio",
        engines: "Ferramentas",
        jams: "Troféus",
        showcase: "Portais",
        contact: "Fogueira",
      },
    },

    about: {
      sectionLabel: "SALA DO ESTÚDIO",
      title: "PERFIL DO JOGADOR",
      intro: "Oi — sou o Renato. Faço jogos quando não estou fazendo software.",
      paragraphs: [
        "Meu primeiro jogo foi um plataforma 2D no Construct 2 — chefes, lojas, o pacote completo. Eu era um moleque tentando descobrir por que a engine ficava comendo meus saves. Uns anos e quatro engines depois, a resposta continua a mesma: 'porque esqueci de chamar o save.' Alguns bugs te acompanham para sempre.",
        "A maior parte dos meus jogos sai de jams — o tipo de restrição que transforma uma ideia vaga em uma coisinha pronta em 48 horas. Adoro o formato. Solo no design e código, às vezes formando dupla com amigos que cuidam da arte. Cada jogo tem o estilo dele porque cada jogo é um pequeno experimento próprio.",
        "Hoje o foco é o Restoration Frontier — um jogo cooperativo multiplayer onde robôs limpam um planeta poluído. Vários fins-de-semana longos em Unity 3D. Netcode multiplayer te ensina humildade e eu recomendo a quem quer se sentir pequeno.",
      ],
      stats: {
        class: { label: "CLASSE", value: "GAME DEV" },
        level: { label: "LV", value: "9 ANOS" },
        engines: { label: "ENGINE", value: "Unity" },
        jams: { label: "JAMS", value: "4+" },
      },
    },

    engines: {
      sectionLabel: "INVENTÁRIO · ENGINES",
      title: "FERRAMENTAS DO OFÍCIO",
      hint: "PASSE O MOUSE EM UM SLOT PARA INSPECIONAR",
      shippedLabel: "ENTREGUES",
      yearsLabel: "ANOS",
      allGamesLabel: "TODOS OS JOGOS",
      slots: {
        "Construct 2": {
          years: "2017",
          blurb: "Onde tudo começou — um plataforma 2D com lojas e chefes.",
        },
        "Clickteam Fusion 2.5": {
          years: "2018 — 2020",
          blurb: "Engine de jam. Protótipo rápido, stealth top-down, builds de fim-de-semana — até bater no teto de performance e migrar para Unity.",
        },
        "Unity 2D": {
          years: "2019 — Hoje",
          blurb: "Shooter roguelite para a GameJaaj 5 — sobreviva à maré subindo.",
        },
        "Unity 3D": {
          years: "2019 — Hoje",
          blurb: "Comecei aqui em 2019 com projetos de jam. Hoje é a casa dos projetos maiores — mais recentemente o Restoration Frontier (multiplayer, física, co-op).",
        },
      },
    },

    jams: {
      sectionLabel: "SALÃO DOS TROFÉUS · GAME JAMS",
      title: "DIÁRIO DE MISSÕES",
      themeLabel: "TEMA",
      entryLabel: "JOGO",
      hint: "CADA SELO É UMA RUN FINALIZADA",
      viewEntry: "▶ VER PÁGINA DA JAM",
    },

    contact: {
      sectionLabel: "PÔR-DO-SOL · ACAMPAMENTO",
      title: "AO REDOR DA FOGUEIRA",
      blurb: "De passagem? Mande uma mensagem — ou siga a fumaça.",
      signposts: {
        itch: "ITCH.IO",
        itchValue: "@renatogamer",
        gamejolt: "GAMEJOLT",
        gamejoltValue: "@RenatoGamer100",
        steam: "STEAM",
        steamValue: "ReGamer100",
        email: "E-MAIL",
      },
      crossLabel: "IDENTIDADE PARALELA · 01",
      crossTitle: "TAMBÉM CONSTRUINDO NO OUTRO MUNDO",
      crossBlurb: "Sistemas silenciosos, interfaces cuidadas, ofício de produção.",
      crossButton: "SALTAR PARA SOFTWARE",
      footerNote: "FEITO COM PIXELS · INTENÇÃO",
    },
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
    focusValue: "Full-Stack, entusiasta por IA.",
    sysInit: "SYS.01",
    sysInitValue: "INIT",
    actKey: "SEC.01_HERO",
    actValue: "INTRO",
    scroll: "Role",
  },

  techAct: {
    sectionLabel: "SEC.01 · ATO II",
    titleLine1: "Stack",
    titleLine2: "Técnica.",
    description: "Stack que uso para criar soluções. Segure o scroll.",
    traversal: "TRAVESSIA.TECH",
  },

  about: {
    sectionLabel: "SEC.02 · SOBRE MIM",
    titlePlain: "Curioso por padrão",
    titleEm: ", pragmático por hábito",
    portraitTag: "RETRATO.IMG",
    h3: "Entusiasta de tecnologia e IA — sempre buscando formas de afiar o que consigo construir.",
    paragraphs: [
      "A maior parte do que sei veio de construir, quebrar e reconstruir até as peças fazerem sentido. No trabalho, lidero um time de duas pessoas em uma empresa de operações marítimas onde a função de desenvolvimento era nova — então tudo, do provisionamento de servidor e Docker, passando pelo design e arquitetura dos projetos, até desenvolvimento e deploys, foi construído e é mantido do zero. É o tipo de ambiente que te força a entender cada camada, e eu passei a amar isso.",
      "Fora do trabalho, persigo o mesmo instinto em projetos pessoais. O Bitewise combina um modelo YOLOv9 treinado sob medida com um cliente React Native tipado — o celular captura, um backend Node repassa a inferência para uma workstation com GPU, e os dados nutricionais voltam por porção. O KotobaGo é um tutor de japonês local-first que usa Ollama por baixo dos panos para gerar histórias calibradas exatamente pelo seu vocabulário. O fio condutor é IA aplicada de forma pragmática — o suficiente para fazer um produto parecer inteligente sem entregar a ele as chaves.",
    ],
    sig: {
      focus: { label: "FOCO", value: "Produtos com IA, full-stack" },
      habits: { label: "HÁBITOS", value: "Entregar pequeno, dominar toda a stack" },
      learning: { label: "ESTUDANDO", value: "Padrões de projeto, aplicados" },
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
        desc: "Desenvolvedor líder em um time de duas pessoas, construindo ferramentas internas de gestão e automação de ponta a ponta. A stack envolve Next.js + TypeScript no frontend, Node.js + Express + PostgreSQL no backend, tudo containerizado com Docker atrás do Nginx. Também cuido de provisionamento de servidor, Cloudflare e gerenciamento de domínios, além de dashboards em PowerBI integrados a dados em nuvem. Os projetos mais recentes adotam Domain-Driven Design em Go. Mentoro um desenvolvedor júnior e conduzo a entrega via GitHub.",
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
        note: "Formado em dezembro de 2025 (CRA 8.6/10). TCC: Bitewise — rastreador de nutrição com IA, integrando um modelo YOLOv9 customizado a um cliente React Native tipado.",
      },
      {
        deg: "Curso Técnico de Informática para Internet integrado ao Ensino Médio",
        note: "Curso técnico integrado ao ensino médio em desenvolvimento web (HTML, CSS, JavaScript). TCC: Project Phobos — buscador colaborativo de documentos.",
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
    sectionLabel: "SEC.08 · APERTO DE MÃO",
    titleLine1: "Vamos construir",
    titleEm: "algo real.",
    crossLabel: "IDENTIDADE PARALELA · 02",
    crossH4Plain: "Também construindo em",
    crossH4Em: "outro mundo.",
    crossP:
      "Onde protótipos ganham vida — pequenos experimentos, ideias estranhas, mundos miniaturas.",
    crossBtn: "Visitar portfólio gamedev",
    footerIdentity: "IDENTIDADE_01 · ENGENHARIA",
  },
};
