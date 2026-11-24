import { describe, expect, it } from 'vitest'
import {
  dismissWelcome,
  readVisitCount,
  recordVisit,
  shouldShowWelcome,
  startVisit,
  VISIT_COUNT_KEY,
  WELCOME_DISMISSED_KEY,
  type VisitorStorage,
  type VisitorStores,
} from '~/utils/visitor'

function memoryStorage(): VisitorStorage {
  const values = new Map<string, string>()
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value)
    },
  }
}

function blockedStorage(): VisitorStorage {
  return {
    getItem: () => {
      throw new Error('blocked')
    },
    setItem: () => {
      throw new Error('blocked')
    },
  }
}

function newBrowserSession(local: VisitorStorage): VisitorStores {
  return { local, session: memoryStorage() }
}

describe('recordVisit', () => {
  it('counts the first visit in a new browser', () => {
    // Arrange
    const stores = newBrowserSession(memoryStorage())

    // Act
    const count = recordVisit(stores)

    // Assert
    expect(count).toBe(1)
    expect(readVisitCount(stores.local)).toBe(1)
  })

  it('does not count reloads inside the same session again', () => {
    // Arrange
    const stores = newBrowserSession(memoryStorage())
    recordVisit(stores)

    // Act
    const count = recordVisit(stores)

    // Assert
    expect(count).toBe(1)
  })

  it('keeps the total across sessions of the same browser', () => {
    // Arrange
    const local = memoryStorage()
    recordVisit(newBrowserSession(local))

    // Act
    const count = recordVisit(newBrowserSession(local))

    // Assert
    expect(count).toBe(2)
  })

  it('recovers from a malformed stored total', () => {
    // Arrange
    const stores = newBrowserSession(memoryStorage())
    stores.local.setItem(VISIT_COUNT_KEY, 'invalid')

    // Act
    const count = recordVisit(stores)

    // Assert
    expect(count).toBe(1)
  })

  it('still counts when the session flag survives but the total was cleared', () => {
    // Arrange
    const stores = newBrowserSession(memoryStorage())
    recordVisit(stores)
    const clearedLocal = memoryStorage()

    // Act
    const count = recordVisit({ local: clearedLocal, session: stores.session })

    // Assert
    expect(count).toBe(1)
  })
})

describe('welcome dialog', () => {
  it('shows the welcome on the first visit', () => {
    // Arrange
    const local = memoryStorage()

    // Act
    const show = shouldShowWelcome(local)

    // Assert
    expect(show).toBe(true)
    expect(local.getItem(WELCOME_DISMISSED_KEY)).toBeNull()
  })

  it('does not show the welcome again after it is closed', () => {
    // Arrange
    const local = memoryStorage()
    dismissWelcome(local)

    // Act
    const snapshot = startVisit(newBrowserSession(local))

    // Assert
    expect(local.getItem(WELCOME_DISMISSED_KEY)).toBe('true')
    expect(snapshot.showWelcome).toBe(false)
    expect(snapshot.count).toBe(1)
  })
})

describe('blocked storage', () => {
  it('keeps the page usable when the browser blocks storage', () => {
    // Arrange
    const stores = { local: blockedStorage(), session: blockedStorage() }

    // Act
    const snapshot = startVisit(stores)

    // Assert
    expect(snapshot).toEqual({ count: 1, showWelcome: true })
    expect(() => dismissWelcome(stores.local)).not.toThrow()
  })
})
