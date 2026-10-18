import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MdxContent } from '@/components/MdxContent';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ImageFrame, PlaceholderFrame } from '@/components/ui/ImageFrame';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { SpecTable } from '@/components/ui/SpecTable';
import { TextLink } from '@/components/ui/TextLink';
import { TodoBlock } from '@/components/ui/Todo';
import { getAllCaseStudies, getCaseStudy, getCaseStudyNeighbours } from '@/lib/content/work';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return getAllCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return pageMetadata({
    title: study.title,
    description: study.summary,
    path: `/work/${study.slug}`,
    type: 'article',
    // Unconfirmed drafts stay out of search results until their claims are real.
    noindex: study.placeholder,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const { previous, next } = getCaseStudyNeighbours(study.slug);

  return (
    <>
      <PageHeader
        label="Case study"
        title={study.title}
        lead={<p>{study.summary}</p>}
        meta={[
          ...(study.year ? [{ label: 'Year', value: study.year }] : []),
          { label: 'Category', value: study.category },
          ...(study.role ? [{ label: 'Our role', value: study.role }] : []),
          ...(study.client ? [{ label: 'Client', value: study.client }] : []),
        ]}
      />

      <Container>
        {study.placeholder && (
          <TodoBlock title="Unconfirmed draft — do not publish as is" className="mb-14">
            The structure and the engineering reasoning on this page are ready; every factual
            claim is deliberately missing. Answer the markers below, add the client name only
            with written permission, set the year, and delete the <code>placeholder: true</code>{' '}
            line in <code>src/content/work/{study.slug}.mdx</code>. While that line is present
            this page is excluded from search results and from the sitemap.
          </TodoBlock>
        )}

        {study.screenshots.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2">
            {study.screenshots.map((shot, position) => (
              <ImageFrame
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                caption={shot.caption}
                width={1600}
                height={1000}
                priority={position === 0}
                sizes="(min-width: 768px) 36rem, 100vw"
              />
            ))}
          </div>
        ) : (
          <PlaceholderFrame
            label="Interface screenshots"
            note="Add real screenshots with captions to the `screenshots` list in this case study's file. No stock imagery."
          />
        )}
      </Container>

      <Section label="The work" title="How it was built" className="mt-4">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <MdxContent source={study.body} />
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <h2 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
              Stack
            </h2>
            <SpecTable
              className="mt-5"
              dense
              rows={study.stack.map((item, position) => ({
                label: String(position + 1).padStart(2, '0'),
                value: item,
              }))}
            />

            {study.links.length > 0 && (
              <>
                <h2 className="text-meta text-muted mt-10 font-mono tracking-[0.06em] uppercase">
                  Links
                </h2>
                <ul className="mt-5 space-y-2">
                  {study.links.map((link) => (
                    <li key={link.href}>
                      <TextLink href={link.href}>{link.label}</TextLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </Section>

      <Section label="Next" title="Work with us">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="text-muted max-w-[46ch]">
            If this resembles the problem you are holding, tell us about it. We will be direct
            about what was hard here and what would be hard for you.
          </p>
          <ButtonLink href="/contact?type=quote">Request a quote</ButtonLink>
        </div>

        <div className="border-hairline mt-14 flex flex-col gap-6 border-t pt-6 sm:flex-row sm:justify-between">
          {previous ? (
            <p>
              <span className="text-meta text-faint block font-mono">Previous</span>
              <TextLink href={`/work/${previous.slug}`} arrow="none">
                ← {previous.title}
              </TextLink>
            </p>
          ) : (
            <span />
          )}
          {next && (
            <p className="sm:text-right">
              <span className="text-meta text-faint block font-mono">Next</span>
              <TextLink href={`/work/${next.slug}`}>{next.title}</TextLink>
            </p>
          )}
        </div>
      </Section>

      <Container>
        <JsonLd
          data={breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
            { name: study.title, path: `/work/${study.slug}` },
          ])}
        />
      </Container>
    </>
  );
}
