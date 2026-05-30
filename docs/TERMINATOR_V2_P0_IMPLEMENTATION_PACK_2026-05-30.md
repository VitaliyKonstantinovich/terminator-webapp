# Terminator V2 P0 Implementation Planning Pack

Status: PLANNING PASS

Date: 2026-05-30

Mode: V2 11/10 / P0 Implementation Planning

## 1. Purpose

This pack converts accepted V2 P0 planning into an implementation-ready sequence without starting feature coding.

Accepted P0 pillars:
- P0-1 First Run 11/10 + Recovery Command Center;
- P0-2 Recovery 11/10 playbooks and state model;
- P0-3 Memory Search 11/10 architecture and performance contract;
- P0-4 Safety / Control 11/10 capability matrix and threat model.

## 2. Implementation Blocks

| P0 Block | Goal | Implement | Screens | Data Models | Events | State Machines | Snapshots | Feature Flag | Migration | Rollback |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P0-1 First Run | owner understands setup in 10 sec | first-run route, readiness levels, owner-assisted checklist | Start, Scheme Mina, System, Mission | SetupProgress, SubsystemReadiness | setup.started, setup.route_selected | setup route | system, safety, memory, recovery | `v2_p0_first_run` | maybe UI state version | not usually |
| P0-2 Recovery | guided recovery, no manual pain | incidents, playbooks, repair/rollback states | Recovery Center, Diagnost, Incidents | Incident, DiagnosticPack, RollbackPoint | incident.*, recovery.* | incident, repair/rollback | diagnostics, verifier, guardian | `v2_p0_recovery` | yes for incident schema | yes |
| P0-3 Memory Search | fast relevant context | records, FTS index, refs, relevance | Memory, Workspace search, Scheme Mina status | MemoryRecord, SearchIndexEntry, FileIndexEntry | memory.index.*, memory.search.* | index lifecycle | memory/index/storage | `v2_p0_memory_search` | yes for memory schema/index | yes for index rebuild |
| P0-4 Safety / Control | no silent dangerous action | capability matrix, Guardian policy, Approval V2 | Approval, Guardian, Safe Mode, Recovery | Capability, PolicyVerdict, ApprovalRequest | guardian.*, approval.*, emergency.* | approval and emergency reset | safety, actor, resource | `v2_p0_safety` | yes for policy/audit schema | policy rollback/no-op |

## 3. Potential Files To Touch Later

Potential implementation files, not touched in this planning task:
- `app.js` for UI routing/state/renderers;
- `index.html` for screen hosts if needed;
- `styles.css` for V2 P0 UI;
- `sw.js` only if version marker/cache policy changes;
- docs/evidence;
- future local storage/index files under approved storage;
- future tests/smoke scripts.

Do not touch without explicit implementation task:
- `.env`;
- `agent.config.json`;
- Android source;
- workflows;
- Local Agent;
- Direct Bridge;
- Cloudflare/GitHub settings.

## 4. P0 Dependency Map

First Run depends on:
- Scheme Mina;
- Setup Route;
- Storage readiness;
- Local Agent status;
- Diagnost status;
- Safety state;
- Memory Search health.

Recovery depends on:
- Incident state model;
- Diagnostic Pack;
- Codex Repair;
- Verifier;
- Guardian;
- Rollback;
- Approval;
- Memory/evidence refs.

Memory Search depends on:
- structured records;
- SQLite FTS / local search;
- refs;
- Privacy Guard;
- index lifecycle;
- diagnostic health.

Safety / Control depends on:
- Capability Matrix;
- Guardian Policy Engine;
- Approval Center;
- Privacy Guard;
- Cost Guard;
- Emergency Stop;
- Audit/Event Log.

## 5. Recommended Implementation Order

Preferred order:

Phase A — Foundation:
- data contracts;
- event log;
- capability matrix;
- source-of-truth snapshots;
- feature flags.

Phase B — Safety Core:
- Guardian Policy Engine;
- Approval Center V2;
- Privacy Guard;
- Cost Guard;
- Emergency Stop hardening.

Phase C — Memory Search Core:
- structured records;
- index lifecycle;
- relevance scoring;
- secret filtering;
- performance budgets.

Phase D — Recovery Core:
- incident state machine;
- recovery playbooks;
- repair workspace state;
- rollback state;
- Verifier/Guardian gates.

Phase E — First Run UX:
- First Run Wizard;
- Setup Route;
- Scheme Mina readiness;
- ordinary/expert mode;
- owner-assisted boundaries.

Phase F — Integration + Regression:
- P0 end-to-end scenarios;
- red-team;
- performance;
- mobile/PWA-web;
- docs/evidence.

Why this order:
- Safety must exist before stronger actions.
- Memory and recovery need shared events/refs.
- First Run should present truthful final state, not create a separate truth.

## 6. Acceptance Criteria Summary

P0 accepted only if:
- first screen is understandable in 10 seconds;
- setup route has one correct next action;
- every error has explanation and next action;
- memory search is relevant and fast;
- impossible search returns empty state;
- secrets never enter context/evidence/memory;
- dangerous actions never execute silently;
- rollback exists before mutable apply;
- Verifier FAIL blocks apply;
- owner-assisted checks are not fake PASS;
- mobile/PWA-web does not break.

## 7. Test Requirements

Implementation must include:
- state transition tests;
- capability matrix decisions;
- secret detection;
- relevance scoring;
- first-run route;
- recovery playbooks;
- Emergency Stop reset;
- approval typed confirmations;
- memory search performance;
- mobile 390/430 smoke;
- red-team scenarios.

## 8. Feature Flags

Required flags:
- `v2_p0_first_run`;
- `v2_p0_recovery`;
- `v2_p0_memory_search`;
- `v2_p0_safety`;
- `v2_p0_expert_mode`;
- `v2_p0_owner_assisted`.

Feature flags must default safe and must not break V1 RC.

## 9. Migration / Rollback

Migration likely needed for:
- incident schema;
- memory records/index schema;
- policy/audit schema;
- setup progress schema.

Rollback required for:
- memory index rewrite;
- active project file mutation;
- metadata repair;
- policy changes;
- recovery apply.

No production rollback on active project until owner-assisted production V2 final.

## 10. Owner-Assisted / Postponed

Still postponed:
- real phone APK acceptance;
- production signing;
- billing dashboards;
- production rollback;
- legacy cleanup.

These are not P0 implementation blockers if clearly marked.

## 11. What Cannot Be Touched

Without separate approval:
- secrets;
- billing;
- AI API;
- Cloudflare/GitHub settings;
- network/DNS/VPN/proxy;
- force push;
- cleanup/delete;
- production signing;
- BlueStacks/real phone APK install.

## 12. Implementation Planning Verdict

V2 P0 Implementation Planning Pack: PASS

Can start V2 P0 implementation: YES, after reviewer/owner acceptance of this pack.

Recommended first implementation block:

Phase A — Foundation: data contracts, event log, capability matrix, source-of-truth snapshots and feature flags.
