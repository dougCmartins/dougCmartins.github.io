<template>
  <section class="hero bg-grid" aria-labelledby="hero-name">
    <div class="content-width hero-grid">
      <div class="hero-copy">
        <p class="code-label">
          <span class="code-label__mark">/*</span>
          <span class="status-dot" aria-hidden="true" />
          {{ copy.hero.availability }}
          <span class="code-label__mark">*/</span>
        </p>
        <h1 id="hero-name" class="hero-title">
          {{ copy.hero.name }}
          <span class="hero-title__role">{{ copy.hero.role }}<span class="typing-cursor" aria-hidden="true" /></span>
        </h1>
        <p class="hero-location">
          <span class="text-primary">//</span> {{ copy.hero.location }}
        </p>
        <div class="hero-summary">
          <p v-for="paragraph in copy.hero.summary" :key="paragraph" class="body">{{ paragraph }}</p>
        </div>
        <ul class="tech-row" :aria-label="copy.stack.label">
          <li v-for="item in heroStack" :key="item" class="tech-tag">{{ item }}</li>
        </ul>
        <div class="actions">
          <a class="button button--primary button--lg" :href="contact.github" target="_blank" rel="noreferrer">
            {{ copy.hero.viewProjects }}
            <ButtonArrow />
          </a>
          <a class="button button--ghost" :href="cvFile.href" :download="cvFile.downloadName">
            {{ copy.hero.downloadCv }}
            <ButtonArrow />
          </a>
          <a class="button button--ghost" :href="contact.linkedin" target="_blank" rel="noreferrer">
            {{ copy.hero.linkedin }}
            <ButtonArrow />
          </a>
        </div>
      </div>
      <picture class="portrait">
        <source
          media="(max-width: 700px)"
          type="image/avif"
          srcset="/images/douglas-c-martins-640.avif"
        >
        <source
          media="(max-width: 700px)"
          type="image/webp"
          srcset="/images/douglas-c-martins-640.webp"
        >
        <img
          src="/images/douglas-c-martins.jpg"
          width="320"
          height="320"
          fetchpriority="high"
          :alt="copy.hero.portraitAlt"
        >
      </picture>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contact, currentStack, cvFile } from '~/utils/portfolio'

const { copy } = usePortfolioLocale()

const heroStack = computed(() => [...currentStack, ...copy.value.stack.aiTools])
</script>

<style scoped>
.hero {
  position: relative;
  padding: 96px 0 88px;
  border-bottom: 1px solid var(--color-line);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 56px;
  align-items: center;
}

.hero-copy {
  animation: rise-in 0.6s ease-out both;
}

.hero-title {
  margin: 20px 0 0;
  font-family: var(--font-display);
  font-size: clamp(36px, 6vw, 58px);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.5px;
  color: var(--color-text);
}

.hero-title__role {
  display: block;
  margin-top: 8px;
  color: var(--color-text-muted);
  font-size: 0.56em;
  font-weight: 700;
  line-height: 1.25;
}

.hero-location {
  margin: 18px 0 0;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-label);
}

.hero-summary {
  display: grid;
  gap: 12px;
  max-width: 62ch;
  margin-top: 24px;
}

.tech-row {
  margin-top: 28px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-top: 32px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary-border);
  box-shadow: 0 0 10px var(--color-primary-border);
}

.portrait {
  position: relative;
  width: 300px;
  height: 300px;
  justify-self: end;
}

.portrait::after {
  content: "";
  position: absolute;
  inset: -10px;
  border: 1px dashed var(--color-line-strong);
  border-radius: 50%;
  pointer-events: none;
}

.portrait img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 18%;
  border: 1px solid var(--color-line-strong);
}

@media (max-width: 760px) {
  .hero {
    padding: 56px 0 64px;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .portrait {
    order: -1;
    width: 180px;
    height: 180px;
    margin: 10px 0 0 10px;
    justify-self: start;
  }
}
</style>
