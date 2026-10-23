# Galeria tátil

Direcção do specimen gallery em `portfolio/`. Factos de design. Não são instruções de execução.

## Keep

- Página estática em `portfolio/index.html` com as secções Type, Buttons, Tag, Navigation, Logo chip, Case study, Work card, Testimonial e Fields.
- Copy existente, âncoras e assets locais (`case-study-1.png`, `work-1.png`, `client-1.png`, logos, seta).
- Raleway no display e IBM Plex Mono no corpo. Escala em `--text-*`.
- Canvas `#080808`, folha `#ffffff`, primary `#3f8e00`, acento `#ffa217`, raios 4px / 6px / pill 60px.
- Sombra tintada do botão primary: `0 8px 15px` a 30% no controlo e 50% no large.
- Corte absoluto das fotos em `.media--case` e `.media--work`.
- Recusado como marca alheia: paleta stone/oklch, Geist, `rounded-xl` / `rounded-3xl`, carrossel com biblioteca de motion, stock externo.

## Platform and foundation

- Platform: web, HTML e CSS estáticos.
- UI foundation: primitivos locais em `portfolio/css/tokens.css`, `components.css` e `gallery.css`. Sem segunda camada de tokens.
- References opened: design-method, content-and-composition, typography-color-assets, visual-craft, existing-ui-system, implementation, responsive-interaction, direction-files.

## Content priority

1. Lead: o nome do sistema e o primeiro espécime de tipo no canvas escuro.
2. Proof: a foto do case study, o frame que a página existe para mostrar.
3. Support: tag, navegação, logos, card de trabalho, depoimento, campos.
4. Action: botões com rótulo real (View case study, Know more, Let’s get started, Submit). O carousel prev/next permanece visual, sem comportamento inventado.

## Design direction

- Main task and content priority; first look: comparar espécimes. A primeira vista é o título “Design system” e o display “Your Name Here” sobre canvas escuro. A prova material é a foto do case, não um cartaz.
- Composition and density: uma coluna de espécimes rotulados. Cada banda tem um trabalho. Não fundir numa landing contínua.
- Type roles and readability: Raleway 800 no display, título de secção e título de trabalho. IBM Plex Mono no corpo, na meta e nos controlos. Corpo 14px / 24px. Meta 12px com tracking aberto. Muted `#9c9c9c` no texto de apoio.
- Color, surfaces, and state pairs: canvas escuro, folha branca, campo `#f8f8f8`. O botão é o único volume colorido em repouso. Card e foto ficam em hairline e só levantam no hover. Focus-visible é anel de 1px `#9c9c9c` com offset 3px, desenhado na superfície à volta do controlo.
- Imagery's real role: prova do trabalho. O frame recorta; o hover aproxima 5% em 300ms. Sem foto nova.
- Interaction on this platform; small screen order: a ordem do documento mantém-se. Hover só em `(hover: hover)`. Active comprime o botão 1px em qualquer ponteiro. `prefers-reduced-motion` desliga escala e translate; cor e borda continuam.
- The one or two decisions that make this product's direction: volume verde ou âmbar só no botão; foto e card planos até o ponteiro chegar. A sombra do acento é âmbar `#ffa217`, a mesma tinta do preenchimento.

## Visual research

Live web looked at? no — leitura do código-fonte em 22 de outubro de 2026, sem render ao vivo nessa passagem.

For each source you actually saw:

- URL: ficheiros locais `ui/apps/www/app/(app)/(root)/page.tsx`, `components/showcase-masonry.tsx`, `components/examples-preview.tsx`, `components/testimonials-section.tsx`, `components/ui/button.tsx`, `components/ui/card.tsx`.
- Observation date: 2026-10-22
- Screen: homepage Creative Tim UI, masonry, grelha de exemplos, depoimento.
- Transferable principle: frame recorta a foto e o grupo faz scale curto; logos mudam de apagado para presente; sombra de card aparece no hover; borda fraca fica nítida; uma família de raio com o filho menor que o pai; transições por propriedade, não `all`.
- Do not copy: paleta, tipo, raios grandes, masonry, métricas de marketing, biblioteca de motion, fotografias remotas.

## Type and color roles

- Display / heading / body / meta: Raleway para o nome e os títulos de trabalho (reivindicação curta). IBM Plex Mono para leitura, rótulos e controlos (registo de espécime). Meta é mais pequena, não mais fraca do que o corpo no peso quando é rótulo de campo (600).
- Canvas `#080808`. Folha `#ffffff`. Campo `#f8f8f8`. Texto forte `#080808` na folha, `#ffffff` no canvas. Muted `#9c9c9c`. Hairline na folha `rgba(8, 8, 8, 0.12)`, forte no hover `rgba(8, 8, 8, 0.28)`. Hairline no canvas `#1b1b1b`, borda de frame `#484848`, borda forte `#9c9c9c`. Interactivo: primary `#3f8e00` / hover `#347800`; acento `#ffa217` / hover `#e08f0c`. Sombra de frame neutra `0 6px 16px rgba(8, 8, 8, 0.12)`, só na folha.

## Mobile / native

- Web small viewport: a coluna de espécimes continua a ser a ordem. O anel de focus fica fora do frame da foto (`overflow` só em `.media` e `.avatar`). Native: não se aplica.

## Scope matrix

| Screen / route | Task | Components | States | After nav | Check |
|---|---|---|---|---|---|
| `portfolio/index.html` | Comparar espécimes | Botão primary, accent, large, submit; media do case e do work; testimonial; logo chip | rest, hover, active, focus-visible | Âncoras no mesmo documento | Sombra do acento âmbar; foto escala só com hover e movimento permitido |

## Verification (gates, not tour counts)

- A load / function / content: run-verified. A galeria abre, Raleway e IBM Plex Mono carregam, as imagens locais resolvem. Copy e âncoras intactos.
- B craft / consistency: run-verified no estilo usado. Sombra do acento é âmbar `rgba(255, 162, 23, 0.3)`, não teal. Primary 30%, large 50%. Foto com hairline `rgba(8, 8, 8, 0.12)`. Depoimento com borda `#484848`. Chip com `#1b1b1b` e opacidade 0.3 nos logos apagados.
- C in-scope flows and states: repouso medido no browser. Hover, active e reduced-motion estão nas regras (`150ms` / `200ms` / `300ms`, escala 1.05, translate 1px). O pseudo-estado forçado não alterou o estilo usado; o screenshot ao vivo do hover não fechou.
- D platform / accessibility: focus-visible continua o anel de 1px com offset 3px. No desktop o anel dos botões não fica dentro de um ancestral com overflow que o corte. Viewport 390 foi capturado; o corte horizontal antigo do case de 892px não foi redesenhado.
- Evidence: implemented e run-verified no repouso. Inspeção visual do ficheiro de screenshot ficou parcial: verde e âmbar aparecem por volta de y=950 numa captura 1200×2200.
- Not verified: hover, active e focus vistos quadro a quadro. Contraste do texto branco sobre `#ffa217` continua o do espécime anterior.
- First representative render: canvas escuro, folha branca, botões verde e âmbar. Sem correção extra depois dessa leitura.
- Final cross-screen review: um viewport largo e um de 390. Sem revisão de hover entre espécimes.
- Delivery: complete para a captura e para o CSS pedido. A prova visual dos estados de ponteiro ficou parcial.
