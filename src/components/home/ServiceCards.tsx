import { ArrowRight, Brain, Cloud, Code, Cpu, ShieldCheck, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/home/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { getService, type Service } from '@/content/services';

/**
 * Six of the eighteen lines, chosen to span what the company actually does —
 * web, mobile, AI, embedded, security, cloud — rather than the first six in
 * the file, which would read as an alphabetical accident.
 */
const FEATURED_SLUGS = [
  'web-development',
  'mobile-app-development',
  'ai-machine-learning',
  'embedded-systems-iot',
  'cybersecurity',
  'cloud-computing-solutions',
];

const ICONS: Record<string, LucideIcon> = {
  'web-development': Code,
  'mobile-app-development': Smartphone,
  'ai-machine-learning': Brain,
  'embedded-systems-iot': Cpu,
  cybersecurity: ShieldCheck,
  'cloud-computing-solutions': Cloud,
};

function featured(): Service[] {
  return FEATURED_SLUGS.map((slug) => getService(slug)).filter((service): service is Service =>
    Boolean(service),
  );
}

export function ServiceCards() {
  const items = featured();

  return (
    <section id="services" className="border-hairline border-t py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <SectionLabel>Our services</SectionLabel>
          <h2>Wide range of services</h2>
          <p className="text-muted mx-auto mt-6 max-w-[58ch]">
            From the first wireframe to the deploy that puts it in front of users — and the
            review that finds the gap while it is still ours to fix.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => {
            const Icon = ICONS[service.slug] ?? Code;
            return (
              <Reveal as="li" key={service.slug} delay={(index % 3) * 90}>
                <Link
                  href={`/services/${service.slug}`}
                  className="card group flex h-full flex-col p-7 sm:p-8"
                >
                  <span className="icon-tile">
                    <Icon size={28} strokeWidth={1.75} aria-hidden="true" />
                  </span>

                  <h3 className="mt-6 text-[1.1875rem] leading-snug">{service.title}</h3>

                  <p className="text-muted mt-3 flex-1 text-[0.9375rem] leading-relaxed">
                    {service.summary}
                  </p>

                  <span
                    className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-semibold"
                    style={{ color: 'var(--label-color)' }}
                  >
                    Read more
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12 text-center" delay={120}>
          <Link href="/services" className="btn-outline">
            All 18 services
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
