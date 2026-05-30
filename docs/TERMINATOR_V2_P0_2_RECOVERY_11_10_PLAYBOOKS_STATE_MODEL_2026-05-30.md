# Terminator V2-P0-2: Recovery 11/10 Playbooks + State Model

Status: PLANNING PASS

Date: 2026-05-30

Mode: V2 11/10 / P0 Planning

## 1. Goal

Recovery 11/10 defines how Terminator detects, explains, routes, repairs, verifies and closes failures without forcing the owner into manual technical work.

The owner should see:
- what happened;
- how dangerous it is;
- what is safe to do now;
- what requires approval;
- what evidence exists;
- how to repair or postpone;
- how to rollback if a change is applied.

## 2. Why Recovery Is P0

Terminator is not only a UI. It is a controlled operating system for work. If it cannot recover safely, the product cannot be trusted.

Recovery is P0 because it protects:
- task lifecycle;
- memory;
- evidence;
- local runtime;
- owner decisions;
- repair workflow;
- cost/security boundaries.

V2 11/10 fails if Recovery becomes decorative, unclear, unsafe or manual-only.

## 3. Supported Incident Types

P0 incident classes:
- WebApp UI broken;
- Memory Search degraded;
- Local Agent unavailable;
- Direct Bridge unavailable;
- Codex Repair unavailable;
- Evidence missing;
- Verifier FAIL;
- Guardian HIGH risk;
- Rollback missing;
- Cost Guard unknown;
- Privacy Guard warning;
- Mobile/PWA issue.

Each incident must have:
- owner-facing explanation;
- severity;
- component;
- state;
- evidence refs;
- next action;
- owner-assisted marker when applicable.

## 4. Incident State Machine

| State | Meaning | Next Actor | Required Data | User UI | Evidence | Risk |
| --- | --- | --- | --- | --- | --- | --- |
| detected | Symptom is observed | Diagnost | symptom, component, time | "Проблема найдена" | health snapshot | LOW |
| classified | Severity and type assigned | Diagnost / Guardian | severity, incident type | simple risk label | classification record | MEDIUM |
| explained | Owner-facing explanation created | System | plain text reason, next step | explanation card | explanation artifact | LOW |
| awaiting_user_action | System needs owner choice | Owner | choices, risk | one primary action | user decision event | MEDIUM |
| diagnostic_pack_created | Pack is ready for repair/review | Diagnost | constraints, logs, forbidden actions | "Пакет диагностики готов" | diagnostic pack | MEDIUM |
| repair_workspace_created | Isolated workspace exists | System / Repair Operator | path, copied refs | "Ремонтная зона создана" | workspace manifest | MEDIUM |
| repair_in_progress | Repair is being prepared | Codex Repair | task, constraints | progress / external wait | repair log | MEDIUM |
| verifier_check | Fix/report is being checked | Verifier | diff/report/evidence | verdict pending | verifier report | HIGH |
| guardian_check | Risk policy is checked | Guardian | action, diff, paths, risk | risk label | policy verdict | HIGH |
| approval_required | Owner approval is required | Owner | approval phrase, risk | approval dialog | approval record | HIGH |
| ready_to_apply | Safe package is ready | Owner | rollback, verifier, guardian | Apply / Reject | apply package | HIGH |
| applied | Approved change applied | System / Worker | approval_id, affected refs | "Применено" | apply log | HIGH |
| rollback_available | Rollback point exists | System | backup/hash/instructions | "Откат доступен" | rollback manifest | MEDIUM |
| recovered | Health check passed after repair | Diagnost / Verifier | post-check result | "Восстановлено" | recovery report | LOW |
| closed | Incident is closed | Owner/System | final verdict | closed state | closure record | LOW |
| blocked | Progress stopped by missing gate | Guardian/System | blocker reason | "Нельзя продолжить" | blocker record | HIGH |
| escalated | Needs higher-risk or manual path | Guardian/Owner | escalation reason | "Требуется решение владельца" | escalation record | HIGH |
| owner_assisted_required | External owner action required | Owner | dashboard/device/account item | owner checklist | owner-assisted record | MEDIUM |

Rules:
- `applied` cannot happen before `guardian_check`, `verifier_check` and rollback when data changes.
- `closed` cannot hide unresolved owner-assisted items.
- `blocked` must include one safe next step.
- `owner_assisted_required` is not a product FAIL by itself.

## 5. Repair / Rollback State Machine

| State | Meaning | Gate |
| --- | --- | --- |
| repair_requested | Owner or Diagnost requests repair | Guardian checks whether repair is allowed |
| pack_created | Diagnostic Pack exists | Privacy Guard scan required |
| workspace_prepared | Isolated repair workspace exists | active project untouched |
| candidate_fix_ready | Codex or worker prepared a fix/report | no auto-apply |
| diff_ready | Changed refs/diff summarized | owner can inspect |
| verifier_passed | Verifier PASS or PASS_WITH_RISKS | FAIL blocks apply |
| guardian_approved_path | Risk classified | HIGH/CRITICAL requires approval |
| rollback_point_created | Rollback manifest exists | required for data/file changes |
| approval_confirmed | Owner confirmed action | typed confirmation for critical actions |
| apply_executed | Controlled apply completed | event/audit required |
| post_check_passed | Health check after apply passed | incident can move recovered |
| rollback_requested | Owner or Guardian requests rollback | rollback manifest required |
| rollback_executed | Previous state restored | post-rollback check required |
| repair_rejected | Owner rejects package | no apply |

Hard blocks:
- no rollback point for data/file change -> apply blocked;
- Verifier FAIL -> apply blocked;
- Guardian HIGH/CRITICAL without approval -> apply blocked;
- Diagnostic Pack contains secret -> repair blocked until redacted;
- repair workspace unavailable -> repair blocked.

## 6. Recovery Playbooks

### 1. WebApp UI Broken

- Trigger: page does not open, layout is broken, or primary button does not work.
- User-facing explanation: "Интерфейс сейчас работает неправильно. Можно проверить страницу и открыть безопасный маршрут восстановления."
- Immediate safe action: hard refresh / open Diagnost / use live marker check.
- Diagnostic steps: check console, version marker, service worker, layout smoke.
- Codex Repair: allowed only through Diagnostic Pack and UI diff review.
- Rollback expectation: required if app files change.
- Approval: required for deploy/push.
- Evidence: screenshot, console log, version marker.
- PASS: issue explained and safe repair path available.
- FAIL: blank screen or no next action.

### 2. Memory Search Degraded

- Trigger: no relevant results, weak results only, stale index.
- Explanation: "Память не нашла уверенный результат или индекс устарел."
- Safe action: show empty/weak state and offer reindex/check.
- Diagnostic steps: index age, query score, refs, secret scan.
- Codex Repair: allowed for index metadata repair, not for secrets.
- Rollback: required if index files are rewritten.
- Approval: required for destructive reindex/cleanup.
- Evidence: search trace, query, refs.
- PASS: no false confident results.
- FAIL: irrelevant result shown as confident.

### 3. Local Agent Unavailable

- Trigger: agent offline, duplicate process, autostart issue.
- Explanation: "Локальный агент на ПК сейчас не отвечает."
- Safe action: show status, offer controlled restart/check.
- Diagnostic steps: process count, scheduled task, last heartbeat.
- Codex Repair: allowed for report/package; restart requires controlled path.
- Rollback: not usually required for status check, required for config change.
- Approval: stop/restart requires approval.
- Evidence: process snapshot, scheduler status.
- PASS: owner sees status and safe restart path.
- FAIL: silent start/stop outside Guardian.

### 4. Direct Bridge Unavailable

- Trigger: bridge health fail or command queue issue.
- Explanation: "Мост сайт ↔ ПК сейчас не отвечает."
- Safe action: retry health check, show offline mode, prepare diagnostic pack.
- Diagnostic steps: `/health`, queue latency, command stale count.
- Codex Repair: docs/diff only; Cloudflare changes require approval.
- Rollback: required for worker/config change.
- Approval: deploy/Cloudflare settings require owner approval.
- Evidence: health response, timestamps.
- PASS: app degrades gracefully.
- FAIL: system pretends bridge is ready.

### 5. Codex Repair Unavailable

- Trigger: Codex not found, handshake fail, repair workspace fail.
- Explanation: "Ремонт через Codex сейчас недоступен."
- Safe action: offer manual Diagnostic Pack copy path.
- Diagnostic steps: Codex readiness, workspace path, permissions.
- Codex Repair: unavailable; fallback is assisted/manual.
- Rollback: not applicable until fix package exists.
- Approval: required before any apply.
- Evidence: readiness check, workspace error.
- PASS: owner still gets a manual path.
- FAIL: repair button does nothing.

### 6. Evidence Missing

- Trigger: artifact exists but evidence link is missing or broken.
- Explanation: "Результат есть, но доказательство не найдено."
- Safe action: mark as needs evidence, request reattach/recheck.
- Diagnostic steps: refs, file path, evidence metadata.
- Codex Repair: allowed for metadata repair in workspace.
- Rollback: required for metadata mutation.
- Approval: required if deleting/relinking real evidence.
- Evidence: broken ref report.
- PASS: Verifier does not pass unsupported result.
- FAIL: false PASS without evidence.

### 7. Verifier FAIL

- Trigger: weak executor report, no proof, no "what to verify first".
- Explanation: "Проверка не приняла результат."
- Safe action: create fix request / return to executor.
- Diagnostic steps: criteria, evidence, risks, contradictions.
- Codex Repair: allowed to prepare fix request, not auto-accept.
- Rollback: not needed unless apply was attempted.
- Approval: owner decides accept/rework/reject.
- Evidence: verifier report.
- PASS: FAIL blocks apply/accept.
- FAIL: Verifier ignored.

### 8. Guardian HIGH Risk

- Trigger: deploy, push main, delete, .env, network, billing, unknown executable.
- Explanation: "Это опасное действие. Нужна проверка и подтверждение."
- Safe action: block and show Approval.
- Diagnostic steps: action, paths, blast radius, rollback feasibility.
- Codex Repair: may prepare explanation only.
- Rollback: required where state changes.
- Approval: mandatory, typed confirmation for critical.
- Evidence: policy verdict, approval record.
- PASS: action does not run silently.
- FAIL: Guardian bypass.

### 9. Rollback Missing

- Trigger: apply package has no rollback point.
- Explanation: "Откат не подготовлен, применять нельзя."
- Safe action: block apply and create rollback plan.
- Diagnostic steps: affected refs, backup path, hashes.
- Codex Repair: allowed to prepare rollback plan.
- Rollback: required before apply.
- Approval: apply remains blocked.
- Evidence: missing rollback defect.
- PASS: apply blocked.
- FAIL: apply proceeds.

### 10. Cost Guard Unknown

- Trigger: billing status unknown or paid service risk.
- Explanation: "Финансовый риск не проверен."
- Safe action: mark owner-assisted and block paid enablement.
- Diagnostic steps: service inventory, known paid providers, owner checklist.
- Codex Repair: not applicable to billing dashboards.
- Rollback: not applicable unless config changed.
- Approval: Cost Approval required.
- Evidence: cost guard status.
- PASS: unknown billing is warning, not PASS.
- FAIL: paid provider enabled silently.

### 11. Privacy Guard Warning

- Trigger: possible secret, token, cookie or private data.
- Explanation: "Найдены данные, которые нельзя отправлять без проверки."
- Safe action: block send/copy, redact or ask owner.
- Diagnostic steps: secret pattern, source path, context pack scan.
- Codex Repair: blocked until redacted.
- Rollback: required if files are rewritten.
- Approval: owner approval for any sensitive disclosure.
- Evidence: redaction report without leaking value.
- PASS: secret value not exposed.
- FAIL: secret in docs/evidence/pack.

### 12. Mobile/PWA Issue

- Trigger: narrow viewport broken, PWA stale, BlueStacks issue, real phone pending.
- Explanation: "Мобильный режим требует проверки."
- Safe action: web/PWA smoke, mark real phone owner-assisted.
- Diagnostic steps: viewport width, service worker marker, tap targets.
- Codex Repair: allowed for layout plan after evidence.
- Rollback: required for UI code changes.
- Approval: deploy requires approval.
- Evidence: screenshot or DOM smoke.
- PASS: mobile web usable or correctly PARTIAL.
- FAIL: emulator treated as real phone final PASS.

## 7. User-Facing Copy

| Playbook | Ordinary Copy | Button |
| --- | --- | --- |
| WebApp UI broken | "Интерфейс сейчас работает неправильно. Проверим страницу и подберём безопасный путь." | Проверить интерфейс |
| Memory Search degraded | "Память не нашла уверенный результат. Можно проверить индекс." | Проверить память |
| Local Agent unavailable | "ПК-агент сейчас не отвечает. Можно проверить запуск." | Проверить агент |
| Direct Bridge unavailable | "Мост сайт ↔ ПК сейчас не отвечает. Можно повторить проверку." | Проверить мост |
| Codex Repair unavailable | "Ремонт через Codex недоступен. Можно подготовить ручной пакет диагностики." | Создать пакет |
| Evidence missing | "Доказательство не найдено. Результат нельзя уверенно принять." | Найти evidence |
| Verifier FAIL | "Проверка не приняла результат. Нужно вернуть на доработку." | Создать fix request |
| Guardian HIGH risk | "Это опасное действие. Требуется подтверждение владельца." | Открыть Approval |
| Rollback missing | "Откат не подготовлен. Применять нельзя." | Подготовить откат |
| Cost Guard unknown | "Финансовый риск не проверен. Это требует проверки владельца." | Проверить стоимость |
| Privacy Guard warning | "Есть риск приватных данных. Отправка заблокирована." | Проверить данные |
| Mobile/PWA issue | "Мобильный режим требует проверки. Реальный телефон проверим отдельно." | Проверить mobile |

## 8. Expert Mode

Expert Mode may show:
- incident_id;
- component_id;
- raw logs;
- health endpoint;
- stack/error;
- repair workspace path;
- diff;
- rollback path;
- state JSON;
- policy verdict;
- capability matrix.

Ordinary Mode must not show this by default.

## 9. Where Approval Is Required

Approval required:
- apply fix;
- stop/restart Local Agent;
- deploy;
- push main;
- delete;
- rewrite storage/index;
- expose private data;
- enable paid service;
- production rollback.

Typed confirmation required:
- reset Emergency Stop;
- critical delete;
- deploy/push main;
- production rollback;
- billing/payment enablement.

## 10. Where Verifier / Guardian / Rollback Are Required

Verifier required:
- executor report acceptance;
- Codex repair report;
- Decision Passport;
- recovery after apply.

Guardian required:
- every risky action;
- every repair apply;
- every worker action;
- every cost/security/privacy risk.

Rollback required:
- file changes;
- config changes;
- memory/index rewrite;
- metadata repair;
- production apply.

## 11. Owner-Assisted Boundaries

Owner-assisted, not current product FAIL:
- real phone APK acceptance;
- production signing;
- billing dashboards;
- production rollback on active project;
- legacy browser profile cleanup.

These must stay visible as postponed/owner-assisted, not green PASS.

## 12. Acceptance Criteria

Recovery P0 acceptance:
1. Every error has understandable explanation.
2. Every error has a next action.
3. Dangerous action does not execute without Approval.
4. Emergency Stop does not reset without typed confirmation.
5. Repair cannot apply without rollback when data changes.
6. Verifier FAIL blocks apply.
7. Guardian HIGH risk requires Approval.
8. Owner-assisted is separated from defect.
9. Recovery does not create fake PASS.
10. Owner understands what happened and what to do next.

## 13. FAIL Conditions

Recovery fails if:
- error has no explanation;
- error has no next action;
- apply happens without rollback;
- Guardian is bypassed;
- Verifier is ignored;
- Codex Repair changes active project directly;
- Emergency Stop resets with one click;
- secret enters Diagnostic Pack;
- owner-assisted item is called a bug;
- technical junk appears in ordinary UI.

## 14. Planning Verdict

V2-P0-2 planning status: PASS

Implementation may start only after a bounded V2-P0-2 implementation task is issued.
