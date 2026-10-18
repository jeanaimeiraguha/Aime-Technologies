import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { TextLink } from '@/components/ui/TextLink';
import { TodoBlock } from '@/components/ui/Todo';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy',
  description: `How ${site.name} handles personal data. This page is a placeholder pending legal review.`,
  path: '/privacy',
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        label="Privacy"
        title="Privacy notice"
        lead={
          <p>
            A plain description of what we collect and why. This page is a draft and has not
            been reviewed by a lawyer.
          </p>
        }
        meta={[{ label: 'Status', value: 'Draft — not reviewed' }]}
      />

      <Container>
        <TodoBlock title="Needs legal review before launch" className="max-w-[62ch]">
          This page is a structural placeholder written by the development team, not legal
          advice. Have it reviewed against Rwanda&apos;s Law No. 058/2021 on the protection of
          personal data and privacy, and against GDPR if you take enquiries from the EU. It is
          excluded from search results until reviewed — remove <code>noindex: true</code> in{' '}
          <code>src/app/privacy/page.tsx</code> once it is.
        </TodoBlock>

        <div className="prose mt-14">
          <h2>What we collect</h2>
          <p>
            Only what you send us. When you submit the contact or enrolment form we receive the
            fields you filled in — your name, email address, phone number, the organisation you
            named, and your message. Nothing else is collected from those forms.
          </p>

          <h2>Why we collect it</h2>
          <p>
            To reply to you, and to deliver the project or course you asked about. We do not
            sell your details, share them with advertisers, or add you to a marketing list.
          </p>

          <h2>Who processes it</h2>
          <TodoBlock title="Name the form provider and hosting provider">
            Form submissions are handled by the third-party endpoint configured in
            <code> NEXT_PUBLIC_CONTACT_ENDPOINT</code> and{' '}
            <code>NEXT_PUBLIC_ENROLL_ENDPOINT</code> (for example Formspree or Getform). Name
            the provider here, link its privacy policy, and state where the data is stored. Do
            the same for the site host.
          </TodoBlock>

          <h2>Analytics and cookies</h2>
          <p>
            This site sets no cookies and runs no analytics or tracking scripts. If you have
            chosen a light or dark theme, that single preference is stored in your own browser
            and never sent to us.
          </p>

          <TodoBlock title="Update if analytics are added">
            If you later add analytics, state the provider, what it records, and whether consent
            is required — and add a consent mechanism if it is.
          </TodoBlock>

          <h2>How long we keep it</h2>
          <TodoBlock title="Set retention periods">
            State how long enquiry emails, enrolment records and student records are kept, and
            what happens to them afterwards. For biometric or attendance systems built for
            clients, retention is set in that project&apos;s own agreement — not here.
          </TodoBlock>

          <h2>Your rights</h2>
          <p>
            You can ask us what we hold about you, ask for it to be corrected, or ask for it to
            be deleted.
          </p>

          <TodoBlock title="Add the contact route for data requests">
            Give a named contact and address for data requests, and the response time you commit
            to.
          </TodoBlock>

          <h2>Changes</h2>
          <p>If this notice changes, the revised version appears on this page.</p>
          <TodoBlock title="Add a last-updated date" />

          <p>
            Questions about any of this: <TextLink href="/contact">contact us</TextLink>.
          </p>
        </div>
      </Container>
    </>
  );
}
