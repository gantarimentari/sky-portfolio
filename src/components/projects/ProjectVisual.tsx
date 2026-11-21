import type { Project } from '../../data/projects'

export function ProjectVisual({ project, index = 0 }: { project: Project; index?: number }) {
  return <div className={`project-visual visual-${project.accent}${project.screenshot ? ' has-project-screenshot' : ''}`} aria-label={project.screenshot ? undefined : `Abstract placeholder artwork for ${project.title}`} role={project.screenshot ? undefined : 'img'}>
    {project.screenshot ? <><img className="project-screenshot" src={project.screenshot.src} alt={project.screenshot.alt} loading="lazy" decoding="async" /><span className="project-screen-badge">INTERFACE VIEW</span></> : <div className="visual-object" />}
    <span className="visual-index">0{index + 1}</span><span className="visual-label">PROJECT / {project.slug.toUpperCase()}</span><div className="visual-cross" aria-hidden="true">+</div>
  </div>
}
