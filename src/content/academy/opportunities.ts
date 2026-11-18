/**
 * Mentorship, bootcamps, workshops, online learning and career development.
 * Each item has an info blurb and an action that reaches the apply flow
 * with the opportunity preselected.
 */

export interface Opportunity {
  id: string;
  title: string;
  summary: string;
  details: string[];
  actionLabel: string;
}

export const opportunities: Opportunity[] = [
  {
    id: 'mentorship-individual',
    title: 'Individual mentorship',
    summary: 'One-to-one time with an engineer on your code and career path.',
    details: [
      'Regular sessions focused on your current project or job search',
      'Code review, architecture feedback and study planning',
      'Remote or in-person in the Kigali area, by arrangement',
    ],
    actionLabel: 'Request mentorship',
  },
  {
    id: 'mentorship-group',
    title: 'Group mentorship',
    summary: 'Small cohorts working through shared goals with a mentor.',
    details: [
      'Peer accountability plus guided technical sessions',
      'Suitable for study groups and junior teams',
      'Cohort size kept small so questions get answered',
    ],
    actionLabel: 'Join a group',
  },
  {
    id: 'mentorship-technical',
    title: 'Technical mentorship',
    summary: 'Deep help on stack choices, debugging and engineering practice.',
    details: [
      'Focused on a specific system, language or infrastructure problem',
      'Pairing and design reviews rather than lectures',
      'Ideal for working developers switching domains',
    ],
    actionLabel: 'Request technical mentorship',
  },
  {
    id: 'mentorship-career',
    title: 'Career mentorship',
    summary: 'CV, portfolio, interviews and navigating early career choices.',
    details: [
      'Portfolio and GitHub presentation reviews',
      'Interview practice for junior and mid roles',
      'Honest feedback on where you stand today',
    ],
    actionLabel: 'Request career mentorship',
  },
  {
    id: 'project-supervision',
    title: 'Project supervision',
    summary: 'Guidance for capstone, thesis or company projects from idea to delivery.',
    details: [
      'Scope, milestones and technical risk review',
      'Regular checkpoints against a realistic plan',
      'Support for students and internal innovation teams',
    ],
    actionLabel: 'Request supervision',
  },
  {
    id: 'mentorship-entrepreneurship',
    title: 'Entrepreneurship mentorship',
    summary: 'Turn a technical idea into a product someone will pay for.',
    details: [
      'Problem validation before a line of code',
      'MVP scoping and build-vs-buy decisions',
      'Intro to practical metrics and pricing',
    ],
    actionLabel: 'Request entrepreneurship mentorship',
  },
  {
    id: 'bootcamps',
    title: 'Technology bootcamps',
    summary: 'Intensive, time-boxed programmes that end in a working project.',
    details: [
      'Full-time and part-time cohorts',
      'Project-based assessment throughout',
      'Next dates confirmed per intake',
    ],
    actionLabel: 'Register interest',
  },
  {
    id: 'workshops',
    title: 'Workshops',
    summary: 'Short sessions on a single skill — Git, Docker, APIs, security basics.',
    details: [
      'Half-day or full-day formats',
      'On site for schools and companies, or online',
      'Hands-on from the first hour',
    ],
    actionLabel: 'Book a workshop',
  },
  {
    id: 'online-learning',
    title: 'Online learning',
    summary: 'Recorded courses with live mentorship checkpoints.',
    details: [
      'Study at your own pace with scheduled Q&A',
      'Same projects as the live courses',
      'Works on mid-range phones and slow connections',
    ],
    actionLabel: 'Start online learning',
  },
  {
    id: 'career-development',
    title: 'Career development',
    summary: 'Structured support to move from learning into paid work.',
    details: [
      'Portfolio and profile building',
      'Freelance and employment pathway planning',
      'Mock interviews and referral networking',
    ],
    actionLabel: 'Join career development',
  },
];

export function getOpportunity(id: string): Opportunity | undefined {
  return opportunities.find((item) => item.id === id);
}
