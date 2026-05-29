# QAMax V1 Maximum Acceptance - 2026-05-29

Project: Terminator / Mina UI  
Mode: read-only acceptance  
Verdict: PARTIAL  
Can accept V1: NO

## Executive Summary

QAMax Maximum was run as a strict read-only product acceptance. No source fixes, commit, push, deploy, cleanup, network settings, Cloudflare/GitHub settings, .env, agent.config.json, AI API, or paid service changes were performed.

No CRITICAL stop criterion was confirmed. The app is not dead, secrets were not found in active source/evidence scans, AI API usage was not found in active source, dangerous requests are routed into Approval, Local Agent/Bridge baseline is readable, the Golden Path can complete to `PASS_WITH_RISKS`, sandbox rollback works, and mobile browser layouts do not horizontally overflow on checked widths.

V1 Final PASS cannot be granted because two HIGH defects remain:

- `QAMAX-P1-MEM-001`: Memory Search returns irrelevant results for impossible queries.
- `QAMAX-P1-GUARD-001`: Safe Mode off clears Emergency Stop without separate typed confirmation.

Recommended next block: `QAMAX_MAX_FIX_BLOCK_1 - Safety + Memory + PWA/Release hardening`.

## Baseline

| Item | Result |
|---|---|
| Project path | `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\webapp` |
| Branch | `main` |
| HEAD | `19ff9c5509b74b3692b275f93e57dbb69157c1ff` |
| origin/main | `19ff9c5509b74b3692b275f93e57dbb69157c1ff` |
| Git status at start | Source clean; existing untracked `docs/QAMAX_V1_ACCEPTANCE_2026-05-29.md` |
| Live URL | `https://vitaliykonstantinovich.github.io/terminator-webapp/?force=qamax-v1-max-live` |
| Live URL status | HTTP 200 |
| Direct Bridge health | HTTP 200, `ok:true`, service `mina-direct-bridge` |
| Local Agent process | One filtered `mina-local-agent.mjs` process |
| Scheduled task | `Terminator-Mina-Local-Agent` Ready, LastTaskResult 0 |
| D storage | `D:\TerminatorStorage` exists with expected folders |
| Evidence root | `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_v1_max` |

## Stage Results

| Stage | Status | Notes |
|---|---|---|
| Entry / Freeze | PASS | Git, branch, HEAD, live URL, Bridge, Local Agent, D storage captured. |
| Static Safety | PASS | No active source AI API endpoints, no active token/cookie/key leaks found by pattern scans. |
| Syntax / Build Checks | PASS | `node --check` passed for `app.js`, `sw.js`, bridge worker; PowerShell parse checks passed. |
| Functional Chain | PASS | Task lifecycle reached Context Pack, report artifact, Verifier `PASS_WITH_RISKS`, Memory Preview/save. |
| Brain Council | PASS | Strategy/council/research/answers/comparison/decision artifacts were created in browser smoke. |
| Memory Search | PARTIAL | Relevant queries work fast; impossible query returns unrelated results. HIGH defect. |
| Diagnost + Repair | PARTIAL | Controlled fault metadata, incidents and repair paths exist; real production repair not executed. |
| Guardian / Security | PARTIAL | Dangerous action becomes Approval; Emergency Stop reset boundary has HIGH defect. |
| Rollback | PASS sandbox / PARTIAL production | D-only rollback proof passed; production rollback not executed by read-only rule. |
| Performance | PARTIAL | Most routes usable; initial load and some navigation timings exceeded budgets in headless test. |
| Mina UI | PARTIAL | UX direction usable; Scheme still relies on PNG CSS silhouette asset, not final clean SVG/DOM asset. |
| UX Comfort | PARTIAL | Main flows are understandable, but Memory false positives and safety reset gap reduce trust. |
| Mobile / BlueStacks | PARTIAL | 390/430/768 browser smoke passed no overflow; BlueStacks/real phone not run in this pass. |
| Billing / Cost Guard | PARTIAL | UI/logic present; real dashboards require owner-assisted check. |
| Legacy | PASS | Telegram/n8n/Amvera/AnyDesk/PM2 were not restored as main path. |

## Requirements Traceability Matrix

| Requirement ID | Requirement | Test Case IDs | Evidence | Status | Risk |
|---|---|---|---|---|---|
| REQ-001 | First Run / Start | QMX-START-001..006 | screenshots, smoke JSON | PASS | Low |
| REQ-002 | Схема Мины | QMX-SCHEME-001..015 | screenshots, browser JSON | PARTIAL | PNG/CSS silhouette asset |
| REQ-003 | Workspace / Рабочее | QMX-WORK-001..013 | smoke JSON, screenshot | PASS | Low |
| REQ-004 | Task Runtime | QMX-WORK, QMX-RUNTIME | smoke JSON, runtime logs | PASS | Medium owner/live dependency |
| REQ-005 | Context Pack | QMX-WORK-004 | browser JSON | PASS | Low |
| REQ-006 | Executor Report | QMX-WORK-007 | browser JSON | PASS | Low |
| REQ-007 | Artifacts | QMX-ART-001..003 | browser JSON | PASS | Low |
| REQ-008 | Evidence | QMX-EVD-001..002 | browser JSON | PASS | Low |
| REQ-009 | Verifier | QMX-VER-001..004 | browser JSON | PASS | Low |
| REQ-010 | Memory Preview | QMX-WORK-009..010 | browser JSON | PASS | Low |
| REQ-011 | Memory Search | QMX-MEM-001..010 | correction JSON, defect | PARTIAL | HIGH false relevance |
| REQ-012 | Brain Council | QMX-BRAIN-001..011 | browser JSON | PASS | Low |
| REQ-013 | ResearchOps | QMX-BRAIN-011 | browser JSON | PASS | Medium depth not production-large |
| REQ-014 | Guardian | QMX-SEC-001..014 | browser JSON, defect | PARTIAL | HIGH emergency reset |
| REQ-015 | Safe Mode | QMX-SEC-013 | screenshot, browser JSON | PARTIAL | Safe Mode off clears emergency stop |
| REQ-016 | Emergency Stop | QMX-SEC-013 | screenshot, browser JSON | PARTIAL | HIGH reset boundary |
| REQ-017 | Incident Log | QMX-DIAG-003..004 | fault injection JSON | PASS | Low |
| REQ-018 | Recovery Wizard | QMX-DIAG-005 | screenshots/browser JSON | PASS | Medium real recovery not applied |
| REQ-019 | Codex Repair | QMX-REPAIR-001..015 | fault injection JSON | PARTIAL | Real Codex execution owner-assisted |
| REQ-020 | Repair Workspace | QMX-REPAIR-004 | fault injection, D sandbox | PASS | Low |
| REQ-021 | Rollback | QMX-REPAIR-009..012 | rollback log | PARTIAL | Sandbox only |
| REQ-022 | Controlled Apply | QMX-REPAIR-010 | rollback log | PARTIAL | Dummy-only apply |
| REQ-023 | Local Agent | QMX-RUNTIME-001..003 | runtime logs | PASS | Low |
| REQ-024 | Direct Bridge | QMX-RUNTIME-004 | runtime logs | PASS | Low |
| REQ-025 | Windows Companion | QMX-RUNTIME-006 | static risk log | PARTIAL | Direct tray action boundary |
| REQ-026 | Device Mesh / Legs | QMX-LEGS-001..005 | browser JSON/screens | PARTIAL | Real phone not verified |
| REQ-027 | Voice | QMX-VOICE-001..005 | browser JSON/screens | PARTIAL | Real mic not verified |
| REQ-028 | Eyes / Visual Evidence | QMX-EYES-001..005 | screenshots/browser JSON | PARTIAL | Visual evidence present, real capture limited |
| REQ-029 | Hands / Workers | QMX-HANDS-001..006 | browser JSON/static risk | PARTIAL | Worker apply production not executed |
| REQ-030 | Cost Guard | QMX-COST-001..007 | browser JSON/manual list | PARTIAL | Real billing dashboard owner-assisted |
| REQ-031 | Privacy Guard | QMX-WORK-005, QMX-SEC-006 | safety scans/browser JSON | PASS | Low |
| REQ-032 | Legacy Isolation | QMX-LEGACY | static/manual audit | PASS | Low |
| REQ-033 | Mobile / BlueStacks | QMX-MOB-001..012 | mobile screenshots | PARTIAL | Browser viewport only, not BlueStacks |
| REQ-034 | PWA / Service Worker | QMX-PWA-001..006 | PWA logs/defects | PARTIAL | Runtime cache policy defect |
| REQ-035 | Accessibility | QMX-A11Y-001..007 | browser DOM/screens | PARTIAL | Broad automated a11y not run |
| REQ-036 | Performance | QMX-PERF | performance JSON | PARTIAL | Load/nav budget misses |
| REQ-037 | UX Comfort | QMX-UX-001..007 | screenshots/manual review | PARTIAL | Safety/search trust issues |

## Test Case Results

| Area | Representative Cases | Status | Evidence |
|---|---|---|---|
| Baseline | QMX-BASE-001..006 | PASS | `logs\runtime-baseline.txt`, git output |
| Start/Menu | QMX-START-001..006 | PASS | `screenshots\desktop-start-max.png`, `desktop-menu-max.png` |
| Mina Scheme | QMX-SCHEME-001..015 | PARTIAL | `screenshots\desktop-scheme-max.png`, mobile screenshots |
| Workspace Golden Path | QMX-WORK-001..013 | PASS | `smoke\qamax-v1-max-browser-results.json` |
| Artifacts/Evidence/Verifier | QMX-ART/EVD/VER | PASS | `smoke\qamax-v1-max-browser-results.json` |
| Brain Council | QMX-BRAIN-001..011 | PASS | `screenshots\desktop-brain-council-decision.png` |
| Memory Search | QMX-MEM-001..010 | PARTIAL | `smoke\qamax-v1-max-supplemental-corrections.json` |
| Diagnost/Incidents/Recovery | QMX-DIAG-001..012 | PARTIAL | `fault_injection\fault-injection-results.json` |
| Codex Repair/Rollback | QMX-REPAIR-001..015 | PARTIAL | `rollback\rollback-sandbox-max.txt` |
| Security/Guardian | QMX-SEC-001..014 | PARTIAL | `screenshots\desktop-security-emergency-stop.png` |
| Eyes/Hands/Legs/Voice | QMX-EYES/HANDS/LEGS/VOICE | PARTIAL | browser JSON, screenshots |
| Mobile/PWA | QMX-MOB/PWA | PARTIAL | `mobile\*.png`, `logs\pwa-static.txt` |
| Storage | QMX-STOR-001..007 | PASS | D storage checks, large file log |
| Billing/Cost | QMX-COST-001..007 | PARTIAL | UI logic/manual owner list |
| Accessibility/UX | QMX-A11Y/UX | PARTIAL | screenshots/browser DOM review |

## Defect Log

| ID | Severity | Area | Title | Blocks V1 Final PASS |
|---|---|---|---|---|
| QAMAX-P1-MEM-001 | HIGH | Memory | Memory Search returns irrelevant results for impossible query | YES |
| QAMAX-P1-GUARD-001 | HIGH | Security / Guardian | Safe Mode off clears Emergency Stop without distinct typed confirmation | YES |
| QAMAX-P1-MINA-001 | MEDIUM | UX / Visual | Mina Scheme visible character is PNG CSS background, not final SVG/DOM silhouette | NO |
| QAMAX-P2-ACTION-001 | MEDIUM | Windows Companion | Tray can start/stop Local Agent outside Guardian UI boundary | NO |
| QAMAX-P2-PWA-001 | MEDIUM | PWA / Cache | Service worker caches every same-origin GET | NO |
| QAMAX-P2-PWA-002 | MEDIUM | Release / PWA | GitHub Pages health script expects stale Phase 9 markers | NO |
| QAMAX-P2-SEC-001 | MEDIUM | Security / Mobile | Android debug keystore password literals in build script | NO |

Full defect data: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_v1_max\defects\qamax-v1-max-final-defect-log.json`.

## Risk Log

| Risk | Severity | How to verify | Mitigation |
|---|---|---|---|
| Memory Search false relevance can mislead Context Pack | HIGH | Search impossible terms and check result count | Fix scoring so type bonus applies only after real match |
| Emergency Stop can be cleared too easily | HIGH | Trigger stop, then disable Safe Mode | Split reset action and require typed confirmation |
| Runtime tray actions bypass WebApp Guardian UX | MEDIUM | Inspect/execute tray menu in controlled owner session | Route through Guardian event/audit and confirmation |
| PWA cache can serve stale dynamic data | MEDIUM | Inspect SW/runtime cache and update flow | Static allowlist and no-store exclusions |
| Release health script can misreport Pages status | MEDIUM | Compare script markers to current app/sw markers | Central release marker or source-read marker |
| Mobile APK signing debug literals confuse secret discipline | MEDIUM | Inspect build script | Local ignored debug keystore or ephemeral generation |
| Real phone/PWA install not tested | MEDIUM | Owner tests real device | Owner-assisted mobile evidence |
| Billing dashboard not verified | MEDIUM | Owner checks dashboards | Owner-assisted Cost Guard evidence |

## Evidence Index

| Evidence | Purpose |
|---|---|
| `logs\runtime-baseline.txt` | Baseline: Git, live URL, bridge, storage, Local Agent |
| `logs\local-agent-process-filtered.txt` | Local Agent process count |
| `logs\static-safety-counts.txt` | Secret/API keyword counts |
| `logs\source-api-danger-scan.txt` | Active source API/dangerous source scan |
| `logs\syntax-checks-fixed.txt` | Final syntax/parse checks |
| `logs\pwa-static.txt` | Service worker/manifest static audit |
| `logs\large-files-active-repo.txt` | Heavy file check |
| `smoke\qamax-v1-max-browser-results.json` | Main desktop/mobile/browser smoke results |
| `smoke\qamax-v1-max-supplemental-corrections.json` | Corrections for false raw detector hits and Memory defect proof |
| `performance\qamax-v1-max-performance.json` | Timings and budgets |
| `fault_injection\fault-injection-results.json` | Controlled fault injection results |
| `rollback\rollback-sandbox-max.txt` | Sandbox rollback proof |
| `screenshots\*.png` | Desktop visual evidence |
| `mobile\*.png` | Mobile viewport visual evidence |
| `defects\qamax-v1-max-final-defect-log.json` | Final real defect log |

## Performance Results

| Metric | Status | Notes |
|---|---|---|
| WebApp initial load | PARTIAL | Headless/CDP wait exceeded 3s target. |
| Menu navigation | PARTIAL | Around 1.1s in one run, slightly over 1s budget. |
| Workspace navigation | PARTIAL | Around 1.7s in one run. |
| Mina Scheme open | PASS | Usable within smoke budget. |
| Memory existing query | PASS | Millisecond-level on current local dataset. |
| Memory impossible query | FAIL functional relevance | Returns irrelevant records. |
| Mobile interactions | PASS/PARTIAL | No overflow, but real device not tested. |

Detailed timings: `performance\qamax-v1-max-performance.json`.

## Mobile / BlueStacks Results

| Target | Status | Evidence |
|---|---|---|
| 390px viewport | PASS | `mobile\mobile-390-*.png`, no horizontal overflow |
| 430px viewport | PASS | `mobile\mobile-430-*.png`, no horizontal overflow |
| 768px viewport | PASS | `mobile\mobile-768-*.png`, no horizontal overflow |
| BlueStacks executable present | PASS | `C:\Program Files\BlueStacks_nxt\HD-Player.exe` exists |
| BlueStacks app smoke | NOT RUN | Not launched in read-only QAMax to avoid emulator state changes |
| Real phone | OWNER-ASSISTED | Needs owner evidence |

## Security / Negative Results

| Check | Status | Evidence / Notes |
|---|---|---|
| Secrets in active source/evidence scans | PASS | No live token/key/cookie pattern found |
| AI API active usage | PASS | Active source endpoint scan count 0 |
| Dangerous action request | PASS/PARTIAL | Approval created; typed enforcement still partial |
| Emergency Stop | PARTIAL | Blocks pending risky action but reset gap exists |
| Deploy/push/delete execution | PASS | Not executed; workflow files only statically identified |
| Billing paid integration | PARTIAL | No new paid integration; dashboard check owner-assisted |
| Cookies/session access | PASS | No source cookie access found |

## Owner-Assisted Checks

| Check | Owner action needed | Expected PASS evidence |
|---|---|---|
| Real phone PWA/mobile | Open live URL/PWA on phone and screenshot menu/work/system/scheme | No overflow, buttons usable |
| BlueStacks app/PWA | Open app/web in BlueStacks and screenshot main flows | Usable emulator flow |
| Billing dashboards | Check Cloudflare, GitHub, Amvera, n8n, AI subscriptions | No surprise paid service |
| Reboot/autostart | Reboot and observe no intrusive windows, one Local Agent process | Screenshot/log after reboot |
| Real Codex account availability | Confirm Codex CLI/account readiness if repair executor is used | Repair status ready, no secrets |
| Production rollback | Only after approval, run controlled production rollback proof | Restore point and restored hash |
| Legacy browser profiles | Owner decides cleanup; QAMax does not delete | Legacy remains isolated |

## What Is Accepted

- WebApp loads and core navigation works.
- Golden task lifecycle works through task, context pack, executor report, artifact, verifier, memory preview/save.
- Brain Council/ResearchOps pipeline creates decision artifacts in smoke.
- Verifier is not purely decorative: insufficient/evidence gates produce non-trivial verdicts.
- Guardian routes dangerous requests into Approval.
- Emergency Stop exists and creates/affects security state.
- Controlled fault injection produces incidents and safe repair paths.
- Sandbox rollback proof passed on D storage.
- Mobile viewport smoke passed with no horizontal overflow.
- No active source AI API usage found.
- No live secrets found by scans.

## What Is Not Accepted

- Final V1 product PASS is not accepted until HIGH defects are fixed.
- Memory Search cannot be accepted as final because non-existent queries return unrelated records.
- Emergency Stop cannot be accepted as final safety control until reset requires explicit typed owner confirmation.
- Production rollback/apply is not accepted because QAMax was read-only and sandbox-only.
- Real phone/BlueStacks/billing dashboard checks remain owner-assisted.

## Final Acceptance Decision

V1 Final PASS: NO  
QAMax status: PARTIAL  
P0 stop criteria triggered: NO confirmed CRITICAL  
Required FIX block: `QAMAX_MAX_FIX_BLOCK_1 - Safety + Memory + PWA/Release hardening`

Minimum contents of the next FIX block:

1. Split Safe Mode disable from Emergency Stop reset and require typed owner confirmation.
2. Fix Memory Search scoring/empty-state relevance.
3. Harden service worker cache allowlist and release marker health script.
4. Move Windows companion runtime actions behind explicit owner confirmation/audit.
5. Replace/upgrade Mina Scheme silhouette asset path toward final clean SVG/DOM or semantic image layer.
6. Isolate Android debug keystore/password handling from final release discipline.

