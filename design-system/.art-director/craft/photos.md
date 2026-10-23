# Fotos

Princípio lido na homepage Creative Tim UI (22 de outubro de 2026). Não é uma receita para copiar.

## O que a origem faz

- O frame recorta: `overflow: hidden` e a imagem cobre a área.
- No hover do grupo, a imagem aproxima cerca de 5% em 300ms (`transform`, não `transition: all`).
- Logos em repouso ficam apagados e, no hover, voltam à presença.
- Avatar é círculo com borda. Overlay escuro só quando o item não está disponível.

## O que não entra

Paleta, stock remoto, `aspect-square` de produto, badge “Soon”, masonry.

## Mapa neste portfolio

- O corte absoluto de `.media--case` e `.media--work` mantém-se. O frame já tem `overflow: hidden` e `--radius-card` (6px).
- Hover de `.case-study` e `.work-card` aplica `scale(1.05)` em `--duration-transform` (300ms).
- Só em `@media (hover: hover)`. `prefers-reduced-motion: reduce` cancela a escala.
- Logos já apagados (opacidade 0.3 em `.logo-chip__muted` e `.logo-dropbox`) vão a opacidade 1 no hover do chip. Sem filtro grayscale extra: a opacidade já é o apagado.
- Avatar circular existente não muda de medida.
