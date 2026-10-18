import Link from 'next/link';

import { ContactLines } from '@/components/ui/ContactLines';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { site } from '@/content/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-hairline border-t">
      <Container className="py-16 md:py-20">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-medium tracking-[-0.01em]">{site.name}</p>
            <p className="text-muted mt-3 max-w-[32ch]">{site.tagline}</p>
          </div>

          <div className="md:col-span-4 md:col-start-6">
            <SectionLabel>Contact</SectionLabel>
            <ContactLines className="mt-5" />

            {site.socials.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {site.socials.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap text-meta text-muted decoration-hairline-strong hover:text-accent hover:decoration-accent underline underline-offset-[5px]"
                    >
                      {social.label}
                      <span aria-hidden="true">{' '}↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-10">
            <SectionLabel>Site</SectionLabel>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {site.footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="tap text-muted hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-hairline text-meta text-faint mt-14 flex flex-col gap-3 border-t pt-6 font-mono sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          {/* The one emoji on the site. */}
          <p>Built in Rwanda 🇷🇼</p>
        </div>
      </Container>
    </footer>
  );
}
