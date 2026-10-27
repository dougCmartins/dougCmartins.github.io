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

type StoryCopy = {
  id: string
  value?: string
  unit?: string
  before?: string
  after?: string
  beforeLabel?: string
  afterLabel?: string
  title?: string
  detail: string
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
  shotSmall: string
  shotAlt: string
  stories: readonly StoryCopy[]
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
    experience: string
    testimonials: string
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
    summary: readonly string[]
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
    readMore: string
    readLess: string
    jobs: readonly JobCopy[]
  }
  stack: {
    label: string
    title: string
    intro: readonly string[]
    groups: readonly string[]
    observability: string
    aiTools: readonly string[]
  }
  education: {
    label: string
    title: string
    academicLabel: string
    continuingLabel: string
    academic: readonly StudyCopy[]
    continuing: readonly StudyCopy[]
  }
  testimonials: {
    label: string
    title: string
    intro: string
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
  greenn: { id: 'greenn', company: 'Greenn', stack: experienceStacks.greenn, linkedin: companyLinks.greenn, site: experienceMedia.greenn.site, host: experienceMedia.greenn.host, shot: experienceMedia.greenn.shot, shotSmall: experienceMedia.greenn.shotSmall },
  tray: { id: 'tray', company: 'Tray', stack: experienceStacks.tray, linkedin: companyLinks.tray, site: experienceMedia.tray.site, host: experienceMedia.tray.host, shot: experienceMedia.tray.shot, shotSmall: experienceMedia.tray.shotSmall },
  desk360: { id: 'desk360', company: 'Desk360', stack: experienceStacks.desk360, linkedin: companyLinks.desk360, site: experienceMedia.desk360.site, host: experienceMedia.desk360.host, shot: experienceMedia.desk360.shot, shotSmall: experienceMedia.desk360.shotSmall },
  cuca: { id: 'cuca', company: 'Cuca Fresca Informática', stack: experienceStacks.cuca, linkedin: companyLinks.cuca, site: experienceMedia.cuca.site, host: experienceMedia.cuca.host, shot: experienceMedia.cuca.shot, shotSmall: experienceMedia.cuca.shotSmall },
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
      title: 'Douglas C Martins | Desenvolvedor PHP Sênior — DCMARTINS.CO',
      description: 'Douglas C Martins — Desenvolvedor PHP Sênior com 9 anos em e-commerce, pagamentos e produtos digitais. Laravel, Vue.js, RabbitMQ, performance, filas e desenvolvimento com IA.',
      shareImageAlt: 'Fundo abstrato do portfólio de Douglas C Martins',
    },
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      testimonials: 'Depoimentos',
      projects: 'Projetos',
      contact: 'Contato',
      backToTop: 'DCMARTINS.CO — Voltar ao topo',
      language: 'Idioma',
      main: 'Navegação principal',
    },
    hero: {
      availability: 'Disponível para vagas remotas',
      location: 'Pedra Azul, MG · Remoto',
      name: 'Douglas C Martins',
      role: 'Desenvolvedor PHP Sênior · Laravel e Vue.js.',
      summary: [
        'Trabalho principalmente com PHP 8, Laravel e Vue.js em e-commerce, pagamentos e produtos digitais, com cerca de 6 anos no ecossistema Locaweb/LWSA. Atuo em APIs REST, filas com RabbitMQ e Redis, integrações, otimização de consultas MySQL e observabilidade com Datadog e New Relic.',
        'Diagnostico a causa de gargalos, modernizo sistemas legados e melhoro a performance, a segurança e a confiabilidade das aplicações, com Clean Code e DDD. Reduzi uma tela financeira de 30–60 s para 2–3 s e normalizei em cerca de 2 dias uma fila com mais de 12 mil mensagens no RabbitMQ.',
        'Uso IA generativa, como Claude e Cursor, para acelerar a análise, a implementação e a revisão de código, sempre com revisão humana e responsabilidade pelas decisões técnicas.',
      ],
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
        'Sou Desenvolvedor Full Stack Sênior, com 9 anos de experiência em desenvolvimento web, e-commerce e pagamentos, atuando principalmente com PHP, Laravel e Vue.js. Tenho experiência em otimização de performance, modernização de sistemas legados, integrações e segurança.',
        'Meu foco é identificar a causa dos problemas e entregar soluções que gerem resultados concretos. Uno visão de negócio e análise técnica para priorizar soluções e valorizo a colaboração, a troca de conhecimento e a qualidade do código entregue.',
      ],
      focus: ['Performance', 'Filas e pagamentos', 'Segurança'],
    },
    experience: {
      label: 'Experiência',
      title: 'Onde transformei desafios em resultados.',
      intro: ['De plataformas de e-commerce e atendimento a pagamentos e produtos digitais, cada experiência mostra o problema, a causa e o resultado: telas financeiras mais rápidas, filas normalizadas e legados modernizados sem parar a operação.'],
      challengeLabel: 'Desafio',
      impactLabel: 'Resultados',
      readMore: 'Ler mais',
      readLess: 'Ler menos',
      jobs: [
        {
          ...sharedJobs.greenn,
          domain: 'Plataforma de vendas digitais',
          challenge: 'Plataforma de vendas digitais para infoprodutores: painel do vendedor, ERP, checkout, gateway de pagamento e área de cursos. Atuei nos times de Backoffice e Experience.',
          siteLabel: 'Site da Greenn',
          shotAlt: 'Página inicial da Greenn',
          role: 'Desenvolvedor Full Stack',
          period: 'fev. 2025 — set. 2026',
          linkedinLabel: 'LinkedIn da Greenn',
          stories: [
            {
              id: 'queue',
              value: '12 mil+',
              unit: 'mensagens',
              title: 'Fila de progresso do Club',
              detail: 'A fila que calcula a conclusão das aulas acumulou mais de 12 mil mensagens no RabbitMQ, com estouro de memória e sobrecarga do banco. Corrigi as consultas N+1 e dividi o processamento em micro-jobs. A fila foi normalizada em cerca de 2 dias.',
            },
            {
              id: 'tutor',
              value: '24 h → min',
              unit: 'sincronização',
              title: 'Integração sem webhook (Tutor IA)',
              detail: 'Projetei o orquestrador da integração com o Tutor IA, que não oferecia webhook: verificação a cada 5 minutos, máquina de estados e idempotência para evitar processamento duplicado.',
            },
            {
              id: 'withdrawals',
              before: '30–60 s',
              after: '2–3 s',
              beforeLabel: 'antes',
              afterLabel: 'depois',
              title: 'Performance e indicadores financeiros',
              detail: 'Reduzi a tela de análise de saques com índice por data, agrupamento por dia, paginação por cursor e cache da métrica da página. O financeiro passou a acompanhar TPV, chargeback e reembolso.',
            },
            {
              id: 'security',
              title: 'Segurança, Core Web Vitals e IA',
              detail: 'Restringi o upload a jpeg, png e webp, implementei 2FA, refresh tokens e ACL por ação e nível, e analisei LCP, INP e CLS do checkout no Datadog RUM. Criei Skills e Commands no Cursor, sempre com revisão humana.',
            },
          ],
        },
        {
          ...sharedJobs.tray,
          company: 'Tray (LWSA)',
          domain: 'Plataforma de e-commerce',
          challenge: 'Plataforma de e-commerce do grupo LWSA. Atuei em vários squads, como logística, Enterprise, retenção e experiência do lojista, evoluindo e sustentando a plataforma.',
          siteLabel: 'Site da Tray',
          shotAlt: 'Página inicial da Tray',
          role: 'Full Stack Developer',
          period: 'out. 2021 — nov. 2024',
          linkedinLabel: 'LinkedIn da Tray',
          stories: [
            {
              id: 'legacy',
              title: 'Modernização de legado',
              detail: 'Migrei produtos, vendas e onboarding de PHP legado para PHP 8, Laravel e Vue.js, rota por rota (Strangler Fig), sem interromper a operação das lojas.',
            },
            {
              id: 'logistics',
              title: 'Logística Multi-CD',
              detail: 'Projetei um serviço em PHP (GeoIP e cálculo de distância) que indica o centro de distribuição mais próximo do comprador quando os Correios não retornavam coordenadas.',
            },
            {
              id: 'access',
              title: 'ACL Enterprise e onboarding',
              detail: 'Desenvolvi o motor de ACL por IP, horário e perfil para Enterprise e Top Sellers e conduzi o onboarding de lojistas, da API em Laravel à interface em Vue.js.',
            },
            {
              id: 'production',
              title: 'Produção e qualidade',
              detail: 'Investiguei e resolvi incidentes com New Relic, com outros squads, e escrevi testes unitários das entregas.',
            },
          ],
        },
        {
          ...sharedJobs.desk360,
          company: 'Desk360 (Locaweb)',
          domain: 'Plataforma omnichannel de atendimento',
          challenge: 'Startup do grupo Locaweb: plataforma omnichannel de atendimento ao cliente. Participei da construção do produto, dos primeiros clientes de teste a mais de 400 clientes ativos.',
          siteLabel: 'Site da Desk360',
          shotAlt: 'Banner da plataforma Desk360',
          role: 'Full Stack Developer',
          period: 'set. 2018 — set. 2021',
          linkedinLabel: 'LinkedIn da Locaweb',
          stories: [
            {
              id: 'apis',
              detail: 'Desenvolvi APIs REST em PHP e Laravel seguindo a especificação JSON:API (MySQL) e interfaces em Vue.js e JavaScript.',
            },
            {
              id: 'features',
              detail: 'Entreguei a central de atendimento, a base de conhecimento e o chat interno, da API à interface.',
            },
            {
              id: 'product',
              detail: 'Escrevi testes automatizados das funcionalidades da plataforma.',
            },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Início da carreira em desenvolvimento web',
          challenge: 'Início da carreira em desenvolvimento web. Antes, na mesma empresa, atuei em suporte e implantação de sistemas, com contato direto com clientes e áreas internas.',
          siteLabel: 'Site da Cuca Fresca Informática',
          shotAlt: 'Página inicial da Cuca Fresca',
          role: 'Programador Computacional',
          period: 'mar. 2017 — ago. 2018',
          linkedinLabel: 'LinkedIn da Cuca Fresca Informática',
          stories: [
            {
              id: 'clarion',
              detail: 'Migrei a ferramenta de atendimento desktop (Clarion) para a web com Angular 4, Node.js e PostgreSQL, incluindo distribuição de mensagens entre setores e FAQs.',
            },
            {
              id: 'php',
              detail: 'Desenvolvi funcionalidades e correções em PHP nos sistemas web e refatorei o site institucional com HTML5, CSS e Bootstrap.',
            },
          ],
        },
      ],
    },
    stack: {
      label: 'Minhas ferramentas',
      title: 'As ferramentas certas para o trabalho.',
      intro: ['Uma base full stack.', 'Sempre aprendendo, sempre refinando.'],
      groups: ['Linguagens e frameworks', 'Dados e infraestrutura', 'Práticas e ferramentas'],
      observability: 'Observabilidade',
      aiTools: ['IA generativa', 'Engenharia de prompts'],
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
          id: 'prompt-engineering',
          title: 'Engenharia de Prompt',
          lines: ['IA Prompting, Desenvolvimento de IA generativa e mais 2 competências', 'Alura · out. 2026'],
        },
        {
          id: 'software-architecture',
          title: 'Fundamentos da Arquitetura de Software Moderna',
          lines: ['Alura · out. 2026'],
        },
        {
          id: 'english',
          title: 'Inglês',
          lines: ['Proficiência intermediária'],
        },
      ],
    },
    testimonials: {
      label: 'Depoimentos',
      title: 'Quem trabalhou comigo.',
      intro: 'Recomendações de quem liderou ou trabalhou no mesmo time.',
    },
    contactSection: {
      label: 'Vamos conversar',
      title: ['Vamos construir algo', 'que faça a diferença.'],
      summary: 'Aberto a vagas remotas de Desenvolvedor Full Stack ou Back-end Sênior (PHP/Laravel).',
      action: 'Vamos conversar',
    },
    footer: {
      rights: '© 2026 Douglas C Martins. Todos os direitos reservados.',
      backToTop: 'Voltar ao topo',
    },
  }),
  en: buildCopy('en', {
    meta: {
      title: 'Douglas C Martins | Senior PHP Developer — DCMARTINS.CO',
      description: 'Douglas C Martins — Senior PHP Developer with 9 years in e-commerce, payments, and digital products. Laravel, Vue.js, RabbitMQ, performance, queues, and AI-assisted development.',
      shareImageAlt: 'Abstract background of the Douglas C Martins portfolio',
    },
    nav: {
      about: 'About',
      experience: 'Experience',
      testimonials: 'Testimonials',
      projects: 'Projects',
      contact: 'Contact',
      backToTop: 'DCMARTINS.CO — Back to top',
      language: 'Language',
      main: 'Main navigation',
    },
    hero: {
      availability: 'Available for remote roles',
      location: 'Pedra Azul, MG · Remote',
      name: 'Douglas C Martins',
      role: 'Senior PHP Developer · Laravel and Vue.js.',
      summary: [
        'I work mainly with PHP 8, Laravel, and Vue.js in e-commerce, payments, and digital products, with about 6 years in the Locaweb/LWSA ecosystem. I build REST APIs, RabbitMQ and Redis queues, integrations, MySQL query optimization, and observability with Datadog and New Relic.',
        'I find the root cause of bottlenecks, modernize legacy systems, and improve the performance, security, and reliability of applications, with Clean Code and DDD. I cut a financial screen from 30–60 s to 2–3 s and normalized a RabbitMQ queue of more than 12,000 messages in about 2 days.',
        'I use generative AI, such as Claude and Cursor, to speed up code analysis, implementation, and review, always with human review and ownership of technical decisions.',
      ],
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
        'I am a Senior Full Stack Developer with 9 years of experience in web development, e-commerce, and payments, working mainly with PHP, Laravel, and Vue.js. I have experience in performance optimization, legacy modernization, integrations, and security.',
        'My focus is finding the root cause of problems and delivering solutions with concrete results. I combine business vision and technical analysis to prioritize, and I value collaboration, knowledge sharing, and the quality of the code I ship.',
      ],
      focus: ['Performance', 'Queues and payments', 'Security'],
    },
    experience: {
      label: 'Experience',
      title: 'Where I turned challenges into results.',
      intro: ['From e-commerce and support platforms to payments and digital products, each role shows the problem, the cause, and the result: faster financial screens, normalized queues, and legacy modernized without stopping operations.'],
      challengeLabel: 'Challenge',
      impactLabel: 'Results',
      readMore: 'Read more',
      readLess: 'Read less',
      jobs: [
        {
          ...sharedJobs.greenn,
          domain: 'Digital sales platform',
          challenge: 'Digital sales platform for info-product creators: seller dashboard, ERP, checkout, payment gateway, and course area. I worked on the Backoffice and Experience teams.',
          siteLabel: 'Greenn website',
          shotAlt: 'Greenn homepage',
          role: 'Full Stack Developer',
          period: 'Feb 2025 — Sep 2026',
          linkedinLabel: 'Greenn on LinkedIn',
          stories: [
            {
              id: 'queue',
              value: '12k+',
              unit: 'messages',
              title: 'Club progress queue',
              detail: 'The queue that tracks lesson completion piled up more than 12,000 RabbitMQ messages, blowing memory and overloading the database. I fixed the N+1 queries and split the work into micro-jobs. The queue was normalized in about 2 days.',
            },
            {
              id: 'tutor',
              value: '24 h → min',
              unit: 'sync',
              title: 'Integration without webhooks (Tutor AI)',
              detail: 'I designed the orchestrator for the Tutor AI integration, which had no webhooks: checks every 5 minutes, a state machine, and idempotency to prevent duplicate processing.',
            },
            {
              id: 'withdrawals',
              before: '30–60 s',
              after: '2–3 s',
              beforeLabel: 'before',
              afterLabel: 'after',
              title: 'Performance and financial metrics',
              detail: 'I sped up the withdrawal analysis screen with a date index, daily grouping, cursor pagination, and a cached page metric. Finance can now track TPV, chargebacks, and refunds.',
            },
            {
              id: 'security',
              title: 'Security, Core Web Vitals, and AI',
              detail: 'I restricted uploads to jpeg, png, and webp, added 2FA, refresh tokens, and ACL by action and level, and analyzed checkout LCP, INP, and CLS in Datadog RUM. I created Skills and Commands in Cursor, always with human review.',
            },
          ],
        },
        {
          ...sharedJobs.tray,
          company: 'Tray (LWSA)',
          domain: 'E-commerce platform',
          challenge: 'LWSA Group e-commerce platform. I worked across squads such as logistics, Enterprise, retention, and merchant experience, evolving and supporting the platform.',
          siteLabel: 'Tray website',
          shotAlt: 'Tray homepage',
          role: 'Full Stack Developer',
          period: 'Oct 2021 — Nov 2024',
          linkedinLabel: 'Tray on LinkedIn',
          stories: [
            {
              id: 'legacy',
              title: 'Legacy modernization',
              detail: 'I migrated products, sales, and onboarding from legacy PHP to PHP 8, Laravel, and Vue.js, route by route (Strangler Fig), without stopping store operations.',
            },
            {
              id: 'logistics',
              title: 'Multi-DC logistics',
              detail: 'I designed a PHP service (GeoIP and distance calculation) that picks the distribution center closest to the buyer when the postal service returned no coordinates.',
            },
            {
              id: 'access',
              title: 'Enterprise ACL and onboarding',
              detail: 'I built the ACL engine by IP, schedule, and profile for Enterprise and Top Sellers, and led merchant onboarding from the Laravel API to the Vue.js interface.',
            },
            {
              id: 'production',
              title: 'Production and quality',
              detail: 'I investigated and resolved incidents with New Relic alongside other squads, and wrote unit tests for my deliveries.',
            },
          ],
        },
        {
          ...sharedJobs.desk360,
          company: 'Desk360 (Locaweb)',
          domain: 'Omnichannel support platform',
          challenge: 'Locaweb Group startup: an omnichannel customer support platform. I helped build the product from the first trial customers to more than 400 active customers.',
          siteLabel: 'Desk360 website',
          shotAlt: 'Desk360 platform banner',
          role: 'Full Stack Developer',
          period: 'Sep 2018 — Sep 2021',
          linkedinLabel: 'Locaweb on LinkedIn',
          stories: [
            {
              id: 'apis',
              detail: 'I built REST APIs in PHP and Laravel following the JSON:API spec (MySQL), plus interfaces in Vue.js and JavaScript.',
            },
            {
              id: 'features',
              detail: 'I delivered the support desk, knowledge base, and internal chat, from the API to the interface.',
            },
            {
              id: 'product',
              detail: 'I wrote automated tests for the platform features.',
            },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Start of my career in web development',
          challenge: 'Start of my web development career. Before that, at the same company, I worked in systems support and rollout, in direct contact with customers and internal teams.',
          siteLabel: 'Cuca Fresca Informática website',
          shotAlt: 'Cuca Fresca homepage',
          role: 'Computational Programmer',
          period: 'Mar 2017 — Aug 2018',
          linkedinLabel: 'Cuca Fresca Informática on LinkedIn',
          stories: [
            {
              id: 'clarion',
              detail: 'I migrated the desktop support tool (Clarion) to the web with Angular 4, Node.js, and PostgreSQL, including message routing between departments and FAQs.',
            },
            {
              id: 'php',
              detail: 'I built PHP features and fixes in the web systems and refactored the company website with HTML5, CSS, and Bootstrap.',
            },
          ],
        },
      ],
    },
    stack: {
      label: 'My toolkit',
      title: 'The right tools for the job.',
      intro: ['A full-stack foundation.', 'Always learning, always refining.'],
      groups: ['Languages & frameworks', 'Data & infrastructure', 'Practices & tools'],
      observability: 'Observability',
      aiTools: ['Generative AI', 'Prompt engineering'],
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
          id: 'prompt-engineering',
          title: 'Prompt Engineering',
          lines: ['AI prompting, generative AI development, and 2 more skills', 'Alura · Oct 2026'],
        },
        {
          id: 'software-architecture',
          title: 'Modern Software Architecture Fundamentals',
          lines: ['Alura · Oct 2026'],
        },
        {
          id: 'english',
          title: 'English',
          lines: ['Intermediate proficiency'],
        },
      ],
    },
    testimonials: {
      label: 'Testimonials',
      title: 'People I have worked with.',
      intro: 'Recommendations from leads and teammates. The quotes stay in the original Portuguese.',
    },
    contactSection: {
      label: 'Let’s connect',
      title: ['Let’s build something', 'that makes a difference.'],
      summary: 'Open to remote Senior Full Stack or Back-end (PHP/Laravel) roles.',
      action: 'Let’s talk',
    },
    footer: {
      rights: '© 2026 Douglas C Martins. All rights reserved.',
      backToTop: 'Back to top',
    },
  }),
  es: buildCopy('es', {
    meta: {
      title: 'Douglas C Martins | Desarrollador PHP Sénior — DCMARTINS.CO',
      description: 'Douglas C Martins — Desarrollador PHP Sénior con 9 años en e-commerce, pagos y productos digitales. Laravel, Vue.js, RabbitMQ, rendimiento, colas y desarrollo con IA.',
      shareImageAlt: 'Fondo abstracto del portafolio de Douglas C Martins',
    },
    nav: {
      about: 'Sobre',
      experience: 'Experiencia',
      testimonials: 'Testimonios',
      projects: 'Proyectos',
      contact: 'Contacto',
      backToTop: 'DCMARTINS.CO — Volver arriba',
      language: 'Idioma',
      main: 'Navegación principal',
    },
    hero: {
      availability: 'Disponible para vacantes remotas',
      location: 'Pedra Azul, MG · Remoto',
      name: 'Douglas C Martins',
      role: 'Desarrollador PHP Sénior · Laravel y Vue.js.',
      summary: [
        'Trabajo principalmente con PHP 8, Laravel y Vue.js en e-commerce, pagos y productos digitales, con cerca de 6 años en el ecosistema Locaweb/LWSA. Actúo en APIs REST, colas con RabbitMQ y Redis, integraciones, optimización de consultas MySQL y observabilidad con Datadog y New Relic.',
        'Diagnostico la causa de los cuellos de botella, modernizo sistemas legados y mejoro el rendimiento, la seguridad y la confiabilidad de las aplicaciones, con Clean Code y DDD. Reduje una pantalla financiera de 30–60 s a 2–3 s y normalicé en cerca de 2 días una cola de más de 12 mil mensajes en RabbitMQ.',
        'Uso IA generativa, como Claude y Cursor, para acelerar el análisis, la implementación y la revisión de código, siempre con revisión humana y responsabilidad sobre las decisiones técnicas.',
      ],
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
        'Soy Desarrollador Full Stack Sénior, con 9 años de experiencia en desarrollo web, e-commerce y pagos, trabajando principalmente con PHP, Laravel y Vue.js. Tengo experiencia en optimización de rendimiento, modernización de sistemas legados, integraciones y seguridad.',
        'Mi foco es identificar la causa de los problemas y entregar soluciones con resultados concretos. Uno visión de negocio y análisis técnico para priorizar soluciones y valoro la colaboración, el intercambio de conocimiento y la calidad del código entregado.',
      ],
      focus: ['Rendimiento', 'Colas y pagos', 'Seguridad'],
    },
    experience: {
      label: 'Experiencia',
      title: 'Donde convertí desafíos en resultados.',
      intro: ['De plataformas de e-commerce y atención a pagos y productos digitales, cada experiencia muestra el problema, la causa y el resultado: pantallas financieras más rápidas, colas normalizadas y legados modernizados sin detener la operación.'],
      challengeLabel: 'Desafío',
      impactLabel: 'Resultados',
      readMore: 'Leer más',
      readLess: 'Leer menos',
      jobs: [
        {
          ...sharedJobs.greenn,
          domain: 'Plataforma de ventas digitales',
          challenge: 'Plataforma de ventas digitales para infoproductores: panel del vendedor, ERP, checkout, pasarela de pago y área de cursos. Actué en los equipos de Backoffice y Experience.',
          siteLabel: 'Sitio de Greenn',
          shotAlt: 'Página de inicio de Greenn',
          role: 'Desarrollador Full Stack',
          period: 'feb. 2025 — sep. 2026',
          linkedinLabel: 'LinkedIn de Greenn',
          stories: [
            {
              id: 'queue',
              value: '12 mil+',
              unit: 'mensajes',
              title: 'Cola de progreso del Club',
              detail: 'La cola que calcula la conclusión de las clases acumuló más de 12 mil mensajes en RabbitMQ, con desborde de memoria y sobrecarga de la base. Corregí las consultas N+1 y dividí el procesamiento en micro-jobs. La cola se normalizó en cerca de 2 días.',
            },
            {
              id: 'tutor',
              value: '24 h → min',
              unit: 'sincronización',
              title: 'Integración sin webhook (Tutor IA)',
              detail: 'Diseñé el orquestador de la integración con el Tutor IA, que no ofrecía webhook: verificación cada 5 minutos, máquina de estados e idempotencia para evitar procesamiento duplicado.',
            },
            {
              id: 'withdrawals',
              before: '30–60 s',
              after: '2–3 s',
              beforeLabel: 'antes',
              afterLabel: 'después',
              title: 'Rendimiento e indicadores financieros',
              detail: 'Aceleré la pantalla de análisis de retiros con índice por fecha, agrupación por día, paginación por cursor y caché de la métrica. Finanzas pasó a seguir TPV, contracargos y reembolsos.',
            },
            {
              id: 'security',
              title: 'Seguridad, Core Web Vitals e IA',
              detail: 'Restringí la carga a jpeg, png y webp, implementé 2FA, refresh tokens y ACL por acción y nivel, y analicé LCP, INP y CLS del checkout en Datadog RUM. Creé Skills y Commands en Cursor, siempre con revisión humana.',
            },
          ],
        },
        {
          ...sharedJobs.tray,
          company: 'Tray (LWSA)',
          domain: 'Plataforma de e-commerce',
          challenge: 'Plataforma de e-commerce del grupo LWSA. Actué en varios squads, como logística, Enterprise, retención y experiencia del comerciante, evolucionando y sosteniendo la plataforma.',
          siteLabel: 'Sitio de Tray',
          shotAlt: 'Página de inicio de Tray',
          role: 'Full Stack Developer',
          period: 'oct. 2021 — nov. 2024',
          linkedinLabel: 'LinkedIn de Tray',
          stories: [
            {
              id: 'legacy',
              title: 'Modernización de legado',
              detail: 'Migré productos, ventas y onboarding de PHP legado a PHP 8, Laravel y Vue.js, ruta por ruta (Strangler Fig), sin interrumpir la operación de las tiendas.',
            },
            {
              id: 'logistics',
              title: 'Logística Multi-CD',
              detail: 'Diseñé un servicio en PHP (GeoIP y cálculo de distancia) que indica el centro de distribución más cercano al comprador cuando Correios no devolvía coordenadas.',
            },
            {
              id: 'access',
              title: 'ACL Enterprise y onboarding',
              detail: 'Desarrollé el motor de ACL por IP, horario y perfil para Enterprise y Top Sellers y conduje el onboarding de comerciantes, de la API en Laravel a la interfaz en Vue.js.',
            },
            {
              id: 'production',
              title: 'Producción y calidad',
              detail: 'Investigué y resolví incidentes con New Relic junto a otros squads y escribí pruebas unitarias de mis entregas.',
            },
          ],
        },
        {
          ...sharedJobs.desk360,
          company: 'Desk360 (Locaweb)',
          domain: 'Plataforma omnicanal de atención',
          challenge: 'Startup del grupo Locaweb: plataforma omnicanal de atención al cliente. Participé en la construcción del producto, de los primeros clientes de prueba a más de 400 clientes activos.',
          siteLabel: 'Sitio de Desk360',
          shotAlt: 'Banner de la plataforma Desk360',
          role: 'Full Stack Developer',
          period: 'sep. 2018 — sep. 2021',
          linkedinLabel: 'LinkedIn de Locaweb',
          stories: [
            {
              id: 'apis',
              detail: 'Desarrollé APIs REST en PHP y Laravel siguiendo la especificación JSON:API (MySQL) e interfaces en Vue.js y JavaScript.',
            },
            {
              id: 'features',
              detail: 'Entregué la central de atención, la base de conocimiento y el chat interno, de la API a la interfaz.',
            },
            {
              id: 'product',
              detail: 'Escribí pruebas automatizadas de las funcionalidades de la plataforma.',
            },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Inicio de la carrera en desarrollo web',
          challenge: 'Inicio de la carrera en desarrollo web. Antes, en la misma empresa, trabajé en soporte e implantación de sistemas, en contacto directo con clientes y áreas internas.',
          siteLabel: 'Sitio de Cuca Fresca Informática',
          shotAlt: 'Página de inicio de Cuca Fresca',
          role: 'Programador Computacional',
          period: 'mar. 2017 — ago. 2018',
          linkedinLabel: 'LinkedIn de Cuca Fresca Informática',
          stories: [
            {
              id: 'clarion',
              detail: 'Migré la herramienta de atención de escritorio (Clarion) a la web con Angular 4, Node.js y PostgreSQL, incluyendo la distribución de mensajes entre sectores y FAQs.',
            },
            {
              id: 'php',
              detail: 'Desarrollé funcionalidades y correcciones en PHP en los sistemas web y refactoricé el sitio institucional con HTML5, CSS y Bootstrap.',
            },
          ],
        },
      ],
    },
    stack: {
      label: 'Mis herramientas',
      title: 'Las herramientas adecuadas para el trabajo.',
      intro: ['Una base full stack.', 'Siempre aprendiendo, siempre refinando.'],
      groups: ['Lenguajes y frameworks', 'Datos e infraestructura', 'Prácticas y herramientas'],
      observability: 'Observabilidad',
      aiTools: ['IA generativa', 'Ingeniería de prompts'],
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
          id: 'prompt-engineering',
          title: 'Ingeniería de Prompts',
          lines: ['IA Prompting, desarrollo de IA generativa y 2 competencias más', 'Alura · oct. 2026'],
        },
        {
          id: 'software-architecture',
          title: 'Fundamentos de la Arquitectura de Software Moderna',
          lines: ['Alura · oct. 2026'],
        },
        {
          id: 'english',
          title: 'Inglés',
          lines: ['Competencia intermedia'],
        },
      ],
    },
    testimonials: {
      label: 'Testimonios',
      title: 'Quienes trabajaron conmigo.',
      intro: 'Recomendaciones de quienes lideraron o trabajaron en el mismo equipo. Los textos siguen en el portugués original.',
    },
    contactSection: {
      label: 'Conectemos',
      title: ['Construyamos algo', 'que marque la diferencia.'],
      summary: 'Abierto a vacantes remotas de Desarrollador Full Stack o Back-end Sénior (PHP/Laravel).',
      action: 'Hablemos',
    },
    footer: {
      rights: '© 2026 Douglas C Martins. Todos los derechos reservados.',
      backToTop: 'Volver arriba',
    },
  }),
}
