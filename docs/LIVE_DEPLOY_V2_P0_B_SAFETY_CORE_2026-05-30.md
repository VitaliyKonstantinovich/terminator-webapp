# Live Deploy Smoke: V2-P0-B Safety Core

Дата: 2026-05-30
Статус: PASS

## Scope

Проверен live GitHub Pages после V2-P0-B Safety Core.

Live URL:

`https://vitaliykonstantinovich.github.io/terminator-webapp/?screen=scheme&force=v2-p0-b-safety-live-smoke`

GitHub Actions:

- workflow: Deploy GitHub Pages;
- run: `26683604600`;
- conclusion: success;
- head: `eec5c6c69793d00ee233e7097a983c4b7e7debb9`.

## Live Marker

Проверено по live `app.js`:

- `evaluateV2ActionRequest`: found;
- `createV2ApprovalRequest`: found;
- `getV2SafetyPreview`: found;
- `ALLOW DEPLOY`: found;
- `RESET EMERGENCY STOP`: found.

## Live Smoke

Результат: PASS.

Проверено через лёгкий Chrome CDP без screenshots/video:

- live app opened;
- `window.MinaApp` ready;
- active screen: `screen-scheme`;
- Safety Core API exists;
- 15 red-team samples returned;
- failed samples: 0;
- red-zone verdicts present;
- deploy/push require typed confirmation;
- Emergency Stop wrong phrase blocked;
- Emergency Stop correct phrase returns `allow_with_warning`;
- desktop no horizontal overflow;
- mobile 390 no horizontal overflow;
- mobile 430 no horizontal overflow.

Evidence:

- `evidence/live_deploy_v2_p0_b_safety_core/live_v2_p0_b_safety_core_smoke.json`;
- `evidence/live_deploy_v2_p0_b_safety_core/LIVE_DEPLOY_V2_P0_B_SAFETY_CORE_RESULT.md`.

## Safety

- AI API не использовались;
- secrets не выводились;
- billing/payment не трогались;
- Cloudflare/GitHub settings не менялись;
- BlueStacks не запускался;
- screenshots/video не создавались.

## Verdict

Live deploy smoke: PASS.
