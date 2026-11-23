import type { BlogPost } from '~/types/blog'

const postModules = import.meta.glob<BlogPost>('../content/blog/*.json', { eager: true, import: 'default' })

export function sortPostsByDate(posts: readonly BlogPost[]): BlogPost[] {
  return [...posts].sort((first, second) => second.date.localeCompare(first.date))
}

export const blogPosts: readonly BlogPost[] = sortPostsByDate(Object.values(postModules))

export function findPost(posts: readonly BlogPost[], slug: string): BlogPost | undefined {
  return posts.find(post => post.slug === slug)
}

/** The post listed right after the given one (the next older post), if any. */
export function followingPost(posts: readonly BlogPost[], slug: string): BlogPost | undefined {
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
