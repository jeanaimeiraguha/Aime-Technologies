/**
 * Sectors we build for. Plain list, one concrete line each — no icons, no
 * cards, no claims about market leadership.
 */

export interface Industry {
  name: string;
  note: string;
}

export const industries: Industry[] = [
  {
    name: 'Schools & education',
    note: 'Student records, timetables, report cards, fees, examinations and e-learning.',
  },
  {
    name: 'Businesses & SMEs',
    note: 'Internal tools, workflow automation, reporting and integrations between existing systems.',
  },
  {
    name: 'Fintech',
    note: 'Wallets, mobile money and card integrations, ledgers and reconciliation.',
  },
  {
    name: 'Public sector & NGOs',
    note: 'Data collection, reporting systems and attendance for programmes run across sites.',
  },
  {
    name: 'Startups',
    note: 'First versions built well enough to extend, and the architecture to grow into.',
  },
];
