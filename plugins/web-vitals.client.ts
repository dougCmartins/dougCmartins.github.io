import { onCLS, onINP, onLCP, type Metric } from 'web-vitals'

export default defineNuxtPlugin(() => {
  const endpoint = useRuntimeConfig().public.rumEndpoint
  if (!endpoint) {
    return
  }

  const report = (metric: Metric) => {
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      path: window.location.pathname,
      navigationType: metric.navigationType,
    })
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }))
      return
    }
    void fetch(endpoint, {
      method: 'POST',
      body,
      keepalive: true,
      headers: { 'content-type': 'application/json' },
    })
  }

  onCLS(report)
  onINP(report)
  onLCP(report)
})
