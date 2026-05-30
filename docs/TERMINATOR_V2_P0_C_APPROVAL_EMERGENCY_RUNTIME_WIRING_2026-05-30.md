# Terminator V2-P0-C Approval + Emergency Runtime Wiring

Дата: 2026-05-30
Статус: PASS
Режим: V2 11/10 / P0 implementation / Memory Guard mode

## Цель

Подключить V2 Safety Core к одному реальному workflow:

- Emergency Stop reset;
- Approval Center preview;
- dangerous action approval model;
- sanitized event log;
- ordinary/expert split.

## Что реализовано

### Emergency Stop Reset

V1 Emergency Stop reset теперь проходит через:

- `evaluateV2ActionRequest()`;
- `createV2ApprovalRequest()`;
- `recordV2GuardianVerdict()`;
- V2 emergency stop events.

Проверенная логика:

- no phrase -> `typed_confirmation_required`;
- wrong phrase -> `blocked`;
- correct phrase `RESET EMERGENCY STOP` -> `allow_with_warning`;
- wrong/no phrase не сбрасывают Emergency Stop;
- correct phrase сбрасывает Emergency Stop и Safe Mode;
- события пишутся в V2 event log.

### Events

Добавлены / используются:

- `v2.guardian.verdict`;
- `v2.approval.requested`;
- `v2.approval.decided`;
- `v2.emergency_stop.reset_requested`;
- `v2.emergency_stop.reset_confirmed`;
- `v2.emergency_stop.reset_cancelled`.

Payload не содержит raw typed phrase. Требуемая фраза пишется как `[required]`.

### Approval Center Preview

В Approval Center добавлен compact V2 Safety Preview:

- deploy -> typed confirmation `ALLOW DEPLOY`;
- push main -> typed confirmation `ALLOW PUSH MAIN`;
- delete restore point -> typed confirmation `ALLOW DELETE`;
- read secrets -> `red_zone_stop`;
- billing -> `owner_assisted_required`.

Normal UI показывает простые русские объяснения.
Expert details раскрываются через `<details>`.

## Изменённые файлы

Файл: `app.js`

Изменение:

- добавлен resource `emergency_stop`;
- добавлен event type `v2.emergency_stop.reset_cancelled`;
- добавлен `buildV2ApprovalEmergencySamples()`;
- добавлен `getV2ApprovalEmergencyPreview()`;
- добавлен `renderV2EmergencyStopPreview()`;
- добавлен `renderV2ApprovalCenterPreview()`;
- `handleGuardianAction('safe_mode_off')` теперь блокируется Safety Core при active Emergency Stop;
- `handleGuardianAction('reset_emergency_stop')` теперь использует Safety Core verdict.

Риск: MEDIUM

Риск связан с изменением реального Guardian workflow. Проверено через local DOM runtime smoke.

## Evidence

Создано:

- `evidence/v2_p0_c_approval_emergency/emergency_stop_verdicts.json`;
- `evidence/v2_p0_c_approval_emergency/approval_center_samples.json`;
- `evidence/v2_p0_c_approval_emergency/sanitized_events.json`;
- `evidence/v2_p0_c_approval_emergency/smoke.json`;
- `evidence/v2_p0_c_approval_emergency/V2_P0_C_APPROVAL_EMERGENCY_RESULT.md`.

## Проверки

- `node --check app.js`: PASS;
- `node --check sw.js`: PASS;
- local Chrome CDP boot: PASS;
- Emergency Stop no phrase remains active: PASS;
- Emergency Stop wrong phrase remains active: PASS;
- Emergency Stop correct phrase resets: PASS;
- V2 guardian verdict event created: PASS;
- V2 reset requested/confirmed/cancelled events created: PASS;
- Approval Center preview visible: PASS;
- Emergency Stop Safety Core preview visible while active: PASS;
- mobile 390 no horizontal overflow: PASS;
- mobile 430 no horizontal overflow: PASS;
- no secrets in evidence: PASS;
- no AI API in changed diff: PASS;
- billing/payment settings not touched: PASS;
- Cloudflare/GitHub settings not touched: PASS.

## Что не входило в scope

- wiring Safety Core into every V1 button;
- Product Shell;
- QA Autotest Factory;
- Advanced Hands;
- Browser Worker;
- APK / BlueStacks;
- real phone;
- billing dashboards;
- Local Agent / Direct Bridge.

## Остаточные риски

1. Safety Core подключён к Emergency Stop and Approval Preview, но ещё не ко всем risky workflows.
   Severity: MEDIUM.
   Следующий шаг: подключать Controlled Apply / Hands / Memory Search по одному.

2. Approval Center preview пока не исполняет действий.
   Severity: LOW.
   Это намеренно: preview-only, без выполнения dangerous actions.

## Verdict

V2-P0-C Approval + Emergency Runtime Wiring: PASS.
