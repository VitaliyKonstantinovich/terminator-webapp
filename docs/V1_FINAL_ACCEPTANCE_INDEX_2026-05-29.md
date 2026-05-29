# V1 Final Acceptance Index - 2026-05-29

Status: CURRENT SOURCE OF TRUTH BEFORE FINAL OWNER-ASSISTED ACCEPTANCE.

This document supersedes scattered phase notes for deciding what is current, what is historical, and what still requires the owner.

## Current V1 Status

| Area | Status | Current Evidence | Notes |
| --- | --- | --- | --- |
| WebApp / PC live | PASS | `docs/LIVE_DEPLOY_PRODUCT_COMPLETION_LOOP3_2026-05-29.md` | Loop 3 live marker and workflow smoke passed; Loop 4 final experience marker is the current pre-deploy source marker. |
| QAMax Fix Block 1 | PASS | `docs/QAMAX_MAX_FIX_BLOCK_1_2026-05-29.md` | Seven QAMax defects closed locally. |
| Targeted regression | PASS locally / PARTIAL owner-dependent | `docs/QAMAX_TARGETED_REGRESSION_FIX_BLOCK_1_2026-05-29.md` | Owner-assisted checks remain outside local regression. |
| Live deploy smoke | PASS | `evidence/live_deploy_workflow_marker_fix/LIVE_DEPLOY_WORKFLOW_MARKER_FIX_RESULT.md` | Current live smoke after workflow marker fix. |
| Mina Scheme | PASS for V1 | `evidence/live_deploy_workflow_marker_fix/logs/live-smoke-combined-summary.json` | SVG/DOM scheme, 8 zones, no PNG click-map. |
| Memory Search | PASS | `evidence/live_deploy_workflow_marker_fix/logs/live-memory-supplemental.json` | Impossible query empty state and weak warning passed. |
| Emergency Stop | PASS | `docs/LIVE_DEPLOY_WORKFLOW_MARKER_FIX_2026-05-29.md` | Reset requires `RESET EMERGENCY STOP`. |
| APK / BlueStacks | PASS for V1 RC | `docs/APK_BLUESTACKS_SMOKE_2026-05-29.md` | Debug WebView wrapper passed BlueStacks smoke; real phone APK/PWA is postponed by owner until production V2 final. |
| Product Completion Loop 3 | PASS | `docs/PRODUCT_COMPLETION_LOOP3_MAX_SCENARIO_2026-05-29.md` | Maximum realistic chain passed locally and live. |
| Product Completion Loop 4 | PASS locally | `docs/PRODUCT_COMPLETION_LOOP4_FINAL_PRODUCT_EXPERIENCE_2026-05-29.md` | Final product experience package passed local smoke after crash; live deploy still requires approved push/deploy if reviewer requests it. |
| Product Completion Audit | PARTIAL-PASS | `docs/V1_PRODUCT_COMPLETION_AUDIT_2026-05-29.md` | No P0 blockers; final owner-assisted checks pending. |
| Product Completion Fix Block | PARTIAL-PASS locally | `docs/V1_PRODUCT_COMPLETION_FIX_BLOCK_2026-05-29.md` | Cleanup before final owner-assisted acceptance; performance app-ready / Quick Diagnost remain PARTIAL. |

## Current Live Markers

- Current source HTML/app marker: `20260529-product-loop4-final-experience-v1`
- Current source Service Worker marker: `terminator-mina-pwa-20260529-product-loop4-final-experience-v1`
- Latest deployed live marker before Loop 4 deploy: `20260529-product-loop3-max-scenario-v1`

## Current Commits

- QAMax Fix Block 1: `0bf2a3561b17e94de1dc08e9681696c59f75ef2d`
- Workflow marker fix: `561bd99d93fcb4faa292bdd16058577d4ec730a0`

The current local worktree has additional uncommitted V1 product-completion docs/evidence, Loop 4 HUD changes, and Android/APK wrapper files. Do not treat them as live until the owner approves a commit/push.

## Historical / Superseded Evidence

The first live deploy smoke for QAMax Fix Block 1 failed because the GitHub Actions workflow still checked the old Phase 25 marker. That failure was real at the time and remains historical evidence:

- `docs/LIVE_DEPLOY_SMOKE_QAMAX_FIX_BLOCK_1_2026-05-29.md`
- `evidence/live_deploy_qamax_fix_block_1/LIVE_DEPLOY_SMOKE_RESULT.md`

It is superseded by:

- `docs/LIVE_DEPLOY_WORKFLOW_MARKER_FIX_2026-05-29.md`
- `evidence/live_deploy_workflow_marker_fix/LIVE_DEPLOY_WORKFLOW_MARKER_FIX_RESULT.md`
- `evidence/live_deploy_workflow_marker_fix/logs/live-smoke-combined-summary.json`

The `live-smoke.json` file inside the marker-fix evidence contains one intermediate weak-query fixture FAIL. The current accepted Memory Search evidence is:

- `evidence/live_deploy_workflow_marker_fix/logs/live-memory-supplemental.json`

Do not rewrite the historical JSON; use the combined summary and supplemental memory smoke for the current V1 verdict.

## Owner-Assisted Pending

These are not product bugs. They are checks that require the owner or real external accounts/devices:

1. Real phone APK/PWA check: postponed by owner until production V2 final. BlueStacks/emulator supports V1 RC but is not final phone PASS.
2. Billing dashboards: Cloudflare, GitHub, Amvera, n8n, AI subscriptions.
3. Production Android signing later.
4. Real production rollback on active project later.
5. Real Codex account availability for non-sandbox repair.
6. Optional reboot/autostart confirmation after final companion packaging.

## Acceptance Decision

V1 WebApp / PC live: PASS.

Android / BlueStacks: PASS for release candidate.

Final V1: pending owner-assisted checks.

Can proceed to final owner-assisted acceptance: YES.

Can start V2: NO, not from this document. V2 requires a separate owner command.
