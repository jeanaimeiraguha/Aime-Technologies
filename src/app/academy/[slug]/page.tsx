import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { EnrolForm } from '@/components/forms/EnrolForm';
import { MdxContent } from '@/components/MdxContent';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { DashList } from '@/components/ui/Lists';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { SpecTable } from '@/components/ui/SpecTable';
import { TagList } from '@/components/ui/Tag';
import { TextLink } from '@/components/ui/TextLink';
import { founder } from '@/content/team';
import { getAllCourses, getCourse, toCourseSummary } from '@/lib/content/courses';
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};

  return pageMetadata({
    title: `${course.title} (${course.code})`,
    description: course.summary,
    path: `/academy/${course.slug}`,
  });
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const all = getAllCourses();
  const index = all.findIndex((entry) => entry.slug === course.slug);
  const previous = all[index - 1];
  const next = all[index + 1];
  const courseOptions = all.map(toCourseSummary);

  return (
    <>
      <PageHeader
        label={`${course.code} — Academy`}
        title={course.title}
        lead={<p>{course.summary}</p>}
        meta={[
          { label: 'Level', value: course.level },
          { label: 'Category', value: course.category },
          ...(course.duration ? [{ label: 'Duration', value: course.duration }] : []),
          { label: 'Language', value: course.language },
        ]}
        aside={
          <div className="flex flex-wrap items-center gap-6">
            <ButtonLink href="#enrol">Enrol in this course</ButtonLink>
            <TextLink href="/academy">All courses</TextLink>
          </div>
        }
      />

      <Section label="Overview" title="What this course is">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <MdxContent source={course.body} />
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <SpecTable
              rows={[
                { label: 'Code', value: course.code },
                { label: 'Level', value: course.level },
                // SpecTable drops rows whose value is null, so an unconfirmed
                // schedule or price is simply absent rather than labelled.
                { label: 'Duration', value: course.duration },
                { label: 'Schedule', value: course.schedule },
                { label: 'Price', value: course.price },
                { label: 'Language', value: course.language },
                { label: 'Format', value: course.format.join(' · ') },
              ]}
            />

            <h3 className="text-meta text-muted mt-10 font-mono tracking-[0.06em] uppercase">
              Who it is for
            </h3>
            <DashList items={course.whoItsFor} className="mt-5" />
          </div>
        </div>
      </Section>

      <Section label="Before you start" title="Prerequisites & what you need">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <h3 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
              Prerequisites
            </h3>
            <DashList items={course.prerequisites} className="mt-5" />
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <h3 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
              What you need
            </h3>
            <DashList items={course.requirements} className="mt-5" />
          </div>
        </div>
      </Section>

      <Section label="What you will build" title="You leave with working projects.">
        <div className="md:grid md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-8">
            <ul className="divide-hairline border-hairline divide-y border-y">
              {course.whatYouBuild.map((item, position) => (
                <li key={item} className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-5">
                  <span className="text-meta text-faint font-mono" aria-hidden="true">
                    {String(position + 1).padStart(2, '0')}
                  </span>
                  <span className="max-w-[58ch]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section label="Syllabus" title={`${course.syllabus.length} modules.`}>
        <ol className="divide-hairline border-hairline divide-y border-y">
          {course.syllabus.map((module) => (
            <li key={module.label} className="grid gap-x-8 gap-y-3 py-7 md:grid-cols-12">
              <div className="md:col-span-3">
                <span className="text-meta text-faint font-mono tracking-[0.04em]">
                  {module.label}
                </span>
              </div>
              <div className="md:col-span-8">
                <h3 className="font-normal">{module.title}</h3>
                <DashList items={module.points} className="mt-3" />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Instructor" title="Who teaches it.">
        <div className="grid gap-x-8 gap-y-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="text-lead">{founder.name}</h3>
            <p className="text-meta text-muted mt-1 font-mono">{founder.role}</p>
            <p className="text-muted mt-5 max-w-[58ch]">{founder.bio[3] ?? founder.bio[0]}</p>
            <p className="mt-6">
              <TextLink href="/about">More about us</TextLink>
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <h4 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
              Works on
            </h4>
            <TagList items={founder.focus} className="mt-5" label="Areas of focus" />
          </div>
        </div>
      </Section>

      {course.faq.length > 0 && (
        <Section label="Questions" title="About this course.">
          <dl className="divide-hairline border-hairline divide-y border-y">
            {course.faq.map((item) => (
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

      <Section
        id="enrol"
        label="Enrol"
        title={`Request a place on ${course.code}.`}
        intro={
          <p>
            This reserves your interest, not yet your place. We confirm each enrolment by hand
            so we can check the course and format suit your level — and we will say so if they
            do not.
          </p>
        }
      >
        <div className="max-w-[46rem]">
          <EnrolForm courses={courseOptions} defaultCourse={course.slug} />
        </div>
      </Section>

      <Section label="More courses" title="Continue">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          {previous ? (
            <p>
              <span className="text-meta text-faint block font-mono">Previous</span>
              <TextLink href={`/academy/${previous.slug}`} arrow="none">
                ← {previous.title}
              </TextLink>
            </p>
          ) : (
            <span />
          )}
          {next && (
            <p className="sm:text-right">
              <span className="text-meta text-faint block font-mono">Next</span>
              <TextLink href={`/academy/${next.slug}`}>{next.title}</TextLink>
            </p>
          )}
        </div>
      </Section>

      <Container>
        <JsonLd
          data={[
            courseJsonLd(course),
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Academy', path: '/academy' },
              { name: course.title, path: `/academy/${course.slug}` },
            ]),
            ...(faqJsonLd(course.faq) ? [faqJsonLd(course.faq)!] : []),
          ]}
        />
      </Container>
    </>
  );
}
