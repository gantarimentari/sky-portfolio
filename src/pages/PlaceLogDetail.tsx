import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import type { Project } from '../data/projects'
import './PlaceLogDetail.css'

const contributions = [
  'Developed the frontend using Vue 3 and TypeScript.',
  'Built REST API endpoints using Laravel.',
  'Implemented authentication using Laravel Sanctum.',
  'Developed CRUD functionality for managing places.',
  'Integrated MySQL for application data storage.',
  'Validated API behavior through Postman and Laravel feature tests.',
  'Configured Docker Compose and Nginx for the application environment.',
  'Implemented health checks, structured logging, monitoring, and CI/CD with GitHub Actions.',
]

export function PlaceLogDetail({ project }: { project: Project }) {
  return (
    <article className="placelog-detail">
      <Link className="placelog-back" to="/work">
        <ArrowLeft aria-hidden="true" size={17} />
        All work
      </Link>

      <header className="placelog-hero">
        <p className="placelog-kicker">Full-stack place journal</p>
        <h1 aria-label="PlaceLog">
          <span>Place</span><span>Log</span>
        </h1>
        <p className="placelog-thesis">
          Building a full-stack place journal with a focus on application reliability and software delivery.
        </p>

        {project.screenshot && (
          <figure className="placelog-poster">
            <picture>
              {project.screenshot.webp && (
                <source
                  type="image/webp"
                  srcSet={`${project.screenshot.webp.small} 720w, ${project.screenshot.webp.large} 1120w`}
                  sizes="(max-width: 760px) calc(100vw - 3rem), 30rem"
                />
              )}
              <img
                src={project.screenshot.src}
                alt={project.screenshot.alt}
                decoding="async"
                fetchPriority="high"
              />
            </picture>
            <figcaption>Selected PlaceLog application views</figcaption>
          </figure>
        )}

        <div className="placelog-overview">
          <p>
            PlaceLog is a full-stack web application designed to help users document and manage places they have visited.
          </p>
          <p>
            Developed as an individual academic project, it gave me the opportunity to work across the application stack—from the interface and REST API to authentication, testing, containerization, and monitoring.
          </p>
          <p>
            Rather than focusing solely on features, the project also explored how to keep a web application testable, observable, and maintainable.
          </p>
        </div>
      </header>

      <section className="placelog-role" aria-labelledby="placelog-role-title">
        <h2 id="placelog-role-title">One project,<br />every layer.</h2>
        <div className="placelog-role-copy">
          <p>
            I worked on PlaceLog independently, taking responsibility for frontend development, backend implementation, API testing, and the supporting development environment.
          </p>
          <ul>
            {contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
          </ul>
        </div>
      </section>

      <div className="placelog-story" aria-label="PlaceLog project story">
        <section className="placelog-story-block placelog-story-intro">
          <h2>Building the application</h2>
          <p>
            The work moved between interface decisions, API contracts, infrastructure, and delivery. Each layer influenced the next, turning the project into an exercise in building one dependable system rather than a collection of isolated features.
          </p>
          <p className="placelog-system-line">Vue 3 + TypeScript &nbsp;↔&nbsp; Laravel + Sanctum &nbsp;↔&nbsp; MySQL</p>
        </section>

        <section className="placelog-story-block is-offset">
          <h2>Frontend and API integration</h2>
          <p>
            The application uses Vue 3 and TypeScript for its frontend and Laravel for its backend. I implemented API-driven workflows that allow users to authenticate and manage place records through the interface.
          </p>
          <p>
            Working across both sides helped me understand how frontend behavior depends on API contracts, response structures, validation, and authentication.
          </p>
        </section>

        <section className="placelog-story-block">
          <h2>Authentication and data management</h2>
          <p>
            Laravel Sanctum supports authenticated access. The backend provides endpoints for registration, login, logout, retrieving authenticated user information, and managing place records.
          </p>
          <p>
            Request validation and appropriate HTTP responses cover successful operations as well as invalid or unauthorized requests.
          </p>
        </section>

        <aside className="placelog-pullquote">
          Reliability became part of the product—not something left until the end.
        </aside>

        <section className="placelog-story-block is-offset">
          <h2>Testing and reliability</h2>
          <p>
            I used Postman to check API behavior and Laravel feature tests to validate application functionality. Testing included successful requests, validation failures, and unauthorized access scenarios.
          </p>
          <p>
            Structured application logging and a health-check endpoint made the application’s status easier to observe beyond functional testing.
          </p>
        </section>

        <section className="placelog-story-block">
          <h2>Monitoring and delivery</h2>
          <p>
            Docker Compose organizes the application and supporting services, with Nginx configured for the application environment. Prometheus and Grafana provide monitoring supported by infrastructure metrics exporters.
          </p>
          <p>
            The setup includes dashboards for resource usage and service health, alerting rules for service failures, and GitHub Actions for the automated development and delivery workflow.
          </p>
        </section>
      </div>

      <section className="placelog-learning" aria-labelledby="placelog-learning-title">
        <p>What I learned</p>
        <h2 id="placelog-learning-title">Software engineering continues after a feature works.</h2>
        <div>
          <p>
            PlaceLog gave me practical experience connecting application layers, validating API behavior, configuring development infrastructure, and observing how a service behaves when something goes wrong.
          </p>
          <p>
            It strengthened my understanding that building software also means testing it, monitoring it, and creating a dependable path for delivery.
          </p>
        </div>
      </section>

      <Link className="placelog-back placelog-back-bottom" to="/work">
        <ArrowLeft aria-hidden="true" size={17} />
        Return to selected work
      </Link>
    </article>
  )
}
