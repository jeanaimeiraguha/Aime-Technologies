'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import type {
  AcademyApplication,
  ApplicationListRow,
  ApplicationStatus,
} from '@/lib/academy/types';

/**
 * Admin dashboard: token-gated list, search, filter, detail, status updates,
 * document download, email retry, and competency catalogue management.
 */

type Tab = 'applications' | 'competencies';

const STATUS_OPTIONS: { value: ApplicationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'new', label: 'New' },
  { value: 'in_review', label: 'In review' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
  { value: 'waitlist', label: 'Waitlist' },
];

interface StoredCompetency {
  id: string;
  level: '3' | '4' | '5';
  code: string | null;
  name: string;
  credits: number | null;
  documentPath: string | null;
  published: boolean;
}

interface StoredLevel {
  id: '3' | '4' | '5';
  label: string;
  title: string;
  isLearningAreas: boolean;
  competencies: StoredCompetency[];
}

function tokenHeaders(token: string): HeadersInit {
  return { 'x-admin-token': token, 'Content-Type': 'application/json' };
}

export function AdminDashboard({ initialToken = '' }: { initialToken?: string }) {
  const [token, setToken] = useState(initialToken);
  const [tokenInput, setTokenInput] = useState(initialToken);
  const [authError, setAuthError] = useState('');
  const [tab, setTab] = useState<Tab>('applications');

  const [rows, setRows] = useState<ApplicationListRow[]>([]);
  const [status, setStatus] = useState<ApplicationStatus | 'all'>('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [listError, setListError] = useState('');

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<AcademyApplication | null>(null);
  const [detailError, setDetailError] = useState('');
  const [busy, setBusy] = useState(false);

  const [catalogue, setCatalogue] = useState<StoredLevel[]>([]);
  const [catalogueError, setCatalogueError] = useState('');

  const loadList = useCallback(async () => {
    if (!token) return;
    // Yield first so any caller in an effect never setStates synchronously.
    await Promise.resolve();
    try {
      const params = new URLSearchParams({ status, q: query });
      const res = await fetch(`/api/academy/applications?${params}`, {
        headers: tokenHeaders(token),
      });
      if (res.status === 401) {
        setAuthError('Invalid token.');
        setToken('');
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { applications: ApplicationListRow[] };
      setRows(data.applications);
      setListError('');
    } catch {
      setListError('Could not load applications.');
    } finally {
      setLoading(false);
    }
  }, [token, status, query]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      await Promise.resolve();
      if (cancelled || !token) return;
      setLoading(true);
      await loadList();
    })();
    return () => {
      cancelled = true;
    };
  }, [loadList, token]);

  useEffect(() => {
    if (tab !== 'competencies' || !token) return;
    let cancelled = false;
    void (async () => {
      await Promise.resolve();
      if (cancelled) return;
      try {
        const res = await fetch('/api/academy/competencies', { headers: tokenHeaders(token) });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { catalogue: StoredLevel[] };
        if (!cancelled) {
          setCatalogue(data.catalogue);
          setCatalogueError('');
        }
      } catch {
        if (!cancelled) setCatalogueError('Could not load competency catalogue.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [tab, token]);

  useEffect(() => {
    if (!selectedId || !token) return;
    let cancelled = false;
    void (async () => {
      await Promise.resolve();
      if (cancelled) return;
      try {
        const res = await fetch(`/api/academy/applications/${selectedId}`, {
          headers: tokenHeaders(token),
        });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { application: AcademyApplication };
        if (!cancelled) {
          setDetail(data.application);
          setDetailError('');
        }
      } catch {
        if (!cancelled) setDetailError('Could not load application.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedId, token]);

  const documentLinks = useMemo(() => {
    if (!detail) return [];
    return detail.documents.map(
      (doc) =>
        `/api/academy/applications/${detail.id}/documents/${encodeURIComponent(doc.name)}?token=${encodeURIComponent(token)}`,
    );
  }, [detail, token]);

  async function patchDetail(body: Record<string, unknown>) {
    if (!detail) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/academy/applications/${detail.id}`, {
        method: 'PATCH',
        headers: tokenHeaders(token),
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { application: AcademyApplication };
      setDetail(data.application);
      await loadList();
    } catch {
      setDetailError('Update failed.');
    } finally {
      setBusy(false);
    }
  }

  async function togglePublish(levelId: string, competencyId: string, published: boolean) {
    setBusy(true);
    try {
      const res = await fetch('/api/academy/competencies', {
        method: 'PATCH',
        headers: tokenHeaders(token),
        body: JSON.stringify({ levelId, competencyId, patch: { published } }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { catalogue: StoredLevel[] };
      setCatalogue(data.catalogue);
    } catch {
      setCatalogueError('Update failed.');
    } finally {
      setBusy(false);
    }
  }

  if (!token) {
    return (
      <form
        className="border-hairline bg-surface max-w-md rounded-sm border p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setToken(tokenInput.trim());
          setAuthError('');
        }}
      >
        <label className="block">
          <span className="text-meta text-muted mb-2 block font-mono uppercase">
            Admin token
          </span>
          <input
            type="password"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            autoComplete="current-password"
            className="border-hairline-strong focus:border-accent bg-surface w-full min-h-11 rounded-xs border px-3.5 py-2.5"
          />
        </label>
        {authError && (
          <p className="text-meta text-accent mt-2 font-mono" role="alert">
            {authError}
          </p>
        )}
        <p className="text-meta text-faint mt-3 font-mono">
          Set ADMIN_TOKEN in the environment. Token is sent only to same-origin API routes.
        </p>
        <button type="submit" className="btn-primary mt-4">
          Unlock dashboard
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Admin sections">
        {(
          [
            ['applications', 'Applications'],
            ['competencies', 'TVET competencies'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={
              tab === id
                ? 'tap text-meta border-accent bg-accent-wash text-ink rounded-xs border px-4 py-2 font-mono uppercase'
                : 'tap text-meta border-hairline-strong text-muted bg-surface rounded-xs border px-4 py-2 font-mono uppercase'
            }
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className="tap text-meta text-muted ml-auto underline"
          onClick={() => {
            setToken('');
            setTokenInput('');
            setSelectedId(null);
            setDetail(null);
          }}
        >
          Lock
        </button>
      </div>

      {tab === 'applications' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-end gap-4">
            <label className="block">
              <span className="text-meta text-faint mb-1 block font-mono uppercase">Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as ApplicationStatus | 'all')}
                className="border-hairline-strong bg-surface rounded-xs border px-3 py-2 text-sm"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block min-w-[220px] flex-1">
              <span className="text-meta text-faint mb-1 block font-mono uppercase">Search</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name, email, reference…"
                className="border-hairline-strong focus:border-accent bg-surface w-full rounded-xs border px-3 py-2 text-sm"
              />
            </label>
          </div>

          {listError && (
            <p className="text-meta text-accent font-mono" role="alert">
              {listError}
            </p>
          )}

          <div className="border-hairline overflow-x-auto rounded-sm border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-surface">
                <tr className="text-meta text-faint font-mono uppercase">
                  <th className="border-hairline border-b px-4 py-3">Ref</th>
                  <th className="border-hairline border-b px-4 py-3">Applicant</th>
                  <th className="border-hairline border-b px-4 py-3">Program</th>
                  <th className="border-hairline border-b px-4 py-3">Status</th>
                  <th className="border-hairline border-b px-4 py-3">Email</th>
                  <th className="border-hairline border-b px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-muted">
                      Loading…
                    </td>
                  </tr>
                )}
                {!loading && rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-muted">
                      No applications match.
                    </td>
                  </tr>
                )}
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-surface cursor-pointer"
                    onClick={() => setSelectedId(row.id)}
                  >
                    <td className="border-hairline text-meta border-b px-4 py-3 font-mono">
                      {row.id}
                    </td>
                    <td className="border-hairline border-b px-4 py-3">
                      <div>{row.fullName}</div>
                      <div className="text-meta text-faint">{row.email}</div>
                    </td>
                    <td className="border-hairline text-meta border-b px-4 py-3 font-mono uppercase">
                      {row.programType}
                    </td>
                    <td className="border-hairline border-b px-4 py-3">{row.status}</td>
                    <td className="border-hairline text-meta border-b px-4 py-3 font-mono">
                      {row.companyEmail} / {row.applicantEmail}
                    </td>
                    <td className="border-hairline text-meta text-faint border-b px-4 py-3 font-mono">
                      {row.createdAt.slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedId && (
            <div className="border-hairline bg-surface rounded-sm border p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-meta text-faint font-mono uppercase">Application</p>
                  <h3 className="mt-1 text-2xl">{selectedId}</h3>
                </div>
                <button
                  type="button"
                  className="tap text-meta text-muted underline"
                  onClick={() => {
                    setSelectedId(null);
                    setDetail(null);
                  }}
                >
                  Close
                </button>
              </div>

              {detailError && (
                <p className="text-meta text-accent mt-4 font-mono" role="alert">
                  {detailError}
                </p>
              )}

              {detail && (
                <div className="mt-6 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="text-meta text-faint font-mono uppercase">
                      Status
                      <select
                        value={detail.status}
                        disabled={busy}
                        onChange={(e) => void patchDetail({ status: e.target.value })}
                        className="border-hairline-strong bg-surface ml-2 rounded-xs border px-2 py-1.5 text-sm normal-case tracking-normal text-ink"
                      >
                        {STATUS_OPTIONS.filter((s) => s.value !== 'all').map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void patchDetail({ retryEmails: true })}
                      className="tap text-meta text-accent underline underline-offset-4"
                    >
                      Retry failed emails
                    </button>
                  </div>

                  <dl className="grid gap-4 sm:grid-cols-2">
                    {[
                      ['Name', `${detail.firstName} ${detail.lastName}`],
                      ['Email', detail.email],
                      ['Phone', detail.phone || '—'],
                      ['Organisation', detail.organization || '—'],
                      ['Category', detail.educationCategory],
                      ['Program', detail.programType],
                      detail.tvetLevel ? ['TVET level', `Level ${detail.tvetLevel}`] : null,
                      detail.secondaryLevel
                        ? ['Secondary', `${detail.secondaryLevel} · ${detail.secondaryCombination}`]
                        : null,
                      ['Company email', detail.companyEmail.status],
                      ['Applicant email', detail.applicantEmail.status],
                    ]
                      .filter((r): r is [string, string] => Boolean(r))
                      .map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-meta text-faint font-mono uppercase">{k}</dt>
                          <dd className="text-sm">{v}</dd>
                        </div>
                      ))}
                  </dl>

                  <div>
                    <p className="text-meta text-faint font-mono uppercase">Motivation</p>
                    <p className="text-muted mt-1 whitespace-pre-wrap text-sm leading-relaxed">
                      {detail.motivation}
                    </p>
                  </div>

                  {detail.selectedCompetencies.length > 0 && (
                    <div>
                      <p className="text-meta text-faint font-mono uppercase">
                        Selected competencies
                      </p>
                      <ul className="mt-1 space-y-1 text-sm">
                        {detail.selectedCompetencies.map((c) => (
                          <li key={`${c.code}-${c.name}`}>
                            {c.code ? `${c.code} — ` : ''}
                            {c.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="text-meta text-faint font-mono uppercase">Documents</p>
                    {detail.documents.length === 0 ? (
                      <p className="text-muted mt-1 text-sm">None</p>
                    ) : (
                      <ul className="mt-2 space-y-2">
                        {detail.documents.map((doc, i) => (
                          <li
                            key={doc.name}
                            className="border-hairline flex flex-wrap items-center justify-between gap-3 rounded-sm border px-3 py-2"
                          >
                            <span className="truncate text-sm">{doc.originalName}</span>
                            <span className="text-meta text-faint font-mono">
                              {(doc.size / 1024).toFixed(0)} KB
                            </span>
                            <a
                              href={documentLinks[i]}
                              className="tap text-meta text-accent underline underline-offset-4"
                            >
                              Download
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {tab === 'competencies' && (
        <div className="space-y-6">
          {catalogueError && (
            <p className="text-meta text-accent font-mono" role="alert">
              {catalogueError}
            </p>
          )}
          <p className="text-muted max-w-[70ch] text-sm leading-relaxed">
            Published competencies appear in the public catalogue and application wizard. Unpublished
            rows stay stored but are hidden from applicants. Level 5 learning areas intentionally
            have no codes or credits.
          </p>
          {catalogue.map((level) => (
            <div key={level.id} className="border-hairline rounded-sm border">
              <div className="border-hairline bg-surface border-b px-4 py-3">
                <h3 className="text-lg">{level.title}</h3>
              </div>
              <ul className="divide-hairline divide-y">
                {level.competencies.map((c) => (
                  <li
                    key={c.id}
                    className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-meta text-faint mr-3 font-mono">
                        {c.code ?? '—'}
                      </span>
                      <span className="text-sm">{c.name}</span>
                      {!level.isLearningAreas && (
                        <span className="text-meta text-faint ml-3 font-mono">
                          {c.credits ?? '—'} cr
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void togglePublish(level.id, c.id, !c.published)}
                      className={
                        c.published
                          ? 'tap text-meta text-accent underline underline-offset-4'
                          : 'tap text-meta text-faint underline underline-offset-4'
                      }
                    >
                      {c.published ? 'Published' : 'Hidden'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
