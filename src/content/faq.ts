/**
 * Frequently asked questions, grouped.
 *
 * Where an answer depends on something not yet confirmed (prices, schedules,
 * payment details, support response times) the item carries a `todo` note.
 * That note renders as a visible marker on the page so it cannot be forgotten,
 * and every one of them is listed in the README checklist. Fill in the answer
 * and delete the `todo` line.
 */

export interface FaqItem {
  question: string;
  answer: string;
  /** Visible reminder that this answer is incomplete. Delete once filled in. */
  todo?: string;
}

export interface FaqGroup {
  id: string;
  label: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: 'services',
    label: 'Services',
    items: [
      {
        question: 'How does a project usually start?',
        answer:
          'With a conversation about the problem, not the technology. We map the current process, agree what the first usable version has to do, and put the scope and price in writing before any code is written.',
      },
      {
        question: 'Do you work with organisations outside Rwanda?',
        answer:
          'Yes. We work remotely and are set up for it. For projects that need people on site — hardware installation, staff training, attendance systems — we agree travel separately.',
      },
      {
        question: 'Can you take over a system someone else built?',
        answer:
          'Often, yes. We start with a review: read the code, run it, talk to the people using it, then report what it would take to maintain or extend. If a rebuild is the honest answer we say so, and if it is not, we say that too.',
      },
      {
        question: 'How long does a project take?',
        answer:
          'It depends on scope, and we will not pretend otherwise before seeing yours. A focused internal tool is a matter of weeks; a school ERP covering several terms of academic rules is longer. You get a phased estimate with the assumptions written down.',
      },
      {
        question: 'Who owns the code?',
        answer:
          'You do. At handover you get the repository, the credentials, the deployment documentation and a walkthrough. We do not hold systems hostage.',
      },
      {
        question: 'Do you build hardware as well as software?',
        answer:
          'Yes — microcontroller firmware, sensor systems and the dashboards that collect their readings. We prototype first, prove the measurement, and hand over schematics, pinouts and calibration procedures along with the code.',
      },
    ],
  },
  {
    id: 'academy',
    label: 'Academy',
    items: [
      {
        question: 'How are the classes taught?',
        answer:
          'By building. Each course is organised around projects you finish and keep, with live sessions for teaching and review, recorded lessons to go back over, and mentorship while you work.',
      },
      {
        question: 'Do I need experience to start?',
        answer:
          'Not for the beginner courses. Programming Foundations assumes nothing beyond being able to use a computer. Intermediate and advanced courses list their prerequisites on the course page.',
      },
      {
        question: 'What do I need to take a course?',
        answer:
          'A laptop and an internet connection for the software courses. Embedded and IoT courses also need a hardware kit — the board, sensors and components are listed on the course page.',
      },
      {
        question: 'Are the live classes online or in person?',
        answer:
          'Live classes run online. In-person and hybrid sessions in the Bugesera and Kigali area are planned.',
        todo: 'Confirm the live-class platform (Google Meet, Zoom, other) and whether in-person or hybrid sessions are available now.',
      },
      {
        question: 'When do courses start, and how long do they run?',
        answer:
          'Each course page lists its duration and format. Start dates are scheduled per intake.',
        todo: 'Confirm the intake schedule and add start dates and durations to each course file in src/content/courses/.',
      },
      {
        question: 'Do you train schools and companies?',
        answer:
          'Yes. We run programmes built around what your staff or students actually need to be able to do, delivered online, at your site, or both. Tell us the group size, their current level and the outcome you need, and we will propose a programme.',
      },
      {
        question: 'Is there a certificate?',
        answer: 'Completion of the course project is what we assess.',
        todo: 'Decide what is issued on completion (certificate of completion, project assessment, nothing) and say so plainly here. Do not claim accreditation the Academy does not hold.',
      },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    items: [
      {
        question: 'How much does a course cost?',
        answer: 'Course prices are listed on each course page.',
        todo: 'Set the price on each course file in src/content/courses/, or state plainly that prices are given on request.',
      },
      {
        question: 'How do I pay?',
        answer: 'Payment instructions are sent after your enrolment request is confirmed.',
        todo: 'Confirm accepted payment methods — mobile money number, bank account details, whether card is accepted — and add them to the enrolment confirmation step.',
      },
      {
        question: 'Can I pay in instalments?',
        answer: 'Ask when you enrol and we will tell you what is possible for that course.',
        todo: 'Decide the instalment policy and state it here.',
      },
      {
        question: 'How is project work invoiced?',
        answer:
          'Against agreed milestones, each with a deliverable you can see and check. The schedule is part of the written scope before work starts.',
        todo: 'Confirm standard commercial terms: deposit percentage, payment window, currency.',
      },
      {
        question: 'What is your refund policy?',
        answer: '',
        todo: 'Write the refund policy for courses and for project deposits. Leave this question out of the FAQ until it is decided — an empty answer is worse than no question.',
      },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    items: [
      {
        question: 'What happens after a system goes live?',
        answer:
          'We stay available through the first period of real use, when the problems that no amount of testing finds show up. After that, ongoing maintenance is a written agreement: what is covered, how to report a problem, and how fast we respond.',
      },
      {
        question: 'How quickly do you respond?',
        answer: 'Response times for maintenance clients are set in the support agreement.',
        todo: 'Confirm the general enquiry response time for /contact, and the support tiers offered.',
      },
      {
        question: 'Do you host the systems you build?',
        answer:
          'We can deploy to a server you own, a VPS, or a cloud platform — and we document it either way. Where data has to stay in the country, we set that up locally. Hosting costs are yours and billed by the provider directly, not marked up by us.',
      },
      {
        question: 'Something is broken right now. What do I do?',
        answer:
          'Use the contact form and mark it urgent, or message us on WhatsApp. Include what you were doing, what you expected and what happened instead — it is the fastest route to a fix.',
      },
    ],
  },
];

/**
 * What actually renders: only questions that have an answer.
 *
 * A question with an empty answer is dropped entirely rather than published
 * with a marker — an unanswered question on a public FAQ is worse than no
 * question. The `todo` notes stay in this file as a tracker for whoever edits
 * it; they are never shown to visitors.
 */
export const faqGroupsWithAnswers = faqGroups
  .map((group) => ({
    ...group,
    items: group.items.filter((item) => item.answer.length > 0),
  }))
  .filter((group) => group.items.length > 0);
