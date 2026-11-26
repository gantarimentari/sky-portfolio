import careerFitScreenshot from '../assets/projects/CareerFit AI — Portfolio showcase.png'
import veterinaryScreenshot from '../assets/projects/Compro Veterinary Portfolio Showcase.png'
import sleepScreenshot from '../assets/projects/Don’t Forget Sleep App Showcase.png'
import placeLogScreenshot from '../assets/projects/PlaceLog Travel Journal Showcase.png'
import siftScreenshot from '../assets/projects/SIFT AI-Powered Hiring Dashboard.png'
import apdScreenshot from '../assets/projects/Simovis Next.js Frontend Dashboard Poster.png'
import careerFitWebp1120 from '../assets/projects/career-fit-ai-1120.webp'
import careerFitWebp720 from '../assets/projects/career-fit-ai-720.webp'
import veterinaryWebp1120 from '../assets/projects/fanina-company-profile-1120.webp'
import veterinaryWebp720 from '../assets/projects/fanina-company-profile-720.webp'
import sleepWebp1120 from '../assets/projects/dont-forget-sleep-1120.webp'
import sleepWebp720 from '../assets/projects/dont-forget-sleep-720.webp'
import placeLogWebp1120 from '../assets/projects/placelog-1120.webp'
import placeLogWebp720 from '../assets/projects/placelog-720.webp'
import siftWebp1120 from '../assets/projects/sift-1120.webp'
import siftWebp720 from '../assets/projects/sift-720.webp'
import apdWebp1120 from '../assets/projects/apd-detection-1120.webp'
import apdWebp720 from '../assets/projects/apd-detection-720.webp'

export interface CaseStudySection { title: string; body: string }
export type ProjectMoment = 'clear-morning' | 'golden-hour' | 'soft-afternoon' | 'moonlit-night' | 'twilight' | 'first-light'
export interface ProjectContribution { title: string; body: string }
export interface Project {
  slug: string; title: string; category: string; role: string; summary: string
  moment: ProjectMoment; momentLabel: string; contributions: ProjectContribution[]
  technologies: string[]; featured?: boolean
  accent: 'signal' | 'ink' | 'paper' | 'grid' | 'beam' | 'orbit'
  screenshot?: {
    src: string
    alt: string
    webp?: { small: string; large: string }
  }
  sections?: CaseStudySection[]; githubUrl?: string; liveUrl?: string
}

export const projects: Project[] = [
  {
    slug: 'apd-detection', title: 'APD Detection', category: 'Web Application / Frontend Development',
    role: 'Frontend Developer · Collaborative Project', accent: 'signal', featured: true,
    moment: 'clear-morning', momentLabel: 'Clear Morning',
    summary: 'A monitoring interface that brings authentication, operational data, CCTV views, and violation evidence into one clear dashboard experience.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI'],
    contributions: [
      { title: 'Core workflows', body: 'Built authentication and dashboard flows for the monitoring application.' },
      { title: 'Operational interfaces', body: 'Developed user and location management alongside CCTV monitoring views.' },
      { title: 'API integration', body: 'Connected frontend workflows to FastAPI endpoints and presented violation evidence clearly.' },
    ],
    screenshot: { src: apdScreenshot, alt: 'APD Detection monitoring dashboard interface showcase', webp: { small: apdWebp720, large: apdWebp1120 } },
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
    moment: 'golden-hour', momentLabel: 'Golden Hour',
    summary: 'A full-stack place logging application focused on reliable API integration, maintainable CRUD flows, testing, and delivery automation.',
    technologies: ['Vue', 'TypeScript', 'Laravel', 'MySQL', 'Docker', 'GitHub Actions'],
    contributions: [
      { title: 'Built', body: 'Created a Vue and TypeScript interface with a Laravel REST API, Sanctum authentication, and MySQL-backed CRUD workflows.' },
      { title: 'Tested', body: 'Validated successful, invalid, and unauthorized API behavior through Postman and Laravel feature tests.' },
      { title: 'Delivered', body: 'Configured Docker, CI/CD, health checks, structured logging, and Prometheus/Grafana monitoring.' },
    ],
    screenshot: { src: placeLogScreenshot, alt: 'PlaceLog travel journal application interface showcase', webp: { small: placeLogWebp720, large: placeLogWebp1120 } },
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
    liveUrl: 'https://compro-drhfanina-pad1.vercel.app/',
    moment: 'soft-afternoon', momentLabel: 'Soft Afternoon',
    summary: 'A responsive company profile website developed for a veterinary business, with automated UI testing covering key authentication and profile workflows.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Java', 'Selenium'],
    contributions: [
      { title: 'Responsive frontend', body: 'Implemented the clinic website as a responsive interface using reusable React components.' },
      { title: 'Form behavior', body: 'Handled interface validation and key authentication and profile workflows.' },
      { title: 'Automated testing', body: 'Used Java and Selenium to test positive and negative login scenarios, empty fields, and profile interactions.' },
    ],
    screenshot: { src: veterinaryScreenshot, alt: 'Veterinary company profile website interface showcase', webp: { small: veterinaryWebp720, large: veterinaryWebp1120 } },
    sections: [
      { title: 'Project Overview', body: 'A responsive company profile website built for drh. Fanina.' },
      { title: 'My Role', body: 'Developed the frontend experience and contributed to automated UI testing using Java and Selenium.' },
      { title: 'Testing / Validation', body: 'Automated UI testing covered positive and negative authentication scenarios, empty-field validation, profile viewing and editing, and assertions comparing expected and actual behavior.' },
      { title: 'Technology Stack', body: 'Next.js, React, Tailwind CSS, Java, and Selenium.' },
    ],
  },
  {
    slug: 'dont-forget-sleep', title: "Don't Forget Sleep", category: 'Mobile Application',
    role: 'Flutter Developer · Collaborative Project', accent: 'grid',
    moment: 'moonlit-night', momentLabel: 'Moonlit Night',
    summary: 'A Flutter sleep-tracking application designed to help users record their sleep and maintain more intentional rest routines.',
    technologies: ['Flutter', 'Dart'],
    contributions: [
      { title: 'Mobile interface', body: 'Contributed to the Flutter user interface and navigation across the application.' },
      { title: 'Sleep routines', body: 'Worked on reminders and sleep-record experiences that support daily tracking.' },
      { title: 'Application integration', body: 'Connected interface flows with the wider application implementation in a collaborative project.' },
    ],
    screenshot: { src: sleepScreenshot, alt: "Don't Forget Sleep application interface showcase", webp: { small: sleepWebp720, large: sleepWebp1120 } },
  },
  {
    slug: 'career-fit-ai', title: 'Career Fit AI', category: 'AI-Related Application', role: 'Frontend Developer · UI/UX Designer', accent: 'beam',
    moment: 'twilight', momentLabel: 'Twilight',
    summary: 'An AI-assisted CV screening and job-matching platform developed for GEMASTIK 2026 by a selected UGM contingent. I contributed to the frontend development and UI/UX design.',
    technologies: [],
    contributions: [
      { title: 'Interface design', body: 'Designed the user interface for the CV-screening and career-exploration experience.' },
      { title: 'Frontend contribution', body: 'Developed the frontend collaboratively after the team was selected through UGM’s contingent process for GEMASTIK 2026.' },
    ],
    screenshot: { src: careerFitScreenshot, alt: 'Career Fit AI application interface showcase', webp: { small: careerFitWebp720, large: careerFitWebp1120 } },
    sections: [
      { title: 'Project Overview', body: 'Career Fit AI is an AI-assisted CV screening and job-matching platform developed for GEMASTIK 2026 by a selected UGM contingent.' },
      { title: 'My Role', body: 'Designed the user interface and contributed to the frontend development of the platform.' },
    ],
  },
  {
    slug: 'sift', title: 'SIFT', category: 'AI-Related Application', role: 'Frontend Developer · Collaborative Project', accent: 'orbit',
    moment: 'first-light', momentLabel: 'First Light',
    summary: 'An AI-powered recruitment platform developed with the GDGoC UGM project team. I contributed to the frontend using Next.js and Tailwind CSS.',
    technologies: ['Next.js', 'Tailwind CSS'],
    contributions: [
      { title: 'Frontend implementation', body: 'Contributed responsive interface work using Next.js and Tailwind CSS.' },
      { title: 'Team delivery', body: 'Worked within the GDGoC UGM project team to translate shared product decisions into frontend screens.' },
    ],
    screenshot: { src: siftScreenshot, alt: 'SIFT AI-powered hiring dashboard interface showcase', webp: { small: siftWebp720, large: siftWebp1120 } },
    sections: [
      { title: 'Project Overview', body: 'SIFT is an AI-powered recruitment platform developed within a GDGoC UGM project team.' },
      { title: 'My Role', body: 'Contributed to the frontend implementation using Next.js and Tailwind CSS.' },
    ],
  },
]

export const getProject = (slug?: string) => projects.find((project) => project.slug === slug)
