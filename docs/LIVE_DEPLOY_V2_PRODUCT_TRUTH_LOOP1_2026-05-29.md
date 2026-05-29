# Live Deploy Smoke - V2 Product Truth Loop 1

Date: 2026-05-29
Live URL: https://vitaliykonstantinovich.github.io/terminator-webapp/
Commit deployed: `51e0dbc163086950d9cfff5703e0d1349a2b38c1`
GitHub Actions run: `26651475762`
Marker: `20260529-v2-product-truth-loop1`

## Status

PASS.

## What Was Checked

- GitHub Pages workflow completed successfully.
- Live HTML contains the current marker.
- Live Service Worker contains the current cache marker.
- Live `app.js` contains the product truth fixes.
- Mina Scheme opens from the live site.
- Mina Scheme uses DOM/SVG zones, not a PNG click-map.
- All 8 Mina zones exist and route to state.
- Desktop 1440px has no horizontal overflow.
- Mobile 390px and 430px have no horizontal overflow.
- Golden path task runs on live in a fresh browser profile.
- Verifier returns PASS_WITH_RISKS for a safe `Python hello world` smoke.
- Privacy Guard stays clean for safe negative statements.
- Memory Search finds `hello world`.
- Impossible Memory Search query returns empty state.

## Evidence

- Smoke JSON: `evidence/live_deploy_v2_product_truth_loop1/smoke/live_deploy_v2_product_truth_loop1_smoke.json`
- Desktop Scheme screenshot: `evidence/live_deploy_v2_product_truth_loop1/screenshots/live-desktop-scheme.png`
- Golden path screenshot: `evidence/live_deploy_v2_product_truth_loop1/screenshots/live-desktop-golden-work.png`
- Mobile 390 screenshot: `evidence/live_deploy_v2_product_truth_loop1/screenshots/live-mobile-390-scheme.png`
- Mobile 430 screenshot: `evidence/live_deploy_v2_product_truth_loop1/screenshots/live-mobile-430-scheme.png`

## Result Values

- Fetch marker: PASS.
- App ready: PASS.
- SVG zones: 8.
- Card zones: 8.
- PNG background: false.
- Desktop overflow: false.
- Mobile 390 overflow: false.
- Mobile 430 overflow: false.
- Verifier: PASS_WITH_RISKS.
- Privacy scan: clean.
- Memory index count in smoke profile: 15.
- Impossible query result count: 0.

## Safety

- AI API: not used.
- Secrets: not output.
- `.env`: not touched.
- Cloudflare settings: not touched.
- Billing/payment: not touched.
- DNS/VPN/proxy/network settings: not touched.
- Force push/delete/cleanup: not performed.

## Residual Owner-Assisted

- Real phone/PWA install.
- Billing dashboards.
- Real production rollback.
- Real external Brain account checks.
