/**
 * Academy pathways: education categories, secondary school, university
 * internship framing. Separate from the formal TVET competency catalogue.
 */

export const educationCategories = [
  { value: 'tvet', label: 'TVET student' },
  { value: 'secondary', label: 'Secondary school student' },
  { value: 'university', label: 'University student' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'other', label: 'Other applicant' },
] as const;

export type EducationCategory = (typeof educationCategories)[number]['value'];

export const secondaryLevels = [
  { value: 'S4', label: 'S4' },
  { value: 'S5', label: 'S5' },
  { value: 'S6', label: 'S6' },
] as const;

export const secondaryCombinations = [
  { value: 'MPC', label: 'MPC' },
  { value: 'PCB', label: 'PCB' },
  { value: 'MCB', label: 'MCB' },
  { value: 'MCE', label: 'MCE' },
  { value: 'MEG', label: 'MEG' },
  { value: 'BCG', label: 'BCG' },
  { value: 'Other', label: 'Other' },
] as const;

/** Technology learning opportunities for secondary students (not TVET units). */
export const secondaryCourses = [
  'Programming',
  'Python',
  'Web Development',
  'Artificial Intelligence',
  'Machine Learning',
  'Robotics',
  'Embedded Systems',
  'Cybersecurity',
  'Mobile Development',
  'UI/UX Design',
  'Database Fundamentals',
  'Digital Skills',
] as const;

export const secondaryLevelsMeta = {
  S4: 'Ordinary level — foundations and digital literacy through project work.',
  S5: 'Ordinary level — deeper programming and first interdisciplinary builds.',
  S6: 'Advanced level — portfolio projects and pathway planning for further study.',
} as const;
