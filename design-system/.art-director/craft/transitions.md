# Transições

Princípio lido na homepage Creative Tim UI (22 de outubro de 2026). Não é uma receita para copiar.

## O que a origem faz

- Cor em linhas. Sombra e borda no card. Transform na foto, cerca de 300ms.
- O depoimento grande entra com opacidade e um deslocamento curto. Isso depende de uma biblioteca. Aqui o equivalente possível sem biblioteca é CSS, e nesta galeria há um único depoimento: não se finge um carrossel.
- Os pontos do depoimento alargam. Esta galeria não tem pontos.

## O que não entra

`transition: all`, Motion, autoplay, fade de secção ao scroll.

## Mapa neste portfolio

Três durações:

- `--duration-color` 150ms — preenchimento e opacidade.
- `--duration-surface` 200ms — sombra e borda.
- `--duration-transform` 300ms — escala da foto e o translate de 1px no active do botão.

Cada regra lista as propriedades. Hover de apresentação só em `@media (hover: hover)`. Active (comprimir 1px) vale em toque. `prefers-reduced-motion: reduce` zera escala e translate; a troca de cor e de borda fica.
