# Terminator V2-P0-D Controlled Apply Safety Wiring

Дата: 2026-05-30
Статус: PASS
Режим: V2 11/10 / P0 implementation / Memory Guard mode

## Цель

Подключить V2 Safety Core ко второму реальному workflow:

- Controlled Apply;
- Repair Workspace;
- rollback requirement;
- Verifier gate;
- Guardian gate;
- approval model;
- sanitized apply/rollback events.

Active project apply в этом блоке не выполнялся.

## Что реализовано

### Controlled Apply Gate

Добавлен `evaluateV2ControlledApplyRequest(applyRequest)`.

Проверяет:

- target resource / target path;
- sandbox или active project target;
- rollback availability;
- Verifier status;
- Guardian verdict;
- owner decision;
- secret-like diff markers;
- billing/network/AI API intent in diff.

### Apply Rules

Правила:

- sandbox + rollback + Verifier PASS -> `allow_with_warning`;
- sandbox without rollback -> `blocked`;
- Verifier FAIL -> `blocked`;
- Guardian HIGH risk -> `approval_required`;
- active project target without approval -> `approval_required`;
- active project target with approval but no rollback -> `blocked`;
- secret-like diff -> `red_zone_stop`;
- billing/network/AI API diff -> `red_zone_stop`;
- unknown target path -> `blocked`;
- rollback requested -> event recorded, no destructive side effect.

### Approval Model

Добавлен `createV2ControlledApplyApproval(applyRequest, verdict)`.

Создаёт V2 approval object для apply с:

- apply_id;
- approval_id;
- controlled_apply_status;
- rollback_status;
- verifier_status;
- guardian_verdict.

### Events

Добавлен `recordV2ControlledApplyEvent(type, payload)`.

Используемые event types:

- `v2.apply.requested`;
- `v2.apply.blocked`;
- `v2.apply.approval_required`;
- `v2.apply.allowed`;
- `v2.apply.completed`;
- `v2.rollback.required`;
- `v2.rollback.created`;
- `v2.rollback.completed`.

Payload проходит через существующий V2 sanitizer.

### Preview UI

В Approval Center добавлен блок `Controlled Apply`.

Normal mode показывает:

- исправление готово к проверке;
- откат найден / требуется;
- Verifier status;
- Guardian verdict;
- следующий шаг.

Expert details раскрываются через `<details>` и показывают:

- action;
- resource;
- target;
- rollback;
- verifier;
- guardian;
- approval_id;
- event.

## Изменённые файлы

Файл: `app.js`

Изменение:

- добавлен feature flag `v2ControlledApplyPreviewEnabled`;
- добавлены apply/rollback event types;
- добавлены Controlled Apply gate functions;
- добавлен Controlled Apply preview в Approval Center.

Риск: MEDIUM.

Причина риска: это safety/runtime gate, но active project apply не выполнялся.

## Evidence

Создано:

- `evidence/v2_p0_d_controlled_apply/V2_P0_D_CONTROLLED_APPLY_RESULT.md`;
- `evidence/v2_p0_d_controlled_apply/controlled_apply_samples.json`;
- `evidence/v2_p0_d_controlled_apply/controlled_apply_events.json`;
- `evidence/v2_p0_d_controlled_apply/rollback_sandbox_proof.json`;
- `evidence/v2_p0_d_controlled_apply/smoke.json`.

Sandbox proof:

- path: `D:\TerminatorStorage\temp_outputs\v2_p0_d_controlled_apply`;
- dummy target: `dummy_apply_target.txt`;
- active project mutated: false;
- restore hash equals original hash: PASS.

## Проверки

- `node --check app.js`: PASS;
- `node --check sw.js`: PASS;
- Controlled Apply samples 10/10: PASS;
- rollback sandbox proof: PASS;
- Controlled Apply preview visible: PASS;
- desktop no horizontal overflow: PASS;
- mobile 390 no horizontal overflow: PASS;
- mobile 430 no horizontal overflow: PASS;
- no mojibake: PASS;
- no AI API: PASS;
- no real secrets: PASS;
- billing/payment settings not touched: PASS;
- Cloudflare/GitHub settings not touched: PASS;
- Local Agent / Direct Bridge not touched: PASS.

## Не входило в scope

- real active project apply;
- Advanced Hands;
- Browser Worker;
- OpenClaw;
- APK / BlueStacks;
- real phone;
- billing dashboards;
- Local Agent / Direct Bridge changes;
- Cloudflare/GitHub settings.

## Остаточные риски

1. Controlled Apply пока реализован как gate/preview + sandbox proof, а не полный production apply executor.
   Severity: MEDIUM.
   Следующий шаг: подключать реальный repair package apply только через this gate.

2. Console smoke фиксирует внешние resource warnings.
   Severity: LOW.
   Page errors нет, P0 flow не блокируется.

## Verdict

V2-P0-D Controlled Apply Safety Wiring: PASS.
