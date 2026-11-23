import type { BlogPostPage } from '~/types/blog'
import { findPost, followingPost } from '~/utils/blog'

export default defineEventHandler(async (event): Promise<BlogPostPage> => {
  const slug = stripJsonExtension(getRouterParam(event, 'slug'))
  const posts = await loadBlogPosts()
  const post = findPost(posts, slug)

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Post not found' })
  }

  const next = followingPost(posts, slug)
  return { data: post, meta: { next: next ? { slug: next.slug, title: next.title } : null } }
})
