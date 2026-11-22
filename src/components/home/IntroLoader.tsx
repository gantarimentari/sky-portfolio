import { useCallback, useEffect, useState, type AnimationEvent } from 'react'
import { useReducedMotion } from 'motion/react'
import { hasSeenIntro, markIntroSeen, prepareInitialViewport } from '../../lib/initialViewportReady'

const INTRO_HOLD_MS = 1_720
const EXIT_FALLBACK_MS = 1_050

export function IntroLoader({ onComplete }: { onComplete?: () => void }) {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(() => !hasSeenIntro())
  const [exiting, setExiting] = useState(false)

  const finish = useCallback(() => {
    markIntroSeen()
    setVisible(false)
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    if (!visible) return
    let active = true
    const previousOverflow = document.body.style.overflow
    if (!reduceMotion) document.body.style.overflow = 'hidden'

    const minimumIntro = reduceMotion
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.setTimeout(resolve, INTRO_HOLD_MS))

    void Promise.all([prepareInitialViewport(), minimumIntro]).then(() => {
      if (!active) return
      if (reduceMotion) finish()
      else setExiting(true)
    })

    return () => {
      active = false
      document.body.style.overflow = previousOverflow
    }
  }, [finish, visible, reduceMotion])

  useEffect(() => {
    if (!exiting) return
    const fallback = window.setTimeout(finish, EXIT_FALLBACK_MS)
    return () => window.clearTimeout(fallback)
  }, [exiting, finish])

  const handleExitEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && event.animationName === 'intro-sky-exit') finish()
  }

  if (!visible || reduceMotion) return null
  return <div className={`intro-loader${exiting ? ' is-exiting' : ''}`} role="dialog" aria-label="Portfolio introduction" onAnimationEnd={handleExitEnd}>
    <div className="loader-top"><span>PORTFOLIO / 2026</span></div>
    <div className="loader-center"><p>Loading creative systems</p><div className="loader-word" aria-label="Frontend">{'LARASATI'.split('').map((letter, index) => <span style={{ animationDelay: `${index * .05}s` }} key={`${letter}-${index}`}>{letter}</span>)}</div></div>
    <div className="loader-sky-clouds" aria-hidden="true">
      <img className="loader-cloud-photo loader-cloud-photo-back" src="/assets/hero-cloud-bank-v2.png" alt="" decoding="async" fetchPriority="high" />
      <img className="loader-cloud-photo loader-cloud-photo-front" src="/assets/hero-cloud-bank-v2.png" alt="" decoding="async" />
    </div>
    <div className="loader-bottom"><div className="loader-track"><i /></div><strong>100</strong></div>
  </div>
}
