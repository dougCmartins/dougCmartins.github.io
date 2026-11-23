import type { BlogFeedPage, BlogPost, BlogPostSummary } from '~/types/blog'

export const BLOG_PAGE_SIZE = 5
export const BLOG_FIRST_CURSOR = 'latest'

export function sortPostsByDate<T extends Pick<BlogPost, 'date'>>(posts: readonly T[]): T[] {
  return [...posts].sort((first, second) => second.date.localeCompare(first.date))
}

export function toSummary({ sections: _sections, ...summary }: BlogPost): BlogPostSummary {
  return summary
}

/**
 * Cursor pagination over posts sorted newest first. The cursor is the slug of the last post
 * already shown; BLOG_FIRST_CURSOR starts from the newest post.
 */
export function paginatePosts(posts: readonly BlogPostSummary[], cursor: string, limit = BLOG_PAGE_SIZE): BlogFeedPage {
  const start = cursor === BLOG_FIRST_CURSOR ? 0 : posts.findIndex(post => post.slug === cursor) + 1
  const data = start > 0 || cursor === BLOG_FIRST_CURSOR ? posts.slice(start, start + limit) : []
  const last = data[data.length - 1]
  const hasMore = Boolean(last) && start + data.length < posts.length

  return { data, meta: { nextCursor: hasMore && last ? last.slug : null } }
}

/** Every cursor the feed can be asked for, so each page can be prerendered as a static file. */
export function feedCursors(posts: readonly BlogPostSummary[], limit = BLOG_PAGE_SIZE): string[] {
  const cursors = [BLOG_FIRST_CURSOR]
  let next = paginatePosts(posts, BLOG_FIRST_CURSOR, limit).meta.nextCursor
  while (next) {
    cursors.push(next)
    next = paginatePosts(posts, next, limit).meta.nextCursor
  }
  return cursors
}

export function findPost<T extends Pick<BlogPost, 'slug'>>(posts: readonly T[], slug: string): T | undefined {
  return posts.find(post => post.slug === slug)
}

/** The post listed right after the given one (the next older post), if any. */
export function followingPost<T extends Pick<BlogPost, 'slug'>>(posts: readonly T[], slug: string): T | undefined {
  const index = posts.findIndex(post => post.slug === slug)
  return index < 0 ? undefined : posts[index + 1]
}

export function formatPostDate(isoDate: string, locale: string): string {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1, day)))
}

export function readingTimeLabel(template: string, minutes: number): string {
  return template.replace('{minutes}', String(minutes))
}
