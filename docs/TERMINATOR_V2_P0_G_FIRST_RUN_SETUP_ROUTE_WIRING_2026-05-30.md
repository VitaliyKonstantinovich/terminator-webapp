# Terminator V2-P0-G First Run + Setup Route Snapshot Wiring

Status: PASS

## Scope

V2-P0-G connects the V2 foundation snapshots to First Run readiness and Setup Route logic.

Implemented:
- `getV2FirstRunReadinessSnapshot()` as the owner-facing First Run readiness snapshot.
- `evaluateV2SetupReadiness(snapshot)` with explicit rules: unknown is not PASS, owner-assisted is not FAIL, postponed is not blocker.
- `getV2SetupRoute(snapshot)` with one primary next action.
- `buildV2FirstRunPreview()` with sample scenarios and preview-only events.
- `recordV2SetupRouteEvent(type, payload)` for setup route event contracts.
- `getV2ReadinessSnapshot()` now delegates to the First Run readiness model.
- `buildV2FoundationPreview()` now exposes First Run readiness and preview snapshots.

## Sources

The snapshot reads from existing V2/V1 sources:

- `getV2SystemSnapshot()`
- `getV2SafetySnapshot()`
- `getV2MemorySnapshot()`
- `getV2RecoverySnapshot()`
- `getV2CapabilitySnapshot()`
- Controlled Apply preview availability
- Head/Council readiness when available

## Setup Route Rules

- Safety or Emergency Stop blocker -> open Guardian / Emergency.
- Recovery blocker -> open Recovery.
- Unknown minimum foundation -> finish minimum setup.
- Memory warning -> check Memory Search.
- Brain warning -> check Head / Council.
- Hands warning -> check Controlled Apply.
- Owner-assisted/postponed only -> show owner checklist.
- Fully ready -> open Workspace.

## Files Changed

- `app.js`: added First Run readiness runtime, setup route evaluator, setup events, sample preview, and V2 foundation snapshot wiring.
- `docs/CODEX_MEMORY_GUARD_2026-05-30.md`: tightened ChatGPT extraction rule to strip browser/tab UI labels.

## Evidence

Evidence directory:

`evidence/v2_p0_g_first_run_setup_route/`

Generated files:
- `readiness_samples.json`
- `setup_route_samples.json`
- `first_run_events.json`
- `first_run_snapshot.json`
- `smoke.json`

## Checks

- `node --check app.js`: PASS
- `node --check sw.js`: PASS
- VM smoke for First Run + Setup Route: PASS
- Recovery preview still exposes Diagnostic Pack: PASS
- Memory impossible query remains empty: PASS
- Controlled Apply without rollback remains blocked: PASS
- Owner-assisted items do not become FAIL: PASS
- Real phone APK remains postponed and non-blocking until production V2 final: PASS

## Not Done

- No BlueStacks.
- No APK rebuild.
- No screenshots/video.
- No deploy-specific live smoke inside this doc.

## Risks

- This is a runtime snapshot and routing layer, not a new UI redesign.
- Owner-assisted checks still require owner evidence later: real phone, billing dashboards, production signing, production rollback.
- Unknown states remain warnings/blockers by design and should not be hidden.
