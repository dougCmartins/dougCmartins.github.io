<template>
  <ParticleBackground />
  <div id="top" class="portfolio">
    <Header />
    <main>
      <NuxtPage />
    </main>
    <SiteFooter />
  </div>
  <ClientOnly>
    <LazyWelcomeDialog v-if="welcomeOpen" />
  </ClientOnly>
</template>

<script setup lang="ts">
const { welcomeOpen } = useVisitor()
</script>
