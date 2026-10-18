const isDev = process.env.NODE_ENV === 'development';

/**
 * Content-Security-Policy.
 *
 * `script-src` allows inline scripts, which deserves an explanation because it
 * is the one directive here that is not maximally strict.
 *
 * Next.js serves the React Server Component payload as a series of inline
 * `self.__next_f.push(...)` scripts. Their contents differ per page and change
 * with every build, so a static hash allowlist cannot cover them — an earlier
 * revision of this file hashed only our own theme script, and the result was
 * that the browser blocked Next's bootstrap scripts and the whole site shipped
 * without hydration: dead theme toggle, dead mobile menu, dead course filter,
 * dead forms, and no error anywhere except the browser console.
 *
 * The alternative is a per-request nonce from middleware. That works, and it
 * forces every page into dynamic rendering, which this site specifically does
 * not want: all 67 pages are prerendered and served as static files.
 *
 * So the trade-off taken is `'unsafe-inline'` for scripts, with everything else
 * locked down: no `unsafe-eval` in production, no external script origins,
 * `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`. The XSS
 * surface this leaves is small by construction — the site has no database, no
 * user-generated content, and the single value read from the URL (`?type=` on
 * /contact) is matched against a fixed list before use.
 *
 * If a nonce is ever wanted, add middleware that generates one per request and
 * sets this header there, and accept the loss of static rendering.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-eval' is dev-only, for React Fast Refresh.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  // Next injects inline <style> for critical CSS; fonts are self-hosted by next/font.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  // Forms POST to a configurable third-party endpoint (Formspree / Getform).
  "connect-src 'self' https:",
  "form-action 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * Hides the floating "N" badge that `next dev` draws in the corner. It was
   * only ever a development overlay and never shipped in a production build,
   * but it sits on top of the page while working and gets in the way of
   * judging the design. Compile and runtime errors are still surfaced.
   */
  devIndicators: false,
  /**
   * Standalone output is only wanted for the Docker image, where it produces a
   * self-contained server with a trimmed node_modules. Vercel does not want it,
   * so it is opt-in via BUILD_STANDALONE=true (set in the Dockerfile).
   */
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
  // MDX is read from disk by src/lib/content/*, never routed, so .mdx is not a page extension.
  pageExtensions: ['ts', 'tsx'],
  // Keep the MDX sources in the standalone bundle used by the Docker image.
  outputFileTracingIncludes: {
    '/**': ['./src/content/**/*.mdx'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          { key: 'Content-Security-Policy', value: contentSecurityPolicy },
          // Only meaningful over HTTPS; harmless on a plain-HTTP local run.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
