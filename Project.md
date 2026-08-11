# MIGR8 AI Frontend — Project Context

> Living document. Update this file whenever we make meaningful project decisions, add features, change architecture, or change tooling. Use it to stay aligned across sessions.

---

## Overview

| Field | Value |
| --- | --- |
| Project name | migr8-ai-frontend |
| Package name | `migr8-ai-frontend` |
| Repo path | `MIGR8_AI_frontend/` (workspace: `MIGR8 AI frontend`) |
| Purpose | Frontend for MIGR8 AI — SAP data migration assistant (UI from Google Stitch) |
| Status | Auth + dashboard + Field Mapping + Validation flows implemented (mock/static data) |
| Design source | Stitch project **Remix of MIGR8 AI Migration Assistant** (`11703829461598989849`) |

---

## Tech Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 16.3.0** | App Router |
| Language | **TypeScript 5** | Strict mode on |
| UI / styling | **Tailwind CSS v4** | Via `@tailwindcss/postcss` |
| React | **React 19.2.8** | |
| Fonts | **Hanken Grotesk** + **JetBrains Mono** | Via `next/font/google` |
| Lint | **ESLint 9** + `eslint-config-next` | |
| Package manager | **npm** | |
| Path alias | `@/*` → project root | Configured in `tsconfig.json` |
| Design tooling | **Stitch MCP** (`@_davideast/stitch-mcp`) | Source of truth for UI |

### Explicit non-choices (for now)

- No `src/` directory — app lives at project root (`app/`)
- No third-party UI kit (custom components only)
- No real auth, API client, state library, or testing setup yet
- Forms / uploads are mock/static only

---

## Routes

| Route | Screen | Notes |
| --- | --- | --- |
| `/` | Default Next.js home | Scaffold placeholder (not product UI) |
| `/sign-in` | Sign In | Standalone auth layout |
| `/register` | Register | Standalone auth layout; linked ↔ Sign In |
| `/dashboard` | Migration Control Center | Uses shared `AppShell` |
| `/field-mapping` | AI Field Mapping Setup | Uses shared `AppShell`; reached from sidebar |
| `/validation` | Validation runs list | Prior runs + **New Validation**; `AppShell` |
| `/validation/new` | Advanced Validation & Results | Stitch rules setup; from New Validation |
| `/validation_result/[id]` | Validation Results Analysis | Per-run results; from prior run or Run Validation |

### App shell UX

1. User lands on **Dashboard** (`/dashboard`).
2. Sidebar / topbar stay mounted via `AppShell`.
3. Clicking a nav item replaces **main content only**.
4. Sidebar active state is derived from `usePathname()` (not hard-coded).
5. **Validation flow:**
   - `/validation` (runs list) → click a prior run → `/validation_result/[id]`
   - `/validation` → **New Validation** → `/validation/new` → **Run Validation Rules** → `/validation_result/run-new`
6. Validation sidebar item stays active on `/validation*` and `/validation_result*`.

### Sidebar nav labels (current)

| Label | Href |
| --- | --- |
| Dashboard | `/dashboard` |
| Migration Projects | `#` (parent) |
| → Validation | `/validation` (+ `/validation_result/*`) |
| → Comparison(Postload <-> Preload) | `#` (TBD) |
| → Field Mapping | `/field-mapping` |
| → Reports | `#` (TBD) |
| Profile / Settings | `#` (TBD) |

---

## Project Structure

```
MIGR8_AI_frontend/
├── app/
│   ├── globals.css           # Tailwind + Stitch Enterprise Blue tokens
│   ├── layout.tsx            # Root layout (fonts + metadata)
│   ├── page.tsx              # Placeholder home
│   ├── sign-in/page.tsx
│   ├── register/page.tsx
│   ├── dashboard/page.tsx
│   ├── field-mapping/page.tsx
│   ├── validation/
│   │   ├── page.tsx          # Previous validation runs
│   │   └── new/page.tsx      # Advanced Validation & Results
│   ├── validation_result/
│   │   └── [id]/page.tsx    # Validation Results Analysis
│   └── favicon.ico
├── components/
│   ├── auth/                 # Sign-in / register cards & forms
│   ├── brand/                # Migr8Logo
│   ├── dashboard/            # KPI grid, recent projects, readiness
│   ├── field-mapping/        # Schema upload panels + setup view
│   ├── validation/           # Runs list, rules, results analysis
│   ├── layout/               # AppShell, AppSidebar, AppTopbar
│   └── ui/                   # Button, TextField, dialog, icons, progress
├── data/
│   ├── dashboard.ts          # Nav + dashboard mock metrics/projects
│   ├── field-mapping.ts      # Field mapping mock copy / cards
│   ├── validation.ts         # Validation runs + field rules mock data
│   └── validation-results.ts # Per-run results mock data
├── public/
│   ├── brand/                # Logo asset
│   └── avatars/              # User avatar
├── stitch-assets/            # Local Stitch HTML/screenshots (gitignored)
├── .cursor/mcp.json          # Stitch MCP config (local; may contain secrets)
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── eslint.config.mjs
├── package.json
├── Project.md
├── AGENTS.md / CLAUDE.md     # Next.js agent guidance
└── README.md
```

---

## Design system (Stitch Enterprise Blue)

Tokens live in `app/globals.css` (`@theme inline`). Key values:

| Token | Value | Use |
| --- | --- | --- |
| `--primary` | `#004da4` | Links, accents, solid actions |
| `--primary-container` | `#0064d2` | Primary buttons, brand marks |
| `--background` / `--surface` | `#f9f9ff` | App canvas |
| `--surface-container-lowest` | `#ffffff` | Cards |
| `--error` | `#ba1a1a` | Validation errors |
| `--tertiary` | `#8a3500` | Warnings / mismatches |
| `--success` | `#10b981` | Strong password / success |

Shared UI: `Button`, `TextField`, icons, `ProgressBar` / `CircularProgress`, `PasswordStrengthMeter`.

---

## Stitch screens implemented

| Stitch title | Screen ID | App route |
| --- | --- | --- |
| Sign In | `a6a315fdc7ce47dabd6df8a5c1d35fe9` | `/sign-in` |
| Register | `888050980ca440b6bf42cabe82fba5ad` | `/register` |
| Migration Control Center Dashboard | `262acc49650e4ca98c8d45cc00ba8aa9` | `/dashboard` |
| AI Field Mapping Setup | `cac35d70b9ca451cb5af37e5f88875e4` | `/field-mapping` |
| Advanced Validation & Results | `5861531b2f924a2abb62e112ceacda14` | `/validation/new` |
| Advanced Validation Rules Configuration | `674ecec8e0304b25ab8ea3aabacfa8c1` | Dialog on `/validation/new` (Define Rules) |
| Validation Results Analysis (Updated Nav) | `38ab412ecfeb44d998088e41c2089e31` | `/validation_result/[id]` |

---

## Commands

```bash
npm run dev      # Local dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

---

## Session Log

### 2026-08-12 — Validation Results Analysis

- Implemented `/validation_result/[id]` from Stitch **Validation Results Analysis (Updated Nav)** (`38ab412ecfeb44d998088e41c2089e31`).
- Prior runs on `/validation` link to `/validation_result/{run.id}`.
- **Run Validation Rules** on `/validation/new` navigates to `/validation_result/run-new`.
- Mock per-run summaries in `data/validation-results.ts`; Validation nav stays active via `matchPrefixes`.

### 2026-08-12 — Advanced Validation Rules Configuration dialog

- Stitch screen **Advanced Validation Rules Configuration** (`674ecec8e0304b25ab8ea3aabacfa8c1`) implemented as a modal on `/validation/new`.
- **Define Rules** opens dialog; **Apply Rules** writes tags onto the field row.
- Data types: `char | int | decimal | string | boolean`.
- Length disabled for `string` (max 255 when enabled); Decimal Length only when `decimal`.

### 2026-08-12 — Validation runs + Advanced Validation & Results

- `/validation`: simple previous-runs list + **New Validation** (not Stitch-advanced).
- `/validation/new`: Stitch **Advanced Validation & Results** (`5861531b2f924a2abb62e112ceacda14`) — upload zone, rules table, sticky Save Draft / Run Validation.
- Sidebar **Validation** → `/validation`; active for `/validation/*` via pathname.
- Reuses `AppShell`; topbar supports `topbarLeading` for project breadcrumb.

### 2026-08-12 — Project.md refresh + Field Mapping nav labels

- Brought Overview, structure, routes, design system, and TBD sections up to date.
- Sidebar child labels: Validation · Comparison(Postload <-> Preload) · Field Mapping · Reports.

### 2026-08-12 — AI Field Mapping Setup from Stitch

- Implemented `/field-mapping` from Stitch **AI Field Mapping Setup** (`cac35d70b9ca451cb5af37e5f88875e4`).
- Reuses `AppShell` (sidebar + topbar); only main content changes.
- Pathname-based active nav; Field Mapping → `/field-mapping`.
- Topbar shows page title on this route; upload cards + sticky **Start Mapping** (mock).

### 2026-08-11 — Migration Control Center Dashboard from Stitch

- Implemented `/dashboard` from Stitch **Migration Control Center Dashboard** (`262acc49650e4ca98c8d45cc00ba8aa9`).
- Added reusable app shell (sidebar + topbar), KPI grid, recent projects, readiness ring.
- Mock data in `data/dashboard.ts`; extended surface / semantic tokens.

### 2026-08-11 — Register from Stitch

- Implemented `/register` from Stitch **Register** (`888050980ca440b6bf42cabe82fba5ad`).
- Reused `Button`, `TextField`; added size / `trailingAction`, password strength meter.
- Linked Sign In ↔ Register footers.

### 2026-08-11 — Sign In from Stitch

- Implemented `/sign-in` from Stitch **Sign In** (`a6a315fdc7ce47dabd6df8a5c1d35fe9`).
- Added `Button`, `TextField`, icons, `Migr8Logo`, auth card/form.
- Wired Enterprise Blue tokens + fonts; mock form only.

### 2026-08-11 — Initial scaffold

- Created Next.js app (TypeScript, Tailwind v4, App Router, ESLint, `@/*`).
- No `src/` directory; `Project.md` added as living context.

---

## Decisions & Conventions

1. **App Router only** — use `app/` routes; do not introduce Pages Router.
2. **TypeScript everywhere** — prefer `.ts` / `.tsx`; keep `strict` enabled.
3. **Tailwind for styling** — prefer utilities; shared tokens/components when patterns repeat.
4. **Stitch is UI source of truth** — match layout, spacing, typography, and color from Stitch HTML/screenshots.
5. **Shared app chrome** — authenticated product screens use `AppShell`; nav stays while main content swaps.
6. **Reuse before inventing** — extend existing `components/ui` and layout pieces; avoid duplicate components.
7. **Mock data only** until APIs exist — no backend wiring unless requested.
8. **Keep `Project.md` current** — after meaningful changes, update structure/routes/decisions and append a session log entry.
9. Prefer small, focused changes over broad refactors unless requested.

---

## Open Questions / TBD

- Validation results analysis screen after **Run Validation Rules** ✅ (`/validation_result/[id]`)
- Wire remaining sidebar routes: Comparison, Reports, Profile, Settings
- Post–schema-upload Field Mapping workspace / mapping results screens
- Replace placeholder `/` home (redirect to `/sign-in` or `/dashboard`?)
- Real auth + API contracts
- Deployment target
- Testing strategy

---

## Change Checklist (for future agents / sessions)

When making changes, update this file if any of the following apply:

- [ ] New dependency or major version bump
- [ ] New folder / architectural pattern
- [ ] New feature or route
- [ ] Convention or decision change
- [ ] Resolved TBD / open question
