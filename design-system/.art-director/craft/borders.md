# Bordas

Princípio lido na homepage Creative Tim UI (22 de outubro de 2026). Não é uma receita para copiar.

## O que a origem faz

- Card em repouso: 1px e sombra curta.
- Hover: a borda passa de meia força para cheia e a sombra cresce.
- Foto e texto separam-se por uma linha. Palco de depoimento usa borda fraca sobre superfície baça.

## O que não entra

`border-border/50` do kit, `rounded-3xl`, blur de fundo, grelha de quatro colunas.

## Mapa neste portfolio

Uma família, duas superfícies.

Folha branca (`.media` do case e do work):

- Repouso: `--color-hairline` `rgba(8, 8, 8, 0.12)`.
- Hover do artigo: `--color-hairline-strong` `rgba(8, 8, 8, 0.28)` mais `--shadow-frame`.

Canvas escuro:

- Chip de logo em repouso: `--color-border-subtle` `#1b1b1b`. Hover: `--color-border` `#484848`.
- Depoimento em repouso: `--color-border` `#484848`. Hover: `--color-border-strong` `#9c9c9c`.

O verde e o âmbar não entram na borda do card. Ficam no botão.
