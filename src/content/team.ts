/**
 * People. Currently the founder; the shape allows more members without a
 * component change — add an entry and it appears on /about.
 */

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** First person. The founder speaks as "I"; the company speaks as "we". */
  bio: string[];
  focus: string[];
  /** TODO: add a real photograph. Null renders a monogram frame instead. */
  photo: { src: string; alt: string } | null;
  links: { label: string; href: string }[];
}

export const founder: TeamMember = {
  slug: 'iraguha-jean-aime',
  name: 'IRAGUHA Jean Aime',
  role: 'CTO, Software Engineer & Technology Builder',
  bio: [
    'I started Aime Technologies because there are problems here worth solving, and not enough people building for them properly.',
    'I work across the whole stack — architecture, backend logic, interfaces, security, performance, integrations, testing and deployment — and I spend a lot of my time on education platforms and school management systems, where the engineering is unglamorous and the details decide whether a school can actually use the thing.',
    'I also build with hardware: microcontroller firmware, sensors, and the dashboards that make their readings useful. Embedded work keeps you honest. The device either runs for months unattended or it does not.',
    'I learn by doing. New technology, I explore it. Difficult bug, I hunt it down. Complex system, I break it into pieces and build it properly. I teach the same way, which is why the Academy is built around projects rather than lectures.',
  ],
  focus: [
    'Full-stack development',
    'EdTech & school ERP',
    'AI/ML & computer vision',
    'Embedded systems & IoT',
    'System architecture',
    'Technical teaching',
  ],
  photo: null,
  /** TODO: add GitHub, LinkedIn or other profiles to show links here. */
  links: [],
};

export const team: TeamMember[] = [founder];

/** Short values statements for /about. Plain claims, no slogans. */
export const values: { title: string; body: string }[] = [
  {
    title: 'The problem comes first',
    body: 'We do not build because a technology is trending. We build because there is a problem worth solving, and we will tell you when software is not the answer.',
  },
  {
    title: 'The whole game, not just the code',
    body: 'Architecture, interface, backend logic, security, performance, integrations, testing and deployment. A feature that works on a laptop and fails on a server is not finished.',
  },
  {
    title: 'Say the real number',
    body: 'Measured results, honest estimates, and the error cases reported alongside the successes. If something we built does not clear the target, you hear it from us.',
  },
  {
    title: 'Built to be handed over',
    body: 'You get the repository, the credentials and the documentation. Your team should be able to run and extend the system without us.',
  },
  {
    title: 'Teaching is part of the work',
    body: 'Explaining a system properly is the same skill as designing one. The Academy exists because the engineers this country needs are not going to arrive from somewhere else.',
  },
];
