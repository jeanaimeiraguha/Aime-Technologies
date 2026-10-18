import type { MetadataRoute } from 'next';

import { site } from '@/content/site';

/**
 * Web manifest. The site is not a PWA and registers no service worker — this
 * exists so an installed shortcut carries the right name, colours and icon.
 * The PNGs are generated from src/app/icon.svg by `npm run icons`.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b0b0c',
    theme_color: '#0b0b0c',
    lang: 'en',
    dir: 'ltr',
    categories: ['business', 'education', 'productivity'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
