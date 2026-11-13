/**
 * The eighteen service lines. Each one renders a row on the home page and
 * /services, and a detail page at /services/[slug].
 *
 * `relatedWork` and `relatedCourses` hold slugs resolved at build time against
 * src/content/work/*.mdx and src/content/courses/*.mdx. A slug that does not
 * match any file is dropped rather than rendered as a dead link.
 *
 * Technologies lists stay inside the stack the team has actually used — see
 * the note at the top of src/content/technologies.ts. An aspirational stack is
 * a lie with extra steps.
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
    slug: 'web-development',
    index: '01',
    title: 'Web Development',
    summary: 'Sites and web apps that hold up on a mid-range phone, not just a laptop.',
    whatItIs: [
      'A website is usually the first contact a customer has with a business. It has to say what the company does in the first few seconds, open on the connection people actually have, and stay usable when the screen is 5 inches wide.',
      'We build the front end, the server behind it and the database underneath. Sometimes that means a new site from scratch; sometimes we take over a codebase someone else started and bring it back to something a team can maintain.',
    ],
    whoItsFor: [
      'Businesses whose site was built once and untouched since',
      'Teams that need a customer portal or dashboard next to an existing system',
      'Anyone who has been quoted a redesign but cannot tell what the old one is missing',
    ],
    deliverables: [
      'Responsive site or web application',
      'Page templates and a content structure your team can edit',
      'Forms, sign-in and permissions where the workflow needs them',
      'Image handling, lazy loading and caching so it opens quickly',
      'Keyboard and screen-reader support, checked before launch',
      'Deployment, analytics and a handover conversation',
    ],
    howWeWork: [
      'Scope is written down first: what each page is for, and which pages we do not need.',
      'Testing happens on cheap Android phones and a throttled connection, because that is the audience.',
      'You own the repository and the hosting accounts throughout. Nothing is held in our name.',
    ],
    technologies: [
      'React.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Node.js',
      'MySQL',
      'Docker',
    ],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['full-stack-web-development', 'programming-foundations'],
  },
  {
    slug: 'ai-machine-learning',
    index: '02',
    title: 'AI & Machine Learning',
    summary:
      'Models for recognition and prediction, with the error cases reported next to the score.',
    whatItIs: [
      'A model is one way to solve a problem — usually not the first thing to try. When a few rules and a lookup table do the job, that is what we build, and you keep the budget the training would have eaten.',
      'When a model genuinely earns its place, the work is mostly unglamorous: collecting enough examples, labelling them consistently, deciding what counts as correct, and measuring honestly afterwards. Recognition of faces, reading documents, sorting images, flagging odd rows in a stream of records.',
    ],
    whoItsFor: [
      'Teams with a visual or classification task done by hand every week',
      'Anyone sitting on data nobody has time to review',
      'Projects that need recognition running on modest hardware, close to the data',
    ],
    deliverables: [
      'A written accuracy target, agreed before any training starts',
      'Data collection and labelling plan',
      'The model itself, with the numbers we measured on real examples',
      'An inference service behind an API',
      'A watch for drift, plus a list of the cases it gets wrong',
    ],
    howWeWork: [
      'The success criterion comes before the training run, in writing, so nobody argues about it later.',
      'Error cases are reported alongside the headline figure. A 97% that fails on one skin tone or one lighting condition is not 97%.',
      'If a release misses the target we say so. Shipping quietly is worse than delaying.',
    ],
    technologies: [
      'Python',
      'Machine learning',
      'Computer vision',
      'Face recognition',
      'FastAPI',
      'MySQL',
    ],
    relatedWork: ['face-recognition-attendance', 'secure-online-examination-grading'],
    relatedCourses: ['intro-ai-ml-computer-vision'],
  },
  {
    slug: 'embedded-systems-iot',
    index: '03',
    title: 'Embedded Systems & IoT',
    summary:
      'Firmware and sensors for devices nobody stands next to, plus the dashboard behind them.',
    whatItIs: [
      'A device that measures something and reports it: firmware on a microcontroller, a couple of sensors, a link to the network, and a dashboard where the readings land and alerts go out.',
      'Hardware punishes shortcuts. Power fails, connections drop, sensors drift, and there is no user to restart anything. The firmware has to notice and recover on its own, and it has to keep a record of what happened while nobody was watching.',
    ],
    whoItsFor: [
      'Businesses monitoring equipment, cold rooms, generators or utilities',
      'Schools and institutions building with hardware',
      'Projects that need a working prototype before anyone commits to a production run',
    ],
    deliverables: [
      'Firmware for ESP32, Arduino or Raspberry Pi targets',
      'Sensor selection, wiring notes and the calibration procedure',
      'Message schema and connectivity, usually MQTT',
      'Ingestion service and storage for the readings',
      'Dashboard with history, thresholds and alerts',
      'Power and enclosure recommendations',
    ],
    howWeWork: [
      'Breadboard first. We prove the measurement on the bench before designing a board around it.',
      'Readings are buffered on the device and sent when the link returns — an outage should cost data, not a gap in the chart.',
      'Schematics, pinouts and calibration steps are handed over with the code, so your engineer can service it.',
    ],
    technologies: [
      'C/C++',
      'MicroPython',
      'Arduino',
      'ESP32',
      'Raspberry Pi',
      'MQTT',
      'Sensors',
      'Linux',
    ],
    relatedWork: ['iot-monitoring-device'],
    relatedCourses: ['embedded-systems-arduino-esp32', 'iot-sensors-connectivity-dashboards'],
  },
  {
    slug: 'mobile-app-development',
    index: '04',
    title: 'Mobile App Development',
    summary: 'Flutter apps that share one API and one set of rules with your web application.',
    whatItIs: [
      'Apps for the phone in your hand: Flutter on Android, iOS where the product needs it, both talking to the same API as the web version so a rule cannot drift between the two.',
      'The audience here is a mid-range Android on a connection that comes and goes. That shapes everything — small payloads, work that continues offline, and no screen that assumes a fast network to show anything at all.',
    ],
    whoItsFor: [
      'Businesses whose users are on phones rather than desks',
      'Field teams replacing a desktop-only tool with something that works on site',
      'Products that need both a dashboard and a client app',
    ],
    deliverables: [
      'Flutter app for Android, and iOS where it is required',
      'Shared API and sign-in with the web application',
      'Offline-tolerant behaviour where the workflow demands it',
      'Notifications only where they earn the interruption',
      'Store listing assets and a release routine',
    ],
    howWeWork: [
      'First release covers the one workflow that matters. The rest arrives after real people have used it.',
      'Business rules stay on the server, so an app that has not updated cannot write wrong data.',
      'Crashes are logged and read by us, not discovered by your users in a store review.',
    ],
    technologies: ['Flutter', 'TypeScript', 'React.js', 'Node.js', 'MySQL', 'MongoDB'],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['flutter-mobile-development', 'full-stack-web-development'],
  },
  {
    slug: 'cloud-computing-solutions',
    index: '05',
    title: 'Cloud Computing & Solutions',
    summary:
      'Infrastructure you can rebuild from a file, and a backup that has been restored once.',
    whatItIs: [
      'Getting a system onto machines that can be replaced: servers described in configuration rather than remembered, storage that is not a single disk, and a deploy that does not depend on one engineer being awake.',
      'We are as comfortable on a local VPS as on a big cloud platform, which matters when the data has to stay in the country or the invoice has to stay predictable. The recommendation comes with the monthly cost next to it.',
    ],
    whoItsFor: [
      'Teams whose system lives on a server nobody has documented',
      'Organisations moving off one machine, or a laptop under a desk',
      'Products expecting growth that a single box cannot absorb',
    ],
    deliverables: [
      'Environment design with the running cost written down',
      'Containerised application and builds anyone can reproduce',
      'Storage and backups, with a restore we perform during setup',
      'TLS, DNS and domain configuration',
      'Monitoring and alerting that reach someone on duty',
      'A runbook for the operations your own team will run',
    ],
    howWeWork: [
      'Infrastructure goes into files and is applied by a command, so staging and production stop disagreeing.',
      'Data residency is settled with you in writing before anything is stored — where it lives, and where the backups live.',
      'We size for today, then show what the next tier costs so the bill never arrives as a surprise.',
    ],
    technologies: ['Docker', 'Linux', 'Nginx', 'CI/CD', 'MySQL', 'MongoDB', 'Object storage'],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['linux-git-docker'],
  },
  {
    slug: 'database-design-management',
    index: '06',
    title: 'Database Design & Management',
    summary: 'Schemas and migrations for records that have to still be correct in three years.',
    whatItIs: [
      'The part of a system nobody sees until it hurts: what an entity is, how it relates to the others, which rules the database enforces by itself, and what happens when two people edit the same record on a Friday afternoon.',
      'Slow applications are usually a data model that outgrew its first design. We read the queries and the joins before proposing anything, and we move live data with a route back.',
    ],
    whoItsFor: [
      'Systems that have slowed down as the record count climbed',
      'Teams about to launch who want the schema right the first time',
      'Organisations whose real data still lives in spreadsheets',
    ],
    deliverables: [
      'Entity-relationship model and the schema to match',
      'Constraints, indexes and a query review',
      'Migration scripts with a rollback we have rehearsed',
      'Backup schedule, and a restore we have actually completed',
      'Access roles set to least privilege',
      'A data dictionary written for your team, not for us',
    ],
    howWeWork: [
      'The model starts from your real records, including the exceptions people handle by hand today.',
      'Migrations run against a copy first; row counts are reconciled before and after.',
      'Indexes come from measured slow queries, never from suspicion.',
      'Schema and application change ship together, so the two cannot disagree in production.',
    ],
    technologies: ['MySQL', 'MongoDB', 'Node.js', 'Python', 'Docker', 'Linux'],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['backend-engineering'],
  },
  {
    slug: 'ui-ux-design',
    index: '07',
    title: 'UI/UX Design',
    summary: 'Flows and screens worked out on a real phone, before anyone writes code.',
    whatItIs: [
      'Design here means deciding what a screen is for: the route through a task, what belongs on the page, what the user sees when it fails, and how much of it survives a 5-inch display.',
      'We draw against the constraints that actually apply — small screens, shared devices, patchy data, people who did not read the manual — rather than a desktop mockup photographed on a phone.',
    ],
    whoItsFor: [
      'Teams that need the flows settled before a build starts',
      'Internal tools where staff repeat a task forty times a day and every extra tap is paid for',
      'Products whose interface grew feature by feature with nobody steering',
    ],
    deliverables: [
      'Task flows and the information architecture',
      'Wireframes for the screens that carry the work',
      'Interface design and a component library',
      'A clickable prototype to review before development',
      'Empty, loading and error states — specified, not left to chance',
      'A keyboard and contrast check against WCAG AA',
    ],
    howWeWork: [
      'We sit with or watch the people doing the task today before drawing the new version.',
      'Reviews happen on a real phone, not only in an artboard on a wide monitor.',
      'Every state gets designed, including the boring failure ones.',
      'Development receives tokens and components, so what is built matches what was drawn.',
    ],
    technologies: [
      'Tailwind CSS',
      'React.js',
      'TypeScript',
      'Prototyping',
      'Accessibility (WCAG)',
    ],
    relatedWork: ['school-erp-platform', 'secure-online-examination-grading'],
    relatedCourses: ['full-stack-web-development'],
  },
  {
    slug: 'devops-cicd',
    index: '08',
    title: 'DevOps & CI/CD',
    summary: 'Deploys that are one command and can be undone in one more.',
    whatItIs: [
      'Releases should not be a ritual one engineer performs from memory. We build the ordinary version: code in one place, checks that run on every change, containers, environments that match, and a rollback nobody has to improvise.',
      'After the release comes the part people skip — logs you can read at 2am, alerts that reach someone who can act, and a backup that has been restored at least once.',
    ],
    whoItsFor: [
      'Teams whose deployment is a checklist in one person’s head',
      'Organisations shipping often enough that manual steps have become the risk',
      'Projects where nothing merges until the checks pass',
    ],
    deliverables: [
      'CI pipeline running lint, tests and build on every change',
      'Containerised application with reproducible builds',
      'Deploy and rollback scripts',
      'Configuration kept out of the code and out of the repository',
      'Logging, monitoring and alerts that stay few enough to matter',
      'A written release and hotfix procedure',
    ],
    howWeWork: [
      'The pipeline starts with the checks you already run by hand and grows from there.',
      'Secrets stay outside the repository and are rotated when people move on.',
      'Support terms are written before the first outage, not during one.',
    ],
    technologies: ['Docker', 'Linux', 'Nginx', 'CI/CD', 'Node.js', 'Python', 'Git'],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['linux-git-docker', 'software-engineering-practice'],
  },
  {
    slug: 'cybersecurity',
    index: '09',
    title: 'Cybersecurity',
    summary: 'The review that finds the gap while it is still ours to fix.',
    whatItIs: [
      'A close look at how a system can be reached: how people sign in, what a session can do, which endpoint forgot its permission check, what is stored, and where secrets are kept.',
      'The incidents we see are rarely sophisticated. A default password, an endpoint with no authorisation, a dependency nobody updated for two years. We list what we find in order of real risk and work through the fixes with you.',
    ],
    whoItsFor: [
      'Organisations handling payments, student records or personal data',
      'Teams preparing for a review, a procurement process or a compliance question',
      'Anyone who inherited a system and cannot answer what is exposed',
    ],
    deliverables: [
      'Threat model covering the system and the data it holds',
      'Review of authentication, authorisation and session handling',
      'TLS, headers and cookies hardened',
      'Dependency and configuration audit, prioritised',
      'Retention and access-policy recommendations',
      'A retest afterwards, with what was closed and what was accepted',
    ],
    howWeWork: [
      'Scope and rules of engagement are agreed in writing before we touch anything.',
      'Findings are ordered by what they would actually cost you, not by a raw score.',
      'No production data is accessed without an explicit instruction from you.',
    ],
    technologies: [
      'Threat modelling',
      'Secure authentication',
      'TLS & Nginx hardening',
      'Audit logging',
      'Dependency scanning',
      'Linux',
    ],
    relatedWork: ['secure-online-examination-grading', 'digital-wallet-payments'],
    relatedCourses: ['software-engineering-practice'],
  },
  {
    slug: 'it-consulting-support',
    index: '10',
    title: 'IT Consulting & Support',
    summary: 'A second opinion on the plan, then someone who picks up when it breaks.',
    whatItIs: [
      'Advice with no build attached: what to keep, what to retire, what a vendor is actually proposing, and what running the current system will cost for another two years.',
      'After launch it becomes support — a written agreement saying what is covered, how to report a problem, and how fast we respond, so maintenance stops depending on goodwill.',
    ],
    whoItsFor: [
      'Schools and companies pricing a system before committing the budget',
      'Anyone comparing a vendor proposal against what they really need',
      'Teams running something in production with no maintenance agreement',
    ],
    deliverables: [
      'Current-state review and a risk list in priority order',
      'Build-versus-buy recommendation, with the reasoning',
      'Vendor proposal read critically, in plain language',
      'Maintenance agreement: scope, response times, exclusions',
      'Documentation of the system as it stands today',
    ],
    howWeWork: [
      'We read the code and then talk to the people who use it every day.',
      'Every recommendation names what you give up, not only what you gain.',
      'When the honest answer is to keep what you have, that is the answer you get.',
    ],
    technologies: [
      'Architecture review',
      'Docker',
      'Linux',
      'Monitoring & alerts',
      'Documentation',
    ],
    relatedWork: ['iot-monitoring-device', 'school-erp-platform'],
    relatedCourses: ['software-engineering-practice'],
  },
  {
    slug: 'software-engineering',
    index: '11',
    title: 'Software Engineering',
    summary: 'Built to be maintained by whoever inherits it — including your own team.',
    whatItIs: [
      'The full job: data model, business rules, API, interface, the tests that protect the logic, and the deployment that puts it in front of users.',
      'What separates it from writing code is everything around it — requirements understood before they are coded, tests on the paths that would hurt, someone reading the diff, and notes written for the person who arrives after you.',
    ],
    whoItsFor: [
      'Organisations turning a manual process into a system',
      'Teams that need engineers alongside their own for a stretch',
      'Existing systems that work but cannot be changed safely',
    ],
    deliverables: [
      'Requirements and scope written before the build',
      'A codebase the next developer can read',
      'Automated tests around the logic that would hurt if it broke',
      'Review before merge, on every change',
      'Technical documentation and a handover session',
    ],
    howWeWork: [
      'We map the current process first, including the parts people quietly work around.',
      'Scope is agreed in writing, then delivered in slices you can use and review.',
      'Coverage targets are not the goal; not breaking payments or grades is.',
      'Handover includes the repository, the credentials and the documentation. No lock-in.',
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
      'Docker',
    ],
    relatedWork: ['school-erp-platform', 'secure-online-examination-grading'],
    relatedCourses: ['software-engineering-practice', 'backend-engineering'],
  },
  {
    slug: 'api-development-integration',
    index: '12',
    title: 'API Development & Integration',
    summary: 'Documented endpoints, and retry logic that survives a timeout on the other side.',
    whatItIs: [
      'Interfaces between systems: an HTTP API your own clients and your partners can call, plus connections to the services you already pay for — payments, messaging, identity.',
      'Failure is the interesting part. A request that timed out may still have succeeded over there, which is how customers get charged twice. Idempotency keys, retries and reconciliation belong in the design, not in a later patch.',
    ],
    whoItsFor: [
      'Teams exposing functionality to a mobile client or a partner',
      'Businesses connecting a new platform to the tools already in use',
      'Products that need a documented API for third parties',
    ],
    deliverables: [
      'Endpoint design, with versioning and naming agreed first',
      'Documentation with example requests and the errors explained',
      'Authentication and rate limiting',
      'Webhooks that are signed and safe to replay',
      'Idempotent retries and reconciliation for anything involving money',
      'A sandbox and an integration guide for partners',
    ],
    howWeWork: [
      'The contract is written and reviewed before the handler is.',
      'Errors return a code a caller can branch on, not a 500 with a stack trace.',
      'We test against provider sandboxes, including the responses nobody plans for.',
    ],
    technologies: ['Node.js', 'Python', 'FastAPI', 'TypeScript', 'MySQL', 'Docker'],
    relatedWork: ['digital-wallet-payments', 'school-erp-platform'],
    relatedCourses: ['backend-engineering'],
  },
  {
    slug: 'robotics-automation',
    index: '13',
    title: 'Robotics & Automation',
    summary: 'Machines that do the repetitive physical step, with a hand on the override.',
    whatItIs: [
      'Systems that act rather than only measure: reading sensors, deciding from a rule or a model, and driving motors, relays or valves to take over work a person repeats all day.',
      'Physical machines fail differently from software. A jam or a power cut at the wrong moment is a safety problem, so limits, interlocks and a defined safe state are part of the design rather than a later addition.',
    ],
    whoItsFor: [
      'Production and processing lines with a repetitive manual step',
      'Operations that need counting or sorting done the same way every time',
      'Institutions building teaching or research rigs',
    ],
    deliverables: [
      'Control logic and the state machine for the process',
      'Sensor selection, mounting and calibration',
      'Actuator and driver selection, with the power budget',
      'Firmware with manual and automatic modes',
      'An operator interface that reports faults in plain language',
      'Commissioning notes and a maintenance routine',
    ],
    howWeWork: [
      'Each stage is proven on the bench before it is allowed to move anything that can break.',
      'Every automatic action has a manual override, and the safe state is decided before commissioning.',
      'Where the consequence justifies it, the interlock is wired in hardware rather than left in code.',
      'We report the cycle time we actually achieved on your line, not the one from a datasheet.',
    ],
    technologies: [
      'C/C++',
      'MicroPython',
      'Arduino',
      'ESP32',
      'Raspberry Pi',
      'Sensors',
      'MQTT',
      'Linux',
    ],
    relatedWork: ['iot-monitoring-device'],
    relatedCourses: ['embedded-systems-arduino-esp32'],
  },
  {
    slug: 'data-science-analytics',
    index: '14',
    title: 'Data Science & Analytics',
    summary:
      'One pipeline and one definition per number, instead of a spreadsheet rebuilt monthly.',
    whatItIs: [
      'Records scattered across systems turned into figures people trust: something that pulls the data, applies the agreed definitions, and puts the result on a dashboard or in a report on a schedule.',
      'Most reporting pain is definitional rather than technical. When two departments count the same thing differently they will disagree forever, so the definitions get written down before any dashboard is built.',
    ],
    whoItsFor: [
      'Finance and operations teams rebuilding the same report every month',
      'Schools and programmes reporting upward to a district or a donor',
      'Organisations whose data sits in four tools with no single view',
    ],
    deliverables: [
      'Pipeline from the source systems into one store',
      'Metric definitions written and agreed with the people who use them',
      'Dashboard with history and filters',
      'Scheduled reports by email or export',
      'Checks that flag missing or implausible records instead of hiding them',
      'Documentation of sources, refresh times and known gaps',
    ],
    howWeWork: [
      'The first report is reconciled against the spreadsheet you already trust.',
      'Definitions live beside the code, so a number cannot change without a record of who changed it.',
      'Incomplete data is shown as incomplete — never as a quiet zero.',
      'We start with the three figures that drive decisions, not with every field available.',
    ],
    technologies: ['Python', 'FastAPI', 'Node.js', 'MySQL', 'MongoDB', 'Machine learning'],
    relatedWork: ['school-erp-platform', 'face-recognition-attendance'],
    relatedCourses: ['backend-engineering', 'programming-foundations'],
  },
  {
    slug: 'blockchain-development',
    index: '15',
    title: 'Blockchain Development',
    summary: 'Smart contracts and wallets, where an auditable record is genuinely required.',
    whatItIs: [
      'Contracts and services for systems where the record has to be tamper-evident or value has to move under rules nobody can quietly amend: deployed contracts, wallet integration, and the application around them.',
      'We will also tell you when a chain is the wrong answer. Code on a public network is hard to reverse and expensive to get wrong, and a signed database with a good audit log solves a lot of problems with far less risk.',
    ],
    whoItsFor: [
      'Projects that need verifiable records or programmable settlement',
      'Loyalty or token ideas with a real use behind them, not a pitch',
      'Teams integrating with a chain or wallet that already exists',
    ],
    deliverables: [
      'A written decision on whether a chain belongs in the design at all',
      'Contract code with unit and property tests',
      'Test-network deployment and a review before anything goes live',
      'Wallet integration and the transaction signing flow',
      'Chain events indexed into your own database',
      'Runbook for upgrades, pauses and incidents',
    ],
    howWeWork: [
      'Value-bearing code gets a review and a run on a test network before deployment.',
      'Tests cover the failure paths: reverts, front-running, and permissions set backwards.',
      'Keys are handled by your team under a documented procedure. We never hold them casually.',
    ],
    technologies: ['Solidity', 'EVM toolchains', 'Node.js', 'TypeScript', 'MySQL', 'Docker'],
    relatedWork: ['digital-wallet-payments'],
    relatedCourses: ['backend-engineering'],
  },
  {
    slug: 'network-engineering',
    index: '16',
    title: 'Network Engineering',
    summary:
      'Cabling plans, Wi-Fi that reaches the back room, and the reason it keeps dropping.',
    whatItIs: [
      'The layer everything else assumes: addressing, switching, wireless coverage, links between sites, VPNs for remote staff, and firewall rules that let the right traffic through and little else.',
      'Half the work is diagnosis. Intermittent drops, two devices fighting over an address, a switch that is fine until it warms up. We measure the path, find where it breaks, and write down what changed.',
    ],
    whoItsFor: [
      'Organisations moving into a new office or adding a second site',
      'Schools and campuses where Wi-Fi fails in specific rooms',
      'Teams that need staff reaching internal systems securely from outside',
    ],
    deliverables: [
      'Network design: addressing, VLANs and switching',
      'Wireless survey and access-point placement',
      'Firewall and VPN configuration, documented as we go',
      'Equipment and cabling schedule for the installer',
      'Monitoring for link status, latency and packet loss',
      'Diagrams and configuration backups your team can use',
    ],
    howWeWork: [
      'We survey and measure the site before recommending any hardware.',
      'Rules are documented as they are written — an undocumented firewall becomes a future outage.',
      'Changes go in during a maintenance window, with the previous configuration kept.',
    ],
    technologies: [
      'TCP/IP',
      'VLANs & switching',
      'Wi-Fi design',
      'VPN & remote access',
      'Linux',
      'Nginx',
    ],
    relatedWork: ['iot-monitoring-device'],
    relatedCourses: ['linux-git-docker'],
  },
  {
    slug: 'system-architecture',
    index: '17',
    title: 'System Architecture',
    summary: 'The shape of the system decided while changing it is still cheap.',
    whatItIs: [
      'Decisions that get expensive later, taken early: what the components are, how they talk, where the data lives, what fails, and how one failure stays contained instead of taking the site with it.',
      'Sometimes the useful conclusion is that what you have is fine and the real problem sits elsewhere — in a process, or in one badly chosen table. We would rather say that than sell a rebuild.',
    ],
    whoItsFor: [
      'Teams about to build something expected to run for years',
      'Organisations weighing build against buy',
      'Systems that have outgrown the first design and are being worked around daily',
    ],
    deliverables: [
      'Current-state review and a list of what is at risk',
      'Target architecture, trade-offs stated openly',
      'Data model and the boundaries between services',
      'Plan for scaling, failure and recovery',
      'Build-versus-buy recommendation',
      'Phased plan with effort estimates',
    ],
    howWeWork: [
      'We read the existing code and speak to the people who use the system daily.',
      'Every choice is recorded with what it costs, not only what it buys.',
      'The output is a document your team can act on without calling us back.',
      'It is revisited after the first slice, because that is when reality corrects the diagram.',
    ],
    technologies: [
      'System architecture',
      'Data modelling',
      'API design',
      'Performance & scaling',
      'Docker',
      'MySQL',
      'MongoDB',
    ],
    relatedWork: ['school-erp-platform', 'iot-monitoring-device'],
    relatedCourses: ['software-engineering-practice'],
  },
  {
    slug: 'business-process-automation',
    index: '18',
    title: 'Business Process Automation',
    summary:
      'The Friday spreadsheet, the monthly report, the approval chased on WhatsApp — gone.',
    whatItIs: [
      'Removing the manual steps between systems that ought to already talk: the file copied by hand every Friday, the report rebuilt on the 1st, the approval that depends on somebody remembering.',
      'The work is usually small and specific — one internal tool, one scheduled job, one integration. That is why we time the manual version first: if the step takes four minutes a week, it is not worth automating.',
    ],
    whoItsFor: [
      'SMEs running operations across several disconnected tools',
      'Finance and operations teams rebuilding the same report every month',
      'Teams whose approvals live in a chat thread nobody can search',
    ],
    deliverables: [
      'Process map with the manual steps marked',
      'Internal tools for the people doing the work',
      'Scheduled jobs, notifications and escalations',
      'Integrations between the systems you already have',
      'A defined path for when the job fails',
      'A written procedure for the new flow',
    ],
    howWeWork: [
      'We time the manual version before automating it, and skip the ones that are not worth it.',
      'The machine does the repetitive part; the judgement call stays with a person.',
      'A failed job notifies someone. Silence is worse than no automation at all.',
      'The new flow runs beside the old one until the numbers agree for a few weeks.',
    ],
    technologies: ['Python', 'Node.js', 'TypeScript', 'FastAPI', 'MySQL', 'Docker', 'Linux'],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['backend-engineering', 'linux-git-docker'],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);
