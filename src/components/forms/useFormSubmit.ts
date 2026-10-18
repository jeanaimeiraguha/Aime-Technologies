'use client';

import { useCallback, useRef, useState } from 'react';

export type SubmitState =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success' }
  | { state: 'error'; message: string };

/** Field name → message. Empty object means the form is valid. */
export type FieldErrors = Record<string, string>;

/**
 * The name of the honeypot field. It is a real input, visually hidden and
 * removed from the tab order, that a person will never fill in. When it comes
 * back non-empty the submission is dropped and reported as a success, so a bot
 * gets no signal that it was detected.
 */
export const HONEYPOT_FIELD = 'company_website';

const NETWORK_MESSAGE =
  'We could not reach the server. Check your connection and try again, or contact us directly.';

const GENERIC_MESSAGE =
  'Something went wrong sending your message. Please try again, or contact us directly.';

export function isValidEmail(value: string): boolean {
  // Deliberately permissive: one @, something either side, a dot in the domain.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/**
 * Posts a form as JSON to a configurable endpoint (Formspree, Getform or
 * anything accepting a JSON body).
 *
 * Validation runs on submit; a field's error clears as soon as it is edited, so
 * the form does not scold while someone is fixing it. On failure, focus moves
 * to the first invalid field and the error is announced.
 */
export function useFormSubmit({
  endpoint,
  validate,
}: {
  endpoint: string | undefined;
  validate: (values: Record<string, string>) => FieldErrors;
}) {
  const [status, setStatus] = useState<SubmitState>({ state: 'idle' });
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  const clearError = useCallback((name: string) => {
    setErrors((current) => {
      if (!(name in current)) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }, []);

  const focusFirstError = useCallback((fieldErrors: FieldErrors) => {
    const first = Object.keys(fieldErrors)[0];
    if (!first || !formRef.current) return;
    const element = formRef.current.elements.namedItem(first);
    if (element instanceof HTMLElement) element.focus();
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.currentTarget;
      const values = Object.fromEntries(
        Array.from(new FormData(form).entries()).map(([key, value]) => [
          key,
          typeof value === 'string' ? value.trim() : '',
        ]),
      ) as Record<string, string>;

      // Silently accept and discard anything that filled the honeypot.
      if (values[HONEYPOT_FIELD]) {
        setStatus({ state: 'success' });
        return;
      }

      const fieldErrors = validate(values);
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
        setStatus({ state: 'idle' });
        focusFirstError(fieldErrors);
        return;
      }

      setErrors({});

      if (!endpoint) {
        setStatus({
          state: 'error',
          message:
            'This form is not connected yet. Please contact us directly while we finish setting it up.',
        });
        return;
      }

      setStatus({ state: 'submitting' });

      delete values[HONEYPOT_FIELD];

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          setStatus({ state: 'error', message: GENERIC_MESSAGE });
          return;
        }

        setStatus({ state: 'success' });
        form.reset();
      } catch {
        setStatus({ state: 'error', message: NETWORK_MESSAGE });
      }
    },
    [endpoint, focusFirstError, validate],
  );

  return {
    status,
    errors,
    formRef,
    handleSubmit,
    clearError,
    reset: () => setStatus({ state: 'idle' }),
  };
}
