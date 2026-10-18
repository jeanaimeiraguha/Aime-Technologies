'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import {
  Field,
  FormStatus,
  Honeypot,
  SelectField,
  TextareaField,
} from '@/components/forms/Fields';
import { isValidEmail, useFormSubmit } from '@/components/forms/useFormSubmit';
import { Button } from '@/components/ui/Button';
import { Todo } from '@/components/ui/Todo';
import { site } from '@/content/site';

const REQUEST_TYPES = [
  { value: 'quote', label: 'Project / Quote' },
  { value: 'enrolment', label: 'Course enrolment' },
  { value: 'training', label: 'Training for a school or company' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
] as const;

const VALID_TYPES = REQUEST_TYPES.map((type) => type.value) as string[];

export function ContactForm() {
  const searchParams = useSearchParams();
  const requested = searchParams.get('type');
  const defaultType = requested && VALID_TYPES.includes(requested) ? requested : undefined;

  const validate = useCallback((values: Record<string, string>) => {
    const errors: Record<string, string> = {};

    if (!values.name) errors.name = 'Please tell us your name.';
    if (!values.email) {
      errors.email = 'We need an email address to reply to.';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'That does not look like an email address.';
    }
    if (!values.requestType) errors.requestType = 'Please choose the type of request.';
    if (!values.message) {
      errors.message = 'Please describe what you need.';
    } else if (values.message.length < 20) {
      errors.message = 'A little more detail will get you a more useful reply.';
    }

    return errors;
  }, []);

  const { status, errors, formRef, handleSubmit, clearError } = useFormSubmit({
    endpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT,
    validate,
  });

  if (status.state === 'success') {
    return (
      <div role="status" className="border-hairline border-t pt-8">
        <h2 className="text-title">Message sent.</h2>
        <p className="text-muted mt-4 max-w-[58ch]">
          Thank you — we have it. We read every enquiry ourselves, and you will get a reply from
          a person rather than an autoresponder.
        </p>
        <p className="mt-4">
          {site.contact.responseTime ? (
            <span className="text-muted">Expect a reply {site.contact.responseTime}.</span>
          ) : (
            <Todo>response-time commitment, to state here and on the contact page</Todo>
          )}
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative">
      <Honeypot />

      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <Field
          name="name"
          label="Your name"
          required
          autoComplete="name"
          error={errors.name}
          onInput={() => clearError('name')}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          required
          autoComplete="email"
          error={errors.email}
          onInput={() => clearError('email')}
        />
        <Field
          name="phone"
          label="Phone or WhatsApp"
          type="tel"
          autoComplete="tel"
          error={errors.phone}
          onInput={() => clearError('phone')}
        />
        <Field
          name="organisation"
          label="School or company"
          autoComplete="organization"
          error={errors.organisation}
          onInput={() => clearError('organisation')}
        />
        <SelectField
          name="requestType"
          label="Type of request"
          required
          options={REQUEST_TYPES}
          defaultValue={defaultType}
          error={errors.requestType}
          onInput={() => clearError('requestType')}
          className="sm:col-span-2"
        />
        <TextareaField
          name="message"
          label="What do you need?"
          required
          rows={6}
          hint="The problem, who it affects, what you have tried"
          error={errors.message}
          onInput={() => clearError('message')}
          className="sm:col-span-2"
        />
      </div>

      <FormStatus
        state={status.state}
        message={status.state === 'error' ? status.message : undefined}
        className="mt-6"
      />

      <div className="mt-8 flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={status.state === 'submitting'}>
          {status.state === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
        <p className="text-meta text-faint font-mono">
          We do not share your details or add you to a list.
        </p>
      </div>
    </form>
  );
}
