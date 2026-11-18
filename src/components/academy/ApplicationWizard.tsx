'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { CompetencyCatalogue } from '@/components/academy/CompetencyCatalogue';
import { Honeypot } from '@/components/forms/Fields';
import { Button } from '@/components/ui/Button';
import { trainingTracks } from '@/content/academy/training';
import { opportunities } from '@/content/academy/opportunities';
import { educationCategories, type EducationCategory } from '@/content/academy/pathways';
import type { StoredCompetencyLevel } from '@/lib/academy/store';
import { cn } from '@/lib/cn';

/**
 * Multi-step Academy application wizard.
 *
 * Selections persist across steps in component state and sessionStorage, so
 * a refresh or a back navigation does not lose work. Submit posts multipart
 * to /api/academy/apply (persist-first server side).
 */

type ProgramType = 'internship' | 'tvet' | 'secondary' | 'professional' | 'mentorship' | 'course';

const STEPS = [
  { id: 'program', label: 'Program' },
  { id: 'pathway', label: 'Pathway' },
  { id: 'about', label: 'About you' },
  { id: 'documents', label: 'Documents' },
  { id: 'review', label: 'Review' },
] as const;

const STORAGE_KEY = 'ti-academy-application-v1';

interface WizardState {
  programType: ProgramType | '';
  educationCategory: EducationCategory | '';
  tvetLevel: '3' | '4' | '5' | '';
  secondaryLevel: string;
  secondaryCombination: string;
  secondaryCourses: string[];
  trainingTrackId: string;
  opportunityId: string;
  selectedCompetencyIds: string[];
  courseSlugs: string[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  motivation: string;
  availability: string;
}

const INITIAL: WizardState = {
  programType: '',
  educationCategory: '',
  tvetLevel: '',
  secondaryLevel: 'S4',
  secondaryCombination: 'MPC',
  secondaryCourses: [],
  trainingTrackId: '',
  opportunityId: '',
  selectedCompetencyIds: [],
  courseSlugs: [],
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  organization: '',
  motivation: '',
  availability: '',
};

function loadState(): WizardState {
  if (typeof window === 'undefined') return INITIAL;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL;
    return { ...INITIAL, ...(JSON.parse(raw) as Partial<WizardState>) };
  } catch {
    return INITIAL;
  }
}

function saveState(state: WizardState) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // private mode / quota — state still lives in React
  }
}

function applyPresets(
  base: WizardState,
  params: {
    track: string | null;
    opportunity: string | null;
    course: string | null;
    program: string | null;
  },
): WizardState {
  const merged: WizardState = { ...base };
  if (params.track) {
    merged.programType = 'professional';
    merged.educationCategory = merged.educationCategory || 'other';
    merged.trainingTrackId = params.track;
  }
  if (params.opportunity) {
    merged.programType = 'mentorship';
    merged.educationCategory = merged.educationCategory || 'other';
    merged.opportunityId = params.opportunity;
  }
  if (params.course) {
    merged.programType = 'course';
    merged.educationCategory = merged.educationCategory || 'other';
    if (!merged.courseSlugs.includes(params.course)) {
      merged.courseSlugs = [...merged.courseSlugs, params.course];
    }
  }
  if (params.program && PROGRAM_OPTIONS.some((p) => p.value === params.program)) {
    merged.programType = params.program as ProgramType;
    if (!merged.educationCategory) merged.educationCategory = 'other';
  }
  return merged;
}

const PROGRAM_OPTIONS: { value: ProgramType; label: string; hint: string }[] = [
  { value: 'internship', label: 'Internship', hint: 'Work placement with mentorship' },
  { value: 'tvet', label: 'TVET programme', hint: 'Level 3, 4 or 5 competencies' },
  { value: 'secondary', label: 'Secondary school', hint: 'S4–S6 technology pathway' },
  { value: 'professional', label: 'Professional training', hint: 'Long-term technology tracks' },
  { value: 'mentorship', label: 'Mentorship / opportunity', hint: 'Mentorship, bootcamps, career' },
  { value: 'course', label: 'Academy course', hint: 'Existing catalogue course' },
];

export function ApplicationWizard({
  levels,
  availableCourses = [],
}: {
  levels: StoredCompetencyLevel[];
  availableCourses?: { slug: string; title: string; code: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const track = searchParams.get('track');
  const opportunity = searchParams.get('opportunity');
  const course = searchParams.get('course');
  const program = searchParams.get('program');
  const presetKey = `${track ?? ''}|${opportunity ?? ''}|${course ?? ''}|${program ?? ''}`;

  // URL presets applied in the lazy initializer (first client render).
  // sessionStorage draft is restored on the next frame to avoid a hydration
  // mismatch between SSR HTML and the client snapshot.
  const [state, setState] = useState<WizardState>(() =>
    applyPresets(INITIAL, { track, opportunity, course, program }),
  );
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const clientIdRef = useRef('');
  const headingRef = useRef<HTMLDivElement>(null);
  const [appliedPresets, setAppliedPresets] = useState(presetKey);

  // Re-apply when the URL query changes (e.g. clicking another track link).
  if (appliedPresets !== presetKey) {
    setAppliedPresets(presetKey);
    setState((prev) => applyPresets(prev, { track, opportunity, course, program }));
  }

  useEffect(() => {
    // Deferred: not a synchronous setState in the effect body.
    const frame =
      typeof requestAnimationFrame === 'function'
        ? requestAnimationFrame
        : (cb: FrameRequestCallback) => setTimeout(() => cb(0), 0) as unknown as number;
    const id = frame(() => {
      const loaded = loadState();
      if (loaded.programType || loaded.firstName) {
        setState((prev) =>
          prev.programType || prev.firstName
            ? prev
            : applyPresets(loaded, { track, opportunity, course, program }),
        );
      }
      if (!clientIdRef.current) {
        clientIdRef.current =
          typeof crypto !== 'undefined' && 'randomUUID' in crypto
            ? crypto.randomUUID()
            : `c-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      }
    });
    return () => {
      if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(id);
      else clearTimeout(id as unknown as ReturnType<typeof setTimeout>);
    };
    // Only on mount — draft restore is one-shot.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only restore
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const selectedCompetencies = useMemo(() => {
    const byId = new Map<string, { code: string | null; name: string; credits: number | null }>();
    for (const level of levels) {
      for (const c of level.competencies) byId.set(c.id, { code: c.code, name: c.name, credits: c.credits });
    }
    return state.selectedCompetencyIds
      .map((id) => byId.get(id))
      .filter((c): c is { code: string | null; name: string; credits: number | null } => Boolean(c));
  }, [levels, state.selectedCompetencyIds]);

  function update(patch: Partial<WizardState>) {
    setState((s) => ({ ...s, ...patch }));
    setErrors({});
  }

  function validateStep(index: number): boolean {
    const e: Record<string, string> = {};
    if (index === 0) {
      if (!state.programType) e.programType = 'Choose a program type.';
      if (!state.educationCategory) e.educationCategory = 'Choose an education category.';
      if (state.programType === 'tvet' && !state.tvetLevel) e.tvetLevel = 'Choose a TVET level.';
      if (state.programType === 'professional' && !state.trainingTrackId) {
        e.trainingTrackId = 'Choose a training track.';
      }
      if (state.programType === 'mentorship' && !state.opportunityId) {
        e.opportunityId = 'Choose an opportunity.';
      }
    }
    if (index === 2) {
      if (state.firstName.trim().length < 2) e.firstName = 'First name is required.';
      if (state.lastName.trim().length < 2) e.lastName = 'Last name is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(state.email)) e.email = 'A valid email is required.';
      if (state.motivation.trim().length < 20) {
        e.motivation = 'Tell us a little more (at least 20 characters).';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    if (!validateStep(2)) {
      setStep(2);
      return;
    }
    setStatus('submitting');
    setMessage('');

    try {
      const form = new FormData();
      form.set('clientId', clientIdRef.current);
      form.set('company_website', ''); // honeypot
      form.set('programType', state.programType);
      form.set('educationCategory', state.educationCategory);
      if (state.tvetLevel) form.set('tvetLevel', state.tvetLevel);
      if (state.secondaryLevel) form.set('secondaryLevel', state.secondaryLevel);
      if (state.secondaryCombination) form.set('secondaryCombination', state.secondaryCombination);
      if (state.trainingTrackId) form.set('trainingTrackId', state.trainingTrackId);
      if (state.opportunityId) form.set('opportunityId', state.opportunityId);
      form.set(
        'selectedCompetencies',
        JSON.stringify(
          state.programType === 'tvet'
            ? selectedCompetencies
            : state.programType === 'secondary'
              ? state.secondaryCourses.map((name) => ({ code: null, name, credits: null }))
              : [],
        ),
      );
      form.set('courseSlugs', JSON.stringify(state.courseSlugs));
      form.set('firstName', state.firstName.trim());
      form.set('lastName', state.lastName.trim());
      form.set('email', state.email.trim());
      form.set('phone', state.phone.trim());
      form.set('organization', state.organization.trim());
      form.set('motivation', state.motivation.trim());
      form.set('availability', state.availability.trim());

      for (const file of files) form.append('documents', file);

      const response = await fetch('/api/academy/apply', {
        method: 'POST',
        body: form,
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        id?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong submitting your application.');
        return;
      }

      setReference(data.id ?? '');
      setStatus('success');
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    } catch {
      setStatus('error');
      setMessage('We could not reach the server. Check your connection and try again.');
    }
  }

  const stepDef = STEPS[step] ?? STEPS[0];

  if (status === 'success') {
    return (
      <div className="border-hairline bg-surface rounded-sm border p-8" role="status">
        <p className="text-meta text-faint font-mono tracking-[0.06em] uppercase">Application received</p>
        <h2 className="mt-3 text-3xl">Thank you — you are in the queue.</h2>
        <p className="text-muted mt-4 max-w-[60ch] leading-relaxed">
          Your reference is <strong className="text-ink font-mono">{reference}</strong>. We have
          stored your application and emailed you a confirmation when messaging is configured. A
          team member will review it and reply to {state.email || 'your email'}.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button type="button" onClick={() => router.push('/academy')}>
            Back to Academy
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setState(INITIAL);
              setFiles([]);
              setStatus('idle');
              setStep(0);
              setReference('');
            }}
          >
            Submit another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-hairline bg-surface rounded-sm border">
      {/* Step indicators */}
      <ol className="border-hairline flex flex-wrap gap-x-6 gap-y-2 border-b px-6 py-4">
        {STEPS.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => {
                if (index < step) setStep(index);
              }}
              disabled={index > step}
              aria-current={index === step ? 'step' : undefined}
              className={cn(
                'tap text-meta font-mono tracking-[0.06em] uppercase',
                index === step
                  ? 'text-ink decoration-accent underline underline-offset-4'
                  : index < step
                    ? 'text-accent'
                    : 'text-faint cursor-not-allowed',
              )}
            >
              {index + 1}. {item.label}
            </button>
          </li>
        ))}
      </ol>

      <div className="p-6 md:p-8" ref={headingRef} tabIndex={-1}>
        <p className="text-meta text-faint font-mono tracking-[0.06em] uppercase">
          Step {step + 1} of {STEPS.length} — {stepDef.label}
        </p>

        {step === 0 && (
          <div className="mt-6 space-y-8">
            <fieldset>
              <legend className="text-xl">What are you applying for?</legend>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {PROGRAM_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={cn(
                      'border-hairline cursor-pointer rounded-sm border p-4',
                      state.programType === opt.value
                        ? 'border-accent bg-accent-wash'
                        : 'hover:border-ink bg-surface',
                    )}
                  >
                    <input
                      type="radio"
                      name="programType"
                      value={opt.value}
                      checked={state.programType === opt.value}
                      onChange={() => update({ programType: opt.value })}
                      className="sr-only"
                    />
                    <span className="text-ink block font-medium">{opt.label}</span>
                    <span className="text-meta text-faint mt-1 block">{opt.hint}</span>
                  </label>
                ))}
              </div>
              {errors.programType && (
                <p className="text-meta text-accent mt-2 font-mono" role="alert">
                  {errors.programType}
                </p>
              )}
            </fieldset>

            <label className="block">
              <span className="text-meta text-muted mb-2 block font-mono tracking-[0.06em] uppercase">
                Education category <span className="text-faint normal-case">(required)</span>
              </span>
              <select
                value={state.educationCategory}
                onChange={(e) => update({ educationCategory: e.target.value as EducationCategory })}
                className="border-hairline-strong text-ink bg-surface focus:border-accent w-full min-h-11 rounded-xs border px-3.5 py-2.5"
              >
                <option value="" disabled>
                  Choose one…
                </option>
                {educationCategories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.educationCategory && (
                <span className="text-meta text-accent mt-2 block font-mono" role="alert">
                  {errors.educationCategory}
                </span>
              )}
            </label>

            {state.programType === 'tvet' && (
              <fieldset>
                <legend className="text-xl">TVET level</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(['3', '4', '5'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      aria-pressed={state.tvetLevel === lvl}
                      onClick={() => update({ tvetLevel: lvl })}
                      className={cn(
                        'tap text-meta rounded-xs border px-4 py-2 font-mono uppercase',
                        state.tvetLevel === lvl
                          ? 'border-accent bg-accent-wash text-ink'
                          : 'border-hairline-strong text-muted',
                      )}
                    >
                      Level {lvl}
                    </button>
                  ))}
                </div>
                {errors.tvetLevel && (
                  <p className="text-meta text-accent mt-2 font-mono" role="alert">
                    {errors.tvetLevel}
                  </p>
                )}
              </fieldset>
            )}

            {state.programType === 'professional' && (
              <fieldset>
                <legend className="text-xl">Training track</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {trainingTracks.map((track) => (
                    <label
                      key={track.id}
                      className={cn(
                        'border-hairline cursor-pointer rounded-sm border p-3',
                        state.trainingTrackId === track.id
                          ? 'border-accent bg-accent-wash'
                          : 'bg-surface',
                      )}
                    >
                      <input
                        type="radio"
                        name="trainingTrackId"
                        checked={state.trainingTrackId === track.id}
                        onChange={() => update({ trainingTrackId: track.id })}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{track.title}</span>
                    </label>
                  ))}
                </div>
                {errors.trainingTrackId && (
                  <p className="text-meta text-accent mt-2 font-mono" role="alert">
                    {errors.trainingTrackId}
                  </p>
                )}
              </fieldset>
            )}

            {state.programType === 'mentorship' && (
              <fieldset>
                <legend className="text-xl">Opportunity</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {opportunities.map((opp) => (
                    <label
                      key={opp.id}
                      className={cn(
                        'border-hairline cursor-pointer rounded-sm border p-3',
                        state.opportunityId === opp.id ? 'border-accent bg-accent-wash' : 'bg-surface',
                      )}
                    >
                      <input
                        type="radio"
                        name="opportunityId"
                        checked={state.opportunityId === opp.id}
                        onChange={() => update({ opportunityId: opp.id })}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{opp.title}</span>
                    </label>
                  ))}
                </div>
                {errors.opportunityId && (
                  <p className="text-meta text-accent mt-2 font-mono" role="alert">
                    {errors.opportunityId}
                  </p>
                )}
              </fieldset>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 space-y-8">
            {state.programType === 'tvet' && state.tvetLevel && (
              <div>
                <h3 className="text-xl">Select competencies</h3>
                <p className="text-muted mt-1 text-sm">
                  Choose the units you want to work on. You can change this later with your mentor.
                </p>
                <div className="mt-4">
                  <CompetencyCatalogue
                    levels={levels.filter((l) => l.id === state.tvetLevel)}
                    selectable
                    selected={state.selectedCompetencyIds}
                    onSelectionChange={(ids) => update({ selectedCompetencyIds: ids })}
                    showActions
                  />
                </div>
              </div>
            )}

            {state.programType === 'secondary' && (
              <div>
                <h3 className="text-xl">Secondary pathway</h3>
                <div className="mt-4 space-y-6">
                  <div>
                    <p className="text-meta text-faint mb-2 font-mono uppercase">Level</p>
                    <div className="flex gap-2">
                      {['S4', 'S5', 'S6'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          aria-pressed={state.secondaryLevel === lvl}
                          onClick={() => update({ secondaryLevel: lvl })}
                          className={cn(
                            'tap text-meta rounded-xs border px-4 py-2 font-mono',
                            state.secondaryLevel === lvl
                              ? 'border-accent bg-accent-wash text-ink'
                              : 'border-hairline-strong text-muted',
                          )}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-meta text-faint mb-2 font-mono uppercase">Combination</p>
                    <div className="flex flex-wrap gap-2">
                      {['MPC', 'PCB', 'MCB', 'MCE', 'MEG', 'BCG', 'Other'].map((combo) => (
                        <button
                          key={combo}
                          type="button"
                          aria-pressed={state.secondaryCombination === combo}
                          onClick={() => update({ secondaryCombination: combo })}
                          className={cn(
                            'tap text-meta rounded-xs border px-4 py-2 font-mono',
                            state.secondaryCombination === combo
                              ? 'border-accent bg-accent-wash text-ink'
                              : 'border-hairline-strong text-muted',
                          )}
                        >
                          {combo}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-meta text-faint mb-2 font-mono uppercase">Courses of interest</p>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {[
                        'Programming',
                        'Python',
                        'Web Development',
                        'Artificial Intelligence',
                        'Machine Learning',
                        'Robotics',
                        'Embedded Systems',
                        'Cybersecurity',
                        'Mobile Development',
                        'UI/UX Design',
                        'Database Fundamentals',
                        'Digital Skills',
                      ].map((name) => {
                        const active = state.secondaryCourses.includes(name);
                        return (
                          <button
                            key={name}
                            type="button"
                            aria-pressed={active}
                            onClick={() =>
                              update({
                                secondaryCourses: active
                                  ? state.secondaryCourses.filter((c) => c !== name)
                                  : [...state.secondaryCourses, name],
                              })
                            }
                            className={cn(
                              'tap rounded-xs border px-3 py-2 text-left text-sm',
                              active
                                ? 'border-accent bg-accent-wash text-ink'
                                : 'border-hairline-strong text-muted bg-surface',
                            )}
                          >
                            {name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {state.programType === 'internship' && (
              <div>
                <h3 className="text-xl">Internship focus</h3>
                <p className="text-muted mt-2 max-w-[60ch] text-sm leading-relaxed">
                  Tell us in the next step which track fits you (TVET, secondary or university).
                  For now pick any competencies or courses you already know — they help us place you.
                </p>
                <div className="mt-4">
                  <CompetencyCatalogue
                    levels={levels}
                    selectable
                    selected={state.selectedCompetencyIds}
                    onSelectionChange={(ids) => update({ selectedCompetencyIds: ids })}
                  />
                </div>
              </div>
            )}

            {(state.programType === 'professional' || state.programType === 'course') && (
              <div>
                <h3 className="text-xl">
                  {state.programType === 'course' ? 'Academy courses' : 'Track details'}
                </h3>
                {availableCourses.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {availableCourses.map((course) => {
                      const active = state.courseSlugs.includes(course.slug);
                      return (
                        <li key={course.slug}>
                          <label
                            className={cn(
                              'border-hairline flex cursor-pointer items-center gap-3 rounded-sm border p-3',
                              active ? 'border-accent bg-accent-wash' : 'bg-surface',
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={active}
                              onChange={() =>
                                update({
                                  courseSlugs: active
                                    ? state.courseSlugs.filter((s) => s !== course.slug)
                                    : [...state.courseSlugs, course.slug],
                                })
                              }
                              className="accent-accent h-4 w-4"
                            />
                            <span className="text-meta text-faint font-mono">{course.code}</span>
                            <span className="text-sm">{course.title}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                )}
                {state.trainingTrackId && (
                  <p className="text-muted mt-4 text-sm">
                    Track:{' '}
                    <strong>
                      {trainingTracks.find((t) => t.id === state.trainingTrackId)?.title}
                    </strong>
                    {' — '}
                    {trainingTracks.find((t) => t.id === state.trainingTrackId)?.summary}
                  </p>
                )}
              </div>
            )}

            {state.programType === 'mentorship' && state.opportunityId && (
              <div>
                <h3 className="text-xl">
                  {opportunities.find((o) => o.id === state.opportunityId)?.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {(opportunities.find((o) => o.id === state.opportunityId)?.details ?? []).map(
                    (d) => (
                      <li key={d} className="text-muted text-sm">
                        → {d}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-meta text-muted mb-2 block font-mono uppercase">
                First name <span className="text-accent">*</span>
              </span>
              <input
                value={state.firstName}
                onChange={(e) => update({ firstName: e.target.value })}
                autoComplete="given-name"
                className="border-hairline-strong focus:border-accent bg-surface w-full min-h-11 rounded-xs border px-3.5 py-2.5"
              />
              {errors.firstName && (
                <span className="text-meta text-accent mt-1 block font-mono" role="alert">
                  {errors.firstName}
                </span>
              )}
            </label>
            <label className="block">
              <span className="text-meta text-muted mb-2 block font-mono uppercase">
                Last name <span className="text-accent">*</span>
              </span>
              <input
                value={state.lastName}
                onChange={(e) => update({ lastName: e.target.value })}
                autoComplete="family-name"
                className="border-hairline-strong focus:border-accent bg-surface w-full min-h-11 rounded-xs border px-3.5 py-2.5"
              />
              {errors.lastName && (
                <span className="text-meta text-accent mt-1 block font-mono" role="alert">
                  {errors.lastName}
                </span>
              )}
            </label>
            <label className="block">
              <span className="text-meta text-muted mb-2 block font-mono uppercase">
                Email <span className="text-accent">*</span>
              </span>
              <input
                type="email"
                value={state.email}
                onChange={(e) => update({ email: e.target.value })}
                autoComplete="email"
                className="border-hairline-strong focus:border-accent bg-surface w-full min-h-11 rounded-xs border px-3.5 py-2.5"
              />
              {errors.email && (
                <span className="text-meta text-accent mt-1 block font-mono" role="alert">
                  {errors.email}
                </span>
              )}
            </label>
            <label className="block">
              <span className="text-meta text-muted mb-2 block font-mono uppercase">
                Phone <span className="text-faint normal-case">optional</span>
              </span>
              <input
                type="tel"
                value={state.phone}
                onChange={(e) => update({ phone: e.target.value })}
                autoComplete="tel"
                className="border-hairline-strong focus:border-accent bg-surface w-full min-h-11 rounded-xs border px-3.5 py-2.5"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-meta text-muted mb-2 block font-mono uppercase">
                School / company <span className="text-faint normal-case">optional</span>
              </span>
              <input
                value={state.organization}
                onChange={(e) => update({ organization: e.target.value })}
                autoComplete="organization"
                className="border-hairline-strong focus:border-accent bg-surface w-full min-h-11 rounded-xs border px-3.5 py-2.5"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-meta text-muted mb-2 block font-mono uppercase">
                Motivation <span className="text-accent">*</span>
              </span>
              <textarea
                value={state.motivation}
                onChange={(e) => update({ motivation: e.target.value })}
                rows={5}
                placeholder="What do you want to learn, and why now?"
                className="border-hairline-strong focus:border-accent bg-surface w-full rounded-xs border px-3.5 py-2.5 leading-relaxed"
              />
              {errors.motivation && (
                <span className="text-meta text-accent mt-1 block font-mono" role="alert">
                  {errors.motivation}
                </span>
              )}
            </label>
            <label className="block md:col-span-2">
              <span className="text-meta text-muted mb-2 block font-mono uppercase">
                Availability <span className="text-faint normal-case">optional</span>
              </span>
              <input
                value={state.availability}
                onChange={(e) => update({ availability: e.target.value })}
                placeholder="e.g. Weekday evenings, or full-time from March"
                className="border-hairline-strong focus:border-accent bg-surface w-full min-h-11 rounded-xs border px-3.5 py-2.5"
              />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl">Documents</h3>
              <p className="text-muted mt-1 max-w-[60ch] text-sm leading-relaxed">
                Optional but helpful: CV, transcript, national ID, or a portfolio link document.
                PDF, DOC(X), images, TXT or ZIP — up to 5 files, 5 MB each.
              </p>
            </div>
            <label className="border-hairline hover:border-ink block cursor-pointer rounded-sm border border-dashed p-8 text-center">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,.txt,.zip"
                className="sr-only"
                onChange={(e) => {
                  const list = Array.from(e.target.files ?? []);
                  setFiles((prev) => [...prev, ...list].slice(0, 5));
                }}
              />
              <span className="text-accent text-sm underline underline-offset-4">
                Choose files
              </span>
              <span className="text-meta text-faint mt-2 block font-mono">or drop them here</span>
            </label>
            {files.length > 0 && (
              <ul className="space-y-2">
                {files.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="border-hairline bg-surface flex items-center justify-between gap-4 rounded-sm border px-4 py-3"
                  >
                    <span className="truncate text-sm">{file.name}</span>
                    <span className="text-meta text-faint font-mono">
                      {(file.size / 1024).toFixed(0)} KB
                    </span>
                    <button
                      type="button"
                      className="tap text-meta text-accent shrink-0 underline"
                      onClick={() => setFiles((prev) => prev.filter((_, i) => i !== index))}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="mt-6 space-y-6">
            <h3 className="text-xl">Review and submit</h3>
            <dl className="border-hairline divide-hairline rounded-sm border divide-y">
              {[
                ['Program', PROGRAM_OPTIONS.find((p) => p.value === state.programType)?.label ?? '—'],
                [
                  'Education',
                  educationCategories.find((c) => c.value === state.educationCategory)?.label ?? '—',
                ],
                state.tvetLevel ? ['TVET level', `Level ${state.tvetLevel}`] : null,
                state.secondaryLevel ? ['Secondary', `${state.secondaryLevel} · ${state.secondaryCombination}`] : null,
                state.trainingTrackId
                  ? ['Track', trainingTracks.find((t) => t.id === state.trainingTrackId)?.title ?? '—']
                  : null,
                state.opportunityId
                  ? ['Opportunity', opportunities.find((o) => o.id === state.opportunityId)?.title ?? '—']
                  : null,
                [
                  'Name',
                  `${state.firstName} ${state.lastName}`.trim() || '—',
                ],
                ['Email', state.email || '—'],
                state.phone ? ['Phone', state.phone] : null,
                state.organization ? ['Organisation', state.organization] : null,
                [
                  'Competencies / courses',
                  [
                    ...selectedCompetencies.map((c) => c.name),
                    ...state.secondaryCourses,
                    ...state.courseSlugs,
                  ].join(', ') || 'None selected',
                ],
                ['Documents', files.length ? `${files.length} file(s)` : 'None'],
              ]
                .filter((row): row is [string, string] => Boolean(row))
                .map(([label, value]) => (
                  <div key={label} className="grid gap-2 px-4 py-3 sm:grid-cols-3">
                    <dt className="text-meta text-faint font-mono uppercase">{label}</dt>
                    <dd className="text-sm sm:col-span-2">{value}</dd>
                  </div>
                ))}
            </dl>
            <div>
              <p className="text-meta text-faint font-mono uppercase">Motivation</p>
              <p className="text-muted mt-2 whitespace-pre-wrap text-sm leading-relaxed">
                {state.motivation}
              </p>
            </div>
          </div>
        )}

        {status === 'error' && message && (
          <p
            className="border-accent/50 bg-accent-wash text-meta text-ink mt-6 rounded-sm border px-4 py-3"
            role="alert"
          >
            {message}
          </p>
        )}

        <Honeypot />

        <div className="border-hairline mt-8 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <div>
            {step > 0 && (
              <Button type="button" variant="outline" onClick={goBack} disabled={status === 'submitting'}>
                Back
              </Button>
            )}
          </div>
          <div>
            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={goNext}>
                Continue
              </Button>
            ) : (
              <Button type="button" onClick={submit} disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting…' : 'Submit application'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
