import { companyLinks, experienceMedia, experienceStacks } from '~/utils/portfolio'

export const portfolioLocales = ['pt-BR', 'en', 'es'] as const

export type PortfolioLocale = typeof portfolioLocales[number]

export const portfolioLocaleLabels: Record<PortfolioLocale, string> = {
  'pt-BR': 'PT-BR',
  en: 'EN',
  es: 'ES',
}

const openGraphLocales: Record<PortfolioLocale, string> = {
  'pt-BR': 'pt_BR',
  en: 'en_US',
  es: 'es_ES',
}

type ImpactCopy = {
  value: string
  label: string
}

type JobCopy = {
  id: string
  company: string
  domain: string
  challenge: string
  role: string
  period: string
  stack: readonly string[]
  linkedin: string
  linkedinLabel: string
  site: string
  siteLabel: string
  host: string
  shot: string
  shotAlt: string
  impacts: readonly ImpactCopy[]
}

type StudyCopy = {
  id: string
  title: string
  lines: readonly string[]
}

export type PortfolioCopy = {
  meta: {
    title: string
    description: string
    shareImageAlt: string
    openGraphLocale: string
  }
  nav: {
    about: string
    projects: string
    contact: string
    backToTop: string
    language: string
    main: string
  }
  hero: {
    availability: string
    location: string
    name: string
    role: string
    summary: string
    viewProjects: string
    downloadCv: string
    contact: string
    portraitAlt: string
    linkedin: string
    gmail: string
    github: string
  }
  about: {
    label: string
    title: readonly string[]
    paragraphs: readonly string[]
    focus: readonly string[]
  }
  experience: {
    label: string
    title: string
    intro: readonly string[]
    challengeLabel: string
    impactLabel: string
    jobs: readonly JobCopy[]
  }
  stack: {
    label: string
    title: string
    intro: readonly string[]
    groups: readonly string[]
  }
  education: {
    label: string
    title: string
    academicLabel: string
    continuingLabel: string
    academic: readonly StudyCopy[]
    continuing: readonly StudyCopy[]
  }
  contactSection: {
    label: string
    title: readonly string[]
    summary: string
    action: string
  }
  footer: {
    rights: string
    backToTop: string
  }
}

const sharedJobs = {
  greenn: { id: 'greenn', company: 'Greenn', stack: experienceStacks.greenn, linkedin: companyLinks.greenn, site: experienceMedia.greenn.site, host: experienceMedia.greenn.host, shot: experienceMedia.greenn.shot },
  tray: { id: 'tray', company: 'Tray', stack: experienceStacks.tray, linkedin: companyLinks.tray, site: experienceMedia.tray.site, host: experienceMedia.tray.host, shot: experienceMedia.tray.shot },
  desk360: { id: 'desk360', company: 'Desk360', stack: experienceStacks.desk360, linkedin: companyLinks.desk360, site: experienceMedia.desk360.site, host: experienceMedia.desk360.host, shot: experienceMedia.desk360.shot },
  cuca: { id: 'cuca', company: 'Cuca Fresca Informática', stack: experienceStacks.cuca, linkedin: companyLinks.cuca, site: experienceMedia.cuca.site, host: experienceMedia.cuca.host, shot: experienceMedia.cuca.shot },
} as const

function buildCopy(locale: PortfolioLocale, copy: Omit<PortfolioCopy, 'meta'> & { meta: Omit<PortfolioCopy['meta'], 'openGraphLocale'> }): PortfolioCopy {
  return {
    ...copy,
    meta: {
      ...copy.meta,
      openGraphLocale: openGraphLocales[locale],
    },
  }
}

export const portfolioCopy: Record<PortfolioLocale, PortfolioCopy> = {
  'pt-BR': buildCopy('pt-BR', {
    meta: {
      title: 'Douglas C Martins | Desenvolvedor Full Stack — DCMARTINS.CO',
      description: 'Douglas C Martins — Desenvolvedor Full Stack com mais de 9 anos em e-commerce, pagamentos e produtos digitais. PHP, Laravel, Vue.js, RabbitMQ e sistemas de alta criticidade.',
      shareImageAlt: 'Fundo abstrato do portfólio de Douglas C Martins',
    },
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
      contact: 'Contato',
      backToTop: 'DCMARTINS.CO — Voltar ao topo',
      language: 'Idioma',
      main: 'Navegação principal',
    },
    hero: {
      availability: 'Disponível para freelance e tempo integral',
      location: 'Pedra Azul, MG · Remoto',
      name: 'Douglas C Martins',
      role: 'Desenvolvedor Full Stack | PHP, Laravel, Vue.js, MySQL',
      summary: 'Mais de 9 anos em sistemas de alta criticidade de e-commerce, pagamentos e produtos digitais — cerca de 6 anos no ecossistema Locaweb/LWSA. Filas (RabbitMQ), legado, performance, segurança e Vue.js, com Pest, Datadog/New Relic e Cursor no fluxo.',
      viewProjects: 'Ver projetos',
      downloadCv: 'Baixar CV',
      contact: 'Contato',
      portraitAlt: 'Douglas C Martins',
      linkedin: 'LinkedIn',
      gmail: 'Gmail',
      github: 'GitHub',
    },
    about: {
      label: 'Sobre mim',
      title: ['Código cuidadoso.', 'Impacto real.'],
      paragraphs: [
        'Desenvolvedor Full Stack com mais de 9 anos de experiência no desenvolvimento e evolução de aplicações web de alta criticidade, com foco em PHP, Laravel, MySQL, JavaScript e Vue.js.',
        'Atuação em e-commerce, pagamentos e produtos digitais — incluindo cerca de 6 anos no ecossistema Locaweb/LWSA (Desk360 e Tray) — com modernização de legados, otimização de consultas, mensageria (RabbitMQ), integração com APIs, ACL e segurança (OWASP, 2FA).',
        'APIs REST, interfaces em Vue.js/Nuxt, testes com Pest, observabilidade (Datadog e New Relic), Clean Code e DDD. Automatizo o fluxo com Cursor e Skills, com revisão humana.',
        'Perfil com autonomia ponta a ponta, senso de dono e comunicação clara com produto/UX, aliando qualidade de código, confiabilidade e necessidades do negócio.',
      ],
      focus: ['Arquitetura de software', 'Performance', 'Segurança'],
    },
    experience: {
      label: 'Experiência',
      title: 'Onde fiz a diferença.',
      intro: ['Plataformas digitais, desafios complexos', 'e a engenharia por trás deles.'],
      challengeLabel: 'Desafio',
      impactLabel: 'Impacto',
      jobs: [
        {
          ...sharedJobs.greenn,
          domain: 'Ecossistema de vendas digitais',
          challenge: 'Atuação no time de Backoffice e Experience: plataforma de vendas digitais para infoprodutores (ERP, financeiro e operações), evoluindo filas, saques, risco e experiência do produtor.',
          siteLabel: 'Site da Greenn',
          shotAlt: 'Página inicial da Greenn',
          role: 'Desenvolvedor Full Stack',
          period: 'fev. 2025 — set. 2026',
          linkedinLabel: 'LinkedIn da Greenn',
          impacts: [
            { value: '12 mil+', label: 'fila RabbitMQ zerada' },
            { value: 'Tutor IA', label: '24 h → minutos' },
            { value: 'Saques', label: '30 s–1 min → 2–3 s' },
            { value: 'TPV', label: 'chargeback e retenção' },
            { value: 'Segurança', label: 'OWASP, 2FA e ACL' },
            { value: 'Cursor', label: 'Skills e Commands' },
          ],
        },
        {
          ...sharedJobs.tray,
          domain: 'Plataforma de e-commerce (LWSA)',
          challenge: 'Atuação em múltiplos squads na evolução e sustentação da plataforma (logística, Enterprise, retenção e experiência do lojista).',
          siteLabel: 'Site da Tray',
          shotAlt: 'Página inicial da Tray',
          role: 'Full Stack Developer',
          period: 'out. 2021 — nov. 2024',
          linkedinLabel: 'LinkedIn da Tray',
          impacts: [
            { value: 'Multi-CD', label: 'GeoIP e frete' },
            { value: 'ACL', label: 'IP, horário e perfil' },
            { value: 'Strangler Fig', label: 'PHP legado → Laravel/Vue' },
            { value: 'Onboarding', label: 'API e Vue.js' },
            { value: 'New Relic', label: 'produção e squads' },
          ],
        },
        {
          ...sharedJobs.desk360,
          domain: 'Startup do grupo Locaweb',
          challenge: 'Construção e evolução de plataforma omnichannel de atendimento, dos primeiros clientes de teste a mais de 400 clientes reais.',
          siteLabel: 'Site da Desk360',
          shotAlt: 'Banner da plataforma Desk360',
          role: 'Full Stack Developer',
          period: 'set. 2018 — set. 2021',
          linkedinLabel: 'LinkedIn da Locaweb',
          impacts: [
            { value: '400+', label: 'clientes reais' },
            { value: 'JSON:API', label: 'APIs e MySQL' },
            { value: 'Vue.js', label: 'atendimento, KB e chat' },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Desenvolvimento web',
          challenge: 'Início da carreira em desenvolvimento web.',
          siteLabel: 'Site da Cuca Fresca Informática',
          shotAlt: 'Página inicial da Cuca Fresca',
          role: 'Programador Computacional 1.0',
          period: 'mar. 2017 — ago. 2018',
          linkedinLabel: 'LinkedIn da Cuca Fresca Informática',
          impacts: [
            { value: 'Clarion → web', label: 'Angular 4, Node.js, PostgreSQL' },
            { value: 'PHP', label: 'sistemas internos' },
            { value: 'Site', label: 'HTML5, CSS e Bootstrap' },
          ],
        },
      ],
    },
    stack: {
      label: 'Minhas ferramentas',
      title: 'As ferramentas certas para o trabalho.',
      intro: ['Uma base full stack.', 'Sempre aprendendo, sempre refinando.'],
      groups: ['Linguagens e frameworks', 'Dados e infraestrutura', 'Práticas e ferramentas'],
    },
    education: {
      label: 'Formação',
      title: 'Estudo, rigor e dedicação.',
      academicLabel: 'Formação acadêmica',
      continuingLabel: 'Formação contínua',
      academic: [
        {
          id: 'systems-analysis',
          title: 'Análise e Desenvolvimento de Sistemas',
          lines: ['Cruzeiro do Sul Virtual · Tecnólogo', 'ago. 2022 — abr. 2026'],
        },
        {
          id: 'internet-computing',
          title: 'Informática para Internet',
          lines: ['ETEC · Qualificação técnica', 'jan. 2015 — dez. 2017'],
        },
      ],
      continuing: [
        {
          id: 'modern-ai',
          title: 'Fundamentos da IA Moderna',
          lines: ['Machine Learning, LLMs, IA Generativa e Agentes', 'DIO · 2026'],
        },
        {
          id: 'english',
          title: 'Inglês',
          lines: ['Proficiência intermediária'],
        },
      ],
    },
    contactSection: {
      label: 'Vamos conversar',
      title: ['Vamos construir algo', 'que faça a diferença.'],
      summary: 'Disponível para freelance, tempo integral e oportunidades remotas.',
      action: 'Vamos conversar',
    },
    footer: {
      rights: '© 2026 Douglas C Martins. Todos os direitos reservados.',
      backToTop: 'Voltar ao topo',
    },
  }),
  en: buildCopy('en', {
    meta: {
      title: 'Douglas C Martins | Full Stack Developer — DCMARTINS.CO',
      description: 'Douglas C Martins — Full Stack Developer with 9+ years in e-commerce, payments, and digital products. PHP, Laravel, Vue.js, RabbitMQ, and high-criticality systems.',
      shareImageAlt: 'Abstract background of the Douglas C Martins portfolio',
    },
    nav: {
      about: 'About',
      projects: 'Projects',
      contact: 'Contact',
      backToTop: 'DCMARTINS.CO — Back to top',
      language: 'Language',
      main: 'Main navigation',
    },
    hero: {
      availability: 'Available for freelance and full-time',
      location: 'Pedra Azul, MG · Remote',
      name: 'Douglas C Martins',
      role: 'Full Stack Developer | PHP, Laravel, Vue.js, MySQL',
      summary: '9+ years on high-criticality e-commerce, payments, and digital products — about 6 years in the Locaweb/LWSA ecosystem. Queues (RabbitMQ), legacy, performance, security, and Vue.js, with Pest, Datadog/New Relic, and Cursor in the workflow.',
      viewProjects: 'View projects',
      downloadCv: 'Download CV',
      contact: 'Contact',
      portraitAlt: 'Douglas C Martins',
      linkedin: 'LinkedIn',
      gmail: 'Gmail',
      github: 'GitHub',
    },
    about: {
      label: 'About me',
      title: ['Thoughtful code.', 'Real-world impact.'],
      paragraphs: [
        'Full Stack Developer with more than 9 years building and evolving high-criticality web applications, focused on PHP, Laravel, MySQL, JavaScript, and Vue.js.',
        'Work across e-commerce, payments, and digital products — including about 6 years in the Locaweb/LWSA ecosystem (Desk360 and Tray) — with legacy modernization, query optimization, messaging (RabbitMQ), API integration, ACL, and security (OWASP, 2FA).',
        'REST APIs, Vue.js/Nuxt interfaces, Pest tests, observability (Datadog and New Relic), Clean Code, and DDD. I automate the workflow with Cursor and Skills, with human review.',
        'End-to-end ownership, clear communication with product/UX, and a focus on code quality, reliability, and business needs.',
      ],
      focus: ['Software architecture', 'Performance', 'Security'],
    },
    experience: {
      label: 'Experience',
      title: 'Where I’ve made a difference.',
      intro: ['Digital platforms, complex challenges,', 'and the engineering behind them.'],
      challengeLabel: 'Challenge',
      impactLabel: 'Impact',
      jobs: [
        {
          ...sharedJobs.greenn,
          domain: 'Digital sales ecosystem',
          challenge: 'Backoffice and Experience team: digital sales platform for info-product creators (ERP, finance, and operations), evolving queues, withdrawals, risk, and producer experience.',
          siteLabel: 'Greenn website',
          shotAlt: 'Greenn homepage',
          role: 'Full Stack Developer',
          period: 'Feb 2025 — Sep 2026',
          linkedinLabel: 'Greenn on LinkedIn',
          impacts: [
            { value: '12k+', label: 'RabbitMQ queue cleared' },
            { value: 'Tutor AI', label: '24 h → minutes' },
            { value: 'Withdrawals', label: '30 s–1 min → 2–3 s' },
            { value: 'TPV', label: 'chargeback and retention' },
            { value: 'Security', label: 'OWASP, 2FA, and ACL' },
            { value: 'Cursor', label: 'Skills and Commands' },
          ],
        },
        {
          ...sharedJobs.tray,
          domain: 'E-commerce platform (LWSA)',
          challenge: 'Multiple squads evolving and sustaining the platform (logistics, Enterprise, retention, and merchant experience).',
          siteLabel: 'Tray website',
          shotAlt: 'Tray homepage',
          role: 'Full Stack Developer',
          period: 'Oct 2021 — Nov 2024',
          linkedinLabel: 'Tray on LinkedIn',
          impacts: [
            { value: 'Multi-CD', label: 'GeoIP and freight' },
            { value: 'ACL', label: 'IP, schedule, and profile' },
            { value: 'Strangler Fig', label: 'legacy PHP → Laravel/Vue' },
            { value: 'Onboarding', label: 'API and Vue.js' },
            { value: 'New Relic', label: 'production and squads' },
          ],
        },
        {
          ...sharedJobs.desk360,
          domain: 'Locaweb Group startup',
          challenge: 'Building and evolving an omnichannel support platform from the first test customers to more than 400 real customers.',
          siteLabel: 'Desk360 website',
          shotAlt: 'Desk360 platform banner',
          role: 'Full Stack Developer',
          period: 'Sep 2018 — Sep 2021',
          linkedinLabel: 'Locaweb on LinkedIn',
          impacts: [
            { value: '400+', label: 'real customers' },
            { value: 'JSON:API', label: 'APIs and MySQL' },
            { value: 'Vue.js', label: 'support, KB, and chat' },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Web development',
          challenge: 'Start of the career in web development.',
          siteLabel: 'Cuca Fresca Informática website',
          shotAlt: 'Cuca Fresca homepage',
          role: 'Computational Programmer 1.0',
          period: 'Mar 2017 — Aug 2018',
          linkedinLabel: 'Cuca Fresca Informática on LinkedIn',
          impacts: [
            { value: 'Clarion → web', label: 'Angular 4, Node.js, PostgreSQL' },
            { value: 'PHP', label: 'internal systems' },
            { value: 'Site', label: 'HTML5, CSS, and Bootstrap' },
          ],
        },
      ],
    },
    stack: {
      label: 'My toolkit',
      title: 'The right tools for the job.',
      intro: ['A full-stack foundation.', 'Always learning, always refining.'],
      groups: ['Languages & frameworks', 'Data & infrastructure', 'Practices & tools'],
    },
    education: {
      label: 'Education',
      title: 'Study, rigor, and dedication.',
      academicLabel: 'Academic background',
      continuingLabel: 'Continuing education',
      academic: [
        {
          id: 'systems-analysis',
          title: 'Systems Analysis & Development',
          lines: ['Cruzeiro do Sul Virtual · Technology degree', 'Aug 2022 — Apr 2026'],
        },
        {
          id: 'internet-computing',
          title: 'Internet Computing',
          lines: ['ETEC · Technical qualification', 'Jan 2015 — Dec 2017'],
        },
      ],
      continuing: [
        {
          id: 'modern-ai',
          title: 'Modern AI Fundamentals',
          lines: ['Machine Learning, LLMs, Generative AI & Agents', 'DIO · 2026'],
        },
        {
          id: 'english',
          title: 'English',
          lines: ['Intermediate proficiency'],
        },
      ],
    },
    contactSection: {
      label: 'Let’s connect',
      title: ['Let’s build something', 'that makes a difference.'],
      summary: 'Available for freelance, full-time and remote opportunities.',
      action: 'Let’s talk',
    },
    footer: {
      rights: '© 2026 Douglas C Martins. All rights reserved.',
      backToTop: 'Back to top',
    },
  }),
  es: buildCopy('es', {
    meta: {
      title: 'Douglas C Martins | Desarrollador Full Stack — DCMARTINS.CO',
      description: 'Douglas C Martins — Desarrollador Full Stack con más de 9 años en e-commerce, pagos y productos digitales. PHP, Laravel, Vue.js, RabbitMQ y sistemas de alta criticidad.',
      shareImageAlt: 'Fondo abstracto del portafolio de Douglas C Martins',
    },
    nav: {
      about: 'Sobre',
      projects: 'Proyectos',
      contact: 'Contacto',
      backToTop: 'DCMARTINS.CO — Volver arriba',
      language: 'Idioma',
      main: 'Navegación principal',
    },
    hero: {
      availability: 'Disponible para freelance y tiempo completo',
      location: 'Pedra Azul, MG · Remoto',
      name: 'Douglas C Martins',
      role: 'Desarrollador Full Stack | PHP, Laravel, Vue.js, MySQL',
      summary: 'Más de 9 años en sistemas de alta criticidad de e-commerce, pagos y productos digitales — cerca de 6 años en el ecosistema Locaweb/LWSA. Colas (RabbitMQ), legado, rendimiento, seguridad y Vue.js, con Pest, Datadog/New Relic y Cursor en el flujo.',
      viewProjects: 'Ver proyectos',
      downloadCv: 'Descargar CV',
      contact: 'Contacto',
      portraitAlt: 'Douglas C Martins',
      linkedin: 'LinkedIn',
      gmail: 'Gmail',
      github: 'GitHub',
    },
    about: {
      label: 'Sobre mí',
      title: ['Código cuidadoso.', 'Impacto real.'],
      paragraphs: [
        'Desarrollador Full Stack con más de 9 años de experiencia en el desarrollo y la evolución de aplicaciones web de alta criticidad, con foco en PHP, Laravel, MySQL, JavaScript y Vue.js.',
        'Actuación en e-commerce, pagos y productos digitales — incluidos cerca de 6 años en el ecosistema Locaweb/LWSA (Desk360 y Tray) — con modernización de legados, optimización de consultas, mensajería (RabbitMQ), integración con APIs, ACL y seguridad (OWASP, 2FA).',
        'APIs REST, interfaces en Vue.js/Nuxt, tests con Pest, observabilidad (Datadog y New Relic), Clean Code y DDD. Automatizo el flujo con Cursor y Skills, con revisión humana.',
        'Perfil con autonomía de punta a punta, sentido de ownership y comunicación clara con producto/UX, aliando calidad de código, confiabilidad y necesidades del negocio.',
      ],
      focus: ['Arquitectura de software', 'Rendimiento', 'Seguridad'],
    },
    experience: {
      label: 'Experiencia',
      title: 'Donde marqué la diferencia.',
      intro: ['Plataformas digitales, desafíos complejos', 'y la ingeniería detrás de ellos.'],
      challengeLabel: 'Desafío',
      impactLabel: 'Impacto',
      jobs: [
        {
          ...sharedJobs.greenn,
          domain: 'Ecosistema de ventas digitales',
          challenge: 'Equipo de Backoffice y Experience: plataforma de ventas digitales para infoproductores (ERP, financiero y operaciones), evolucionando colas, retiros, riesgo y experiencia del productor.',
          siteLabel: 'Sitio de Greenn',
          shotAlt: 'Página de inicio de Greenn',
          role: 'Desarrollador Full Stack',
          period: 'feb. 2025 — sep. 2026',
          linkedinLabel: 'LinkedIn de Greenn',
          impacts: [
            { value: '12 mil+', label: 'cola RabbitMQ vaciada' },
            { value: 'Tutor IA', label: '24 h → minutos' },
            { value: 'Retiros', label: '30 s–1 min → 2–3 s' },
            { value: 'TPV', label: 'chargeback y retención' },
            { value: 'Seguridad', label: 'OWASP, 2FA y ACL' },
            { value: 'Cursor', label: 'Skills y Commands' },
          ],
        },
        {
          ...sharedJobs.tray,
          domain: 'Plataforma de e-commerce (LWSA)',
          challenge: 'Múltiples squads en la evolución y sostenimiento de la plataforma (logística, Enterprise, retención y experiencia del comerciante).',
          siteLabel: 'Sitio de Tray',
          shotAlt: 'Página de inicio de Tray',
          role: 'Full Stack Developer',
          period: 'oct. 2021 — nov. 2024',
          linkedinLabel: 'LinkedIn de Tray',
          impacts: [
            { value: 'Multi-CD', label: 'GeoIP y envío' },
            { value: 'ACL', label: 'IP, horario y perfil' },
            { value: 'Strangler Fig', label: 'PHP legado → Laravel/Vue' },
            { value: 'Onboarding', label: 'API y Vue.js' },
            { value: 'New Relic', label: 'producción y squads' },
          ],
        },
        {
          ...sharedJobs.desk360,
          domain: 'Startup del grupo Locaweb',
          challenge: 'Construcción y evolución de plataforma omnicanal de atención, desde los primeros clientes de prueba hasta más de 400 clientes reales.',
          siteLabel: 'Sitio de Desk360',
          shotAlt: 'Banner de la plataforma Desk360',
          role: 'Full Stack Developer',
          period: 'sep. 2018 — sep. 2021',
          linkedinLabel: 'LinkedIn de Locaweb',
          impacts: [
            { value: '400+', label: 'clientes reales' },
            { value: 'JSON:API', label: 'APIs y MySQL' },
            { value: 'Vue.js', label: 'atención, KB y chat' },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Desarrollo web',
          challenge: 'Inicio de la carrera en desarrollo web.',
          siteLabel: 'Sitio de Cuca Fresca Informática',
          shotAlt: 'Página de inicio de Cuca Fresca',
          role: 'Programador Computacional 1.0',
          period: 'mar. 2017 — ago. 2018',
          linkedinLabel: 'LinkedIn de Cuca Fresca Informática',
          impacts: [
            { value: 'Clarion → web', label: 'Angular 4, Node.js, PostgreSQL' },
            { value: 'PHP', label: 'sistemas internos' },
            { value: 'Sitio', label: 'HTML5, CSS y Bootstrap' },
          ],
        },
      ],
    },
    stack: {
      label: 'Mis herramientas',
      title: 'Las herramientas adecuadas para el trabajo.',
      intro: ['Una base full stack.', 'Siempre aprendiendo, siempre refinando.'],
      groups: ['Lenguajes y frameworks', 'Datos e infraestructura', 'Prácticas y herramientas'],
    },
    education: {
      label: 'Formación',
      title: 'Estudio, rigor y dedicación.',
      academicLabel: 'Formación académica',
      continuingLabel: 'Formación continua',
      academic: [
        {
          id: 'systems-analysis',
          title: 'Análisis y Desarrollo de Sistemas',
          lines: ['Cruzeiro do Sul Virtual · Tecnólogo', 'ago. 2022 — abr. 2026'],
        },
        {
          id: 'internet-computing',
          title: 'Informática para Internet',
          lines: ['ETEC · Cualificación técnica', 'ene. 2015 — dic. 2017'],
        },
      ],
      continuing: [
        {
          id: 'modern-ai',
          title: 'Fundamentos de la IA Moderna',
          lines: ['Machine Learning, LLMs, IA Generativa y Agentes', 'DIO · 2026'],
        },
        {
          id: 'english',
          title: 'Inglés',
          lines: ['Competencia intermedia'],
        },
      ],
    },
    contactSection: {
      label: 'Conectemos',
      title: ['Construyamos algo', 'que marque la diferencia.'],
      summary: 'Disponible para freelance, tiempo completo y oportunidades remotas.',
      action: 'Hablemos',
    },
    footer: {
      rights: '© 2026 Douglas C Martins. Todos los derechos reservados.',
      backToTop: 'Volver arriba',
    },
  }),
}
