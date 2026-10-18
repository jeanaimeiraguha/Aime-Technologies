import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { faqGroupsWithAnswers } from '@/content/faq';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'FAQ',
  description:
    'Questions about our services, the Academy, payments and support — answered plainly, including the ones we have not settled yet.',
  path: '/faq',
});

export default function FaqPage() {
  const groups = faqGroupsWithAnswers;
  const answered = groups.flatMap((group) =>
    group.items.filter((item) => item.answer.length > 0),
  );

  return (
    <>
      <PageHeader
        label="FAQ"
        title="Questions, answered plainly."
        lead={
          <p>
            Including the ones we have not settled yet — those are marked rather than filled
            with something vague. If your question is not here, ask it directly.
          </p>
        }
        meta={groups.map((group) => ({
          label: group.label,
          value: `${group.items.length} questions`,
        }))}
      />

      {groups.map((group, index) => (
        <Section
          key={group.id}
          id={group.id}
          label={`${String(index + 1).padStart(2, '0')} — ${group.label}`}
          title={group.label}
        >
          <dl className="divide-hairline border-hairline divide-y border-y">
            {group.items.map((item) => (
              <div key={item.question} className="grid gap-x-8 gap-y-2 py-7 md:grid-cols-12">
                <dt className="max-w-[34ch] md:col-span-5">{item.question}</dt>
                <dd className="md:col-span-6 md:col-start-7">
                  <p className="text-muted max-w-[58ch]">{item.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}

      <Section label="Still unanswered" title="Ask us directly.">
        <div className="flex flex-wrap gap-x-10 gap-y-3">
          <TextLink href="/contact">Contact us</TextLink>
          <TextLink href="/services">See what we do</TextLink>
          <TextLink href="/academy">Browse courses</TextLink>
        </div>
      </Section>

      <Container>
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: 'Home', path: '/' },
              { name: 'FAQ', path: '/faq' },
            ]),
            ...(faqJsonLd(answered) ? [faqJsonLd(answered)!] : []),
          ]}
        />
      </Container>
    </>
  );
}
