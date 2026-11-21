import {
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { PhotoBox, type PhotoPrint } from '../ui/PhotoBox'
import {
  beyondCodeExperiences,
  type BeyondCodeCategory,
  type BeyondCodeExperience,
} from '../../data/profile'

type ExperienceFilter = 'all' | BeyondCodeCategory

const FILTERS: Array<{ value: ExperienceFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'tech-communities', label: 'Tech Communities & Competitions' },
  { value: 'leadership-involvement', label: 'Leadership & Involvement' },
]

export function WeatheredHorizonsPrototype() {
  const reducedMotion = useReducedMotion()
  const filterRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [activeFilter, setActiveFilter] = useState<ExperienceFilter>('all')
  const [activeIndex, setActiveIndex] = useState(0)
  const [photoBoxOpen, setPhotoBoxOpen] = useState(false)
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null)

  const filteredExperiences = useMemo(
    () => activeFilter === 'all'
      ? beyondCodeExperiences
      : beyondCodeExperiences.filter((experience) => experience.category === activeFilter),
    [activeFilter],
  )

  const activeExperience = filteredExperiences[activeIndex]
  const activeHasPhotos = activeExperience?.gallery.some((photo) => photo.src.trim().length > 0) ?? false

  const resetPhotoBox = () => {
    setPhotoBoxOpen(false)
    setSelectedPhotoId(null)
  }

  const selectFilter = (filter: ExperienceFilter) => {
    resetPhotoBox()
    setActiveFilter(filter)
    setActiveIndex(0)
  }

  const moveExperience = (direction: -1 | 1) => {
    resetPhotoBox()
    setActiveIndex((current) => {
      const next = current + direction
      return Math.min(Math.max(next, 0), Math.max(filteredExperiences.length - 1, 0))
    })
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
          <article
            className={`beyond-code-story ${photoBoxOpen ? 'is-photo-box-open' : ''}`}
            data-selected-photo={selectedPhotoId ?? undefined}
          >
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={`${activeFilter}-${activeExperience.id}`}
                className={`beyond-code-content ${activeHasPhotos ? 'has-documentation' : 'is-text-led'}`}
                initial={reducedMotion ? false : { opacity: 0.35 }}
                animate={{ opacity: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.12, ease: 'easeOut' }}
              >
                <ExperienceContent
                  experience={activeExperience}
                  onPhotoBoxOpenChange={setPhotoBoxOpen}
                  onPhotoSelect={setSelectedPhotoId}
                />
              </motion.div>
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
          </article>
        ) : (
          <motion.div className="beyond-code-empty" initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
            <p>No experiences are available in this category yet.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function ExperienceContent({
  experience,
  onPhotoBoxOpenChange,
  onPhotoSelect,
}: {
  experience: BeyondCodeExperience
  onPhotoBoxOpenChange: (open: boolean) => void
  onPhotoSelect: (id: string | null) => void
}) {
  const photos = experience.gallery.filter((photo) => photo.src.trim().length > 0)
  const prints: PhotoPrint[] = photos.slice(0, 3).map((photo, index) => ({
    id: `${experience.id}-${index + 1}`,
    title: `Photo ${String(index + 1).padStart(2, '0')}`,
    caption: photo.label,
    src: photo.src,
    alt: photo.alt,
  }))

  return (
    <>
      <div className="beyond-code-copy">
        <div className="beyond-code-meta">
          <span>{experience.contextLabel ?? (experience.category === 'tech-communities' ? 'Tech community' : 'Leadership and involvement')}</span>
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

      {prints.length > 0 && (
        <div className="experience-photo-box-region">
          <PhotoBox
            key={experience.id}
            prints={prints}
            title="Documentation"
            subtitle={`${experience.place} · ${photos.length} ${photos.length === 1 ? 'photo' : 'photos'}`}
            className="experience-easyui-photo-box"
            onOpenChange={onPhotoBoxOpenChange}
            onSelect={onPhotoSelect}
          />
        </div>
      )}
    </>
  )
}
