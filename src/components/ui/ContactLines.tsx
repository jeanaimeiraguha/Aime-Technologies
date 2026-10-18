import { mailtoUrl, site, telUrl, whatsappUrl } from '@/content/site';
import { cn } from '@/lib/cn';

/**
 * The contact block, shared by the footer and /contact so the two can never
 * disagree.
 *
 * A value that is not set simply does not render. It is not labelled, and it is
 * not replaced with filler — an absent line says nothing, which is correct,
 * whereas a placeholder either leaks an unfinished site to visitors or states
 * something untrue. What still needs filling in is tracked in the README
 * checklist, which is the right place for it.
 */
const LINK =
  'tap text-ink decoration-hairline-strong hover:text-accent hover:decoration-accent underline underline-offset-[5px]';

export function ContactLines({
  className,
  showAddress = true,
}: {
  className?: string;
  showAddress?: boolean;
}) {
  const whatsapp = whatsappUrl(`Hello ${site.name}, I would like to discuss a project.`);

  return (
    <ul className={cn('space-y-2 pointer-coarse:space-y-0', className)}>
      {showAddress && (
        <li className="text-muted">
          {site.location.street && (
            <>
              {site.location.street}
              <br />
            </>
          )}
          {site.location.short}
        </li>
      )}

      {mailtoUrl && (
        <li>
          <a href={mailtoUrl} className={LINK}>
            {site.contact.email}
          </a>
        </li>
      )}

      {telUrl && (
        <li>
          <a href={telUrl} className={LINK}>
            {site.contact.phone}
          </a>
        </li>
      )}

      {whatsapp && (
        <li>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={LINK}>
            WhatsApp
            <span aria-hidden="true">{' '}↗</span>
          </a>
        </li>
      )}
    </ul>
  );
}
