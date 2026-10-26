<template>
  <div class="section-heading">
    <p class="code-divider">
      <span class="text-primary">//</span>
      <span>{{ label }}</span>
      <span class="code-divider__line" aria-hidden="true" />
    </p>
    <h2 :id="titleId" class="section-title">{{ title }}</h2>
    <p v-if="intro" class="lede">{{ intro }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  title: string
  titleId: string
  intro?: string
}>()
</script>
