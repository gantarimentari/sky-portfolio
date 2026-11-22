import type { Project } from '../../data/projects'

export function ProjectVisual({ project, index = 0 }: { project: Project; index?: number }) {
  return <div className={`project-visual visual-${project.accent}${project.screenshot ? ' has-project-screenshot' : ''}`} aria-label={project.screenshot ? undefined : `Abstract placeholder artwork for ${project.title}`} role={project.screenshot ? undefined : 'img'}>
    {project.screenshot ? <><picture className="project-screenshot-picture">{project.screenshot.webp && <source type="image/webp" srcSet={`${project.screenshot.webp.small} 720w, ${project.screenshot.webp.large} 1120w`} sizes="(max-width: 680px) 100vw, 80vw" />}<img className="project-screenshot" src={project.screenshot.src} alt={project.screenshot.alt} loading="lazy" decoding="async" /></picture><span className="project-screen-badge">INTERFACE VIEW</span></> : <div className="visual-object" />}
    <span className="visual-index">0{index + 1}</span><span className="visual-label">PROJECT / {project.slug.toUpperCase()}</span><div className="visual-cross" aria-hidden="true">+</div>
  </div>
}
