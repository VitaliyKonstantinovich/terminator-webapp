# Phase 11 - Hands / Safe Workers V1

Status: local PASS.
Date: 2026-05-27.

## Purpose

Hands V1 adds the safe action layer for Terminator.

This phase does not make the app an autoclicker or a shell executor. It creates controlled action plans with risk, rollback, Verifier and Approval gates.

## User Terms

- Hands / Ruki: safe action layer.
- Worker: helper role for file/code/browser/system/memory/device actions.
- Approval: owner confirmation before risky work.
- Rollback: return path before applying changes.
- Verifier: check layer before accepting a result.

## Implemented

- Added local Hands state model: `mina_hands_safe_actions_v1`.
- Added action plans linked to task runtime as `hands_action_plans`.
- Added `HANDS_ACTION_PLAN` artifact type.
- Added Workspace tab `Руки`.
- Added System panel `Руки / Safe Workers`.
- Added safe plan creation from System and Workspace.
- Added automatic risk upgrade for forbidden action words.
- Added Approval creation from a Hands plan.
- Added Verifier and rollback requirements in every plan.
- Added Memory Search indexing for `hands_plan` messages.
- Connected Mina Scheme `Руки` to real Hands snapshot.
- Updated PWA cache marker to `phase11-hands-safe-workers-v1`.

## Safety Rules

- No direct execution.
- No delete.
- No deploy.
- No push main.
- No `.env`, tokens, cookies or sessions.
- No network/DNS/VPN/proxy/firewall changes.
- No Windows security changes.
- No archive extraction.
- No account or payment actions.
- Risky plans create Approval instead of executing.

## Files Changed

- `webapp/app.js`
- `webapp/index.html`
- `webapp/styles.css`
- `webapp/sw.js`
- `webapp/docs/PHASE11_HANDS_SAFE_WORKERS_2026-05-27.md`
- `evidence/phase11_hands_safe_workers/PHASE11_HANDS_SAFE_WORKERS_RESULT.md`
- `CODEX_CURRENT_TASK.md`
- `docs/CODEX_SESSION_SUMMARY.md`
- `memory/TERMINATOR_MASTER_MEMORY.md`

## Checks Required

- `node --check webapp/app.js`: PASS.
- `node --check webapp/sw.js`: PASS.
- `git diff --check`: PASS, CRLF notices only.
- Desktop UI smoke: PASS, System Hands panel exists and actions are available.
- Workspace UI smoke: PASS, task opens `Руки` tab and creates a task-linked plan.
- Approval smoke: PASS, risky plan creates Approval without execution.
- Mobile smoke: PASS, 390px horizontal overflow = 0.
- No AI API: PASS, no new AI API calls added.
- No secrets: PASS, no secret values found; only documented secret names remain in policy/history docs.

## Evidence Screenshots

- `D:\TerminatorStorage\evidence_backups\phase11_hands_safe_workers\phase11-hands-mobile-system.png`
- `D:\TerminatorStorage\evidence_backups\phase11_hands_safe_workers\phase11-hands-system-desktop.png`
- `D:\TerminatorStorage\evidence_backups\phase11_hands_safe_workers\phase11-hands-system-panel.png`
- `D:\TerminatorStorage\evidence_backups\phase11_hands_safe_workers\phase11-hands-workspace-panel.png`

## Residual

Hands V1 is a safe planner. Real worker execution remains future work behind Guardian, Approval, rollback, Verifier and explicit owner decision.
