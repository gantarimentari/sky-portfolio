type FetchPriority = 'high' | 'low'

const posterRequests = new Map<string, Promise<void>>()

function loadAndDecodePoster(src: string, priority: FetchPriority) {
  const existing = posterRequests.get(src)
  if (existing) return existing

  const request = new Promise<void>((resolve) => {
    const image = new Image()
    let settled = false

    const finish = () => {
      if (settled) return
      settled = true
      image.onload = null
      image.onerror = null
      resolve()
    }

    image.decoding = 'async'
    image.fetchPriority = priority
    image.onload = () => {
      if (typeof image.decode !== 'function') {
        finish()
        return
      }

      void image.decode().catch(() => undefined).then(finish)
    }
    image.onerror = finish
    image.src = src
  })

  posterRequests.set(src, request)
  return request
}

export function prepareProjectPosters(sources: string[], highPriorityCount = 2) {
  const uniqueSources = [...new Set(sources)]
  const priority = uniqueSources.slice(0, highPriorityCount)
  const remaining = uniqueSources.slice(highPriorityCount)

  // These requests begin only after the Hero readiness gate. Priority lets the
  // first reveal cards decode ahead of the rest without blocking interaction.
  void Promise.allSettled(priority.map((src) => loadAndDecodePoster(src, 'high')))
  void Promise.allSettled(remaining.map((src) => loadAndDecodePoster(src, 'low')))
}

