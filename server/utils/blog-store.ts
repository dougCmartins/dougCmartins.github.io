import type { BlogPost } from '~/types/blog'
import { sortPostsByDate } from '~/utils/blog'

/** Reads every post JSON from content/blog (bundled as the "blog" server asset). */
export async function loadBlogPosts(): Promise<BlogPost[]> {
  const storage = useStorage('assets:blog')
  const keys = (await storage.getKeys()).filter(key => key.endsWith('.json'))
  const posts = await Promise.all(keys.map(key => storage.getItem<BlogPost>(key)))
  return sortPostsByDate(posts.filter((post): post is BlogPost => Boolean(post)))
}

/** Route params arrive as "<value>.json" so the prerendered files are served as JSON. */
export function stripJsonExtension(value: string | undefined): string {
  return (value ?? '').replace(/\.json$/, '')
}
