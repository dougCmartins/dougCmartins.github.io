const IDLE_TIMEOUT_MS = 1500
const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'] as const

export default defineNuxtPlugin((nuxtApp) => {
  const { start, refreshWelcome } = useVisitor()
  let started = false

  function run() {
    if (started) {
      return
    }
    started = true
    INTERACTION_EVENTS.forEach(event => window.removeEventListener(event, onFirstInteraction))
    start()
  }

  // Deferred past the current frame so the dialog never becomes part of the
  // interaction's presentation delay (keeps INP untouched).
  function onFirstInteraction() {
    window.setTimeout(run, 0)
  }

  function scheduleAfterHydration() {
    // A bare requestIdleCallback can starve on slow phones (in-app browsers,
    // continuous canvas animation), so the timeout guarantees it still runs.
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(run, { timeout: IDLE_TIMEOUT_MS })
      return
    }
    window.setTimeout(run, 200)
  }

  INTERACTION_EVENTS.forEach(event => window.addEventListener(event, onFirstInteraction, { passive: true, once: true }))

  if (nuxtApp.isHydrating) {
    nuxtApp.hooks.hookOnce('app:suspense:resolve', scheduleAfterHydration)
  }
  else {
    scheduleAfterHydration()
  }

  // Back/forward cache restores the page without re-running plugins.
  window.addEventListener('pageshow', (event) => {
    if (event.persisted && started) {
      refreshWelcome()
    }
  })
})
