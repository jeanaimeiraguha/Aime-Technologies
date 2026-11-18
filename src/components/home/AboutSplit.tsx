import { ArrowRight, BadgeCheck, CircleCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Reveal } from '@/components/home/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { site } from '@/content/site';

const PROMISES = [
  'You own the repository and the hosting accounts throughout — nothing is held in our name.',
  'Tested on mid-range phones and a throttled connection, because that is the audience.',
  'Handover includes the code, the credentials and the documentation. No lock-in.',
] as const;

export function AboutSplit() {
  return (
    <section id="about" className="border-hairline border-t py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-x-14 gap-y-12 lg:grid-cols-2">
          {/* ── Copy ── */}
          <Reveal>
            <SectionLabel>{`About ${site.name}`}</SectionLabel>
            <h2 className="max-w-[18ch]">We build because there are problems worth solving.</h2>
            <p className="text-muted mt-6 max-w-[52ch]">
              We build across full-stack development, EdTech, school ERP, business automation,
              AI/ML, embedded systems and digital products. Not just the code — the
              architecture, the interface, the security, the performance, the integrations, the
              tests and the deploy.
            </p>

            <ul className="mt-9 space-y-5">
              {PROMISES.map((promise) => (
                <li key={promise} className="flex items-start gap-3.5">
                  <span className="mt-0.5 shrink-0">
                    <CircleCheck
                      size={20}
                      aria-hidden="true"
                      style={{ color: 'var(--label-color)' }}
                    />
                  </span>
                  <span className="text-muted text-[0.9375rem] leading-relaxed">{promise}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/about" className="btn-primary">
                More about us
                <span aria-hidden="true" style={{ marginLeft: '6px' }}>
                  <ArrowRight size={16} />
                </span>
              </Link>
              <span
                className="inline-flex items-center gap-2 text-[0.875rem] font-semibold"
                style={{ color: 'var(--label-color)' }}
              >
                <BadgeCheck size={18} aria-hidden="true" />
                Founded {site.founded} · {site.location.short}
              </span>
            </div>
          </Reveal>

          {/* ── Artwork with a floating figure ── */}
          <Reveal delay={140} className="relative">
            <div
              className="border-hairline relative aspect-[4/3] overflow-hidden rounded-lg border"
              style={{
                background: 'linear-gradient(140deg, #241f4a 0%, #1b1834 60%, #100e21 100%)',
              }}
            >
              <Image
                src="/hero-code.webp"
                alt="Source from a Totally Ink project open in an editor"
                fill
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="object-cover opacity-55"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(140deg, rgba(36,31,74,0.55) 0%, rgba(16,14,33,0.92) 100%)',
                }}
                aria-hidden="true"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
