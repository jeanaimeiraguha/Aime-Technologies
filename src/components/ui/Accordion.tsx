'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

/**
 * One-open-at-a-time accordion. Buttons carry aria-expanded and aria-controls;
 * a `#hash` matching an item id opens it on load and on hashchange, so FAQ
 * groups stay linkable.
 */
export function Accordion({
  items,
  className,
  id: groupId,
}: {
  items: {
    id: string;
    title: React.ReactNode;
    body: React.ReactNode;
  }[];
  className?: string;
  /** Prefix for generated button/panel ids, e.g. "faq-services". */
  id?: string;
}) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const rootRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);
  const idsKey = items.map((item) => item.id).join('|');

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const match = itemsRef.current.find((item) => item.id === hash);
      if (match) {
        setOpen(match.id);
        requestAnimationFrame(() => {
          rootRef.current
            ?.querySelector(`[data-item="${CSS.escape(hash)}"]`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [idsKey]);

  return (
    <div ref={rootRef} className={cn('border-hairline border-y', className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${groupId ?? 'acc'}-btn-${item.id}`;
        const panelId = `${groupId ?? 'acc'}-panel-${item.id}`;
        return (
          <div
            key={item.id}
            data-item={item.id}
            className="border-hairline border-b last:border-b-0"
          >
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="text-ink hover:text-accent flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-medium transition-colors"
              >
                {item.title}
                <ChevronDown
                  size={18}
                  strokeWidth={1.75}
                  className={cn(
                    'text-faint shrink-0 transition-transform duration-300',
                    isOpen && 'text-accent rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="accordion-panel"
              data-open={isOpen}
            >
              <div className="accordion-inner">
                <div className="text-muted max-w-[68ch] pr-8 pb-6">{item.body}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
