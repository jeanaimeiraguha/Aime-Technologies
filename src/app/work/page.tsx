import type { Metadata } from 'next';

import { ProjectList } from '@/components/rows/ProjectRow';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { TodoBlock } from '@/components/ui/Todo';
import { getAllCaseStudies } from '@/lib/content/work';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Work',
  description:
    'Case studies: school ERP, face-recognition attendance, secure online examinations and automated grading, a digital wallet and payments platform, and an IoT monitoring device.',
  path: '/work',
});

export default function WorkPage() {
  const studies = getAllCaseStudies();
  const unconfirmed = studies.filter((study) => study.placeholder);

  return (
    <>
      <PageHeader
        label="Work"
        title="Systems we have designed and built."
        lead={
          <p>
            Each case study states the problem, the constraints that shaped the design, the
            decisions we made and what we gave up to make them. Where a result cannot be
            evidenced, it is not claimed.
          </p>
        }
        meta={[
          { label: 'Case studies', value: String(studies.length) },
          { label: 'Sectors', value: 'EdTech · Fintech · IoT' },
        ]}
      />

      <Container>
        <ProjectList studies={studies} headingLevel="h2" />

        {unconfirmed.length > 0 && (
          <TodoBlock
            title={`${unconfirmed.length} of ${studies.length} case studies are unconfirmed drafts`}
            className="mt-10"
          >
            Each draft has the structure and the engineering reasoning in place, and every
            factual claim — client, dates, measured results — left as a marked gap. Work through
            the TODO markers on each page, then remove the <code>placeholder: true</code> line
            from its file in <code>src/content/work/</code>. Pages still marked as drafts are
            excluded from search results and from the sitemap.
          </TodoBlock>
        )}
      </Container>

      <Section
        label="Next"
        title="Have a problem like one of these?"
        className="mt-16 md:mt-24"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="text-muted max-w-[48ch]">
            Tell us what you are dealing with. If we have built something close to it, we will
            tell you what was hard about it before you commit to anything.
          </p>
          <ButtonLink href="/contact?type=quote">Request a quote</ButtonLink>
        </div>
      </Section>
    </>
  );
}
