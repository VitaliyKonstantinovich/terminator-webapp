# Live Deploy Smoke Result - QAMax Fix Block 1

Date: 2026-05-29
Commit: `0bf2a3561b17e94de1dc08e9681696c59f75ef2d`

## Final Status

Deploy status: FAIL

Push: PASS

GitHub Actions / Pages: FAIL

Live smoke: NOT RUN after stop condition.

Superseded note:
This is historical evidence for the first failed deploy attempt. It is superseded by `evidence/live_deploy_workflow_marker_fix/LIVE_DEPLOY_WORKFLOW_MARKER_FIX_RESULT.md` and `evidence/live_deploy_workflow_marker_fix/logs/live-smoke-combined-summary.json`, which record PASS after the workflow marker fix.

## Evidence

- `logs/github-actions-run.json`
- `logs/github-actions-failed-log.txt`

## Failure

The GitHub Pages workflow failed in its `Live smoke` step.

Root cause from read-only inspection:

`.github/workflows/deploy-pages.yml` still checks old markers:

- `20260528-phase25-pre-qamax-gate-v1`
- `terminator-mina-pwa-20260528-phase25-pre-qamax-gate-v1`

Current app markers are:

- `20260529-qamax-fix-block-1-v1`
- `terminator-mina-pwa-20260529-qamax-fix-block-1-v1`

## Stop Rule Applied

No fix was made after the workflow failure.

No second commit/push/deploy was performed.

## Safety

- AI API: not used.
- Secrets: not output.
- Cloudflare settings: not touched.
- Billing: not touched.
- APK build: not run.

## Next Required Action

Request a separate owner-approved deploy-gate fix for `.github/workflows/deploy-pages.yml`, then rerun deploy and live smoke.
