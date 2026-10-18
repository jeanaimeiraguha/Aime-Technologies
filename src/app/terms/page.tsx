import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { TextLink } from '@/components/ui/TextLink';
import { TodoBlock } from '@/components/ui/Todo';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Terms',
  description: `Terms for using the ${site.name} website and for our services and courses. This page is a placeholder pending legal review.`,
  path: '/terms',
  noindex: true,
});

export default function TermsPage() {
  return (
    <>
      <PageHeader
        label="Terms"
        title="Terms of use"
        lead={
          <p>
            What this website is, and what governs our work. This page is a draft and has not
            been reviewed by a lawyer.
          </p>
        }
        meta={[{ label: 'Status', value: 'Draft — not reviewed' }]}
      />

      <Container>
        <TodoBlock title="Needs legal review before launch" className="max-w-[62ch]">
          This page is a structural placeholder written by the development team, not legal
          advice. Have a lawyer review it against Rwandan contract and consumer law before
          launch, alongside your standard project contract and course enrolment terms. It is
          excluded from search results until then — remove <code>noindex: true</code> in{' '}
          <code>src/app/terms/page.tsx</code> once it is.
        </TodoBlock>

        <div className="prose mt-14">
          <h2>This website</h2>
          <p>
            The content here describes what we do. Service descriptions, course outlines,
            durations and syllabi are provided in good faith and may change — what binds us is
            the written scope or enrolment confirmation you receive, not this site.
          </p>

          <h2>Quotes and estimates</h2>
          <p>
            Nothing on this site is a quote. Estimates are given per project, in writing, with
            the assumptions behind them stated. Where an assumption turns out to be wrong, we
            say so and re-estimate rather than absorbing it silently or billing past the
            agreement.
          </p>

          <TodoBlock title="Set your commercial terms">
            Add the standard terms you work under: deposit percentage, invoicing schedule,
            payment window, currency, late payment handling, what happens if a project is
            cancelled mid-way, and how change requests are priced.
          </TodoBlock>

          <h2>Intellectual property</h2>
          <p>
            On delivery and full payment, the code and assets we build for you are yours,
            including the repository and documentation. We keep the right to reuse general
            techniques, patterns and our own pre-existing libraries — not your business logic,
            your data or your brand.
          </p>

          <TodoBlock title="Confirm the IP position">
            Confirm this matches what you actually agree in contracts, and state whether a
            project may be referenced publicly as a case study. Publishing a client name or
            screenshots needs written permission — see the case studies in{' '}
            <code>src/content/work/</code>.
          </TodoBlock>

          <h2>Courses</h2>
          <p>
            Enrolment is confirmed by us individually, not automatically on submitting the form.
            A place is held once payment is received. Where we judge a course is the wrong fit
            for someone&apos;s level, we say so before taking payment.
          </p>

          <TodoBlock title="Set course terms">
            Add: refund and cancellation policy, what happens if an intake is postponed or
            cancelled by us, attendance expectations, whether recordings may be shared,
            instalment terms, and what is issued on completion. Do not claim accreditation the
            Academy does not hold.
          </TodoBlock>

          <h2>Support and maintenance</h2>
          <p>
            Support after delivery is covered by a written agreement stating what is included,
            how to report a problem and how quickly we respond. Without such an agreement in
            place, we help where we can but make no commitment on timing.
          </p>

          <h2>Liability</h2>
          <TodoBlock title="Have this section drafted by a lawyer">
            Limitation of liability is the section most likely to be unenforceable if written by
            engineers. Leave it to a lawyer.
          </TodoBlock>

          <h2>Governing law</h2>
          <TodoBlock title="State the governing law and jurisdiction">
            Presumably the laws of Rwanda, with disputes heard in Kigali — confirm, and consider
            what applies for remote clients outside Rwanda.
          </TodoBlock>

          <p>
            Questions about any of this: <TextLink href="/contact">contact us</TextLink>.
          </p>
        </div>
      </Container>
    </>
  );
}
