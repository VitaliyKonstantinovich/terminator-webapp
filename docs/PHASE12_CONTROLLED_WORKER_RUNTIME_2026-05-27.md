# Phase 12 - Controlled Worker Runtime V1

Status: local PASS.
Date: 2026-05-27.

## Purpose

Phase 12 adds the first controlled execution layer for Hands.

Controlled Worker Runtime means: a strictly limited runtime for safe LOW-risk actions inside the WebApp. It is not shell access, not PowerShell, not file-system automation, not deploy, not push, not delete and not `.env` work.

## User Terms

- Controlled Worker Runtime: controlled safe runner.
- LOW-risk: safe action that does not touch OS, project files, secrets, deploy, network or accounts.
- Allowlist: exact list of actions allowed to run.
- Rollback point: snapshot before a local state change.
- Runtime report: task artifact proving what was executed and checked.

## Implemented

- Added local runtime state: `mina_controlled_worker_runtime_v1`.
- Added allowlist-only runtime policy.
- Added four safe actions:
  - `readiness_snapshot`: read-only readiness snapshot.
  - `memory_index_refresh`: refresh local Memory Search index.
  - `task_metadata_stamp`: write safe metadata to the selected task only.
  - `worker_readiness_report`: create safe worker readiness report.
- Added risk gate before every runtime run.
- Added blocking for deploy, push, delete, `.env`, secrets, network and active project write actions.
- Added rollback snapshot before every state-changing allowed action.
- Added runtime self-check and Verifier-style result summary.
- Added `WORKER_RUNTIME_REPORT` artifact type.
- Added `worker_runtime` timeline messages.
- Connected runtime to System `Руки`, Workspace `Руки` and Mina Scheme `Руки`.
- Updated phase checkpoint and PWA cache marker.
- Fixed Workspace `Руки` responsive layout so the right panel does not create horizontal overflow.

## Safety Rules

- No shell.
- No PowerShell.
- No deploy.
- No push main.
- No delete.
- No `.env`.
- No secrets, tokens, cookies or sessions.
- No DNS/VPN/proxy/firewall/Defender changes.
- No archive extraction.
- No account or payment actions.
- No active project file writes.
- Dangerous or unknown actions are blocked or routed to Approval.

## Files Changed

- `webapp/app.js`
- `webapp/index.html`
- `webapp/styles.css`
- `webapp/sw.js`
- `webapp/docs/PHASE12_CONTROLLED_WORKER_RUNTIME_2026-05-27.md`
- `evidence/phase12_controlled_worker_runtime/PHASE12_CONTROLLED_WORKER_RUNTIME_RESULT.md`
- `CODEX_CURRENT_TASK.md`
- `docs/CODEX_SESSION_SUMMARY.md`
- `memory/TERMINATOR_MASTER_MEMORY.md`

## Checks

- `node --check webapp/app.js`: PASS.
- `node --check webapp/sw.js`: PASS.
- `git diff --check`: PASS, CRLF notices only.
- Desktop runtime smoke: PASS.
- Workspace runtime smoke: PASS.
- Dangerous command block: PASS.
- Task artifact creation: PASS.
- Timeline event creation: PASS.
- Desktop overflow check: PASS, Workspace and right panel overflow = 0.
- Mobile smoke: PASS, 390px horizontal overflow = 0 from Phase 12 browser smoke.
- No AI API: PASS, no new AI API calls added.
- No secrets: PASS, no secret values found; existing docs contain secret names only.

## Evidence Screenshots

- `D:\TerminatorStorage\evidence_backups\phase12_controlled_worker_runtime\phase12-controlled-runtime-system.png`
- `D:\TerminatorStorage\evidence_backups\phase12_controlled_worker_runtime\phase12-controlled-runtime-workspace.png`
- `D:\TerminatorStorage\evidence_backups\phase12_controlled_worker_runtime\phase12-controlled-runtime-mobile.png`

## Residual

Phase 12 intentionally executes only safe WebApp-local allowlisted actions. Real OS workers, browser automation, file writes to the active project, deploy, push and system changes remain future work behind Guardian, Approval, Verifier, rollback and explicit owner decision.
