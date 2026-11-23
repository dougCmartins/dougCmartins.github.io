import { paginatePosts, toSummary } from '~/utils/blog'

export default defineEventHandler(async (event) => {
  const cursor = stripJsonExtension(getRouterParam(event, 'cursor'))
  const posts = (await loadBlogPosts()).map(toSummary)
  return paginatePosts(posts, cursor)
})
