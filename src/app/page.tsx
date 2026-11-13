import { Hero } from '@/components/home/Hero';
import { TerminalBlock } from '@/components/home/TerminalBlock';
import { CourseList } from '@/components/rows/CourseRow';
import { ProjectList } from '@/components/rows/ProjectRow';
import { ServiceList } from '@/components/rows/ServiceRow';
import { Section } from '@/components/ui/Section';
import { TextLink } from '@/components/ui/TextLink';
import { industries } from '@/content/industries';
import { services } from '@/content/services';
import { site, whatsappUrl } from '@/content/site';
import { technologies } from '@/content/technologies';
import { getFeaturedCourses } from '@/lib/content/courses';
import { getAllCaseStudies } from '@/lib/content/work';

/**
 * The home page deliberately varies its section weights rather than repeating
 * one shape. Reading down: one loud section, two progressively quieter ones, a
 * full-bleed break, two tight ones, then the close.
 *
 * None of this is a new component — it is the same Section with different
 * `heading`, `tone` and `density`.
 */
export default function HomePage() {
  const featuredCourses = getFeaturedCourses(5);
  const selectedWork = getAllCaseStudies().slice(0, 5);
  const whatsapp = whatsappUrl(`Hello ${site.name}, I would like to discuss a project.`);

  return (
    <>
      <Hero />

      {/* Loud: the services list is the centre of the page. */}
      <Section
        id="services"
        label="02 — Services"
        title="Eighteen things we do, and what each one actually involves."
        action={{ label: 'All services', href: '/services' }}
        className="mt-20 md:mt-28"
      >
        <ServiceList services={services} />
      </Section>

      {/* Quieter: the title drops to body scale and sits on the label line. */}
      <Section
        id="academy"
        label="03 — Academy"
        heading="plain"
        title="We teach the way we learned — by building something that has to work."
        intro={
          <p>
            Live online classes, recorded lessons and mentorship, in software engineering,
            embedded systems and the tools around them.
          </p>
        }
        action={{ label: 'All courses', href: '/academy' }}
      >
        <CourseList courses={featuredCourses} />
      </Section>

      {/* Quieter still: no visible title. The work speaks, or it does not. */}
      <Section
        id="work"
        label="04 — Selected work"
        heading="bare"
        title="Selected work"
        action={{ label: 'All case studies', href: '/work' }}
      >
        <ProjectList studies={selectedWork} />
      </Section>

      {/* The break: a full-bleed band of the sunken surface, halfway down. */}
      <Section
        id="how-we-work"
        label="05 — How we work"
        tone="sunken"
        title="Build it. Test it. Break it. Fix it. Ship it."
      >
        <div className="md:grid md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <TerminalBlock />
          </div>
          <div className="mt-8 md:col-span-4 md:col-start-9 md:mt-0">
            <p className="text-muted max-w-[38ch]">
              We do not hand over a system we have not tried to break. Edge cases, load, bad
              input, lost connections, and the security holes we can find ourselves — all of it
              before it reaches the people who depend on it.
            </p>
          </div>
        </div>
      </Section>

      {/* Tight: five sectors do not need five table rows. */}
      <Section
        id="industries"
        label="06 — Sectors"
        heading="plain"
        density="tight"
        title="Sectors we work in"
      >
        <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <li key={industry.name}>
              <h3 className="font-medium">{industry.name}</h3>
              <p className="text-muted text-meta mt-1.5 max-w-[34ch]">{industry.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Tighter: a spec sheet, not twenty-five list rows. */}
      <Section
        id="technologies"
        label="07 — Stack"
        heading="plain"
        density="tight"
        title="What we build with"
      >
        <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((group) => (
            <div key={group.label}>
              <dt className="text-meta text-faint font-mono tracking-[0.1em] uppercase">
                {group.label}
              </dt>
              <dd className="text-meta text-muted mt-2 font-mono leading-relaxed">
                {group.items.join(', ')}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* The close. */}
      <Section id="start" label="08 — Start" title="Start a project, or join a class.">
        <div className="grid gap-y-10 md:grid-cols-2 md:gap-x-0">
          <div className="md:pr-12">
            <h3 className="text-lead">Start a project</h3>
            <p className="text-muted mt-3 max-w-[44ch]">
              Tell us the problem, who it affects and what you have tried. You get a written
              scope, a phased estimate and the assumptions behind it — before any code.
            </p>
            <p className="mt-6">
              <TextLink href="/contact?type=quote">Request a quote</TextLink>
            </p>
          </div>

          <div className="md:border-hairline md:border-l md:pl-12">
            <h3 className="text-lead">Join a class</h3>
            <p className="text-muted mt-3 max-w-[44ch]">
              Pick a course, tell us your level and when you can study. We confirm the intake,
              the format and what you need to bring — a laptop, and a hardware kit for the
              embedded courses.
            </p>
            <p className="mt-6">
              <TextLink href="/academy">Enrol in a course</TextLink>
            </p>
          </div>
        </div>

        {/* Without a WhatsApp number the whole line is absent, not labelled. */}
        {whatsapp && (
          <p className="border-hairline text-meta text-muted mt-12 border-t pt-6 font-mono">
            Prefer to chat?{' '}
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="tap text-ink decoration-hairline-strong hover:text-accent hover:decoration-accent underline underline-offset-[5px]"
            >
              Message us on WhatsApp
              <span aria-hidden="true">{' '}↗</span>
            </a>
          </p>
        )}
      </Section>
    </>
  );
}
