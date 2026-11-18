import type { Metadata } from 'next';

import { AcademyNav } from '@/components/academy/AcademyNav';
import { OpportunityGrid } from '@/components/academy/Catalogs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { opportunities } from '@/content/academy/opportunities';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Mentorship & opportunities',
  description:
    'Individual, group, technical, career and entrepreneurship mentorship, project supervision, bootcamps, workshops, online learning and career development — Totally Ink Academy.',
  path: '/academy/mentorship',
});

export default function MentorshipPage() {
  return (
    <>
      <AcademyNav />
      <PageHeader
        label="Academy — Mentorship"
        title="Someone who has shipped it, looking at your work with you."
        lead={
          <p>
            Mentorship, project supervision and career support for students, junior engineers and
            founders. Every path below reaches the same application form with your opportunity
            preselected.
          </p>
        }
        meta={[
          { label: 'Opportunities', value: String(opportunities.length) },
          { label: 'Mode', value: 'Remote · Kigali area' },
          { label: 'Apply', value: 'Single multi-step form' },
        ]}
        aside={
          <div className="flex flex-wrap items-center gap-6">
            <ButtonLink href="/academy/apply?program=mentorship">Request mentorship</ButtonLink>
            <TextLink href="/academy">Browse courses</TextLink>
          </div>
        }
      />

      <Section label="Catalogue" title="Mentorship and development paths" heading="plain">
        <OpportunityGrid items={opportunities} />
      </Section>

      <Section label="Career" title="From learning into paid work" tone="sunken" heading="plain">
        <p className="text-muted max-w-[70ch] leading-relaxed">
          Career development sits alongside technical mentorship: portfolio reviews, interview
          practice, freelance positioning and honest feedback on where you stand today. It is not a
          job guarantee — it is preparation with someone who has hired and been hired.
        </p>
        <div className="mt-6">
          <ButtonLink href="/academy/apply?opportunity=career-development">
            Join career development
          </ButtonLink>
        </div>
      </Section>

      <Container className="border-t border-hairline py-16">
        <p className="text-muted max-w-[60ch]">
          Prefer to talk first? <TextLink href="/contact">Contact the team</TextLink> before
          applying.
        </p>
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Academy', path: '/academy' },
          { name: 'Mentorship', path: '/academy/mentorship' },
        ])}
      />
    </>
  );
}
