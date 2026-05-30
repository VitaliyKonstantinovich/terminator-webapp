# Live Deploy V2-P0-C Approval + Emergency

Дата: 2026-05-30
Статус: PASS

## Scope

Проверен live GitHub Pages после коммитов:

- `0e42e47` feat: wire v2 safety core into approval emergency flow
- `c94b218` test: add v2 approval emergency evidence

Проверка была легкой, без BlueStacks, без массовых screenshots, без изменения Cloudflare/GitHub settings.

## Live URL

`https://vitaliykonstantinovich.github.io/terminator-webapp/?screen=system&force=v2-p0-c-approval-emergency-live-smoke`

## Что проверено

- live site открывается: PASS;
- live `app.js` содержит `getV2ApprovalEmergencyPreview`: PASS;
- live `app.js` содержит `renderV2ApprovalCenterPreview`: PASS;
- live `app.js` содержит `RESET EMERGENCY STOP`: PASS;
- live `app.js` содержит `v2.emergency_stop.reset_confirmed`: PASS;
- Emergency Stop no phrase -> `typed_confirmation_required`: PASS;
- Emergency Stop wrong phrase -> `blocked`: PASS;
- Emergency Stop correct phrase -> `allow_with_warning`: PASS;
- Approval deploy -> `typed_confirmation_required`: PASS;
- Approval push main -> `typed_confirmation_required`: PASS;
- Approval delete restore point -> `typed_confirmation_required`: PASS;
- Approval read secrets -> `red_zone_stop`: PASS;
- Approval billing/payment -> `owner_assisted_required`: PASS;
- System UI shows V2 Safety Preview: PASS;
- System UI shows Emergency Stop reset phrase: PASS;
- desktop no horizontal overflow: PASS;
- mobile 390 no horizontal overflow: PASS;
- mobile 430 no horizontal overflow: PASS;
- mojibake check: PASS.

## Evidence

- `evidence/live_deploy_v2_p0_c_approval_emergency/live_v2_p0_c_approval_emergency_smoke.json`
- `evidence/live_deploy_v2_p0_c_approval_emergency/LIVE_DEPLOY_V2_P0_C_APPROVAL_EMERGENCY_RESULT.md`

## Notes

Live smoke recorded two non-fatal console warnings:

- one external/resource timeout;
- one 404 resource.

There were no page errors. The checked P0 flow passed.

## Safety

- AI API не использовались;
- secrets не выводились;
- `.env` не трогался;
- billing/payment не трогались;
- Cloudflare/GitHub settings не менялись;
- force push не выполнялся;
- cleanup/delete не выполнялся.

## Verdict

V2-P0-C live deploy smoke: PASS.
