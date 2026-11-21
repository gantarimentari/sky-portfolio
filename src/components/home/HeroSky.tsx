import type { MotionValue } from 'motion/react'

export function HeroSky(_: { progress: MotionValue<number>; reducedMotion?: boolean }) {
  return <div className="hero-sky" aria-hidden="true">
    <div className="sky-haze" />
    <div className="sky-halftone" /><div className="sky-vignette" />
  </div>
}
