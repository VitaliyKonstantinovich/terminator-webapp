# Live Deploy Smoke — V2-P2-A Advanced Eyes

Status: PASS
Date: 2026-05-30
Live URL: https://vitaliykonstantinovich.github.io/terminator-webapp/

## Scope

This report covers the live deploy and lightweight smoke for V2-P2-A Advanced Eyes / Visual Evidence Foundation.

Included:
- GitHub Pages workflow deploy.
- Live HTML marker check.
- System / Eyes DOM smoke.
- Mina Scheme Eyes integration smoke.
- Mobile 390 / 430 overflow smoke.
- No secrets / no AI API pattern check.

Not included:
- BlueStacks.
- APK rebuild.
- Real phone.
- Heavy screenshots or video.
- External account actions.
- Browser automation workers.

## Commits

- Feature: `aab8628d3b6c2f969b5b2b59b85472a129eecfd6`
- Workflow marker fix: `bbcf4157bea1ac848fa8e98864bb5a368381783d`
- Normal UI copy fix: `26286457f937350650f92377be61a84d152387e3`

## Checks

| Check | Result | Notes |
| --- | --- | --- |
| GitHub Actions / Pages | PASS | Workflow `26702278020` passed. |
| Live marker | PASS | `20260530-v2-p2-a-eyes-v2` found. |
| Eyes panel | PASS | Panel visible, 6 capability cards, snapshot action visible. |
| Normal UI technical copy | PASS | No `CDP`, `Playwright`, `raw DOM`, `DevTools Protocol` in live normal smoke. |
| Mina Scheme zones | PASS | 8 zones found and clickable by DOM smoke. |
| Mobile 390 / 430 | PASS | No horizontal overflow. |
| Mojibake | PASS | No replacement characters detected. |
| No AI API | PASS | No direct AI API call pattern found in live app script. |
| No secrets | PASS | No common live secret token pattern found. |

## Notes

- Initial deploy for the feature commit passed Pages deployment but failed workflow live smoke because the workflow expected the previous HTML marker.
- The workflow marker was updated to the P2-A marker.
- A second live smoke found `Playwright` visible in a normal UI text outside the Eyes panel. The text was replaced with user-facing Russian copy and the script marker was bumped to `v2`.
- Final live smoke passed.

## Evidence

- `evidence/live_deploy_v2_p2_a_advanced_eyes/LIVE_DEPLOY_RESULT.json`
- `evidence/live_deploy_v2_p2_a_advanced_eyes/LIVE_DEPLOY_RESULT.md`

