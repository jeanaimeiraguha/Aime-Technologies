import type { Metadata, Viewport } from 'next';
import { Kumbh_Sans, JetBrains_Mono } from 'next/font/google';
import type { ReactNode } from 'react';

import '@/app/globals.css';

import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SkipLink } from '@/components/layout/SkipLink';
import { ThemeScript } from '@/components/layout/ThemeScript';
import { JsonLd } from '@/components/ui/JsonLd';
import { localeTags } from '@/lib/i18n';
import { localBusinessJsonLd, organizationJsonLd, webSiteJsonLd } from '@/lib/jsonld';
import { rootMetadata } from '@/lib/metadata';

/**
 * One characterful sans and one monospace, self-hosted by next/font so there is
 * no third-party request and no layout shift from a late font swap.
 *
 * `swap`, not `optional`: the typeface is the identity of a typography-led
 * site, and `optional` means a first-time visitor on a slow connection never
 * sees it at all. It was measured both ways — `optional` improved FCP but left
 * LCP essentially unchanged, so it would have cost the brand for nothing.
 * `adjustFontFallback` (on by default) matches the fallback metrics, which is
 * why the swap costs no layout shift: CLS measures 0.001.
 */
const sans = Kumbh_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-kumbh',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Both themes are declared so the browser chrome matches the resolved theme.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#151327' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: ThemeScript sets data-theme on <html> before
    // React hydrates, which is a deliberate server/client difference.
    <html lang={localeTags.en} suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} min-h-dvh antialiased`}>
        {/* First element in the body so the theme is applied before paint. */}
        <ThemeScript />

        <SkipLink />
        <SiteHeader />

        {/*
          tabIndex={-1} so the skip link actually moves focus here. Without it
          a fragment jump to a non-focusable element leaves document.activeElement
          on <body> in Chrome, so the next Tab can land back in the header —
          exactly what the skip link exists to avoid. -1 keeps it out of the
          normal tab order.
        */}
        <main id="main" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>

        <SiteFooter />

        <JsonLd data={[organizationJsonLd(), webSiteJsonLd(), localBusinessJsonLd()]} />
      </body>
    </html>
  );
}
