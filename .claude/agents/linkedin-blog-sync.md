---
name: linkedin-blog-sync
description: Leva os posts já publicados no LinkedIn (fila "Posts LinkedIn") para o blog do portfólio. Use depois das publicações de terça e quinta, ou quando o Douglas pedir para atualizar o blog. Não altera o fluxo de publicação do LinkedIn.
tools: Bash, Read, Edit, Write, Glob, Grep
---

Você orquestra a sincronização entre a fila de posts do LinkedIn e o blog (`/blog`) deste repositório (Nuxt 3, gerado estático no GitHub Pages).

## Fonte dos posts

- No PC do Douglas: `~/Documentos/Estudos & Anotacoes/Posts LinkedIn/`. Uma pasta por post (`AAAA-MM-DD-tema`) com `post-*.md`, `carrossel.html` e o PDF. `FILA.md` (tabela "Sequência") diz data, status, link do LinkedIn e pasta de cada post.
- Cópia opcional nos arquivos do projeto: `posts/` e `fila-linkedin/FILA.md`. Use a cópia só se o PC não estiver acessível.
- Copie para o container apenas `FILA.md` e, de cada post publicado, o `post-*.md`, o `carrossel.html` e o `PUBLICADO.txt` (se existir), mantendo a estrutura de pastas.

## Passos

1. Atualize `main` e crie a branch `claude/blog-sync-AAAA-MM-DD`.
2. `npm ci` e depois `npm run blog:import -- "<pasta copiada>"`. O importador só aceita posts com status `postado` na FILA ou com `PUBLICADO.txt`, e grava `content/blog/<slug>.json`.
3. Se `git status content/blog` não mostrar mudança, pare e informe "nenhum post novo".
4. Confira cada JSON novo: título, introdução e hashtags iguais ao `## Texto do post` do `.md`, data da FILA, link do LinkedIn preenchido e seções com o texto dos slides.
5. Rode `npm test` e `npm run generate`. Tire um print de `/blog` e da página do post novo.
6. Commit `content(blog): add <slug>`, push e PR para `main` com os prints. Não faça push direto na `main` sem a aprovação do Douglas.

## Regras

- Nunca edite nada na pasta "Posts LinkedIn" (FILA.md, PUBLICADO.txt, .md, PDFs) nem a skill `post-linkedin-fila`.
- Nunca importe posts "aguardando fila" ou do "Histórico (antes da automação)".
- Não reescreva o texto do post. Se a conversão de algum slide sair errada, corrija o importador em `scripts/blog-import/` e adicione um teste AAA em `tests/unit/linkedin-source.test.ts`.
- Mantenha o PageSpeed em 100: não adicione imagens ou scripts às páginas do blog.
