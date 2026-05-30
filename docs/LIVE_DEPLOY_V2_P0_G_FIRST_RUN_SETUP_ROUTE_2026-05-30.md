# Live Deploy V2-P0-G First Run + Setup Route

Status: PASS

## Commit

- Commit: `cb25784a81e0a628ecab9e6037bd420b48976c9a`
- Message: `feat: wire v2 first run setup route snapshots`
- Branch: `main`

## GitHub Actions / Pages

- Workflow: Deploy GitHub Pages
- Run: `26690542088`
- Result: PASS

## Live Smoke

Live URL:

`https://vitaliykonstantinovich.github.io/terminator-webapp/`

Checks:
- Live HTML returned 200.
- Live `app.js` returned 200.
- `getV2FirstRunReadinessSnapshot` marker found.
- `getV2SetupRoute` marker found.
- `buildV2FirstRunPreview` marker found.
- `v2.first_run.readiness_checked` marker found.
- `v2.setup_route.next_action_selected` marker found.
- Memory impossible-query marker found.
- Runtime VM smoke on live `app.js`: PASS.
- Owner-assisted-only setup route is not a blocker.
- Real phone APK remains postponed and non-blocking.
- Emergency Stop routes to Guardian.
- Memory impossible query returns empty.
- No AI API runtime domains found.

## Evidence

`evidence/live_deploy_v2_p0_g_first_run_setup_route/live_smoke.json`

## Not Performed

- No BlueStacks.
- No APK rebuild.
- No screenshots/video.
- No Cloudflare/GitHub settings changes.
- No billing/payment checks.
