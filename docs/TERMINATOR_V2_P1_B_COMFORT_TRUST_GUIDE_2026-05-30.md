# TERMINATOR V2-P1-B - Comfort Trust Guide

Статус: PASS (local targeted implementation)
Дата: 2026-05-30
Режим: Product Completion / Memory Guard Mode

## Цель

Добавить малый, но сильный product-level слой поверх уже существующих статусов Терминатора: "Проводник Мины".

Задача слоя:
- объяснить обычному пользователю, что сейчас происходит;
- показать один главный следующий шаг;
- отделить безопасные действия от опасных;
- показать, что уже проверено;
- спрятать технические детали в экспертный режим.

## Почему выбран этот блок

Внешнее исследование и консультация ChatGPT сошлись в одной точке: премиальность для AI-agent продукта повышают не дополнительные кнопки, а доверие, прозрачность, контроль, recovery и доступность.

Главные источники:
- Microsoft Human-AI Interaction Guidelines: AI-система должна задавать ожидания, показывать возможности/ограничения, поддерживать контроль пользователя и graceful recovery.
- W3C WCAG 2.2: нужны видимый фокус, достаточные touch targets, доступная аутентификация и не только цвет как носитель статуса.
- Apple HIG Feedback: пользователь должен понимать текущий статус, результат действия, предупреждение и следующий возможный шаг.
- Material Accessibility: ясная структура, понятные CTA и поддержка разных способов управления повышают usability для всех.
- Исследования мобильной usability для пожилых пользователей: крупные touch targets, простые формулировки, error-tolerant UI и низкая когнитивная нагрузка критичны.

## Что реализовано

Файлы:
- `app.js`
- `styles.css`

Добавлено:
- feature flag `v2ComfortTrustGuidePreviewEnabled`;
- события:
  - `v2.comfort.guide.opened`
  - `v2.comfort.next_action.selected`
  - `v2.comfort.trust_snapshot.created`
- builder `buildV2ComfortTrustGuideSnapshot`;
- renderer `renderV2ComfortTrustGuidePanel`;
- карточка "Проводник Мины" в `renderSystemIntegrationPanel`;
- responsive стили для desktop/mobile.

## UX-поведение

Панель показывает:
- "Один следующий шаг";
- "Что происходит";
- "Что безопасно";
- "Что опасно";
- "Что проверено";
- простые правила для обычного пользователя;
- expert details только в `<details>`.

Обычный UI не показывает:
- CommandQueue;
- Durable Object;
- raw JSON;
- backend runtime terminology.

## Scope

Входило:
- UI/state aggregator на существующих snapshot;
- local DOM/mobile smoke;
- docs/evidence;
- исследование источников и безопасная консультация ChatGPT.

Не входило:
- новые agent actions;
- deploy/push;
- BlueStacks/APK;
- billing/payment;
- AI API;
- Cloudflare/GitHub settings;
- Local Agent/Direct Bridge изменения.

## Проверки

PASS:
- `node --check app.js`
- `node --check sw.js`
- `git diff --check`
- local DOM smoke
- mobile 390/430 no horizontal overflow
- no technical terms in normal comfort panel
- no secrets / no AI API in changed diff
- Memory Guard GREEN

Evidence:
- `evidence/v2_p1_b_comfort_trust_guide/comfort_trust_dom_smoke.json`
- `evidence/v2_p1_b_comfort_trust_guide/chatgpt_product_advice_full.txt`

## Риски

LOW:
- слой пока использует агрегированные локальные snapshots, а не все будущие production signals.

MEDIUM:
- следующий уровень качества требует реального Timeline Recovery и более живого Visual Mina Canvas.

## Следующий рекомендуемый блок

V2-P1-C: Timeline Recovery Lite.

Суть:
- визуальная история важных действий;
- "вернуть как было утром/до шага";
- показать rollback/evidence понятным языком;
- без полного event sourcing и без production apply.
