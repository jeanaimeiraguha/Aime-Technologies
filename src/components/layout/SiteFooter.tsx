import Image from 'next/image';
import Link from 'next/link';

import { ContactLines } from '@/components/ui/ContactLines';
import { Container } from '@/components/ui/Container';
import { site } from '@/content/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          {/* Brand — logo + tagline + social */}
          <div className="md:col-span-4" style={{ maxWidth: '270px' }}>
            <Link href="/" className="mb-8 inline-flex items-center gap-2.5">
              <Image
                src="/Totally Ink.png"
                alt=""
                width={1345}
                height={1169}
                sizes="44px"
                className="h-10 w-auto"
              />
              <span className="text-[1.0625rem] leading-none font-bold text-white">
                {site.name}
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', lineHeight: '28px' }}>
              {site.tagline}
            </p>

            {site.socials.length > 0 && (
              <div className="mt-8 flex gap-2">
                {site.socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social"
                  >
                    {social.label[0]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 md:col-start-6">
            <h3 className="site-footer__heading">Quick Links</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {site.footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer__link">
                    <span style={{ fontSize: '12px' }} aria-hidden="true">
                      ››
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 md:col-start-9">
            <h3 className="site-footer__heading">Contact Us</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '20px' }}>
              {site.location.short}
            </p>
            <ContactLines />
          </div>
        </div>
      </Container>

      {/* Copyright bar */}
      <div className="site-footer__bottom">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>
            © All Copyright {year} by{' '}
            <span style={{ color: '#ffffff', fontWeight: 600 }}>{site.name}</span>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px' }}>Kigali, Rwanda</p>
        </Container>
      </div>
    </footer>
  );
}
