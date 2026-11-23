import { Link } from 'react-router'
import { Reveal } from '../components/ui/Reveal'
import { projects, type Project } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import './Work.css'

function WorkProject({ project, index }: { project: Project; index: number }) {
  return (
    <article className="work-archive-project">
      <Link className="work-archive-link" to={`/work/${project.slug}`}>
        <figure className="work-archive-poster">
          {project.screenshot ? (
            <picture>
              {project.screenshot.webp && (
                <source
                  type="image/webp"
                  srcSet={`${project.screenshot.webp.small} 720w, ${project.screenshot.webp.large} 1120w`}
                  sizes="(max-width: 719px) calc(100vw - 2.5rem), (max-width: 1099px) 50vw, 33vw"
                />
              )}
              <img
                src={project.screenshot.src}
                alt={project.screenshot.alt}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </picture>
          ) : (
            <div className="work-archive-poster-fallback" role="img" aria-label={`Project poster for ${project.title}`} />
          )}
        </figure>

        <div className="work-archive-copy">
          <p className="work-archive-category">{project.category}</p>
          <h2>{project.title}</h2>
          <p className="work-archive-summary">{project.summary}</p>
        </div>
      </Link>
    </article>
  )
}

export function Work() {
  useDocumentTitle('Selected Work')

  return (
    <div className="work-archive-page">
      <header className="work-archive-header">
        <p className="work-archive-label">WORK / ARCHIVE</p>
        <div className="work-archive-intro">
          <h1>Selected Work</h1>
          <p>Six projects across web development, interface design, testing, and collaborative software work.</p>
        </div>
      </header>

      <section className="work-archive-grid" aria-label="All projects">
        {projects.map((project, index) => (
          <Reveal className="work-archive-reveal" key={project.slug}>
            <WorkProject project={project} index={index} />
          </Reveal>
        ))}
      </section>
    </div>
  )
}
