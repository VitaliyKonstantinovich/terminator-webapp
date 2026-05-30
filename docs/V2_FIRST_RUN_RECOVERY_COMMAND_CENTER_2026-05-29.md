# V2 First Run + Recovery Command Center

Status: implemented locally
Date: 2026-05-29

## Scope

This block adds the V2 P0 entry surface for first-run readiness, safe recovery routing, owner-assisted checks, and a local safe demo task.

In scope:
- Start/Menu/Mission/System V2 launch status.
- Readiness levels: minimum, comfort, full.
- Next best action routing.
- Recovery entry through Guardian/Diagnost.
- Demo-safe local fixture task.
- Owner-assisted checklist for production V2 final.
- Mobile 390/430 no horizontal overflow.

Out of scope:
- Direct Bridge changes.
- Local Agent changes.
- Cloudflare/GitHub account settings.
- Billing/payment changes.
- AI API.
- APK production signing.
- Real phone install.
- Production rollback on active project.

## What Changed

- `index.html`: added V2 command center hosts and updated asset marker.
- `app.js`: added V2 snapshot, renderer, action handler, and safe demo task creation.
- `styles.css`: added premium Mina UI styling for the V2 command center and mobile rules.
- UI copy: visible System/PWA wording uses Russian product copy instead of old `offline shell` / `mobile shell` placeholders.
- `sw.js`: updated cache marker for the new release surface.
- `.github/workflows/deploy-pages.yml`: updated Pages live smoke marker.
- `scripts/check-pages-health.ps1`: updated expected live markers.

## Product Behavior

The owner sees a compact readiness card on Start, a short launch card in the main menu, and a full command center in Mission Control and System.

The full panel answers:
- what is ready;
- what is partial;
- what is blocked;
- what the next step is;
- where to recover safely;
- which checks are owner-assisted and postponed until production V2 final.

The panel uses existing snapshots:
- Source of Truth;
- Mina Scheme readiness;
- Guardian;
- Live Runtime;
- Memory Search;
- Head;
- Hands / Controlled Apply;
- PWA;
- Windows Companion;
- Device Mesh;
- Voice.

It does not create a separate truth store. It only persists small UI state for demo mode and owner-assisted acknowledgement.

## Safety

No AI API, paid services, deploy command execution, Local Agent command execution, network settings, secrets, `.env`, or `agent.config.json` were touched.

The demo fixture creates only a local browser task and a local Context Pack artifact inside the app state. It does not call external services and does not mutate the active project filesystem.

## Checks

- `node --check app.js`: PASS
- `node --check sw.js`: PASS
- Local desktop smoke: PASS
- Continue setup route: PASS
- Demo-safe task creation: PASS
- V2 next action visible: PASS
- No raw engineering placeholders in checked System/Demo UI: PASS
- Mobile 390: PASS, no horizontal overflow
- Mobile 430: PASS, no horizontal overflow
- No token-like secret pattern in changed files: PASS
- No AI API endpoint usage in changed files: PASS
- `git diff --check`: PASS

## Evidence

- `evidence/v2_first_run_recovery_command_center/V2_FIRST_RUN_RECOVERY_COMMAND_CENTER_RESULT.md`
- `evidence/v2_first_run_recovery_command_center/v2_first_run_smoke.json`
- `evidence/v2_first_run_recovery_command_center/screenshots/v2_first_run_system_desktop.png`
- `evidence/v2_first_run_recovery_command_center/screenshots/v2_first_run_demo_workspace.png`
- `evidence/v2_first_run_recovery_command_center/screenshots/v2_first_run_mobile_390.png`
- `evidence/v2_first_run_recovery_command_center/screenshots/v2_first_run_mobile_430.png`

Archive on D:
- `D:\TerminatorStorage\codex_outputs\v2_first_run_recovery_command_center\TERMINATOR_V2_FIRST_RUN_RECOVERY_COMMAND_CENTER_2026-05-29.zip`

## Residual Risk

- The panel is V2 P0 product routing, not full production V2 final.
- Real phone, billing dashboards, production signing, and production rollback remain owner-assisted checks.
- Live deploy smoke must run after commit/push.

## Next

Commit, push, deploy through the normal GitHub Pages workflow, then run live smoke for the updated marker `20260529-v2-first-run-recovery-v1`.
