import type { Metadata } from 'next';

import { AcademyNav } from '@/components/academy/AcademyNav';
import { TrainingCatalog } from '@/components/academy/Catalogs';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { trainingTracks } from '@/content/academy/training';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Professional training',
  description:
    'Long-term technology training tracks: software development, AI, cybersecurity, emerging tech and creative technology. Totally Ink Academy, Kigali.',
  path: '/academy/training',
});

export default function TrainingPage() {
  return (
    <>
      <AcademyNav />
      <PageHeader
        label="Academy — Training"
        title="Professional training built around what you have to ship."
        lead={
          <p>
            Multi-month tracks for people who already work — or are about to — in technology.
            Same standard as our client projects: code that runs, reviewed by someone who has
            broken production before.
          </p>
        }
        meta={[
          { label: 'Tracks', value: String(trainingTracks.length) },
          { label: 'Format', value: 'Live · projects · mentorship' },
          { label: 'Base', value: 'Kigali, Rwanda' },
        ]}
        aside={
          <div className="flex flex-wrap items-center gap-6">
            <ButtonLink href="/academy/apply?program=professional">
              Apply for a training track
            </ButtonLink>
            <TextLink href="/contact?type=training">Corporate cohorts</TextLink>
          </div>
        }
      />

      <Section label="Catalogue" title="Choose a track" heading="plain">
        <TrainingCatalog tracks={trainingTracks} />
      </Section>

      <Section label="Also available" title="Shorter formats" tone="sunken" heading="plain">
        <ul className="grid gap-6 md:grid-cols-3">
          <li className="border-hairline bg-surface rounded-sm border p-6">
            <h3 className="text-xl">Bootcamps</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              Intensive, time-boxed programmes that end in a working project.
            </p>
            <p className="mt-4">
              <TextLink href="/academy/apply?opportunity=bootcamps">Register interest →</TextLink>
            </p>
          </li>
          <li className="border-hairline bg-surface rounded-sm border p-6">
            <h3 className="text-xl">Workshops</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              Half-day or full-day sessions on a single skill for schools and companies.
            </p>
            <p className="mt-4">
              <TextLink href="/academy/apply?opportunity=workshops">Book a workshop →</TextLink>
            </p>
          </li>
          <li className="border-hairline bg-surface rounded-sm border p-6">
            <h3 className="text-xl">Online learning</h3>
            <p className="text-muted mt-2 text-sm leading-relaxed">
              Recorded courses with live mentorship checkpoints at your own pace.
            </p>
            <p className="mt-4">
              <TextLink href="/academy/apply?opportunity=online-learning">
                Start online learning →
              </TextLink>
            </p>
          </li>
        </ul>
      </Section>

      <Container className="border-t border-hairline py-16">
        <p className="text-muted max-w-[60ch]">
          Existing catalogue courses remain on the{' '}
          <TextLink href="/academy">Academy hub</TextLink> — this page is for the longer
          professional tracks.
        </p>
      </Container>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Academy', path: '/academy' },
          { name: 'Training', path: '/academy/training' },
        ])}
      />
    </>
  );
}
