/**
 * The eleven service lines. Each one renders a row on the home page and
 * /services, and a detail page at /services/[slug].
 *
 * `relatedWork` and `relatedCourses` hold slugs resolved at build time against
 * src/content/work/*.mdx and src/content/courses/*.mdx. A slug that does not
 * match any file is dropped rather than rendered as a dead link.
 */

export interface Service {
  slug: string;
  /** Two-digit list number, shown in mono on every row. */
  index: string;
  title: string;
  /** One line. Shown on the home list and /services. */
  summary: string;
  /** Short paragraphs: what the service actually is. */
  whatItIs: string[];
  whoItsFor: string[];
  deliverables: string[];
  howWeWork: string[];
  technologies: string[];
  relatedWork: string[];
  relatedCourses: string[];
}

export const services: Service[] = [
  {
    slug: 'custom-software-development',
    index: '01',
    title: 'Custom Software Development',
    summary: 'Web applications, APIs, system architecture and integrations.',
    whatItIs: [
      'We design and build software for a specific problem rather than configure a product and hope it fits. That covers the data model, the API, the interface, the background jobs and the deployment.',
      'Most of our work starts from an existing process that people run on paper, spreadsheets or three disconnected tools, and ends with one system that holds the real workflow.',
    ],
    whoItsFor: [
      'Organisations whose process no longer fits an off-the-shelf tool',
      'Teams carrying a system that has outgrown its original design',
      'Founders who need a first version built properly enough to extend',
    ],
    deliverables: [
      'System architecture and data model',
      'Web application and administrative interfaces',
      'Documented HTTP API',
      'Automated tests for the paths that matter',
      'Deployment, monitoring and a handover document',
    ],
    howWeWork: [
      'We map the current process first, including the parts people work around.',
      'We agree on scope in writing, then build in slices you can use and review.',
      'We write tests for the logic that would hurt if it broke, not for coverage numbers.',
      'You get the repository, the credentials and the documentation at the end. No lock-in.',
    ],
    technologies: [
      'TypeScript',
      'React.js',
      'Node.js',
      'Python',
      'FastAPI',
      'Spring Boot',
      'Laravel',
      'MySQL',
      'MongoDB',
      'Docker',
    ],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['full-stack-web-development', 'software-engineering-practice'],
  },
  {
    slug: 'web-and-mobile-applications',
    index: '02',
    title: 'Web & Mobile Applications',
    summary: 'Responsive web applications, Flutter mobile apps and company websites.',
    whatItIs: [
      'Interfaces people use on the devices they actually own, which in Rwanda means a mid-range Android phone on a connection that comes and goes.',
      'We build the web application and the mobile client against one API, so behaviour does not drift between them.',
    ],
    whoItsFor: [
      'Schools and companies whose users work from phones',
      'Businesses that need a website that loads fast and says what they do',
      'Teams replacing a desktop-only tool with something field staff can use',
    ],
    deliverables: [
      'Responsive web application',
      'Flutter application for Android, and iOS where required',
      'Shared API and authentication',
      'Offline-tolerant behaviour where the workflow needs it',
      'Store submission assets and release process',
    ],
    howWeWork: [
      'We test on real low-end devices and throttled connections, not only a laptop.',
      'Accessibility and keyboard support are part of the build, not a later pass.',
      'We keep the client thin and the rules on the server, so a stale app cannot corrupt data.',
    ],
    technologies: [
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'Flutter',
      'Node.js',
      'MySQL',
      'MongoDB',
    ],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['full-stack-web-development', 'flutter-mobile-development'],
  },
  {
    slug: 'school-erp-edtech',
    index: '03',
    title: 'School ERP & EdTech Platforms',
    summary:
      'Student management, teacher portals, timetables, report cards, fee management and academic reporting.',
    whatItIs: [
      'One system for the administrative work a school repeats every term: enrolment, class and stream allocation, attendance, marks, report cards, timetables, fees and the reports the head teacher and the district actually ask for.',
      'The hard part is rarely the screens. It is the academic rules — grading scales, promotion criteria, term boundaries, resits — which differ per school and have to be configurable without a code change.',
    ],
    whoItsFor: [
      'Primary and secondary schools',
      'School groups running several campuses on one set of rules',
      'Training institutes and universities with their own grading structures',
    ],
    deliverables: [
      'Student, staff and guardian records',
      'Teacher portal for marks and attendance',
      'Configurable grading scales and report card templates',
      'Timetable management',
      'Fee structures, invoices, payments and balances',
      'Term and annual academic reporting',
      'Role-based access for administration, teachers, students and guardians',
    ],
    howWeWork: [
      'We start from your real report card and your real fee structure, not a generic template.',
      'Grading rules live in configuration, so a new scale does not need a developer.',
      'We import your existing student data and reconcile it before go-live.',
      'We train the staff who will use it daily and stay available through the first term.',
    ],
    technologies: ['React.js', 'TypeScript', 'Node.js', 'Python', 'Laravel', 'MySQL', 'Docker'],
    relatedWork: ['school-erp-platform', 'secure-online-examination-grading'],
    relatedCourses: ['full-stack-web-development', 'backend-engineering'],
  },
  {
    slug: 'elearning-examination-grading',
    index: '04',
    title: 'E-Learning, Examination & Automated Grading',
    summary: 'Learning platforms, live classes, assessments, secure exams and grading engines.',
    whatItIs: [
      'Course delivery, assessment and marking in one place: lessons and materials, assignments, question banks, timed examinations and automatic grading with a human override.',
      'For grading we build deterministic engines. The same submission and the same rubric produce the same mark every time, and every mark can be traced back to the rule that produced it.',
    ],
    whoItsFor: [
      'Schools running continuous assessment and end-of-term examinations',
      'Training providers delivering courses online',
      'Institutions that need examinations to hold up under scrutiny',
    ],
    deliverables: [
      'Course, lesson and material management',
      'Assignment submission and marking',
      'Question banks with randomisation',
      'Timed examinations with session controls',
      'Deterministic grading engine with an audit trail',
      'Result publication and transcripts',
    ],
    howWeWork: [
      'We write the grading rules down and test them against past papers you already marked by hand.',
      'Exam sessions are designed for weak connections: answers are saved as they are entered, and a dropped connection does not lose a paper.',
      'Every automatic mark records which rule produced it, so a disputed result can be explained.',
      'Teachers keep the final say. The engine proposes, a human can override, and the change is logged.',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Node.js',
      'React.js',
      'TypeScript',
      'MySQL',
      'MongoDB',
    ],
    relatedWork: ['secure-online-examination-grading', 'school-erp-platform'],
    relatedCourses: ['backend-engineering', 'software-engineering-practice'],
  },
  {
    slug: 'attendance-security-systems',
    index: '05',
    title: 'Attendance & Security Systems',
    summary: 'Face-recognition attendance, access control and monitoring.',
    whatItIs: [
      'Attendance captured at the door instead of on a register: a camera or reader at the entrance, a record per person per session, and a report the administration can act on the same day.',
      'We treat this as a data-protection problem as much as a recognition problem. Face data is biometric, and how it is stored, who can see it and how long it is kept has to be decided before anything is installed.',
    ],
    whoItsFor: [
      'Schools tracking student and staff attendance',
      'Companies with shift or site-based attendance',
      'Organisations that need controlled access to specific rooms',
    ],
    deliverables: [
      'Enrolment workflow for faces or cards',
      'Recognition service running on site',
      'Attendance records, exception handling and manual correction',
      'Daily and term reporting, with export',
      'Access-control integration where hardware allows',
      'Retention and access policy documentation',
    ],
    howWeWork: [
      'We agree what is stored, where it is stored and who may look at it, in writing, first.',
      'Recognition runs on local hardware where possible, so faces do not leave the site.',
      'Every automatic record can be corrected by a named person, and corrections are logged.',
      'We measure accuracy in your actual lighting before it goes live, and report what we measured.',
    ],
    technologies: [
      'Python',
      'computer vision',
      'face recognition',
      'FastAPI',
      'MySQL',
      'Raspberry Pi',
      'Docker',
      'Linux',
    ],
    relatedWork: ['face-recognition-attendance'],
    relatedCourses: ['intro-ai-ml-computer-vision', 'embedded-systems-arduino-esp32'],
  },
  {
    slug: 'ai-ml-computer-vision',
    index: '06',
    title: 'AI/ML & Computer Vision',
    summary: 'Face recognition, image analysis and data-driven automation.',
    whatItIs: [
      'Models applied to a defined task: recognise a face, read a document, sort an image, flag an anomaly in a stream of records.',
      'We are direct about what a model can and cannot do. If a rule-based system solves the problem with less risk and no training data, we will say so and build that instead.',
    ],
    whoItsFor: [
      'Organisations with a repetitive visual or classification task',
      'Teams holding data they cannot review by hand',
      'Projects that need recognition running on modest hardware',
    ],
    deliverables: [
      'Problem framing, with the accuracy target written down',
      'Data collection and labelling plan',
      'Trained or adapted model, with measured results',
      'Inference service behind an API',
      'Monitoring for drift and failure cases',
    ],
    howWeWork: [
      'We define what counts as a correct answer before training anything.',
      'We report the error cases, not only the accuracy figure.',
      'Models run where the data lives whenever that is possible.',
      'If the measured result does not clear the target, we say so rather than ship it quietly.',
    ],
    technologies: [
      'Python',
      'computer vision',
      'face recognition',
      'machine learning',
      'FastAPI',
    ],
    relatedWork: ['face-recognition-attendance', 'secure-online-examination-grading'],
    relatedCourses: ['intro-ai-ml-computer-vision'],
  },
  {
    slug: 'embedded-systems-iot',
    index: '07',
    title: 'Embedded Systems & IoT',
    summary:
      'Microcontroller firmware, sensor systems, smart devices, hardware–software integration, IoT dashboards and prototyping.',
    whatItIs: [
      'Devices that measure something and report it: firmware on a microcontroller, sensors, a link to the network, and a dashboard where the readings arrive and alerts are raised.',
      'Hardware is unforgiving. Power fails, connections drop, sensors drift and nobody is standing next to the device to restart it, so the firmware has to recover on its own.',
    ],
    whoItsFor: [
      'Businesses monitoring equipment, storage conditions or utilities',
      'Schools and institutions teaching or building with hardware',
      'Projects needing a working prototype before committing to a production run',
    ],
    deliverables: [
      'Firmware for ESP32, Arduino or Raspberry Pi targets',
      'Sensor selection, wiring and calibration notes',
      'Connectivity and message schema, typically over MQTT',
      'Ingestion service and storage',
      'Dashboard with history, thresholds and alerts',
      'Enclosure and power recommendations',
    ],
    howWeWork: [
      'We prototype on a breadboard, prove the measurement, then design the board.',
      'Devices buffer readings locally and send them when the link returns.',
      'Firmware is updatable over the air where the hardware supports it.',
      'We hand over schematics, pinouts and calibration procedures, not just a working box.',
    ],
    technologies: [
      'C/C++',
      'MicroPython',
      'Arduino',
      'ESP32',
      'Raspberry Pi',
      'MQTT',
      'sensors',
      'Python',
      'Linux',
    ],
    relatedWork: ['iot-monitoring-device'],
    relatedCourses: ['embedded-systems-arduino-esp32', 'iot-sensors-connectivity-dashboards'],
  },
  {
    slug: 'business-automation',
    index: '08',
    title: 'Business Automation',
    summary: 'Workflow automation, internal tools, reporting and integrations.',
    whatItIs: [
      'Removing the manual steps between systems that should already talk to each other: the spreadsheet copied by hand every Friday, the report rebuilt every month, the approval chased over WhatsApp.',
      'Usually the work is small and specific. One internal tool, one scheduled job, one integration, and a few hours a week come back.',
    ],
    whoItsFor: [
      'SMEs running operations across several disconnected tools',
      'Finance and operations teams rebuilding the same report every month',
      'Teams whose approvals depend on someone remembering',
    ],
    deliverables: [
      'Process map with the manual steps identified',
      'Internal tools and dashboards',
      'Scheduled jobs and notifications',
      'Integrations between existing systems',
      'Reports generated on a schedule',
    ],
    howWeWork: [
      'We measure how long the manual version takes before automating it.',
      'We automate the repetitive step and leave the judgement call to a person.',
      'Failures notify someone. A silent broken job is worse than no job.',
    ],
    technologies: ['Python', 'Node.js', 'TypeScript', 'FastAPI', 'MySQL', 'Docker', 'Linux'],
    relatedWork: ['school-erp-platform'],
    relatedCourses: ['backend-engineering', 'linux-git-docker'],
  },
  {
    slug: 'digital-payments-wallets',
    index: '09',
    title: 'Digital Payments & Wallets',
    summary: 'Wallet systems, payment integrations, transaction management and e-commerce.',
    whatItIs: [
      'Money moving through a system correctly: balances, transfers, payment collection, reconciliation and a ledger that still adds up after a failed request.',
      'The requirement that shapes everything is that a transaction must not be applied twice and must not be lost halfway. That drives the ledger design, the idempotency keys and the retry handling.',
    ],
    whoItsFor: [
      'Schools collecting fees',
      'Businesses taking mobile money or card payments',
      'Platforms holding balances for their users',
      'E-commerce operations needing checkout and settlement',
    ],
    deliverables: [
      'Double-entry ledger and balance model',
      'Mobile money and card integrations',
      'Idempotent transaction handling and retries',
      'Reconciliation reports and statements',
      'Fraud and limit controls',
      'Audit trail for every balance change',
    ],
    howWeWork: [
      'Balances are derived from an append-only ledger, never edited in place.',
      'Every external call carries an idempotency key, so a timeout cannot double-charge.',
      'We test against provider sandboxes, including the failure responses.',
      'Reconciliation runs daily and reports a difference rather than hiding it.',
    ],
    technologies: [
      'Node.js',
      'Python',
      'Spring Boot',
      'MySQL',
      'TypeScript',
      'React.js',
      'Docker',
    ],
    relatedWork: ['digital-wallet-payments'],
    relatedCourses: ['backend-engineering', 'software-engineering-practice'],
  },
  {
    slug: 'technology-consulting-architecture',
    index: '10',
    title: 'Technology Consulting & Architecture',
    summary:
      'Technical planning, system design reviews and digital transformation for schools and businesses.',
    whatItIs: [
      'A second technical opinion, written down. What to build, what to buy, what to retire, what the current system will cost to keep running, and where it will break first.',
      'Sometimes the useful answer is that the system you have is fine and the problem is a process. We would rather tell you that than sell a rebuild.',
    ],
    whoItsFor: [
      'Schools and companies planning a system before committing budget',
      'Organisations deciding between building and buying',
      'Teams who inherited a system nobody fully understands',
      'Anyone who needs a technical review before signing with a vendor',
    ],
    deliverables: [
      'Current-state review and risk list',
      'Target architecture with the trade-offs stated',
      'Build-versus-buy recommendation',
      'Phased plan with effort estimates',
      'Code and infrastructure review notes',
      'Vendor proposal assessment',
    ],
    howWeWork: [
      'We read the code and talk to the people who use the system daily.',
      'Recommendations name the trade-off, including what you give up.',
      'The deliverable is a document your team can act on without us.',
    ],
    technologies: ['architecture review', 'Docker', 'Linux', 'MySQL', 'MongoDB'],
    relatedWork: ['school-erp-platform', 'iot-monitoring-device'],
    relatedCourses: ['software-engineering-practice'],
  },
  {
    slug: 'deployment-devops-support',
    index: '11',
    title: 'Deployment, DevOps & Support',
    summary: 'Docker, Linux servers, CI/CD, monitoring and maintenance.',
    whatItIs: [
      'Getting a system onto a server and keeping it there: containers, a deployment pipeline, backups that have been restored at least once, monitoring, and someone to call when it stops.',
      'We work with local hosting and VPS setups as readily as with cloud platforms, which matters when data has to stay in the country or the budget is fixed.',
    ],
    whoItsFor: [
      'Teams whose deployment is a manual process one person remembers',
      'Organisations running a system with no monitoring and no tested backup',
      'Clients who want ongoing maintenance after a build',
    ],
    deliverables: [
      'Containerised application and reproducible builds',
      'CI/CD pipeline',
      'Server provisioning and hardening, with Nginx and TLS',
      'Backups, with a documented and tested restore',
      'Monitoring, logging and alerts',
      'Maintenance agreement and response expectations',
    ],
    howWeWork: [
      'A deployment is one command and can be rolled back.',
      'We restore a backup during setup. An untested backup is not a backup.',
      'Alerts go to a person who can act, and we keep them few enough to stay meaningful.',
      'Support terms are written down: what is covered, and how fast.',
    ],
    technologies: ['Docker', 'Linux', 'Nginx', 'CI/CD', 'Node.js', 'Python'],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['linux-git-docker', 'software-engineering-practice'],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);
