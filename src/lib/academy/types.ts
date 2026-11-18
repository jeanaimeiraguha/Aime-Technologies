/** Shared Academy application types (API + UI). */

export type ApplicationStatus = 'new' | 'in_review' | 'accepted' | 'declined' | 'waitlist';

export type ProgramType =
  | 'internship'
  | 'tvet'
  | 'secondary'
  | 'professional'
  | 'mentorship'
  | 'course';

export type NotificationState = 'pending' | 'sent' | 'failed' | 'skipped';

export interface SelectedCompetency {
  code: string | null;
  name: string;
  credits: number | null;
}

export interface ApplicationDocument {
  /** Stored filename under the application's upload folder. */
  name: string;
  /** Original client filename. */
  originalName: string;
  size: number;
  type: string;
}

export interface NotificationLog {
  status: NotificationState;
  at: string | null;
  error: string | null;
}

export interface AcademyApplication {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ApplicationStatus;
  programType: ProgramType;
  educationCategory: string;
  /** TVET only. */
  tvetLevel: '3' | '4' | '5' | null;
  /** Secondary only. */
  secondaryLevel: string | null;
  secondaryCombination: string | null;
  /** Professional training track id. */
  trainingTrackId: string | null;
  /** Mentorship / opportunity id. */
  opportunityId: string | null;
  /** Existing course slugs selected on /academy. */
  courseSlugs: string[];
  /** TVET competency codes or learning-area names the applicant chose. */
  selectedCompetencies: SelectedCompetency[];
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  motivation: string;
  availability: string;
  documents: ApplicationDocument[];
  companyEmail: NotificationLog;
  applicantEmail: NotificationLog;
}

export type ApplicationDraft = Omit<
  AcademyApplication,
  'id' | 'createdAt' | 'updatedAt' | 'status' | 'documents' | 'companyEmail' | 'applicantEmail'
>;

export interface ApplicationListRow {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ApplicationStatus;
  programType: ProgramType;
  educationCategory: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  tvetLevel: string | null;
  secondaryLevel: string | null;
  secondaryCombination: string | null;
  trainingTrackId: string | null;
  opportunityId: string | null;
  courseCount: number;
  competencyCount: number;
  documentCount: number;
  companyEmail: NotificationState;
  applicantEmail: NotificationState;
}
