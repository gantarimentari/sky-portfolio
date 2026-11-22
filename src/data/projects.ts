import careerFitScreenshot from '../assets/projects/CareerFit AI — Portfolio showcase.png'
import veterinaryScreenshot from '../assets/projects/Compro Veterinary Portfolio Showcase.png'
import sleepScreenshot from '../assets/projects/Don’t Forget Sleep App Showcase.png'
import placeLogScreenshot from '../assets/projects/PlaceLog Travel Journal Showcase.png'
import siftScreenshot from '../assets/projects/SIFT AI-Powered Hiring Dashboard.png'
import apdScreenshot from '../assets/projects/Simovis Next.js Frontend Dashboard Poster.png'

export interface CaseStudySection { title: string; body: string }
export interface Project {
  slug: string; title: string; category: string; role: string; summary: string
  technologies: string[]; featured?: boolean
  accent: 'signal' | 'ink' | 'paper' | 'grid' | 'beam' | 'orbit'
  screenshot?: { src: string; alt: string }
  sections?: CaseStudySection[]; githubUrl?: string; liveUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'apd-detection', title: 'APD Detection', category: 'Web Application / Frontend Development',
    role: 'Frontend Developer · Collaborative Project', accent: 'signal', featured: true,
    summary: 'A monitoring interface that brings authentication, operational data, CCTV views, and violation evidence into one clear dashboard experience.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI'],
    screenshot: { src: apdScreenshot, alt: 'APD Detection monitoring dashboard interface showcase' },
    sections: [
      { title: 'Project Overview', body: 'A collaborative safety monitoring application. The frontend connects a set of operational workflows—from user and location management to CCTV monitoring and violation history.' },
      { title: 'Problem / Context', body: 'The interface needed to organize several data-heavy monitoring tasks without losing clarity or making evidence difficult to review.' },
      { title: 'My Role', body: 'Contributed to the frontend using Next.js, React, TypeScript, and Tailwind CSS, including integration with a FastAPI backend.' },
      { title: 'Implementation Highlights', body: 'Authentication and dashboard flows, user and location management interfaces, CCTV monitoring views, and a violation evidence viewer.' },
      { title: 'Technology Stack', body: 'Next.js, React, TypeScript, Tailwind CSS, and FastAPI integration.' },
    ],
  },
  {
    slug: 'placelog', title: 'PlaceLog', category: 'Full-Stack Web Application', role: 'Full-Stack Developer', accent: 'ink', featured: true,
    summary: 'A full-stack place logging application focused on reliable API integration, maintainable CRUD flows, testing, and delivery automation.',
    technologies: ['Laravel', 'Vue', 'Sanctum', 'Docker', 'GitHub Actions'],
    screenshot: { src: placeLogScreenshot, alt: 'PlaceLog travel journal application interface showcase' },
    sections: [
      { title: 'Project Overview', body: 'A full-stack application pairing a Vue interface with a Laravel REST API for authenticated place management.' },
      { title: 'Problem / Context', body: 'The project explored how frontend, API, authentication, testing, and deployment concerns fit together as one dependable system.' },
      { title: 'My Role', body: 'Worked across the application stack, with emphasis on integration, testing, and software delivery practices.' },
      { title: 'Implementation Highlights', body: 'RESTful CRUD workflows, Sanctum authentication, Docker-based development, health checks, structured logging, and GitHub Actions CI/CD.' },
      { title: 'Testing / Validation', body: 'API behavior was tested as part of the integration workflow, alongside automated CI checks.' },
      { title: 'Technology Stack', body: 'Laravel, Vue, Sanctum, Docker, and GitHub Actions.' },
    ],
  },
  {
    slug: 'fanina-company-profile', title: 'Company Profile drh. Fanina', category: 'Frontend / Business Website', role: 'Frontend Developer · Automated UI Testing', accent: 'paper',
    summary: 'A responsive company profile website developed for a veterinary business, with automated UI testing covering key authentication and profile workflows.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Java', 'Selenium'],
    screenshot: { src: veterinaryScreenshot, alt: 'Veterinary company profile website interface showcase' },
    sections: [
      { title: 'Project Overview', body: 'A responsive company profile website built for drh. Fanina.' },
      { title: 'My Role', body: 'Developed the frontend experience and contributed to automated UI testing using Java and Selenium.' },
      { title: 'Testing / Validation', body: 'Automated UI testing covered positive and negative authentication scenarios, empty-field validation, profile viewing and editing, and assertions comparing expected and actual behavior.' },
      { title: 'Technology Stack', body: 'Next.js, React, Tailwind CSS, Java, and Selenium.' },
    ],
  },
  { slug: 'dont-forget-sleep', title: "Don't Forget Sleep", category: 'Web Application / Personal Project', role: 'Personal Project', accent: 'grid', summary: 'A sleep tracking application exploring how simple digital tools can support more intentional rest habits.', technologies: ['Details in progress'], screenshot: { src: sleepScreenshot, alt: "Don't Forget Sleep application interface showcase" } },
  {
    slug: 'career-fit-ai', title: 'Career Fit AI', category: 'AI-Related Application', role: 'Frontend Developer · UI/UX Designer', accent: 'beam',
    summary: 'An AI-assisted CV screening and job-matching platform developed for GEMASTIK 2026 by a selected UGM contingent. I contributed to the frontend development and UI/UX design.',
    technologies: [],
    screenshot: { src: careerFitScreenshot, alt: 'Career Fit AI application interface showcase' },
    sections: [
      { title: 'Project Overview', body: 'Career Fit AI is an AI-assisted CV screening and job-matching platform developed for GEMASTIK 2026 by a selected UGM contingent.' },
      { title: 'My Role', body: 'Designed the user interface and contributed to the frontend development of the platform.' },
    ],
  },
  {
    slug: 'sift', title: 'SIFT', category: 'AI-Related Application', role: 'Frontend Developer · Collaborative Project', accent: 'orbit',
    summary: 'An AI-powered recruitment platform developed with the GDGoC UGM project team. I contributed to the frontend using Next.js and Tailwind CSS.',
    technologies: ['Next.js', 'Tailwind CSS'],
    screenshot: { src: siftScreenshot, alt: 'SIFT AI-powered hiring dashboard interface showcase' },
    sections: [
      { title: 'Project Overview', body: 'SIFT is an AI-powered recruitment platform developed within a GDGoC UGM project team.' },
      { title: 'My Role', body: 'Contributed to the frontend implementation using Next.js and Tailwind CSS.' },
    ],
  },
]

export const getProject = (slug?: string) => projects.find((project) => project.slug === slug)
