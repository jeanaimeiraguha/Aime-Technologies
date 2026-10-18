import type { MetadataRoute } from 'next';

import { serviceSlugs } from '@/content/services';
import { absoluteUrl } from '@/content/site';
import { getAllCourses } from '@/lib/content/courses';
import { getAllCaseStudies } from '@/lib/content/work';

/**
 * Sitemap.
 *
 * /privacy and /terms are left out while they are unreviewed drafts, as are
 * case studies still marked `placeholder: true`. Both are also noindex — the
 * sitemap and the robots directives have to agree, or Search Console reports
 * the contradiction.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: 'weekly' | 'monthly';
  }[] = [
    { path: '/', priority: 1, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/academy', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/work', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/faq', priority: 0.6, changeFrequency: 'monthly' },
  ];

  const servicePages = serviceSlugs.map((slug) => ({
    path: `/services/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly' as const,
  }));

  const coursePages = getAllCourses().map((course) => ({
    path: `/academy/${course.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }));

  const workPages = getAllCaseStudies()
    .filter((study) => !study.placeholder)
    .map((study) => ({
      path: `/work/${study.slug}`,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    }));

  return [...staticPages, ...servicePages, ...coursePages, ...workPages].map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
