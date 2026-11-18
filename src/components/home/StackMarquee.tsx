import { Marquee } from '@/components/home/Marquee';
import { Container } from '@/components/ui/Container';
import { technologies } from '@/content/technologies';

const ITEMS = Array.from(new Set(technologies.flatMap((group) => group.items)));

/**
 * Trusted-by strip under the hero — partner-logo carousel shape from the
 * reference site, carrying the stack instead of logos we cannot use.
 */
export function StackMarquee() {
  return (
    <section
      className="border-hairline bg-surface border-b py-12"
      aria-labelledby="stack-heading"
    >
      <Container className="mb-7">
        <h2 id="stack-heading" className="section-label-text text-center">
          Built with
        </h2>
      </Container>

      <Marquee items={ITEMS} label="Technologies we build with" duration={50} />
    </section>
  );
}
