# Totally Ink — website

Marketing and academy site for Totally Ink: web, mobile, AI, cloud, data,
security and embedded engineering, and the training academy. Bugesera, Kigali,
Rwanda.

Next.js (App Router) · TypeScript · Tailwind CSS v4 · MDX content · fully static.

---

## Quick start

```bash
npm install
cp .env.example .env.local      # then fill in the values
npm run dev                     # http://localhost:3000
```

Node 20.9 or newer.

### Scripts

| Command                | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Development server with hot reload                  |
| `npm run build`        | Production build — 67 static pages                  |
| `npm start`            | Serve the production build                          |
| `npm run lint`         | ESLint (flat config, `eslint.config.mjs`)           |
| `npm run type-check`   | `tsc --noEmit`                                      |
| `npm run format`       | Prettier, writes in place                           |
| `npm run format:check` | Prettier, check only — use in CI                    |
| `npm run icons`        | Regenerate the PNG icon set from `src/app/icon.svg` |

All four gates (`lint`, `type-check`, `format:check`, `build`) pass with zero
errors and zero warnings.

---

## Environment variables

Every variable is `NEXT_PUBLIC_*`, meaning it is **inlined into the browser
bundle at build time**. Nothing here is secret, and nothing secret may be added.
There is no backend and no database.

| Variable                       | Required | Purpose                                                           |
| ------------------------------ | -------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | yes      | Canonical origin, no trailing slash. Canonical URLs, sitemap, OG. |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | no       | Where the contact form POSTs JSON (Formspree, Getform, …).        |
| `NEXT_PUBLIC_ENROLL_ENDPOINT`  | no       | Where the enrolment form POSTs JSON.                              |

With an endpoint left blank the form still renders and validates; on submit it
shows a notice asking the visitor to make contact directly, rather than silently
discarding what they wrote.

Because these are build-time values, changing one on Vercel requires a redeploy,
and in Docker they are `--build-arg`s rather than runtime `-e` flags.

---

## Project structure

```
src/
├── app/                      Routes. Every page is statically generated.
│   ├── layout.tsx            Fonts, theme script, header/footer, global JSON-LD
│   ├── page.tsx              Home — the eight numbered sections
│   ├── globals.css           Design tokens, both themes, base layer, .prose
│   ├── icon.svg              "TI" monogram — source for the whole icon set
│   ├── opengraph-image.tsx   Generated OG card (per-route versions alongside)
│   ├── sitemap.ts robots.ts manifest.ts
│   └── services|academy|work|about|contact|faq|privacy|terms/
│
├── content/                  ← ALL copy lives here. Components never author text.
│   ├── site.ts               Brand, contacts, socials, navigation
│   ├── services.ts           The 18 service lines
│   ├── courses/*.mdx         One file per course
│   ├── work/*.mdx            One file per case study
│   ├── team.ts               Founder, values
│   ├── faq.ts  industries.ts  technologies.ts  testimonials.ts
│
├── components/
│   ├── layout/               Header, footer, skip link, theme script & toggle
│   ├── ui/                   Section, Container, SectionLabel, Button, TextLink,
│   │                         Tag, SpecTable, Lists, ImageFrame, Todo, JsonLd…
│   ├── rows/                 ServiceRow, CourseRow, ProjectRow (+ shared styles)
│   ├── forms/                Field primitives, submit hook, contact & enrol forms
│   ├── home/                 Hero, LocalTime, TerminalBlock
│   └── academy/              Filterable course catalogue
│
└── lib/
    ├── content/              MDX loaders with frontmatter validation
    ├── metadata.ts jsonld.ts og.tsx
    ├── themeScript.ts        The one inline script; its CSP hash derives from it
    └── i18n.ts               Groundwork for Kinyarwanda and French
```

**The rule that keeps this maintainable:** components read content, they never
contain it. If you find yourself typing a sentence into a `.tsx` file, it
belongs in `src/content/` instead.

---

## Editing content

### Brand, contacts and navigation

`src/content/site.ts`. Unconfirmed values are `null` with a `TODO:` comment —
see [the checklist](#todo-checklist). A `null` contact detail renders a visible
`TODO` marker on the page instead of a broken `mailto:` link, so a gap cannot
quietly reach launch.

### Adding a service

Append to the `services` array in `src/content/services.ts`:

```ts
{
  slug: 'data-analytics',           // becomes /services/data-analytics
  index: '12',                      // two digits, shown in mono on every row
  title: 'Data & Analytics',
  summary: 'One line. This is what shows on the home page and /services.',
  whatItIs: ['Paragraph.', 'Another paragraph.'],
  whoItsFor: ['…'],
  deliverables: ['…'],
  howWeWork: ['…'],
  technologies: ['Python', 'MySQL'],
  relatedWork: ['school-erp-platform'],      // case study slugs
  relatedCourses: ['backend-engineering'],   // course slugs
}
```

The detail page, sitemap entry, OG image and `Service` JSON-LD are generated.
Related slugs that match no file are dropped rather than rendered as dead links.

### Adding a course

Create `src/content/courses/<slug>.mdx`. Copy an existing file — the frontmatter
is validated at build time and a missing or mistyped field **fails the build**
with the filename and field in the message, which is deliberate.

```yaml
---
code: DAT-260 # shown in mono; your own scheme
title: Data Analysis with Python
category: AI/ML # one of the seven categories in src/lib/content/courses.ts
level: Intermediate # Beginner | Intermediate | Advanced
summary: One line for the catalogue row.
duration: 8 weeks
schedule: null # null renders a TODO marker
price: null # null renders a TODO marker
format: [Live online, Recorded lessons, Project work]
language: English
whoItsFor: ['…']
prerequisites: ['…']
whatYouBuild: ['…']
requirements: ['…']
syllabus:
  - label: Week 1
    title: Module title
    points: ['…', '…']
faq: # optional
  - question: '…'
    answer: '…'
instructor: iraguha-jean-aime # slug from src/content/team.ts
featured: true # show on the home page
order: 10 # sort order across the catalogue
---
Markdown body — the overview section on the course page.
```

### Adding a case study

Create `src/content/work/<slug>.mdx`. The body carries the narrative in this
order, as `##` headings: **Problem → Constraints → Architecture → Key decisions
& trade-offs → Results → What we would do differently.** The page adds the
stack, screenshots and previous/next links around it.

Two components are available inside the MDX:

```mdx
<ArchitectureSlot label="Architecture diagram — services and data flow" />

<TodoBlock title="Results — real numbers only">What still needs confirming.</TodoBlock>
```

Frontmatter: `title`, `category`, `summary`, `stack`, `order` are required;
`year`, `client`, `role`, `screenshots`, `links` are optional and simply do not
render when absent.

**`placeholder: true`** marks a case study as an unconfirmed draft. While it is
set, the page shows a visible notice, is excluded from the sitemap, and carries
`noindex`. All five case studies currently ship with this flag — see the
[checklist](#todo-checklist). Remove the line once the content is real.

### Testimonials

`src/content/testimonials.ts` is an empty array, and the component renders
nothing while it is empty. Add a real, attributed, consented quote and the
section appears. Rules are written at the top of that file — in short: no
anonymous quotes, no aggregate ratings, no student counts.

---

## Design

The direction is editorial and typography-led: left-aligned asymmetric grid,
hairline rules instead of shadows, lists instead of card grids, and almost no
motion. Services and courses are rows in a table, not tiles.

### Tokens

All defined in `src/app/globals.css` as CSS custom properties, then mapped into
Tailwind with `@theme inline` so runtime theme switching works.

|          | Light     | Dark      | Contrast (light / dark) |
| -------- | --------- | --------- | ----------------------- |
| paper    | `#f5f3ee` | `#0b0b0c` | —                       |
| surface  | `#ffffff` | `#141416` | —                       |
| ink      | `#111113` | `#edebe6` | 17.2:1 / 16.5:1         |
| muted    | `#5e5e63` | `#8a8a8e` | 5.8:1 / 5.7:1           |
| faint    | `#6b6964` | `#7c7c80` | 4.9:1 / 4.7:1           |
| hairline | `#dad7cf` | `#26262a` | —                       |
| accent   | `#b0420e` | `#e0561b` | 5.2:1 / 5.2:1           |

**Why the accent has two values.** One signal orange cannot clear WCAG AA
against both the near-black and the warm paper background — it measures 5.2:1 on
dark but only 3.4:1 on light. So light uses a darker cut of the same hue, and
both land at 5.2:1.

**`faint` is held to 4.5:1, not 3:1.** It is the quietest token and is used at
13px, which is normal-size text for WCAG purposes. Its first draft (`#8b8984`)
measured 3.15:1 and was caught by the Lighthouse pass during review. It is
checked against the sunken surface as well as the page background, the sunken
surface being the tighter of the two.

To rebrand, change the six values in each of the three token blocks in
`globals.css` and re-check contrast. Nothing else references a colour directly.

### Type

Instrument Sans and JetBrains Mono, self-hosted via `next/font` — no third-party
request, no layout shift. Mono is reserved for section labels, metadata, course
codes, durations, tags and code; everything else is the sans.

Five sizes, no more:

| Token        | Size           | Line height | Used for                      |
| ------------ | -------------- | ----------- | ----------------------------- |
| `text-meta`  | 13px           | 1.5         | Mono labels, metadata, codes  |
| `text-body`  | 16px           | 1.6         | Body copy, nav at `lg`        |
| `text-lead`  | 20px           | 1.5         | Hero tagline, section intros  |
| `text-title` | clamp(30–38px) | 1.1         | Section headings (`h2`, w700) |
| `text-hero`  | clamp(44–68px) | 1.02        | Page headlines (`h1`, w700)   |

Weights carry the hierarchy: **700** for `h1`/`h2`, **600** for `h3`/`h4` and
row titles, 400 for body. Instrument Sans is variable to 700, so the heavier
weights cost no extra font file.

Display line-height stays tight on purpose. A 60px headline set on 75px leading
— body spacing applied to display type — is the single most common reason a
large headline reads soft rather than confident.

### Theme switching

System preference is honoured with pure CSS (`prefers-color-scheme`). The single
inline script in `src/lib/themeScript.ts` runs before paint and applies a stored
manual choice, so there is no flash. The toggle reads the resolved theme with
`useSyncExternalStore` rather than mirroring it into state.

---

## Decisions made while building

The brief said to decide sensibly and note it here.

1. **Tailwind v4 CSS-first config.** No `tailwind.config.js`; tokens live in
   `globals.css`. The default palette is switched off entirely (`--color-*:
initial`), so no stray `blue-500` can appear.
2. **TypeScript 6.0, not 7.0.** TS 7 (the native port) is current, but 6.0 is
   the safer line for the ecosystem today. Bump when the tooling settles.
3. **MDX read from disk, not routed.** `pageExtensions` excludes `.mdx`, and
   `next-mdx-remote/rsc` renders bodies loaded by `src/lib/content/`. Content
   files are data, so frontmatter can be validated and pages stay static.
4. **Frontmatter validation fails the build.** A typo in a course file stops the
   build with the file and field named, rather than rendering `undefined`.
5. **Durations are proposed defaults; prices and schedules are `null`.** A
   course length is a plan you can edit. A price is a fact about the business —
   so those render a visible TODO rather than a number nobody agreed.
6. **No animation library, no icon wall.** Three lucide icons were budgeted and
   in the end none were needed: arrows are text glyphs (`→ ↓ ↗`). `lucide-react`
   is still installed for future functional icons.
7. **Forms POST JSON to a configurable endpoint.** No backend. Validation,
   loading, success and error states and a honeypot are hand-rolled — a form
   library would have cost more client JS than the whole site ships.
8. **`script-src` allows inline, everything else is locked down.** Next serves
   the RSC payload as inline scripts whose contents change per page and per
   build, so a hash allowlist cannot cover them and a nonce would force every
   page into dynamic rendering. The full reasoning, and what was tried first,
   is in the comment at the top of `next.config.mjs`.
9. **JSON-LD is inline.** `application/ld+json` is a data block, which the HTML
   spec exempts from `script-src`, so structured data needs no special handling.
10. **OG images use the default font.** Loading Instrument Sans into `next/og`
    would make the Docker build depend on the network. The cards carry the brand
    through colour, rules and layout instead. To change this, fetch the `.ttf`
    and pass it in the `fonts` option in `src/lib/og.tsx`.
11. **`/privacy` and `/terms` are `noindex` and excluded from the sitemap**
    while they remain unreviewed drafts.
12. **Case studies ship as marked drafts.** The engineering reasoning is real
    and reusable; every factual claim is a labelled gap.

---

## Verification

The site was audited with a Playwright pass over 12 pages × 3 viewports (375,
768, 1440) × both themes — 72 screenshots — checking console errors, failed
requests, horizontal overflow, heading order, landmarks, `<h1>` count, image alt
text and link names. A second pass drives the site for real: mobile menu,
Escape-to-close, theme toggle and persistence across reload, course filtering
and its empty state, keyboard order, and both forms through validation errors,
network failure, success, and a honeypot submission.

Current state: **no console errors, no overflow, no structural a11y findings,
19/19 interaction checks passing.**

Lighthouse (mobile, simulated slow 4G):

| Category       | Score |
| -------------- | ----- |
| Performance    | 94–97 |
| Accessibility  | 100   |
| Best practices | 100   |
| SEO            | 100   |

Performance varies a few points run to run on a loaded machine; LCP is the
limiting metric and is dominated by the simulated bandwidth of the framework
bundle. Measure on the real host after deploying — a CDN with HTTP/2 and
Brotli, which Vercel gives you by default, changes this materially.

To re-run the audits, start the production server and point the scripts at it:

```bash
npm run build && npm start   # then, from the audit scripts
CHROME_PATH=<chromium> npx lighthouse http://localhost:3000/ --only-categories=performance,accessibility,best-practices,seo
```

## Accessibility

- Semantic landmarks, one `<h1>` per page, no skipped heading levels.
- Skip link, visible custom focus rings, full keyboard operation including the
  mobile menu (Escape closes it and returns focus to the button).
- WCAG AA contrast in both themes — figures above.
- Form fields are labelled, errors are tied to inputs with `aria-describedby`,
  announced via a live region, and focus moves to the first invalid field.
- Filter state uses `aria-pressed`, never colour alone.
- `prefers-reduced-motion` is respected; there is almost no motion to reduce.

## Performance

Every page is static HTML. Client JavaScript is limited to the header, the theme
toggle, the local clock, the course filter and the two forms. Fonts are
self-hosted and preloaded; there are no third-party requests, no analytics and
no cookies.

## SEO

Per-page metadata and canonical URLs from `NEXT_PUBLIC_SITE_URL`, Open Graph and
Twitter cards with generated images, `sitemap.xml`, `robots.txt`, and JSON-LD for
`Organization`, `WebSite`, `ProfessionalService`, `Person` (founder), `Service`
(per service), `Course` (per course), `BreadcrumbList` and `FAQPage`.

Unconfirmed values are omitted from structured data rather than emitted empty —
a hollow `address` or a `CourseInstance` with no schedule is worse than none.
Validate at <https://validator.schema.org/> once the TODOs are filled in.

## Security

Set in `next.config.mjs` and applied to every route: `Content-Security-Policy`,
`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`,
`Permissions-Policy`, `Strict-Transport-Security`.

The CSP allows exactly one inline script, by hash. `connect-src` and
`form-action` allow `https:` because the forms POST to a third-party endpoint —
tighten both to your actual form provider's origin once it is chosen.

Nginx deliberately does not re-send these headers; duplicating a CSP is how one
ends up silently relaxed.

## Internationalisation

English only, and nothing is machine translated. The structure for adding
Kinyarwanda and French is described in `src/lib/i18n.ts`: content is already
fully separated from components, `hrefFor()` centralises link building, and the
loaders key on slug so they can take a locale argument. URLs carry no locale
prefix while one language is active, so adding a second will not break indexed
links.

---

## Deployment

### Vercel

1. Import the repository.
2. Framework preset: Next.js. Build command and output directory are detected.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain, plus the two form
   endpoints.
4. Add the domain and let Vercel issue the certificate.

Redeploy after changing any `NEXT_PUBLIC_*` value — they are compiled in.

### Docker + Nginx on a Linux server

The `Dockerfile` produces a standalone Next.js server (~200 MB image, trimmed
`node_modules`, non-root user).

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://totallyink.rw \
  --build-arg NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxx \
  --build-arg NEXT_PUBLIC_ENROLL_ENDPOINT=https://formspree.io/f/yyyy \
  -t totally-ink .

docker run -d --name totally-ink --restart unless-stopped -p 127.0.0.1:3000:3000 totally-ink
```

Binding to `127.0.0.1` keeps the app off the public interface — Nginx is the
only way in.

Then put Nginx in front:

```bash
sudo cp nginx.conf /etc/nginx/sites-available/totallyink.rw
sudo ln -s /etc/nginx/sites-available/totallyink.rw /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d totallyink.rw -d www.totallyink.rw
```

`nginx.conf` handles TLS, the www redirect, gzip, and long-lived caching for
`/_next/static`. Certbot rewrites the certificate paths in place.

To update: rebuild the image, then `docker stop totally-ink && docker rm totally-ink` and run
again. For zero-downtime, start the new container on another port and switch the
`upstream` in `nginx.conf`.

---

## TODO checklist

Everything below is a real gap. Nothing was invented to fill one — no clients,
partners, statistics, testimonials, prices, certifications or results appear
anywhere on this site. Items marked **blocker** should be resolved before
launch.

### Contact and identity — `src/content/site.ts`

- [x] Public email address — `jeanaimeiraguha@gmail.com`
- [x] Phone number — `+250 793 411 594`
- [x] WhatsApp number — **assumed to be the same line as the phone number.**
      Correct `site.contact.whatsapp` if it is a different number, or set it to
      `null` to hide every click-to-chat link.
- [ ] Optional: move email to a domain address (`hello@totallyink.rw`).
      A Gmail address on a company site reads less established, and the domain
      mailbox costs nothing once the domain is registered.
- [ ] Street / sector line for the address
- [ ] **Confirm the location wording.** The brief says "Bugesera, Kigali" —
      Bugesera is a district in the Eastern Province and Kigali is the capital.
      Decide which is correct and make `site.location` and the `PostalAddress`
      JSON-LD agree.
- [ ] Latitude and longitude, plus a maps link, for `LocalBusiness` data
- [ ] Year the company was founded (currently `2024`)
- [ ] Social profiles — the footer shows a TODO marker until at least one exists
- [ ] Response-time commitment, shown on `/contact` and after a form submit
- [ ] A logo file, if the text wordmark is to be replaced

### Forms — `.env.local`

- [ ] **blocker** `NEXT_PUBLIC_CONTACT_ENDPOINT`
- [ ] **blocker** `NEXT_PUBLIC_ENROLL_ENDPOINT`
- [ ] **blocker** `NEXT_PUBLIC_SITE_URL` set to the real domain
- [ ] Tighten `connect-src` and `form-action` in `next.config.mjs` to the chosen
      form provider's origin

### Academy — `src/content/courses/*.mdx`, `src/content/faq.ts`

- [ ] **blocker** Price for each of the 9 courses, or a clear "price on request"
- [ ] **blocker** Intake schedule and start dates
- [ ] **blocker** Payment details — mobile money number and registered name,
      bank account, whether card is accepted. Shown after an enrolment request.
- [ ] Confirm the live-class platform (Google Meet, Zoom, other)
- [ ] Confirm whether in-person or hybrid sessions in Bugesera/Kigali run now
- [ ] Decide what is issued on completion — do not claim accreditation the
      Academy does not hold
- [ ] Instalment policy
- [ ] **Refund policy.** `src/content/faq.ts` currently holds this question with
      an empty answer; either write it or delete the question
- [ ] Review the proposed course durations against your real teaching plan
- [ ] Confirm the exact component list for the EMB-201 hardware kit, and whether
      you supply kits

### Case studies — `src/content/work/*.mdx`

All five are marked `placeholder: true`. For each one:

- [ ] **blocker** Replace the problem statement with the real engagement
- [ ] **blocker** Results section — measured numbers the client has agreed can
      be published, or delete the section
- [ ] Delivery year
- [ ] Client name — **only** with written permission; otherwise leave `null`
- [ ] Real screenshots with captions (no stock imagery)
- [ ] Architecture diagram for each `<ArchitectureSlot />`
- [ ] Live links where they exist
- [ ] For the wallet case study: confirm which payment providers were integrated
      and what regulatory position applied
- [ ] Remove `placeholder: true` once done — this restores indexing and the
      sitemap entry

### People — `src/content/team.ts`

- [ ] Founder photograph (a real one)
- [ ] GitHub / LinkedIn or other profile links
- [ ] Review the first-person bio in the founder's own voice

### Technologies — `src/content/technologies.ts`

- [ ] Confirm the Embedded & IoT list, and name the sensor families and boards
      used most often

### Legal — `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`

- [ ] **blocker** Legal review of both pages. They are structural drafts written
      by engineers, not legal advice.
- [ ] Privacy: name the form provider and host, state where data is stored, set
      retention periods, give a contact route for data requests, add a
      last-updated date
- [ ] Terms: commercial terms, IP position, course terms, liability, governing
      law
- [ ] Remove `noindex: true` from both pages and add them back to
      `src/app/sitemap.ts` once reviewed

### Optional polish

- [ ] Load Instrument Sans into `src/lib/og.tsx` so OG cards use the brand font
- [ ] Add a real testimonial once one exists, with permission
- [ ] Consider a `favicon.ico` for very old browsers — the SVG and PNG set
      covers everything current
