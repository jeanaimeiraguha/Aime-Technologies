import type { AcademyApplication } from '@/lib/academy/types';

/**
 * Email notifications for Academy applications.
 *
 * Zero new dependencies: if RESEND_API_KEY is set, mail goes out through
 * Resend's HTTP API. Without it (or without COMPANY_APPLICATION_EMAIL) the
 * notification is marked `skipped` so the application is still persisted and
 * the admin can see that no mail was attempted — never a silent false "sent".
 *
 * Idempotency: callers must only invoke send when the matching
 * companyEmail/applicantEmail status is not already `sent`.
 */

export interface NotifyResult {
  status: 'sent' | 'skipped' | 'failed';
  error: string | null;
}

function companyDestination(): string | undefined {
  const value = process.env.COMPANY_APPLICATION_EMAIL?.trim();
  return value || undefined;
}

function fromAddress(): string | undefined {
  const value = process.env.EMAIL_FROM?.trim();
  return value || undefined;
}

async function sendViaResend(to: string, subject: string, text: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new MissingConfigError('RESEND_API_KEY is not set');

  const from = fromAddress();
  if (!from) throw new MissingConfigError('EMAIL_FROM is not set');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Resend ${response.status}: ${body.slice(0, 200)}`);
  }
}

class MissingConfigError extends Error {}

function companyBody(app: AcademyApplication): string {
  const competencies = app.selectedCompetencies
    .map((c) => (c.code ? `${c.code} ${c.name}` : c.name))
    .join('\n- ');

  return [
    `New Academy application ${app.id}`,
    ``,
    `Status: ${app.status}`,
    `Program: ${app.programType}`,
    `Education category: ${app.educationCategory}`,
    app.tvetLevel ? `TVET level: ${app.tvetLevel}` : null,
    app.secondaryLevel ? `Secondary level: ${app.secondaryLevel}` : null,
    app.secondaryCombination ? `Combination: ${app.secondaryCombination}` : null,
    app.trainingTrackId ? `Training track: ${app.trainingTrackId}` : null,
    app.opportunityId ? `Opportunity: ${app.opportunityId}` : null,
    ``,
    `Name: ${app.firstName} ${app.lastName}`,
    `Email: ${app.email}`,
    `Phone: ${app.phone || '—'}`,
    `Organization: ${app.organization || '—'}`,
    `Availability: ${app.availability || '—'}`,
    ``,
    `Motivation:`,
    app.motivation,
    ``,
    competencies ? `Selected competencies:\n- ${competencies}` : null,
    app.courseSlugs.length ? `Courses: ${app.courseSlugs.join(', ')}` : null,
    app.documents.length
      ? `Documents: ${app.documents.map((d) => d.originalName).join(', ')}`
      : null,
    ``,
    `Submitted: ${app.createdAt}`,
    `Manage: ${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/admin`,
  ]
    .filter((line) => line !== null)
    .join('\n');
}

function applicantBody(app: AcademyApplication): string {
  return [
    `Hello ${app.firstName},`,
    ``,
    `We received your Academy application ${app.id}.`,
    ``,
    `A member of the team will review it and reply to ${app.email}.`,
    `Keep this reference if you need to follow up.`,
    ``,
    `— Totally Ink Academy`,
    `Kigali, Rwanda`,
  ].join('\n');
}

export async function notifyCompany(app: AcademyApplication): Promise<NotifyResult> {
  const to = companyDestination();
  if (!to) return { status: 'skipped', error: 'COMPANY_APPLICATION_EMAIL is not configured' };

  try {
    await sendViaResend(to, `Academy application ${app.id} — ${app.firstName} ${app.lastName}`, companyBody(app));
    return { status: 'sent', error: null };
  } catch (error) {
    if (error instanceof MissingConfigError) {
      return { status: 'skipped', error: error.message };
    }
    return { status: 'failed', error: error instanceof Error ? error.message : 'send failed' };
  }
}

export async function notifyApplicant(app: AcademyApplication): Promise<NotifyResult> {
  if (!app.email) return { status: 'skipped', error: 'No applicant email' };
  const to = app.email.trim();
  if (!to) return { status: 'skipped', error: 'No applicant email' };

  try {
    await sendViaResend(to, `We received your Academy application (${app.id})`, applicantBody(app));
    return { status: 'sent', error: null };
  } catch (error) {
    if (error instanceof MissingConfigError) {
      return { status: 'skipped', error: error.message };
    }
    return { status: 'failed', error: error instanceof Error ? error.message : 'send failed' };
  }
}

/**
 * Persist already done — now notify both sides. Safe to re-run: anything
 * already `sent` is left alone (retry without duplicates).
 */
export async function notifyAfterPersist(
  app: AcademyApplication,
): Promise<{ app: AcademyApplication; company: NotifyResult; applicant: NotifyResult }> {
  let company: NotifyResult = { status: 'skipped', error: 'already sent' };
  let applicant: NotifyResult = { status: 'skipped', error: 'already sent' };
  let next = app;

  if (app.companyEmail.status !== 'sent') {
    company = await notifyCompany(app);
    next = {
      ...next,
      companyEmail: {
        status: company.status,
        at: company.status === 'sent' ? new Date().toISOString() : next.companyEmail.at,
        error: company.error,
      },
    };
  }

  if (next.applicantEmail.status !== 'sent') {
    applicant = await notifyApplicant(next);
    next = {
      ...next,
      applicantEmail: {
        status: applicant.status,
        at: applicant.status === 'sent' ? new Date().toISOString() : next.applicantEmail.at,
        error: applicant.error,
      },
    };
  }

  next.updatedAt = new Date().toISOString();
  return { app: next, company, applicant };
}
