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

  return <div className="page-sky-ambient" aria-hidden="true">
    <div className="page-sky-day" />
    <motion.div className="page-sky-afternoon" style={reducedMotion ? undefined : { opacity: afternoonOpacity }} />
    <motion.div className="page-sky-sunset" style={reducedMotion ? undefined : { opacity: sunsetOpacity }} />
    <motion.div className="page-sky-horizon" style={reducedMotion ? undefined : { opacity: horizonOpacity }} />
    <motion.div className="page-sky-dusk" style={reducedMotion ? undefined : { opacity: duskOpacity }} />
    <motion.div className="page-sky-night" style={reducedMotion ? undefined : { opacity: nightOpacity }} />
    <motion.div className="page-sky-stars" style={reducedMotion ? undefined : { opacity: starsOpacity }} />
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
