export const VISIT_COUNT_KEY = 'portfolio:visit-count'
export const VISIT_SESSION_KEY = 'portfolio:visit-recorded'
export const WELCOME_DISMISSED_KEY = 'portfolio:welcome-dismissed'

export type VisitorStorage = Pick<Storage, 'getItem' | 'setItem'>

export type VisitorStores = {
  local: VisitorStorage
  session: VisitorStorage
}

export type VisitSnapshot = {
  count: number
  showWelcome: boolean
}

function readItem(storage: VisitorStorage, key: string): string | null {
  try {
    return storage.getItem(key)
  }
  catch {
    return null
  }
}

function writeItem(storage: VisitorStorage, key: string, value: string): void {
  try {
    storage.setItem(key, value)
  }
  catch {
    // Storage may be blocked (private mode, quota); the page keeps working without persistence.
  }
}

export function readVisitCount(storage: VisitorStorage): number {
  const count = Number(readItem(storage, VISIT_COUNT_KEY))
  return Number.isSafeInteger(count) && count >= 0 ? count : 0
}

/**
 * Counts one visit per browser session, so reloads and client-side navigation
 * do not inflate the total stored in localStorage.
 */
export function recordVisit({ local, session }: VisitorStores): number {
  const current = readVisitCount(local)
  if (readItem(session, VISIT_SESSION_KEY) === 'true' && current > 0) {
    return current
  }

  const next = current + 1
  writeItem(local, VISIT_COUNT_KEY, String(next))
  writeItem(session, VISIT_SESSION_KEY, 'true')
  return next
}

export function shouldShowWelcome(storage: VisitorStorage): boolean {
  return readItem(storage, WELCOME_DISMISSED_KEY) !== 'true'
}

export function dismissWelcome(storage: VisitorStorage): void {
  writeItem(storage, WELCOME_DISMISSED_KEY, 'true')
}

export function startVisit(stores: VisitorStores): VisitSnapshot {
  return {
    count: recordVisit(stores),
    showWelcome: shouldShowWelcome(stores.local),
  }
}
