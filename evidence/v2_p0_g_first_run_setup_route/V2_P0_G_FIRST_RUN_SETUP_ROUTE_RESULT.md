# V2-P0-G First Run + Setup Route Result

Status: PASS

## What Was Implemented

- First Run readiness snapshot across V2 system, safety, memory, recovery, capability, controlled apply, and head readiness sources.
- Setup Route evaluator with one primary next action.
- Owner-assisted and postponed logic that does not fake PASS or FAIL.
- Preview events:
  - `v2.first_run.readiness_checked`
  - `v2.setup_route.next_action_selected`
  - `v2.setup_route.owner_assisted_pending`
  - `v2.setup_route.postponed_item`
  - `v2.setup_route.blocked`
  - `v2.setup_route.ready`

## Evidence Files

- `readiness_samples.json`: readiness output for 9 scenarios.
- `setup_route_samples.json`: selected next route for each scenario.
- `first_run_events.json`: preview-only setup route events.
- `first_run_snapshot.json`: current live-like First Run snapshot from the VM harness.
- `smoke.json`: PASS summary for lightweight runtime checks.

## Checks

- Syntax `app.js`: PASS
- Syntax `sw.js`: PASS
- VM smoke: PASS
- Unknown foundation does not PASS: PASS
- Emergency Stop routes to Guardian: PASS
- Recovery blocker routes to Recovery: PASS
- Memory degraded routes to Memory Search: PASS
- Owner-assisted only routes to owner checklist: PASS
- Real phone APK postponed is not a blocker: PASS
- Memory impossible query remains empty: PASS
- Controlled Apply without rollback remains blocked: PASS
- No BlueStacks/APK used.
- No AI API used.
- No billing/payment touched.

## Residual Risks

- Owner-assisted checks remain outside this block.
- This does not replace final V2 product UI polish.
- Full live deploy smoke belongs to the deploy step after commit/push.
