import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Users,
} from 'lucide-react'
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'motion/react'
import { profile } from '../../data/profile'

type JourneyCategory = 'technical' | 'community'

interface ExperienceItem {
  period: string
  title: string
  place: string
  summary: string
  highlights: string[]
  gallery?: Array<{ label: string; alt: string; src: string }>
}

interface JourneyDefinition {
  title: string
  tag: string
  kicker: string
  description: string
  number: string
  items: ExperienceItem[]
}

const JOURNEYS: Record<JourneyCategory, JourneyDefinition> = {
  technical: {
    title: 'Technical Involvement',
    tag: 'CRAFT & SYSTEMS',
    kicker: 'ENGINEERING JOURNEY',
    description: 'Developing digital systems, diving into codebases, and collaborating with cross-functional product teams.',
    number: '01',
    items: profile.experiences,
  },
  community: {
    title: 'Organizations & Community',
    tag: 'LEADERSHIP & CULTURE',
    kicker: 'COMMUNITY JOURNEY',
    description: 'Organizing initiatives, mentoring peers, driving student committees, and creating shared spaces for impact.',
    number: '02',
    items: profile.organizations,
  },
}

// Chapter progress anchors (0 -> 0.20, 1 -> 0.50, 2 -> 0.80)
const CHAPTER_ANCHORS = [0.20, 0.50, 0.80]
const CHAPTER_STEP = 0.30

export function ExperienceShowcase() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState<JourneyCategory>('technical')
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  const [lightboxPhoto, setLightboxPhoto] = useState<{ src: string; alt: string; label: string } | null>(null)

  const currentJourney = JOURNEYS[activeCategory]
  const chapters = currentJourney.items
  const totalChapters = chapters.length

  // Scroll tracking across the pinned journey canvas
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Fluid spring physics for continuous, tactile scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0004,
  })

  // Synchronize active chapter index as progress crosses midway between chapters
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    let closestIndex = 0
    let smallestDiff = 999
    CHAPTER_ANCHORS.forEach((anchor, idx) => {
      const diff = Math.abs(latest - anchor)
      if (diff < smallestDiff) {
        smallestDiff = diff
        closestIndex = idx
      }
    })
    if (closestIndex !== activeChapterIndex && closestIndex < totalChapters) {
      setActiveChapterIndex(closestIndex)
    }
  })

  // Smooth cinematic jump to chapter anchor
  const scrollToChapter = useCallback((index: number) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const scrollTop = window.scrollY + rect.top
    const scrollHeight = sectionRef.current.scrollHeight - window.innerHeight
    const targetProgress = CHAPTER_ANCHORS[index] ?? 0.20 + index * CHAPTER_STEP
    const targetY = scrollTop + targetProgress * scrollHeight

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxPhoto(null)
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (activeChapterIndex < totalChapters - 1) {
          scrollToChapter(activeChapterIndex + 1)
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (activeChapterIndex > 0) {
          scrollToChapter(activeChapterIndex - 1)
        }
      }
    }

    const currentSection = sectionRef.current
    if (!currentSection) return

    const checkViewport = () => {
      const rect = currentSection.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
        window.addEventListener('keydown', handleKeyDown)
      } else {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }

    window.addEventListener('scroll', checkViewport, { passive: true })
    checkViewport()

    return () => {
      window.removeEventListener('scroll', checkViewport)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeChapterIndex, totalChapters, scrollToChapter])

  // Motion transforms for section header and departure state
  const headerOpacity = useTransform(smoothProgress, [0, 0.08, 0.86, 0.94], [0, 1, 1, 0.15])
  const headerY = useTransform(smoothProgress, [0, 0.08, 0.86, 0.94], [25, 0, 0, -25])
  const departureOpacity = useTransform(smoothProgress, [0.84, 0.94, 1], [0, 1, 1])
  const departureY = useTransform(smoothProgress, [0.84, 0.94, 1], [30, 0, -10])

  const activeChapter = chapters[activeChapterIndex] || chapters[0]

  return (
    <section
      className="journey-chapters-section"
      id="experience"
      ref={sectionRef}
      aria-label="Chapters of My Journey — Experience"
    >
      {/* Pinned 100svh Viewport Stage */}
      <div className="journey-sticky-stage">
        {/* Ambient Twilight Aura (Strictly transparent base, inherits global sky) */}
        <div className="journey-ambient-glow" aria-hidden="true" />

        {/* Section Top Header (Editorial & Category Switcher) */}
        <motion.header
          className="journey-header"
          style={reduceMotion ? undefined : { opacity: headerOpacity, y: headerY }}
        >
          <div className="journey-header-eyebrow">
            <span className="journey-index-tag">02 // PERSONAL CHRONICLES</span>
            <span className="journey-sky-phase">TWILIGHT PHASE · CHAPTERS OF MY JOURNEY</span>
          </div>

          <div className="journey-header-main">
            <div className="journey-title-block">
              <h2 className="journey-title">
                Chapters of <em>My Journey.</em>
              </h2>
              <p className="journey-subtitle">
                A personal chronicle of where I contributed, who I collaborated with, what I learned, and how each step shaped my growth.
              </p>
            </div>

            {/* Contemporary Editorial Journey Category Switcher */}
            <div className="journey-category-switch" role="tablist" aria-label="Journey categories">
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'technical'}
                className={`category-toggle ${activeCategory === 'technical' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveCategory('technical')
                  scrollToChapter(0)
                }}
              >
                <span className="toggle-dot" />
                <span className="toggle-num">01</span>
                <span className="toggle-label">Technical Involvement</span>
                <span className="toggle-count">({JOURNEYS.technical.items.length})</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'community'}
                className={`category-toggle ${activeCategory === 'community' ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveCategory('community')
                  scrollToChapter(0)
                }}
              >
                <span className="toggle-dot" />
                <span className="toggle-num">02</span>
                <span className="toggle-label">Organizations & Community</span>
                <span className="toggle-count">({JOURNEYS.community.items.length})</span>
              </button>
            </div>
          </div>

          {/* Chapter Timeline Progress Bar with Live Fill */}
          <div className="journey-timeline-rail" aria-label="Chapter progress track">
            {chapters.map((item, idx) => (
              <RailSegment
                key={`${activeCategory}-${item.period}-${idx}`}
                index={idx}
                item={item}
                activeIndex={activeChapterIndex}
                progress={smoothProgress}
                onClick={() => scrollToChapter(idx)}
              />
            ))}
          </div>
        </motion.header>

        {/* Central Chapter Composition: Open Atmosphere (NO GIANT CARD!) */}
        <div className="journey-scene-viewport">
          {chapters.map((chapter, idx) => {
            const isCurrent = idx === activeChapterIndex
            const center = CHAPTER_ANCHORS[idx]

            return (
              <ChapterEditorialSpread
                key={`${activeCategory}-${chapter.period}-${idx}`}
                chapter={chapter}
                index={idx}
                totalChapters={totalChapters}
                categoryDef={currentJourney}
                isCurrent={isCurrent}
                center={center}
                progress={smoothProgress}
                reducedMotion={Boolean(reduceMotion)}
                onOpenPhoto={(photo) => setLightboxPhoto(photo)}
              />
            )
          })}
        </div>

        {/* Bottom Tactile Chapter Navigation */}
        <footer className="journey-deck-footer">
          <div className="journey-nav-controls">
            <button
              type="button"
              className="chapter-nav-btn prev-btn"
              disabled={activeChapterIndex === 0}
              onClick={() => scrollToChapter(activeChapterIndex - 1)}
              aria-label="Previous chapter"
            >
              <ChevronLeft size={16} />
              <span>PREVIOUS CHAPTER</span>
            </button>

            <div className="chapter-indicator-chip">
              <span className="chip-chapter-code">
                {currentJourney.number} / 0{activeChapterIndex + 1}
              </span>
              <span className="chip-sep">·</span>
              <span className="chip-chapter-title">{activeChapter?.title}</span>
            </div>

            <button
              type="button"
              className="chapter-nav-btn next-btn"
              disabled={activeChapterIndex === totalChapters - 1}
              onClick={() => scrollToChapter(activeChapterIndex + 1)}
              aria-label="Next chapter"
            >
              <span>NEXT CHAPTER</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="journey-scroll-hint">
            <span>SCROLL OR USE ARROW KEYS TO EXPLORE CHAPTERS</span>
          </div>
        </footer>

        {/* State E: Seamless Departure Handoff toward Midnight Sky */}
        <motion.div
          className="journey-departure-banner"
          style={reduceMotion ? undefined : { opacity: departureOpacity, y: departureY }}
          aria-hidden="true"
        >
          <div className="departure-capsule">
            <span className="departure-kicker">03 // UPCOMING STORY</span>
            <strong className="departure-headline">BETWEEN SYSTEMS AND STORIES</strong>
            <span className="departure-cue">THE MAKER AWAITS IN THE MIDNIGHT SKY ↓</span>
          </div>
        </motion.div>
      </div>

      {/* Memory Photograph Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            className="photo-lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Memory Photograph Viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
          >
            <motion.div
              className="photo-lightbox-card"
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-header">
                <span className="lightbox-title">{lightboxPhoto.label}</span>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setLightboxPhoto(null)}
                  aria-label="Close memory viewer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="lightbox-body">
                <img src={lightboxPhoto.src} alt={lightboxPhoto.alt} />
              </div>

              <div className="lightbox-footer">
                <p>{lightboxPhoto.alt || lightboxPhoto.label}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

interface RailSegmentProps {
  index: number
  item: ExperienceItem
  activeIndex: number
  progress: any
  onClick: () => void
}

function RailSegment({ index, item, activeIndex, progress, onClick }: RailSegmentProps) {
  const center = CHAPTER_ANCHORS[index] ?? 0.20 + index * CHAPTER_STEP
  // Proportional fill bar as scroll progresses through chapter region
  const fillScale = useTransform(
    progress,
    [center - CHAPTER_STEP * 0.5, center + CHAPTER_STEP * 0.5],
    [0, 1],
    { clamp: true }
  )

  const isCurrent = index === activeIndex
  const isPassed = index < activeIndex

  return (
    <button
      type="button"
      className={`rail-segment ${isCurrent ? 'is-active' : isPassed ? 'is-passed' : ''}`}
      onClick={onClick}
      aria-label={`Jump to chapter 0${index + 1}: ${item.title}`}
    >
      <span className="segment-track">
        <motion.span className="segment-fill" style={{ scaleX: fillScale }} />
      </span>
      <span className="segment-label">
        <small>0{index + 1}</small>
        <strong>{item.title}</strong>
      </span>
    </button>
  )
}

interface ChapterEditorialSpreadProps {
  chapter: ExperienceItem
  index: number
  totalChapters: number
  categoryDef: JourneyDefinition
  isCurrent: boolean
  center: number
  progress: any
  reducedMotion: boolean
  onOpenPhoto: (photo: { src: string; alt: string; label: string }) => void
}

function ChapterEditorialSpread({
  chapter,
  index,
  totalChapters,
  categoryDef,
  isCurrent,
  center,
  progress,
  reducedMotion,
  onOpenPhoto,
}: ChapterEditorialSpreadProps) {
  // Continuous fluid motion for the chapter spread (no jarring step snaps)
  const y = useTransform(
    progress,
    [center - CHAPTER_STEP, center, center + CHAPTER_STEP],
    [35, 0, -35]
  )
  const opacity = useTransform(
    progress,
    [center - CHAPTER_STEP * 0.85, center, center + CHAPTER_STEP * 0.85],
    [0, 1, 0]
  )
  const scale = useTransform(
    progress,
    [center - CHAPTER_STEP, center, center + CHAPTER_STEP],
    [0.96, 1, 0.96]
  )

  // Check if a real memory photograph is available (src is not empty)
  const validPhoto = chapter.gallery?.find((item) => item.src && item.src.trim() !== '')

  return (
    <motion.article
      className={`chapter-editorial-scene ${isCurrent ? 'is-active' : ''}`}
      style={
        reducedMotion
          ? { opacity: isCurrent ? 1 : 0 }
          : { y, opacity, scale }
      }
      aria-hidden={!isCurrent}
    >
      <div className="chapter-spread-grid">
        {/* Left / Narrative Story Column (Open, Breathable Typography) */}
        <div className="chapter-narrative-column">
          {/* Chapter Metadata Ribbon */}
          <div className="chapter-meta-ribbon">
            <span className="chapter-badge">
              <span className="chapter-dot" />
              <span>
                CHAPTER 0{index + 1} OF 0{totalChapters} · {categoryDef.kicker}
              </span>
            </span>
            <span className="chapter-period-tag">{chapter.period}</span>
          </div>

          {/* Role & Leadership Title */}
          <h3 className="chapter-role-heading">{chapter.title}</h3>

          {/* Organization, Team, or Community Event */}
          <p className="chapter-place-heading">
            <span className="place-at">@</span> {chapter.place}
          </p>

          {/* Personal Journey Narrative */}
          <p className="chapter-narrative-prose">{chapter.summary}</p>

          {/* Growth, Contributions & What I Learned */}
          <div className="chapter-growth-block">
            <span className="growth-block-title">
              ✦ WHERE I CONTRIBUTED & LESSONS LEARNED
            </span>
            <ul className="growth-points-list">
              {chapter.highlights.map((highlight, hIdx) => (
                <li key={`${highlight}-${hIdx}`}>
                  <span className="point-bullet">✦</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Personal Reflection & Growth Focus */}
          <div className="chapter-takeaway-row">
            <span className="takeaway-pill">
              <Users size={13} className="takeaway-icon" />
              <span>
                {categoryDef.title === 'Technical Involvement'
                  ? 'Collaborative Engineering & Architecture Rigor'
                  : 'Team Leadership, Mentorship & Community Impact'}
              </span>
            </span>
            <span className="takeaway-status">✦ VERIFIED CHAPTER</span>
          </div>
        </div>

        {/* Right / Visual Column: Adapts naturally whether photos exist or not */}
        <div className="chapter-visual-column">
          {validPhoto ? (
            /* CASE A: Real Memory Photo is present — Subtle Scrapbook-Inspired Print */
            <div
              className="memory-photo-plate"
              onClick={() => onOpenPhoto(validPhoto)}
              role="button"
              tabIndex={isCurrent ? 0 : -1}
              aria-label={`View photograph: ${validPhoto.label}`}
            >
              <div className="photo-plate-mat">
                <img src={validPhoto.src} alt={validPhoto.alt} loading="lazy" />
                <div className="photo-tape-caption">
                  <span>// {validPhoto.label}</span>
                  <Maximize2 size={13} />
                </div>
              </div>
              <div className="photo-polaroid-note">
                <small>{chapter.place}</small>
                <span>{chapter.period}</span>
              </div>
            </div>
          ) : (
            /* CASE B: Typography-Led Reflection Spread (NO FAKE DASHED UPLOAD BOXES!) */
            <div className="chapter-reflection-card" aria-hidden="true">
              <div className="card-top-accent">
                <span className="card-accent-tag">PERSONAL MEMOIR</span>
                <span className="card-chapter-num">0{index + 1}</span>
              </div>

              <div className="card-quote-section">
                <span className="quote-glyph">“</span>
                <p className="quote-text">
                  {categoryDef.title === 'Technical Involvement'
                    ? 'Every system I built was more than just lines of code—it was about understanding the people using it and learning to solve complex problems side-by-side with passionate teammates.'
                    : 'Leading organizations taught me that true impact comes from creating environments where every contributor feels empowered, heard, and excited to collaborate toward a shared vision.'}
                </p>
              </div>

              <div className="card-meta-ledger">
                <div className="ledger-item">
                  <span className="ledger-label">ROLE & SCOPE</span>
                  <span className="ledger-val">{chapter.title}</span>
                </div>
                <div className="ledger-item">
                  <span className="ledger-label">ORGANIZATION / TEAM</span>
                  <span className="ledger-val">{chapter.place}</span>
                </div>
                <div className="ledger-item">
                  <span className="ledger-label">GROWTH MILESTONE</span>
                  <span className="ledger-val">
                    {categoryDef.title === 'Technical Involvement'
                      ? 'Engineering Depth & Problem Solving'
                      : 'Culture Building & Peer Mentorship'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}
