# Douglas C Martins

Portfólio pessoal de Douglas C Martins, marca DCMARTINS.CO. Site em Nuxt 3 gerado como estático (`nuxt generate`) e publicado no GitHub Pages. Apresenta quem ele é, a experiência com uma página por empresa, depoimentos, stack, formação e contato.

A página abre em português do Brasil. O seletor de idioma no header troca PT-BR, EN e ES sem recarregar. Os textos de interface ficam em `utils/portfolio-copy.ts`. Fatos compartilhados, como contato, tecnologias, links e imagens das empresas, ficam em `utils/portfolio.ts`.

## Páginas

**Home** (`pages/index.vue`), por esta ordem:

1. **Header** — marca `<dcmartins />`, âncoras Sobre, Experiência, Depoimentos e Contato, LinkedIn, Gmail, GitHub e o seletor de idioma.
2. **Hero** — disponibilidade, nome, cargo com cursor a piscar, local, resumo, tecnologias e os botões Ver projetos (GitHub), Baixar CV e LinkedIn. Retrato circular à direita.
3. **Sobre mim** — texto e focos.
4. **Experiência** — cards de Greenn, Tray, Desk360 e Cuca Fresca Informática com print, período, cargo, desafio, stack e métricas. "Ler mais" abre a página do case.
5. **Depoimentos**, **Stack**, **Formação** e **Contato**.

**Case de experiência** (`pages/experience/[id].vue`, ex.: `/experience/greenn`) — período, empresa, cargo, desafio, stack, print, resultados em cards numerados, links para o site e o LinkedIn da empresa e o próximo case. As quatro páginas são pré-renderizadas.

A navegação entre páginas usa a transição do Nuxt (`pageTransition`). Um canvas de partículas (particles.js, `public/vendor/particles.min.js`) cobre a viewport atrás do conteúdo e não é criado com `prefers-reduced-motion`.

O botão Baixar CV serve o PDF em `/cv/Douglas_da_Cruz_Martins.pdf` (fonte editável em `cv/` e espelho em `public/cv/`).

## Design

O visual segue o projeto Lovable [terminal-talent-atlas](https://github.com/dougCmartins/terminal-talent-atlas): tema escuro de terminal, grelha de fundo, rótulos `// Secção` e `/* */`, cards com elevação no hover e páginas dinâmicas. As cores continuam as do portfólio: canvas `#080808`, verde `#3f8e00`/`#62ba1b` e laranja `#ffa217`. Títulos em Raleway, rótulos em IBM Plex Mono e texto corrido na fonte do sistema.

A galeria do design system abre direto no navegador em `design-system/portfolio/index.html` e usa o mesmo `assets/css/main.css` da página publicada. As decisões ficam em `design-system/.art-director/`.

## Performance

Core Web Vitals são requisito: o PageSpeed estava em 100 no desktop e no mobile antes do redesenho, e a mudança foi medida com Lighthouse antes e depois. Regras que mantêm isso:

- Tudo pré-renderizado; o JavaScript do app só carrega depois das fontes (`server/plugins/defer-app-script.ts`).
- Prints em WebP 640w/1024w com `srcset` e `loading="lazy"` nos cards.
- Animações acima da dobra mexem só em `transform`; o resto usa `animation-timeline: view()` em CSS.
- `lighthouserc.json` define limites de LCP, CLS, TBT e peso; o workflow `Lighthouse` roda sob demanda.

## Estrutura

```text
app.vue                              partículas, header, página e rodapé
pages/index.vue                      home e metadados
pages/experience/[id].vue            página de cada experiência
components/Header.vue                marca, navegação e idioma
components/HeroPortfolio.vue         abertura
components/PortfolioSections.vue     sobre, experiência, depoimentos, stack, formação e contato
components/ExperienceCard.vue        card de experiência
components/SectionHeading.vue        cabeçalho de secção // rótulo
components/SiteFooter.vue            rodapé
components/ParticleBackground.client.vue
composables/usePortfolioLocale.ts
utils/portfolio-copy.ts              textos em PT-BR, EN e ES
utils/portfolio.ts                   contato, stacks, links e imagens
utils/experience.ts                  busca do case, próximo case e métricas
assets/css/main.css                  estilos da página publicada
design-system/                       galeria e notas de design
tests/unit/                          testes Vitest
public/                              imagens, fontes, partículas e o PDF do CV
nuxt.config.ts                       head, SEO, transição e prerender
```

## Arranque

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # testes unitários
npm run generate   # site estático em .output/public
npx serve .output/public   # ver a versão gerada
```

Docker continua disponível: `make up` sobe o serviço `frontend` na mesma porta. `make logs`, `make shell` e `make down` acompanham, entram e param o contentor.

## SEO

Título, descrição, URL canónica, Open Graph e o JSON-LD usam `NUXT_PUBLIC_SITE_URL`. Cada página de case tem título, descrição e canónica próprios. O idioma da etiqueta `lang` segue o seletor.

Em local o valor é `http://localhost:3000` (ver `.env.example`). O site publicado fica em [dougcmartins.github.io](https://dougcmartins.github.io/). O workflow de Pages define `NUXT_PUBLIC_SITE_URL` antes do `npm run generate`.

## Autor

Douglas C Martins. [GitHub](https://github.com/dougCmartins).
