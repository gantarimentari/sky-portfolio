import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router'
import type { Project } from '../../data/projects'
import './ProjectDetailSystem.css'

const technologyLogos: Record<string, string> = {
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
  React: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  FastAPI: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg',
  Vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
  Laravel: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  MySQL: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  Docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  'GitHub Actions': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg',
  Java: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  Selenium: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/selenium/selenium-original.svg',
  Flutter: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  Dart: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg',
}

export function ProjectDetailSystem({
  project,
  index,
  nextProject,
}: {
  project: Project
  index: number
  nextProject: Project
}) {
  const projectNumber = String(index + 1).padStart(2, '0')

  return (
    <article className={`project-detail-system project-detail--${project.moment}`}>
      <div className="project-detail-atmosphere" aria-hidden="true">
        <span className="project-detail-stars" />
        <span className="project-detail-orb" />
        <span className="project-detail-cloud project-detail-cloud-one" />
        <span className="project-detail-cloud project-detail-cloud-two" />
      </div>

      <div className="project-detail-inner">
        <Link className="project-detail-back" to="/work">
          <ArrowLeft aria-hidden="true" size={17} />
          All work
        </Link>

        <header className="project-detail-hero">
          <div className="project-detail-copy">
            <p className="project-detail-kicker">
              <span>Project {projectNumber}</span>
              <span>{project.momentLabel}</span>
            </p>
            <h1>{project.title}</h1>
            <p className="project-detail-intro">{project.summary}</p>
            <div className="project-detail-role">
              <span>My role</span>
              <strong>{project.role}</strong>
            </div>
          </div>

          {project.screenshot && (
            <figure className="project-detail-poster">
              <picture>
                {project.screenshot.webp && (
                  <source
                    type="image/webp"
                    srcSet={`${project.screenshot.webp.small} 720w, ${project.screenshot.webp.large} 1120w`}
                    sizes="(max-width: 760px) calc(100vw - 2.5rem), 30rem"
                  />
                )}
                <img
                  src={project.screenshot.src}
                  alt={project.screenshot.alt}
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
              {project.liveUrl && (
                <a className="project-detail-live-link" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Visit live project
                  <ExternalLink aria-hidden="true" size={16} />
                </a>
              )}
            </figure>
          )}
        </header>

        {project.technologies.length > 0 && (
          <section className="project-detail-technologies" aria-labelledby="project-technologies-title">
            <h2 id="project-technologies-title">Built with</h2>
            <ul>
              {project.technologies.map((technology) => (
                <li key={technology}>
                  {technologyLogos[technology] && (
                    <img src={technologyLogos[technology]} alt="" loading="lazy" decoding="async" />
                  )}
                  <span>{technology}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="project-detail-work" aria-labelledby="project-work-title">
          <div className="project-detail-work-heading">
            <p>{project.category}</p>
            <h2 id="project-work-title">What I worked on</h2>
          </div>
          <div className="project-detail-contributions">
            {project.contributions.map((contribution) => (
              <article key={contribution.title}>
                <h3>{contribution.title}</h3>
                <p>{contribution.body}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="project-detail-actions">
          <div className="project-detail-external-links">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer">
                View repository
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            )}
            {project.liveUrl && !project.screenshot && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Visit live project
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            )}
          </div>
          <div className="project-detail-navigation">
            <Link className="project-detail-all-work" to="/work">
              <ArrowLeft aria-hidden="true" size={16} />
              Back to selected work
            </Link>
            <Link
              className="project-detail-next"
              to={`/work/${nextProject.slug}`}
              aria-label={`Next project: ${nextProject.title}`}
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight aria-hidden="true" size={19} />
            </Link>
          </div>
        </footer>
      </div>
    </article>
  )
}
