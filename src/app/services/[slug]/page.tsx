import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CourseList } from '@/components/rows/CourseRow';
import { ProjectList } from '@/components/rows/ProjectRow';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { DashList, StepList } from '@/components/ui/Lists';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { SchematicDivider, SpecTable } from '@/components/ui/SpecTable';
import { TextLink } from '@/components/ui/TextLink';
import { getService, serviceSlugs, services } from '@/content/services';
import { getCoursesBySlugs } from '@/lib/content/courses';
import { getCaseStudiesBySlugs } from '@/lib/content/work';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.title,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

/**
 * Typical embedded targets, shown only on the embedded page. One page carrying
 * a device-specific detail the others do not is the opposite of a template.
 */
const EMBEDDED_TARGETS = [
  { label: 'MCU', value: 'ESP32 · ESP8266 · AVR (Arduino) · STM32 on request' },
  { label: 'SBC', value: 'Raspberry Pi 3/4/5 · Pi Zero 2 W' },
  { label: 'Firmware', value: 'C/C++ (Arduino framework, ESP-IDF) · MicroPython' },
  { label: 'Buses', value: 'I²C · SPI · UART · 1-Wire' },
  { label: 'Transport', value: 'MQTT over TLS · HTTP · LoRa on request' },
  { label: 'Power', value: 'Mains · Li-ion with deep sleep · solar on request' },
];

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const relatedWork = getCaseStudiesBySlugs(service.relatedWork);
  const relatedCourses = getCoursesBySlugs(service.relatedCourses);
  const isEmbedded = service.slug === 'embedded-systems-iot';

  const index = services.findIndex((entry) => entry.slug === service.slug);
  const next = services[(index + 1) % services.length];

  return (
    <>
      <PageHeader
        label={`${service.index} — Services`}
        title={service.title}
        lead={<p>{service.summary}</p>}
        meta={[
          { label: 'Service', value: `${service.index} of ${String(services.length)}` },
          { label: 'Technologies', value: service.technologies.slice(0, 3).join(', ') },
        ]}
        aside={
          <ButtonLink href={`/contact?type=quote`} variant="primary">
            Request a quote
          </ButtonLink>
        }
      />

      <Section label="What it is" title="The work" divider>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="prose">
              {service.whatItIs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <h3 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
              Who it is for
            </h3>
            <DashList items={service.whoItsFor} className="mt-5" />
          </div>
        </div>
      </Section>

      <Section label="Deliverables" title="What you receive">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <DashList items={service.deliverables} />
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <h3 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
              Technologies
            </h3>
            <ul className="text-meta text-muted mt-5 space-y-1.5 font-mono">
              {service.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        </div>

        {isEmbedded && (
          <div className="mt-16">
            <SchematicDivider label="Typical targets" />
            <SpecTable rows={EMBEDDED_TARGETS} className="mt-5 max-w-[46rem]" dense />
            <p className="text-meta text-faint mt-4 font-mono">
              Hardware is chosen per project against power, connectivity and cost. Tell us the
              constraint that matters most and we will tell you what fits.
            </p>
          </div>
        )}
      </Section>

      <Section label="How we work" title="Our approach on this kind of work">
        <div className="md:grid md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-8">
            <StepList items={service.howWeWork} />
          </div>
        </div>
      </Section>

      {relatedWork.length > 0 && (
        <Section
          label="Related work"
          title="Where we have done this"
          action={{ label: 'All case studies', href: '/work' }}
        >
          <ProjectList studies={relatedWork} />
        </Section>
      )}

      {relatedCourses.length > 0 && (
        <Section
          label="Related courses"
          title="Learn to build this yourself"
          intro={
            <p>
              We teach the same work we do. If you would rather build in-house capacity than
              outsource it, these courses cover this ground.
            </p>
          }
          action={{ label: 'All courses', href: '/academy' }}
        >
          <CourseList courses={relatedCourses} />
        </Section>
      )}

      <Section label="Next" title="Start a project" divider>
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="text-muted max-w-[48ch]">
            Tell us the problem, who it affects and what you have tried. You get a written
            scope, a phased estimate and the assumptions behind it — before any code is written.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <ButtonLink href="/contact?type=quote">Request a quote</ButtonLink>
            <TextLink href={`/services/${next?.slug ?? ''}`}>
              {next?.title ?? 'All services'}
            </TextLink>
          </div>
        </div>
      </Section>

      <Container>
        <JsonLd
          data={[
            serviceJsonLd(service),
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'Services', path: '/services' },
              { name: service.title, path: `/services/${service.slug}` },
            ]),
          ]}
        />
      </Container>
    </>
  );
}
