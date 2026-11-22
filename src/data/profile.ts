import komatikGroupPhoto from '../assets/documentations/komatik/komatik1.jpeg'
import komatikActivityPhoto from '../assets/documentations/komatik/komatik2.jpeg'
import komatikCommitteePhoto from '../assets/documentations/komatik/komatik3.jpeg'
import gdgHackathonDiscussionPhoto from '../assets/documentations/gdg1/diskusi hackathon dfs.jpeg'
import gdgMiniTeamPhoto from '../assets/documentations/gdg1/mini.jpeg'
import gdgMiniHackathonPhoto from '../assets/documentations/gdg1/minihackathon.jpeg'
import refactoryCommitteePhoto from '../assets/documentations/refactory panit/k.jpeg'
import refactoryClosingPhoto from '../assets/documentations/refactory panit/WhatsApp Image 2026-11-22 at 2.17.41 AM.jpeg'
import gemastikTeamPortraitPhoto from '../assets/documentations/kontingen gemastik/q.jpeg'
import gemastikCareerFitPhoto from '../assets/documentations/kontingen gemastik/l.jpeg'
import gemastikTeamStudioPhoto from '../assets/documentations/kontingen gemastik/WhatsApp Image 2026-11-22 at 2.18.59 AM.jpeg'

export type BeyondCodeCategory = 'tech-communities' | 'leadership-involvement'

export type BeyondCodeExperience = {
  id: string
  category: BeyondCodeCategory
  contextLabel?: string
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
    contextLabel: 'Tech community',
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
    contextLabel: 'Tech community',
    period: 'Dec 2025—Jun 2026',
    title: 'Hacker / Frontend Developer',
    place: 'GDGoC UGM',
    summary: 'Google Developer Groups on Campus · Developer community and project team',
    highlights: [
      'Contributed to the frontend of SIFT, an AI-powered recruitment platform, using Next.js and Tailwind CSS.',
      'Joined a mini hackathon focused on helping people with disabilities identify accessible bus stops.',
      'Collaborated on an Android sleep-tracking application using Flutter and Dart.',
    ],
    gallery: [
      { label: 'Hackathon discussion', alt: 'GDGoC project team discussing a hackathon idea with their laptops', src: gdgHackathonDiscussionPhoto },
      { label: 'Mini hackathon team', alt: 'GDGoC mini hackathon participants taking a group photograph outdoors', src: gdgMiniTeamPhoto },
      { label: 'Mini hackathon recognition', alt: 'GDGoC mini hackathon team holding their certificate after the event', src: gdgMiniHackathonPhoto },
    ],
  },
  {
    id: 'gemastik-2026-careerfit-ai',
    category: 'tech-communities',
    contextLabel: 'Technology competition',
    period: '2026',
    title: 'UGM Contingent · Frontend Developer & UI/UX Designer',
    place: 'GEMASTIK 2026',
    summary: 'CareerFit AI',
    highlights: [
      'Selected to represent Universitas Gadjah Mada at GEMASTIK 2026 through the Liga KOMATIK selection process.',
      'Designed the user interface and developed the frontend of CareerFit AI, an AI-assisted CV screening and job-matching platform.',
    ],
    gallery: [
      { label: 'GEMASTIK team portrait', alt: 'Three members of the UGM GEMASTIK team posing together', src: gemastikTeamPortraitPhoto },
      { label: 'CareerFit AI team', alt: 'Three UGM GEMASTIK team members presenting the CareerFit AI interface on a laptop', src: gemastikCareerFitPhoto },
      { label: 'UGM contingent portrait', alt: 'Three members of the UGM GEMASTIK contingent in a studio portrait', src: gemastikTeamStudioPhoto },
    ],
  },
  {
    id: 'basic-application-practicum-assistant',
    category: 'tech-communities',
    contextLabel: 'Technical mentoring',
    period: 'Aug 2026—Present',
    title: 'Basic Application Practicum Assistant',
    place: 'Universitas Gadjah Mada',
    summary: 'Mentoring and weekly project evaluation for introductory application development',
    highlights: [
      'Mentor 12 students across three website-development teams, monitoring project progress, timelines, and delivery challenges.',
      'Review weekly project documentation, UI/UX decisions, and technical website implementation.',
      'Provide structured feedback on each team’s progress and the quality of their work.',
    ],
    gallery: [],
  },
  {
    id: 'liga-trpl-secretariat-coordinator',
    category: 'leadership-involvement',
    contextLabel: 'Leadership and involvement',
    period: '2024—Nov 2025',
    title: 'Secretariat Staff → Coordinator',
    place: 'Liga TRPL',
    summary: 'Competition administration and coordination',
    highlights: [
      'Coordinated secretariat activities and competition administration, progressing from staff member to coordinator.',
      'Prepared official invitations and venue-request letters while supporting operational requirements.',
      'Maintained structured attendance records and competition evaluation data for participants and committee members.',
    ],
    gallery: [],
  },
  {
    id: 'sragen-expo-program-committee',
    category: 'leadership-involvement',
    contextLabel: 'Event committee',
    period: 'Oct 2024—Jan 2025',
    title: 'Program Division Committee',
    place: 'Sragen EXPO University',
    summary: 'Program planning, speaker coordination, and external communication',
    highlights: [
      'Prepared the event rundown and budget plan to support program execution.',
      'Served as liaison officer for speakers, coordinating schedules, requirements, and event communication.',
      'Supported public relations through official invitations and initial outreach to prospective sponsors.',
    ],
    gallery: [],
  },
  {
    id: 'refactory-hackathon-secretariat',
    category: 'leadership-involvement',
    contextLabel: 'Event committee',
    period: 'Jan—Feb 2026',
    title: 'Secretariat Committee',
    place: 'ReFactory Hackathon',
    summary: 'Hackathon operations and event support',
    highlights: [
      'Managed room-reservation administration and coordinated facilities required for the hackathon.',
      'Submitted Wi-Fi access requests to support reliable event operations.',
    ],
    gallery: [
      { label: 'Committee portrait', alt: 'ReFactory Hackathon steering committee posing together after the event', src: refactoryCommitteePhoto },
      { label: 'Hackathon closing', alt: 'ReFactory Hackathon participants, mentors, and committee members gathered after the awards', src: refactoryClosingPhoto },
    ],
  },
  {
    id: 'pmr-treasurer',
    category: 'leadership-involvement',
    contextLabel: 'Student organization',
    period: '2020—2023',
    title: 'Treasurer',
    place: 'Palang Merah Remaja · SMAN 1 Sragen',
    summary: 'Budget planning and organizational financial administration',
    highlights: [
      'Prepared budget estimates and planned funding requirements for organizational programs.',
      'Recorded income and expenditure and compiled financial reports.',
      'Monitored fund usage to keep spending aligned with the approved budget.',
    ],
    gallery: [],
  },
  {
    id: 'lab-seni-simak-siar-merchandise',
    category: 'leadership-involvement',
    contextLabel: 'Event volunteer',
    period: 'Sep 2026',
    title: 'Merchandise Division Volunteer',
    place: 'Lab Seni × Simak Siar',
    summary: 'Merchandise sales, transaction records, and inventory support',
    highlights: [
      'Handled merchandise sales, accepted payments, and recorded each transaction.',
      'Counted stock with the team and documented payment evidence for accurate reconciliation.',
      'Resolved payment issues and supported the distribution of sales proceeds to participating bands.',
    ],
    gallery: [],
  },
  {
    id: 'eats-tedi-canteen-attendant',
    category: 'leadership-involvement',
    contextLabel: 'Campus involvement',
    period: 'Feb—Jun 2025',
    title: 'Canteen Attendant',
    place: 'EATS TEDI',
    summary: 'Point-of-sale operations, daily revenue recording, and stock monitoring',
    highlights: [
      'Managed cash and QRIS transactions using a point-of-sale system.',
      'Recorded daily revenue and prepared periodic sales deposits.',
      'Monitored inventory to maintain product availability and smooth canteen operations.',
    ],
    gallery: [],
  },
  {
    id: 'kumon-worksheet-corrector',
    category: 'leadership-involvement',
    contextLabel: 'Educational involvement',
    period: '2023—2024',
    title: 'Mathematics and English Worksheet Corrector',
    place: 'KUMON Syamet Riyadi Sragen',
    summary: 'Accurate worksheet review supporting consistent learning activities',
    highlights: [
      'Checked and corrected Mathematics and English worksheets with careful attention to assessment accuracy.',
      'Supported daily learning activities through consistent and timely worksheet review.',
    ],
    gallery: [],
  },
  {
    id: 'ncac-psm-operational-volunteer',
    category: 'leadership-involvement',
    contextLabel: 'Event volunteer',
    period: 'Sep 2025',
    title: 'Operational Division Volunteer',
    place: 'NCAC PSM UGM',
    summary: 'Concert operations, equipment handling, and venue support',
    highlights: [
      'Supported security and order throughout the concert.',
      'Assisted with equipment loading and unloading during event setup and teardown.',
      'Helped maintain venue cleanliness during the event.',
    ],
    gallery: [],
  },
]

export const profile = {
  name: 'Larasati Ayu Gantari',
  monogram: 'LG',
  location: 'Indonesia',
  role: 'Software Engineering Student',
  // availability: 'Available for work',
  email: 'gantarilarasati@gmail.com',
  github: '',
  linkedin: 'https://www.linkedin.com/in/larasati-ayu-gantari/',
  resume: '/Larasati-Ayu-Gantari-CV.pdf',
  intro: 'I’m a Software Engineering Technology student at Universitas Gadjah Mada with hands-on experience in web application development, API integration, and software testing.',
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
