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
      experience: 'Experiência',
      testimonials: 'Depoimentos',
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
      role: 'Engenharia de software potencializada por IA.',
      summary: [
        'Trabalho principalmente com PHP, Laravel, JavaScript, Vue.js e MySQL, atuando em APIs, interfaces, integrações, processamento assíncrono e otimização de sistemas. Tenho experiência com mensageria, testes automatizados, segurança de aplicações e observabilidade em produção.',
        'Na prática, também incorporo IA generativa e engenharia de prompts ao ciclo de desenvolvimento. Utilizo modelos de linguagem para apoiar a análise de código, explorar soluções, implementar mudanças e revisar resultados, fornecendo contexto arquitetural e mantendo a validação técnica sob responsabilidade humana.',
        'Mais do que acelerar tarefas, busco integrar essas ferramentas a um processo de engenharia consistente, com atenção à qualidade, à manutenção e aos impactos das decisões técnicas.',
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
        'Sou Desenvolvedor Full Stack com mais de 9 anos de experiência na evolução de aplicações web para e-commerce, pagamentos e produtos digitais. Minha trajetória é marcada por desafios que exigem investigação técnica, visão de produto e responsabilidade sobre sistemas em produção.',
        'Gosto de entender o problema antes de propor a solução, seja para modernizar um legado, melhorar a performance ou tornar uma operação mais confiável. Meu objetivo é transformar necessidades reais do negócio em software sustentável, seguro e eficiente.',
      ],
      focus: ['Arquitetura de software', 'Performance', 'Segurança'],
    },
    experience: {
      label: 'Experiência',
      title: 'Onde transformei desafios em resultados.',
      intro: ['De plataformas de e-commerce e atendimento a operações financeiras e produtos digitais, minha trajetória é marcada pela evolução de sistemas, resolução de gargalos e melhorias com impacto real no negócio.'],
      challengeLabel: 'Desafio',
      impactLabel: 'Resultados',
      readMore: 'Ler mais',
      readLess: 'Ler menos',
      jobs: [
        {
          ...sharedJobs.greenn,
          domain: 'Ecossistema de vendas digitais',
          challenge: 'Atuei nos times de Backoffice e Experience, evoluindo sistemas que sustentam operações financeiras, saques, cursos e a experiência de infoprodutores.',
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
              title: 'Filas e processamento',
              detail: 'Eliminei o acúmulo de mais de 12 mil mensagens no RabbitMQ, dividindo o processamento em micro-jobs e evitando carregar arquivos grandes inteiros na memória. A fila foi zerada em cerca de dois dias.',
            },
            {
              id: 'tutor',
              value: '24 h → min',
              unit: 'sincronização',
              title: 'Integração com IA',
              detail: 'Desenvolvi a orquestração da integração com o Tutor IA, contornando a ausência de webhooks com reconciliação periódica, controle de estados e idempotência.',
            },
            {
              id: 'withdrawals',
              before: '30–60 s',
              after: '2–3 s',
              beforeLabel: 'antes',
              afterLabel: 'depois',
              title: 'Performance e operação financeira',
              detail: 'Otimizei consultas MySQL e a paginação da listagem de saques do ERP, reduzindo o tempo de resposta para poucos segundos e viabilizando a consulta de métricas financeiras.',
            },
            {
              id: 'security',
              title: 'Segurança, confiabilidade e IA no desenvolvimento',
              detail: 'Reforcei validações de upload, autenticação e controle de acesso. Também criei Skills, Commands e prompts reutilizáveis para apoiar análise, implementação e revisão de código com IA generativa, contexto arquitetural e validação humana.',
            },
          ],
        },
        {
          ...sharedJobs.tray,
          company: 'Tray (LWSA)',
          domain: 'Plataforma de e-commerce',
          challenge: 'Trabalhei em diferentes frentes da plataforma, da logística à experiência do lojista, conciliando evolução de produto com sustentação de sistemas em produção.',
          siteLabel: 'Site da Tray',
          shotAlt: 'Página inicial da Tray',
          role: 'Full Stack Developer',
          period: 'out. 2021 — nov. 2024',
          linkedinLabel: 'LinkedIn da Tray',
          stories: [
            {
              id: 'legacy',
              title: 'Modernização de legado',
              detail: 'Migrei fluxos de Backoffice de PHP legado para PHP 8, Laravel e Vue.js, com migração de dados e adoção gradual do padrão Strangler Fig.',
            },
            {
              id: 'logistics',
              title: 'Logística inteligente',
              detail: 'Desenvolvi um serviço de geolocalização para ajudar a selecionar o centro de distribuição mais próximo do comprador.',
            },
            {
              id: 'access',
              title: 'Controle de acesso e experiência',
              detail: 'Implementei regras de acesso por IP, horário e perfil e conduzi o onboarding de lojistas da API à interface.',
            },
            {
              id: 'production',
              title: 'Produção',
              detail: 'Investiguei incidentes com New Relic em colaboração com outros squads.',
            },
          ],
        },
        {
          ...sharedJobs.desk360,
          company: 'Desk360 (Locaweb)',
          domain: 'Plataforma omnichannel de atendimento',
          challenge: 'Participei da evolução de uma startup do grupo Locaweb, contribuindo para transformar uma plataforma em estágio inicial em um produto utilizado por mais de 400 clientes ativos.',
          siteLabel: 'Site da Desk360',
          shotAlt: 'Banner da plataforma Desk360',
          role: 'Full Stack Developer',
          period: 'set. 2018 — set. 2021',
          linkedinLabel: 'LinkedIn da Locaweb',
          stories: [
            {
              id: 'apis',
              detail: 'Desenvolvi APIs REST com Laravel e JSON:API, além de interfaces em Vue.js.',
            },
            {
              id: 'features',
              detail: 'Entreguei funcionalidades para central de atendimento, base de conhecimento e chat interno.',
            },
            {
              id: 'product',
              detail: 'Atuei tanto no back-end quanto no front-end, conectando as necessidades do produto à implementação.',
            },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Início da carreira em desenvolvimento web',
          challenge: 'Foi onde comecei a transformar sistemas existentes em soluções web, construindo uma base full stack que combina back-end, interfaces e bancos de dados.',
          siteLabel: 'Site da Cuca Fresca Informática',
          shotAlt: 'Página inicial da Cuca Fresca',
          role: 'Programador Computacional',
          period: 'mar. 2017 — ago. 2018',
          linkedinLabel: 'LinkedIn da Cuca Fresca Informática',
          stories: [
            {
              id: 'clarion',
              detail: 'Migrei uma ferramenta interna de atendimento desktop, desenvolvida em Clarion, para uma aplicação web com Angular 4, Node.js e PostgreSQL.',
            },
            {
              id: 'php',
              detail: 'Desenvolvi funcionalidades em PHP e trabalhei na evolução de páginas com HTML5, CSS e Bootstrap.',
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
      experience: 'Experience',
      testimonials: 'Testimonials',
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
      role: 'Software engineering amplified by AI.',
      summary: [
        'I work mainly with PHP, Laravel, JavaScript, Vue.js, and MySQL, across APIs, interfaces, integrations, asynchronous processing, and system optimization. I have experience with messaging, automated tests, application security, and production observability.',
        'In practice, I also bring generative AI and prompt engineering into the development cycle. I use language models to support code analysis, explore solutions, implement changes, and review results, providing architectural context and keeping technical validation under human responsibility.',
        'More than speeding up tasks, I aim to integrate these tools into a consistent engineering process, with attention to quality, maintenance, and the impact of technical decisions.',
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
        'I am a Full Stack Developer with more than 9 years of experience evolving web applications for e-commerce, payments, and digital products. My path is marked by challenges that require technical investigation, product vision, and responsibility for systems in production.',
        'I like to understand the problem before proposing a solution, whether that means modernizing a legacy system, improving performance, or making an operation more reliable. My goal is to turn real business needs into sustainable, secure, and efficient software.',
      ],
      focus: ['Software architecture', 'Performance', 'Security'],
    },
    experience: {
      label: 'Experience',
      title: 'Where I turned challenges into results.',
      intro: ['From e-commerce and support platforms to financial operations and digital products, my path is marked by evolving systems, clearing bottlenecks, and improvements with real business impact.'],
      challengeLabel: 'Challenge',
      impactLabel: 'Results',
      readMore: 'Read more',
      readLess: 'Read less',
      jobs: [
        {
          ...sharedJobs.greenn,
          domain: 'Digital sales ecosystem',
          challenge: 'I worked on the Backoffice and Experience teams, evolving the systems behind financial operations, withdrawals, courses, and the experience of info-product creators.',
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
              title: 'Queues and processing',
              detail: 'I cleared a backlog of more than 12,000 RabbitMQ messages by splitting the work into micro-jobs and avoiding loading entire large files into memory. The queue was drained in about two days.',
            },
            {
              id: 'tutor',
              value: '24 h → min',
              unit: 'sync',
              title: 'AI integration',
              detail: 'I built the orchestration for the Tutor AI integration, working around the lack of webhooks with periodic reconciliation, state control, and idempotency.',
            },
            {
              id: 'withdrawals',
              before: '30–60 s',
              after: '2–3 s',
              beforeLabel: 'before',
              afterLabel: 'after',
              title: 'Performance and financial operations',
              detail: 'I optimized MySQL queries and the pagination of the ERP withdrawal list, bringing response time down to a few seconds and making financial metrics queryable.',
            },
            {
              id: 'security',
              title: 'Security, reliability, and AI in development',
              detail: 'I strengthened upload validation, authentication, and access control. I also created reusable Skills, Commands, and prompts to support code analysis, implementation, and review with generative AI, architectural context, and human validation.',
            },
          ],
        },
        {
          ...sharedJobs.tray,
          company: 'Tray (LWSA)',
          domain: 'E-commerce platform',
          challenge: 'I worked across the platform, from logistics to the merchant experience, balancing product evolution with production support.',
          siteLabel: 'Tray website',
          shotAlt: 'Tray homepage',
          role: 'Full Stack Developer',
          period: 'Oct 2021 — Nov 2024',
          linkedinLabel: 'Tray on LinkedIn',
          stories: [
            {
              id: 'legacy',
              title: 'Legacy modernization',
              detail: 'I migrated Backoffice flows from legacy PHP to PHP 8, Laravel, and Vue.js, with data migration and a gradual Strangler Fig adoption.',
            },
            {
              id: 'logistics',
              title: 'Smarter logistics',
              detail: 'I built a geolocation service to help select the distribution center closest to the buyer.',
            },
            {
              id: 'access',
              title: 'Access control and experience',
              detail: 'I implemented access rules by IP, schedule, and profile, and led merchant onboarding from the API to the interface.',
            },
            {
              id: 'production',
              title: 'Production',
              detail: 'I investigated incidents with New Relic alongside other squads.',
            },
          ],
        },
        {
          ...sharedJobs.desk360,
          company: 'Desk360 (Locaweb)',
          domain: 'Omnichannel support platform',
          challenge: 'I took part in evolving a Locaweb Group startup, helping turn an early-stage platform into a product used by more than 400 active customers.',
          siteLabel: 'Desk360 website',
          shotAlt: 'Desk360 platform banner',
          role: 'Full Stack Developer',
          period: 'Sep 2018 — Sep 2021',
          linkedinLabel: 'Locaweb on LinkedIn',
          stories: [
            {
              id: 'apis',
              detail: 'I built REST APIs with Laravel and JSON:API, plus Vue.js interfaces.',
            },
            {
              id: 'features',
              detail: 'I delivered features for the support desk, knowledge base, and internal chat.',
            },
            {
              id: 'product',
              detail: 'I worked on both back end and front end, connecting product needs to the implementation.',
            },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Start of my career in web development',
          challenge: 'This is where I started turning existing systems into web products, building a full-stack base that combines back end, interfaces, and databases.',
          siteLabel: 'Cuca Fresca Informática website',
          shotAlt: 'Cuca Fresca homepage',
          role: 'Computational Programmer',
          period: 'Mar 2017 — Aug 2018',
          linkedinLabel: 'Cuca Fresca Informática on LinkedIn',
          stories: [
            {
              id: 'clarion',
              detail: 'I migrated an internal desktop support tool, built in Clarion, to a web application with Angular 4, Node.js, and PostgreSQL.',
            },
            {
              id: 'php',
              detail: 'I built PHP features and evolved pages with HTML5, CSS, and Bootstrap.',
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
      experience: 'Experiencia',
      testimonials: 'Testimonios',
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
      role: 'Ingeniería de software potenciada por IA.',
      summary: [
        'Trabajo principalmente con PHP, Laravel, JavaScript, Vue.js y MySQL, en APIs, interfaces, integraciones, procesamiento asíncrono y optimización de sistemas. Tengo experiencia con mensajería, pruebas automatizadas, seguridad de aplicaciones y observabilidad en producción.',
        'En la práctica, también incorporo IA generativa e ingeniería de prompts al ciclo de desarrollo. Uso modelos de lenguaje para apoyar el análisis de código, explorar soluciones, implementar cambios y revisar resultados, aportando contexto arquitectónico y manteniendo la validación técnica bajo responsabilidad humana.',
        'Más que acelerar tareas, busco integrar estas herramientas en un proceso de ingeniería consistente, con atención a la calidad, al mantenimiento y a los impactos de las decisiones técnicas.',
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
        'Soy Desarrollador Full Stack con más de 9 años de experiencia en la evolución de aplicaciones web para e-commerce, pagos y productos digitales. Mi trayectoria está marcada por desafíos que exigen investigación técnica, visión de producto y responsabilidad sobre sistemas en producción.',
        'Me gusta entender el problema antes de proponer la solución, ya sea para modernizar un legado, mejorar el rendimiento o hacer una operación más confiable. Mi objetivo es transformar necesidades reales del negocio en software sostenible, seguro y eficiente.',
      ],
      focus: ['Arquitectura de software', 'Rendimiento', 'Seguridad'],
    },
    experience: {
      label: 'Experiencia',
      title: 'Donde convertí desafíos en resultados.',
      intro: ['De plataformas de e-commerce y atención a operaciones financieras y productos digitales, mi trayectoria está marcada por la evolución de sistemas, la resolución de cuellos de botella y mejoras con impacto real en el negocio.'],
      challengeLabel: 'Desafío',
      impactLabel: 'Resultados',
      readMore: 'Leer más',
      readLess: 'Leer menos',
      jobs: [
        {
          ...sharedJobs.greenn,
          domain: 'Ecosistema de ventas digitales',
          challenge: 'Actué en los equipos de Backoffice y Experience, evolucionando sistemas que sostienen operaciones financieras, retiros, cursos y la experiencia de infoproductores.',
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
              title: 'Colas y procesamiento',
              detail: 'Eliminé la acumulación de más de 12 mil mensajes en RabbitMQ, dividiendo el procesamiento en micro-jobs y evitando cargar archivos grandes enteros en memoria. La cola quedó vacía en cerca de dos días.',
            },
            {
              id: 'tutor',
              value: '24 h → min',
              unit: 'sincronización',
              title: 'Integración con IA',
              detail: 'Desarrollé la orquestación de la integración con el Tutor IA, sorteando la ausencia de webhooks con reconciliación periódica, control de estados e idempotencia.',
            },
            {
              id: 'withdrawals',
              before: '30–60 s',
              after: '2–3 s',
              beforeLabel: 'antes',
              afterLabel: 'después',
              title: 'Rendimiento y operación financiera',
              detail: 'Optimicé consultas MySQL y la paginación del listado de retiros del ERP, reduciendo el tiempo de respuesta a pocos segundos y haciendo viable la consulta de métricas financieras.',
            },
            {
              id: 'security',
              title: 'Seguridad, confiabilidad e IA en el desarrollo',
              detail: 'Reforcé validaciones de carga, autenticación y control de acceso. También creé Skills, Commands y prompts reutilizables para apoyar el análisis, la implementación y la revisión de código con IA generativa, contexto arquitectónico y validación humana.',
            },
          ],
        },
        {
          ...sharedJobs.tray,
          company: 'Tray (LWSA)',
          domain: 'Plataforma de e-commerce',
          challenge: 'Trabajé en distintos frentes de la plataforma, de la logística a la experiencia del comerciante, conciliando la evolución del producto con el sostenimiento de sistemas en producción.',
          siteLabel: 'Sitio de Tray',
          shotAlt: 'Página de inicio de Tray',
          role: 'Full Stack Developer',
          period: 'oct. 2021 — nov. 2024',
          linkedinLabel: 'LinkedIn de Tray',
          stories: [
            {
              id: 'legacy',
              title: 'Modernización de legado',
              detail: 'Migré flujos de Backoffice de PHP legado a PHP 8, Laravel y Vue.js, con migración de datos y adopción gradual del patrón Strangler Fig.',
            },
            {
              id: 'logistics',
              title: 'Logística inteligente',
              detail: 'Desarrollé un servicio de geolocalización para ayudar a seleccionar el centro de distribución más cercano al comprador.',
            },
            {
              id: 'access',
              title: 'Control de acceso y experiencia',
              detail: 'Implementé reglas de acceso por IP, horario y perfil y conduje el onboarding de comerciantes de la API a la interfaz.',
            },
            {
              id: 'production',
              title: 'Producción',
              detail: 'Investigué incidentes con New Relic en colaboración con otros squads.',
            },
          ],
        },
        {
          ...sharedJobs.desk360,
          company: 'Desk360 (Locaweb)',
          domain: 'Plataforma omnicanal de atención',
          challenge: 'Participé en la evolución de una startup del grupo Locaweb, contribuyendo a transformar una plataforma en etapa inicial en un producto usado por más de 400 clientes activos.',
          siteLabel: 'Sitio de Desk360',
          shotAlt: 'Banner de la plataforma Desk360',
          role: 'Full Stack Developer',
          period: 'sep. 2018 — sep. 2021',
          linkedinLabel: 'LinkedIn de Locaweb',
          stories: [
            {
              id: 'apis',
              detail: 'Desarrollé APIs REST con Laravel y JSON:API, además de interfaces en Vue.js.',
            },
            {
              id: 'features',
              detail: 'Entregué funcionalidades para la central de atención, la base de conocimiento y el chat interno.',
            },
            {
              id: 'product',
              detail: 'Actué tanto en el back-end como en el front-end, conectando las necesidades del producto con la implementación.',
            },
          ],
        },
        {
          ...sharedJobs.cuca,
          domain: 'Inicio de la carrera en desarrollo web',
          challenge: 'Fue donde empecé a transformar sistemas existentes en soluciones web, construyendo una base full stack que combina back-end, interfaces y bases de datos.',
          siteLabel: 'Sitio de Cuca Fresca Informática',
          shotAlt: 'Página de inicio de Cuca Fresca',
          role: 'Programador Computacional',
          period: 'mar. 2017 — ago. 2018',
          linkedinLabel: 'LinkedIn de Cuca Fresca Informática',
          stories: [
            {
              id: 'clarion',
              detail: 'Migré una herramienta interna de atención de escritorio, desarrollada en Clarion, a una aplicación web con Angular 4, Node.js y PostgreSQL.',
            },
            {
              id: 'php',
              detail: 'Desarrollé funcionalidades en PHP y trabajé en la evolución de páginas con HTML5, CSS y Bootstrap.',
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
      summary: 'Disponible para freelance, tiempo completo y oportunidades remotas.',
      action: 'Hablemos',
    },
    footer: {
      rights: '© 2026 Douglas C Martins. Todos los derechos reservados.',
      backToTop: 'Volver arriba',
    },
  }),
}
