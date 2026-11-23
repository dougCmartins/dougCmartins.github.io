<template>
  <article v-if="post" class="blog-page" aria-labelledby="post-title">
    <div class="content-width blog-article">
      <NuxtLink class="back-link" to="/blog">
        <span aria-hidden="true">←</span> {{ copy.blog.back }}
      </NuxtLink>

      <header class="blog-article__header">
        <BlogPostMeta :date="post.date" :minutes="post.readingMinutes" />
        <h1 id="post-title" class="blog-article__title">{{ post.title }}</h1>
        <p class="case-lede">{{ post.excerpt }}</p>
        <ul class="tech-row">
          <li v-for="tag in post.tags" :key="tag" class="tech-tag">#{{ tag }}</li>
        </ul>
      </header>

      <section v-for="(section, index) in post.sections" :key="index" class="article-section">
        <p class="code-divider">
          <span class="text-primary">//</span>
          <span>{{ section.label || copy.blog.articleLabel }}</span>
          <span class="code-divider__line" aria-hidden="true" />
        </p>
        <h2 class="article-heading">{{ section.heading }}</h2>
        <BlogArticleBlock v-for="(block, blockIndex) in section.blocks" :key="blockIndex" :block="block" />
      </section>

      <div v-if="post.linkedinUrl" class="case-actions">
        <a class="button button--ghost" :href="post.linkedinUrl" target="_blank" rel="noreferrer">
          {{ copy.blog.viewOnLinkedin }}
          <ButtonArrow />
        </a>
      </div>

      <NuxtLink v-if="upcoming" class="next-case hover-lift" :to="`/blog/${upcoming.slug}`">
        <span class="next-case__label"><span class="text-primary">//</span> {{ copy.blog.nextLabel }}</span>
        <span class="next-case__name">{{ upcoming.title }} <span aria-hidden="true">→</span></span>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { BlogPostPage } from '~/types/blog'

const route = useRoute()
const { copy } = usePortfolioLocale()
const siteUrl = useRuntimeConfig().public.siteUrl

const slug = computed(() => String(route.params.slug))
const { data: page } = await useFetch<BlogPostPage>(() => `/api/blog/posts/${slug.value}.json`)
const post = computed(() => page.value?.data)
const upcoming = computed(() => page.value?.meta.next)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useHead(() => ({
  title: `${post.value?.title} — ${copy.value.hero.name}`,
  meta: [
    { key: 'description', name: 'description', content: post.value?.excerpt },
    { key: 'og:type', property: 'og:type', content: 'article' },
    { key: 'og:title', property: 'og:title', content: post.value?.title },
    { key: 'og:description', property: 'og:description', content: post.value?.excerpt },
    { key: 'og:url', property: 'og:url', content: `${siteUrl}/blog/${slug.value}` },
  ],
  link: [
    { key: 'canonical', rel: 'canonical', href: `${siteUrl}/blog/${slug.value}` },
  ],
}))
</script>
