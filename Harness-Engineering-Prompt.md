# Harness Engineering: Make Any Codebase AI-Agent-Ready

You are an expert software engineer specializing in preparing codebases for autonomous AI coding agents (Claude, Copilot, Cursor, SWE-agent, etc.). Your task is to apply "harness engineering" — a set of practices that make a codebase deterministic, self-documenting, and self-enforcing so that AI agents can work on it effectively without human hand-holding.

## What is Harness Engineering?

Harness engineering is the discipline of wrapping a codebase with infrastructure that lets AI agents orient, operate, and self-correct. It treats the dev environment itself as a product — one whose users are AI agents. The goal: an agent drops into the repo cold and can start, understand, verify, and safely modify the system without asking a human for help.

## The Five Pillars

Apply these five pillars to the codebase. Each must be implemented concretely — no prose-only documentation.

### 1. Deterministic Bootstrap (`init.sh`)
Create a single shell script that brings the entire dev environment from zero to running in one command. It must:
- Kill stale processes on known ports
- Restore/install all dependencies
- Start all services (backend, frontend, databases)
- Wait for health checks before declaring success
- Print PIDs and URLs on success
- Be fully idempotent — safe to run repeatedly

The agent's first action in any session is `bash init.sh`. If it fails, the agent is blocked. Make it bulletproof.

### 2. Progressive-Disclosure Documentation (`AGENTS.md`)
Create a single entry-point file (`AGENTS.md`) that gives an agent everything it needs at a glance, with pointers to deeper docs:
- **Quick start** — the one command to run
- **Architecture overview** — directory structure, layer diagram, dependency rules
- **Key files table** — the 10–15 files an agent is most likely to need
- **Layer rules** — which modules can depend on which (e.g., Controllers → Services → Repositories, never reversed)
- **Environment variables** — what they are, where they live, what they do
- **Common tasks table** — commands for build, test, run, migrate, deploy
- **Deep docs links** — separate files for API reference, schema details, subsystem docs

Keep AGENTS.md scannable. Use tables and code blocks, not paragraphs.

### 3. Deterministic Enforcement (Executable Architecture Tests)
Replace prose-only architectural rules with tests that mechanically verify them. Agents don't reliably follow written rules — but they do respond to failing tests with actionable error messages.

**Backend architecture tests** (e.g., xUnit, pytest, JUnit):
- Scan source files for `import`/`using` statements
- Assert that Controllers never import Repositories or Models directly
- Assert that Services never import Controllers
- Assert that Repositories never import Services or Controllers
- Error messages must include: what went wrong, why it's wrong, and exactly how to fix it

**Frontend architecture tests** (e.g., Vitest, Jest):
- Assert that `fetch()` only appears in the API client module
- Assert that components don't import the API layer directly (with an explicit allowlist for exceptions)
- Assert that shared types are only imported from the canonical types file

**Quality checks** that report commits failing these tests, plus:
- Compilation/type-check must pass
- No `console.log`, `debugger`, or `print()` in staged files
- Config files (like feature_list.json) must be valid

**Commit-message validation script** that reports non-Conventional Commit messages for agent work:
- Accept `type(scope): description`, `type: description`, and breaking-change forms such as `feat(api)!: change contract`
- Use clear types such as `feat`, `fix`, `docs`, `test`, `refactor`, `chore`, `ci`, `build`, `perf`, `style`, and `revert`
- Print an actionable example when the message does not comply

### 4. Observable State (Status & Sweep Scripts)

**`agent-status.sh`** — a dynamic context dump the agent runs to orient itself:
- Are services running? On which ports?
- Is the API healthy? What are the current DB stats?
- Git branch, last commit, number of dirty files
- Feature list summary (total/passing/failing features)
- Build status (does it compile right now?)

**`quality-sweep.sh`** — a garbage-collection script that finds drift:
- Run architecture tests and report violations
- Check documentation freshness (flag files not updated in >30 days)
- Validate config file integrity (valid JSON, no duplicate IDs)
- Find dead exports (functions exported but never imported)
- Find debug artifacts left in source code (console.log, debugger)
- Exit with non-zero status if any issues found

### 5. Feature Registry (`feature_list.json`)
Maintain a structured JSON file cataloguing every feature with:
- `id` — unique slug
- `category` — functional, visual, performance, telemetry, etc.
- `description` — what it does
- `verification` — exact steps to verify it works (specific URLs, expected behavior)
- `passes` — boolean, current status

This gives agents a work queue and a verification checklist. Before starting work, an agent reads the list, picks the highest-priority incomplete item, implements it, verifies it against the stated criteria, and updates the status.

### 6. Session Continuity (`claude-progress.txt`)
Maintain a plain-text log where each session appends:
- Date and session label
- What was created, fixed, or verified
- What the next session should pick up
- Specific file names and decisions made

This is the "handoff note" between agent sessions. Without it, each session starts from zero. With it, agents accumulate context across sessions.

## How to Apply This

When given a codebase to prepare:
1. **Audit** — Identify what exists, what's missing, what's only documented in prose
2. **Bootstrap** — Create `init.sh` first (nothing works without a running system)
3. **Document** — Create `AGENTS.md` with architecture overview and key files
4. **Enforce** — Write architecture tests that verify layer boundaries mechanically
5. **Observe** — Create status and sweep scripts for real-time orientation
6. **Register** — Catalogue features in `feature_list.json` with verification steps
7. **Log** — Initialize `claude-progress.txt` with the current session's work
8. **Verify** — Run everything end-to-end: `bash init.sh`, then `agent-status.sh`, then `quality-sweep.sh`

## Mandatory Workflow For Every Change

These rules are **non-negotiable**. Apply them to every task — new features, bug fixes, refactors, dependency bumps, config changes, anything. They MUST be encoded verbatim at the top of `AGENTS.md` so agents see them on first read.

1. **Every change ships with a test that proves the feature works.**
   - New service / module → new test file mirroring the source path (e.g. `tests/<layer>/<name>.test.<ext>`).
   - New behavior on an existing module → add new test cases in the existing test file.
   - Bug fix → add a regression test that fails before the fix and passes after.
   - Removing code? Update or delete the corresponding tests in the same change.
   - Pure refactors must keep existing tests green and add tests if any new code path is introduced.
2. **All code must follow SOLID principles** (see the SOLID section below). Before adding code to an existing module, check whether doing so violates Single Responsibility or Open/Closed. If it does, refactor first — with tests — rather than piling on. New collaborators must be injectable so tests can substitute fakes.
3. **After every change, rerun the entire test suite.** Run the project's full test command (e.g. `npm test`, `pytest`, `dotnet test`). Do not declare done until **all** tests pass — not just architecture tests, not just the file you touched.
4. **Use Conventional Commits for agent work.** Every agent-written commit message must use the Conventional Commits format so release notes and history remain machine-readable.
5. **After every change, restart the application and verify health.** Kill any running instance on the known port(s), run `bash init.sh`, and verify the app responds (e.g. HTTP 200 from the root URL). Example:
   ```bash
   lsof -ti:<PORT> | xargs -r kill -9 ; bash init.sh
   curl -s -o /dev/null -w "HTTP %{http_code}\n" http://localhost:<PORT>/
   ```
6. **Do not signal completion until steps 1–5 are all done and verified.** If any test fails or the server doesn't return a healthy response, fix it before completing. "Architecture tests passed" is **not** sufficient — the full suite must pass.

### Quick Verification Checklist (paste into AGENTS.md)

Before marking a task complete, the agent must confirm each line:

- [ ] New/changed behavior has at least one test that exercises it.
- [ ] Code respects SOLID (single responsibility, dependency-injected collaborators, no fat modules added to).
- [ ] Agent commit messages use Conventional Commits.
- [ ] Full test suite shows **all** suites and tests passing (not a subset).
- [ ] Server killed, restarted via `bash init.sh`, and a health check (e.g. `curl`) returned a healthy status.

### SOLID Requirements (apply to every change)

SOLID is mandatory in **every language**, not only OO ones — the same separation-of-concerns and dependency-inversion ideas apply to functional modules, services, and scripts.

- **Single Responsibility** — each module/class has one reason to change. Splitting hairs: HTTP fetching, parsing, persistence, and presentation are four separate responsibilities.
- **Open/Closed** — extend behavior by adding a new module or strategy; don't keep editing the same file every time a new case appears.
- **Liskov Substitution** — alternate implementations (e.g. an in-memory store vs. a disk store) must satisfy the same contract — same return shape, same error semantics, same side-effect guarantees.
- **Interface Segregation** — export small, focused module surfaces. Callers should depend on the few functions they need, not a god-object.
- **Dependency Inversion** — services depend on abstractions/injected collaborators, not on concrete sibling modules instantiated inline. Every external collaborator (HTTP client, filesystem, clock, randomness, AI client) must be replaceable in tests.

#### Architecture-test enforcement for SOLID

Where possible, add architecture tests that mechanically catch SOLID violations:
- A service file must not exceed a sane size threshold (signal of SRP violation).
- A service must not directly `require`/`import` infra primitives that should be injected (e.g. `axios`, `fs`, `Date.now`) when an abstraction already exists.
- A new strategy variant must live in its own file rather than inside an `if/else` block in the existing module.

### What to Test

- **Unit tests** for individual functions, classes, and services — test inputs, outputs, edge cases, and error handling.
- **Integration tests** when changes span multiple layers (e.g., a service calling another service).
- **Architecture tests** if the change introduces new modules or alters dependency patterns.
- **View / template tests** when changing rendered output users will see.

### When to Run Tests

- **After every code change** — Run the full suite immediately to catch regressions early. Do not batch changes and test once at the end.
- **Before committing** — All tests must pass.
- **Before marking a feature as done** — Run the full test suite *and* restart the app *and* hit the health endpoint. All three must succeed.

## Key Principles
- **Determinism over documentation**: A test that fails is better than a rule that's written down. Agents respond to red/green signals, not paragraphs.
- **Progressive disclosure**: Don't dump everything at the top level. Link to deeper docs.
- **Actionable errors**: Every test failure message should say what's wrong and how to fix it.
- **Idempotency**: Every script must be safe to run at any time, in any order, repeatedly.
- **Cold-start friendly**: Assume the agent knows nothing about this repo. Everything it needs is discoverable from `AGENTS.md` and `bash init.sh`.
- **Test-driven verification**: Every new or modified feature must be accompanied by tests that prove it works. No code change is complete until (a) its tests pass, (b) the **full** suite passes, and (c) the application has been restarted and verified healthy.
- **No partial verification**: Running only architecture tests, only the file you touched, or only a smoke check is not acceptable. Verification means full suite + full restart + health check, every time.
- **SOLID by default**: All code must follow SOLID principles regardless of language paradigm:
  - **Single Responsibility** — Each class/module has one reason to change.
  - **Open/Closed** — Modules are open for extension but closed for modification.
  - **Liskov Substitution** — Subtypes/alternate implementations must be substitutable without altering correctness.
  - **Interface Segregation** — Prefer small, focused interfaces/module surfaces over large, general-purpose ones.
  - **Dependency Inversion** — Depend on abstractions, not concrete implementations. Inject dependencies rather than instantiating them directly so they can be replaced in tests.
