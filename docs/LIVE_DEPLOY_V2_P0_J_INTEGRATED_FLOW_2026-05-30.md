# LIVE DEPLOY V2-P0-J INTEGRATED FLOW

Status: PASS
Date: 2026-05-30
Commit under smoke: 22fa80f
Workflow: Deploy GitHub Pages, run 26692677727, success

## Scope

Live smoke for V2-P0-J Integrated Flow / Source-of-Truth Consistency Gate.

Checked:
- live GitHub Pages opens;
- live `app.js` and `styles.css` are reachable;
- integrated snapshot functions are present on live;
- compact P0 gate renderer is present;
- consistency validator detects contradictions;
- route selector sends blocker states to the right owner-independent path;
- owner-assisted and postponed real phone/APK items are not treated as P0 blockers;
- no AI API runtime domains were found in live `app.js`.

Out of scope:
- screenshots;
- BlueStacks;
- APK build;
- real phone;
- billing dashboards;
- Cloudflare/GitHub settings;
- Local Agent / Direct Bridge changes.

## Live Smoke

Evidence:
- `evidence/live_deploy_v2_p0_j_integrated_flow/live_smoke.json`
- `evidence/live_deploy_v2_p0_j_integrated_flow/live_smoke_error.log` records the first test-harness-only miss: fake DOM lacked `document.referrer`. The harness was corrected and the final smoke passed.

Result:
- root URL: PASS
- live `app.js`: PASS
- live `styles.css`: PASS
- VM preview matrix: PASS, 10/10
- contradiction detection: PASS
- owner-assisted not blocker: PASS
- postponed phone/APK not blocker: PASS
- no fake ready: PASS
- P0 panel render: PASS
- expert details collapsed: PASS
- no AI API runtime domains: PASS

## Notes

The live check used fetched GitHub Pages assets and a lightweight Node VM fake DOM.
No heavy screenshot batch was run.
No BlueStacks or APK work was started.

## Verdict

V2-P0-J live deployment smoke: PASS.
