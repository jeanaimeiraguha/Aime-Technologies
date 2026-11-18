/**
 * Professional training catalogue — long-term technology training.
 * Kept separate from the TVET competency records.
 */

export interface TrainingTrack {
  id: string;
  title: string;
  summary: string;
  courses: string[];
}

export const trainingTracks: TrainingTrack[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    summary: 'Build production software end to end, from interface to deploy.',
    courses: [
      'Frontend Development',
      'Backend Development',
      'Full-Stack Development',
      'Mobile Application Development',
      'API Development',
      'Software Architecture',
    ],
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    summary: 'From fundamentals through applied ML and modern generative systems.',
    courses: [
      'AI Fundamentals',
      'Machine Learning',
      'Deep Learning',
      'Data Science',
      'Generative AI',
    ],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    summary: 'Defend systems and think like an attacker — within legal bounds.',
    courses: [
      'Cybersecurity Fundamentals',
      'Ethical Hacking',
      'Network Security',
      'Web Security',
    ],
  },
  {
    id: 'emerging-technologies',
    title: 'Emerging Technologies',
    summary: 'Protocols and hardware at the edge of mainstream practice.',
    courses: ['Blockchain', 'Embedded Systems', 'Robotics', 'Internet of Things'],
  },
  {
    id: 'creative-technology',
    title: 'Creative Technology',
    summary: 'Design interfaces and products people actually enjoy using.',
    courses: ['UI/UX Design', 'Product Design', 'Graphic Design'],
  },
];
