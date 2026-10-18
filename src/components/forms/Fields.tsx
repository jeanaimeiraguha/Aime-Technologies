'use client';

import type { ReactNode } from 'react';

import { HONEYPOT_FIELD } from '@/components/forms/useFormSubmit';
import { cn } from '@/lib/cn';

/**
 * Form primitives. Every field is labelled, every error is tied to its input
 * with aria-describedby and announced, and required fields are marked in the
 * label rather than only by an asterisk colour.
 *
 * Controls carry the `surface` fill rather than sitting transparent on paper:
 * a 1px hairline on its own reads as a drawn rectangle, not as somewhere to
 * type. The fill does the work of saying "enterable", which lets the border
 * stay quiet until hover and focus escalate it.
 */

const CONTROL =
  'w-full min-h-11 rounded-xs border bg-surface px-3.5 py-2.5 text-ink ' +
  'placeholder:text-faint disabled:cursor-not-allowed disabled:opacity-60';

function controlClass(invalid: boolean, extra?: string) {
  return cn(
    CONTROL,
    invalid
      ? 'border-accent bg-accent-wash'
      : 'border-hairline-strong hover:border-ink focus:border-accent',
    extra,
  );
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-meta text-muted block font-mono tracking-[0.06em] uppercase"
    >
      {children}
      {/* Lower case and untracked, so the qualifier does not shout as loudly
          as the label it qualifies. */}
      {!required && <span className="text-faint ml-1.5 tracking-normal normal-case">optional</span>}
    </label>
  );
}

/**
 * The hint sits between the label and the control, not beside the label: at
 * two-column width a right-aligned hint drifts far from the label it belongs
 * to and reads as a second heading rather than as help for the field below.
 */
function Hint({ id, children }: { id: string; children: string }) {
  return (
    <span id={id} className="text-meta text-faint mt-1 block">
      {children}
    </span>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} className="text-meta text-accent mt-2 block font-mono">
      {message}
    </span>
  );
}

/** Joins the ids a control should point at, or undefined when there are none. */
function describedBy(hintId?: string, errorId?: string) {
  const ids = [hintId, errorId].filter(Boolean);
  return ids.length ? ids.join(' ') : undefined;
}

interface BaseProps {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  onInput?: () => void;
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

export function Field({
  name,
  label,
  type = 'text',
  required,
  hint,
  error,
  onInput,
  autoComplete,
  placeholder,
  defaultValue,
  className,
}: BaseProps & { type?: 'text' | 'email' | 'tel' }) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  return (
    <div className={className}>
      <span className="mb-2 block">
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
        {hint && <Hint id={hintId}>{hint}</Hint>}
      </span>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint ? hintId : undefined, error ? errorId : undefined)}
        onInput={onInput}
        className={controlClass(Boolean(error))}
      />
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function TextareaField({
  name,
  label,
  required,
  hint,
  error,
  onInput,
  placeholder,
  rows = 5,
  className,
}: BaseProps & { rows?: number }) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  return (
    <div className={className}>
      <span className="mb-2 block">
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
        {hint && <Hint id={hintId}>{hint}</Hint>}
      </span>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint ? hintId : undefined, error ? errorId : undefined)}
        onInput={onInput}
        className={controlClass(Boolean(error), 'resize-y leading-relaxed')}
      />
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function SelectField({
  name,
  label,
  options,
  required,
  hint,
  error,
  onInput,
  defaultValue,
  className,
}: BaseProps & { options: readonly { value: string; label: string }[] }) {
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  return (
    <div className={className}>
      <span className="mb-2 block">
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
        {hint && <Hint id={hintId}>{hint}</Hint>}
      </span>
      <span className="relative block">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ''}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(hint ? hintId : undefined, error ? errorId : undefined)}
          onChange={onInput}
          className={controlClass(
            Boolean(error),
            // A native select paints its unchosen placeholder in the full text
            // colour, which makes an untouched field look answered. The
            // placeholder is always the first option, so matching on it holds
            // the control at placeholder weight until a real choice is made —
            // and, unlike React state, it follows form.reset() for free.
            'cursor-pointer appearance-none pr-11 [&:has(option:first-child:checked)]:text-faint',
          )}
        >
          <option value="" disabled>
            Choose one…
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-ink">
              {option.label}
            </option>
          ))}
        </select>
        {/* appearance-none drops the native arrow; without a replacement the
            control is indistinguishable from a text input. */}
        <svg
          viewBox="0 0 10 6"
          aria-hidden="true"
          className="text-muted pointer-events-none absolute top-1/2 right-4 h-[6px] w-[10px] -translate-y-1/2"
        >
          <path
            d="M1 1l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="square"
          />
        </svg>
      </span>
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

/** Visually hidden, out of the tab order, invisible to assistive technology. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Company website</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}

/** Live region for submission status. Always present so it is announced. */
export function FormStatus({
  state,
  message,
  success,
  className,
}: {
  state: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
  success?: ReactNode;
  className?: string;
}) {
  return (
    <div role="status" aria-live="polite" className={className}>
      {state === 'error' && message && (
        <p className="border-accent/50 bg-accent-wash text-meta text-ink rounded-sm border px-4 py-3">
          {message}
        </p>
      )}
      {state === 'success' && success}
    </div>
  );
}
