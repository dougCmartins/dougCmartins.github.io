<template>
  <p class="blog-meta">
    <span><span class="text-primary">$</span> <time :datetime="date">{{ formatPostDate(date, locale) }}</time></span>
    <span class="blog-meta__time">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
      {{ readingTimeLabel(copy.blog.readingTime, minutes) }}
    </span>
  </p>
</template>

<script setup lang="ts">
import { formatPostDate, readingTimeLabel } from '~/utils/blog'

defineProps<{
  date: string
  minutes: number
}>()

const { copy, locale } = usePortfolioLocale()
</script>
