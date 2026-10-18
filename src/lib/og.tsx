import { ImageResponse } from 'next/og';

import { site } from '@/content/site';

/**
 * Shared Open Graph image renderer, so every card looks like the same site.
 *
 * Satori (which powers next/og) supports a subset of CSS: flexbox only, no
 * grid, and every element with more than one child needs an explicit
 * `display: flex`. The layout below is therefore built from nested flex rows,
 * mirroring the page design — ink field, paper type, one accent rule.
 *
 * Note: these render in the default sans rather than Instrument Sans. Loading
 * the real font would mean fetching a font file at build time, which would make
 * the Docker build depend on the network. The brand is carried by the colours,
 * the rules and the layout instead. To change that, fetch the .ttf and pass it
 * in the `fonts` option here.
 */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

const INK = '#0b0b0c';
const PAPER = '#edebe6';
const MUTED = '#8a8a8e';
const ACCENT = '#e0561b';
const HAIRLINE = '#26262a';

export function renderOgImage({
  label,
  title,
  meta,
}: {
  /** Mono eyebrow, e.g. "02 — Services" or "EMB-201 — Academy". */
  label: string;
  title: string;
  /** Short mono line along the bottom, e.g. level and duration. */
  meta?: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: INK,
        color: PAPER,
        padding: '72px 80px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: MUTED,
          }}
        >
          {label}
        </div>

        <div
          style={{
            display: 'flex',
            width: 120,
            height: 2,
            backgroundColor: ACCENT,
            marginTop: 28,
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          fontSize: title.length > 60 ? 62 : 76,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          maxWidth: 980,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          borderTop: `1px solid ${HAIRLINE}`,
          paddingTop: 28,
          fontSize: 24,
          color: MUTED,
        }}
      >
        <div style={{ display: 'flex', color: PAPER }}>{site.name}</div>
        <div style={{ display: 'flex' }}>{meta ?? site.location.short}</div>
      </div>
    </div>,
    OG_SIZE,
  );
}
