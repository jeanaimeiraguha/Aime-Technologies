import { CodeBackdrop } from '@/components/home/CodeBackdrop';
import { LocalTime } from '@/components/home/LocalTime';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextLink } from '@/components/ui/TextLink';
import { site } from '@/content/site';

/**
 * The top of the page: headline, tagline, and the three things the company
 * actually does, as one composition rather than two stacked sections.
 *
 * They were separate before — hero, then a "01 — What we do" section with the
 * same label/title/content shape as every other section on the page. Folding
 * the trio in gives the page one substantial opening instead of two
 * interchangeable ones, and means the first hairline a visitor meets is doing
 * real work: separating the claim from the evidence for it.
 *
 * The headline is one colour. An accent-coloured closing clause was tried and
 * removed — it is the stock "highlight the last three words" move, and on a
 * site whose whole argument is restraint it read as decoration.
 */
const WHAT_WE_DO = [
  {
    label: 'Build',
    title: 'Software & embedded systems',
    body: 'Web and mobile applications, school ERP and EdTech platforms, payment systems, and firmware for devices that run unattended for months.',
    href: '/services',
    linkText: 'What we build',
  },
  {
    label: 'Teach',
    title: 'Academy & training',
    body: 'Nine courses in software engineering, embedded systems, IoT and AI/ML — taught by building projects you keep. Also run for schools and companies.',
    href: '/academy',
    linkText: 'Browse courses',
  },
  {
    label: 'Support',
    title: 'Consulting & DevOps',
    body: 'Architecture review before the budget is committed. Then Docker, Linux, backups that have been restored at least once, and monitoring.',
    href: '/services/deployment-devops-support',
    linkText: 'How we support',
  },
];

export function Hero() {
  return (
    // `isolate` keeps the backdrop's negative z-index inside the hero, and
    // `overflow-hidden` is what clips the scrolling columns to this section.
    <section className="relative isolate overflow-hidden pt-14 md:pt-20">
      <CodeBackdrop />

      <Container>
        <p className="text-meta text-muted font-mono tracking-[0.04em]">
          {site.location.short}
          <span aria-hidden="true"> · </span>
          <LocalTime />
        </p>

        <h1 className="text-hero mt-7 max-w-[26ch]">
          We build software, embedded systems, and the people who build them.
        </h1>

        <p className="text-lead mt-8 max-w-[52ch] font-medium text-balance">{site.tagline}</p>

        <p className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
          <TextLink href="/services">Our services</TextLink>
          <TextLink href="/academy">Browse courses</TextLink>
        </p>

        <div className="border-hairline mt-16 border-t pt-10 md:mt-20 md:pt-12">
          <SectionLabel className="mb-8">01 — What we do</SectionLabel>
          <h2 className="sr-only">What we do</h2>

          <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
            {WHAT_WE_DO.map((column) => (
              <div key={column.label}>
                <h3 className="text-meta text-accent font-mono tracking-[0.1em] uppercase">
                  {column.label}
                </h3>
                <p className="mt-3 font-medium">{column.title}</p>
                <p className="text-muted mt-2 max-w-[42ch]">{column.body}</p>
                <p className="mt-4">
                  <TextLink href={column.href} className="text-meta">
                    {column.linkText}
                  </TextLink>
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
