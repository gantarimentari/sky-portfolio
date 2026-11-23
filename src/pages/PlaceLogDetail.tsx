import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link } from 'react-router'
import placeLogApplicationShowcase from '../assets/projects/u.png'
import type { Project } from '../data/projects'
import './PlaceLogDetail.css'

const builtWith = [
  { name: 'Vue', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Laravel', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'GitHub Actions', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' },
]

export function PlaceLogDetail({ project }: { project: Project }) {
  return (
    <article className="placelog-detail">
      <Link className="placelog-back" to="/work">
        <ArrowLeft aria-hidden="true" size={17} />
        All work
      </Link>

      <header className="placelog-snapshot">
        <div className="placelog-title-block">
          <h1>PlaceLog</h1>
          <p>
            A full-stack web application for documenting and managing visited places, built with reliability, testing, and delivery in mind.
          </p>
        </div>

        {project.screenshot && (
          <figure className="placelog-poster">
            <picture>
              {project.screenshot.webp && (
                <source
                  type="image/webp"
                  srcSet={`${project.screenshot.webp.small} 720w, ${project.screenshot.webp.large} 1120w`}
                  sizes="(max-width: 760px) calc(100vw - 3rem), 28rem"
                />
              )}
              <img
                src={project.screenshot.src}
                alt={project.screenshot.alt}
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </figure>
        )}

        <div className="placelog-context">
          <p>I worked independently as the full-stack developer.</p>
          <p>Vue 3, TypeScript, Laravel, Sanctum, MySQL, Docker, and GitHub Actions.</p>
        </div>
      </header>

      <section className="placelog-built-with" aria-labelledby="placelog-built-with-title">
        <h2 id="placelog-built-with-title">Built with</h2>
        <ul>
          {builtWith.map((technology) => (
            <li key={technology.name}>
              <img src={technology.logo} alt="" loading="lazy" decoding="async" />
              <span>{technology.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="placelog-compact-story" aria-labelledby="placelog-story-title">
        <h2 id="placelog-story-title">From feature<br />to dependable service.</h2>

        <div className="placelog-story-beat beat-built">
          <h3>Built</h3>
          <p>
            A Vue 3 and TypeScript interface connected to a Laravel REST API, with Sanctum authentication and CRUD workflows backed by MySQL.
          </p>
        </div>

        <div className="placelog-story-beat beat-tested">
          <h3>Tested</h3>
          <p>
            API behavior with Postman and Laravel feature tests, including successful requests, validation failures, and unauthorized access. Health checks and structured logs supported observability.
          </p>
        </div>

        <div className="placelog-story-beat beat-delivered">
          <h3>Delivered</h3>
          <p>
            A Docker Compose and Nginx environment with Prometheus and Grafana monitoring, service alerts, and a GitHub Actions workflow for automated delivery.
          </p>
        </div>
      </section>

      <figure className="placelog-showcase">
        <div>
          <p>Application showcase</p>
          <figcaption>Authentication, journal, and map views from the PlaceLog application.</figcaption>
        </div>
        <img
          src={placeLogApplicationShowcase}
          alt="PlaceLog login, journal dashboard, and interactive map interface"
          loading="lazy"
          decoding="async"
        />
      </figure>

      <footer className="placelog-actions">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            View on GitHub
            <ExternalLink aria-hidden="true" size={16} />
          </a>
        )}
        <Link to="/work">
          <ArrowLeft aria-hidden="true" size={16} />
          Back to selected work
        </Link>
      </footer>
    </article>
  )
}
