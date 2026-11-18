import { ArrowDown } from 'lucide-react';

import { AfricaRobotMap } from '@/components/home/AfricaRobotMap';
import { HeroSlider } from '@/components/home/HeroSlider';
import { Container } from '@/components/ui/Container';

/**
 * Light marketing hero (web3mates shape): soft brand-tinted plate, the
 * Africa-and-robot graphic as the background piece, two slow orbs, the
 * headline carousel, and a scroll cue. Impact numbers live in StatsRow.
 */
export function Hero() {
  return (
    <section
      className="hero-plate relative isolate overflow-hidden"
      style={{ background: 'var(--hero-plate)' }}
    >
      {/* Texture layer 1 — the dot grid. */}
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      {/* Background graphic — full Africa map + robot, right side, never clipped. */}
      <div className="africa-map-wrap pointer-events-none absolute inset-0" aria-hidden="true">
        <AfricaRobotMap />
      </div>

      {/* Depth — two slow orbs, deliberately off-centre. */}
      <div
        className="hero-orb -top-32 -left-24 h-[420px] w-[420px]"
        style={{
          background: 'radial-gradient(circle, rgba(90,169,221,0.35), transparent 65%)',
        }}
        aria-hidden="true"
      />
      <div
        className="hero-orb top-1/3 -right-24 h-[380px] w-[380px]"
        style={{
          background: 'radial-gradient(circle, rgba(5,65,99,0.22), transparent 68%)',
          animationDelay: '-7s',
        }}
        aria-hidden="true"
      />

      {/* Soft fade only under the copy column — map stays fully visible. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-32 md:w-1/2"
        style={{ background: 'linear-gradient(to top, var(--hero-fade), transparent)' }}
        aria-hidden="true"
      />

      <Container className="hero-copy relative z-10">
        <HeroSlider />

        <a
          href="#services"
          className="scroll-cue text-faint mt-16 inline-flex items-center gap-3 text-[0.8125rem] font-semibold tracking-[0.16em] uppercase"
        >
          <span className="border-hairline-strong flex h-10 w-10 items-center justify-center rounded-full border">
            <ArrowDown size={16} aria-hidden="true" />
          </span>
          Scroll
        </a>
      </Container>
    </section>
  );
}
