# QAMAX V1 Acceptance — Terminator Mina

Date: 2026-05-29
Mode: read-only acceptance / verification / evidence
Scope: V1 release candidate before final owner acceptance

## Verdict

Status: PARTIAL

P0 blockers: 0

Why not full PASS: automated/read-only QAMAX passed for the WebApp/PC V1 contour, but several acceptance items require owner/manual environment checks: real phone/PWA, real billing panels, and real active-project apply/rollback approval. No code fix was performed during QAMAX.

Can V1 be accepted as WebApp/PC release candidate: YES.

Can V1 be called fully accepted final product without manual owner checks: NO.

## Baseline

Project path: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\webapp`

Git branch: `main`

HEAD: `19ff9c5 docs: record phase25 live acceptance`

origin/main: `19ff9c5`

Preflight git status: clean; no staged changes; no untracked files.

Live URL: `https://vitaliykonstantinovich.github.io/terminator-webapp/`

Local QAMAX URL: `http://127.0.0.1:8899/`

D storage: `D:\TerminatorStorage` exists.

## P0 Summary

| Check | Status | Evidence | Notes |
|---|---|---|---|
| Git baseline | PASS | shell output | clean before QAMAX outputs |
| Syntax JS | PASS | node --check | `app.js`, `sw.js`, bridge worker |
| PowerShell parse | PASS | Parser.ParseFile | Windows companion and Pages health scripts |
| Active docs/evidence secrets scan | PASS | shell output | high-confidence secrets count 0 |
| AI API usage scan | PASS | shell output | no OpenAI/Gemini/OpenRouter/DeepSeek API endpoints |
| Desktop UI smoke | PASS | `evidence/qamax_v1/screenshots/` | start/menu/work/mission/system/scheme |
| Mobile UI smoke | PASS | `evidence/qamax_v1/smoke/qamax-ui-smoke.json` | 390/430/768 widths, overflow 0 |
| Scheme zone clickability | PASS | `qamax-ui-smoke.json` | all 8 zones selected and panel changed |
| Guardian Emergency Stop dry-run | PASS | `qamax-guardian-repair-dryrun.json` | isolated QAMAX browser profile only |
| Codex Repair dry-run | PASS | `qamax-guardian-repair-dryrun.json` | Diagnostic Pack, repair metadata, rollback metadata |
| Rollback sandbox | PASS | `logs/rollback-sandbox-test.txt` | D sandbox only, active project untouched |
| Memory Search | PASS | `qamax-memory-search.json` | query returned 4 results in 7 ms |
| Local Agent read-only | PASS | shell output | one agent process |
| Scheduled Task | PASS | shell output | Mina Local Agent ready; PM2 resurrect disabled |
| Direct Bridge health | PASS | shell output | `/health` returned 200 |
| D storage | PASS | shell output | required folders exist |
| Live WebApp | PASS | shell output | GitHub Pages returned 200 |

## Defects

No P0 defects found.

### QAMAX-P1-001 — Physical phone/PWA not verified

Severity: MEDIUM

Steps: open WebApp on real phone, install/launch PWA if applicable, verify navigation and touch targets.

Expected: no horizontal overflow, usable Workspace/System/Scheme, presence status visible.

Actual: automated mobile viewport smoke passed, but physical phone was not tested.

Suggested fix later: no code fix yet; run owner phone acceptance.

### QAMAX-P1-002 — Real billing panels not checked

Severity: MEDIUM

Steps: owner checks Cloudflare/GitHub/other dashboards manually.

Expected: no unexpected paid service/runners/storage/API enabled.

Actual: UI/logic checks passed; real external billing dashboards were not opened during QAMAX.

Suggested fix later: add owner billing confirmation record.

### QAMAX-P1-003 — Active-project apply/rollback not executed

Severity: HIGH

Steps: run a safe approved active-project apply in a dedicated test branch/task and roll it back.

Expected: Verifier, Approval, rollback point, apply, post-check, restore all pass.

Actual: sandbox rollback passed; active-project apply was intentionally not executed in read-only QAMAX.

Suggested fix later: controlled owner-approved apply acceptance block.

### QAMAX-P1-004 — Legacy browser/session folders remain outside active path

Severity: HIGH

Steps: scan and classify legacy browser profiles and old web-worker folders without printing secrets.

Expected: active product has no dependency on legacy profiles; sensitive legacy artifacts are cleaned only with approval.

Actual: active docs/evidence scan passed; full legacy workspace cleanup was not part of read-only QAMAX.

Suggested fix later: separate legacy security cleanup with explicit approval.

### QAMAX-P2-001 — Mina silhouette is working asset, not final custom production character

Severity: LOW

Steps: visual review Scheme screen.

Expected: premium readable system scheme.

Actual: UI is functional and premium enough for V1; asset is still derived from mockup package, not final bespoke Mina character.

Suggested fix later: final design asset pass.

## Check Table

| Area | Status | Evidence | Risk | Notes |
|---|---|---|---|---|
| Start / main entry | PASS | `desktop-start.png` | LOW | opens locally |
| Main menu | PASS | `desktop-menu.png`, mobile screenshots | LOW | active nav ok |
| Workspace | PASS | `desktop-work.png`, mobile screenshots | MEDIUM | persistence needs full scenario in owner data |
| Mission Control | PASS | `desktop-mission.png` | MEDIUM | Source of Truth visible |
| System | PASS | `desktop-system.png` | MEDIUM | many panels; smoke ok |
| Diagnost | PASS | `desktop-system-diagnost.png` | MEDIUM | health cards visible |
| Guardian | PASS | `desktop-system-guardian.png`, dry-run JSON | HIGH | safety core; no P0 defects |
| Incidents | PASS | dry-run JSON | MEDIUM | incidents created in isolated profile |
| Emergency Stop | PASS | `desktop-emergency-stop-dryrun.png` | HIGH | safe isolated profile only |
| Recovery / Codex Repair | PASS | `desktop-guardian-repair-dryrun.png` | HIGH | no active project write |
| Memory Search | PASS | `desktop-memory-search-query.png`, JSON | MEDIUM | large dataset not tested |
| Hands / Apply | PARTIAL | system screenshots, dry-run, sandbox rollback | HIGH | active apply requires owner approval |
| Eyes | PARTIAL | system snapshot | MEDIUM | visual evidence layer visible; browser automation not enabled |
| Voice | PARTIAL | UI snapshot | MEDIUM | microphone/STT not manually granted during QAMAX |
| Legs / Device Mesh | PARTIAL | screenshots | MEDIUM | physical phone not checked |
| Scheme Mina | PASS | scheme screenshots, zone JSON | LOW | real DOM/SVG/card UI, not full PNG click-map |
| Mobile viewport | PASS | qamax UI smoke JSON | MEDIUM | no horizontal overflow in automated widths |
| Local Agent | PASS | shell output | MEDIUM | process count 1 |
| Bridge | PASS | shell output | MEDIUM | health 200 |
| Storage D | PASS | shell output | LOW | required folders exist |
| Live GitHub Pages | PASS | shell output | MEDIUM | 200 and service worker contains phase marker |
| Cost Guard | PARTIAL | UI/logic | MEDIUM | real billing dashboards not opened |
| Legacy regression | PARTIAL | static review | HIGH | legacy not main path, cleanup not performed |

## Static Safety Audit

High-confidence secret patterns scanned in active docs/evidence:

- OpenAI-style keys: 0
- Google AI keys: 0
- GitHub tokens: 0
- JWT: 0
- long Bearer tokens: 0
- private keys: 0
- cookie headers: 0

AI API endpoint scan in active source:

- `api.openai.com`: 0
- `generativelanguage.googleapis.com`: 0
- `openrouter.ai/api`: 0
- `api.deepseek.com`: 0
- `/v1/embeddings`: 0
- `Authorization: Bearer`: 0

## Syntax / Build

`node --check`:

- `app.js`: PASS
- `sw.js`: PASS
- `.github/cloudflare/direct-bridge/bridge-worker.js`: PASS

PowerShell parser:

- `tools/windows-companion/install-mina-windows-companion.ps1`: PASS
- `tools/windows-companion/mina-windows-companion.ps1`: PASS
- `scripts/check-pages-health.ps1`: PASS

No `package.json` exists inside `webapp`, so no npm test/build/lint was run there. Parent package has only `start` and `dev`; those were not run because they are not QAMAX-safe build checks.

## UI Smoke

Desktop screenshots:

- `evidence/qamax_v1/screenshots/desktop-start.png`
- `evidence/qamax_v1/screenshots/desktop-menu.png`
- `evidence/qamax_v1/screenshots/desktop-work.png`
- `evidence/qamax_v1/screenshots/desktop-mission.png`
- `evidence/qamax_v1/screenshots/desktop-system.png`
- `evidence/qamax_v1/screenshots/desktop-scheme.png`
- `evidence/qamax_v1/screenshots/desktop-system-diagnost.png`
- `evidence/qamax_v1/screenshots/desktop-system-guardian.png`
- `evidence/qamax_v1/screenshots/desktop-system-hands.png`
- `evidence/qamax_v1/screenshots/desktop-system-memory.png`
- `evidence/qamax_v1/screenshots/desktop-system-pre-qamax.png`

Mobile screenshots:

- `mobile-390-menu.png`
- `mobile-390-work.png`
- `mobile-390-system.png`
- `mobile-390-scheme.png`
- `mobile-430-menu.png`
- `mobile-430-work.png`
- `mobile-430-system.png`
- `mobile-430-scheme.png`
- `mobile-768-menu.png`
- `mobile-768-work.png`
- `mobile-768-system.png`
- `mobile-768-scheme.png`

Smoke summary:

- UI states checked: 30
- horizontal overflow failures: 0
- mojibake failures: 0
- active screen mismatches: 0
- Scheme zone clickability: PASS

## Scheme Mina Acceptance

Status: PASS

Checked zones:

- head: PASS
- eyes: PASS
- voice: PASS
- memory: PASS
- body: PASS
- hands: PASS
- legs: PASS
- diagnost: PASS

The screen uses real DOM cards, zone buttons, panel rendering, and an asset silhouette. It is not a static full-screen PNG/click-map implementation.

## Guardian / Repair / Rollback

Emergency Stop dry-run was executed only in isolated QAMAX Chrome profile.

Result:

- emergency stop active: true
- critical incident created: true
- active project modified: no
- network/settings modified: no

Codex Repair dry-run:

- Diagnostic Pack exists: true
- repair workspace metadata exists: true
- diff review metadata exists: true
- rollback point metadata exists: true
- apply allowed: false

Rollback sandbox:

- sandbox path: `D:\TerminatorStorage\repair_workspaces\qamax_v1_dummy`
- before hash restored after rollback: true
- active project touched: no

## Memory Search

Query: `Терминатор`

Result count: 4

Elapsed: 7 ms

Status: PASS for current dataset.

Large dataset performance: not tested.

## Local Agent / Bridge / Storage

Local Agent process count: 1

Scheduled tasks:

- `Terminator-Mina-Local-Agent`: Ready
- `Terminator-PM2-Resurrect`: Disabled

Bridge health:

- `https://mina-direct-bridge.glebik2807.workers.dev/health`: HTTP 200
- service: `mina-direct-bridge`
- command queue: ready
- task store: ready

D storage:

- `D:\TerminatorStorage\evidence_backups`: exists
- `D:\TerminatorStorage\diagnostics`: exists
- `D:\TerminatorStorage\repair_workspaces`: exists
- `D:\TerminatorStorage\restore_points`: exists
- `D:\TerminatorStorage\temp_outputs`: exists
- `D:\TerminatorStorage\tasks`: exists
- `D:\TerminatorStorage\memory`: exists
- `D:\TerminatorStorage\codex_outputs`: exists

Large active files on C in active webapp repo over 20 MB, excluding `node_modules` and `_codex_tmp`: 0.

## What Was Not Checked

- Real phone/PWA installation.
- Real owner billing dashboards.
- Real active-project controlled apply.
- Full legacy cleanup/security classification.
- Real microphone permission and speech recognition.
- Reboot during QAMAX; reboot requires owner approval.
- Destructive/critical actions; they were not executed.

## What Can Be Accepted

- V1 WebApp/PC release candidate.
- Source of Truth / Pre-QAMAX Gate.
- Mina Scheme V1.
- Guardian/Diagnost/Safe Mode V1.
- Codex Repair / Controlled Apply architecture and safe dry-run.
- Memory Search current dataset.
- Local Agent presence and Bridge health.

## What Cannot Be Fully Accepted Yet

- Final all-device product.
- Real dangerous-action execution.
- Real active-project apply/rollback.
- Physical phone acceptance.
- Billing assurance from provider dashboards.
- Legacy sensitive-data cleanup.

## Final Decision

Can V1 be considered PASS for WebApp/PC release candidate: YES.

Can full Terminator final acceptance be closed now: NO.

Required next block: Owner-assisted manual acceptance pack, not code fix:

1. physical phone/PWA;
2. billing confirmation;
3. active-project controlled apply/rollback on safe test branch/task;
4. legacy sensitive artifact cleanup/classification.

