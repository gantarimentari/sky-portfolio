import { useParams } from 'react-router'
import { ProjectDetailSystem } from '../components/projects/ProjectDetailSystem'
import { getProject, projects } from '../data/projects'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { NotFound } from './NotFound'

export function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  useDocumentTitle(project ? `${project.title} — Project` : 'Project not found')

  if (!project) return <NotFound />

  const skyMomentOrder = [
    'sift',
    'apd-detection',
    'fanina-company-profile',
    'placelog',
    'career-fit-ai',
    'dont-forget-sleep',
  ]
  const orderedProjects = skyMomentOrder
    .map((projectSlug) => projects.find((item) => item.slug === projectSlug))
    .filter((item): item is (typeof projects)[number] => Boolean(item))
  const index = orderedProjects.findIndex((item) => item.slug === project.slug)
  const nextProject = orderedProjects[(index + 1) % orderedProjects.length]

  return <ProjectDetailSystem project={project} index={index} nextProject={nextProject} />
}
