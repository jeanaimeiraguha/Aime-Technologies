import { Section } from '@/components/ui/Section';
import { testimonials } from '@/content/testimonials';

/**
 * Renders nothing until there are real, attributed, consented quotes in
 * src/content/testimonials.ts. Placed on the Academy page and inert there
 * today — the markup exists so adding the first genuine quote is a content
 * change, not a build.
 */
export function Testimonials({ label = 'What students say' }: { label?: string }) {
  if (testimonials.length === 0) return null;

  return (
    <Section label={label} title="In their words.">
      <ul className="divide-hairline border-hairline divide-y border-y">
        {testimonials.map((testimonial) => (
          <li key={`${testimonial.name}-${testimonial.context}`} className="py-8">
            <figure className="grid gap-x-8 gap-y-4 md:grid-cols-12">
              <blockquote className="md:col-span-7">
                <p className="text-lead max-w-[58ch]">“{testimonial.quote}”</p>
              </blockquote>
              <figcaption className="text-meta text-muted font-mono md:col-span-4 md:col-start-9">
                <span className="text-ink block">{testimonial.name}</span>
                <span className="block">{testimonial.role}</span>
                <span className="text-faint mt-1 block">{testimonial.context}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
