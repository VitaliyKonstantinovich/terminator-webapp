# Terminator V2-P2-A — Advanced Eyes / Visual Evidence Foundation

Status: PASS

## Scope

Implemented a bounded read-only Eyes foundation for Mina UI. Eyes observe the current interface, summarize visible state, create visual evidence metadata, and connect that evidence to Product Shell, Diagnost, Mina Scheme, Workspace, QA and Memory/Verifier flow.

Out of scope: clicks on behalf of the owner, browser worker automation, real external websites, visual AI, repair, secrets, AI API, billing, Local Agent, Direct Bridge, BlueStacks, APK, heavy screenshot/video evidence.

## Implemented

- Eyes state model upgraded to schema v2 with advanced readiness fields.
- VisualEvidenceRecord now supports evidence id, source, type, viewport, DOM summary, layout evidence, console snapshot placeholder, accessibility basics, linked task/artifact/incident refs.
- System -> Eyes panel now shows:
  - Visual Smoke Summary.
  - DOM Snapshot Summary.
  - Layout Evidence.
  - Console Snapshot placeholder.
  - Accessibility Basics.
  - Evidence Binding.
- Workspace -> Eyes can create a combined state snapshot and task-linked EVIDENCE artifact.
- Product Shell shows an Eyes / Evidence card and routes to System Eyes.
- Diagnost has an action to create visual evidence without running repair or commands.
- Mina Scheme Eyes panel shows advanced visual status and can create a system evidence record.
- Normal Eyes UI keeps technical details out of the visible panel; technical JSON stays in Expert mode.

## Changed Files

- app.js
  - Added advanced Eyes state, snapshot builders, evidence creation, Product Shell/Diagnost/Mina Scheme/Workspace integrations.
- styles.css
  - Added responsive styling for Eyes capability cards, task summary, expert block, and Product Shell Eyes card.
- index.html
  - Updated app cache marker to `20260530-v2-p2-a-eyes-v1`.

## Evidence

- evidence/v2_p2_a_advanced_eyes/eyes_state.json
- evidence/v2_p2_a_advanced_eyes/dom_snapshot_summary.json
- evidence/v2_p2_a_advanced_eyes/layout_evidence.json
- evidence/v2_p2_a_advanced_eyes/accessibility_basics.json
- evidence/v2_p2_a_advanced_eyes/console_snapshot.json
- evidence/v2_p2_a_advanced_eyes/integration_smoke.json
- evidence/v2_p2_a_advanced_eyes/smoke/local_dom_smoke.json

## Checks

- Memory Guard: GREEN before implementation.
- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- Local DOM smoke: PASS.
- System Eyes panel visible: PASS.
- Product Shell Eyes card visible: PASS.
- Diagnost visual evidence action visible: PASS.
- Mina Scheme Eyes integration visible: PASS.
- Mobile 390/430 no horizontal overflow: PASS.
- Normal Eyes UI has no `CDP`, `Playwright`, `raw DOM`, `DevTools Protocol`: PASS.
- AI API: not used.
- Billing: not touched.
- Secrets/.env: not touched.

## Known Limits

- Console Snapshot is a bounded placeholder; P2-A does not scrape browser logs.
- Accessibility Basics is a lightweight check, not a full WCAG audit.
- Evidence files are metadata/json only; no heavy screenshots were generated.
- Live deploy smoke is separate and only runs after commit/push/deploy approval.

## Next Recommended Step

Commit, push, deploy, and run lightweight live smoke for V2-P2-A if owner approval remains active for this product loop.
