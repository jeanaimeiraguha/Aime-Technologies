'use client';

import { useMemo, useState } from 'react';

import type { StoredCompetencyLevel } from '@/lib/academy/store';
import { cn } from '@/lib/cn';

/**
 * TVET competency catalogue: level tabs, multi-select rows, view + download.
 * Level 5 learning areas have no code/credits — those cells stay empty rather
 * than inventing values. Documents without a path show an explicit unavailable
 * state instead of a dead link.
 */
export function CompetencyCatalogue({
  levels,
  selectable = false,
  selected = [],
  onSelectionChange,
  showActions = true,
}: {
  levels: StoredCompetencyLevel[];
  selectable?: boolean;
  selected?: string[];
  onSelectionChange?: (ids: string[]) => void;
  showActions?: boolean;
}) {
  const [activeLevel, setActiveLevel] = useState(levels[0]?.id ?? '3');
  const [viewing, setViewing] = useState<{ id: string; title: string; body: string } | null>(null);

  const level = useMemo(
    () => levels.find((l) => l.id === activeLevel) ?? levels[0],
    [levels, activeLevel],
  );

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  function toggle(id: string) {
    if (!selectable || !onSelectionChange) return;
    const next = new Set(selectedSet);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange([...next]);
  }

  function selectAll() {
    if (!selectable || !onSelectionChange || !level) return;
    onSelectionChange(level.competencies.map((c) => c.id));
  }

  function clearSelection() {
    if (!selectable || !onSelectionChange) return;
    onSelectionChange([]);
  }

  if (!level) return null;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-2" role="tablist" aria-label="TVET level">
        {levels.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === activeLevel}
            onClick={() => setActiveLevel(item.id)}
            className={cn(
              'tap text-meta hover:text-accent rounded-xs border px-4 py-2 font-mono tracking-[0.06em] uppercase',
              item.id === activeLevel
                ? 'border-accent bg-accent-wash text-ink'
                : 'border-hairline-strong text-muted bg-surface',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl">{level.title}</h3>
          {level.isLearningAreas && (
            <p className="text-meta text-faint mt-1 font-mono">
              Learning areas — no competency codes or credits published for Level 5.
            </p>
          )}
        </div>
        {selectable && (
          <div className="flex gap-4">
            <button type="button" onClick={selectAll} className="tap text-meta text-accent underline underline-offset-4">
              Select all
            </button>
            <button type="button" onClick={clearSelection} className="tap text-meta text-muted underline underline-offset-4">
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="border-hairline overflow-x-auto rounded-sm border">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead className="bg-surface">
            <tr className="text-meta text-faint font-mono tracking-[0.06em] uppercase">
              {selectable && <th className="border-hairline border-b px-4 py-3">Select</th>}
              <th className="border-hairline border-b px-4 py-3">Code</th>
              <th className="border-hairline border-b px-4 py-3">Competency</th>
              {!level.isLearningAreas && (
                <th className="border-hairline border-b px-4 py-3 text-right">Credits</th>
              )}
              {showActions && (
                <th className="border-hairline border-b px-4 py-3 text-right">Learning document</th>
              )}
            </tr>
          </thead>
          <tbody>
            {level.competencies.map((c) => {
              const isSelected = selectedSet.has(c.id);
              return (
                <tr
                  key={c.id}
                  className={cn(
                    'hover:bg-surface cursor-pointer',
                    isSelected && 'bg-accent-wash',
                  )}
                  onClick={() => selectable && toggle(c.id)}
                >
                  {selectable && (
                    <td className="border-hairline border-b px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggle(c.id)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select ${c.name}`}
                        className="accent-accent h-4 w-4"
                      />
                    </td>
                  )}
                  <td className="border-hairline text-meta border-b px-4 py-3 font-mono whitespace-nowrap">
                    {c.code ?? <span className="text-faint">—</span>}
                  </td>
                  <td className="border-hairline border-b px-4 py-3">{c.name}</td>
                  {!level.isLearningAreas && (
                    <td className="border-hairline text-meta border-b px-4 py-3 text-right font-mono">
                      {c.credits ?? <span className="text-faint">—</span>}
                    </td>
                  )}
                  {showActions && (
                    <td className="border-hairline border-b px-4 py-3 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          className="tap text-meta text-accent underline underline-offset-4"
                          onClick={(e) => {
                            e.stopPropagation();
                            setViewing({
                              id: c.id,
                              title: c.name,
                              body: c.documentPath
                                ? `Document available to staff. Reference: ${c.documentPath}`
                                : 'No learning document is published for this competency yet. Course notes are shared during enrolment.',
                            });
                          }}
                        >
                          View
                        </button>
                        {c.documentPath ? (
                          <a
                            href={c.documentPath}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="tap text-meta text-accent underline underline-offset-4"
                          >
                            Download
                          </a>
                        ) : (
                          <span className="text-meta text-faint" title="No document published yet">
                            Download unavailable
                          </span>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectable && (
        <p className="text-meta text-faint mt-3 font-mono">
          {selected.length} selected
        </p>
      )}

      {viewing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="competency-view-title"
          className="bg-ink/40 fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setViewing(null)}
        >
          <div
            className="bg-surface border-hairline max-w-lg rounded-sm border p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p id="competency-view-title" className="text-meta text-faint font-mono tracking-[0.06em] uppercase">
              Competency
            </p>
            <h4 className="mt-2 text-xl">{viewing.title}</h4>
            <p className="text-muted mt-4 leading-relaxed">{viewing.body}</p>
            <button
              type="button"
              className="btn-primary mt-6"
              onClick={() => setViewing(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
