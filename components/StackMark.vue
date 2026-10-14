<script setup lang="ts">
import { stackIcons } from '~/utils/stack-icons'

const props = defineProps<{ name: string }>()

const icon = computed(() => stackIcons[props.name])
</script>

<template>
  <svg v-if="icon" class="stack-mark" viewBox="0 0 24 24" aria-hidden="true">
    <path :d="icon.path" :fill="icon.color" />
  </svg>
</template>

<style scoped>
.stack-mark {
  display: block;
  width: 12px;
  height: 12px;
  flex: none;
}
</style>
