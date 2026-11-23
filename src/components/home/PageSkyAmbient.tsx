import { motion, useTransform, type MotionValue } from 'motion/react'

export function PageSkyAmbient({ progress, reducedMotion = false }: { progress: MotionValue<number>; reducedMotion?: boolean }) {
  const afternoonOpacity = useTransform(progress, [0, .1, .42, .72], [0, .12, .82, 1])
  const sunsetOpacity = useTransform(progress, [.28, .48, .74, .9], [0, .08, .9, 1])
  const horizonOpacity = useTransform(progress, [.2, .42, .68, .84, .98], [0, .18, .72, .32, .06])
  const duskOpacity = useTransform(progress, [.62, .78, .93, 1], [0, .16, .94, 1])
  // About is the twilight-to-midnight bridge. The night layer must already be
  // dominant before Contact enters the viewport, otherwise the sunset layer
  // briefly reappears at the section boundary.
  const nightOpacity = useTransform(progress, [.72, .82, .92, .985], [0, .32, .92, 1])
  const starsOpacity = useTransform(progress, [.7, .82, .92, .985], [0, .22, .7, .92])
  const backCloudOpacity = useTransform(progress, [.54, .76, .94], [.2, .14, .04])
  const frontCloudOpacity = useTransform(progress, [.58, .8, .96], [.52, .3, .08])

  // The celestial bodies share the page's raw scroll MotionValue. This keeps
  // their state in sync with direct hash navigation without another RAF loop.
  const sunOpacity = useTransform(progress, [0, .12, .4, .56, .68], [.72, .78, .7, .16, 0])
  const sunX = useTransform(progress, [0, .34, .68], ['0vw', '-4vw', '-10vw'])
  const sunY = useTransform(progress, [0, .24, .48, .68], ['0vh', '12vh', '40vh', '64vh'])
  const sunScale = useTransform(progress, [0, .44, .68], [1, .88, .72])

  const moonOpacity = useTransform(progress, [.68, .76, .86, .96], [0, .08, .68, .86])
  const moonX = useTransform(progress, [0, .72, 1], ['0vw', '0vw', '7vw'])
  const moonY = useTransform(progress, [0, .7, .84, 1], ['0vh', '0vh', '-35vh', '-55vh'])
  const moonScale = useTransform(progress, [.7, .86, 1], [.78, .94, 1])
  const shootingStarsOpacity = useTransform(progress, [.9, .945, .975], [0, .08, .9])

  return <div className="page-sky-ambient" aria-hidden="true">
    <div className="page-sky-day" />
    <motion.div className="page-sky-afternoon" style={{ opacity: afternoonOpacity }} />
    <motion.div className="page-sky-sunset" style={{ opacity: sunsetOpacity }} />
    <motion.div className="page-sky-horizon" style={{ opacity: horizonOpacity }} />
    <motion.div
      className="page-sky-sun"
      style={reducedMotion
        ? { opacity: sunOpacity }
        : { opacity: sunOpacity, x: sunX, y: sunY, scale: sunScale }}
    />
    <motion.div className="page-sky-dusk" style={{ opacity: duskOpacity }} />
    <motion.div className="page-sky-night" style={{ opacity: nightOpacity }} />
    <motion.div className="page-sky-stars" style={{ opacity: starsOpacity }} />
    <motion.div
      className="page-sky-moon"
      style={reducedMotion
        ? { opacity: moonOpacity }
        : { opacity: moonOpacity, x: moonX, y: moonY, scale: moonScale }}
    />
    <motion.div
      className="page-sky-shooting-stars"
      style={reducedMotion ? undefined : { opacity: shootingStarsOpacity }}
    >
      <i />
      <i />
    </motion.div>
    <motion.div className="page-cloud-loop page-cloud-loop-back" style={reducedMotion ? undefined : { opacity: backCloudOpacity }}>
      <div className="page-cloud-track">
        <img src="/assets/hero-cloud-bank-v2.png" alt="" loading="eager" decoding="async" fetchPriority="high" />
        <img src="/assets/hero-cloud-bank-v2.png" alt="" />
        <img src="/assets/hero-cloud-bank-v2.png" alt="" />
        <img src="/assets/hero-cloud-bank-v2.png" alt="" />
      </div>
    </motion.div>
    <motion.div className="page-cloud-loop page-cloud-loop-front" style={reducedMotion ? undefined : { opacity: frontCloudOpacity }}>
      <div className="page-cloud-track">
        <img src="/assets/hero-cloud-bank-v2.png" alt="" />
        <img src="/assets/hero-cloud-bank-v2.png" alt="" />
        <img src="/assets/hero-cloud-bank-v2.png" alt="" />
        <img src="/assets/hero-cloud-bank-v2.png" alt="" />
      </div>
    </motion.div>
    <div className="page-sky-grain" />
  </div>
}
