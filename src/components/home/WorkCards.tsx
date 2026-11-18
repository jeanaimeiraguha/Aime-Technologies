import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/home/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { getAllCaseStudies } from '@/lib/content/work';

/**
 * Artwork is a drawn plate rather than a screenshot: these case studies have
 * no images attached, and a placeholder frame on the home page would read as
 * an unfinished site. The plate carries the category and the year, which is
 * what the reference site's captions carry too.
 */
export function WorkCards() {
  const studies = getAllCaseStudies().slice(0, 4);

  if (studies.length === 0) return null;

  return (
    <section id="work" className="border-hairline border-t py-20 md:py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="max-w-[40rem]">
            <SectionLabel>From our case studies</SectionLabel>
            <h2>Selected work</h2>
          </div>
          <Link href="/work" className="btn-outline shrink-0">
            All case studies
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {studies.map((study, index) => (
            <Reveal as="li" key={study.slug} delay={(index % 4) * 90}>
              <Link
                href={`/work/${study.slug}`}
                className="work-card group border-hairline relative block overflow-hidden rounded-lg border"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="work-card__media absolute inset-0"
                    style={{
                      background: `linear-gradient(140deg, hsl(${200 + index * 8} 72% 34%) 0%, #054163 55%, #041c2c 100%)`,
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, rgba(255,255,255,0.22) 1px, transparent 1px)',
                      backgroundSize: '26px 26px',
                    }}
                    aria-hidden="true"
                  />
                  <div className="work-card__overlay" aria-hidden="true" />

                  <span
                    className="absolute top-4 left-4 rounded-full px-3 py-1 font-mono text-[0.6875rem] font-semibold tracking-[0.12em] uppercase"
                    style={{ background: 'rgba(255,255,255,0.18)', color: '#ffffff' }}
                  >
                    {study.category}
                  </span>

                  <span
                    className="work-card__arrow absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/45 text-white"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                    aria-hidden="true"
                  >
                    <ArrowUpRight size={18} />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    {study.year && (
                      <p
                        className="font-mono text-[0.75rem] tracking-[0.14em] uppercase"
                        style={{ color: 'rgba(255,255,255,0.7)' }}
                      >
                        {study.year}
                      </p>
                    )}
                    <h3 className="mt-1.5 text-[1.0625rem] leading-snug text-white">
                      {study.title}
                    </h3>
                  </div>
                </div>

                <div className="bg-surface p-5">
                  <p className="text-muted text-[0.875rem] leading-relaxed">{study.summary}</p>
                  <p className="text-faint mt-3 font-mono text-[0.75rem] tracking-wide">
                    {study.stack.slice(0, 3).join(' · ')}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
