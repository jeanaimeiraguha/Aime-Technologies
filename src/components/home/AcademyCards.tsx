import Link from 'next/link';

import { CourseCard } from '@/components/academy/CourseCard';
import { Reveal } from '@/components/home/Reveal';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { getFeaturedCourses } from '@/lib/content/courses';

/**
 * Academy teaser band: an indigo plate, a masked dot grid and a violet glow,
 * carrying three of the same course cards the catalogue uses — so the home
 * page and the Academy page read as one system.
 */
export function AcademyCards() {
  const courses = getFeaturedCourses(3);

  if (courses.length === 0) return null;

  return (
    <section
      id="academy"
      className="band-dark relative isolate overflow-hidden py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #171433 0%, #100e21 100%)' }}
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="hero-orb -top-40 right-0 h-[360px] w-[360px]"
        style={{ background: 'radial-gradient(circle, var(--glow-violet), transparent 65%)' }}
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
          {courses.map((course, index) => (
            <Reveal as="li" key={course.slug} className="h-full" delay={index * 110}>
              <CourseCard course={course} cta="Read more" />
            </Reveal>
          ))}
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
