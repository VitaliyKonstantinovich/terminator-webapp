# Live Deploy Smoke - QAMax Fix Block 1

Date: 2026-05-29
Mode: owner-approved push/deploy/live smoke
Commit: `0bf2a3561b17e94de1dc08e9681696c59f75ef2d`

## Verdict

Deploy status: FAIL

Push: PASS

GitHub Actions / Pages: FAIL

Live smoke: NOT RUN after stop condition

Superseded note:
This document is historical evidence for the first failed deploy attempt of QAMax Fix Block 1. It is superseded by `docs/LIVE_DEPLOY_WORKFLOW_MARKER_FIX_2026-05-29.md`, where workflow marker fix, GitHub Actions / Pages and live smoke are PASS for marker `20260529-qamax-fix-block-1-v1`.

## What Happened

The approved commit was created and pushed to `main`.

Commit message:
`fix: close qamax max fix block 1 before live smoke`

GitHub Actions run:
`https://github.com/VitaliyKonstantinovich/terminator-webapp/actions/runs/26624964618`

Workflow:
`Deploy GitHub Pages`

Result:
`failure`

The workflow failed during its own `Live smoke` step.

## Failure Cause

The workflow still checks old Phase 25 markers:

- `20260528-phase25-pre-qamax-gate-v1`
- `terminator-mina-pwa-20260528-phase25-pre-qamax-gate-v1`

Current fix-block source uses the new markers:

- `20260529-qamax-fix-block-1-v1`
- `terminator-mina-pwa-20260529-qamax-fix-block-1-v1`

Affected file found by read-only inspection:

- `.github/workflows/deploy-pages.yml`

The health script was updated in the fix-block, but the GitHub Actions workflow inline smoke check still contains the old markers.

## Stop Condition

Stop condition triggered:

GitHub Actions failed.

Per task rules:

- no fix was applied;
- no second commit was made;
- no second push was made;
- no live smoke was continued after the failed workflow;
- the failure log was captured.

## Evidence

- `evidence/live_deploy_qamax_fix_block_1/logs/github-actions-run.json`
- `evidence/live_deploy_qamax_fix_block_1/logs/github-actions-failed-log.txt`

## Status By Area

| Area | Status | Notes |
| --- | --- | --- |
| Commit | PASS | Commit `0bf2a35` created. |
| Push | PASS | Pushed `main` to GitHub. |
| GitHub Actions / Pages | FAIL | Workflow live smoke checks stale marker. |
| Live marker | NOT RUN | Not checked separately after workflow failure. |
| Live smoke | NOT RUN | Blocked by stop condition. |
| Memory Search live | NOT RUN | Blocked by stop condition. |
| Emergency Stop live | NOT RUN | Blocked by stop condition. |
| Mina Scheme live | NOT RUN | Blocked by stop condition. |
| Service Worker live | NOT RUN | Blocked by stop condition. |
| Mobile viewport live | NOT RUN | Blocked by stop condition. |

## New Defect

Defect ID: LIVE-DEPLOY-001

Title:
GitHub Pages workflow live smoke still checks old Phase 25 markers.

Severity:
HIGH for deploy gate, MEDIUM for product runtime.

Area:
Deployment / GitHub Actions / Pages smoke.

Expected:
Workflow live smoke checks current V1 marker `20260529-qamax-fix-block-1-v1` and current service worker cache marker.

Actual:
Workflow checks old `20260528-phase25-pre-qamax-gate-v1` markers and fails.

Suggested fix later:
Update `.github/workflows/deploy-pages.yml` live smoke markers to the current V1 fix-block markers, then run an approved targeted deploy-gate fix commit and live smoke.

Blocks live acceptance:
YES.

## Safety

- AI API: not used.
- Secrets: not output.
- Cloudflare settings: not touched.
- Billing: not touched.
- Force push: not used.
- APK build: not run.
