import Image from 'next/image';

import { cn } from '@/lib/cn';

/**
 * Real screenshots and photographs only, in a thin frame with a mono caption.
 *
 * `PlaceholderFrame` holds the space where an image will go once it exists.
 * It is deliberately plain — a labelled empty frame, not a stock photograph and
 * not a decorative illustration.
 */
export function ImageFrame({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  className,
  sizes = '(min-width: 1024px) 60rem, 100vw',
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <figure className={cn('m-0', className)}>
      <div className="border-hairline bg-sunken overflow-hidden rounded-sm border">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          preload={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="text-meta text-muted mt-3 font-mono">{caption}</figcaption>
      )}
    </figure>
  );
}

export function PlaceholderFrame({
  label,
  note,
  ratio = '16 / 9',
  className,
}: {
  label: string;
  note?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure className={cn('m-0', className)}>
      <div
        className="border-hairline-strong bg-sunken flex items-center justify-center rounded-sm border border-dashed"
        style={{ aspectRatio: ratio }}
      >
        <p className="text-meta text-muted px-5 text-center font-mono tracking-[0.06em] uppercase">
          <span className="text-accent">TODO</span> — {label}
        </p>
      </div>
      {note && <figcaption className="text-meta text-muted mt-3 font-mono">{note}</figcaption>}
    </figure>
  );
}
