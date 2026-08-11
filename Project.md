# MIGR8 AI Frontend — Project Context

> Living document. Update this file whenever we make meaningful project decisions, add features, change architecture, or change tooling. Use it to stay aligned across sessions.

---

## Overview

| Field | Value |
| --- | --- |
| Project name | migr8-ai-frontend |
| Package name | `migr8-ai-frontend` |
| Repo path | `MIGR8_AI_frontend/` (workspace: `MIGR8 AI frontend`) |
| Purpose | Frontend application for MIGR8 AI (details TBD) |
| Status | Empty scaffold — ready for feature work |

---

## Tech Stack

| Layer | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 16.3.0** | App Router enabled |
| Language | **TypeScript 5** | Strict mode on |
| UI / styling | **Tailwind CSS v4** | Via `@tailwindcss/postcss` |
| React | **React 19.2.8** | |
| Lint | **ESLint 9** + `eslint-config-next` | |
| Package manager | **npm** | |
| Path alias | `@/*` → project root | Configured in `tsconfig.json` |

### Explicit non-choices (for now)

- No `src/` directory — app lives at project root (`app/`)
- No UI component library yet
- No auth, API client, state library, or testing setup yet

---

## Project Structure

```
MIGR8_AI_frontend/
├── app/
│   ├── globals.css      # Tailwind + global styles
│   ├── layout.tsx       # Root layout (App Router)
│   ├── page.tsx         # Home page
│   └── favicon.ico
├── public/              # Static assets
├── next.config.ts
├── postcss.config.mjs   # Tailwind v4 PostCSS plugin
├── tsconfig.json
├── eslint.config.mjs
├── package.json
├── Project.md           # This file — living project context
└── README.md            # Default create-next-app readme
```

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

### 2026-08-11 — Initial scaffold

- Created empty Next.js app with:
  - TypeScript
  - Tailwind CSS v4
  - App Router (`app/`)
  - ESLint
  - Import alias `@/*`
  - No `src/` directory
- Scaffolded via `create-next-app@latest` into this repo (folder name workaround: generated as `migr8-ai-frontend` then moved to repo root because npm package names cannot contain capital letters).
- Added `Project.md` as the ongoing context / decision log for this project.

---

## Decisions & Conventions

1. **App Router only** — use `app/` routes; do not introduce Pages Router.
2. **TypeScript everywhere** — prefer `.ts` / `.tsx`; keep `strict` enabled.
3. **Tailwind for styling** — prefer utility classes; add shared tokens/components when patterns repeat.
4. **Keep `Project.md` current** — after each meaningful change (feature, stack, architecture, convention), append a session log entry and update the relevant sections above.
5. Prefer small, focused changes over broad refactors unless requested.

---

## Open Questions / TBD

- Product goals and primary user flows for MIGR8 AI frontend
- Design system / branding direction
- Backend / API contracts
- Auth approach
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
