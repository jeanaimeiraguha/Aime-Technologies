import type { Metadata } from 'next';
import { Suspense } from 'react';

import { AcademyNav } from '@/components/academy/AcademyNav';
import { ApplicationWizard } from '@/components/academy/ApplicationWizard';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { getAllCourses, toCourseSummary } from '@/lib/content/courses';
import { loadPublicCatalogue } from '@/lib/academy/store';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Apply',
  description:
    'Multi-step Academy application: internships, TVET competencies, secondary pathway, professional training, mentorship and courses. Totally Ink, Kigali.',
  path: '/academy/apply',
});

function WizardFallback() {
  return (
    <div className="border-hairline bg-surface rounded-sm border p-8" role="status">
      <p className="text-meta text-faint font-mono uppercase">Loading application form…</p>
    </div>
  );
}

export default async function ApplyPage() {
  const levels = await loadPublicCatalogue();
  const availableCourses = getAllCourses().map((c) => {
    const summary = toCourseSummary(c);
    return { slug: summary.slug, title: summary.title, code: summary.code };
  });

  return (
    <>
      <AcademyNav />
      <PageHeader
        label="Academy — Apply"
        title="One form, every Academy path."
        lead={
          <p>
            Internships, TVET Level 3–5, secondary S4–S6, professional training, mentorship and
            catalogue courses. Your selections persist as you move between steps — close the tab
            and come back without losing them.
          </p>
        }
        meta={[
          { label: 'Steps', value: '5' },
          { label: 'Documents', value: 'Optional · up to 5' },
          { label: 'Confirmation', value: 'Reference ID + email' },
        ]}
        aside={
          <p className="text-muted max-w-[50ch] text-sm">
            Already enrolled in a course? Use the{' '}
            <TextLink href="/academy">catalogue enrolment</TextLink> instead — this form is for new
            Academy applications.
          </p>
        }
      />

      <Section label="Application" title="Start your application" heading="plain" divider={false}>
        <Suspense fallback={<WizardFallback />}>
          <ApplicationWizard levels={levels} availableCourses={availableCourses} />
        </Suspense>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Academy', path: '/academy' },
          { name: 'Apply', path: '/academy/apply' },
        ])}
      />
    </>
  );
}
