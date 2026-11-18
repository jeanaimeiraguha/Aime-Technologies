import type { Metadata } from 'next';
import {
  CirclePlay,
  FolderGit2,
  GraduationCap,
  Layers,
  MapPin,
  Users,
  Video,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { AcademyNav } from '@/components/academy/AcademyNav';
import { CourseCatalogue } from '@/components/academy/CourseCatalogue';
import { Reveal } from '@/components/home/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { CheckList } from '@/components/ui/Lists';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Timeline } from '@/components/ui/Timeline';
import { TextLink } from '@/components/ui/TextLink';
import { faqGroups } from '@/content/faq';
import {
  getAllCourses,
  getUsedCategories,
  getUsedLevels,
  toCourseSummary,
} from '@/lib/content/courses';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Academy',
  description:
    'Online classes in software engineering, web and mobile development, embedded systems, IoT, AI/ML and developer tools. Taught by building projects, with live sessions and mentorship. Based in Kigali, Rwanda.',
  path: '/academy',
});

const FORMATS: { name: string; note: string; icon: LucideIcon; planned?: boolean }[] = [
  {
    name: 'Live online classes',
    note: 'Scheduled sessions where we build together and you can interrupt with questions.',
    icon: Video,
  },
  {
    name: 'Recorded lessons',
    note: 'Every live session is recorded, so a missed class or a second pass is not a problem.',
    icon: CirclePlay,
  },
  {
    name: 'Hands-on projects',
    note: 'Each course is organised around work you finish and keep. The project is the assessment.',
    icon: FolderGit2,
  },
  {
    name: 'Mentorship',
    note: 'Time with the instructor on your own code, which is where most of the learning happens.',
    icon: Users,
  },
  {
    name: 'In person & hybrid',
    note: 'Sessions in the Kigali area are planned — confirm availability before enrolling on that basis.',
    icon: MapPin,
    planned: true,
  },
  {
    name: 'Training for schools & companies',
    note: 'Programmes built around what your staff or students need to be able to do, delivered online, on site, or both.',
    icon: GraduationCap,
  },
];

const HOW_ENROLMENT_WORKS = [
  'Pick the course that matches what you want to build, and check its prerequisites honestly.',
  'Send an enrolment request — name, contact, course, preferred format, schedule and your current level.',
  'We reply by hand to confirm the intake and the format, and we will suggest a different course if yours is the wrong fit.',
  'We send payment details and what you need to prepare, including the hardware kit for embedded courses.',
  'Your place is confirmed once payment is received, and you get the schedule and joining details.',
];

const TEACHING = [
  'You write the code. We do not demonstrate for an hour while you watch.',
  'Every course ends in something that works and is yours to keep and show.',
  'We teach the failure cases — what breaks, why, and how to find out.',
  'Small groups, so a question can actually be asked and answered.',
  'If you are in the wrong course for your level, we tell you before you pay.',
];

const COMMONLY_REQUESTED = [
  'ICT teacher upskilling, for schools moving to practical programming',
  'Developer onboarding for a specific stack',
  'Embedded and IoT fundamentals for technical staff',
  'Git, Linux and Docker for teams who never formally learned them',
  'Data handling and security basics for administrative staff',
];

/** Stable anchor for each FAQ row, so a question can be linked to directly. */
function faqId(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function AcademyPage() {
  const courses = getAllCourses().map(toCourseSummary);
  const academyFaq = faqGroups.find((group) => group.id === 'academy');
  const answerableFaq = (academyFaq?.items ?? []).filter((item) => item.answer.length > 0);

  const heroStats = [
    { icon: Layers, text: `${courses.length} courses` },
    { icon: Video, text: 'Live online' },
    { icon: FolderGit2, text: 'Projects you keep' },
  ];

  return (
    <>
      <AcademyNav />

      <div className="relative isolate overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          className="hero-orb -top-28 -left-24 h-[420px] w-[420px]"
          style={{ background: 'radial-gradient(circle, var(--glow-violet), transparent 65%)' }}
          aria-hidden="true"
        />

        <PageHeader
          className="relative z-10"
          label="Academy"
          title="We teach the way we learned: by building something that has to work."
          lead={
            <p>
              Courses in software engineering, web and mobile development, embedded systems,
              IoT, AI/ML and the tools engineers actually use — taught by people who build these
              systems for a living, not only teach them.
            </p>
          }
          aside={
            <div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <ButtonLink href="#catalogue" variant="outline">
                  Browse the catalogue
                </ButtonLink>
                <ButtonLink href="/academy/apply">Apply to the Academy</ButtonLink>
                <TextLink href="/contact?type=training">
                  Training for a school or company
                </TextLink>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {heroStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <li
                      key={stat.text}
                      className="border-hairline bg-surface text-muted text-meta inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5"
                    >
                      <Icon size={14} aria-hidden="true" className="text-accent" />
                      {stat.text}
                    </li>
                  );
                })}
              </ul>
            </div>
          }
        />
      </div>

      <Section label="How we teach" title="Learn by building.">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <div className="prose">
              <p>
                Most people who try to learn programming alone stop at the same place: the
                tutorial works, they change one line, it breaks, and they have no way to find
                out why. Courses that only demonstrate leave you exactly there.
              </p>
              <p>
                So our sessions are working sessions. You build, it breaks, and we spend the
                time on finding out why — because that is the skill that keeps working after the
                course ends.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-4 md:col-start-9" delay={90}>
            <div className="border-hairline bg-surface rounded-lg border p-6">
              <h3 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
                What that means in practice
              </h3>
              <CheckList items={TEACHING} className="mt-5" />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section label="Delivery formats" title="How classes run." tone="sunken">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FORMATS.map((format, index) => {
            const Icon = format.icon;
            return (
              <Reveal key={format.name} className="h-full" delay={index * 70}>
                <article className="card group flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="icon-tile">
                      <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    {format.planned && <Badge tone="highlight">Planned</Badge>}
                  </div>
                  <h3 className="mt-5">{format.name}</h3>
                  <p className="text-muted mt-2.5 text-[0.9375rem] leading-relaxed">
                    {format.note}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section id="catalogue" label="Course catalogue" title="Nine courses, three levels.">
        <CourseCatalogue
          courses={courses}
          categories={getUsedCategories(courses)}
          levels={getUsedLevels(courses)}
        />
        <p className="text-meta text-faint mt-8 font-mono">
          Durations are the planned length of each course. Intake dates and fees are confirmed
          when you enrol.
        </p>
      </Section>

      <Section label="Enrolment" title="How enrolling works." tone="sunken">
        <Reveal>
          <Timeline
            items={HOW_ENROLMENT_WORKS.map((step, index) => ({
              id: `step-${index + 1}`,
              aside: String(index + 1).padStart(2, '0'),
              title: step,
            }))}
            className="max-w-[70ch]"
          />
        </Reveal>

        <Reveal delay={90}>
          <div className="border-accent bg-accent-wash mt-10 max-w-[62ch] rounded-r-lg border-l-2 p-5">
            <p className="text-muted">
              We confirm every enrolment by hand. It is slower than an automatic checkout and it
              means nobody pays for a course that is wrong for them.
            </p>
          </div>
          <p className="mt-6">
            <TextLink href="/contact?type=enrolment">Ask about enrolling</TextLink>
          </p>
        </Reveal>
      </Section>

      <Section label="For schools & companies" title="Training built for your team.">
        <Reveal className="from-accent-wash via-surface to-sunken rounded-3xl bg-linear-to-br p-7 md:p-10">
          <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="prose">
                <p>
                  We run programmes for schools and businesses built around what your people
                  need to be able to do afterwards — not a fixed syllabus delivered regardless
                  of the group in front of us.
                </p>
                <p>
                  Tell us the group size, their current level, the time you can give it and the
                  outcome you need. We will propose a programme and say plainly if what you are
                  asking for does not fit the time available.
                </p>
              </div>
              <p className="mt-6">
                <ButtonLink href="/contact?type=training" variant="outline">
                  Discuss a training programme
                </ButtonLink>
              </p>
            </div>

            <div className="md:col-span-4 md:col-start-9">
              <div className="border-hairline bg-paper rounded-lg border p-6">
                <h3 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
                  Commonly requested
                </h3>
                <CheckList items={COMMONLY_REQUESTED} className="mt-5" />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {answerableFaq.length > 0 && (
        <Section
          label="Academy FAQ"
          title="Common questions."
          action={{ label: 'All questions', href: '/faq' }}
          tone="sunken"
        >
          <Reveal>
            <Accordion
              id="faq-academy"
              items={answerableFaq.map((item) => ({
                id: faqId(item.question),
                title: item.question,
                body: item.answer,
              }))}
            />
          </Reveal>
        </Section>
      )}

      <Container>
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Academy', path: '/academy' },
            ]),
            ...(faqJsonLd(answerableFaq) ? [faqJsonLd(answerableFaq)!] : []),
          ]}
        />
      </Container>
    </>
  );
}
