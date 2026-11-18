/**
 * TVET competency catalogue — company-supplied curriculum records.
 * Codes, names and credits are exact; do not invent Level 5 codes/credits.
 */

export interface TvetCompetency {
  /** Exact company code for Level 3/4. Level 5 learning areas have no code. */
  code: string | null;
  name: string;
  /** Exact credit value for Level 3/4. Level 5 learning areas have no credits. */
  credits: number | null;
  /** Relative path under /api/academy/documents, or null when unavailable. */
  documentPath: string | null;
}

export interface TvetLevel {
  id: '3' | '4' | '5';
  label: string;
  title: string;
  competencies: TvetCompetency[];
  /** Level 5 is a learning-area list without codes or credits. */
  isLearningAreas?: boolean;
}

export const tvetLevels: TvetLevel[] = [
  {
    id: '3',
    label: 'Level 3',
    title: 'TVET Level 3',
    competencies: [
      { code: 'SWDJF301', name: 'APPLY JAVASCRIPT', credits: 15, documentPath: null },
      { code: 'SWDPR301', name: 'ANALYZE PROJECT REQUIREMENTS', credits: 8, documentPath: null },
      { code: 'SWDUX301', name: 'DESIGN UI/UX', credits: 15, documentPath: null },
      { code: 'SWDVC301', name: 'CONDUCT VERSION CONTROL', credits: 8, documentPath: null },
      {
        code: 'SWDVF301',
        name: 'DEVELOP SIMPLE GAME IN VUE FRAMEWORK',
        credits: 15,
        documentPath: null,
      },
      { code: 'SWDWD301', name: 'DEVELOP A WEBSITE', credits: 15, documentPath: null },
    ],
  },
  {
    id: '4',
    label: 'Level 4',
    title: 'TVET Level 4',
    competencies: [
      { code: 'SWDBD401', name: 'BACKEND APPLICATION DEVELOPMENT', credits: 10, documentPath: null },
      { code: 'SWDBS401', name: 'BACKEND SYSTEM DESIGN', credits: 80, documentPath: null },
      {
        code: 'SWDDA401',
        name: 'DATA STRUCTURE AND ALGORITHM FUNDAMENTALS',
        credits: 13,
        documentPath: null,
      },
      { code: 'SWDDD401', name: 'DATABASE DEVELOPMENT', credits: 10, documentPath: null },
      { code: 'SWDPP401', name: 'PHP PROGRAMMING', credits: 130, documentPath: null },
      { code: 'SWDWS401', name: 'WINDOWS SERVER ADMINISTRATION', credits: 9, documentPath: null },
    ],
  },
  {
    id: '5',
    label: 'Level 5',
    title: 'TVET Level 5 — learning areas',
    isLearningAreas: true,
    competencies: [
      { code: null, name: 'Blockchain Technology', credits: null, documentPath: null },
      { code: null, name: 'Machine Learning', credits: null, documentPath: null },
      { code: null, name: 'DevOps', credits: null, documentPath: null },
      { code: null, name: 'Flutter Development', credits: null, documentPath: null },
      { code: null, name: 'Quality Assurance (QA)', credits: null, documentPath: null },
      { code: null, name: 'NoSQL Database Management', credits: null, documentPath: null },
      { code: null, name: 'Python Programming', credits: null, documentPath: null },
    ],
  },
];

export function getTvetLevel(id: string): TvetLevel | undefined {
  return tvetLevels.find((level) => level.id === id);
}
