<template>
  <p class="visit-counter" :title="copy.visitor.counterHint">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
    <span>{{ copy.visitor.counterLabel }}</span>
    <span class="visit-counter__value" aria-live="polite">{{ formattedCount }}</span>
  </p>
</template>

<script setup lang="ts">
const { copy, locale } = usePortfolioLocale()
const { visitCount } = useVisitor()

const formattedCount = computed(() =>
  visitCount.value === null ? '—' : new Intl.NumberFormat(locale.value).format(visitCount.value),
)
</script>

<style scoped>
.visit-counter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-label);
}

.visit-counter svg {
  width: 14px;
  height: 14px;
  color: var(--color-primary-text);
}

.visit-counter__value {
  display: inline-block;
  min-width: 3ch;
  color: var(--color-primary-text);
  font-variant-numeric: tabular-nums;
}
</style>
