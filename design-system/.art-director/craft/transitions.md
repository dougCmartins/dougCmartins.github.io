# Transições

Três durações em `main.css`:

- `--duration-color` 150ms — cor de texto e de borda.
- `--duration-surface` 200ms — borda de card.
- `--duration-transform` 300ms — `hover-lift`, seta dos botões, zoom do print no card (500ms).

Movimento de página e de scroll:

- `.page-enter-active` / `.page-leave-active`: 280ms, opacidade + translateY (20px a entrar, −8px a sair).
- `.reveal` e `.section-heading`: `animation-timeline: view()`, sem JS. Fallback: sem animação.
- `rise-in`: só `transform`, usado no hero e no topo da página do case.

Nunca `transition: all`. Hover só em `@media (hover: hover)`. `prefers-reduced-motion: reduce` desliga animações e transforms.
