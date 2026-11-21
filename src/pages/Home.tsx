import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { profile } from '../data/profile'
import { ProjectOrbitShowcase } from '../components/home/ProjectOrbitShowcase'
import { IntroLoader } from '../components/home/IntroLoader'
import { WeatheredHorizonsPrototype } from '../components/home/WeatheredHorizonsPrototype'
import { HeroSky } from '../components/home/HeroSky'
import { PageSkyAmbient } from '../components/home/PageSkyAmbient'
import { AboutSky } from '../components/home/AboutSky'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function Home() {
  useDocumentTitle('Frontend Developer & Creative Technologist')
  const reduceMotion = useReducedMotion()
  const [heroReady, setHeroReady] = useState(() => sessionStorage.getItem('ccr-intro-seen') === 'true')
  const revealHero = useCallback(() => setHeroReady(true), [])
  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 800)
    return () => clearTimeout(timer)
  }, [])
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
            FRONTEND DEVELOPER — INDONESIA
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
            I shape interfaces that feel alive, tactile, and effortless—bringing design intuition, fluid motion, and robust frontend engineering into one natural experience.
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
              <span>Let’s build together</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          {/* Quiet Disciplines Row */}
          <div className="hero-disciplines-row" aria-label="Core disciplines">
            <span>✦ Interaction Design</span>
            <i>·</i>
            <span>✦ Creative Frontend</span>
            <i>·</i>
            <span>✦ Design Systems</span>
          </div>
        </motion.div>

        {/* Understated Minimalist Footer Cue */}
        <motion.div className="reference-hero-footer" style={reduceMotion ? undefined : { opacity: heroCopyOpacity }}>
          <a href="#work" className="curated-scroll-cue" aria-label="Scroll to discover work">
            <span className="scroll-hairline">
              <span className="hairline-drop" />
            </span>
            <span>SCROLL TO DISCOVER</span>
          </a>
          <span className="curated-footer-meta">
            {profile.role.toUpperCase()} · {profile.location.toUpperCase()}
          </span>
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

      <section className="reference-contact" id="contact">
        <div className="reference-grid" aria-hidden="true" />
        <p className="ref-eyebrow">04 / LET’S TALK</p>
        <h2>
          Have something in mind?<br /><span>Let’s give it a shape.</span>
        </h2>
        <div className="contact-ledger">
          <div className="contact-ledger-row contact-ledger-intro"><span>BASED IN</span><strong>{profile.location}</strong><p>Frontend engineering, interaction, and product work.</p></div>
          {profile.email ? <a className="contact-ledger-row" href={`mailto:${profile.email}`}><span>EMAIL</span><strong>{profile.email}</strong><small>Start a conversation</small></a> : <div className="contact-ledger-row is-pending"><span>EMAIL</span><strong>Not published yet</strong><small>Contact address will be added before launch.</small></div>}
          {profile.resume ? <div className="contact-ledger-row contact-ledger-cv"><span>CV / PDF</span><strong>Curriculum Vitae</strong><div><a href={profile.resume} target="_blank" rel="noreferrer">View CV</a><a href={profile.resume} download>Download</a></div></div> : <div className="contact-ledger-row is-pending"><span>CV / PDF</span><strong>In preparation</strong><small>The final document will live here.</small></div>}
        </div>
        <footer>
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <div>
            {profile.linkedin && <a href={profile.linkedin}>LinkedIn</a>}
            {profile.github && <a href={profile.github}>GitHub</a>}
            {profile.resume && <a href={profile.resume}>CV</a>}
          </div>
          <span>BUILT WITH CARE & CURIOSITY</span>
        </footer>
      </section>
    </div>
  )
}
