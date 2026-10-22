# Douglas C Martins

Portfólio pessoal de Douglas C Martins, marca DCMARTINS.CO. Uma página em Nuxt 3 apresenta quem ele é, a experiência, a stack, a formação e o contato. Não há serviços, depoimentos, blog nem métricas inventadas.

A página abre em português do Brasil. O controle de idioma no header troca PT-BR, EN e ES na mesma rota, sem navegação nova. Os textos de interface ficam em `utils/portfolio-copy.ts`. Fatos compartilhados, como contato, tecnologias e links do LinkedIn, ficam em `utils/portfolio.ts`.

## Página

A home (`pages/index.vue`) monta, por esta ordem:

1. **Header** — marca DCMARTINS.CO, âncoras Sobre, Projetos (GitHub) e Contato, e o seletor de idioma.
2. **Hero** — disponibilidade e local, nome, cargo, resumo, tecnologias em uso, ações (projetos, contato e download do CV) e LinkedIn, Gmail e GitHub. O retrato circular fica à direita.
3. **Sobre mim** — o texto do currículo, em quatro parágrafos.
4. **Experiência** — Greenn, Tray, Desk360 e Cuca Fresca Informática. O nome de cada empresa abre o LinkedIn numa nova aba.
5. **Stack** — linguagens, dados e práticas.
6. **Formação** — acadêmica e contínua.
7. **Contato** — e-mail, telefone, GitHub e LinkedIn.

Um canvas de partículas cobre a viewport inteira, atrás do conteúdo. Com `prefers-reduced-motion`, o canvas não é criado.

O botão Baixar CV serve o PDF em `/cv/Douglas_da_Cruz_Martins.pdf` (fonte editável em `cv/` e espelho em `public/cv/`).

## Como foi feito

O layout parte do [template de portfólio no Figma](https://www.figma.com/design/EHywifx2xdSK6xgwvyNylh/%F0%9F%8E%A8-Personal-Portfolio-Template--Community---c%C3%B3pia-?node-id=216-6&p=f&t=UqnDuC6dEw1qGTra-0). `design-system/portfolio/` guarda a base aplicada: tokens, componentes e a galeria. As fontes são Raleway e IBM Plex Mono. O botão primário é o verde `#3f8e00`; o de destaque é o laranja `#ffa217`.

A galeria abre direto no navegador em `design-system/portfolio/index.html` e continua com o exemplo genérico do template. O Nuxt não importa esse HTML. A página publicada é a implementação: uma rota, textos em `utils/portfolio-copy.ts` e fatos em `utils/portfolio.ts`. O currículo real é Greenn, Tray, Desk360 e Cuca Fresca Informática. Projetos aponta para o GitHub.

## Estrutura

```text
app.vue                         canvas de partículas e a página
pages/index.vue                 rota única e metadados
components/Header.vue           marca, navegação e idioma
components/HeroPortfolio.vue    abertura
components/PortfolioSections.vue  sobre, experiência, stack, formação e contato
components/ParticleBackground.client.vue
composables/usePortfolioLocale.ts
utils/portfolio-copy.ts         textos em PT-BR, EN e ES
utils/portfolio.ts              contato, stacks e links
assets/css/main.css             estilos da página publicada
design-system/portfolio/        base visual: tokens, componentes e galeria
public/                         imagens, favicon, partículas e o PDF do CV
nuxt.config.ts                  head, SEO e Nitro
```

Não há pasta `frontend/` nem API.

## Arranque

```bash
npm install
npm run dev
```

O site fica em `http://localhost:3000`.

Docker continua disponível: `make up` sobe o serviço `frontend` na mesma porta. `make logs`, `make shell` e `make down` acompanham, entram e param o contentor.

## SEO

Título, descrição, URL canónica, Open Graph e o JSON-LD usam `NUXT_PUBLIC_SITE_URL`. O idioma da etiqueta `lang` segue o seletor da página.

Em local o valor é `http://localhost:3000` (ver `.env.example`). O site publicado fica em [dougcmartins.github.io](https://dougcmartins.github.io/). O workflow de Pages define `NUXT_PUBLIC_SITE_URL` com esse endereço antes do `npm run generate`.

## Autor

Douglas C Martins. [GitHub](https://github.com/dougCmartins).
