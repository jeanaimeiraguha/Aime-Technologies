import { GraduationCap, Rocket } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/home/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { site, whatsappUrl } from '@/content/site';

export function CtaBand() {
  const whatsapp = whatsappUrl(`Hello ${site.name}, I would like to discuss a project.`);

  return (
    <section
      id="start"
      className="band-dark relative isolate overflow-hidden py-20 md:py-28"
      style={{
        background: 'linear-gradient(105deg, #054163 -10%, #0a3350 55%, #0f0d1d 120%)',
      }}
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="hero-orb -bottom-40 -left-20 h-[380px] w-[380px]"
        style={{
          background: 'radial-gradient(circle, rgba(127,208,255,0.3), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <SectionLabel>Start</SectionLabel>
          <h2>Start a project, or join a class.</h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-white/80">
            Tell us the problem, who it affects and what you have tried. You get a written
            scope, a phased estimate and the assumptions behind it — before any code.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div
              className="flex h-full flex-col rounded-lg border border-white/15 p-8"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(6px)' }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: 'rgba(255,255,255,0.14)', color: '#ffffff' }}
              >
                <Rocket size={26} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-[1.25rem] text-white">Start a project</h3>
              <p
                className="mt-3 flex-1 text-[0.9375rem] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.78)' }}
              >
                A written scope, a phased estimate and the assumptions behind it. We read the
                current process first — including the parts people quietly work around.
              </p>
              <p className="mt-7">
                <Link href="/contact?type=quote" className="btn-primary">
                  Request a quote
                  <span aria-hidden="true" style={{ marginLeft: '6px' }}>
                    →
                  </span>
                </Link>
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="flex h-full flex-col rounded-lg border border-white/15 p-8"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(6px)' }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: 'rgba(255,255,255,0.14)', color: '#ffffff' }}
              >
                <GraduationCap size={26} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-[1.25rem] text-white">Join a class</h3>
              <p
                className="mt-3 flex-1 text-[0.9375rem] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.78)' }}
              >
                Pick a course, tell us your level and when you can study. We confirm the intake,
                the format and what you need to bring — a laptop, and a hardware kit for the
                embedded courses.
              </p>
              <p className="mt-7">
                <Link href="/academy" className="btn-outline">
                  Enrol in a course
                  <span aria-hidden="true" style={{ marginLeft: '6px' }}>
                    →
                  </span>
                </Link>
              </p>
            </div>
          </Reveal>
        </div>

        {whatsapp && (
          <Reveal className="mt-10 text-center" delay={160}>
            <p className="text-[0.9375rem]" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Prefer to chat?{' '}
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline decoration-white/40 underline-offset-[5px] transition-colors hover:decoration-white"
              >
                Message us on WhatsApp
                <span aria-hidden="true"> ↗</span>
              </a>
            </p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
