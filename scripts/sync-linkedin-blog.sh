#!/usr/bin/env bash
# Syncs published LinkedIn posts into the blog and opens a PR to main.
# Runs on Douglas's PC (where the "Posts LinkedIn" folder lives), from cron:
#   40 9-22 * * * /path/to/repo/scripts/sync-linkedin-blog.sh >> ~/.cache/linkedin-blog-sync.log 2>&1
# Idempotent: exits without changes when there is no new published post or a sync branch
# for the same posts already exists. Never pushes to main.
set -euo pipefail

POSTS_DIR="${LINKEDIN_POSTS_DIR:-$HOME/Documentos/Estudos & Anotacoes/Posts LinkedIn}"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKTREE="${BLOG_SYNC_WORKTREE:-$HOME/.cache/linkedin-blog-sync/worktree}"

log() { echo "[$(date '+%F %T')] $*"; }

# cron runs with a minimal PATH: load nvm and common bin dirs.
export PATH="$HOME/.local/bin:/usr/local/bin:/usr/bin:/bin:$PATH"
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" >/dev/null

if [ ! -f "$POSTS_DIR/FILA.md" ]; then
  log "FILA.md not found in $POSTS_DIR, nothing to do"
  exit 0
fi

# Work in a dedicated worktree so the user's own checkout is never touched.
git -C "$REPO_DIR" fetch --quiet origin main
if [ ! -d "$WORKTREE/.git" ] && [ ! -f "$WORKTREE/.git" ]; then
  mkdir -p "$(dirname "$WORKTREE")"
  git -C "$REPO_DIR" worktree add --quiet --detach "$WORKTREE" origin/main
fi
cd "$WORKTREE"
git checkout --quiet --detach origin/main
git reset --quiet --hard origin/main
git clean --quiet -fd content/blog

[ -d node_modules ] && [ package-lock.json -ot node_modules ] || npm ci --no-audit --no-fund --silent

npm run --silent blog:import -- "$POSTS_DIR" >/dev/null

if [ -z "$(git status --porcelain content/blog)" ]; then
  log "no new published post"
  exit 0
fi

slugs="$(git status --porcelain content/blog | sed -E 's#.*content/blog/(.*)\.json#\1#' | sort | tr '\n' ' ' | sed 's/ $//')"
branch="blog-sync/$(echo "$slugs" | tr ' ' '+')"

if git ls-remote --exit-code --heads origin "$branch" >/dev/null 2>&1; then
  log "branch $branch already pushed, waiting for review"
  exit 0
fi

npm test --silent

git checkout --quiet -b "$branch"
git add content/blog
git commit --quiet -m "content(blog): sync published LinkedIn posts ($slugs)"
git push --quiet -u origin "$branch"
log "pushed $branch"

if command -v gh >/dev/null 2>&1; then
  gh pr create --base main --head "$branch" \
    --title "content(blog): $slugs" \
    --body "Posts publicados no LinkedIn importados automaticamente pelo scripts/sync-linkedin-blog.sh (FILA status postado ou PUBLICADO.txt)." \
    && log "PR opened" \
    || log "gh could not open the PR: https://github.com/dougCmartins/dougCmartins.github.io/compare/main...$branch"
else
  log "gh not installed: open the PR at https://github.com/dougCmartins/dougCmartins.github.io/compare/main...$branch"
fi
