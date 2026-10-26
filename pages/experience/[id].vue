<template>
  <section v-if="job" class="case-page" aria-labelledby="case-title">
    <div class="content-width case-page__inner">
      <NuxtLink class="back-link" to="/#experience">
        <span aria-hidden="true">←</span> {{ copy.nav.experience }}
      </NuxtLink>

      <header class="case-header">
        <p class="code-label">
          <span class="code-label__mark">/*</span> {{ job.period }} <span class="code-label__mark">*/</span>
        </p>
        <h1 id="case-title" class="case-title">{{ job.company }}</h1>
        <p class="case-role">{{ job.role }} · {{ job.domain }}</p>
        <p class="case-lede">{{ job.challenge }}</p>
        <ul class="tech-row">
          <li v-for="item in job.stack" :key="item" class="tech-tag">{{ item }}</li>
        </ul>
      </header>

      <figure class="case-shot">
        <img
          :src="job.shot"
          :srcset="`${job.shotSmall} 640w, ${job.shot} 1024w`"
          sizes="(max-width: 940px) 100vw, 900px"
          width="1024"
          height="498"
          :alt="job.shotAlt"
          fetchpriority="high"
        >
        <figcaption>
          <span class="text-primary">//</span> {{ job.host }}
        </figcaption>
      </figure>

      <p class="code-divider">
        <span class="text-primary">//</span>
        <span>{{ copy.experience.impactLabel }}</span>
        <span class="code-divider__line" aria-hidden="true" />
      </p>

      <ol class="story-grid" :aria-label="copy.experience.impactLabel">
        <li v-for="(story, index) in job.stories" :key="story.id" class="story card">
          <span class="story__index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <p v-if="story.before" class="story__metric">
            <strong>{{ story.before }}</strong>
            <span class="story__unit">{{ story.beforeLabel }}</span>
            <span class="story__arrow" aria-hidden="true">→</span>
            <strong>{{ story.after }}</strong>
            <span class="story__unit">{{ story.afterLabel }}</span>
          </p>
          <p v-else-if="story.value" class="story__metric">
            <strong>{{ story.value }}</strong>
            <span class="story__unit">{{ story.unit }}</span>
          </p>
          <h2 v-if="story.title" class="story__title">{{ story.title }}</h2>
          <p class="body">{{ story.detail }}</p>
        </li>
      </ol>

      <div class="case-actions">
        <a class="button button--primary" :href="job.site" target="_blank" rel="noreferrer">
          {{ job.siteLabel }}
          <ButtonArrow />
        </a>
        <a class="button button--ghost" :href="job.linkedin" target="_blank" rel="noreferrer">
          {{ job.linkedinLabel }}
          <ButtonArrow />
        </a>
      </div>

      <NuxtLink v-if="upcoming" class="next-case hover-lift" :to="`/experience/${upcoming.id}`">
        <span class="next-case__label"><span class="text-primary">//</span> {{ upcoming.period }}</span>
        <span class="next-case__name">{{ upcoming.company }} <span aria-hidden="true">→</span></span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { findJob, nextJob } from '~/utils/experience'

const route = useRoute()
const { copy } = usePortfolioLocale()
const siteUrl = useRuntimeConfig().public.siteUrl

const jobId = computed(() => String(route.params.id))
const job = computed(() => findJob(copy.value.experience.jobs, jobId.value))
const upcoming = computed(() => nextJob(copy.value.experience.jobs, jobId.value))

if (!job.value) {
  throw createError({ statusCode: 404, statusMessage: 'Experience not found', fatal: true })
}

useHead(() => ({
  title: `${job.value?.company} — ${copy.value.hero.name}`,
  meta: [
    { key: 'description', name: 'description', content: job.value?.challenge },
    { key: 'og:title', property: 'og:title', content: `${job.value?.company} — ${copy.value.hero.name}` },
    { key: 'og:description', property: 'og:description', content: job.value?.challenge },
    { key: 'og:url', property: 'og:url', content: `${siteUrl}/experience/${jobId.value}` },
  ],
  link: [
    { key: 'canonical', rel: 'canonical', href: `${siteUrl}/experience/${jobId.value}` },
  ],
}))
</script>
