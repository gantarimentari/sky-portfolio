import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { projects, type Project } from '../../data/projects'
import { prepareInitialViewport } from '../../lib/initialViewportReady'
import { prepareProjectPosters } from '../../lib/projectPosterReady'
import './OrbitHalo.css'

const REVEAL_START = .025
const REVEAL_END = .455
const FORMATION_START = .465
const ORBIT_START = .59
const ORBIT_END = .825
const ARCHIVE_START = .855
const REVEAL_SLICE = (REVEAL_END - REVEAL_START) / projects.length

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (from: number, to: number, progress: number) => from + (to - from) * progress
// Ease in and out: each segment starts from rest, so a card never snaps from still to full speed.
const ease = (value: number) => { const t = clamp(value); return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 }
const getOrbitTurn = (progress: number) => clamp((progress - ORBIT_START) / (ORBIT_END - ORBIT_START)) * (projects.length - 1)
const getRevealIndex = (progress: number) => Math.min(projects.length - 1, Math.max(0, Math.floor((progress - REVEAL_START) / REVEAL_SLICE)))

function cardGeometry(index: number, progress: number, compactViewport: boolean) {
  const side = index % 2 === 0 ? 1 : -1
  const deckX = (index - 2.5) * .11
  const deckY = index * .72
  const deckScale = 1 - index * .013
  const cardStart = REVEAL_START + index * REVEAL_SLICE
  const local = (progress - cardStart) / REVEAL_SLICE
  const openedX = side * (32 + (index % 3) * 3)
  const openedY = -16 + (index % 3) * 16
  const openedRotate = side * (8 + index * .55)

  if (progress < FORMATION_START) {
    if (local <= 0) return { x: deckX, y: deckY, scale: deckScale, rotate: (index - 2.5) * .35, opacity: 1, z: 20 - index, depth: 1 }
    if (local < .5) {
      const lift = ease(local / .3)
      return { x: mix(deckX, side * 1.5, lift), y: mix(deckY, -2.5, lift), scale: mix(deckScale, 1.075, lift), rotate: mix(0, side * 1.8, lift), opacity: 1, z: 50, depth: 1 }
    }
    // Half the slice to glide aside. Parked cards keep one stacking order (above the deck, earlier cards on top),
    // so nothing pops in front or behind while a card is moving or when it lands.
    const park = ease((local - .5) / .5)
    return { x: mix(side * 1.5, openedX, park), y: mix(-2.5, openedY, park), scale: mix(1.075, .72, park), rotate: mix(side * 1.8, openedRotate, park), opacity: 1, z: 40 - index, depth: 1 }
  }

  const formation = clamp((progress - FORMATION_START) / (ORBIT_START - FORMATION_START))
  const gather = ease(formation / .48)
  const expand = ease((formation - .48) / .52)
  const turn = progress < ORBIT_START ? 0 : getOrbitTurn(progress)
  const angle = (90 + (index - turn) * 60) * Math.PI / 180
  const orbitX = Math.cos(angle) * (compactViewport ? 36 : 31)
  const orbitY = Math.sin(angle) * (compactViewport ? 22 : 29)
  const stackX = (index - 2.5) * .16
  const stackY = index * .42
  let x = formation < .48 ? mix(openedX, stackX, gather) : mix(stackX, orbitX, expand)
  let y = formation < .48 ? mix(openedY, stackY, gather) : mix(stackY, orbitY, expand)
  let scale = formation < .48 ? mix(.72, .64, gather) : mix(.64, 1, expand)
  let opacity = 1
  let rotate = formation < .48 ? mix(openedRotate, (index - 2.5) * .5, gather) : mix((index - 2.5) * .5, 0, expand)
  let z = 20 - index

  if (progress > ARCHIVE_START) {
    const archiveGather = ease((progress - ARCHIVE_START) / .105)
    const previewHandoff = ease((progress - (ARCHIVE_START + .035)) / .055)
    const archiveX = (compactViewport ? -27 : 11) + (index - 2.5) * .14
    const archiveY = (compactViewport ? -32 : 4) + index * .48
    x = mix(orbitX, archiveX, archiveGather)
    y = mix(orbitY, archiveY, archiveGather)
    scale = mix(1, compactViewport ? 1.4 : 1.35, archiveGather)
    opacity = 1 - previewHandoff
    rotate = mix(0, (index - 2.5) * .7, archiveGather)
    z = 20 - index
  }
  return { x, y, scale, rotate, opacity, z }
}

interface OrbitCardProps {
  project: Project
  index: number
  initialProgress: number
  compactViewport: boolean
  active: boolean
  selected: boolean
}

const OrbitCard = memo(forwardRef<HTMLElement, OrbitCardProps>(function OrbitCard({ project, index, initialProgress, compactViewport, active, selected }, ref) {
  const geometry = cardGeometry(index, initialProgress, compactViewport)
  const transform = `translate3d(${geometry.x}vw, ${geometry.y}vh, 0) rotate(${geometry.rotate}deg) scale(${geometry.scale})`

  return <article ref={ref} className={`orbit-project-card orbit-project-${index + 1}${active ? ' is-active' : ''}${selected ? ' is-selected' : ''}`} style={{ opacity: geometry.opacity, transform, zIndex: geometry.z }}>
    <Link to={`/work/${project.slug}`} aria-label={`View ${project.title} project`} tabIndex={active || selected ? 0 : -1}>
      <ProjectPoster project={project} priority={index < 2} />
    </Link>
  </article>
}), (previous, next) => previous.project === next.project && previous.active === next.active && previous.selected === next.selected)

// New project copy rises in softly instead of swapping in place.
const focusEnter = (delay: number) => ({ initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: .45, delay, ease: [.16, 1, .3, 1] as const } })

// The navigation is a miniature of the orbit: each point turns with its card, the front one is the open project.
function HaloPoint({ index, progress, active, label, onSelect }: { index: number; progress: MotionValue<number>; active: boolean; label: string; onSelect: () => void }) {
  const angle = useTransform(progress, current => (90 + (index - (current < ORBIT_START ? 0 : getOrbitTurn(current))) * 60) * Math.PI / 180)
  const x = useTransform(angle, current => Math.cos(current) * 46)
  const y = useTransform(angle, current => Math.sin(current) * 15)
  const scale = useTransform(angle, current => .72 + .28 * (Math.sin(current) + 1) / 2)
  return <motion.button type="button" className={active ? 'is-active' : ''} style={{ x, y, scale }} onClick={onSelect} aria-label={label} aria-current={active ? 'true' : undefined}><span /></motion.button>
}

function ProjectPoster({ project, priority = false }: { project: Project; priority?: boolean }) {
  return <div className={`orbit-project-poster visual-${project.accent}`}>
    {project.screenshot
      ? <picture>
          {project.screenshot.webp && <source type="image/webp" srcSet={`${project.screenshot.webp.small} 720w, ${project.screenshot.webp.large} 1120w`} sizes="(max-width: 680px) 72vw, 48vw" />}
          <img src={project.screenshot.src} alt={project.screenshot.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" width="16" height="9" />
        </picture>
      : <div className="visual-object" role="img" aria-label={`Abstract preview for ${project.title}`} />}
  </div>
}

function StaticArchive() {
  return <section className="orbit-static section-frame section-block" id="selected-work" aria-labelledby="selected-work-title">
    <div className="section-heading"><div><p className="eyebrow">01 / PROJECT ARCHIVE</p><h2 id="selected-work-title">Six projects.<br /><em>One evolving practice.</em></h2></div><Link className="text-link" to="/work">View all work <ArrowRight size={16} /></Link></div>
    <div className="orbit-static-grid">{projects.map((project) => <Link to={`/work/${project.slug}`} className="orbit-static-card" key={project.slug} aria-label={`View ${project.title} project`}><ProjectPoster project={project} /><div><strong>{project.title}</strong><p>{project.category}</p></div></Link>)}</div>
  </section>
}

export function ProjectOrbitShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const compactViewport = window.matchMedia('(max-width: 680px)').matches
  const cardElements = useRef<Array<HTMLElement | null>>(projects.map(() => null))
  const cardRefCallbacks = useMemo(() => projects.map((_, index) => (element: HTMLElement | null) => {
    cardElements.current[index] = element
  }), [])
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectorIndex, setSelectorIndex] = useState(0)
  const [phase, setPhase] = useState<'reveal' | 'form' | 'orbit' | 'archive'>('reveal')
  const activeIndexRef = useRef(activeIndex)
  const phaseRef = useRef(phase)

  useEffect(() => {
    let active = true
    void prepareInitialViewport().then(() => {
      if (!active) return
      const compactViewport = window.matchMedia('(max-width: 680px)').matches
      const renderedPosterWidth = window.innerWidth * (compactViewport ? .72 : .48)
      const requestedPosterWidth = renderedPosterWidth * Math.min(window.devicePixelRatio || 1, 2)
      const posterSources = projects.flatMap((project) => {
        const screenshot = project.screenshot
        if (!screenshot) return []
        if (!screenshot.webp) return [screenshot.src]
        return [requestedPosterWidth <= 720 ? screenshot.webp.small : screenshot.webp.large]
      })
      const directProjectEntry = ['#work', '#selected-work', '#projects'].includes(window.location.hash)
      prepareProjectPosters(posterSources, directProjectEntry ? posterSources.length : 2)
    })
    return () => { active = false }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // Lenis already eases the scroll on every device; a spring on top made the cards trail and wobble.
  const animationProgress = scrollYProgress
  const progressScale = useTransform(animationProgress, [0, 1], [0, 1])
  const revealOpacity = useTransform(animationProgress, [0, .02, REVEAL_END - .02, FORMATION_START], [0, 1, 1, 0])
  const revealY = useTransform(animationProgress, [0, .04], [18, 0])
  const formationOpacity = useTransform(animationProgress, [FORMATION_START, FORMATION_START + .025, ORBIT_START - .035, ORBIT_START], [0, 1, 1, 0])
  const orbitUiOpacity = useTransform(animationProgress, [ORBIT_START - .015, ORBIT_START + .025, ARCHIVE_START - .035, ARCHIVE_START], [0, 1, 1, 0])
  const orbitUiY = useTransform(animationProgress, [ORBIT_START - .015, ORBIT_START + .035], [20, 0])
  const archiveOpacity = useTransform(animationProgress, [ARCHIVE_START + .045, ARCHIVE_START + .085], [0, 1])
  const archiveY = useTransform(animationProgress, [ARCHIVE_START + .035, ARCHIVE_START + .09], [26, 0])

  useMotionValueEvent(animationProgress, 'change', latest => {
    cardElements.current.forEach((card, index) => {
      if (!card) return
      const geometry = cardGeometry(index, latest, compactViewport)
      card.style.transform = `translate3d(${geometry.x}vw, ${geometry.y}vh, 0) rotate(${geometry.rotate}deg) scale(${geometry.scale})`
      const opacity = String(geometry.opacity)
      const zIndex = String(geometry.z)
      if (card.style.opacity !== opacity) card.style.opacity = opacity
      if (card.style.zIndex !== zIndex) card.style.zIndex = zIndex
    })

    const nextPhase = latest < FORMATION_START ? 'reveal' : latest < ORBIT_START ? 'form' : latest < ARCHIVE_START ? 'orbit' : 'archive'
    if (nextPhase !== phaseRef.current) {
      phaseRef.current = nextPhase
      setPhase(nextPhase)
    }
    const nextIndex = nextPhase === 'reveal' ? getRevealIndex(latest) : nextPhase === 'form' ? 0 : Math.round(getOrbitTurn(latest))
    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex
      setActiveIndex(nextIndex)
    }
  })

  const goToProject = useCallback((index: number) => {
    const section = sectionRef.current
    if (!section) return
    const maxScroll = section.offsetHeight - window.innerHeight
    const sectionTop = window.scrollY + section.getBoundingClientRect().top
    const targetProgress = ORBIT_START + (index / (projects.length - 1)) * (ORBIT_END - ORBIT_START)
    window.scrollTo({ top: sectionTop + maxScroll * targetProgress, behavior: 'smooth' })
  }, [])

  if (reduceMotion) return <StaticArchive />
  const activeProject = projects[activeIndex]
  const activeStack = activeProject.technologies.filter(item => item !== 'Details in progress')
  const selectedProject = projects[selectorIndex]
  const selectedStack = selectedProject.technologies.filter(item => item !== 'Details in progress').slice(0, 3)
  const displayIndex = phase === 'archive' ? selectorIndex : activeIndex

  return <section className={`project-orbit-section orbit-phase-${phase}`} id="selected-work" ref={sectionRef} aria-label="Animated project archive">
    <div className="project-orbit-sticky">
      <div className="orbit-topline"><span><b>01</b>Project archive</span><span><em className="orbit-ticks" aria-hidden="true">{projects.map((project, index) => <i key={project.slug} className={index <= displayIndex ? 'is-lit' : ''} />)}</em><b>0{displayIndex + 1}</b> / 06 · Six selected projects</span></div>
      <motion.div className="orbit-progress" style={{ scaleX: progressScale }} />
      <div className="orbit-stage">
        {projects.map((project, index) => <OrbitCard ref={cardRefCallbacks[index]} key={project.slug} project={project} index={index} initialProgress={animationProgress.get()} compactViewport={compactViewport} active={(phase === 'reveal' || phase === 'orbit') && index === activeIndex} selected={phase === 'archive' && index === selectorIndex} />)}
      </div>

      <motion.div className="orbit-reveal-caption" style={{ opacity: revealOpacity, y: revealY }} aria-live="polite">
        <span>OPENING 0{activeIndex + 1} / 06</span><strong>{activeProject.title}</strong><small>{activeProject.category}</small>
      </motion.div>
      <motion.div className="orbit-forming-label" style={{ opacity: formationOpacity }}><span>ALL PROJECTS OPENED</span><strong>FORMING THE ORBIT</strong></motion.div>

      <motion.aside className="orbit-focus-copy" style={{ opacity: orbitUiOpacity, y: orbitUiY }} aria-live="polite">
        <motion.p key={`eyebrow-${activeIndex}`} className="eyebrow" {...focusEnter(0)}><b>0{activeIndex + 1}</b>{activeProject.category}</motion.p>
        <motion.h3 key={`title-${activeIndex}`} {...focusEnter(.04)}>{activeProject.title}</motion.h3>
        <motion.p key={`summary-${activeIndex}`} {...focusEnter(.08)}>{activeProject.summary}</motion.p>
        {activeStack.length > 0 && <motion.ul key={`stack-${activeIndex}`} className="orbit-focus-stack" aria-label="Technologies" {...focusEnter(.12)}>{activeStack.map(item => <li key={item}>{item}</li>)}</motion.ul>}
        <div className="orbit-focus-actions"><Link to={`/work/${activeProject.slug}`}>View project <ArrowRight size={15} /></Link><Link to="/work">All six projects</Link></div>
      </motion.aside>

      <motion.nav className="orbit-navigation" style={{ opacity: orbitUiOpacity, y: orbitUiY }} aria-label="Project orbit navigation">
        <button type="button" onClick={() => goToProject(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label="Previous project"><ChevronLeft size={17} /></button>
        <div className="orbit-halo-map">{projects.map((project, index) => <HaloPoint key={project.slug} index={index} progress={animationProgress} active={index === activeIndex} label={`Show project ${index + 1}: ${project.title}`} onSelect={() => goToProject(index)} />)}</div>
        <button type="button" onClick={() => goToProject(Math.min(projects.length - 1, activeIndex + 1))} disabled={activeIndex === projects.length - 1} aria-label="Next project"><ChevronRight size={17} /></button>
      </motion.nav>
      <motion.div className="orbit-archive-selector" style={{ opacity: archiveOpacity, y: archiveY }}>
        <div className="orbit-archive-index">
          <p className="orbit-archive-label"><b>06</b>Project index</p><h2>Choose the work<br /><em>you want to open.</em></h2>
          <div className="orbit-archive-rows">{projects.map((project, index) => <button type="button" className={selectorIndex === index ? 'is-active' : ''} aria-pressed={selectorIndex === index} onMouseEnter={() => setSelectorIndex(index)} onFocus={() => setSelectorIndex(index)} onClick={() => setSelectorIndex(index)} key={project.slug}><span>0{index + 1}</span><strong>{project.title}</strong><small>{project.category}</small><i aria-hidden="true"><ArrowRight size={15} /></i></button>)}</div>
          <Link className="orbit-all-work" to="/work">Explore complete archive <ArrowRight size={16} /></Link>
        </div>
        <div className="orbit-archive-preview">
          <div className="orbit-final-deck">
            <Link to={`/work/${selectedProject.slug}`} aria-label={`Open ${selectedProject.title} case study`}>
              <ProjectPoster project={selectedProject} />
            </Link>
          </div>
          <div className="orbit-archive-meta"><p className="orbit-archive-label"><b>0{selectorIndex + 1}</b>{selectedProject.role}</p><h3>{selectedProject.title}</h3><p>{selectedProject.summary}</p>{selectedStack.length > 0 && <ul aria-label="Technologies">{selectedStack.map(item => <li key={item}>{item}</li>)}</ul>}<Link to={`/work/${selectedProject.slug}`}>View case study <ArrowRight size={16} /></Link></div>
        </div>
      </motion.div>
      <p className="orbit-scroll-note">{phase === 'reveal' ? 'SCROLL TO OPEN EACH PROJECT' : phase === 'form' ? 'THE DECK BECOMES AN ORBIT' : phase === 'archive' ? 'SELECT A PROJECT OR CONTINUE' : 'SCROLL OR USE NAVIGATION'} <span aria-hidden="true">↓</span></p>
    </div>
  </section>
}
