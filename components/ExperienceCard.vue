<template>
  <NuxtLink class="experience-card hover-lift" :to="`/experience/${job.id}`">
    <div class="experience-card__media">
      <img
        :src="job.shotSmall"
        :srcset="`${job.shotSmall} 640w, ${job.shot} 1024w`"
        sizes="(max-width: 900px) 100vw, 560px"
        width="640"
        height="311"
        :alt="job.shotAlt"
        loading="lazy"
        decoding="async"
      >
    </div>
    <div class="experience-card__body">
      <p class="experience-card__period">{{ job.period }}</p>
      <div class="experience-card__head">
        <h3 class="card-title">{{ job.company }}</h3>
        <span class="experience-card__arrow" aria-hidden="true">→</span>
      </div>
      <p class="experience-card__role">{{ job.role }} · {{ job.domain }}</p>
      <p class="body">{{ job.challenge }}</p>
      <ul class="tech-row" aria-hidden="true">
        <li v-for="item in job.stack" :key="item" class="tech-tag">{{ item }}</li>
      </ul>
      <div class="experience-card__footer">
        <p v-if="highlights.length" class="experience-card__metrics">
          <span v-for="item in highlights" :key="item.value">
            <strong>{{ item.value }}</strong> {{ item.label }}
          </span>
        </p>
        <span class="experience-card__cta">
          <span class="text-muted">//</span> {{ readMore }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { jobHighlights } from '~/utils/experience'
import type { PortfolioCopy } from '~/utils/portfolio-copy'

const props = defineProps<{
  job: PortfolioCopy['experience']['jobs'][number]
  readMore: string
}>()

const highlights = computed(() => jobHighlights(props.job))
</script>
