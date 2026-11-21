import { useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

export function IntroLoader({ onComplete }: { onComplete?: () => void }) {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(() => !sessionStorage.getItem('ccr-intro-seen'))

  const finish = useCallback(() => {
    sessionStorage.setItem('ccr-intro-seen', 'true')
    setVisible(false)
    onComplete?.()
  }, [onComplete])

  useEffect(() => {
    if (!visible) return
    if (reduceMotion) {
      finish()
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const timer = window.setTimeout(finish, 2650)
    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [finish, visible, reduceMotion])

  if (!visible || reduceMotion) return null
  return <div className="intro-loader" role="dialog" aria-label="Portfolio introduction">
    <div className="loader-top"><span>PORTFOLIO / 2026</span></div>
    <div className="loader-center"><p>Loading creative systems</p><div className="loader-word" aria-label="Frontend">{'LARASATI'.split('').map((letter, index) => <span style={{ animationDelay: `${index * .05}s` }} key={`${letter}-${index}`}>{letter}</span>)}</div></div>
    <div className="loader-sky-clouds" aria-hidden="true">
      <img className="loader-cloud-photo loader-cloud-photo-back" src="/assets/hero-cloud-bank-v2.png" alt="" />
      <img className="loader-cloud-photo loader-cloud-photo-front" src="/assets/hero-cloud-bank-v2.png" alt="" />
    </div>
    <div className="loader-bottom"><div className="loader-track"><i /></div><strong>100</strong></div>
  </div>
}
