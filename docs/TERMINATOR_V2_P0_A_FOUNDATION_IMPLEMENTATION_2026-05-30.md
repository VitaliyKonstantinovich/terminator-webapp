# Terminator V2-P0-A Foundation Implementation

Дата: 2026-05-30
Статус: PASS
Режим: V2 11/10 / P0 implementation / Memory Guard mode

## Цель

Добавить безопасный foundation-слой V2 без замены V1:

- feature flags;
- data contracts;
- V2 event log foundation;
- capability matrix;
- source-of-truth snapshots;
- lightweight DOM/evidence checks.

## Что реализовано

### Feature Flags

Добавлены безопасные флаги V2:

- `v2FoundationEnabled`;
- `v2EventLogEnabled`;
- `v2CapabilityMatrixEnabled`;
- `v2SourceSnapshotsEnabled`;
- `v2SafetyPolicyPreviewEnabled`;
- `v2MemoryContractPreviewEnabled`;
- `v2RecoveryStatePreviewEnabled`.

Все флаги по умолчанию выключены. V1 UX не переключается на V2 автоматически.

### Data Contracts

Добавлен единый contract helper `createV2Contract()` и contract names:

- `V2TaskContract`;
- `V2ArtifactContract`;
- `V2EvidenceContract`;
- `V2MemoryRecordContract`;
- `V2IncidentContract`;
- `V2ApprovalContract`;
- `V2CapabilityContract`;
- `V2EventContract`;
- `V2SnapshotContract`.

У contracts есть `id`, `type`, `contract_name`, `schema_version`, `created_at`, `updated_at`, `status`, `refs`, `risk_level`.

### Event Log Foundation

Добавлены:

- `loadV2FoundationEvents()`;
- `saveV2FoundationEvents()`;
- `recordV2Event()`;
- `sanitizeV2EventPayload()`.

События пишутся только в безопасный local preview-log `mina_v2_foundation_events_v1`.
Payload sanitization скрывает подозрительные поля и значения.

Поддержанные event types:

- `v2.task.created`;
- `v2.artifact.created`;
- `v2.evidence.created`;
- `v2.memory.recorded`;
- `v2.incident.detected`;
- `v2.incident.state_changed`;
- `v2.approval.requested`;
- `v2.approval.decided`;
- `v2.guardian.verdict`;
- `v2.verifier.verdict`;
- `v2.rollback.created`;
- `v2.recovery.started`;
- `v2.recovery.completed`;
- `v2.emergency_stop.enabled`;
- `v2.emergency_stop.reset_requested`;
- `v2.emergency_stop.reset_confirmed`.

### Capability Matrix

Добавлены actors/resources/actions/verdicts и evaluator:

- `getV2CapabilityMatrix()`;
- `evaluateV2Capability()`;
- `getV2CapabilitySnapshot()`.

Red-zone resources по умолчанию блокируются:

- secrets/env;
- billing/payment;
- network settings;
- GitHub settings;
- Cloudflare settings;
- APK signing;
- browser profiles.

Опасные действия `delete/deploy/push/configure` не разрешаются молча.

### Source-of-Truth Snapshots

Добавлены snapshot helpers:

- `getV2SystemSnapshot()`;
- `getV2ReadinessSnapshot()`;
- `getV2SafetySnapshot()`;
- `getV2MemorySnapshot()`;
- `getV2RecoverySnapshot()`;
- `getV2CapabilitySnapshot()`.

Правило: unknown не считается PASS.

### Preview Evidence API

Добавлен `buildV2FoundationPreview({ persistEvent })`.

Он создаёт safe preview:

- contracts sample;
- event sample;
- capability sample;
- snapshots sample.

Обычный UI не перегружен V2 техническими деталями.

## Изменённые файлы

Файл: `app.js`

Изменение:

- добавлены V2 constants;
- добавлены foundation helpers;
- добавлены event sanitizer и event log;
- добавлена capability matrix;
- добавлены snapshots;
- добавлен preview/evidence builder.

Причина:

- создать безопасный foundation слой V2-P0-A без миграции и без поломки V1.

Риск: MEDIUM

Причина риска:

- большой файл `app.js`, но изменение изолировано как helper/API слой.

## Evidence

Создано:

- `evidence/v2_p0_a_foundation/foundation_contracts_sample.json`;
- `evidence/v2_p0_a_foundation/foundation_events_sample.json`;
- `evidence/v2_p0_a_foundation/foundation_capability_sample.json`;
- `evidence/v2_p0_a_foundation/foundation_snapshots_sample.json`;
- `evidence/v2_p0_a_foundation/smoke/foundation_dom_smoke.json`;
- `evidence/v2_p0_a_foundation/V2_P0_A_FOUNDATION_RESULT.md`.

## Проверки

- `node --check app.js`: PASS;
- `node --check sw.js`: PASS;
- local DOM boot через Chrome CDP: PASS;
- `window.MinaApp.buildV2FoundationPreview`: PASS;
- contracts sample created: PASS;
- event sample created: PASS;
- fake token redacted: PASS;
- capability matrix sample: PASS;
- snapshots sample: PASS;
- mobile 390 no horizontal overflow: PASS;
- mobile 430 no horizontal overflow: PASS;
- AI API не использовались: PASS;
- billing/payment не трогались: PASS;
- BlueStacks не запускался: PASS.

## Что не входило в scope

- V2 UI redesign;
- APK build;
- BlueStacks;
- real phone;
- Local Agent / Direct Bridge changes;
- Cloudflare/GitHub settings;
- billing dashboards;
- production rollback;
- destructive cleanup.

## Остаточные риски

1. V2 foundation пока является contract/snapshot layer, а не полной runtime-миграцией.
   Severity: MEDIUM.
   Снижение: следующий P0 block должен подключать foundation к конкретным workflows по одному.

2. Normal UI не показывает V2 foundation.
   Severity: LOW.
   Причина: это намеренно, чтобы не ломать V1 и не перегружать владельца техническими деталями.

3. Live deploy ещё не выполнен в рамках этого документа.
   Severity: LOW/MEDIUM.
   Снижение: после commit/push выполнить GitHub Pages workflow и live smoke.

## Verdict

V2-P0-A Foundation implementation: PASS.

Можно переходить к evidence commit / push / live smoke при зелёном Memory Guard.
