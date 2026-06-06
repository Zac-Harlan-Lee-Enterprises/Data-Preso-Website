# USS Lee Enterprise — AGENTS.md

## MANDATORY WORKFLOW (non-negotiable for every change)

Before marking any task complete, confirm ALL of these:

- [ ] New/changed behavior has at least one test that exercises it
- [ ] Full test suite passes: `npm test`
- [ ] TypeScript compiles: `npm run type-check`
- [ ] Server restarted via `bash init.sh` and returns HTTP 200 from `http://localhost:3000`
- [ ] Agent commit messages use Conventional Commits format

---

## Quick Start

```bash
bash init.sh          # install deps, copy crew photos, start dev server
npm test              # run all Vitest tests
npm run build         # static export to out/ (for GitHub Pages)
npm run type-check    # TypeScript compile check only
bash agent-status.sh  # full health check
bash quality-sweep.sh # architecture + lint + file integrity sweep
```

---

## Architecture Overview

```
src/
├── app/                     # Next.js App Router pages (Server Components by default)
│   ├── layout.tsx           # Root layout: fonts, AppProvider, AppShell
│   ├── page.tsx             # Bridge Overview (home, '/')
│   ├── engineering/page.tsx # Main Engineering — React Flow
│   ├── acquisition/page.tsx # Acquisition Simulator
│   ├── computer/page.tsx    # Computer Interface
│   └── captains-log/page.tsx# Captain's Log
├── components/              # React components ('use client' where interactive)
│   ├── layout/              # AppShell, Sidebar, StatusBar
│   ├── virginia-mode/       # Cinematic tour (VirginiaMode.tsx)
│   ├── bridge/              # Bridge module components
│   ├── engineering/         # FlowNodes, ArchitectureFlow, SystemPanel
│   ├── acquisition/         # SimulatorTrigger, MedallionFlow
│   └── computer/            # ComputerTerminal, ResponseDisplay
├── contexts/
│   └── AppContext.tsx       # virginiaModeActive state (AppProvider + useApp)
├── data/                    # Pure TypeScript data — NO component imports
│   ├── architecture-nodes.ts# React Flow nodes + edges + panel content
│   ├── computer-qa.ts       # 18 Q&A pairs + matchQuestion() function
│   ├── readiness-indicators.ts
│   ├── roadmap.ts
│   ├── acquisition-steps.ts
│   └── crew.ts
└── lib/
    └── utils.ts             # cn() helper (clsx + tailwind-merge)
```

### Dependency rules (enforced by architecture tests)
- `data/` → no imports from `components/` or `app/`
- `components/` → no imports from `app/`
- `lib/` → no imports from `components/`, `data/`, or `app/`
- `app/` → can import from all layers

---

## Key Files

| File | Purpose |
|---|---|
| `src/app/layout.tsx` | Root layout — fonts, providers, AppShell |
| `src/app/page.tsx` | Bridge Overview (home page) |
| `src/contexts/AppContext.tsx` | Virginia Mode state + startVirginiaTour() |
| `src/data/computer-qa.ts` | Q&A data + matchQuestion() keyword matcher |
| `src/data/architecture-nodes.ts` | React Flow nodes/edges + all panel content |
| `src/components/virginia-mode/VirginiaMode.tsx` | 7-step cinematic tour |
| `src/components/engineering/ArchitectureFlow.tsx` | React Flow canvas + flow overlays |
| `src/components/acquisition/MedallionFlow.tsx` | Acquisition animation + comparison |
| `src/components/computer/ComputerTerminal.tsx` | Q&A terminal + live AI path |
| `next.config.ts` | static export, basePath from env |
| `.github/workflows/deploy.yml` | GitHub Pages CI/CD |
| `init.sh` | Full dev environment bootstrap |
| `feature_list.json` | Feature registry with verification steps |

---

## Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_BASE_PATH` | `""` | GitHub Pages basePath. Set to `/repo-name` for project pages |

Set in `.env.local` for local dev:
```
NEXT_PUBLIC_BASE_PATH=
```

For GitHub Pages project sites, set in GitHub → Settings → Variables → Repository variables:
```
NEXT_PUBLIC_BASE_PATH=/your-repo-name
```

---

## Common Tasks

| Task | Command |
|---|---|
| Start dev server | `bash init.sh` |
| Run tests | `npm test` |
| Watch tests | `npm run test:watch` |
| TypeScript check | `npm run type-check` |
| Build for GitHub Pages | `npm run build` |
| Health check | `bash agent-status.sh` |
| Quality sweep | `bash quality-sweep.sh` |
| Add a Q&A to Computer | Edit `src/data/computer-qa.ts`, add entry + keywords |
| Add a ship system node | Edit `src/data/architecture-nodes.ts`, add to ARCHITECTURE_NODES |

---

## Layer Rules

### Pages (`app/`)
- Server Components unless they use hooks/state — add `'use client'` only when needed
- Each page imports its primary component from `components/`
- React Flow pages use `dynamic(() => import(...), { ssr: false })` — required

### Components (`components/`)
- `'use client'` required for anything with state, effects, or event handlers
- Import data from `data/`, utilities from `lib/`
- Must NOT import from `app/`
- Framer Motion: use `motion.div`, `AnimatePresence`

### Data (`data/`)
- Pure TypeScript exports — no React, no 'use client'
- No imports from `components/` or `app/`
- Single source of truth for all content

---

## GitHub Pages Deployment

1. Create GitHub repository
2. Push this codebase to `main` branch
3. Go to Settings → Pages → Source: **GitHub Actions**
4. (Optional) Set Repository variable `NEXT_PUBLIC_BASE_PATH=/your-repo-name`
5. Push triggers the workflow at `.github/workflows/deploy.yml`
6. Site deploys to `https://username.github.io/repo-name/`

---

## Notes for AI Agents

- React Flow requires `ssr: false` dynamic import — never render it server-side
- All crew photos are in `public/crew/` (copied by `init.sh` from `crew-pictures/`)
- `matchQuestion()` in `computer-qa.ts` uses keyword scoring — add longer, more specific keywords for better matching accuracy
- Virginia Mode `onClose()` is wired through `AppContext` — `startVirginiaTour()` / `closeVirginiaTour()`
- The `lcars-*` color classes come from `tailwind.config.ts` — add new colors there, not in CSS
- Static export means NO server-side API routes, NO useSearchParams without Suspense wrapper
