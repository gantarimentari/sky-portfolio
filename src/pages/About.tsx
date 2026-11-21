import { ArrowDownToLine, ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { Reveal } from '../components/ui/Reveal'
import { profile } from '../data/profile'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export function About() {
  useDocumentTitle('About')
  return <div className="page-frame about-page"><header className="page-hero about-hero"><p className="eyebrow">THE PERSON BEHIND THE PANEL</p><h1>Curious by nature.<br /><em>Intentional by design.</em></h1><div className="about-hero-note"><span>BASED IN</span><strong>{profile.location}</strong><span>FOCUS</span><strong>Software Engineering</strong></div></header>
    <Reveal className="about-story"><p className="story-lead">{profile.intro}</p><div><p>I enjoy combining engineering, problem-solving, usability, and creative experimentation. For me, good software is not only functional—it should make its purpose obvious and feel considered in use.</p><p>I’m building experience across frontend and full-stack development, with a growing interest in quality assurance and the practices that make software easier to trust, maintain, and improve.</p></div></Reveal>
    <section className="skills-section" aria-labelledby="skills-title"><Reveal className="section-heading"><div><p className="eyebrow">TOOLKIT / APPROACH</p><h2 id="skills-title">Skills, organized<br /><em>by how I use them.</em></h2></div></Reveal><div className="skill-grid">{profile.skills.map((group, index) => <Reveal className="skill-group" key={group.label}><span>0{index + 1}</span><h3>{group.label}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>)}</div></section>
    <Reveal className="experience-section"><div><p className="eyebrow">EXPERIENCE / ORGANIZATIONS</p><h2>A record still<br /><em>being written.</em></h2></div><div className="experience-placeholder"><span>ADD YOUR EXPERIENCE</span><p>Use this area for internships, student organizations, volunteer work, or meaningful team projects.</p></div></Reveal>
    <div className="about-actions">{profile.resume ? <a className="button button-primary" href={profile.resume} download>Download Resume <ArrowDownToLine size={17} /></a> : <span className="button button-disabled" title="Add a resume URL in profile.ts">Resume link coming soon</span>}<Link className="text-link" to="/#contact">Start a conversation <ArrowRight size={16} /></Link></div>
  </div>
}
