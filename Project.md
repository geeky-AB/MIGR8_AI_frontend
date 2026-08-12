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
| Status | Auth, dashboard, and full validation, field mapping, and comparison flows (runs → setup → results) implemented (mock/static data); axios API client scaffolded for FastAPI backend |
| Design source | Stitch project **Remix of MIGR8 AI Migration Assistant** (`11703829461598989849`) |
| Git | `main` — scaffold → core screens → validation → field mapping E2E → comparison E2E → axios |

---

## Tech Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 16.3.0** | App Router |
| Language | **TypeScript 5** | Strict mode on |
| UI / styling | **Tailwind CSS v4** | Via `@tailwindcss/postcss` |
| React | **React 19.2.8** | |
| Fonts | **Hanken Grotesk** + **JetBrains Mono** | Via `next/font/google` in `app/layout.tsx` |
| Lint | **ESLint 9** + `eslint-config-next` | |
| Package manager | **npm** | |
| Path alias | `@/*` → project root | Configured in `tsconfig.json` |
| Design tooling | **Stitch MCP** (`@_davideast/stitch-mcp`) | Source of truth for UI |
| HTTP client | **Axios 1.x** | Shared instance in `lib/axios.ts` |
| Backend (planned) | **Python FastAPI** | Base URL via `NEXT_PUBLIC_API_BASE_URL` |

### Explicit non-choices (for now)

- No `src/` directory — app lives at project root (`app/`)
- No third-party UI kit (custom components only)
- No real auth wiring, state library, or testing setup yet
- Forms / uploads are mock/static only — API client is ready but not yet connected to screens

---

## Routes

| Route | Page file | View component | Notes |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | — | Default Next.js scaffold (not product UI) |
| `/sign-in` | `app/sign-in/page.tsx` | `SignInCard` + `SystemStatus` | Standalone auth layout |
| `/register` | `app/register/page.tsx` | `RegisterCard` | Standalone auth layout; linked ↔ Sign In |
| `/dashboard` | `app/dashboard/page.tsx` | `DashboardView` | Uses shared `AppShell` |
| `/compare` | `app/compare/page.tsx` | `ComparisonRunsList` | Prior runs + **New Comparison** |
| `/compare/new` | `app/compare/new/page.tsx` | `ComparisonSetupView` | Reconciliation upload; from New Comparison |
| `/compare/[id]` | `app/compare/[id]/page.tsx` | `ReconciliationReviewView` | Exception review; `generateStaticParams` |
| `/field-mapping` | `app/field-mapping/page.tsx` | `FieldMappingRunsList` | Prior runs + **New Field Mapping** |
| `/field-mapping/new` | `app/field-mapping/new/page.tsx` | `FieldMappingSetupView` + `SchemaUploadPanel` | Source/target upload + SAP fetch; topbar title |
| `/field-mapping/[id]` | `app/field-mapping/[id]/page.tsx` | `FieldMappingWorkspaceView` | Multi-prospect mapping workspace; `generateStaticParams` |
| `/validation` | `app/validation/page.tsx` | `ValidationRunsList` | Prior runs + **New Validation** |
| `/validation/new` | `app/validation/new/page.tsx` | `AdvancedValidationView` | Rules table + upload zone |
| `/validation_result/[id]` | `app/validation_result/[id]/page.tsx` | `ValidationResultsView` | Per-run results; `generateStaticParams` |

### App shell UX

1. User lands on **Dashboard** (`/dashboard`).
2. Sidebar / topbar stay mounted via `AppShell`.
3. Clicking a nav item replaces **main content only**.
4. Sidebar active state is derived from `usePathname()` + `matchPrefixes` (not hard-coded).
5. **Mobile:** sidebar is hidden on small screens; hamburger opens a drawer overlay (`AppShell` state).
6. **Validation flow:**
   - `/validation` (runs list) → click a prior run → `/validation_result/{run.id}`
   - `/validation` → **New Validation** → `/validation/new` → **Run Validation Rules** → `/validation_result/run-new`
7. **Field Mapping flow:**
   - `/field-mapping` (runs list) → click a prior run → `/field-mapping/{run.id}`
   - `/field-mapping` → **New Field Mapping** → `/field-mapping/new` → **Start Mapping** → `/field-mapping/map-new`
8. **Comparison flow:**
   - `/compare` (runs list) → click a prior run → `/compare/{run.id}`
   - `/compare` → **New Comparison** → `/compare/new` → **Run Reconciliation** → `/compare/cmp-new`
9. Validation sidebar item stays active on `/validation*` and `/validation_result*`.
10. Field Mapping sidebar item stays active on `/field-mapping*`.
11. Comparison sidebar item stays active on `/compare*`.

### Sidebar nav labels (current)

Defined in `data/dashboard.ts` (`SIDEBAR_NAV`, `SIDEBAR_FOOTER_NAV`); rendered in `components/layout/app-sidebar.tsx`:

| Label | Href |
| --- | --- |
| **Projects** (top button) | — (mock; no route yet) |
| Dashboard | `/dashboard` |
| Project 1 | `#` (parent) |
| → Validation | `/validation` (+ `/validation_result/*`) |
| → Comparison(Postload <-> Preload) | `/compare` |
| → Field Mapping | `/field-mapping` |
| → Reports | `#` (TBD) |
| Profile | `#` (TBD) |
| Settings | `#` (TBD) |

### Mock validation run IDs

| ID | Source | Notes |
| --- | --- | --- |
| `run-001` | `PREVIOUS_VALIDATION_RUNS` | Full source validation |
| `run-002` | `PREVIOUS_VALIDATION_RUNS` | Email & mandatory fields check |
| `run-003` | `PREVIOUS_VALIDATION_RUNS` | Key uniqueness sweep |
| `run-new` | `LATEST_VALIDATION_RUN_ID` | Target after **Run Validation Rules** |

### Mock field mapping run IDs

| ID | Source | Notes |
| --- | --- | --- |
| `map-001` | `PREVIOUS_FIELD_MAPPING_RUNS` | Customer Master — full schema map |
| `map-002` | `PREVIOUS_FIELD_MAPPING_RUNS` | Address & contact fields |
| `map-003` | `PREVIOUS_FIELD_MAPPING_RUNS` | Payment terms mapping |
| `map-new` | `LATEST_FIELD_MAPPING_RUN_ID` | Target after **Start Mapping** |

### Mock comparison run IDs

| ID | Source | Notes |
| --- | --- | --- |
| `cmp-001` | `PREVIOUS_COMPARISON_RUNS` | Customer Master — postload vs preload |
| `cmp-002` | `PREVIOUS_COMPARISON_RUNS` | Material Master reconciliation |
| `cmp-003` | `PREVIOUS_COMPARISON_RUNS` | Vendor Master delta check |
| `cmp-new` | `LATEST_COMPARISON_RUN_ID` | Target after **Run Reconciliation** |

---

### Field Mapping setup (`/field-mapping/new`)

| Card | Key UI |
| --- | --- |
| Source Field List | File upload (`.csv`, `.xlsx`) — **Select Source File** |
| Target Field List | File upload — **Select Target File**; **OR** divider + **Fetch from SAP** (table name input + **Fetch** button, mock) |

Topbar: `AI Mapping: Upload Source & Target Schemas` (`FIELD_MAPPING_TOPBAR_TITLE`).

### Comparison setup (`/compare/new`)

| Card | Key UI |
| --- | --- |
| Upload Preload File | Dashed upload zone (primary) — **Select File** |
| Upload Postload File | Dashed upload zone (secondary) — **Select File** |
| Conditional metadata | **Have Field Mapping?** checkbox reveals per-card metadata upload (JSON, CSV) |

Topbar: project name breadcrumb (`COMPARISON_PROJECT_NAME`). **Run Reconciliation** → `/compare/cmp-new`.

### Comparison review (`/compare/[id]`)

| Section | Key UI |
| --- | --- |
| Summary cards | Matched Records, Different, Missing |
| Discrepancy table | Business Key, Field, Preload/Postload values, Difference Type, Status |
| Actions | Download Comparison Report (mock), View Exceptions (scroll to table) |

---

## Project Structure

```
MIGR8_AI_frontend/
├── app/
│   ├── globals.css              # Tailwind + Stitch Enterprise Blue tokens
│   ├── layout.tsx               # Root layout (fonts + metadata)
│   ├── page.tsx                 # Placeholder home
│   ├── sign-in/page.tsx
│   ├── register/page.tsx
│   ├── dashboard/page.tsx
│   ├── compare/
│   │   ├── page.tsx             # Previous comparison runs
│   │   ├── new/page.tsx         # Reconciliation Upload with Conditional Metadata
│   │   └── [id]/page.tsx        # Reconciliation & Exception Review
│   ├── field-mapping/
│   │   ├── page.tsx             # Previous field mapping runs
│   │   ├── new/page.tsx         # AI Field Mapping Setup
│   │   └── [id]/page.tsx        # AI Field Mapping Workspace
│   ├── validation/
│   │   ├── page.tsx             # Previous validation runs
│   │   └── new/page.tsx         # Advanced Validation & Results
│   ├── validation_result/
│   │   └── [id]/page.tsx        # Validation Results Analysis
│   └── favicon.ico
├── components/
│   ├── auth/
│   │   ├── sign-in-card.tsx
│   │   ├── sign-in-form.tsx
│   │   ├── register-card.tsx
│   │   ├── register-form.tsx
│   │   └── system-status.tsx    # Sign-in page footer status strip
│   ├── brand/
│   │   └── migr8-logo.tsx       # Uses /brand/migr8-logo.png
│   ├── dashboard/
│   │   ├── dashboard-view.tsx
│   │   ├── kpi-card.tsx         # KPI cards + SectionCard
│   │   ├── recent-projects.tsx
│   │   └── migration-readiness.tsx
│   ├── comparison/
│   │   ├── comparison-runs-list.tsx
│   │   ├── comparison-setup-view.tsx
│   │   ├── reconciliation-upload-panel.tsx
│   │   └── reconciliation-review-view.tsx
│   ├── field-mapping/
│   │   ├── field-mapping-runs-list.tsx
│   │   ├── field-mapping-setup-view.tsx
│   │   ├── field-mapping-workspace-view.tsx
│   │   └── schema-upload-panel.tsx
│   ├── validation/
│   │   ├── validation-runs-list.tsx
│   │   ├── advanced-validation-view.tsx
│   │   ├── source-upload-zone.tsx
│   │   ├── validation-rules-table.tsx
│   │   ├── advanced-rules-dialog.tsx   # Define Rules modal
│   │   └── validation-results-view.tsx
│   ├── layout/
│   │   ├── app-shell.tsx        # Sidebar + topbar + mobile drawer
│   │   ├── app-sidebar.tsx
│   │   └── app-topbar.tsx
│   └── ui/
│       ├── button.tsx
│       ├── text-field.tsx
│       ├── dialog.tsx
│       ├── icons.tsx            # Shared SVG icons (incl. Tag, Phone, Help, Check, Info)
│       ├── progress.tsx         # ProgressBar + CircularProgress
│       └── password-strength-meter.tsx
├── data/
│   ├── dashboard.ts             # Nav, KPIs, recent projects, readiness
│   ├── comparison.ts            # Runs, reconciliation upload cards, project name
│   ├── comparison-results.ts    # Review summaries, discrepancies, mock run IDs
│   ├── field-mapping.ts         # Runs, schema cards (incl. sapFetch), topbar title
│   ├── field-mapping-workspace.ts # Workspace rows, prospects, AI review mock data
│   ├── validation.ts            # Runs, field rules, rule config types
│   └── validation-results.ts    # Per-run result summaries + exceptions
├── lib/
│   └── axios.ts                 # Shared axios instance for FastAPI backend calls
├── public/
│   ├── brand/migr8-logo.png
│   ├── avatars/user.png
│   └── *.svg                    # Next.js scaffold assets
├── stitch-assets/               # Local Stitch HTML/screenshots (gitignored)
├── .env.example                 # Committed env template (backend URL)
├── .env.local                   # Local env overrides (gitignored)
├── .cursor/mcp.json             # Stitch MCP config (local; gitignored; may contain secrets)
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── eslint.config.mjs
├── package.json
├── Project.md
├── AGENTS.md / CLAUDE.md        # Next.js agent guidance
└── README.md                    # Default create-next-app readme (not product docs)
```

---

## API client (FastAPI backend)

Shared axios instance: `lib/axios.ts`. Import and use for all backend calls:

```ts
import apiClient from "@/lib/axios";

const { data } = await apiClient.get("/api/validation/runs");
await apiClient.post("/api/auth/login", { email, password });
```

| Setting | Value |
| --- | --- |
| Env var | `NEXT_PUBLIC_API_BASE_URL` |
| Default | `http://localhost:8000` (FastAPI dev default) |
| Local config | `.env.local` (gitignored) |
| Template | `.env.example` (committed) |

Notes:
- `NEXT_PUBLIC_` prefix is required for client components (`"use client"`).
- Restart `npm run dev` after changing env vars.
- Request/response interceptors in `lib/axios.ts` are placeholders for auth tokens and centralized error handling.

---

## AppShell API

`components/layout/app-shell.tsx` props:

| Prop | Type | Use |
| --- | --- | --- |
| `children` | `ReactNode` | Main page content |
| `topbarTitle` | `string?` | Replaces search bar with a page title |
| `topbarLeading` | `ReactNode?` | Custom breadcrumb / project label (validation, field-mapping workspace, comparison routes) |
| `mainClassName` | `string?` | Override main padding/layout (e.g. sticky footers on validation/field-mapping) |

---

## Design system (Stitch Enterprise Blue)

Tokens live in `app/globals.css` (`:root` + `@theme inline`). Key values:

| Token | Value | Use |
| --- | --- | --- |
| `--primary` | `#004da4` | Links, accents, solid actions |
| `--primary-container` | `#0064d2` | Primary buttons, brand marks |
| `--secondary` / `--secondary-container` | `#4648d4` / `#6063ee` | Secondary accents, chart bars |
| `--background` / `--surface` | `#f9f9ff` | App canvas |
| `--surface-container-lowest` | `#ffffff` | Cards |
| `--surface-container-high` | `#e1e8fd` | Hover states |
| `--error` | `#ba1a1a` | Validation errors |
| `--tertiary` | `#8a3500` | Warnings / mismatches |
| `--success` | `#10b981` | Strong password / success badges |

Shared UI: `Button`, `TextField`, `Dialog`, icons (`TagIcon`, `PhoneIcon`, `HelpIcon`, `CheckIcon`, `InfoIcon`, etc.), `ProgressBar` / `CircularProgress`, `PasswordStrengthMeter`, `SectionCard`.

---

## Stitch screens implemented

| Stitch title | Screen ID | App route / location |
| --- | --- | --- |
| Sign In | `a6a315fdc7ce47dabd6df8a5c1d35fe9` | `/sign-in` |
| Register | `888050980ca440b6bf42cabe82fba5ad` | `/register` |
| Migration Control Center Dashboard | `262acc49650e4ca98c8d45cc00ba8aa9` | `/dashboard` |
| AI Field Mapping Setup | `cac35d70b9ca451cb5af37e5f88875e4` | `/field-mapping/new` |
| AI Field Mapping Workspace (Multi-Prospect View) | `52c54e1486504e40bee362a260b0f905` | `/field-mapping/[id]` |
| Reconciliation Upload with Conditional Metadata | `f9ae00b981bb4b9faf0cd90736646cc2` | `/compare/new` |
| Reconciliation & Exception Review (Updated Nav) | `d2bc367f18d44a228e999f0b91ac1d5a` | `/compare/[id]` |
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

### 2026-08-13 — Project.md full refresh (comparison E2E complete)

- Brought Overview, routes, comparison setup/review sections, mock IDs, structure, and sidebar labels in line with latest codebase.
- Documented full comparison flow: runs list → upload setup → exception review.
- Updated sidebar parent label to **Project 1**; topbar button to **Projects**.

### 2026-08-12 — Reconciliation & Exception Review (`/compare/[id]`)

- Implemented `/compare/[id]` from Stitch **Reconciliation & Exception Review (Updated Nav)** (`d2bc367f18d44a228e999f0b91ac1d5a`).
- Summary cards (Matched / Different / Missing), discrepancy table, Download + View Exceptions actions.
- **Run Reconciliation** → `/compare/cmp-new`; prior runs link to `/compare/{id}`.
- Mock data in `data/comparison-results.ts`.

### 2026-08-12 — Reconciliation Upload with Conditional Metadata (`/compare/new`)

- Implemented `/compare/new` from Stitch **Reconciliation Upload with Conditional Metadata** (`f9ae00b981bb4b9faf0cd90736646cc2`).
- Preload/postload dashed upload cards with conditional field metadata sections.
- **Have Field Mapping?** checkbox toggles metadata upload UI; **Run Reconciliation** navigates to `/compare/cmp-new`.

### 2026-08-12 — Comparison runs list (`/compare`)

- Added `/compare` page mirroring validation/field-mapping: previous runs + **New Comparison** button.
- Sidebar **Comparison(Postload <-> Preload)** → `/compare`; active on `/compare*`.
- Mock runs in `data/comparison.ts`; links to `/compare/new` and `/compare/{id}`.

### 2026-08-12 — Project.md full refresh (field mapping complete)

- Brought Overview, routes, field mapping setup details, mock IDs, structure, and session log in line with latest codebase.
- Documented full field mapping flow: runs list → setup (with SAP fetch) → workspace.
- Updated git status, AppShell `topbarLeading` usage, and shared icons list.

### 2026-08-12 — AI Field Mapping Setup refresh (Stitch)

- Updated `/field-mapping/new` to match latest Stitch: topbar title, Target Field List card, Select Target File button.
- Added OR divider + Fetch from SAP input on target card (`schema-upload-panel.tsx`).

### 2026-08-12 — AI Field Mapping Workspace (Multi-Prospect View)

- Implemented `/field-mapping/[id]` from Stitch **AI Field Mapping Workspace (Multi-Prospect View)** (`52c54e1486504e40bee362a260b0f905`).
- Mapping table with source → target prospects, confidence badges, search/filter bar, and AI review panel.
- **Start Mapping** on `/field-mapping/new` → `/field-mapping/map-new`; prior runs link to `/field-mapping/{id}`.
- Mock workspace data in `data/field-mapping-workspace.ts`.

### 2026-08-12 — Field Mapping runs list + `/field-mapping/new`

- `/field-mapping` now mirrors `/validation`: previous runs list + **New Field Mapping** button.
- Moved schema upload setup to `/field-mapping/new` (`FieldMappingSetupView`).
- Added `FieldMappingRunsList`, mock runs in `data/field-mapping.ts`; sidebar active on `/field-mapping*`.

### 2026-08-12 — Axios API client + env setup

- Added `axios` dependency and `lib/axios.ts` shared instance for future FastAPI integration.
- Created `.env.example` (committed) and `.env.local` (gitignored) with `NEXT_PUBLIC_API_BASE_URL`.
- Updated `.gitignore` to allow `.env.example` while keeping other `.env*` files private.

### 2026-08-12 — Project.md full refresh

- Brought structure, routes, component map, AppShell API, mock run IDs, and git status in line with the codebase.
- Documented all validation/field-mapping/dashboard component files.
- Clarified `public/brand` + `public/avatars` assets and `.cursor/mcp.json` gitignore.

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

- Originally implemented at `/field-mapping`; later moved to `/field-mapping/new` when runs list was added.
- Reuses `AppShell` (sidebar + topbar); upload cards + sticky **Start Mapping** (mock).
- Refreshed per latest Stitch: Target Field List, Select Target File, Fetch from SAP.

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
7. **Mock data only** until APIs are wired — keep fixtures in `data/`; replace with `apiClient` calls when FastAPI endpoints are ready.
8. **Page → view split** — route files stay thin (`metadata` + `AppShell` wrapper); screen logic lives in `components/*/`-view files.
9. **Single axios instance** — import `apiClient` from `@/lib/axios`; do not create ad-hoc axios instances elsewhere.
10. **Keep `Project.md` current** — after meaningful changes, update structure/routes/decisions and append a session log entry.
11. Prefer small, focused changes over broad refactors unless requested.

---

## Open Questions / TBD

- Wire remaining sidebar routes: Reports, Profile, Settings
- Replace placeholder `/` home (redirect to `/sign-in` or `/dashboard`?)
- Wire screens to FastAPI endpoints (axios client ready in `lib/axios.ts`)
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
