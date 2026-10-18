'use client';

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
import { TodoBlock } from '@/components/ui/Todo';

const FORMATS = [
  { value: 'live-online', label: 'Live online classes' },
  { value: 'recorded', label: 'Recorded lessons, at my own pace' },
  { value: 'hybrid', label: 'Hybrid — live plus recorded' },
  { value: 'in-person', label: 'In person, if available' },
  { value: 'unsure', label: 'Not sure yet' },
] as const;

const SCHEDULES = [
  { value: 'weekday-morning', label: 'Weekday mornings' },
  { value: 'weekday-evening', label: 'Weekday evenings' },
  { value: 'weekend', label: 'Weekends' },
  { value: 'flexible', label: 'Flexible' },
] as const;

const LEVELS = [
  { value: 'none', label: 'No experience at all' },
  { value: 'some', label: 'Some — I have written a little code' },
  { value: 'working', label: 'Working developer' },
  { value: 'experienced', label: 'Experienced, looking to go deeper' },
] as const;

export interface CourseOption {
  slug: string;
  code: string;
  title: string;
}

export function EnrolForm({
  courses,
  defaultCourse,
}: {
  courses: readonly CourseOption[];
  defaultCourse?: string;
}) {
  const validate = useCallback((values: Record<string, string>) => {
    const errors: Record<string, string> = {};

    if (!values.name) errors.name = 'Please tell us your name.';
    if (!values.email) {
      errors.email = 'We need an email address to confirm your place.';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'That does not look like an email address.';
    }
    if (!values.phone)
      errors.phone = 'A phone or WhatsApp number, so we can reach you quickly.';
    if (!values.course) errors.course = 'Please choose a course.';
    if (!values.format) errors.format = 'Please choose how you would like to study.';
    if (!values.level) errors.level = 'Please tell us your current level.';

    return errors;
  }, []);

  const { status, errors, formRef, handleSubmit, clearError } = useFormSubmit({
    endpoint: process.env.NEXT_PUBLIC_ENROLL_ENDPOINT,
    validate,
  });

  if (status.state === 'success') {
    return (
      <div role="status" className="border-hairline border-t pt-8">
        <h2 className="text-title">Enrolment request received.</h2>
        <p className="text-muted mt-4 max-w-[58ch]">
          Thank you. This reserves your interest, not yet your place — we confirm each enrolment
          by hand so we can check the course and format are right for your level.
        </p>

        <h3 className="text-meta text-muted mt-8 font-mono tracking-[0.06em] uppercase">
          What happens next
        </h3>
        <ol className="text-muted mt-4 max-w-[58ch] space-y-2.5">
          <li className="relative pl-7">
            <span aria-hidden="true" className="text-meta text-faint absolute left-0 font-mono">
              01
            </span>
            We reply to confirm the course, the intake and the format.
          </li>
          <li className="relative pl-7">
            <span aria-hidden="true" className="text-meta text-faint absolute left-0 font-mono">
              02
            </span>
            If a different course suits your level better, we will say so before you pay
            anything.
          </li>
          <li className="relative pl-7">
            <span aria-hidden="true" className="text-meta text-faint absolute left-0 font-mono">
              03
            </span>
            We send the payment details and what you need to prepare — including the hardware
            kit for embedded courses.
          </li>
          <li className="relative pl-7">
            <span aria-hidden="true" className="text-meta text-faint absolute left-0 font-mono">
              04
            </span>
            Your place is confirmed once payment is received.
          </li>
        </ol>

        <TodoBlock title="Payment instructions" className="mt-8 max-w-[62ch]">
          Add the confirmed payment details here and in the confirmation email: mobile money
          number and registered name, bank account details, whether card is accepted, the
          instalment policy and the refund policy. Until these are set, enrolment requests have
          to be answered individually by hand.
        </TodoBlock>
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
          required
          autoComplete="tel"
          error={errors.phone}
          onInput={() => clearError('phone')}
        />
        <SelectField
          name="course"
          label="Course"
          required
          defaultValue={defaultCourse}
          options={courses.map((course) => ({
            value: course.slug,
            label: `${course.code} — ${course.title}`,
          }))}
          error={errors.course}
          onInput={() => clearError('course')}
        />
        <SelectField
          name="format"
          label="Preferred format"
          required
          options={FORMATS}
          error={errors.format}
          onInput={() => clearError('format')}
        />
        <SelectField
          name="schedule"
          label="When can you study?"
          options={SCHEDULES}
          error={errors.schedule}
          onInput={() => clearError('schedule')}
        />
        <SelectField
          name="level"
          label="Your experience"
          required
          options={LEVELS}
          error={errors.level}
          onInput={() => clearError('level')}
          className="sm:col-span-2"
        />
        <TextareaField
          name="message"
          label="Anything else we should know?"
          rows={4}
          hint="What you want to build, or what you have already tried"
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
          {status.state === 'submitting' ? 'Sending…' : 'Request enrolment'}
        </Button>
        <p className="text-meta text-faint font-mono">No payment is taken on this form.</p>
      </div>
    </form>
  );
}
