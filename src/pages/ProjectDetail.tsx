import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { ProjectVisual } from '../components/projects/ProjectVisual'
import { Reveal } from '../components/ui/Reveal'
import { getProject, projects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { NotFound } from './NotFound'

export function ProjectDetail() {
  const { slug } = useParams(); const project = getProject(slug)
  useDocumentTitle(project?.title ?? 'Project not found')
  if (!project) return <NotFound />
  const index = projects.indexOf(project)
  return <article className="page-frame case-study"><Link className="back-link" to="/work"><ArrowLeft size={16} /> All work</Link><header className="case-header"><div><p className="eyebrow">PROJECT 0{index + 1} / {project.category}</p><h1>{project.title}</h1><p>{project.summary}</p></div><dl><div><dt>ROLE</dt><dd>{project.role}</dd></div>{project.technologies.length > 0 && <div><dt>STACK</dt><dd>{project.technologies.join(' · ')}</dd></div>}</dl></header><ProjectVisual project={project} index={index} />
    {project.sections?.length ? <div className="case-sections">{project.sections.map((section, sectionIndex) => <Reveal className="case-section" key={section.title}><span>0{sectionIndex + 1}</span><h2>{section.title}</h2><p>{section.body}</p></Reveal>)}</div> : <div className="case-empty"><p className="eyebrow">CASE STUDY IN PROGRESS</p><h2>The project is here.<br /><em>The full story comes next.</em></h2><p>Detailed context, implementation notes, and validation will be added when verified project information is available.</p></div>}
    {(project.githubUrl || project.liveUrl) && <div className="project-links">{project.githubUrl && <a href={project.githubUrl}>Repository <ExternalLink size={16} /></a>}{project.liveUrl && <a href={project.liveUrl}>Live demo <ExternalLink size={16} /></a>}</div>}
  </article>
}
