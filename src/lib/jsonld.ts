import { absoluteUrl, site, siteUrl } from '@/content/site';
import type { Service } from '@/content/services';
import { founder } from '@/content/team';
import type { Course } from '@/lib/content/courses';

/**
 * Structured data. Unconfirmed values are omitted entirely rather than emitted
 * empty — an `email: ""` in JSON-LD is a broken claim, and Google will flag a
 * LocalBusiness with a hollow address.
 *
 * Validate after filling in the TODOs: https://validator.schema.org/
 */

type Json = Record<string, unknown>;

/** Drop null/undefined/empty-array values so no hollow fields are published. */
function compact(input: Json): Json {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => {
      if (value === null || value === undefined) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    }),
  );
}

const ORGANIZATION_ID = `${siteUrl}/#organization`;
const WEBSITE_ID = `${siteUrl}/#website`;
const FOUNDER_ID = `${siteUrl}/about#founder`;

function postalAddress(): Json {
  return compact({
    '@type': 'PostalAddress',
    streetAddress: site.location.street,
    addressLocality: site.location.city,
    addressRegion: site.location.district,
    addressCountry: site.location.countryCode,
  });
}

function contactPoints(): Json[] {
  if (!site.contact.email && !site.contact.phone) return [];
  return [
    compact({
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.contact.email,
      telephone: site.contact.phone,
      areaServed: site.location.countryCode,
      availableLanguage: ['en'],
    }),
  ];
}

export function organizationJsonLd(): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: site.name,
    alternateName: site.shortName,
    url: siteUrl,
    description: site.description,
    slogan: site.tagline,
    foundingDate: String(site.founded),
    founder: { '@id': FOUNDER_ID },
    address: postalAddress(),
    email: site.contact.email,
    telephone: site.contact.phone,
    contactPoint: contactPoints(),
    sameAs: site.socials.map((social) => social.href),
    knowsAbout: [
      'Software engineering',
      'School ERP',
      'EdTech',
      'Embedded systems',
      'Internet of Things',
      'Computer vision',
      'Digital payments',
      'DevOps',
    ],
  });
}

export function webSiteJsonLd(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteUrl,
    name: site.name,
    description: site.description,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en',
  };
}

export function localBusinessJsonLd(): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#localbusiness`,
    name: site.name,
    url: siteUrl,
    description: site.description,
    parentOrganization: { '@id': ORGANIZATION_ID },
    address: postalAddress(),
    email: site.contact.email,
    telephone: site.contact.phone,
    hasMap: site.location.mapUrl,
    geo: site.location.geo
      ? {
          '@type': 'GeoCoordinates',
          latitude: site.location.geo.latitude,
          longitude: site.location.geo.longitude,
        }
      : null,
    areaServed: [
      { '@type': 'Country', name: 'Rwanda' },
      { '@type': 'Place', name: 'Remote' },
    ],
    // TODO: add openingHoursSpecification once business hours are confirmed.
  });
}

export function founderJsonLd(): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: founder.name,
    jobTitle: founder.role,
    description: founder.bio[0],
    worksFor: { '@id': ORGANIZATION_ID },
    url: absoluteUrl('/about'),
    image: founder.photo?.src ? absoluteUrl(founder.photo.src) : null,
    sameAs: founder.links.map((link) => link.href),
    knowsAbout: founder.focus,
  });
}

export function serviceJsonLd(service: Service): Json {
  return compact({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.title,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    serviceType: service.title,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: [
      { '@type': 'Country', name: 'Rwanda' },
      { '@type': 'Place', name: 'Remote' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} deliverables`,
      itemListElement: service.deliverables.map((deliverable) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: deliverable },
      })),
    },
  });
}

export function courseJsonLd(course: Course): Json {
  const url = absoluteUrl(`/academy/${course.slug}`);

  return compact({
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${url}#course`,
    name: course.title,
    courseCode: course.code,
    description: course.summary,
    url,
    inLanguage: 'en',
    educationalLevel: course.level,
    about: course.category,
    teaches: course.whatYouBuild,
    coursePrerequisites: course.prerequisites.length > 0 ? course.prerequisites : null,
    provider: { '@id': ORGANIZATION_ID },
    // Only emitted once a schedule is confirmed: Google requires
    // courseWorkload / startDate on a CourseInstance, and a half-filled
    // instance is worse than none.
    hasCourseInstance: course.schedule
      ? [
          compact({
            '@type': 'CourseInstance',
            courseMode: course.format,
            courseWorkload: course.duration,
            instructor: { '@id': FOUNDER_ID },
          }),
        ]
      : null,
    // TODO: add `offers` with price and priceCurrency once prices are set.
  });
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]): Json | null {
  const answered = items.filter((item) => item.answer.trim().length > 0);
  if (answered.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answered.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
