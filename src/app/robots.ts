import type { MetadataRoute } from 'next';

import { absoluteUrl, siteUrl } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Unreviewed legal drafts. These are also noindex at page level.
        disallow: ['/privacy', '/terms'],
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: siteUrl,
  };
}
