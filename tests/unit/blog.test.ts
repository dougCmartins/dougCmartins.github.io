import { describe, expect, it } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import { BLOG_FIRST_CURSOR, feedCursors, findPost, followingPost, formatPostDate, paginatePosts, readingTimeLabel, sortPostsByDate, toSummary } from '~/utils/blog'
import type { BlogPost } from '~/types/blog'

function post(slug: string, date: string): BlogPost {
  return { slug, title: slug, excerpt: '', date, readingMinutes: 1, tags: [], linkedinUrl: '', sections: [] }
}

const posts = sortPostsByDate([post('old', '2026-11-16'), post('new', '2026-11-19'), post('mid', '2026-11-17')])

describe('sortPostsByDate', () => {
  it('lists the newest post first', () => {
    // Arrange
    const unsorted = [post('a', '2026-01-01'), post('b', '2026-03-01')]

    // Act
    const sorted = sortPostsByDate(unsorted)

    // Assert
    expect(sorted.map(item => item.slug)).toEqual(['b', 'a'])
  })
})

describe('findPost', () => {
  it('returns undefined for an unknown slug', () => {
    // Arrange
    const slug = 'missing'

    // Act
    const found = findPost(posts, slug)

    // Assert
    expect(found).toBeUndefined()
  })
})

describe('followingPost', () => {
  it('returns the next older post', () => {
    // Arrange
    const slug = 'new'

    // Act
    const next = followingPost(posts, slug)

    // Assert
    expect(next?.slug).toBe('mid')
  })

  it('returns undefined after the oldest post', () => {
    // Arrange
    const slug = 'old'

    // Act
    const next = followingPost(posts, slug)

    // Assert
    expect(next).toBeUndefined()
  })
})

describe('formatPostDate', () => {
  it('formats the date in the reader locale', () => {
    // Arrange
    const date = '2026-11-10'

    // Act
    const label = formatPostDate(date, 'pt-BR')

    // Assert
    expect(label).toBe('10 de novembro de 2026')
  })
})

describe('readingTimeLabel', () => {
  it('fills the minutes placeholder', () => {
    // Arrange
    const template = '{minutes} min de leitura'

    // Act
    const label = readingTimeLabel(template, 6)

    // Assert
    expect(label).toBe('6 min de leitura')
  })
})

describe('paginatePosts', () => {
  const twelve = sortPostsByDate(Array.from({ length: 12 }, (_, index) => post(`p${index + 1}`, `2026-01-${String(index + 1).padStart(2, '0')}`)))

  it('returns the 5 newest posts and a cursor on the first page', () => {
    // Arrange
    const cursor = BLOG_FIRST_CURSOR

    // Act
    const page = paginatePosts(twelve, cursor)

    // Assert
    expect(page.data.map(item => item.slug)).toEqual(['p12', 'p11', 'p10', 'p9', 'p8'])
    expect(page.meta.nextCursor).toBe('p8')
  })

  it('continues after the cursor post', () => {
    // Arrange
    const cursor = 'p8'

    // Act
    const page = paginatePosts(twelve, cursor)

    // Assert
    expect(page.data.map(item => item.slug)).toEqual(['p7', 'p6', 'p5', 'p4', 'p3'])
    expect(page.meta.nextCursor).toBe('p3')
  })

  it('ends without a cursor on the last page', () => {
    // Arrange
    const cursor = 'p3'

    // Act
    const page = paginatePosts(twelve, cursor)

    // Assert
    expect(page.data.map(item => item.slug)).toEqual(['p2', 'p1'])
    expect(page.meta.nextCursor).toBeNull()
  })

  it('returns an empty page for an unknown cursor', () => {
    // Arrange
    const cursor = 'missing'

    // Act
    const page = paginatePosts(twelve, cursor)

    // Assert
    expect(page).toEqual({ data: [], meta: { nextCursor: null } })
  })

  it('has no cursor when every post fits on the first page', () => {
    // Arrange
    const three = twelve.slice(0, 3)

    // Act
    const page = paginatePosts(three, BLOG_FIRST_CURSOR)

    // Assert
    expect(page.data).toHaveLength(3)
    expect(page.meta.nextCursor).toBeNull()
  })
})

describe('feedCursors', () => {
  it('lists every cursor so each feed page can be prerendered', () => {
    // Arrange
    const twelve = sortPostsByDate(Array.from({ length: 12 }, (_, index) => post(`p${index + 1}`, `2026-01-${String(index + 1).padStart(2, '0')}`)))

    // Act
    const cursors = feedCursors(twelve)

    // Assert
    expect(cursors).toEqual([BLOG_FIRST_CURSOR, 'p8', 'p3'])
  })
})

describe('toSummary', () => {
  it('drops the article sections', () => {
    // Arrange
    const full = { ...post('a', '2026-01-01'), sections: [{ label: '', heading: 'h', blocks: [] }] }

    // Act
    const summary = toSummary(full)

    // Assert
    expect(summary).not.toHaveProperty('sections')
    expect(summary.slug).toBe('a')
  })
})

describe('content/blog', () => {
  it('has a title, date and sections in every published post', () => {
    // Arrange
    const files = readdirSync('content/blog').filter(file => file.endsWith('.json'))

    // Act
    const invalid = files
      .map(file => JSON.parse(readFileSync(`content/blog/${file}`, 'utf8')) as BlogPost)
      .filter(item => !item.title || !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !item.sections.length)

    // Assert
    expect(files.length).toBeGreaterThan(0)
    expect(invalid).toEqual([])
  })
})
