# Live Deploy Workflow Marker Fix

Date: 2026-05-29
Project: Terminator Mina UI
Scope: deploy workflow marker only

## Status

Workflow marker fix: PASS

Deploy / live smoke: PASS

## Context

Previous deploy commit:
`0bf2a3561b17e94de1dc08e9681696c59f75ef2d`

The GitHub Pages workflow failed in the `Live smoke` step because `.github/workflows/deploy-pages.yml` still checked old Phase 25 markers while the app and service worker already used QAMax Fix Block 1 markers.

## Changed

File:
`.github/workflows/deploy-pages.yml`

Old markers:

- `20260528-phase25-pre-qamax-gate-v1`
- `terminator-mina-pwa-20260528-phase25-pre-qamax-gate-v1`

New markers:

- `20260529-qamax-fix-block-1-v1`
- `terminator-mina-pwa-20260529-qamax-fix-block-1-v1`

No app/runtime files were changed.

## Local Validation

- old marker absent from workflow: PASS
- new marker present: PASS
- diff limited to workflow marker plus docs/evidence: PASS
- no secrets: PASS
- no AI API: PASS
- no unrelated source changes: PASS

## Commit / Push

Commit:
`561bd99d93fcb4faa292bdd16058577d4ec730a0`

Message:
`fix: update pages live smoke marker after qamax fix block 1`

Push:
PASS

## GitHub Actions / Pages

Workflow:
`Deploy GitHub Pages`

Run:
`https://github.com/VitaliyKonstantinovich/terminator-webapp/actions/runs/26625372098`

Status:
PASS

## Live Smoke

Live URL:
`https://vitaliykonstantinovich.github.io/terminator-webapp/`

Checks:

- live marker `20260529-qamax-fix-block-1-v1`: PASS
- service worker marker `terminator-mina-pwa-20260529-qamax-fix-block-1-v1`: PASS
- Sxema Miny opens: PASS
- no PNG/click-map silhouette: PASS
- 8 SVG/DOM zones clickable: PASS
- Voice zone points to mouth: PASS
- Eyes zone points to eyes: PASS
- Memory Search impossible query -> empty state: PASS
- Memory Search weak query -> weak warning: PASS via supplemental smoke fixture
- Emergency Stop reset requires `RESET EMERGENCY STOP`: PASS
- hard refresh/current marker: PASS
- mobile 390/430 no horizontal overflow: PASS
- no mojibake: PASS
- no AI API endpoint patterns in live DOM: PASS
- no high-confidence secret patterns in live DOM: PASS

Note:
The first full browser smoke used a one-token weak query and correctly classified it as strong because the full phrase matched `search_text`. A supplemental Memory Search smoke used `markerzz othernomatch`, producing a true weak result with score 2 and warning text.

## Evidence

- `evidence/live_deploy_workflow_marker_fix/logs/github-actions-run-success.json`
- `evidence/live_deploy_workflow_marker_fix/logs/github-actions-success-log.txt`
- `evidence/live_deploy_workflow_marker_fix/logs/pages-health-live-after-marker-fix.txt`
- `evidence/live_deploy_workflow_marker_fix/logs/live-smoke.json`
- `evidence/live_deploy_workflow_marker_fix/logs/live-memory-supplemental.json`
- `evidence/live_deploy_workflow_marker_fix/screenshots/live-marker-fix-desktop-scheme.png`
- `evidence/live_deploy_workflow_marker_fix/screenshots/live-marker-fix-mobile-390.png`
- `evidence/live_deploy_workflow_marker_fix/screenshots/live-marker-fix-mobile-430.png`

## Safety

- AI API: not used.
- Secrets: not output.
- Cloudflare settings: not touched.
- Billing: not touched.
- Force push: forbidden and not used.
- APK build: not run.
