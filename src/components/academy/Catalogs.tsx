'use client';

import Link from 'next/link';

import type { Opportunity } from '@/content/academy/opportunities';
import type { TrainingTrack } from '@/content/academy/training';

export function TrainingCatalog({ tracks }: { tracks: TrainingTrack[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {tracks.map((track) => (
        <li key={track.id} className="border-hairline bg-surface rounded-sm border p-6">
          <h3 className="text-xl">{track.title}</h3>
          <p className="text-muted mt-2 text-sm leading-relaxed">{track.summary}</p>
          <ul className="mt-4 space-y-1.5">
            {track.courses.map((course) => (
              <li key={course} className="text-meta text-muted flex gap-2 font-mono">
                <span className="text-accent" aria-hidden="true">
                  ·
                </span>
                {course}
              </li>
            ))}
          </ul>
          <Link
            href={`/academy/apply?track=${track.id}`}
            className="tap text-meta text-accent mt-5 inline-block underline underline-offset-4"
          >
            Apply for this track
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function OpportunityGrid({ items }: { items: Opportunity[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id} className="border-hairline bg-surface flex flex-col rounded-sm border p-6">
          <h3 className="text-xl">{item.title}</h3>
          <p className="text-muted mt-2 text-sm leading-relaxed">{item.summary}</p>
          <ul className="mt-4 flex-1 space-y-2">
            {item.details.map((detail) => (
              <li key={detail} className="text-meta text-muted flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  →
                </span>
                {detail}
              </li>
            ))}
          </ul>
          <Link
            href={`/academy/apply?opportunity=${item.id}`}
            className="tap text-meta text-accent mt-5 inline-block underline underline-offset-4"
          >
            {item.actionLabel}
          </Link>
        </li>
      ))}
    </ul>
  );
}
