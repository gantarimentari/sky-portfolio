import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import type { Project } from '../../data/projects'
import { ProjectVisual } from './ProjectVisual'

export function ProjectCard({ project, index, large = false }: { project: Project; index: number; large?: boolean }) {
  return <motion.article className={large ? 'project-card project-card-large' : 'project-card'} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
    <Link to={`/work/${project.slug}`} aria-label={`View ${project.title} project`}><ProjectVisual project={project} index={index} /><div className="project-card-copy"><div><p className="eyebrow">{project.category}</p><h3>{project.title}</h3></div><ArrowUpRight className="project-arrow" aria-hidden="true" /><p className="project-summary">{project.summary}</p><ul className="tag-list" aria-label="Technologies">{project.technologies.slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}</ul></div></Link>
  </motion.article>
}
