import type { Metadata } from 'next';

import { TerminalBlock } from '@/components/home/TerminalBlock';
import { Container } from '@/components/ui/Container';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { JsonLd } from '@/components/ui/JsonLd';
import { NotedList } from '@/components/ui/Lists';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { TagList } from '@/components/ui/Tag';
import { TextLink } from '@/components/ui/TextLink';
import { site } from '@/content/site';
import { founder, values } from '@/content/team';
import { technologies } from '@/content/technologies';
import { breadcrumbJsonLd, founderJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description: `${site.name} is a technology company in Kigali, Rwanda, founded by ${founder.name}. We build software, school ERP and EdTech platforms, embedded systems and IoT, and teach engineering through our Academy.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="We build because there are problems worth solving."
        lead={<p>{site.tagline}</p>}
        meta={[
          { label: 'Based in', value: site.location.short },
          { label: 'Founded', value: String(site.founded) },
          { label: 'Working', value: 'On site & remote' },
        ]}
      />

      <Section label="Who we are" title="The company">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="prose">
              <p>
                We build across full-stack development, EdTech, school ERP, business automation,
                AI/ML, embedded systems and digital products. We do not just write code and call
                it a day — we care about the whole game: architecture, UX, backend logic,
                security, performance, integrations, testing and deployment.
              </p>
              <p>
                A large part of our work is education platforms and school management systems
                that bring together student management, teacher portals, e-learning,
                assessments, examinations, automated grading, attendance, report cards,
                timetables, fee management, live classes and academic reporting.
              </p>
              <p>
                We have also worked on computer vision, face recognition, secure examination
                workflows, intelligent attendance systems, deterministic grading engines,
                digital payment and wallet solutions, e-commerce and mobile applications.
              </p>
              <p>
                We learn by doing. New technology? We explore it. Difficult bug? We hunt it
                down. Complex system? We break it into pieces and build it properly.
              </p>
              <p>
                We do not build software because a technology is trending. We build because
                there are problems worth solving.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <h2 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
              Mission
            </h2>
            <p className="text-lead mt-5 max-w-[34ch]">
              Build systems people here can actually rely on, and train the engineers who will
              keep building them.
            </p>

            <h2 className="text-meta text-muted mt-12 font-mono tracking-[0.06em] uppercase">
              Open to
            </h2>
            <TagList items={site.openTo} className="mt-5" label="Collaboration interests" />
          </div>
        </div>
      </Section>

      <Section label="How we work" title={site.motto}>
        <div className="md:grid md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-8">
            <TerminalBlock />
          </div>
          <div className="mt-8 md:col-span-4 md:mt-0">
            <p className="text-muted max-w-[40ch]">
              Five words, in that order, every time. The one people skip is{' '}
              <span className="text-ink">break</span> — and it is the one that decides whether a
              system holds up once real people and a bad connection are involved.
            </p>
          </div>
        </div>
      </Section>

      {/* id="founder" is the anchor the Person JSON-LD @id points at. */}
      <Section id="founder" label="Founder" title="Who you will be working with.">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-4">
            {/* No photograph yet: the frame is absent rather than an empty
                labelled box. Set `founder.photo` in src/content/team.ts and it
                appears here. Real photograph only — no stock imagery. */}
            {founder.photo && (
              <ImageFrame
                src={founder.photo.src}
                alt={founder.photo.alt}
                width={800}
                height={1000}
                sizes="(min-width: 768px) 20rem, 100vw"
              />
            )}

            <p className="text-meta text-muted font-mono">
              {founder.name}
              <br />
              <span className="text-faint">{founder.role}</span>
            </p>

            {founder.links.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {founder.links.map((link) => (
                  <li key={link.href}>
                    <TextLink href={link.href} className="text-meta">
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="prose">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h3 className="text-meta text-muted mt-10 font-mono tracking-[0.06em] uppercase">
              Focus
            </h3>
            <TagList items={founder.focus} className="mt-4" label="Areas of focus" />
          </div>
        </div>
      </Section>

      <Section label="Values" title="What we hold to.">
        <NotedList items={values} headingLevel="h3" />
      </Section>

      <Section label="Technologies" title="What we build with.">
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((group) => (
            <div key={group.label}>
              <dt className="text-meta text-faint font-mono tracking-[0.08em] uppercase">
                {group.label}
              </dt>
              <dd className="border-hairline mt-4 border-t pt-4">
                <ul className="text-meta text-muted space-y-1.5 font-mono">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section label="Next" title="Start a conversation.">
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          <TextLink href="/contact?type=quote">Request a quote</TextLink>
          <TextLink href="/academy">Browse courses</TextLink>
          <TextLink href="/work">Read a case study</TextLink>
        </div>
      </Section>

      <Container>
        <JsonLd
          data={[
            founderJsonLd(),
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
            ]),
          ]}
        />
      </Container>
    </>
  );
}
