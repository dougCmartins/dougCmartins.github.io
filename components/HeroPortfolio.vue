<template>
  <section class="band" aria-labelledby="hero-name">
    <div class="content-width hero-grid">
      <div class="hero-copy">
        <div class="hero-status">
          <p>
            <span class="status-dot" aria-hidden="true" />
            {{ copy.hero.availability }}
          </p>
          <p>{{ copy.hero.location }}</p>
        </div>
        <h1 id="hero-name" class="display">{{ copy.hero.name }}</h1>
        <p class="hero-role">{{ copy.hero.role }}</p>
        <p v-for="paragraph in copy.hero.summary" :key="paragraph" class="body">{{ paragraph }}</p>
        <div class="logo-row" :aria-label="copy.stack.label">
          <span v-for="item in heroStack" :key="item" class="logo-chip">{{ item }}</span>
        </div>
        <div class="actions">
          <a class="button button--primary button--lg" :href="contact.github" target="_blank" rel="noreferrer">
            {{ copy.hero.viewProjects }}
            <ButtonArrow />
          </a>
          <a class="button button--primary" :href="cvFile.href" :download="cvFile.downloadName">
            {{ copy.hero.downloadCv }}
            <ButtonArrow />
          </a>
          <a class="button button--primary" :href="contact.linkedin" target="_blank" rel="noreferrer">
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
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 48px;
  align-items: center;
}

.hero-status {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin: 0 0 18px;
  color: var(--color-text-muted);
  font-size: var(--text-label);
}

.hero-status p {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary-border);
}

.hero-role {
  margin: 12px 0 0;
  color: var(--color-text);
  font-weight: 600;
}

.hero-copy .body {
  margin-top: 10px;
  max-width: 560px;
}

.logo-row {
  margin-top: 28px;
}

.actions {
  margin-top: 28px;
  align-items: center;
}

.portrait {
  width: 320px;
  height: 320px;
  justify-self: end;
}

.portrait img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 18%;
  border: 1px solid var(--color-border);
}

@media (max-width: 700px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .portrait {
    width: 240px;
    height: 240px;
    justify-self: start;
  }
}
</style>
