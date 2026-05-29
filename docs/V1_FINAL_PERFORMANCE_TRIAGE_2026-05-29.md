# V1 Final Performance Triage - 2026-05-29

Status: PASS

Scope: V1 final performance triage and commit anchoring prep only. No V2, no deploy, no push, no commit, no Cloudflare/GitHub settings, no secrets, no AI API.

## Baseline

| Item | Value |
|---|---|
| Branch | main |
| HEAD | 561bd99d93fcb4faa292bdd16058577d4ec730a0 |
| origin/main | 561bd99d93fcb4faa292bdd16058577d4ec730a0 |
| Worktree | Dirty from previous V1/APK/QAMax/live/product-completion blocks |
| Previous performance evidence | evidence/v1_product_completion_fix_block/performance/performance_rerun.json |
| Previous HTTP evidence | evidence/v1_product_completion_fix_block/performance/http_timing.json |

## Root Cause

The previous 25,074 ms "full app-ready" number mixed user-facing readiness with a broad headless readiness wait. Static live delivery was already fast: HTML 402 ms, service worker 183 ms, CSS 225 ms, JS 373 ms. A local CDP probe showed the app becomes visible/interactable far earlier than the previous full-ready metric implied.

The real V1 performance bug was Quick Diagnost: it awaited the Direct Bridge frame/public health path. That path can wait for the hidden bridge iframe readiness timeout, which made a "quick" diagnostic take about 11.5 seconds.

## Change Made

Only `app.js` was changed in this task:

- Added a short `DIAGNOSTIC_PUBLIC_HEALTH_TIMEOUT_MS` for Quick Diagnost.
- Reduced the Quick Diagnost fallback `/health` timeout.
- Added `retry: false` support for `directBridgeRequest` without changing existing callers.
- Added optional parameters to `probePublicRuntimeHealth`.
- Changed `probeDirectBridgeHealth` to use a quick no-frame/no-retry public health probe for diagnostics.

This does not change Guardian risk semantics, Approval policy, dangerous-action logic, Direct Bridge architecture, or production deployment.

## Performance Before / After

| Check | Before | After | Verdict |
|---|---:|---:|---|
| First visible UI | Not separately measured | 115 ms | PASS |
| App interactive | Previous full-ready: 25,074 ms | 740 ms | PASS |
| Screen switch | 156-339 ms | 17-456 ms | PASS |
| Scheme open | 156 ms | 84 ms | PASS |
| Quick Diagnost | 11,552 ms | 918 ms | PASS |
| Mobile 390 overflow | PASS | PASS | PASS |

Evidence:

- `evidence/v1_final_performance_triage/performance/performance_breakdown.json`
- `evidence/v1_final_performance_triage/performance/performance_after_fix.json`
- `evidence/v1_final_performance_triage/logs/regression_smoke.json`

## Regression Checks

| Check | Result | Evidence |
|---|---|---|
| `node --check app.js` | PASS | terminal |
| `node --check sw.js` | PASS | terminal |
| Desktop smoke: menu/work/system/scheme | PASS | regression_smoke.json |
| Mobile 390 no overflow | PASS | regression_smoke.json |
| Memory Search normal/artifact/impossible/weak/secret | PASS | regression_smoke.json |
| Emergency Stop reset requires typed phrase | PASS | regression_smoke.json |
| No high-confidence secrets introduced | PASS | grep, false-positive pattern definitions only |
| No AI API runtime use introduced | PASS | grep, policy-detection strings only |
| No mojibake in touched outputs | PASS | grep |

## Remaining Risks

| Risk | Severity | Note |
|---|---|---|
| Live performance can vary by GitHub Pages/CDN/network | MEDIUM | Owner/live assisted checks remain useful. |
| `app.js` is large | MEDIUM | Current visible/interactive budgets pass; bundling/splitting is wider than this V1 triage. |
| Dirty worktree remains unanchored | MEDIUM | See commit anchoring plan. |

## Verdict

V1 Final Performance Triage: PASS.

Can proceed to final owner-assisted acceptance: YES.

Need more V1 code fix before owner-assisted checks: NO, based on this triage.

Commit/push/deploy: not performed.

