# Terminal escuro, cores DCMARTINS.CO

Direção visual do portfólio desde out. 2026. Factos de design, não instruções de execução.

## Origem

- Estrutura, efeitos e páginas dinâmicas inspirados no projeto Lovable [terminal-talent-atlas](https://github.com/dougCmartins/terminal-talent-atlas) (styleguide em `preview--terminal-talent-atlas.lovable.app/styleguide`).
- Cores, textos, links e imagens continuam os do portfólio original. O Lovable é React; aqui tudo foi reescrito em Nuxt e CSS puro, sem Tailwind nem bibliotecas de UI.

## Keep

- Canvas escuro `#080808` em todas as secções. Não há faixas brancas.
- Verde `#3f8e00` (botão usa `#347800` para contraste AA com texto branco), verde de texto `#62ba1b`, acento laranja `#ffa217` só em períodos e rótulos de coluna.
- Raleway 800/700 nos títulos, IBM Plex Mono nos rótulos/tags/meta, fonte do sistema no texto corrido.
- Vocabulário de terminal: `/* rótulo */`, `// Secção ────`, cursor a piscar no cargo, grelha de 50px no hero e no contacto.
- particles.js num canvas fixo atrás do conteúdo; desligado com `prefers-reduced-motion`.
- Cards planos com borda `#222222`; no hover sobem 4px com sombra verde suave.

## Composição

1. Hero: rótulo de disponibilidade, nome, cargo com cursor, local, resumo, tags de stack, botões. Retrato circular com anel tracejado.
2. Sobre: título à esquerda, texto e focos à direita.
3. Experiência: grelha 2×2 de cards (print, período, cargo, desafio, stack, métricas, "Ler mais"). Cada card abre `/experience/[id]`.
4. Página do case: voltar, período, empresa, cargo, desafio, stack, print grande, resultados em cards numerados, botões de site e LinkedIn, link para o próximo case.
5. Depoimentos, ferramentas (linhas rótulo + tags), formação (2 cards), contacto centrado.

## Movimento

- Transição de página do Nuxt (`.page-*`, 280ms, opacidade + translateY).
- Entrada ao scroll com `animation-timeline: view()` (`.reveal`), sem JavaScript.
- Entradas acima da dobra (`rise-in`) mexem só em `transform`, para não atrasar LCP.
- Tudo desligado com `prefers-reduced-motion: reduce`.

## Performance (guarda-corpos)

- Páginas de case pré-renderizadas no `nuxt generate`.
- Prints das empresas em WebP 640w/1024w com `srcset`; nos cards ficam `loading="lazy"`.
- Nenhuma fonte nova: o corpo usa a fonte do sistema.
- Lighthouse local depois da mudança: desktop 100 (LCP 0,6 s, CLS 0), mobile 99–100 (LCP 1,6–1,7 s, CLS 0).

## Galeria

`design-system/portfolio/index.html` abre direto no navegador e usa `assets/css/main.css` como única fonte de estilos.
