# Live Deploy Smoke: V2 First Run + Recovery Command Center

Status: PASS
Date: 2026-05-29 / 2026-05-30 local run

## Baseline

- Commit: `2358a8ebd0bb464a02a315ea0df3392bfd430707`
- Workflow: Deploy GitHub Pages
- Workflow run: `26675784266`
- Workflow result: PASS
- Live URL: `https://vitaliykonstantinovich.github.io/terminator-webapp/`
- Expected app marker: `20260529-v2-first-run-recovery-v1`
- Expected cache marker: `terminator-mina-pwa-20260529-v2-first-run-recovery-v1`

## Checks

| Check | Result |
| --- | --- |
| GitHub Pages workflow | PASS |
| Pages health script | PASS |
| Live app marker | PASS |
| Live service worker marker | PASS |
| V2 command center visible on System | PASS |
| Readiness levels render | PASS |
| Recovery cards render | PASS |
| Owner-assisted checks render | PASS |
| Next action visible | PASS |
| Continue setup route opens Mina Scheme | PASS |
| Desktop no horizontal overflow | PASS |
| Mobile 390 no horizontal overflow | PASS |
| Mobile 430 no horizontal overflow | PASS |
| No raw technical names in checked live panel | PASS |
| No `safe fixture` / `mobile shell` / `offline shell` visible in checked live UI | PASS |

## Evidence

- `evidence/v2_first_run_recovery_command_center/v2_first_run_live_smoke.json`
- `evidence/v2_first_run_recovery_command_center/live_screenshots/v2_live_system_desktop.png`
- `evidence/v2_first_run_recovery_command_center/live_screenshots/v2_live_mobile_390.png`
- `evidence/v2_first_run_recovery_command_center/live_screenshots/v2_live_mobile_430.png`

## Not Checked

- Real phone install.
- APK production signing.
- Billing dashboards.
- Production rollback on active project.

These are intentionally owner-assisted checks for production V2 final.

## Decision

The V2 First Run + Recovery Command Center is live on GitHub Pages and ready for the next V2 block.
