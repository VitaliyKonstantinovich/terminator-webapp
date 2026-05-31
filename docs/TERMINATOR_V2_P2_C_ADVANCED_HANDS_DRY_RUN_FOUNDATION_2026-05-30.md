# V2-P2-C Advanced Hands / Dry-Run Action Planner Foundation

Status: PASS
Date: 2026-05-30
Scope: bounded V2 P2 block for safe Hands planning only.

## What Was Implemented

- Added V2 Hands contracts:
  - `V2HandsActionRequestContract`
  - `V2HandsActionPlanContract`
  - `V2HandsDryRunResultContract`
  - `V2HandsVerifierNoteContract`
  - `V2HandsEvidenceRecordContract`
  - `V2WorkerCapabilityProfileContract`
- Added safe action type matrix for Hands dry-run scenarios:
  - evidence metadata read;
  - sandbox / repair workspace plan;
  - repair workspace with and without rollback;
  - active project mutation;
  - Verifier FAIL;
  - deploy;
  - push main;
  - delete restore point;
  - `.env` / secrets;
  - billing/payment;
  - browser profiles/cookies;
  - network/DNS/VPN/proxy;
  - Browser Worker click;
  - OpenClaw/external adapter candidate.
- Added dry-run planner functions:
  - `createV2HandsActionRequest`
  - `createV2HandsActionPlan`
  - `evaluateV2HandsDryRun`
  - `createV2HandsVerifierNote`
  - `createV2HandsEvidenceRecord`
  - `buildV2HandsMemoryRecord`
  - `buildV2AdvancedHandsPreview`
  - `runV2AdvancedHandsSmoke`
- Integrated with existing Safety Core / capability matrix, Approval, Verifier note, Evidence, Memory Search, System Hands panel, Workspace Hands panel, Product Shell and Mina Scheme.
- Real execution remains disabled for this block.

## UX

Normal mode now shows:

- plan title;
- worker;
- action type;
- risk;
- controlled runtime selector;
- affected resources;
- dry-run verdict;
- Approval / rollback / Verifier state;
- clear “Действие НЕ выполнено” proof.

Expert details stay behind existing expert/detailed panels and contract JSON evidence.

## Safety

No real action is executed by Advanced Hands V2-P2-C.

Blocked or gated:

- active project mutation requires Approval and rollback;
- no rollback blocks future apply;
- Verifier FAIL blocks apply;
- deploy requires `ALLOW DEPLOY`;
- push main requires `ALLOW PUSH MAIN`;
- delete requires `ALLOW DELETE`;
- `.env`, secrets, browser profiles and network settings are red-zone;
- billing/payment is owner-assisted;
- Browser Worker click and OpenClaw remain future/disabled.

## Files Changed

- `app.js`: contracts, policies, dry-run planner, UI renderers, Memory Search integration, Product Shell and Mina Scheme status.
- `styles.css`: compact premium Hands dry-run UI, capability cards, verifier/memory panel, responsive rules.
- `index.html`: V2-P2-C cache/version marker.
- `sw.js`: V2-P2-C cache marker.
- `.github/workflows/deploy-pages.yml`: live marker updated to V2-P2-C.

## Evidence

- `evidence/v2_p2_c_advanced_hands/hands_action_request_sample.json`
- `evidence/v2_p2_c_advanced_hands/hands_action_plan_sample.json`
- `evidence/v2_p2_c_advanced_hands/hands_dry_run_samples.json`
- `evidence/v2_p2_c_advanced_hands/worker_capability_profiles.json`
- `evidence/v2_p2_c_advanced_hands/hands_verifier_note_sample.json`
- `evidence/v2_p2_c_advanced_hands/hands_evidence_record_sample.json`
- `evidence/v2_p2_c_advanced_hands/hands_memory_search_sample.json`
- `evidence/v2_p2_c_advanced_hands/smoke.json`

## Checks

- `node --check app.js`: PASS
- `node --check sw.js`: PASS
- local DOM smoke: PASS
- Advanced Hands preview smoke: PASS
- Memory Search finds Hands dry-run: PASS
- System Hands panel: PASS
- Mina Scheme Hands status: PASS
- Product Shell Hands status: PASS
- Mobile 390px no horizontal overflow: PASS
- Mobile 430px no horizontal overflow: PASS
- AI API: not used
- secrets: not exposed
- billing/payment: not touched
- Local Agent / Direct Bridge: not touched
- real actions executed: NO
- BlueStacks/APK: not run

## Remaining Risk

- This is a dry-run foundation, not full Advanced Hands runtime.
- Browser Worker, System Worker execution and OpenClaw are intentionally future/disabled.
- Real phone APK remains owner-assisted and postponed until production V2 final.
- Production apply/rollback remains outside this block.

## Next Safe Step

Commit, push/deploy if checks stay green, then run lightweight live smoke for V2-P2-C marker, System Hands, Scheme Hands, Memory Search and mobile widths.
