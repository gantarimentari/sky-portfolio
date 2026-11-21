import komatikGroupPhoto from '../assets/documentations/komatik/komatik1.jpeg'
import komatikActivityPhoto from '../assets/documentations/komatik/komatik2.jpeg'
import komatikCommitteePhoto from '../assets/documentations/komatik/komatik3.jpeg'

export type BeyondCodeCategory = 'tech-communities' | 'leadership-involvement'

export type BeyondCodeExperience = {
  id: string
  category: BeyondCodeCategory
  period: string
  title: string
  place: string
  summary: string
  highlights: string[]
  gallery: Array<{ label: string; alt: string; src: string }>
}

export const beyondCodeExperiences: BeyondCodeExperience[] = [
  {
    id: 'komatik-research-development',
    category: 'tech-communities',
    period: 'Dec 2024—Present',
    title: 'Member → Staff',
    place: 'KOMATIK UGM',
    summary: 'Software Research & Development Division',
    highlights: [
      'Delivered an introductory Next.js training session covering the fundamentals of React-based web development.',
      'Supported technical learning activities within the Software Research & Development division.',
    ],
    gallery: [
      { label: 'KOMATIK community', alt: 'KOMATIK community group at an event', src: komatikGroupPhoto },
      { label: 'Division activity', alt: 'KOMATIK members during a division activity', src: komatikActivityPhoto },
      { label: 'Committee gathering', alt: 'KOMATIK committee gathering and documentation session', src: komatikCommitteePhoto },
    ],
  },
  {
    id: 'gdgoc-hacker-frontend-developer',
    category: 'tech-communities',
    period: 'Dec 2025—Jun 2026',
    title: 'Hacker / Frontend Developer',
    place: 'GDGoC UGM',
    summary: 'Google Developer Groups on Campus · Developer community and project team',
    highlights: [
      'Contributed to the frontend of SIFT, an AI-powered recruitment platform, using Next.js and Tailwind CSS.',
      'Joined a mini hackathon focused on helping people with disabilities identify accessible bus stops.',
      'Collaborated on an Android sleep-tracking application using Flutter and Dart.',
    ],
    gallery: [],
  },
  {
    id: 'liga-trpl-secretariat-coordinator',
    category: 'leadership-involvement',
    period: 'Oct—Nov 2025',
    title: 'Secretariat Coordinator',
    place: 'Liga TRPL',
    summary: 'Competition administration and coordination',
    highlights: [
      'Managed attendance records and competition evaluation data while coordinating secretariat activities.',
    ],
    gallery: [],
  },
  {
    id: 'refactory-hackathon-secretariat',
    category: 'leadership-involvement',
    period: 'Jan—Feb 2026',
    title: 'Secretariat Committee',
    place: 'ReFactory Hackathon',
    summary: 'Hackathon operations and event support',
    highlights: [
      'Coordinated venue arrangements, room reservation documentation, and Wi-Fi access requests.',
    ],
    gallery: [],
  },
  {
    id: 'tech-innovation-festival-committee',
    category: 'leadership-involvement',
    period: '2025',
    title: 'Event Committee',
    place: 'Tech Innovation Festival',
    summary: 'Campus event',
    highlights: [],
    gallery: [],
  },
  {
    id: 'gemastik-contingent',
    category: 'leadership-involvement',
    period: '2025',
    title: 'Contingent Member',
    place: 'GEMASTIK UGM',
    summary: 'Technology competition',
    highlights: [],
    gallery: [],
  },
]

export const profile = {
  name: 'Larasati Ayu Gantari',
  monogram: 'LG',
  location: 'Indonesia',
  role: 'Frontend Developer',
  // availability: 'Available for work',
  email: '',
  github: '',
  linkedin: '',
  resume: '',
  intro: 'I’m a software engineering student interested in the space where reliable engineering, clear interfaces, and creative experimentation meet.',
  skills: [
    { label: 'Frontend', items: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS'] },
    { label: 'Backend & APIs', items: ['Laravel', 'FastAPI', 'REST APIs', 'Authentication'] },
    { label: 'Quality & Delivery', items: ['API Testing', 'Docker', 'GitHub Actions', 'Structured Logging'] },
    { label: 'Working style', items: ['Interface design', 'Problem solving', 'Collaboration', 'Iterative learning'] },
  ],
  experiences: [
    { period: '[YEAR—NOW]', title: '[TECHNICAL ROLE]', place: '[COMPANY / PRODUCT TEAM]', summary: '[A concise story about the product, your responsibilities, and the problem you helped solve.]', highlights: ['[KEY CONTRIBUTION OR IMPACT]', '[TOOLS, PROCESS, OR COLLABORATION]'], gallery: [{ label: '[WORKING PROCESS]', alt: 'Add a photo documenting the working process', src: '' }, { label: '[PRODUCT MOMENT]', alt: 'Add a photo of the product or team', src: '' }, { label: '[RESULT]', alt: 'Add a photo showing the result', src: '' }] },
    { period: '[YEAR—YEAR]', title: '[TECHNICAL ROLE]', place: '[COMPANY / PRODUCT TEAM]', summary: '[A concise story about the product, your responsibilities, and the problem you helped solve.]', highlights: ['[KEY CONTRIBUTION OR IMPACT]', '[TOOLS, PROCESS, OR COLLABORATION]'], gallery: [{ label: '[WORKING PROCESS]', alt: 'Add a photo documenting the working process', src: '' }, { label: '[PRODUCT MOMENT]', alt: 'Add a photo of the product or team', src: '' }, { label: '[RESULT]', alt: 'Add a photo showing the result', src: '' }] },
    { period: '[YEAR—YEAR]', title: '[TECHNICAL ROLE]', place: '[COMPANY / PRODUCT TEAM]', summary: '[A concise story about the product, your responsibilities, and the problem you helped solve.]', highlights: ['[KEY CONTRIBUTION OR IMPACT]', '[TOOLS, PROCESS, OR COLLABORATION]'], gallery: [{ label: '[WORKING PROCESS]', alt: 'Add a photo documenting the working process', src: '' }, { label: '[PRODUCT MOMENT]', alt: 'Add a photo of the product or team', src: '' }, { label: '[RESULT]', alt: 'Add a photo showing the result', src: '' }] },
  ],
  organizations: [
    { period: '[PERIOD]', title: '[POSITION]', place: '[ORGANIZATION / EVENT]', summary: '[A concise story about the organization, your scope, and what the experience taught you.]', highlights: ['[PROGRAM, RESPONSIBILITY, OR ACHIEVEMENT]', '[TEAM OR COMMUNITY CONTRIBUTION]'], gallery: [{ label: '[TEAM]', alt: 'Add a team photo', src: '' }, { label: '[PROGRAM]', alt: 'Add a photo from the program or event', src: '' }, { label: '[BEHIND THE SCENES]', alt: 'Add a behind-the-scenes photo', src: '' }] },
    { period: '[PERIOD]', title: '[POSITION]', place: '[ORGANIZATION / EVENT]', summary: '[A concise story about the organization, your scope, and what the experience taught you.]', highlights: ['[PROGRAM, RESPONSIBILITY, OR ACHIEVEMENT]', '[TEAM OR COMMUNITY CONTRIBUTION]'], gallery: [{ label: '[TEAM]', alt: 'Add a team photo', src: '' }, { label: '[PROGRAM]', alt: 'Add a photo from the program or event', src: '' }, { label: '[BEHIND THE SCENES]', alt: 'Add a behind-the-scenes photo', src: '' }] },
    { period: '[PERIOD]', title: '[POSITION]', place: '[ORGANIZATION / EVENT]', summary: '[A concise story about the organization, your scope, and what the experience taught you.]', highlights: ['[PROGRAM, RESPONSIBILITY, OR ACHIEVEMENT]', '[TEAM OR COMMUNITY CONTRIBUTION]'], gallery: [{ label: '[TEAM]', alt: 'Add a team photo', src: '' }, { label: '[PROGRAM]', alt: 'Add a photo from the program or event', src: '' }, { label: '[BEHIND THE SCENES]', alt: 'Add a behind-the-scenes photo', src: '' }] },
  ],
}
