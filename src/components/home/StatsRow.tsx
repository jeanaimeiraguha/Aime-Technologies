import { CountUp } from '@/components/home/CountUp';
import { Reveal } from '@/components/home/Reveal';
import { Container } from '@/components/ui/Container';
import { industries } from '@/content/industries';
import { services } from '@/content/services';
import { getAllCaseStudies } from '@/lib/content/work';
import { getAllCourses } from '@/lib/content/courses';

const STATS = [
  { value: services.length, suffix: '+', label: 'Service lines' },
  { value: getAllCourses().length, suffix: '', label: 'Courses running' },
  { value: getAllCaseStudies().length, suffix: '+', label: 'Projects delivered' },
  { value: industries.length, suffix: '+', label: 'Sectors served' },
];

/**
 * Web3mates-style impact numbers: big figures in raised cards, count-up on
 * scroll, with a rule that sweeps in once the card is visible.
 */
export function StatsRow() {
  return (
    <section className="stats-band border-hairline border-b py-16 md:py-20" aria-label="Impact">
      <Container>
        <ul className="grid grid-cols-2 gap-x-6 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal as="li" key={stat.label} delay={index * 100}>
              <div className="stat-card h-full">
                <p className="stat-card__value">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="stat-card__label">{stat.label}</p>
                <span className="stat-card__rule" aria-hidden="true" />
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
