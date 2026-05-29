# QAMax Max Fix Block 1 - 2026-05-29

Project: Terminator / Mina UI
Mode: targeted implementation after QAMax Maximum
Status: PASS locally
Deploy / push: not performed
AI API: not used

## Scope

Only the seven QAMax Maximum defects were addressed:

1. Memory Search relevance.
2. Emergency Stop reset boundary.
3. Mina Scheme SVG/DOM silhouette.
4. Windows Companion Guardian control for Local Agent actions.
5. Service Worker cache scope.
6. GitHub Pages health markers.
7. Android debug signing literals.

No V2 work, no architecture expansion outside the defect list, no legacy cleanup, no deploy, no push, no Cloudflare/GitHub settings changes.

## Closed Defects

| Defect | Status | Fix |
|---|---|---|
| QAMAX-P1-MEM-001 | CLOSED locally | Added relevance threshold, strong/weak/no-match classes, empty state, weak-match warning, and secret-pattern exclusion from search results. |
| QAMAX-P1-GUARD-001 | CLOSED locally | Split Safe Mode off from Emergency Stop reset. Emergency reset now requires exact typed phrase `RESET EMERGENCY STOP` and writes Guardian events. |
| QAMAX-P1-MINA-001 | CLOSED locally | Removed PNG/CSS silhouette layer. Restored inline SVG silhouette and added real interactive SVG zones with aria labels, focus, hover/active states. |
| QAMAX-P2-ACTION-001 | CLOSED locally | Windows Companion start/stop Local Agent actions now go through controlled action logging. Stop/restart without approval are blocked/dry-run. |
| QAMAX-P2-PWA-001 | CLOSED locally | Service Worker runtime cache now uses static allowlist and bypasses dynamic/health/state/task/diagnostic paths. |
| QAMAX-P2-PWA-002 | CLOSED locally | Pages health script now checks current `20260529-qamax-fix-block-1-v1` markers and reports PASS/FAIL/warnings with timestamp. |
| QAMAX-P2-SEC-001 | CLOSED locally | Android debug signing now uses environment variables or generated local ignored signing config; no committed `pass:android` style literal remains. |

## Changed Files

| File | Change | Risk |
|---|---|---|
| `app.js` | Memory Search relevance, Guardian Emergency Stop typed reset, SVG scheme zones, keyboard focus. | MEDIUM |
| `styles.css` | Removed PNG scheme override, added SVG zone, emergency reset and memory weak/empty styles. | MEDIUM |
| `index.html` | Updated app/styles version marker to `20260529-qamax-fix-block-1-v1`. | LOW |
| `sw.js` | New cache marker and allowlisted cache strategy. | MEDIUM |
| `scripts/check-pages-health.ps1` | Current marker defaults and clearer PASS/FAIL/warning output. | LOW |
| `tools/windows-companion/mina-windows-companion.ps1` | Controlled Local Agent action path, event logging, stop/restart approval block. | MEDIUM |
| `android/terminator-mina/build-mobile-apk.ps1` | Removed literal debug signing passwords; local/env signing config. | MEDIUM |

## Targeted Regression

| Check | Result | Evidence |
|---|---|---|
| `node --check app.js` | PASS | terminal check |
| `node --check sw.js` | PASS | terminal check |
| PowerShell parse for health/companion/android scripts | PASS | terminal check |
| Static no PNG scheme background | PASS | `evidence/qamax_max_fix_block_1/logs/static-targeted-checks.json` |
| Static no old phase9 markers | PASS | `evidence/qamax_max_fix_block_1/logs/static-targeted-checks.json` |
| Static no Android literal debug pass | PASS | `evidence/qamax_max_fix_block_1/logs/static-targeted-checks.json` |
| Service Worker cache allowlist | PASS | `evidence/qamax_max_fix_block_1/logs/sw-cache-scope-checks.json` |
| Pages health against local fixed build | PASS | `evidence/qamax_max_fix_block_1/logs/pages-health-local.txt` |
| Security targeted scan | PASS | `evidence/qamax_max_fix_block_1/logs/security-targeted-scan.txt` |
| Companion stop without approval | PASS blocked | `evidence/qamax_max_fix_block_1/logs/companion-stop-without-approval.json` |
| Scheduled task after fix | PASS | `evidence/qamax_max_fix_block_1/logs/scheduled-task-after-fix.json` |
| Memory existing query | PASS | `evidence/qamax_max_fix_block_1/smoke/targeted-browser-smoke.json` |
| Memory impossible query | PASS empty state | `evidence/qamax_max_fix_block_1/smoke/targeted-browser-smoke.json` |
| Memory weak query | PASS weak warning | `evidence/qamax_max_fix_block_1/smoke/targeted-browser-smoke.json` |
| Fake secret search | PASS zero results | `evidence/qamax_max_fix_block_1/smoke/targeted-browser-smoke.json` |
| Emergency Stop wrong phrase | PASS remains active | `evidence/qamax_max_fix_block_1/smoke/targeted-browser-smoke.json` |
| Emergency Stop correct phrase | PASS reset + events | `evidence/qamax_max_fix_block_1/smoke/targeted-browser-smoke.json` |
| Mina SVG zones | PASS 8 zones, 8 aria labels | `evidence/qamax_max_fix_block_1/smoke/targeted-browser-smoke.json` |
| Mina no PNG/img layer | PASS `imgCount=0`, `bgPng=none` | `evidence/qamax_max_fix_block_1/smoke/targeted-browser-smoke.json` |
| Mobile 390/430 | PASS no horizontal overflow | `evidence/qamax_max_fix_block_1/mobile/*.png` |

## What Was Not Checked

- No deploy/live GitHub Pages update was performed.
- No Git push/merge was performed.
- No production rollback/apply was performed.
- Android APK build was not executed; script parse and secret-literal checks passed.
- Real phone and BlueStacks app smoke were not rerun in this block.
- Billing dashboards were not opened.

## Residual Risks

| Risk | Severity | Note |
|---|---|---|
| Live site still needs deployment approval to receive source fixes. | MEDIUM | Source is fixed locally only. |
| Android debug build may need local signing env vars if an old ignored keystore exists. | MEDIUM | Script now throws clear setup message instead of using committed literal. |
| Windows Companion approved stop/restart path is script-level controlled, not a full WebApp Approval handshake. | MEDIUM | Stop/restart without approval is blocked; deeper handshake can be future hardening. |
| Mina SVG is clean DOM/SVG but still stylized rather than final bespoke character design. | LOW | QAMax defect is closed because PNG/CSS asset dependency is gone. |

## Decision

Targeted FIX block: PASS locally.
Full QAMax rerun required: not necessary from scratch; run targeted QAMax regression first.
Can accept V1 after targeted regression: depends on owner-assisted checks and approved deploy/live smoke.
