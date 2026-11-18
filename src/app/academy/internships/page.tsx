import type { Metadata } from 'next';

import { AcademyNav } from '@/components/academy/AcademyNav';
import { CompetencyCatalogue } from '@/components/academy/CompetencyCatalogue';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { DashList, NotedList, StepList } from '@/components/ui/Lists';
import { TextLink } from '@/components/ui/TextLink';
import { loadPublicCatalogue } from '@/lib/academy/store';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Internships',
  description:
    'TVET Level 3–5 competency placements, secondary school S4–S6 technology pathways, and university internships with Totally Ink Academy in Kigali.',
  path: '/academy/internships',
});

const HOW_IT_WORKS = [
  'Apply with your education category, level and the competencies or courses you want to work on.',
  'We match you to a mentor and a real project brief — not a shadowing seat.',
  'Weekly checkpoints on your code, your notes and your questions.',
  'You leave with something that runs, and a written record of what you shipped.',
];

const UNIVERSITY = [
  'Project-based placements aligned to your course of study.',
  'Access to mentors across software, AI, embedded and security tracks.',
  'Flexible duration — short intensive blocks or a full semester.',
  'Portfolio and career support at the end of the placement.',
];

export default async function InternshipsPage() {
  const levels = await loadPublicCatalogue();

  return (
    <>
      <AcademyNav />
      <PageHeader
        label="Academy — Internships"
        title="Internships that put you on a real brief, not a coffee rota."
        lead={
          <p>
            TVET students, secondary school learners and university interns work on the same
            standard: ship something that has to work, with a mentor who reviews your code.
          </p>
        }
        meta={[
          { label: 'Tracks', value: 'TVET · Secondary · University' },
          { label: 'TVET', value: 'Levels 3 · 4 · 5' },
          { label: 'Location', value: 'Kigali · hybrid' },
        ]}
        aside={
          <div className="flex flex-wrap items-center gap-6">
            <ButtonLink href="/academy/apply?program=internship">Apply for an internship</ButtonLink>
            <TextLink href="/academy/mentorship">See mentorship options</TextLink>
          </div>
        }
      />

      <Section label="How it works" title="From application to first commit" heading="plain">
        <StepList items={HOW_IT_WORKS} />
      </Section>

      <Section label="TVET" title="Competency catalogue" tone="sunken" heading="plain">
        <p className="text-muted mb-8 max-w-[70ch]">
          Select the units you want to be placed against. Level 5 is published as learning areas
          without codes or credits — those values are not invented here.
        </p>
        <CompetencyCatalogue levels={levels} />
        <p className="mt-6">
          <TextLink href="/academy/apply?program=tvet">Apply with selected competencies →</TextLink>
        </p>
      </Section>

      <Section label="Secondary school" title="S4 · S5 · S6 pathway" heading="plain">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-muted max-w-[60ch] leading-relaxed">
              Combinations MPC, PCB, MCB, MCE, MEG and BCG (or other) can all open a technology
              track. We map your combination to projects that fit — science students on embedded
              and data, commerce students on product and web, everyone on digital skills.
            </p>
            <NotedList
              items={[
                {
                  title: 'S4',
                  note: 'Foundations and digital literacy through project work.',
                },
                {
                  title: 'S5',
                  note: 'Deeper programming and first interdisciplinary builds.',
                },
                {
                  title: 'S6',
                  note: 'Portfolio projects and pathway planning for further study.',
                },
              ]}
            />
          </div>
          <div className="border-hairline bg-surface rounded-sm border p-6">
            <p className="text-meta text-faint font-mono uppercase">Courses of interest</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {[
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
              ].map((name) => (
                <li key={name} className="text-meta text-muted font-mono">
                  · {name}
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <TextLink href="/academy/apply?program=secondary">
                Apply for the secondary pathway →
              </TextLink>
            </p>
          </div>
        </div>
      </Section>

      <Section label="University" title="Internship experience" heading="plain">
        <DashList items={UNIVERSITY} />
        <div className="mt-8">
          <ButtonLink href="/academy/apply?program=internship" variant="outline">
            University internship application
          </ButtonLink>
        </div>
      </Section>

      <Container className="border-t border-hairline py-16">
        <p className="text-muted max-w-[60ch]">
          Questions about a placement?{' '}
          <TextLink href="/contact">Talk to the Academy team</TextLink>.
        </p>
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Academy', path: '/academy' },
          { name: 'Internships', path: '/academy/internships' },
        ])}
      />
    </>
  );
}
