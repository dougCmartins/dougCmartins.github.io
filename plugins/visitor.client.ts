export default defineNuxtPlugin(() => {
  const { start } = useVisitor()

  // onNuxtReady waits for hydration and an idle main thread, so the welcome
  // dialog never competes with the hero for LCP or delays the first input.
  onNuxtReady(() => start())
})
