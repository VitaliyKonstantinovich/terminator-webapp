# Terminator V2-P0-B Safety Core Wiring

Дата: 2026-05-30
Статус: PASS
Режим: V2 11/10 / P0 implementation / Memory Guard mode

## Цель

Подключить V2 foundation к первому реальному P0-ядру безопасности:

`action request -> Guardian verdict -> approval model -> sanitized event`.

## Что реализовано

### Safety Core API

Добавлены функции:

- `evaluateV2ActionRequest(actionRequest)`;
- `createV2ApprovalRequest(actionRequest, verdict)`;
- `recordV2GuardianVerdict(verdict, options)`;
- `v2SafetyRedTeamRequests()`;
- `getV2SafetyPreview(options)`.

### Verdict Rules

Покрыты правила:

- safe read `task_state`: `allow`;
- write `evidence`: `allow_with_warning`;
- write `repair_workspace`: `allow_with_warning`;
- write `active_project_files`: `approval_required`, rollback required;
- deploy `github_repo`: `typed_confirmation_required`, phrase `ALLOW DEPLOY`;
- push `github_repo`: `typed_confirmation_required`, phrase `ALLOW PUSH MAIN`;
- delete important resource: `typed_confirmation_required`, phrase `ALLOW DELETE`;
- `secrets_env`: `red_zone_stop`;
- `billing_payment`: `owner_assisted_required`;
- `network_settings`: `red_zone_stop`;
- `ai_api`: `red_zone_stop`;
- `browser_profiles`: `red_zone_stop`;
- `apk_signing`: `owner_assisted_required`;
- Emergency Stop reset:
  - no phrase: `typed_confirmation_required`;
  - wrong phrase: `blocked`;
  - exact `RESET EMERGENCY STOP`: `allow_with_warning`.

### Approval Model

`createV2ApprovalRequest()` создаёт `V2ApprovalContract` с:

- `approval_id`;
- `action`;
- `resource`;
- `risk_level`;
- `reason`;
- `affected_resources`;
- `rollback_status`;
- `verifier_status`;
- `guardian_verdict`;
- `required_typed_phrase`;
- `status`.

### Event Log

`recordV2GuardianVerdict()` создаёт sanitized `v2.guardian.verdict` event.

В event не пишется raw typed phrase: вместо неё фиксируется `[required]`.

### Safety Preview

`getV2SafetyPreview()` возвращает безопасный preview:

- 15 red-team samples;
- request;
- verdict;
- approval model;
- sanitized event;
- summary by verdict.

Флаг `v2SafetyPolicyPreviewEnabled` остаётся safe/off по умолчанию. Preview включает его только в test path через option.

## Изменённые файлы

Файл: `app.js`

Изменение:

- добавлен `ai_api` resource;
- расширена red-zone matrix;
- добавлены typed confirmation phrases;
- добавлен Safety Core API;
- добавлен red-team sample builder;
- убран fake `sk-` literal из foundation preview payload.

Причина:

- сделать capability matrix и event log рабочим Safety Core, а не пассивным contract layer.

Риск: MEDIUM

Риск связан с размером `app.js`, но изменение изолировано как helper/API слой и не меняет ordinary V1 UI.

## Evidence

Создано:

- `evidence/v2_p0_b_safety_core/safety_verdict_samples.json`;
- `evidence/v2_p0_b_safety_core/safety_event_samples.json`;
- `evidence/v2_p0_b_safety_core/red_team_samples.json`;
- `evidence/v2_p0_b_safety_core/smoke.json`;
- `evidence/v2_p0_b_safety_core/V2_P0_B_SAFETY_CORE_RESULT.md`.

## Проверки

- `node --check app.js`: PASS;
- `node --check sw.js`: PASS;
- local Chrome CDP boot: PASS;
- `getV2SafetyPreview`: PASS;
- 15 red-team samples: PASS;
- event sanitizer: PASS;
- local desktop no horizontal overflow: PASS;
- mobile 390 no horizontal overflow: PASS;
- mobile 430 no horizontal overflow: PASS;
- no AI API in changed diff: PASS;
- no real secrets in changed diff/evidence: PASS;
- billing/payment settings not touched: PASS;
- Cloudflare/GitHub settings not touched: PASS;
- BlueStacks not launched: PASS.

## Red-Team Summary

| Verdict | Count |
|---|---:|
| allow | 1 |
| allow_with_warning | 3 |
| approval_required | 1 |
| typed_confirmation_required | 4 |
| blocked | 1 |
| owner_assisted_required | 1 |
| red_zone_stop | 4 |

Failed samples: 0.

## Не входило в scope

- Product Shell;
- QA Autotest Factory;
- Advanced Hands;
- Browser Worker;
- OpenClaw;
- APK / BlueStacks;
- real phone;
- billing dashboards;
- Local Agent / Direct Bridge;
- Cloudflare/GitHub settings.

## Остаточные риски

1. Safety Core пока API/preview layer, не полный runtime gate для всех V1 actions.
   Severity: MEDIUM.
   Следующий шаг: подключать конкретные flows к `evaluateV2ActionRequest()` по одному.

2. Normal UI не показывает Safety Core matrix.
   Severity: LOW.
   Причина: намеренно скрыто, чтобы не перегружать владельца и не ломать V1.

## Verdict

V2-P0-B Safety Core Wiring: PASS.
