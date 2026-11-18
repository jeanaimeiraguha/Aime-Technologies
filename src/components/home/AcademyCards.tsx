import { ArrowRight, Brain, Cloud, Cpu, Code, Globe, Smartphone, Wrench } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { Reveal } from '@/components/home/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { type CourseCategory, getFeaturedCourses } from '@/lib/content/courses';

const ICONS: Record<CourseCategory, LucideIcon> = {
  'Software Engineering': Code,
  Web: Globe,
  Mobile: Smartphone,
  'Embedded & IoT': Cpu,
  'AI/ML': Brain,
  DevOps: Cloud,
  Tools: Wrench,
};

/**
 * The "Our Products" band from the reference site: a deeper blue plate, three
 * cards whose artwork carries the identity and whose copy arrives on hover.
 *
 * The artwork is drawn rather than photographed — a diagonal wash, a hairline
 * grid and an oversized category icon. The site has no product screenshots and
 * a stock photo of someone at a laptop would say less than the course code.
 */
export function AcademyCards() {
  const courses = getFeaturedCourses(3);

  if (courses.length === 0) return null;

  return (
    <section
      id="academy"
      className="band-dark relative isolate overflow-hidden py-20 md:py-28"
      style={{ background: '#03273c' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
        }}
        aria-hidden="true"
      />
      <div
        className="hero-orb -top-40 right-0 h-[360px] w-[360px]"
        style={{
          background: 'radial-gradient(circle, rgba(90,169,221,0.35), transparent 65%)',
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <SectionLabel>Our academy</SectionLabel>
          <h2>Courses that end with something running</h2>
          <p className="mx-auto mt-6 max-w-[58ch] text-white/80">
            Live online classes, recorded lessons and mentorship — in software engineering,
            embedded systems, IoT and the tools around them.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {courses.map((course, index) => {
            const Icon = ICONS[course.category] ?? Code;
            return (
              <Reveal as="li" key={course.slug} delay={index * 110}>
                <article className="reveal-card group h-full overflow-hidden rounded-lg border border-white/12 bg-[#04324d]">
                  <div
                    className="relative aspect-[16/10] overflow-hidden"
                    style={{
                      background:
                        'linear-gradient(135deg, #0a5b86 0%, #054163 45%, #02253a 100%)',
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)',
                        backgroundSize: '34px 34px',
                      }}
                      aria-hidden="true"
                    />
                    <Icon
                      size={150}
                      strokeWidth={0.75}
                      aria-hidden="true"
                      className="absolute -right-6 -bottom-8 text-white/15 transition-transform duration-700 group-hover:scale-110 group-hover:text-white/25"
                    />

                    <span
                      className="absolute top-5 left-5 rounded-full px-3 py-1 font-mono text-[0.75rem] font-semibold tracking-wider uppercase"
                      style={{ background: 'rgba(255,255,255,0.16)', color: '#ffffff' }}
                    >
                      {course.code}
                    </span>

                    <div
                      className="reveal-card__panel"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(5,65,99,0.97), rgba(2,37,58,0.97))',
                      }}
                    >
                      <p
                        className="text-[0.9375rem] leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.85)' }}
                      >
                        {course.summary}
                      </p>
                      <span
                        className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-semibold"
                        style={{ color: '#ffffff' }}
                      >
                        Read more
                        <ArrowRight size={16} aria-hidden="true" />
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <p
                      className="font-mono text-[0.75rem] font-semibold tracking-[0.14em] uppercase"
                      style={{ color: '#7fd0ff' }}
                    >
                      {course.category}
                      <span className="mx-2 opacity-50" aria-hidden="true">
                        ·
                      </span>
                      {course.level}
                    </p>
                    <h3 className="mt-2.5 text-[1.125rem] leading-snug text-white">
                      <Link
                        href={`/academy/${course.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {course.title}
                      </Link>
                    </h3>
                    <p
                      className="mt-2 text-[0.875rem]"
                      style={{ color: 'rgba(255,255,255,0.65)' }}
                    >
                      {course.duration ?? 'Duration confirmed at enrolment'}
                      <span className="mx-2 opacity-50" aria-hidden="true">
                        ·
                      </span>
                      {course.format[0]}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12 text-center" delay={120}>
          <Link href="/academy" className="btn-primary">
            All courses
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
