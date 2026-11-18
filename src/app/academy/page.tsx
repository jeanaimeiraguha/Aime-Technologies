import type { Metadata } from 'next';

import { AcademyNav } from '@/components/academy/AcademyNav';
import { CourseCatalogue } from '@/components/academy/CourseCatalogue';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { DashList, NotedList, StepList } from '@/components/ui/Lists';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { Testimonials } from '@/components/ui/Testimonials';
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

const FORMATS = [
  {
    name: 'Live online classes',
    note: 'Scheduled sessions where we build together and you can interrupt with questions.',
  },
  {
    name: 'Recorded lessons',
    note: 'Every live session is recorded, so a missed class or a second pass is not a problem.',
  },
  {
    name: 'Hands-on projects',
    note: 'Each course is organised around work you finish and keep. The project is the assessment.',
  },
  {
    name: 'Mentorship',
    note: 'Time with the instructor on your own code, which is where most of the learning happens.',
  },
  {
    name: 'In person & hybrid',
    note: 'Sessions in the Kigali area are planned — confirm availability before enrolling on that basis.',
  },
  {
    name: 'Training for schools & companies',
    note: 'Programmes built around what your staff or students need to be able to do, delivered online, on site, or both.',
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

export default function AcademyPage() {
  const courses = getAllCourses().map(toCourseSummary);
  const academyFaq = faqGroups.find((group) => group.id === 'academy');
  const answerableFaq = (academyFaq?.items ?? []).filter((item) => item.answer.length > 0);

  return (
    <>
      <AcademyNav />
      <PageHeader
        label="Academy"
        title="We teach the way we learned: by building something that has to work."
        lead={
          <p>
            Courses in software engineering, web and mobile development, embedded systems, IoT,
            AI/ML and the tools engineers actually use — taught by people who build these
            systems for a living, not only teach them.
          </p>
        }
        aside={
          <div className="flex flex-wrap items-center gap-6">
            <ButtonLink href="#catalogue">Browse the catalogue</ButtonLink>
            <ButtonLink href="/academy/apply" variant="outline">
              Apply to the Academy
            </ButtonLink>
            <TextLink href="/contact?type=training">Training for a school or company</TextLink>
          </div>
        }
      />

      <Section label="How we teach" title="Learn by building.">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-7">
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
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <h3 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
              What that means in practice
            </h3>
            <DashList items={TEACHING} className="mt-5" />
          </div>
        </div>
      </Section>

      <Section label="Delivery formats" title="How classes run.">
        <NotedList items={FORMATS} />
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

      <Section label="Enrolment" title="How enrolling works.">
        <div className="md:grid md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-8">
            <StepList items={HOW_ENROLMENT_WORKS} />
          </div>
          <div className="mt-8 md:col-span-4 md:mt-0">
            <p className="text-muted max-w-[40ch]">
              We confirm every enrolment by hand. It is slower than an automatic checkout and it
              means nobody pays for a course that is wrong for them.
            </p>
            <p className="mt-6">
              <TextLink href="/contact?type=enrolment">Ask about enrolling</TextLink>
            </p>
          </div>
        </div>
      </Section>

      <Section label="For schools & companies" title="Training built for your team.">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="prose">
              <p>
                We run programmes for schools and businesses built around what your people need
                to be able to do afterwards — not a fixed syllabus delivered regardless of the
                group in front of us.
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
            <h3 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
              Commonly requested
            </h3>
            <DashList
              items={[
                'ICT teacher upskilling, for schools moving to practical programming',
                'Developer onboarding for a specific stack',
                'Embedded and IoT fundamentals for technical staff',
                'Git, Linux and Docker for teams who never formally learned them',
                'Data handling and security basics for administrative staff',
              ]}
              className="mt-5"
            />
          </div>
        </div>
      </Section>

      <Testimonials />

      {answerableFaq.length > 0 && (
        <Section
          label="Academy FAQ"
          title="Common questions."
          action={{ label: 'All questions', href: '/faq' }}
        >
          <dl className="divide-hairline border-hairline divide-y border-y">
            {answerableFaq.map((item) => (
              <div key={item.question} className="grid gap-x-8 gap-y-2 py-6 md:grid-cols-12">
                <dt className="md:col-span-5">{item.question}</dt>
                <dd className="text-muted max-w-[58ch] md:col-span-6 md:col-start-7">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
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
