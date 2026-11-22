import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ProjectOrbitShowcase } from '../components/home/ProjectOrbitShowcase'
import { IntroLoader } from '../components/home/IntroLoader'
import { WeatheredHorizonsPrototype } from '../components/home/WeatheredHorizonsPrototype'
import { HeroSky } from '../components/home/HeroSky'
import { PageSkyAmbient } from '../components/home/PageSkyAmbient'
import { AboutSky } from '../components/home/AboutSky'
import { ContactSky } from '../components/home/ContactSky'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { hasSeenIntro, prepareInitialViewport } from '../lib/initialViewportReady'

export function Home() {
  useDocumentTitle('Larasati Ayu Gantari — Software Engineering Portfolio', true)
  const reduceMotion = useReducedMotion()
  const [introSeenOnEntry] = useState(hasSeenIntro)
  const [heroReady, setHeroReady] = useState(false)
  const revealHero = useCallback(() => setHeroReady(true), [])
  useEffect(() => {
    if (!introSeenOnEntry) return
    let active = true
    void prepareInitialViewport().then(() => {
      if (active) setHeroReady(true)
    })
    return () => { active = false }
  }, [introSeenOnEntry])
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress: pageProgress } = useScroll()

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const smoothHeroProgress = useSpring(heroProgress, {
    stiffness: 140,
    damping: 32,
    mass: 0.55,
    restDelta: 0.0008,
  })

  const fieldScale = useTransform(smoothHeroProgress, [0, .76, 1], [1, 1.015, 1.05])
  const fieldOpacity = useTransform(smoothHeroProgress, [0, .82, .96, 1], [1, 1, 1, 0])
  const heroCopyY = useTransform(smoothHeroProgress, [0, .7, .87, 1], [0, 0, -32, -180])
  const heroCopyOpacity = useTransform(smoothHeroProgress, [0, .76, .92, 1], [1, 1, .92, 0])
  const handoffOpacity = useTransform(smoothHeroProgress, [0, .7, .78, .92, 1], [0, 0, 1, 1, 0])
  const handoffY = useTransform(smoothHeroProgress, [.7, .82, 1], [30, 0, -42])

  return (
    <div className="reference-home">
      <IntroLoader onComplete={revealHero} />
      <PageSkyAmbient progress={pageProgress} reducedMotion={Boolean(reduceMotion)} />

      <section
        className="sky-hero-journey"
        id="top"
        ref={heroRef}
      >
      <div className="reference-hero">
        <motion.div
          className="hero-sky-field"
          style={reduceMotion ? undefined : { scale: fieldScale, opacity: fieldOpacity }}
          aria-hidden="true"
        >
          <HeroSky progress={smoothHeroProgress} reducedMotion={Boolean(reduceMotion)} />
        </motion.div>

        {/* Ambient Subtle Glow & Grid */}
        <div className="hero-atmosphere-glow" aria-hidden="true" />
        <div className="reference-grid" aria-hidden="true" />

        {/* Left Column: High-End Editorial Typography */}
        <motion.div
          className="reference-hero-copy"
          style={reduceMotion ? undefined : { y: heroCopyY, opacity: heroCopyOpacity }}
        >
          <motion.p
            className="hero-center-kicker"
            initial={reduceMotion ? false : { y: 18, opacity: 0 }}
            animate={reduceMotion || heroReady ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 }}
            transition={{ delay: 0.02, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          >
            SOFTWARE ENGINEERING STUDENT — INDONESIA
          </motion.p>

          {/* Master Editorial Title */}
          <h1 className="hero-art-title">
            <span className="title-row">
              <motion.span
                className="title-word"
                initial={reduceMotion ? false : { y: '105%', opacity: 0 }}
                animate={reduceMotion || heroReady ? { y: 0, opacity: 1 } : { y: '105%', opacity: 0 }}
                transition={{ delay: 0.08, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                Crafting digital
              </motion.span>
            </span>
            <span className="title-row title-emphasis">
              <motion.span
                className="title-word title-glow"
                initial={reduceMotion ? false : { y: '105%', opacity: 0 }}
                animate={reduceMotion || heroReady ? { y: 0, opacity: 1 } : { y: '105%', opacity: 0 }}
                transition={{ delay: 0.16, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                experiences.
              </motion.span>
            </span>
          </h1>

          <p className="reference-intro">
            I build clear, reliable web applications—combining thoughtful interfaces with an understanding of APIs, testing, and the systems behind them.
          </p>

          {/* Refined Magnetic Actions */}
          <div className="reference-actions">
            <Link className="curated-primary-btn" to="/#work">
              <span>Explore Selected Work</span>
              <span className="btn-arrow-wrap">
                <ArrowDownRight size={17} />
              </span>
            </Link>
            <Link className="curated-secondary-link" to="/#contact">
              <span>Get in touch</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* Quiet Disciplines Row */}
          <div className="hero-disciplines-row" aria-label="Core disciplines">
            <span>✦ Frontend Development</span>
            <i>·</i>
            <span>✦ API Integration</span>
            <i>·</i>
            <span>✦ Software Quality</span>
          </div>
        </motion.div>

        <motion.div className="hero-project-handoff" style={reduceMotion ? undefined : { opacity: handoffOpacity, y: handoffY }} aria-hidden="true">
          <span>01 / PROJECT ARCHIVE</span>
          <strong>THE DECK OPENS NEXT</strong>
          <i>↓</i>
        </motion.div>
      </div>
      </section>

      {/* Section 2: Selected Work (DO NOT MODIFY - Strictly Preserved) */}
      <div id="work" className="section-lift section-lift-projects">
        <ProjectOrbitShowcase />
      </div>

      <WeatheredHorizonsPrototype />

      <AboutSky />

      <ContactSky />
    </div>
  )
}
