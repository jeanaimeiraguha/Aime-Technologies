import { Banknote, Landmark, Rocket, School, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/home/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { type Industry, industries } from '@/content/industries';

const ICONS: Record<string, LucideIcon> = {
  'Schools & education': School,
  'Businesses & SMEs': Store,
  Fintech: Banknote,
  'Public sector & NGOs': Landmark,
  Startups: Rocket,
};

export function SectorsGrid() {
  return (
    <section id="sectors" className="border-hairline border-t py-20 md:py-28">
      <Container>
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <SectionLabel>Sectors</SectionLabel>
          <h2>Sectors we work in</h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry: Industry, index) => {
            const Icon = ICONS[industry.name] ?? Store;
            return (
              <Reveal as="li" key={industry.name} delay={(index % 3) * 90}>
                <div className="card group h-full p-6 sm:p-7">
                  <span className="icon-tile">
                    <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[1.0625rem]">{industry.name}</h3>
                  <p className="text-muted mt-2 text-[0.9375rem] leading-relaxed">
                    {industry.note}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
