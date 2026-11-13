import type { Metadata } from 'next';

import { absoluteUrl, site, siteUrl } from '@/content/site';
import { localeTags } from '@/lib/i18n';

/**
 * One place that builds page metadata, so canonical URLs, Open Graph and
 * Twitter cards cannot drift apart between pages.
 *
 * OG images are generated: each route with an `opengraph-image.tsx` gets its
 * own, and Next rewrites the `openGraph.images` entry automatically. Pages
 * without one inherit the root image.
 */

interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/services/embedded-systems-iot". */
  path: string;
  /** Set for article-like pages (case studies). */
  type?: 'website' | 'article';
  /** Keep a page out of search results — used on nothing today. */
  noindex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  type = 'website',
  noindex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: localeTags.en,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Root metadata. Child pages override title and description. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Web, mobile, AI, cloud, data, security & embedded engineering`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  generator: undefined,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    'software development Rwanda',
    'web development Kigali',
    'mobile app development Rwanda',
    'AI and machine learning Rwanda',
    'cloud computing Rwanda',
    'DevOps and CI/CD',
    'cybersecurity Rwanda',
    'UI UX design Kigali',
    'API development',
    'database design',
    'embedded systems Rwanda',
    'IoT Rwanda',
    'robotics and automation',
    'data science analytics',
    'blockchain development',
    'network engineering',
    'system architecture',
    'business process automation',
    'IT consulting Rwanda',
    'software engineering training Rwanda',
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Web, mobile, AI, cloud, data, security & embedded engineering`,
    description: site.description,
    locale: localeTags.en,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Web, mobile, AI, cloud, data, security & embedded engineering`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  referrer: 'strict-origin-when-cross-origin',
};
