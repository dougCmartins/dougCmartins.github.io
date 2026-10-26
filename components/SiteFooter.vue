<template>
  <footer class="site-footer">
    <div class="content-width footer-inner">
      <NuxtLink class="brand-footer" to="/">DCMARTINS.CO</NuxtLink>
      <span>{{ copy.footer.rights }}</span>
      <NuxtLink class="link-underline" to="/#top">{{ copy.footer.backToTop }}</NuxtLink>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { copy } = usePortfolioLocale()
</script>
