import { useCallback, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { projects, type Project } from '../../data/projects'

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
    if (local < .68) {
      const lift = ease(local / .34)
      return { x: mix(deckX, side * 1.5, lift), y: mix(deckY, -2.5, lift), scale: mix(deckScale, 1.075, lift), rotate: mix(0, side * 1.8, lift), opacity: 1, z: 50, depth: 1 }
    }
    const park = ease((local - .68) / .32)
    return { x: mix(side * 1.5, openedX, park), y: mix(-2.5, openedY, park), scale: mix(1.075, .72, park), rotate: mix(side * 1.8, openedRotate, park), opacity: 1, z: 12 - index, depth: 1 }
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

function OrbitCard({ project, index, progress, active, selected }: { project: Project; index: number; progress: MotionValue<number>; active: boolean; selected: boolean }) {
  const compactViewport = window.matchMedia('(max-width: 680px)').matches
  const geometry = useTransform(progress, current => cardGeometry(index, current, compactViewport))
  const x = useTransform(geometry, current => `${current.x}vw`)
  const y = useTransform(geometry, current => `${current.y}vh`)
  const scale = useTransform(geometry, current => current.scale)
  const rotate = useTransform(geometry, current => current.rotate)
  const opacity = useTransform(geometry, current => current.opacity)
  const zIndex = useTransform(geometry, current => current.z)

  return <motion.article className={`orbit-project-card orbit-project-${index + 1}${active ? ' is-active' : ''}${selected ? ' is-selected' : ''}`} style={{ opacity, x, y, rotate, scale, zIndex }}>
    <Link to={`/work/${project.slug}`} aria-label={`View ${project.title} project`} tabIndex={active || selected ? 0 : -1}>
      <ProjectPoster project={project} />
    </Link>
  </motion.article>
}

function ProjectPoster({ project }: { project: Project }) {
  return <div className={`orbit-project-poster visual-${project.accent}`}>
    {project.screenshot
      ? <img src={project.screenshot.src} alt={project.screenshot.alt} loading="lazy" decoding="async" />
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
  const reduceMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectorIndex, setSelectorIndex] = useState(0)
  const [phase, setPhase] = useState<'reveal' | 'form' | 'orbit' | 'archive'>('reveal')
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // Lenis already eases the scroll; a spring on top made the cards trail and wobble.
  const smoothProgress = scrollYProgress
  const progressScale = useTransform(smoothProgress, [0, 1], [0, 1])
  const revealOpacity = useTransform(smoothProgress, [0, .02, REVEAL_END - .02, FORMATION_START], [0, 1, 1, 0])
  const revealY = useTransform(smoothProgress, [0, .04], [18, 0])
  const formationOpacity = useTransform(smoothProgress, [FORMATION_START, FORMATION_START + .025, ORBIT_START - .035, ORBIT_START], [0, 1, 1, 0])
  const orbitUiOpacity = useTransform(smoothProgress, [ORBIT_START - .015, ORBIT_START + .025, ARCHIVE_START - .035, ARCHIVE_START], [0, 1, 1, 0])
  const orbitUiY = useTransform(smoothProgress, [ORBIT_START - .015, ORBIT_START + .035], [20, 0])
  const archiveOpacity = useTransform(smoothProgress, [ARCHIVE_START + .045, ARCHIVE_START + .085], [0, 1])
  const archiveY = useTransform(smoothProgress, [ARCHIVE_START + .035, ARCHIVE_START + .09], [26, 0])

  useMotionValueEvent(smoothProgress, 'change', latest => {
    const nextPhase = latest < FORMATION_START ? 'reveal' : latest < ORBIT_START ? 'form' : latest < ARCHIVE_START ? 'orbit' : 'archive'
    if (nextPhase !== phase) setPhase(nextPhase)
    const nextIndex = nextPhase === 'reveal' ? getRevealIndex(latest) : nextPhase === 'form' ? 0 : Math.round(getOrbitTurn(latest))
    if (nextIndex !== activeIndex) setActiveIndex(nextIndex)
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
  const selectedProject = projects[selectorIndex]
  const displayIndex = phase === 'archive' ? selectorIndex : activeIndex

  return <section className={`project-orbit-section orbit-phase-${phase}`} id="selected-work" ref={sectionRef} aria-label="Animated project archive">
    <div className="project-orbit-sticky">
      <div className="orbit-topline"><span>01 / PROJECT ARCHIVE</span><span>0{displayIndex + 1} / 06 · SIX SELECTED PROJECTS</span></div>
      <motion.div className="orbit-progress" style={{ scaleX: progressScale }} />
      <div className="orbit-stage">
        {projects.map((project, index) => <OrbitCard key={project.slug} project={project} index={index} progress={smoothProgress} active={(phase === 'reveal' || phase === 'orbit') && index === activeIndex} selected={phase === 'archive' && index === selectorIndex} />)}
      </div>

      <motion.div className="orbit-reveal-caption" style={{ opacity: revealOpacity, y: revealY }} aria-live="polite">
        <span>OPENING 0{activeIndex + 1} / 06</span><strong>{activeProject.title}</strong><small>{activeProject.category}</small>
      </motion.div>
      <motion.div className="orbit-forming-label" style={{ opacity: formationOpacity }}><span>ALL PROJECTS OPENED</span><strong>FORMING THE ORBIT</strong></motion.div>

      <motion.aside className="orbit-focus-copy" style={{ opacity: orbitUiOpacity, y: orbitUiY }} aria-live="polite">
        <p className="eyebrow">PROJECT 0{activeIndex + 1} / {activeProject.category}</p>
        <h3>{activeProject.title}</h3><p>{activeProject.summary}</p>
        <div className="orbit-focus-actions"><Link to={`/work/${activeProject.slug}`}>View project <ArrowRight size={15} /></Link><Link to="/work">All six projects</Link></div>
      </motion.aside>

      <motion.nav className="orbit-navigation" style={{ opacity: orbitUiOpacity, y: orbitUiY }} aria-label="Project orbit navigation">
        <button type="button" onClick={() => goToProject(Math.max(0, activeIndex - 1))} disabled={activeIndex === 0} aria-label="Previous project"><ChevronLeft size={17} /></button>
        <div className="orbit-dots">{projects.map((project, index) => <button key={project.slug} type="button" className={index === activeIndex ? 'is-active' : ''} onClick={() => goToProject(index)} aria-label={`Show project ${index + 1}: ${project.title}`} aria-current={index === activeIndex ? 'true' : undefined}><span /></button>)}</div>
        <button type="button" onClick={() => goToProject(Math.min(projects.length - 1, activeIndex + 1))} disabled={activeIndex === projects.length - 1} aria-label="Next project"><ChevronRight size={17} /></button>
      </motion.nav>
      <motion.div className="orbit-archive-selector" style={{ opacity: archiveOpacity, y: archiveY }}>
        <div className="orbit-archive-index">
          <p>PROJECT INDEX / 06 STORIES</p><h2>Choose the work<br /><em>you want to open.</em></h2>
          <div className="orbit-archive-rows">{projects.map((project, index) => <button type="button" className={selectorIndex === index ? 'is-active' : ''} aria-pressed={selectorIndex === index} onMouseEnter={() => setSelectorIndex(index)} onFocus={() => setSelectorIndex(index)} onClick={() => setSelectorIndex(index)} key={project.slug}><span>0{index + 1}</span><strong>{project.title}</strong><small>{project.category}</small><ArrowRight size={15} /></button>)}</div>
          <Link className="orbit-all-work" to="/work">Explore complete archive <ArrowRight size={16} /></Link>
        </div>
        <div className="orbit-archive-preview">
          <div className="orbit-final-deck">
            <Link to={`/work/${selectedProject.slug}`} aria-label={`Open ${selectedProject.title} case study`}>
              <ProjectPoster project={selectedProject} />
            </Link>
          </div>
          <div className="orbit-archive-meta"><p>PROJECT 0{selectorIndex + 1} / {selectedProject.role}</p><h3>{selectedProject.title}</h3><p>{selectedProject.summary}</p><ul>{selectedProject.technologies.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul><Link to={`/work/${selectedProject.slug}`}>View case study <ArrowRight size={16} /></Link></div>
        </div>
      </motion.div>
      <p className="orbit-scroll-note">{phase === 'reveal' ? 'SCROLL TO OPEN EACH PROJECT' : phase === 'form' ? 'THE DECK BECOMES AN ORBIT' : phase === 'archive' ? 'SELECT A PROJECT OR CONTINUE ↓' : 'SCROLL OR USE NAVIGATION'} <span aria-hidden="true">↓</span></p>
    </div>
  </section>
}
