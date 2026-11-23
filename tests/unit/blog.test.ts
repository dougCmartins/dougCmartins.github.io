import { describe, expect, it } from 'vitest'
import { blogPosts, findPost, followingPost, formatPostDate, readingTimeLabel, sortPostsByDate } from '~/utils/blog'
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

describe('blogPosts', () => {
  it('loads every published post with a title, date and sections', () => {
    // Arrange
    const loaded = blogPosts

    // Act
    const invalid = loaded.filter(item => !item.title || !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !item.sections.length)

    // Assert
    expect(loaded.length).toBeGreaterThan(0)
    expect(invalid).toEqual([])
  })
})
