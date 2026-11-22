import { ProjectCard } from '../components/projects/ProjectCard'
import { Reveal } from '../components/ui/Reveal'
import { projects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function Work() {
  useDocumentTitle('Selected Projects')
  return <div className="page-frame"><header className="page-hero"><p className="eyebrow">ARCHIVE / 2024—2026</p><h1>Selected work,<br /><em>carefully assembled.</em></h1><p>A selection of frontend, full-stack, and AI-assisted products built through collaborative, personal, and academic work.</p></header><div className="work-grid">{projects.map((project, index) => <Reveal key={project.slug} className={index < 2 ? 'work-featured' : ''}><ProjectCard project={project} index={index} large={index < 2} /></Reveal>)}</div></div>
}
