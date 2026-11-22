const HERO_CLOUD_SRC = '/assets/hero-cloud-bank-v2.png'
const READINESS_TIMEOUT_MS = 3_000
const INTRO_SESSION_KEY = 'ccr-intro-seen'

let initialViewportPromise: Promise<void> | undefined

function waitForImage(src: string) {
  return new Promise<void>((resolve) => {
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
    image.fetchPriority = 'high'
    image.onload = () => {
      if (typeof image.decode !== 'function') {
        finish()
        return
      }

      void image.decode().catch(() => undefined).then(finish)
    }
    image.onerror = finish
    image.src = src

    if (image.complete) {
      if (image.naturalWidth === 0) finish()
      else if (typeof image.decode === 'function') {
        void image.decode().catch(() => undefined).then(finish)
      } else finish()
    }
  })
}

async function waitForCriticalFonts() {
  if (!('fonts' in document)) return Promise.resolve()

  const fontFaces = [
    '500 1em Manrope',
    '700 1em Manrope',
    '500 1em "Plus Jakarta Sans"',
    '800 1em "Plus Jakarta Sans"',
  ]

  await Promise.allSettled(fontFaces.map((font) => document.fonts.load(font)))
}

function waitForInitialLayout() {
  return new Promise<void>((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      window.clearTimeout(fallback)
      resolve()
    }
    const fallback = window.setTimeout(finish, 120)
    requestAnimationFrame(() => requestAnimationFrame(finish))
  })
}

function withTimeout(task: Promise<unknown>, timeoutMs: number) {
  return new Promise<void>((resolve) => {
    const timer = window.setTimeout(resolve, timeoutMs)
    void task.catch(() => undefined).then(() => {
      window.clearTimeout(timer)
      resolve()
    })
  })
}

export function prepareInitialViewport() {
  if (!initialViewportPromise) {
    initialViewportPromise = withTimeout(
      Promise.all([
        waitForImage(HERO_CLOUD_SRC),
        waitForCriticalFonts(),
      ]).then(waitForInitialLayout),
      READINESS_TIMEOUT_MS,
    )
  }

  return initialViewportPromise
}

export function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SESSION_KEY, 'true')
  } catch {
    // Storage can be unavailable in privacy-restricted contexts. Readiness must
    // still complete and the portfolio must remain usable.
  }
}

