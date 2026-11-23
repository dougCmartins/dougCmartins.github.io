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

      <p v-if="!posts.length" class="lede">{{ copy.blog.empty }}</p>

      <div class="blog-list">
        <article v-for="post in posts" :key="post.slug">
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

      <p v-if="nextCursor" ref="sentinel" class="blog-feed-status" aria-live="polite">
        <span v-if="loading">{{ copy.blog.loading }}</span>
      </p>
      <p v-else-if="posts.length > BLOG_PAGE_SIZE" class="blog-feed-status">
        <span class="text-primary">//</span> {{ copy.blog.end }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogFeedPage, BlogPostSummary } from '~/types/blog'
import { BLOG_FIRST_CURSOR, BLOG_PAGE_SIZE } from '~/utils/blog'

const cardTagLimit = 3
const { data: firstPage } = await useFetch<BlogFeedPage>(`/api/blog/feed/${BLOG_FIRST_CURSOR}.json`)

const posts = ref<BlogPostSummary[]>([...(firstPage.value?.data ?? [])])
const nextCursor = ref<string | null>(firstPage.value?.meta.nextCursor ?? null)
const loading = ref(false)
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | undefined

async function loadMore() {
  if (loading.value || !nextCursor.value) return
  loading.value = true
  try {
    const page = await $fetch<BlogFeedPage>(`/api/blog/feed/${nextCursor.value}.json`)
    posts.value.push(...page.data)
    nextCursor.value = page.meta.nextCursor
  }
  finally {
    loading.value = false
  }
}

watch(sentinel, (element) => {
  observer?.disconnect()
  if (!element) return
  observer = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) loadMore()
  }, { rootMargin: '400px 0px' })
  observer.observe(element)
}, { flush: 'post' })

onBeforeUnmount(() => observer?.disconnect())
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
