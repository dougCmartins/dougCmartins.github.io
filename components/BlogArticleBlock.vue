<template>
  <h3 v-if="block.type === 'subheading'" class="article-subheading">{{ block.text }}</h3>
  <p v-else-if="block.type === 'paragraph'" class="article-paragraph">{{ block.text }}</p>
  <p v-else-if="block.type === 'note'" class="article-note">{{ block.text }}</p>
  <p v-else-if="block.type === 'callout'" class="article-callout">{{ block.text }}</p>
  <pre v-else-if="block.type === 'code'" class="article-code"><code>{{ block.text }}</code></pre>
  <ul v-else-if="block.type === 'list'" class="article-list">
    <li v-for="item in block.items" :key="item"><span class="text-primary" aria-hidden="true">→</span> {{ item }}</li>
  </ul>
  <ol v-else-if="block.type === 'flow'" class="article-flow">
    <li v-for="step in block.steps" :key="step">{{ step }}</li>
  </ol>
  <div v-else-if="block.type === 'table'" class="article-table">
    <table>
      <thead>
        <tr><th v-for="cell in block.rows[0]" :key="cell" scope="col">{{ cell }}</th></tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in block.rows.slice(1)" :key="index">
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { BlogBlock } from '~/types/blog'

defineProps<{
  block: BlogBlock
}>()
</script>
