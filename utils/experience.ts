type StoryLike = {
  value?: string
  unit?: string
  before?: string
  after?: string
}

type JobLike = {
  id: string
  stories: readonly StoryLike[]
}

export type JobHighlight = {
  value: string
  label: string
}

export function findJob<T extends JobLike>(jobs: readonly T[], id: string): T | undefined {
  return jobs.find(job => job.id === id)
}

export function nextJob<T extends JobLike>(jobs: readonly T[], id: string): T | undefined {
  const index = jobs.findIndex(job => job.id === id)
  if (index < 0 || jobs.length < 2) {
    return undefined
  }
  return jobs[(index + 1) % jobs.length]
}

export function jobHighlights(job: JobLike, limit = 2): JobHighlight[] {
  const highlights: JobHighlight[] = []
  for (const story of job.stories) {
    if (story.before && story.after) {
      highlights.push({ value: `${story.before} → ${story.after}`, label: '' })
    }
    else if (story.value) {
      highlights.push({ value: story.value, label: story.unit ?? '' })
    }
  }
  return highlights.slice(0, limit)
}
