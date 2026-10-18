import { bool, num, objArray, optStr, readCollection, str, strArray } from '@/lib/content/mdx';

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  /**
   * Delivery year, shown in mono on every row. Null until confirmed — a date
   * is a factual claim, so it is omitted rather than estimated.
   */
  year: string | null;
  category: string;
  summary: string;
  stack: string[];
  /**
   * A client name is only ever set from something confirmed in writing.
   * Null renders nothing — it does not render "Confidential", which is a claim
   * of its own.
   */
  client: string | null;
  role: string | null;
  screenshots: Screenshot[];
  links: { label: string; href: string }[];
  /**
   * True while the case study is a structural placeholder. Renders a visible
   * notice at the top of the page, and the entry is excluded from sitemap
   * priority and from JSON-LD.
   */
  placeholder: boolean;
  order: number;
  body: string;
}

function toScreenshots(data: Record<string, unknown>, where: string): Screenshot[] {
  return objArray(data, 'screenshots', where, { required: false }).map((shot, index) => ({
    src: str(shot, 'src', `${where} › screenshots[${index}]`),
    alt: str(shot, 'alt', `${where} › screenshots[${index}]`),
    caption: str(shot, 'caption', `${where} › screenshots[${index}]`),
  }));
}

function toLinks(
  data: Record<string, unknown>,
  where: string,
): { label: string; href: string }[] {
  return objArray(data, 'links', where, { required: false }).map((link, index) => ({
    label: str(link, 'label', `${where} › links[${index}]`),
    href: str(link, 'href', `${where} › links[${index}]`),
  }));
}

export function getAllCaseStudies(): CaseStudy[] {
  return readCollection('work')
    .map(({ slug, data, body }) => {
      const where = `work/${slug}.mdx`;
      return {
        slug,
        title: str(data, 'title', where),
        year: optStr(data, 'year'),
        category: str(data, 'category', where),
        summary: str(data, 'summary', where),
        stack: strArray(data, 'stack', where),
        client: optStr(data, 'client'),
        role: optStr(data, 'role'),
        screenshots: toScreenshots(data, where),
        links: toLinks(data, where),
        placeholder: bool(data, 'placeholder'),
        order: num(data, 'order', where),
        body,
      } satisfies CaseStudy;
    })
    .sort((a, b) => a.order - b.order);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((study) => study.slug === slug);
}

export function getCaseStudiesBySlugs(slugs: string[]): CaseStudy[] {
  const all = getAllCaseStudies();
  return slugs
    .map((slug) => all.find((study) => study.slug === slug))
    .filter((study): study is CaseStudy => study !== undefined);
}

/** Previous/next navigation, in the same order as /work. */
export function getCaseStudyNeighbours(slug: string): {
  previous: CaseStudy | null;
  next: CaseStudy | null;
} {
  const all = getAllCaseStudies();
  const index = all.findIndex((study) => study.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: all[index - 1] ?? null,
    next: all[index + 1] ?? null,
  };
}
