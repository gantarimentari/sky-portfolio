import { motion, useReducedMotion } from 'motion/react'
import { profile } from '../../data/profile'

const constellationNodes = [
  { x: 17, y: 28 },
  { x: 70, y: 18 },
  { x: 80, y: 70 },
  { x: 27, y: 78 },
]

const constellationPaths = [
  'M50 50 C39 38 29 31 17 28',
  'M50 50 C57 34 63 24 70 18',
  'M50 50 C64 53 74 60 80 70',
  'M50 50 C43 63 35 72 27 78',
  'M17 28 C34 14 52 12 70 18',
  'M80 70 C63 86 44 87 27 78',
]

export function AboutSky() {
  const reduceMotion = useReducedMotion()

  return <section className="about-sky" id="about" aria-labelledby="about-sky-title">
    <div className="about-sky-atmosphere" aria-hidden="true" />

    <motion.header
      className="about-sky-heading"
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: .35 }}
      transition={{ duration: .7, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="ref-eyebrow">03 / ABOUT THE MAKER</p>
      <h2 id="about-sky-title">Between systems<br /><em>and stories.</em></h2>
      <div className="about-sky-intro">
        <p>{profile.intro}</p>
        <span>I work across the interface layer, the systems behind it, and the delivery practices that help the whole experience hold together.</span>
      </div>
    </motion.header>

    <div className="about-constellation-panel">
      <div className="about-constellation-map" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <circle className="about-orbit-ring" cx="50" cy="50" r="27" />
          {constellationPaths.map((path, index) => <motion.path
            d={path}
            key={path}
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: index < 4 ? .82 : .38 }}
            viewport={{ once: true, amount: .55 }}
            transition={{ duration: .75, delay: .08 + index * .07, ease: [0.16, 1, 0.3, 1] }}
          />)}
        </svg>

        <motion.div
          className="about-constellation-core"
          initial={reduceMotion ? false : { opacity: 0, scale: .8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: .6 }}
          transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>{profile.monogram}</span>
          <small>FRONTEND<br />DEVELOPER</small>
        </motion.div>

        {profile.skills.map((group, index) => <motion.div
          className={`about-star-node about-star-node-${index + 1}`}
          style={{ left: `${constellationNodes[index].x}%`, top: `${constellationNodes[index].y}%` }}
          initial={reduceMotion ? false : { opacity: 0, scale: .72 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: .5 }}
          transition={{ duration: .48, delay: .24 + index * .09, ease: [0.16, 1, 0.3, 1] }}
          key={group.label}
        >
          <i />
          <span>0{index + 1}</span>
          <strong>{group.label}</strong>
        </motion.div>)}
      </div>

      <div className="about-skill-ledger" aria-label="Skills and working approach">
        <p>CONSTELLATION OF PRACTICE</p>
        {profile.skills.map((group, index) => <motion.article
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: .5 }}
          transition={{ duration: .52, delay: index * .07, ease: [0.16, 1, 0.3, 1] }}
          key={group.label}
        >
          <span>0{index + 1}</span>
          <strong>{group.label}</strong>
          <p>{group.items.join(' · ')}</p>
        </motion.article>)}
      </div>
    </div>

    <dl className="about-facts">
      <div><dt>NAME</dt><dd>{profile.name}</dd></div>
      <div><dt>ROLE</dt><dd>{profile.role}</dd></div>
      <div><dt>BASED IN</dt><dd>{profile.location}</dd></div>
      <div><dt>FOCUS</dt><dd>Frontend engineering & interaction</dd></div>
    </dl>

    <div className="about-night-cue" aria-hidden="true">
      <span>TWILIGHT</span><i /><span>MIDNIGHT</span>
    </div>
  </section>
}
