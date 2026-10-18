import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'Aime Technologies — software, embedded systems and engineering classes';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    label: 'Aime Technologies',
    title: 'We build software, embedded systems, and the people who build them.',
  });
}
