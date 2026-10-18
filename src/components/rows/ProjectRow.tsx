import Link from 'next/link';

import {
  ROW_LINK,
  ROW_LIST,
  ROW_META,
  ROW_SUMMARY,
  ROW_TITLE,
} from '@/components/rows/rowStyles';
import type { CaseStudy } from '@/lib/content/work';
import { cn } from '@/lib/cn';

/** See the note in ServiceRow: /work puts this list directly under the <h1>. */
export function ProjectRow({
  study,
  headingLevel: Heading = 'h3',
}: {
  study: CaseStudy;
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <li>
      <Link
        href={`/work/${study.slug}`}
        className={cn(ROW_LINK, 'grid-cols-1 gap-y-2 md:grid-cols-12')}
      >
        <div className="md:col-span-5">
          <Heading className={ROW_TITLE}>{study.title}</Heading>
          <p className={cn(ROW_SUMMARY, 'text-meta mt-1 max-w-[46ch]')}>{study.summary}</p>
        </div>

        <span className={cn(ROW_META, 'md:col-span-1')}>
          {study.year ? <time dateTime={study.year}>{study.year}</time> : null}
        </span>

        <span className={cn(ROW_META, 'md:col-span-2')}>{study.category}</span>

        <span className={cn(ROW_META, 'md:col-span-4 md:text-right')}>
          {study.stack.slice(0, 4).join(' · ')}
        </span>

        <span className="text-meta text-faint group-hover:text-accent mt-1 font-mono md:hidden">
          Read case study →
        </span>
      </Link>
    </li>
  );
}

export function ProjectList({
  studies,
  className,
  headingLevel,
}: {
  studies: readonly CaseStudy[];
  className?: string;
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <ul className={cn(ROW_LIST, className)}>
      {studies.map((study) => (
        <ProjectRow key={study.slug} study={study} headingLevel={headingLevel} />
      ))}
    </ul>
  );
}
