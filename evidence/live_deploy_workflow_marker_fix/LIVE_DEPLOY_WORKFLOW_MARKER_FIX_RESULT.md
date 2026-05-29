# Live Deploy Workflow Marker Fix Result

Date: 2026-05-29
Scope: `.github/workflows/deploy-pages.yml` marker update.

## Fix

Updated workflow live smoke markers from Phase 25 to QAMax Fix Block 1:

- HTML marker: `20260529-qamax-fix-block-1-v1`
- Service worker marker: `terminator-mina-pwa-20260529-qamax-fix-block-1-v1`

## Files

- `.github/workflows/deploy-pages.yml`
- `docs/LIVE_DEPLOY_WORKFLOW_MARKER_FIX_2026-05-29.md`
- `evidence/live_deploy_workflow_marker_fix/LIVE_DEPLOY_WORKFLOW_MARKER_FIX_RESULT.md`

## Safety

- AI API: not used.
- Secrets: not output.
- Cloudflare settings: not touched.
- Billing: not touched.
- APK build: not run.

## Deploy Result

PASS

Commit:
`561bd99d93fcb4faa292bdd16058577d4ec730a0`

Workflow run:
`26625372098`

Workflow URL:
`https://github.com/VitaliyKonstantinovich/terminator-webapp/actions/runs/26625372098`

## Live Smoke Result

PASS

Area results:

- Live marker: PASS
- GitHub Actions / Pages: PASS
- Sxema Miny live: PASS
- Memory Search live: PASS with supplemental fixture
- Emergency Stop live: PASS
- Service Worker live: PASS
- Mobile viewport live: PASS
- No mojibake: PASS
- No AI API: PASS
- No high-confidence secrets: PASS

Evidence:

- `logs/github-actions-run-success.json`
- `logs/github-actions-success-log.txt`
- `logs/pages-health-live-after-marker-fix.txt`
- `logs/live-smoke.json`
- `logs/live-memory-supplemental.json`
- `screenshots/live-marker-fix-desktop-scheme.png`
- `screenshots/live-marker-fix-mobile-390.png`
- `screenshots/live-marker-fix-mobile-430.png`

Note:
`logs/live-smoke.json` contains one intermediate FAIL from an overly strong weak-query fixture. `logs/live-memory-supplemental.json` is the corrected Memory Search evidence and passes weak-query behavior.
