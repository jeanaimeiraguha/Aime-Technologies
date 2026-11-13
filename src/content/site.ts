/**
 * Brand, contacts, socials and navigation.
 *
 * Anything not yet confirmed is `null` with a `TODO:` note rather than a
 * plausible-looking placeholder. Components skip null values or render a
 * visible TODO marker, so nothing fictional can reach the published site.
 * Every null in this file appears in the checklist at the end of README.md.
 */

export type Pending<T> = T | null;

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Totally Ink',
  shortName: 'Totally Ink',
  /** Used in the "TI" monogram favicon and manifest. */
  monogram: 'TI',
  tagline: 'Turning ideas into real products, and real problems into working solutions.',
  motto: "Build it. Test it. Break it. Fix it. Ship it. That's the game.",
  description:
    'Totally Ink delivers web and mobile development, AI and machine learning, embedded systems and IoT, cloud, data, security and automation, and teaches engineering through the Totally Ink Academy. Based in Bugesera, Kigali, Rwanda.',

  founded: 2024, // TODO: confirm the year the company started operating.

  location: {
    /** Short form, used in the hero mono line and the footer. Confirmed. */
    short: 'Bugesera, Kigali, Rwanda',
    /**
     * Deliberately none. The location is given at district level and that is
     * the whole address — it is not a missing value. Setting a street here
     * makes it appear in the footer, on /contact and in the LocalBusiness
     * structured data.
     */
    street: null as Pending<string>,
    sector: null as Pending<string>,
    district: 'Bugesera',
    city: 'Kigali',
    country: 'Rwanda',
    countryCode: 'RW',
    timeZone: 'Africa/Kigali',
    /** TODO: confirm coordinates for LocalBusiness structured data and maps. */
    geo: null as Pending<{ latitude: number; longitude: number }>,
    mapUrl: null as Pending<string>,
  },

  contact: {
    /**
     * TODO (optional): a domain address such as hello@totallyink... reads more
     * established on a company site than a personal Gmail one, and costs
     * nothing once the domain is registered. Not blocking — this address works.
     */
    email: 'jeanaimeiraguha@gmail.com' as Pending<string>,
    phone: '+250 793 411 594' as Pending<string>,
    /**
     * Digits only, no "+" or spaces — used to build wa.me links.
     * ASSUMED to be the same line as `phone`. Change it if WhatsApp is on a
     * different number, or set it to null to hide every click-to-chat link.
     */
    whatsapp: '250793411594' as Pending<string>,
    /** TODO: confirm, e.g. "Within one business day". */
    responseTime: null as Pending<string>,
  },

  /** TODO: add real profiles. Anything left out simply does not render. */
  socials: [] as SocialLink[],

  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Academy', href: '/academy' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],

  footerLinks: [
    { label: 'Services', href: '/services' },
    { label: 'Academy', href: '/academy' },
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],

  /** Collaboration interests, shown on /about. */
  openTo: [
    'Software Engineering',
    'Full-Stack Development',
    'EdTech',
    'ERP',
    'AI/ML',
    'Embedded & IoT',
    'Technical Product Development',
    'Remote Collaboration',
  ],
} as const;

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in the environment to override;
 * the fallback below is the confirmed domain, used when it is unset.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://totallyink.rw').replace(
  /\/$/,
  '',
);

export function absoluteUrl(path = '/'): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Click-to-chat URL, or null when the number has not been confirmed yet. */
export function whatsappUrl(message?: string): string | null {
  const number = site.contact.whatsapp;
  if (!number) return null;
  const query = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${query}`;
}

export const mailtoUrl = site.contact.email ? `mailto:${site.contact.email}` : null;

export const telUrl = site.contact.phone
  ? `tel:${site.contact.phone.replace(/[^+\d]/g, '')}`
  : null;
