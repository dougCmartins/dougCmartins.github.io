# Sombras

Princípio lido na homepage Creative Tim UI (22 de outubro de 2026). Não é uma receita para copiar.

## O que a origem faz

- O botão em repouso é quase plano. O outline usa uma sombra mínima. O hero chega a anular sombra nos botões.
- O volume do card aparece no hover (`shadow-md` / `shadow-lg`), não como brilho permanente.
- A sombra do card é neutra. A cor da marca fica no preenchimento.

## O que não entra

`shadow-xs` do kit, glow genérico em todos os cartões, paleta stone.

## Mapa neste portfolio

A voz que já existe é a sombra tintada do botão. Ela continua a ser o único volume colorido em repouso.

- Primary: `--shadow-primary` `0 8px 15px rgba(63, 142, 0, 0.3)`.
- Large: `--shadow-primary-lg` `0 8px 15px rgba(63, 142, 0, 0.5)`.
- Hover sobe: `--shadow-primary-hover` `0 12px 22px rgba(63, 142, 0, 0.5)`; large `--shadow-primary-lg-hover` `0 14px 28px rgba(63, 142, 0, 0.6)`.
- Acento: a sombra antiga `rgba(42, 176, 144, 0.1)` era teal e não pertence a `#ffa217`. Passa a `--shadow-accent` `0 8px 15px rgba(255, 162, 23, 0.3)` e no hover `--shadow-accent-hover` `0 12px 22px rgba(255, 162, 23, 0.5)`.
- Frame de foto na folha: sem sombra em repouso. Hover usa `--shadow-frame` `0 6px 16px rgba(8, 8, 8, 0.12)`, tinta do canvas, nunca o verde do botão.
- No canvas escuro a sombra preta não se lê. Depoimento e chip levantam pela borda, não por glow.
