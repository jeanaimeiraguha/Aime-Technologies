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
    summary: 'Websites, web applications and portals that load fast on a mid-range phone.',
    whatItIs: [
      'The site or application is usually the first thing a customer sees of a business, so it has to say what the company does, load on the connection people actually have, and work on a mid-range Android phone rather than only on a laptop.',
      'We build the interface, the server behind it and the database underneath — or we join an existing codebase and bring it up to standard. Either way the result is something the next developer can read.',
    ],
    whoItsFor: [
      'Businesses whose current site was built once and never touched again',
      'Teams that need a customer-facing portal or dashboard next to an existing system',
      'Organisations that need a platform load-tested before a campaign or intake period',
    ],
    deliverables: [
      'Responsive site or web application',
      'Content structure and page templates',
      'Forms, authentication and role-based access where needed',
      'Performance work: image handling, lazy loading, caching',
      'Accessibility and keyboard support built in',
      'Deployment, analytics wiring and a handover document',
    ],
    howWeWork: [
      'We write down what each page is for before designing it, and cut the pages that do not earn their place.',
      'We test on real low-end devices and throttled connections, not only on a laptop on office Wi-Fi.',
      'Content edits do not need a developer — templates are set up so your team can publish.',
      'You get the repository, the credentials and the documentation at the end. No lock-in.',
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
      'Models for recognition, prediction and classification, with the results measured.',
    whatItIs: [
      'Models applied to a defined task: recognise a face, read a document, sort an image, flag an anomaly in a stream of records. The task comes first — the model is one way of solving it, not the answer in itself.',
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
      'Firmware, sensors and connectivity for devices that run unattended, plus the dashboards behind them.',
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
    summary:
      'Flutter applications for Android and iOS, sharing one API with your web application.',
    whatItIs: [
      'Applications for the devices people carry: a Flutter client for Android, and iOS where the product needs it, built against the same API as the web version so behaviour does not drift between them.',
      'In practice the users are on a mid-range Android phone with a connection that comes and goes, so offline-tolerant behaviour and small payloads are part of the design rather than a later optimisation.',
    ],
    whoItsFor: [
      'Businesses whose users work from phones rather than desks',
      'Field teams replacing a desktop-only tool with something usable on site',
      'Platforms that need both a web dashboard and a client app',
    ],
    deliverables: [
      'Flutter application for Android, and iOS where required',
      'Shared API and authentication with the web application',
      'Offline-tolerant behaviour where the workflow needs it',
      'Push notifications where they earn their place',
      'Store submission assets and a release process',
    ],
    howWeWork: [
      'We test on real low-end devices and throttled connections, not only a laptop.',
      'We keep the client thin and the rules on the server, so a stale app cannot corrupt data.',
      'A first release is scoped to the workflow that matters, not to every feature on the list.',
      'Crashes and failures are logged so problems are found by us, not by your users.',
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
      'Infrastructure, migration, backups and scaling for systems that have to stay available.',
    whatItIs: [
      'Getting a system onto infrastructure that can be rebuilt: servers provisioned from scripts or containers, storage that is not on a single disk, and a deployment that does not depend on one person remembering a step.',
      'We work with local hosting and VPS setups as readily as with cloud platforms, which matters when data has to stay in the country or the budget is fixed. The recommendation names the cost as well as the capability.',
    ],
    whoItsFor: [
      'Teams whose system runs on a server nobody has documented',
      'Organisations moving off a single machine or a laptop under a desk',
      'Projects that need capacity to grow without a rebuild',
    ],
    deliverables: [
      'Environment design with the cost estimate written down',
      'Containerised application and reproducible builds',
      'Storage, backup and a restore that has been tested',
      'TLS, DNS and domain configuration',
      'Monitoring, logging and alerting',
      'Runbook for the operations your team will perform',
    ],
    howWeWork: [
      'Infrastructure is described in files and applied by a command, so environments match.',
      'We restore a backup during setup. An untested backup is not a backup.',
      'We size for the load you have, then show what the next step costs before you need it.',
      'Data residency and where backups live are decided with you, in writing.',
    ],
    technologies: ['Docker', 'Linux', 'Nginx', 'CI/CD', 'MySQL', 'MongoDB', 'Object storage'],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['linux-git-docker'],
  },
  {
    slug: 'database-design-management',
    index: '06',
    title: 'Database Design & Management',
    summary: 'Data models, migrations, query tuning and backups for records you cannot lose.',
    whatItIs: [
      'The part of a system that decides whether it is still correct in three years: what an entity is, how it relates to the others, which rules the database enforces itself, and what happens when two people edit the same record.',
      'Most slow applications are a data model that outgrew its first design. We read the queries, the joins and the indexes before proposing anything else, and we migrate live data with a way back.',
    ],
    whoItsFor: [
      'Systems whose queries have slowed as records accumulated',
      'Teams about to launch and wanting the schema right the first time',
      'Organisations holding data in spreadsheets that need a real model',
    ],
    deliverables: [
      'Entity-relationship model and schema',
      'Constraints, indexes and query review',
      'Migration scripts with a documented rollback',
      'Backup schedule with a tested restore',
      'Access roles and least-privilege configuration',
      'Data dictionary your team can read without us',
    ],
    howWeWork: [
      'We model from the real records you keep today, including the exceptions people handle manually.',
      'Migrations run against a copy first, with row counts reconciled before and after.',
      'Indexes are added against measured slow queries, not on suspicion.',
      'Schema changes ship with the application change that needs them, so the two never disagree.',
    ],
    technologies: ['MySQL', 'MongoDB', 'Node.js', 'Python', 'Docker', 'Linux'],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['backend-engineering'],
  },
  {
    slug: 'ui-ux-design',
    index: '07',
    title: 'UI/UX Design',
    summary: 'Flows, wireframes and interfaces designed around real users and real devices.',
    whatItIs: [
      'Design that decides what the screen is for before deciding what it looks like: the flow through a task, what is on the page, what happens when something goes wrong, and what the user sees on a 5-inch screen.',
      'We design against the constraints that matter here — small screens, shared devices, intermittent connections and users who did not read the manual — rather than a desktop mockup scaled down.',
    ],
    whoItsFor: [
      'Teams building a first version and needing the flows settled before code',
      'Products where staff use the system all day and every extra click is paid for',
      'Organisations whose interface has grown feature by feature with no design',
    ],
    deliverables: [
      'Task flows and information architecture',
      'Wireframes for the screens that matter',
      'Interface design and component library',
      'Interactive prototype for review before build',
      'Empty, loading and error states, specified',
      'Accessibility review against keyboard and contrast requirements',
    ],
    howWeWork: [
      'We watch or ask how the task is done today before drawing the new version.',
      'Design is reviewed on a real phone, not only in a desktop artboard.',
      'Every state is designed — empty, loading, failed — not only the happy path.',
      'The build receives a component library and tokens, so design and code stay aligned.',
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
    summary: 'Pipelines, containers and releases — deployment as one command, not one person.',
    whatItIs: [
      'A deployment should be one command that can be repeated and rolled back, not a set of steps one engineer remembers. We build that: version control, a pipeline, containers, and environments that match.',
      'It also includes what happens after release — logs you can read, alerts that reach someone who can act, and a backup that has been restored at least once.',
    ],
    whoItsFor: [
      'Teams whose deployment is a manual process one person remembers',
      'Organisations releasing often enough that manual steps are now a risk',
      'Projects that need review and checks before code reaches production',
    ],
    deliverables: [
      'CI pipeline: lint, tests and build on every change',
      'Containerised application with reproducible builds',
      'Deployment and rollback scripts',
      'Environment configuration kept out of the code',
      'Logging, monitoring and alerts',
      'Written release and hotfix procedure',
    ],
    howWeWork: [
      'Pipelines start with the checks you already run by hand and grow from there.',
      'A deployment is one command and can be rolled back in one more.',
      'Alerts go to a person who can act, and we keep them few enough to stay meaningful.',
      'Secrets live outside the repository and are rotated when people leave.',
    ],
    technologies: ['Docker', 'Linux', 'Nginx', 'CI/CD', 'Node.js', 'Python', 'Git'],
    relatedWork: ['school-erp-platform', 'digital-wallet-payments'],
    relatedCourses: ['linux-git-docker', 'software-engineering-practice'],
  },
  {
    slug: 'cybersecurity',
    index: '09',
    title: 'Cybersecurity',
    summary:
      'Reviews, hardening and secure authentication — the gap found by us, not from outside.',
    whatItIs: [
      'A focused look at where a system can be reached: how people authenticate, what happens to a session, who can call which endpoint, what is stored and how secrets are kept.',
      'Most incidents we see come from ordinary omissions — an endpoint with no permission check, a default password, a dependency nobody updated. We find those, list them in order of risk, and fix them with you.',
    ],
    whoItsFor: [
      'Organisations handling payments, personal or student data',
      'Teams preparing for a review, procurement or compliance requirement',
      'Anyone who inherited a system and does not know what is exposed',
    ],
    deliverables: [
      'Threat model for the system and its data',
      'Review of authentication, authorisation and session handling',
      'Transport, header and cookie hardening, including TLS',
      'Dependency and configuration audit with a prioritised list',
      'Backup, retention and access-policy recommendations',
      'Retest after the fixes, with results written down',
    ],
    howWeWork: [
      'We agree scope and rules of engagement in writing before testing anything.',
      'Findings are ordered by real risk, not by CVSS score alone, with the fix named.',
      'We do not touch production data without your explicit instruction.',
      'Critical items are fixed first; the report records what was closed and what was accepted.',
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
    summary: 'A second technical opinion, a maintenance agreement, and someone who answers.',
    whatItIs: [
      'Advice without a build attached: what to keep, what to replace, what a proposed vendor is really offering, and what the current system will cost to run for another two years.',
      'After the build, support: a written agreement covering what is included, how fast we respond, and who to call — so maintenance does not depend on goodwill and memory.',
    ],
    whoItsFor: [
      'Schools and companies planning a system before committing budget',
      'Organisations comparing a vendor proposal against their actual needs',
      'Teams running a system with no maintenance agreement',
    ],
    deliverables: [
      'Current-state review and a prioritised risk list',
      'Build-versus-buy recommendation with reasons',
      'Vendor proposal assessment, in plain language',
      'Maintenance agreement: scope, response times, exclusions',
      'Documentation of the system as it stands',
    ],
    howWeWork: [
      'We read the code and talk to the people who use the system daily.',
      'Recommendations name the trade-off, including what you give up.',
      'Support terms are written before they are needed, not after an outage.',
      'If the right answer is to keep what you have, that is what we say.',
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
    summary:
      'Design, testing and delivery of software built to be maintained by the next team.',
    whatItIs: [
      'Engineering a system end to end: the data model, the business rules, the API, the interface, the tests that protect the logic, and the deployment that puts it in front of users.',
      'The distinction from simply writing code is what happens around it — requirements understood before they are coded, tests on the paths that would hurt, reviews, and documentation written for whoever comes next.',
    ],
    whoItsFor: [
      'Organisations replacing a manual process with a system',
      'Teams that need engineering capacity alongside their own',
      'Projects that already exist and need to be made dependable',
    ],
    deliverables: [
      'Requirements and scope written down before the build',
      'Codebase structured for the team that will inherit it',
      'Automated tests for the logic that matters',
      'CI pipeline with review before merge',
      'Technical documentation and a handover session',
    ],
    howWeWork: [
      'We map the current process first, including the parts people work around.',
      'We agree scope in writing, then build in slices you can use and review.',
      'We write tests for the logic that would hurt if it broke, not for coverage numbers.',
      'Everything is handed over: repository, credentials, documentation. No lock-in.',
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
    summary:
      'Documented APIs, third-party integrations and the retries that keep both sides honest.',
    whatItIs: [
      'Interfaces between systems: an HTTP API your applications and partners can call, and integrations with the services you already pay for — payment providers, messaging, mapping, identity.',
      'The hard part is failure. A request that times out may still have succeeded on the other side, so idempotency keys, retries and reconciliation are part of the design rather than an afterthought.',
    ],
    whoItsFor: [
      'Teams exposing functionality to a mobile client or a partner system',
      'Businesses connecting a new platform to existing tools',
      'Platforms that need a documented API for third parties',
    ],
    deliverables: [
      'API design with versioning and naming agreed up front',
      'Documented endpoints, with example requests and errors',
      'Authentication and rate limiting',
      'Webhooks with signing and replay protection',
      'Idempotent retries and reconciliation for money or state changes',
      'Sandbox and a partner-facing integration guide',
    ],
    howWeWork: [
      'We write the contract first and review it before building the handler.',
      'Every external call carries an idempotency key, so a timeout cannot apply twice.',
      'Errors return a code a caller can act on, not a 500 with a stack trace.',
      'We test against provider sandboxes, including the failure responses.',
    ],
    technologies: ['Node.js', 'Python', 'FastAPI', 'TypeScript', 'MySQL', 'Docker'],
    relatedWork: ['digital-wallet-payments', 'school-erp-platform'],
    relatedCourses: ['backend-engineering'],
  },
  {
    slug: 'robotics-automation',
    index: '13',
    title: 'Robotics & Automation',
    summary:
      'Control systems and actuation for repetitive physical work that should not be manual.',
    whatItIs: [
      'Machines that act, not only measure: reading sensors, deciding from a rule or a model, and driving motors, relays or valves to do work that a person currently repeats all day.',
      'Physical systems fail differently from software. A jam, a limit switch or a power cut at the wrong moment is a safety issue, so interlocks, limits and a safe stopped state are designed in from the start.',
    ],
    whoItsFor: [
      'Manufacturing and processing lines with a repetitive manual step',
      'Operations that need counting, sorting or sorting-and-recording done consistently',
      'Institutions building teaching or research rigs',
    ],
    deliverables: [
      'Control logic and state machine for the process',
      'Sensor selection, mounting and calibration',
      'Actuator and driver selection, with power budget',
      'Firmware and a manual/automatic mode switch',
      'Operator interface and fault reporting',
      'Commissioning notes and a maintenance procedure',
    ],
    howWeWork: [
      'We prove each stage on the bench before it controls anything that can break.',
      'Every automatic action has a manual override and a defined safe state.',
      'Limits and interlocks are hardware where the consequence justifies it, not only software.',
      'We measure the cycle time we actually achieve and report it.',
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
    summary: 'Pipelines, dashboards and scheduled reports nobody has to rebuild by hand.',
    whatItIs: [
      'Turning records scattered across systems into numbers people trust: one pipeline that pulls the data, applies agreed definitions, and presents them as a dashboard or a report on a schedule.',
      'Most reporting pain is definitional, not technical. Two departments calling the same figure by different names will disagree forever, so we write the definitions down before building anything.',
    ],
    whoItsFor: [
      'Finance and operations teams rebuilding the same report every month',
      'Schools and programmes reporting to a district or a donor',
      'Organisations with data in several tools and no single view',
    ],
    deliverables: [
      'Data pipeline from source systems to a single store',
      'Written metric definitions agreed with the people who use them',
      'Dashboard with history and filters',
      'Scheduled reports delivered by email or export',
      'Data quality checks that flag missing or implausible records',
      'Documentation of sources, refresh times and known gaps',
    ],
    howWeWork: [
      'We reconcile the first report against the spreadsheet you already trust.',
      'Definitions live with the code, so a figure cannot change without a change record.',
      'Where data is incomplete, the dashboard says so rather than showing a quiet zero.',
      'We start with the three numbers used in decisions, not with every field available.',
    ],
    technologies: ['Python', 'FastAPI', 'Node.js', 'MySQL', 'MongoDB', 'Machine learning'],
    relatedWork: ['school-erp-platform', 'face-recognition-attendance'],
    relatedCourses: ['backend-engineering', 'programming-foundations'],
  },
  {
    slug: 'blockchain-development',
    index: '15',
    title: 'Blockchain Development',
    summary:
      'Smart contracts, wallets and on-chain/off-chain integration with the risks stated.',
    whatItIs: [
      'Contracts and services for systems where a record must be tamper-evident or value must move under agreed rules: deployed contracts, a wallet integration, and the application around them.',
      'We are straightforward about the trade-off. Code on a public chain is hard to reverse and expensive to get wrong, so we tell you when a signed database and a good audit log solve the problem with less risk.',
    ],
    whoItsFor: [
      'Projects that need verifiable records or programmable settlement',
      'Teams exploring token or loyalty systems with a real use case',
      'Organisations that need an integration with an existing chain or wallet',
    ],
    deliverables: [
      'Requirements and a written decision on whether a chain is warranted',
      'Smart contract code with unit and property tests',
      'Test-network deployment and a review before mainnet',
      'Wallet integration and transaction signing flow',
      'Indexing of chain events into your application database',
      'Runbook for upgrades, pauses and incident response',
    ],
    howWeWork: [
      'We start by deciding whether the chain earns its place in the design.',
      'Contracts are tested against the failure paths — reverts, front-running, wrong permissions.',
      'Value-bearing changes go through a review and a test-network run before deployment.',
      'Keys and secrets are handled by you under a documented procedure, never shared casually.',
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
      'Wired and wireless network design, site connectivity and the diagnosis when it drops.',
    whatItIs: [
      'The layer everything else assumes: addressing, switching, wireless coverage, routing between sites, VPNs for remote staff, and a firewall policy that lets the right traffic through and nothing else.',
      'Half of the work is diagnosis. Intermittent drops, an address clash, a switch that is fine until it warms up — we measure the path, find where it breaks, and write down what changed.',
    ],
    whoItsFor: [
      'Organisations moving into a new office or adding a second site',
      'Schools and campuses with unreliable Wi-Fi in specific rooms',
      'Teams needing secure remote access to internal systems',
    ],
    deliverables: [
      'Network design: addressing, VLANs and switching',
      'Wireless survey and access-point placement plan',
      'Firewall rules and VPN configuration, documented',
      'Cabling and equipment schedule for the installer',
      'Monitoring for link status, latency and packet loss',
      'Diagram and configuration backup your team can use',
    ],
    howWeWork: [
      'We survey the site and measure before recommending hardware.',
      'Rules are documented as they are written — an undocumented firewall is a future outage.',
      'Changes are made in a maintenance window with a way back.',
      'We hand over diagrams, credentials and the configuration backups.',
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
    summary: 'Architecture reviews and target designs, with the trade-offs written down first.',
    whatItIs: [
      'Deciding the shape of a system before it is expensive to change: what the components are, how they talk, where the data lives, what fails and how the failure is contained.',
      'Often the useful answer is that the system you have is fine and the problem is somewhere else. We would rather tell you that than sell a rebuild.',
    ],
    whoItsFor: [
      'Teams about to build something they expect to run for years',
      'Organisations deciding between building and buying',
      'Projects that have outgrown their first design and keep working around it',
    ],
    deliverables: [
      'Current-state review and risk list',
      'Target architecture with the trade-offs stated',
      'Data model and API boundaries',
      'Scaling, failure and recovery strategy',
      'Build-versus-buy recommendation',
      'Phased plan with effort estimates',
    ],
    howWeWork: [
      'We read the code and talk to the people who use the system daily.',
      'Every choice is written with what it gives up as well as what it gains.',
      'The architecture is delivered as a document your team can act on without us.',
      'We revisit it after the first slice, because that is when reality corrects the diagram.',
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
      'Workflow automation and internal tools that remove the manual step done every week.',
    whatItIs: [
      'Removing the manual steps between systems that should already talk to each other: the spreadsheet copied by hand every Friday, the report rebuilt every month, the approval chased over WhatsApp.',
      'Usually the work is small and specific. One internal tool, one scheduled job, one integration, and a few hours a week come back — which is why we measure the manual version before automating it.',
    ],
    whoItsFor: [
      'SMEs running operations across several disconnected tools',
      'Finance and operations teams rebuilding the same report every month',
      'Teams whose approvals depend on someone remembering',
    ],
    deliverables: [
      'Process map with the manual steps identified',
      'Internal tools and dashboards for the people doing the work',
      'Scheduled jobs, notifications and escalations',
      'Integrations between existing systems',
      'Exception handling: what happens when the job fails',
      'Written procedure for the new flow',
    ],
    howWeWork: [
      'We measure how long the manual version takes before automating it.',
      'We automate the repetitive step and leave the judgement call to a person.',
      'Failures notify someone. A silent broken job is worse than no job.',
      'The new process runs alongside the old one until the numbers agree.',
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
