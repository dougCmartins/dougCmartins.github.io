<template>
  <header class="site-header">
    <div class="site-bar">
      <nav class="nav" :aria-label="copy.nav.main">
        <a class="nav__link" href="#about">{{ copy.nav.about }}</a>
        <a class="nav__link" href="#experience">{{ copy.nav.experience }}</a>
        <a class="nav__link" href="#testimonials">{{ copy.nav.testimonials }}</a>
        <a class="nav__link" href="#contact">{{ copy.nav.contact }}</a>
      </nav>
      <div class="nav-social">
        <a :href="contact.linkedin" target="_blank" rel="noreferrer" :aria-label="copy.hero.linkedin">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a :href="`mailto:${contact.email}`" :aria-label="copy.hero.gmail">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
        <a :href="contact.github" target="_blank" rel="noreferrer" :aria-label="copy.hero.github">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
        <div ref="languageRoot" class="language-switch">
          <button
            type="button"
            class="language-trigger"
            :aria-label="copy.nav.language"
            :title="copy.nav.language"
            aria-haspopup="listbox"
            :aria-expanded="open"
            @click="open = !open"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </button>
          <ul v-show="open" class="language-menu" role="listbox" :aria-label="copy.nav.language">
            <li v-for="code in locales" :key="code">
              <button
                type="button"
                role="option"
                :aria-selected="locale === code"
                :class="{ 'is-selected': locale === code }"
                @click="choose(code)"
              >
                {{ portfolioLocaleLabels[code] }}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { contact } from '~/utils/portfolio'
import { portfolioLocaleLabels, type PortfolioLocale } from '~/utils/portfolio-copy'

const { copy, locale, locales, setLocale } = usePortfolioLocale()
const open = ref(false)
const languageRoot = ref<HTMLElement | null>(null)

function choose(code: PortfolioLocale) {
  setLocale(code)
  open.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (!languageRoot.value?.contains(event.target as Node)) {
    open.value = false
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  padding: 18px 16px;
  background: var(--color-canvas);
}

.site-bar {
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 14px 28px;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-pill);
  background: #111111;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
}

.nav__link {
  color: var(--color-text-muted);
  font-size: var(--text-body);
  text-decoration: none;
}

.nav-social {
  display: flex;
  align-items: center;
  gap: 14px;
}

.nav-social a {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  color: var(--color-text);
}

.nav-social svg {
  width: 16px;
  height: 16px;
}

.language-switch {
  position: relative;
}

.language-trigger {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  background: transparent;
  color: var(--color-text);
  cursor: pointer;
}

.language-trigger svg {
  width: 18px;
  height: 18px;
}

.language-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 2;
  margin: 0;
  padding: 6px;
  list-style: none;
  min-width: 112px;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: #141414;
}

.language-menu button {
  width: 100%;
  padding: 8px 10px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--color-text-muted);
  font: inherit;
  font-size: 13px;
  line-height: 20px;
  text-align: left;
  cursor: pointer;
}

.language-menu button.is-selected,
.language-menu button:hover {
  color: var(--color-text);
}

@media (max-width: 800px) {
  .site-bar {
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
  }

  .nav {
    gap: 16px;
  }
}
</style>
