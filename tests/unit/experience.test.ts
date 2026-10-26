import { describe, expect, it } from 'vitest'
import { findJob, jobHighlights, nextJob } from '~/utils/experience'
import { portfolioCopy, portfolioLocales } from '~/utils/portfolio-copy'
import { experienceMedia } from '~/utils/portfolio'

const jobs = [
  { id: 'a', stories: [{ value: '12 mil+', unit: 'mensagens' }, { before: '30 s', after: '2 s' }, { value: 'x', unit: 'y' }] },
  { id: 'b', stories: [{}] },
  { id: 'c', stories: [] },
]

describe('findJob', () => {
  it('returns the job that matches the id', () => {
    // Arrange
    const id = 'b'

    // Act
    const job = findJob(jobs, id)

    // Assert
    expect(job?.id).toBe('b')
  })

  it('returns undefined for an unknown id', () => {
    // Arrange
    const id = 'missing'

    // Act
    const job = findJob(jobs, id)

    // Assert
    expect(job).toBeUndefined()
  })
})

describe('nextJob', () => {
  it('returns the following job', () => {
    // Arrange
    const id = 'a'

    // Act
    const job = nextJob(jobs, id)

    // Assert
    expect(job?.id).toBe('b')
  })

  it('wraps around to the first job after the last one', () => {
    // Arrange
    const id = 'c'

    // Act
    const job = nextJob(jobs, id)

    // Assert
    expect(job?.id).toBe('a')
  })

  it('returns undefined for an unknown id', () => {
    // Arrange
    const id = 'missing'

    // Act
    const job = nextJob(jobs, id)

    // Assert
    expect(job).toBeUndefined()
  })
})

describe('jobHighlights', () => {
  it('formats single values and before/after comparisons, up to the limit', () => {
    // Arrange
    const job = jobs[0]!

    // Act
    const highlights = jobHighlights(job)

    // Assert
    expect(highlights).toEqual([
      { value: '12 mil+', label: 'mensagens' },
      { value: '30 s → 2 s', label: '' },
    ])
  })

  it('returns an empty list when no story has a metric', () => {
    // Arrange
    const job = jobs[1]!

    // Act
    const highlights = jobHighlights(job)

    // Assert
    expect(highlights).toEqual([])
  })
})

describe('experience routes', () => {
  it('has a prerendered detail page for every job in every locale', () => {
    // Arrange
    const routeIds = Object.keys(experienceMedia)

    // Act
    const jobIdsByLocale = portfolioLocales.map(locale => portfolioCopy[locale].experience.jobs.map(job => job.id))

    // Assert
    for (const ids of jobIdsByLocale) {
      expect([...ids].sort()).toEqual([...routeIds].sort())
    }
  })
})
