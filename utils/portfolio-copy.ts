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
      description: 'Douglas C Martins — Desenvolvedor Full Stack que constrói produtos digitais escaláveis com Laravel, PHP e Vue.js. Experiência em pagamentos, e-commerce, APIs e arquitetura de software.',
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
      role: 'Desenvolvedor Backend/Full Stack | PHP, Laravel, MySQL, JavaScript, Vue.js, Angular, Node.js',
      summary: 'Mais de 6 anos desenvolvendo e evoluindo aplicações web com PHP, Laravel, MySQL, JavaScript, Vue.js, Angular e Node.js, em e-commerce, pagamentos e produtos digitais, com IA no fluxo de desenvolvimento: prompts, MCP e skills.',
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
        'Desenvolvedor Backend/Full Stack com mais de 6 anos de experiência no desenvolvimento e evolução de aplicações web, com foco em PHP, Laravel, JavaScript, Vue.js e MySQL.',
        'Atuação em plataformas de e-commerce, pagamentos e produtos digitais, incluindo modernização de sistemas legados, otimização de consultas, mensageria, controle de acesso e segurança de aplicações.',
        'Experiência na evolução de sistemas legados de alta criticidade, de bases PHP para Laravel e Vue.js. Experiência na Tray, do grupo LWSA, e na Desk360, startup do grupo Locaweb.',
        'Experiência no desenvolvimento de APIs, na integração de funcionalidades e no uso de IA no dia a dia: prompts, MCP e skills para análise, implementação e revisão de código.',
        'Perfil orientado à resolução de problemas técnicos e à evolução de sistemas existentes, buscando aliar qualidade de código, confiabilidade e necessidades do negócio.',
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
          challenge: 'Assumi a evolução de componentes críticos do ecossistema financeiro e educacional, em filas, ERP, conciliação bancária, saques e segurança. Eliminei o requeue de mais de 12 mil mensagens retidas em filas críticas do RabbitMQ, com micro-jobs, e acompanhei filas e APIs com Datadog. Otimizei consultas do ERP com cursores e paginação incremental e integrei o Tutor IA, que utilizava o motor do Panda, ao fluxo de cursos, no processamento de legendas e na orquestração dos assistentes. No Cursor, skills e commands MCP entraram na análise, na implementação e na revisão.',
          siteLabel: 'Site da Greenn',
          shotAlt: 'Página inicial da Greenn',
          role: 'Desenvolvedor Back-end (autônomo)',
          period: 'fev. 2025 — set. 2026',
          linkedinLabel: 'LinkedIn da Greenn',
          impacts: [
            { value: '12 mil+', label: 'requeue no RabbitMQ' },
            { value: 'Tutor IA', label: 'legendas e assistentes' },
            { value: 'ERP', label: 'cursores e paginação' },
            { value: 'Segurança', label: 'OWASP, 2FA e ACL' },
            { value: 'Saques', label: 'GMV, chargeback e retenção' },
            { value: 'Cursor', label: 'skills e MCP' },
          ],
        },
        {
          ...sharedJobs.tray,
          domain: 'Plataforma de e-commerce',
          challenge: 'Atuei na evolução da plataforma de e-commerce, do grupo LWSA, e assumi a logística Multi-CD, o acesso de Enterprise e Top Sellers e a modernização do backoffice. Desenvolvi o roteamento e o cálculo de frete entre centros de distribuição, o ACL por IP, horário e perfil, a migração de fluxos com Strangler Fig, de PHP 5 para PHP 8, para Laravel e Vue.js e, com UX, o fluxo guiado da configuração inicial. Na investigação de produção, usei o New Relic na observabilidade.',
          siteLabel: 'Site da Tray',
          shotAlt: 'Página inicial da Tray',
          role: 'Desenvolvedor Full Stack pleno',
          period: 'out. 2021 — nov. 2024',
          linkedinLabel: 'LinkedIn da Tray',
          impacts: [
            { value: 'Multi-CD', label: 'roteamento e frete' },
            { value: 'ACL', label: 'IP, horário e perfil' },
            { value: 'Strangler Fig', label: 'PHP 5 para PHP 8' },
            { value: 'New Relic', label: 'observabilidade' },
            { value: 'Onboarding', label: 'ativação com UX' },
          ],
        },
        {
          ...sharedJobs.desk360,
          domain: 'Startup do Grupo Locaweb',
          challenge: 'Entrei na fase inicial da startup e participei da evolução da plataforma omnichannel, dos primeiros clientes de teste até mais de 400 clientes reais. Modelei APIs REST em Laravel com JSON:API e os relacionamentos em MySQL, e construí em Vue.js o atendimento, a base de conhecimento e a comunicação interna.',
          siteLabel: 'Site da Desk360',
          shotAlt: 'Banner da plataforma Desk360',
          role: 'Desenvolvedor Full Stack júnior',
          period: 'set. 2018 — set. 2021',
          linkedinLabel: 'LinkedIn da Locaweb',
          impacts: [
            { value: '400+', label: 'clientes reais' },
            { value: 'JSON:API', label: 'APIs e MySQL' },
            { value: 'Vue.js', label: 'atendimento' },
            { value: 'Base + Chat', label: 'comunicação interna' },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Desenvolvimento de software e web',
          challenge: 'Migrei a ferramenta de atendimento do desktop Clarion para a web, com Angular 4, Node.js e PostgreSQL, incluindo a distribuição de mensagens entre setores. Também ajustei sistemas em PHP e participei da refatoração do site institucional em HTML, CSS e Bootstrap.',
          siteLabel: 'Site da Cuca Fresca Informática',
          shotAlt: 'Página inicial da Cuca Fresca',
          role: 'Programador júnior',
          period: 'mar. 2017 — ago. 2018',
          linkedinLabel: 'LinkedIn da Cuca Fresca Informática',
          impacts: [
            { value: 'Web', label: 'Clarion migrado' },
            { value: 'Angular 4', label: 'mensagens entre setores' },
            { value: 'PHP', label: 'sistemas internos' },
            { value: 'Site', label: 'HTML, CSS e Bootstrap' },
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
          id: 'software-architecture',
          title: 'Fundamentos da Arquitetura de Software Moderna',
          lines: ['Alura', 'Emitida em out. de 2026'],
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
      title: 'Douglas C Martins | Full-Stack Developer — DCMARTINS.CO',
      description: 'Douglas C Martins — Full-Stack Developer building scalable digital products with Laravel, PHP and Vue.js. Experience in payments, e-commerce, APIs and software architecture.',
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
      role: 'Backend/Full Stack Developer | PHP, Laravel, MySQL, JavaScript, Vue.js, Angular, Node.js',
      summary: 'More than 6 years developing and evolving web applications with PHP, Laravel, MySQL, JavaScript, Vue.js, Angular, and Node.js, across e-commerce, payments, and digital products, with AI in the development workflow: prompts, MCP, and skills.',
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
        'Backend/Full Stack Developer with more than 6 years of experience developing and evolving web applications, focused on PHP, Laravel, JavaScript, Vue.js, and MySQL.',
        'Work across e-commerce, payments, and digital products, including legacy modernization, query optimization, messaging, access control, and application security.',
        'Experience building APIs, integrating features, and using AI day to day: prompts, MCP, and skills for analysis, implementation, and code review.',
        'Oriented toward solving technical problems and evolving existing systems, aligning code quality, reliability, and business needs.',
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
          challenge: 'I took on critical parts of the financial and education ecosystem: queues, the ERP, bank reconciliation, withdrawals, and security. I cleared the historical requeue of more than 12 thousand held messages, optimized legacy queries with cursors and incremental pagination, and integrated Tutor AI, which used the Panda engine, into the course flow, for caption processing and assistant orchestration. In Cursor, skills and MCP commands became part of analysis, implementation, and review.',
          siteLabel: 'Greenn website',
          shotAlt: 'Greenn homepage',
          role: 'Back-end Developer',
          period: 'Feb 2025 — Sep 2026',
          linkedinLabel: 'Greenn on LinkedIn',
          impacts: [
            { value: '12k+', label: 'held messages' },
            { value: 'Tutor AI', label: 'captions and assistants' },
            { value: 'ERP', label: 'cursors and pagination' },
            { value: 'Security', label: 'OWASP, 2FA, and ACL' },
            { value: 'Withdrawals', label: 'GMV, chargeback, and retention' },
            { value: 'Cursor', label: 'skills and MCP' },
          ],
        },
        {
          ...sharedJobs.tray,
          domain: 'E-commerce platform',
          challenge: 'I worked on the e-commerce platform and took on Multi-CD logistics, access for Enterprise and Top Sellers, and the backoffice modernization. I built routing and freight calculation across distribution centers, ACL by IP, schedule, and profile, the move from PHP flows to Laravel and Vue.js, and, with UX, the guided flow for the initial store setup.',
          siteLabel: 'Tray website',
          shotAlt: 'Tray homepage',
          role: 'Mid-level Full-Stack Developer',
          period: 'Oct 2021 — Nov 2024',
          linkedinLabel: 'Tray on LinkedIn',
          impacts: [
            { value: 'Multi-CD', label: 'routing and freight' },
            { value: 'ACL', label: 'IP, schedule, and profile' },
            { value: 'Laravel', label: 'flows and Vue.js' },
            { value: 'Onboarding', label: 'activation with UX' },
          ],
        },
        {
          ...sharedJobs.desk360,
          domain: 'Locaweb Group startup',
          challenge: 'I joined the startup at its initial stage and took part in the omnichannel platform as it grew from the first test customers to more than 400 real customers. I modeled REST APIs in Laravel with JSON:API and the MySQL relationships, and built the service desk, knowledge base, and internal communication in Vue.js.',
          siteLabel: 'Desk360 website',
          shotAlt: 'Desk360 platform banner',
          role: 'Junior Full-Stack Developer',
          period: 'Sep 2018 — Sep 2021',
          linkedinLabel: 'Locaweb on LinkedIn',
          impacts: [
            { value: '400+', label: 'real customers' },
            { value: 'JSON:API', label: 'APIs and MySQL' },
            { value: 'Vue.js', label: 'customer service' },
            { value: 'Base + Chat', label: 'internal communication' },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Software & web development',
          challenge: 'I migrated the customer-service tool from the Clarion desktop to the web, with Angular 4, Node.js, and PostgreSQL, including message distribution across departments. I also adjusted PHP systems and took part in the institutional site refactor in HTML, CSS, and Bootstrap.',
          siteLabel: 'Cuca Fresca Informática website',
          shotAlt: 'Cuca Fresca homepage',
          role: 'Junior Programmer',
          period: 'Mar 2017 — Aug 2018',
          linkedinLabel: 'Cuca Fresca Informática on LinkedIn',
          impacts: [
            { value: 'Web', label: 'Clarion migrated' },
            { value: 'Angular 4', label: 'messages across departments' },
            { value: 'PHP', label: 'internal systems' },
            { value: 'Site', label: 'HTML, CSS, and Bootstrap' },
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
          id: 'software-architecture',
          title: 'Fundamentals of Modern Software Architecture',
          lines: ['Alura', 'Issued Oct 2026'],
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
      description: 'Douglas C Martins — Desarrollador Full Stack que construye productos digitales escalables con Laravel, PHP y Vue.js. Experiencia en pagos, e-commerce, APIs y arquitectura de software.',
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
      role: 'Desarrollador Backend/Full Stack | PHP, Laravel, MySQL, JavaScript, Vue.js, Angular, Node.js',
      summary: 'Más de 6 años desarrollando y evolucionando aplicaciones web con PHP, Laravel, MySQL, JavaScript, Vue.js, Angular y Node.js, en e-commerce, pagos y productos digitales, con IA en el flujo de desarrollo: prompts, MCP y skills.',
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
        'Desarrollador Backend/Full Stack con más de 6 años de experiencia en el desarrollo y la evolución de aplicaciones web, con foco en PHP, Laravel, JavaScript, Vue.js y MySQL.',
        'Actuación en plataformas de e-commerce, pagos y productos digitales, incluida la modernización de sistemas legados, la optimización de consultas, la mensajería, el control de acceso y la seguridad de aplicaciones.',
        'Experiencia en el desarrollo de APIs, la integración de funcionalidades y el uso de IA en el día a día: prompts, MCP y skills para análisis, implementación y revisión de código.',
        'Perfil orientado a resolver problemas técnicos y a evolucionar sistemas existentes, aliando calidad de código, confiabilidad y necesidades del negocio.',
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
          challenge: 'Asumí la evolución de componentes críticos del ecosistema financiero y educativo, en colas, ERP, conciliación bancaria, retiros y seguridad. Eliminé el requeue histórico de más de 12 mil mensajes retenidos, optimicé consultas legadas con cursores y paginación incremental e integré el Tutor IA, que utilizaba el motor de Panda, al flujo de cursos, en el procesamiento de subtítulos y en la orquestación de los asistentes. En Cursor, skills y commands MCP entraron en el análisis, la implementación y la revisión.',
          siteLabel: 'Sitio de Greenn',
          shotAlt: 'Página de inicio de Greenn',
          role: 'Desarrollador Back-end',
          period: 'feb. 2025 — sep. 2026',
          linkedinLabel: 'LinkedIn de Greenn',
          impacts: [
            { value: '12 mil+', label: 'mensajes retenidos' },
            { value: 'Tutor IA', label: 'subtítulos y asistentes' },
            { value: 'ERP', label: 'cursores y paginación' },
            { value: 'Seguridad', label: 'OWASP, 2FA y ACL' },
            { value: 'Retiros', label: 'GMV, chargeback y retención' },
            { value: 'Cursor', label: 'skills y MCP' },
          ],
        },
        {
          ...sharedJobs.tray,
          domain: 'Plataforma de e-commerce',
          challenge: 'Actué en la evolución de la plataforma de e-commerce y asumí la logística Multi-CD, el acceso de Enterprise y Top Sellers y la modernización del backoffice. Desarrollé el enrutamiento y el cálculo de envío entre centros de distribución, el ACL por IP, horario y perfil, la migración de flujos de PHP a Laravel y Vue.js y, con UX, el flujo guiado de la configuración inicial.',
          siteLabel: 'Sitio de Tray',
          shotAlt: 'Página de inicio de Tray',
          role: 'Desarrollador Full Stack semi-senior',
          period: 'oct. 2021 — nov. 2024',
          linkedinLabel: 'LinkedIn de Tray',
          impacts: [
            { value: 'Multi-CD', label: 'enrutamiento y envío' },
            { value: 'ACL', label: 'IP, horario y perfil' },
            { value: 'Laravel', label: 'flujos y Vue.js' },
            { value: 'Onboarding', label: 'activación con UX' },
          ],
        },
        {
          ...sharedJobs.desk360,
          domain: 'Startup del Grupo Locaweb',
          challenge: 'Entré en la etapa inicial de la startup y participé en la evolución de la plataforma omnicanal, desde los primeros clientes de prueba hasta más de 400 clientes reales. Modelé APIs REST en Laravel con JSON:API y las relaciones en MySQL, y construí en Vue.js la atención, la base de conocimiento y la comunicación interna.',
          siteLabel: 'Sitio de Desk360',
          shotAlt: 'Banner de la plataforma Desk360',
          role: 'Desarrollador Full Stack júnior',
          period: 'sep. 2018 — sep. 2021',
          linkedinLabel: 'LinkedIn de Locaweb',
          impacts: [
            { value: '400+', label: 'clientes reales' },
            { value: 'JSON:API', label: 'APIs y MySQL' },
            { value: 'Vue.js', label: 'atención' },
            { value: 'Base + Chat', label: 'comunicación interna' },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Desarrollo de software y web',
          challenge: 'Migré la herramienta de atención del escritorio Clarion a la web, con Angular 4, Node.js y PostgreSQL, incluida la distribución de mensajes entre sectores. También ajusté sistemas en PHP y participé en la refactorización del sitio institucional en HTML, CSS y Bootstrap.',
          siteLabel: 'Sitio de Cuca Fresca Informática',
          shotAlt: 'Página de inicio de Cuca Fresca',
          role: 'Programador júnior',
          period: 'mar. 2017 — ago. 2018',
          linkedinLabel: 'LinkedIn de Cuca Fresca Informática',
          impacts: [
            { value: 'Web', label: 'Clarion migrado' },
            { value: 'Angular 4', label: 'mensajes entre sectores' },
            { value: 'PHP', label: 'sistemas internos' },
            { value: 'Sitio', label: 'HTML, CSS y Bootstrap' },
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
          id: 'software-architecture',
          title: 'Fundamentos de la Arquitectura de Software Moderna',
          lines: ['Alura', 'Emitido en oct. de 2026'],
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
