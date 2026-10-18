import type { Metadata } from 'next';

import { Container } from '@/components/ui/Container';
import { TextLink } from '@/components/ui/TextLink';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

/**
 * 404, in the same voice as the rest of the site: state what happened, then be
 * useful. Styled as a terminal line because that is the site's one recurring
 * device, not because 404 pages are expected to be clever.
 */
export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <p className="text-meta text-muted font-mono tracking-[0.04em]">404 — Not found</p>

      <h1 className="text-hero mt-7 max-w-[24ch]">This page does not exist.</h1>

      <p className="text-lead text-muted mt-7 max-w-[52ch]">
        Either the address is wrong, or something we published has moved. Neither is your fault.
      </p>

      <pre className="border-hairline bg-sunken text-meta mt-10 max-w-[32rem] overflow-x-auto rounded-sm border px-5 py-4 font-mono leading-[1.9]">
        <code>
          <span className="text-faint">$ </span>
          <span className="text-ink">find . -name &quot;that-page&quot;</span>
          {'\n'}
          <span className="text-muted">find: no matches</span>
        </code>
      </pre>

      <nav aria-label="Useful pages" className="border-hairline mt-12 border-t pt-8">
        <p className="text-meta text-muted font-mono tracking-[0.06em] uppercase">
          Try instead
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-3">
          <li>
            <TextLink href="/">Home</TextLink>
          </li>
          {site.nav.map((item) => (
            <li key={item.href}>
              <TextLink href={item.href}>{item.label}</TextLink>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
