# V2-P1-G Product Shell Foundation

Статус: PASS

## Что реализовано

- Добавлен web Product Shell внутри Терминатора: `Пульт Терминатора`.
- Product Shell встроен в Start/Menu/System без Windows installer, tray, APK, BlueStacks, signing или внешних сервисов.
- Добавлены 5 golden use cases:
  - создать рабочую задачу;
  - собрать автотест;
  - провести исследование через Совет мозгов;
  - найти прошлое решение в памяти;
  - починить проблему / открыть Recovery.
- Добавлен Quick Start из 5 шагов.
- Добавлены 8 help cards без технической каши в обычном режиме.
- Добавлен Demo Mode как безопасный preview: без AI API, без credentials, без billing, без deploy/push/delete, без внешних запросов.
- Owner-assisted и postponed пункты отделены от готовности продукта.
- Expert details скрыты в `details`.

## Источник состояния

Product Shell не хранит отдельную правду о системе. Он агрегирует существующие V2 snapshots:

- First Run readiness;
- P0 acceptance;
- Owner Command Center;
- Recovery Command Center;
- QA Autotest Factory;
- ResearchOps / Brain Council;
- Memory Runtime;
- Safety Preview.

## Изменённые файлы

- `app.js` — V2 Product Shell state, events, memory sample, smoke, renderer, route handler.
- `index.html` — host containers для Product Shell на Start/Menu/System.
- `styles.css` — Mina UI стили Product Shell и mobile layout.

## Evidence

- `evidence/v2_p1_g_product_shell/product_shell_state_sample.json`
- `evidence/v2_p1_g_product_shell/golden_use_cases_sample.json`
- `evidence/v2_p1_g_product_shell/quick_start_sample.json`
- `evidence/v2_p1_g_product_shell/help_cards_sample.json`
- `evidence/v2_p1_g_product_shell/demo_mode_sample.json`
- `evidence/v2_p1_g_product_shell/product_shell_events.json`
- `evidence/v2_p1_g_product_shell/product_shell_memory_sample.json`
- `evidence/v2_p1_g_product_shell/smoke.json`

## Проверки

- Memory Guard: GREEN.
- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- Local Product Shell smoke: PASS.
- 5 golden use cases: PASS.
- Quick Start: PASS.
- Help Cards: PASS.
- Demo Mode safe preview: PASS.
- Owner-assisted separated: PASS.
- Postponed real phone rule: PASS.
- Product Shell route checks: PASS.
- Memory sample queries: PASS.
- Mobile 390/430 no horizontal overflow: PASS.
- No AI API / no billing / no external service call in Product Shell: PASS.

## Что не делалось

- Windows installer/tray не делался.
- APK/BlueStacks/real phone не запускались.
- Production signing не трогался.
- Local Agent / Direct Bridge не менялись.
- Cloudflare/GitHub settings не менялись.
- AI API и платные сервисы не использовались.
- Cleanup/delete не выполнялся.

## Риски

- Live smoke ещё нужен после push/deploy.
- Реальный телефон и APK остаются owner-assisted/postponed до production V2 final.
- Product Shell показывает готовность по текущим snapshots; если живые модули вернут unknown, статус честно останется partial/review.
