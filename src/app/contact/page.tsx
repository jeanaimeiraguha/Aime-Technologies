import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ContactForm } from '@/components/forms/ContactForm';
import { Container } from '@/components/ui/Container';
import { ContactLines } from '@/components/ui/ContactLines';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { SpecTable } from '@/components/ui/SpecTable';
import { site } from '@/content/site';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description: `Talk to ${site.name} about a project, a quote, course enrolment, training for a school or company, or a partnership. Based in Kigali, Rwanda, working on site and remotely.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Contact"
        title="Tell us what you are trying to solve."
        lead={
          <p>
            Projects, quotes, course enrolment, training for a school or company, or a
            partnership — it all starts in the same place. The more concrete you are about the
            problem, the more useful our first reply will be.
          </p>
        }
        meta={[
          { label: 'Location', value: site.location.short },
          // The response-time row appears once a commitment is set, and is
          // absent until then rather than promising something unspecified.
          ...(site.contact.responseTime
            ? [{ label: 'Response', value: site.contact.responseTime }]
            : []),
          { label: 'Working', value: 'On site & remote' },
        ]}
      />

      <Container>
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
          <div className="md:col-span-7">
            {/* useSearchParams in ContactForm reads ?type=… to preselect the request
                type. The Suspense boundary keeps this page statically rendered. */}
            <Suspense
              fallback={<p className="text-meta text-faint font-mono">Loading the form…</p>}
            >
              <ContactForm />
            </Suspense>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <h2 className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
              Or reach us directly
            </h2>
            <ContactLines className="mt-5" />

            <h2 className="text-meta text-muted mt-12 font-mono tracking-[0.06em] uppercase">
              What to expect
            </h2>
            <SpecTable
              className="mt-5"
              dense
              rows={[
                ...(site.contact.responseTime
                  ? [{ label: 'Reply', value: site.contact.responseTime }]
                  : []),
                { label: 'From', value: 'A person, not an autoresponder' },
                { label: 'Cost', value: 'A first conversation is free' },
                { label: 'Privacy', value: 'No lists, no sharing' },
              ]}
            />

            <p className="text-meta text-muted mt-10 max-w-[36ch]">
              Something broken right now? Mark it urgent in the message, or send a WhatsApp.
              Include what you did, what you expected and what happened instead — it is the
              fastest route to a fix.
            </p>
          </div>
        </div>
      </Container>

      <Section label="Before you write" title="What makes a first message useful.">
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <h3 className="font-normal">For a project or quote</h3>
            <p className="text-muted mt-3 max-w-[40ch]">
              The problem and who it affects, what you use today, roughly when you need it, and
              any budget range you have in mind. We would rather tell you early that the scope
              and the budget do not meet than discover it in week three.
            </p>
          </div>
          <div className="md:col-span-4">
            <h3 className="font-normal">For course enrolment</h3>
            <p className="text-muted mt-3 max-w-[40ch]">
              Which course, your current level, and when you can realistically study. If a
              different course suits you better, we will say so before you pay anything.
            </p>
          </div>
          <div className="md:col-span-4">
            <h3 className="font-normal">For school or company training</h3>
            <p className="text-muted mt-3 max-w-[40ch]">
              Group size, their current level, how much time you can give it, and what they
              should be able to do afterwards. That last one shapes everything else.
            </p>
          </div>
        </div>
      </Section>

      <Container>
        <JsonLd
          data={breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ])}
        />
      </Container>
    </>
  );
}
