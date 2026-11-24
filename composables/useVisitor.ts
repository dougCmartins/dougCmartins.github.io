import { dismissWelcome, startVisit, type VisitorStorage } from '~/utils/visitor'

const memoryStorage: VisitorStorage = { getItem: () => null, setItem: () => {} }

function browserStorage(kind: 'localStorage' | 'sessionStorage'): VisitorStorage {
  try {
    return window[kind] ?? memoryStorage
  }
  catch {
    return memoryStorage
  }
}

export function useVisitor() {
  const visitCount = useState<number | null>('visitor-count', () => null)
  const welcomeOpen = useState<boolean>('visitor-welcome-open', () => false)

  function start() {
    const snapshot = startVisit({
      local: browserStorage('localStorage'),
      session: browserStorage('sessionStorage'),
    })
    visitCount.value = snapshot.count
    welcomeOpen.value = snapshot.showWelcome
  }

  function closeWelcome() {
    dismissWelcome(browserStorage('localStorage'))
    welcomeOpen.value = false
  }

  return { visitCount, welcomeOpen, start, closeWelcome }
}
