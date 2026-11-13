import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og';

export const alt = 'Totally Ink — software, cloud, data, AI and embedded systems';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderOgImage({
    label: 'Totally Ink',
    title: 'We build software, embedded systems, and the people who build them.',
  });
}
