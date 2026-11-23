<template>
  <section class="blog-page" aria-labelledby="blog-title">
    <div class="content-width">
      <header class="blog-intro">
        <h1 id="blog-title" class="case-title">{{ copy.blog.title }}</h1>
        <p class="lede">{{ copy.blog.intro }}</p>
        <p v-if="copy.blog.contentLanguage" class="blog-language">{{ copy.blog.contentLanguage }}</p>
      </header>

      <p class="code-divider">
        <span class="text-primary">//</span>
        <span>{{ copy.blog.postsLabel }}</span>
        <span class="code-divider__line" aria-hidden="true" />
      </p>

      <p v-if="!blogPosts.length" class="lede">{{ copy.blog.empty }}</p>

      <div class="blog-list">
        <article v-for="post in blogPosts" :key="post.slug">
          <NuxtLink class="blog-card card hover-lift" :to="`/blog/${post.slug}`">
            <BlogPostMeta :date="post.date" :minutes="post.readingMinutes" />
            <h2 class="blog-card__title">{{ post.title }}</h2>
            <p class="blog-card__excerpt">{{ post.excerpt }}</p>
            <div class="blog-card__footer">
              <ul class="tech-row" :aria-label="copy.blog.postsLabel">
                <li v-for="tag in post.tags.slice(0, cardTagLimit)" :key="tag" class="tech-tag">#{{ tag }}</li>
              </ul>
              <span class="blog-card__cta">{{ copy.blog.readPost }} <span aria-hidden="true">→</span></span>
            </div>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { blogPosts } from '~/utils/blog'

const cardTagLimit = 3
const { copy } = usePortfolioLocale()
const siteUrl = useRuntimeConfig().public.siteUrl

useHead(() => ({
  title: `${copy.value.blog.title} — ${copy.value.hero.name}`,
  meta: [
    { key: 'description', name: 'description', content: copy.value.blog.intro },
    { key: 'og:title', property: 'og:title', content: `${copy.value.blog.title} — ${copy.value.hero.name}` },
    { key: 'og:description', property: 'og:description', content: copy.value.blog.intro },
    { key: 'og:url', property: 'og:url', content: `${siteUrl}/blog` },
  ],
  link: [
    { key: 'canonical', rel: 'canonical', href: `${siteUrl}/blog` },
  ],
}))
</script>
