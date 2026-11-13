import type { Metadata } from 'next';

import { ServiceList } from '@/components/rows/ServiceRow';
import { Container } from '@/components/ui/Container';
import { StepList } from '@/components/ui/Lists';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { services } from '@/content/services';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Services',
  description:
    'Eighteen service lines from Totally Ink: web development, AI and machine learning, embedded systems and IoT, mobile apps, cloud, database design, UI/UX, DevOps and CI/CD, cybersecurity, IT consulting, software engineering, APIs, robotics, data science, blockchain, network engineering, system architecture and business process automation.',
  path: '/services',
});

const ENGAGEMENT = [
  'You tell us the problem — who it affects, what it costs, and what you have already tried.',
  'We map the current process, including the parts people work around, and ask the questions that change the design.',
  'You get a written scope, a phased estimate and the assumptions behind it. If software is not the answer, this is where we say so.',
  'We build in slices you can use and review, rather than disappearing for three months.',
  'We hand over the repository, the credentials and the documentation, and stay available through the first period of real use.',
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="Eighteen things we do, and what each one actually involves."
        lead={
          <p>
            We work across software, hardware and the systems in between. Every line below has
            its own page describing what it is, who it is for, what you receive and how we work
            — so you can judge the fit before talking to us.
          </p>
        }
        meta={[
          { label: 'Service lines', value: String(services.length) },
          { label: 'Based in', value: 'Kigali, Rwanda' },
          { label: 'Working', value: 'On site & remote' },
        ]}
      />

      <Container>
        <ServiceList services={services} headingLevel="h2" />
      </Container>

      <Section
        label="How an engagement starts"
        title="No surprises, in either direction."
        className="mt-16 md:mt-24"
      >
        <div className="md:grid md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-8">
            <StepList items={ENGAGEMENT} />
          </div>
          <div className="mt-8 md:col-span-4 md:mt-0">
            <p className="text-muted max-w-[40ch]">
              Most of what goes wrong in a software project was decided before anyone wrote code
              — a scope nobody wrote down, or a process nobody mapped. We spend time there on
              purpose.
            </p>
            <p className="mt-6">
              <TextLink href="/contact?type=quote">Request a quote</TextLink>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
