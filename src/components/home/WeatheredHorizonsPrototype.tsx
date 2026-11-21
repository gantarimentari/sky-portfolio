import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  beyondCodeExperiences,
  type BeyondCodeCategory,
  type BeyondCodeExperience,
} from '../../data/profile'

type ExperienceFilter = 'all' | BeyondCodeCategory
type ExperiencePhoto = BeyondCodeExperience['gallery'][number]
type GalleryViewer = { photos: ExperiencePhoto[]; index: number }

const FILTERS: Array<{ value: ExperienceFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'tech-communities', label: 'Tech Communities' },
  { value: 'leadership-involvement', label: 'Leadership & Involvement' },
]

const FAN_LAYOUTS = {
  1: [{ x: 0, y: -74, rotate: 0 }],
  2: [
    { x: -58, y: -54, rotate: -7 },
    { x: 58, y: -62, rotate: 7 },
  ],
  3: [
    { x: -86, y: -38, rotate: -9 },
    { x: 0, y: -78, rotate: 0 },
    { x: 86, y: -38, rotate: 9 },
  ],
} as const

export function WeatheredHorizonsPrototype() {
  const reducedMotion = useReducedMotion()
  const filterRefs = useRef<Array<HTMLButtonElement | null>>([])
  const viewerRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const viewerTriggerRef = useRef<HTMLButtonElement | null>(null)
  const savedScrollPosition = useRef(0)
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>('all')
  const [activeIndex, setActiveIndex] = useState(0)
  const [galleryViewer, setGalleryViewer] = useState<GalleryViewer | null>(null)
  const isViewerOpen = galleryViewer !== null

  const filteredExperiences = useMemo(
    () => activeFilter === 'all'
      ? beyondCodeExperiences
      : beyondCodeExperiences.filter((experience) => experience.category === activeFilter),
    [activeFilter],
  )

  const activeExperience = filteredExperiences[activeIndex]

  const closeViewer = useCallback(() => setGalleryViewer(null), [])
  const moveViewer = useCallback((direction: -1 | 1) => {
    setGalleryViewer((current) => {
      if (!current || current.photos.length < 2) return current
      return {
        ...current,
        index: (current.index + direction + current.photos.length) % current.photos.length,
      }
    })
  }, [])

  useEffect(() => {
    if (!isViewerOpen) return

    savedScrollPosition.current = window.scrollY
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0)
    const handleKeys = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeViewer()
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        moveViewer(-1)
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        moveViewer(1)
        return
      }
      if (event.key !== 'Tab' || !viewerRef.current) return

      const focusable = Array.from(
        viewerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeys)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeys)
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      window.scrollTo(0, savedScrollPosition.current)
      window.requestAnimationFrame(() => viewerTriggerRef.current?.focus())
    }
  }, [isViewerOpen, closeViewer, moveViewer])

  const selectFilter = (filter: ExperienceFilter) => {
    setActiveFilter(filter)
    setActiveIndex(0)
  }

  const moveExperience = (direction: -1 | 1) => {
    setActiveIndex((current) => {
      const next = current + direction
      return Math.min(Math.max(next, 0), Math.max(filteredExperiences.length - 1, 0))
    })
  }

  const openViewer = (
    photos: ExperiencePhoto[],
    index: number,
    trigger: HTMLButtonElement,
  ) => {
    viewerTriggerRef.current = trigger
    setGalleryViewer({ photos, index })
  }

  const handleFilterKeys = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % FILTERS.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + FILTERS.length) % FILTERS.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = FILTERS.length - 1
    }

    if (nextIndex === null) return
    event.preventDefault()
    selectFilter(FILTERS[nextIndex].value)
    filterRefs.current[nextIndex]?.focus()
  }

  const viewerPhoto = galleryViewer?.photos[galleryViewer.index]
  const viewer = typeof document === 'undefined' ? null : createPortal(
    <AnimatePresence>
      {galleryViewer && viewerPhoto && (
        <motion.div
          ref={viewerRef}
          className="experience-photo-viewer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="experience-viewer-title"
          aria-describedby="experience-viewer-caption"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeViewer}
        >
          <div className="experience-photo-viewer-bar">
            <div>
              <strong id="experience-viewer-title">{viewerPhoto.label}</strong>
              <span>{galleryViewer.index + 1} of {galleryViewer.photos.length}</span>
            </div>
            <button ref={closeButtonRef} type="button" onClick={closeViewer} aria-label="Close photo viewer">
              <X aria-hidden="true" />
            </button>
          </div>

          <motion.figure
            key={viewerPhoto.src}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <motion.div
              className="experience-photo-viewer-stage"
              drag={reducedMotion || galleryViewer.photos.length < 2 ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_event, info) => {
                if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 480) {
                  moveViewer(info.offset.x < 0 ? 1 : -1)
                }
              }}
            >
              <img src={viewerPhoto.src} alt={viewerPhoto.alt} />
            </motion.div>
            <figcaption id="experience-viewer-caption">{viewerPhoto.alt}</figcaption>
          </motion.figure>

          {galleryViewer.photos.length > 1 && (
            <div className="experience-photo-viewer-navigation" onClick={(event) => event.stopPropagation()}>
              <button type="button" onClick={() => moveViewer(-1)} aria-label="View previous photograph">
                <ChevronLeft aria-hidden="true" />
                <span>Previous</span>
              </button>
              <button type="button" onClick={() => moveViewer(1)} aria-label="View next photograph">
                <span>Next</span>
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )

  return (
    <section className="beyond-code" id="experience" aria-labelledby="beyond-code-title">
      <div className="beyond-code-atmosphere" aria-hidden="true"><span /><span /></div>

      <header className="beyond-code-header">
        <div>
          <p className="beyond-code-context">Experience</p>
          <h2 id="beyond-code-title">Beyond the Code</h2>
        </div>
        <p>Communities, committees, and experiences that shaped how I learn and collaborate.</p>
      </header>

      <nav className="beyond-code-filters" aria-label="Filter experiences">
        {FILTERS.map((filter, index) => (
          <button
            key={filter.value}
            ref={(node) => { filterRefs.current[index] = node }}
            type="button"
            className={activeFilter === filter.value ? 'is-active' : ''}
            aria-pressed={activeFilter === filter.value}
            onClick={() => selectFilter(filter.value)}
            onKeyDown={(event) => handleFilterKeys(event, index)}
          >
            {filter.label}
          </button>
        ))}
      </nav>

      <div className="beyond-code-workspace" aria-live="polite">
        {activeExperience ? (
          <>
            <AnimatePresence initial={false} mode="wait">
              <motion.article
                key={`${activeFilter}-${activeExperience.id}`}
                className={`beyond-code-story ${activeExperience.gallery.length > 0 ? 'has-documentation' : 'is-text-led'}`}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: reducedMotion ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
              >
                <ExperienceContent
                  experience={activeExperience}
                  onOpenViewer={openViewer}
                  reducedMotion={Boolean(reducedMotion)}
                />
              </motion.article>
            </AnimatePresence>

            <div className="beyond-code-navigation">
              <p><span>{activeIndex + 1}</span> of {filteredExperiences.length}</p>
              <div>
                <button type="button" onClick={() => moveExperience(-1)} disabled={activeIndex === 0}>
                  <ChevronLeft aria-hidden="true" /> Previous
                </button>
                <button type="button" onClick={() => moveExperience(1)} disabled={activeIndex === filteredExperiences.length - 1}>
                  Next <ChevronRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <motion.div className="beyond-code-empty" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
            <p>No experiences are available in this category yet.</p>
          </motion.div>
        )}
      </div>

      {viewer}
    </section>
  )
}

function ExperienceContent({
  experience,
  onOpenViewer,
  reducedMotion,
}: {
  experience: BeyondCodeExperience
  onOpenViewer: (photos: ExperiencePhoto[], index: number, trigger: HTMLButtonElement) => void
  reducedMotion: boolean
}) {
  const photos = experience.gallery.filter((photo) => photo.src.trim().length > 0)

  return (
    <>
      <div className="beyond-code-copy">
        <div className="beyond-code-meta">
          <span>{experience.category === 'tech-communities' ? 'Tech community' : 'Leadership and involvement'}</span>
          <time>{experience.period}</time>
        </div>
        <h3>{experience.place}</h3>
        <p className="beyond-code-role">{experience.title}</p>
        <p className="beyond-code-summary">{experience.summary}</p>
        {experience.highlights.length > 0 && (
          <div className="beyond-code-contributions" aria-label="Key contributions">
            {experience.highlights.map((highlight) => <p key={highlight}>{highlight}</p>)}
          </div>
        )}
      </div>

      {photos.length > 0 ? (
        <ExperiencePhotoBox key={experience.id} photos={photos} onOpenViewer={onOpenViewer} reducedMotion={reducedMotion} />
      ) : (
        <div className="experience-photo-empty" aria-label="No public photographs for this experience">
          <span aria-hidden="true" />
          <p>No public photography</p>
        </div>
      )}
    </>
  )
}

function ExperiencePhotoBox({
  photos,
  onOpenViewer,
  reducedMotion,
}: {
  photos: ExperiencePhoto[]
  onOpenViewer: (photos: ExperiencePhoto[], index: number, trigger: HTMLButtonElement) => void
  reducedMotion: boolean
}) {
  const stageRef = useRef<HTMLDivElement | null>(null)
  const [stageWidth, setStageWidth] = useState(520)
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const [finePointer, setFinePointer] = useState(false)
  const curated = photos.slice(0, 3)
  const open = hovered || pinned || focusWithin
  const layout = FAN_LAYOUTS[curated.length as 1 | 2 | 3]
  const scale = Math.min(1, Math.max(0.64, stageWidth / 520))

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updatePointer = () => setFinePointer(media.matches)
    updatePointer()
    media.addEventListener('change', updatePointer)
    return () => media.removeEventListener('change', updatePointer)
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const updateSize = () => setStageWidth(stage.clientWidth || 520)
    updateSize()
    const observer = new ResizeObserver(updateSize)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!pinned) return
    const closeOutside = (event: PointerEvent) => {
      if (!stageRef.current?.contains(event.target as Node)) setPinned(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [pinned])

  const spring = reducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 250, damping: 25, mass: 0.72 }

  return (
    <div
      ref={stageRef}
      className={`experience-photo-box ${open ? 'is-open' : ''}`}
      onPointerEnter={(event) => { if (finePointer && event.pointerType === 'mouse') setHovered(true) }}
      onPointerLeave={(event) => { if (event.pointerType !== 'touch') setHovered(false) }}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setPinned(false)
          setHovered(false)
          setFocusWithin(false)
          stageRef.current?.querySelector<HTMLButtonElement>('.experience-photo-box-cover')?.focus()
        }
      }}
    >
      <p className="experience-photo-box-hint" aria-hidden="true">
        {finePointer ? 'Hover to open · Select a photograph' : 'Tap to open · Select a photograph'}
      </p>

      <div className="experience-photo-box-composition">
        <motion.div className="experience-photo-box-back" aria-hidden="true" animate={{ y: open ? 20 * scale : 0 }} transition={spring} />

        {curated.map((photo, index) => {
          const fan = layout[index]
          const closedX = (index - (curated.length - 1) / 2) * 7 * scale
          const photoIndex = photos.findIndex((item) => item.src === photo.src)
          return (
            <motion.button
              key={`${photo.src}-${index}`}
              type="button"
              className="experience-photo-print"
              aria-label={`Open photograph ${index + 1} of ${photos.length}: ${photo.label}`}
              aria-haspopup="dialog"
              tabIndex={open ? 0 : -1}
              onClick={(event) => onOpenViewer(photos, photoIndex, event.currentTarget)}
              initial={false}
              animate={{
                x: open ? fan.x * scale : closedX,
                y: open ? fan.y * scale : (30 - index * 7) * scale,
                rotate: open ? fan.rotate : (index - 1) * 1.8,
                scale: open ? 1 : 0.86,
              }}
              transition={{ ...spring, delay: reducedMotion ? 0 : index * 0.035 }}
              style={{ zIndex: open ? index + 2 : curated.length - index + 2 }}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" draggable="false" />
            </motion.button>
          )
        })}

        <motion.div
          className="experience-photo-box-sleeve"
          aria-hidden="true"
          animate={{ x: open ? 42 * scale : 0, y: open ? 22 * scale : 0 }}
          transition={spring}
        >
          <span>Documentation</span>
          <strong>{photos.length} {photos.length === 1 ? 'photograph' : 'photographs'}</strong>
        </motion.div>

        <button
          type="button"
          className="experience-photo-box-cover"
          aria-expanded={open}
          aria-label={`${open ? 'Close' : 'Open'} documentation photo box with ${photos.length} ${photos.length === 1 ? 'photograph' : 'photographs'}`}
          onClick={() => setPinned((current) => !current)}
        >
          <span>{open ? 'Close photos' : 'Open photos'}</span>
        </button>
      </div>

      {photos.length > curated.length && (
        <p className="experience-photo-box-count">+{photos.length - curated.length} more available in the viewer</p>
      )}
    </div>
  )
}
