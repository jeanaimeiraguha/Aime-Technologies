import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { ContactLines } from '@/components/ui/ContactLines';
import { Container } from '@/components/ui/Container';
import { site } from '@/content/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container className="pt-20 pb-16 md:pt-24">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          {/* Brand — logo + tagline + social */}
          <div className="md:col-span-4" style={{ maxWidth: '270px' }}>
            <Link href="/" className="group mb-7 inline-flex items-center gap-2.5">
              <span className="relative block h-11 w-11 overflow-hidden rounded-md">
                <Image
                  src="/Totally Ink.png"
                  alt=""
                  width={1345}
                  height={1169}
                  sizes="44px"
                  className="h-11 w-auto transition-transform duration-500 group-hover:scale-105"
                />
              </span>
              <span className="font-display text-[1.125rem] leading-none font-bold text-white">
                {site.name}
              </span>
            </Link>
            <p className="text-[16px] leading-7 text-white/75">{site.tagline}</p>

            {site.socials.length > 0 && (
              <div className="mt-8 flex gap-2">
                {site.socials.map((social) => (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social"
                    aria-label={social.label}
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
            <ul className="flex flex-col gap-3.5">
              {site.footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="site-footer__link">
                    <ChevronRight
                      size={14}
                      strokeWidth={1.75}
                      className="text-accent shrink-0"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4 md:col-start-9">
            <h3 className="site-footer__heading">Contact Us</h3>
            <p className="mb-5 text-[16px] text-white/75">{site.location.short}</p>
            <ContactLines />
          </div>
        </div>
      </Container>

      {/* Oversized wordmark — decorative, sits behind the bottom bar. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden select-none"
      >
        <span className="font-display block translate-y-[30%] text-center text-[clamp(4.5rem,15vw,13rem)] leading-none font-bold tracking-tight text-white/[0.045]">
          {site.name}
        </span>
      </div>

      {/* Copyright bar */}
      <div className="site-footer__bottom relative z-10">
        <Container className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[15px] text-white/70">
            © All Copyright {year} by{' '}
            <span className="font-semibold text-white">{site.name}</span>
          </p>
          <p className="font-mono text-[13px] tracking-wide text-white/55 uppercase">
            Kigali, Rwanda
          </p>
        </Container>
      </div>
    </footer>
  );
}
