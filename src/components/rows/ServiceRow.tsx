import Link from 'next/link';

import {
  ROW_ARROW,
  ROW_INDEX,
  ROW_LINK,
  ROW_LIST,
  ROW_SUMMARY,
  ROW_TITLE,
} from '@/components/rows/rowStyles';
import type { Service } from '@/content/services';
import { cn } from '@/lib/cn';

/**
 * `headingLevel` matters for more than markup tidiness: on /services the list
 * sits directly under the page's <h1> with no section heading between, so a
 * fixed <h3> would skip a level. Index pages pass "h2"; the home page, where
 * the list lives under a section <h2>, keeps the default.
 */
export function ServiceRow({
  service,
  headingLevel: Heading = 'h3',
}: {
  service: Service;
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <li>
      <Link
        href={`/services/${service.slug}`}
        className={cn(ROW_LINK, 'grid-cols-[2.5rem_1fr] gap-x-4 gap-y-1.5 md:grid-cols-12')}
      >
        <span className={cn(ROW_INDEX, 'md:col-span-1')} aria-hidden="true">
          {service.index}
        </span>

        <Heading className={cn(ROW_TITLE, 'md:col-span-4')}>{service.title}</Heading>

        <p className={cn(ROW_SUMMARY, 'col-start-2 max-w-[52ch] md:col-span-6 md:col-start-6')}>
          {service.summary}
        </p>

        <span className={cn(ROW_ARROW, 'md:col-span-1')} aria-hidden="true">
          →
        </span>
      </Link>
    </li>
  );
}

export function ServiceList({
  services,
  className,
  headingLevel,
}: {
  services: readonly Service[];
  className?: string;
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <ul className={cn(ROW_LIST, className)}>
      {services.map((service) => (
        <ServiceRow key={service.slug} service={service} headingLevel={headingLevel} />
      ))}
    </ul>
  );
}
