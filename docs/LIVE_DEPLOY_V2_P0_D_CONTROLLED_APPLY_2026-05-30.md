# Live Deploy V2-P0-D Controlled Apply

Дата: 2026-05-30
Статус: PASS

## Scope

Проверен live GitHub Pages после коммитов:

- `865bdc8` feat: wire v2 safety core into controlled apply
- `704d4dc` test: add v2 controlled apply safety evidence

Проверка была lightweight:

- без BlueStacks;
- без массовых screenshots;
- без изменения Cloudflare/GitHub settings;
- без active project apply.

## Live URL

`https://vitaliykonstantinovich.github.io/terminator-webapp/?screen=system&force=v2-p0-d-controlled-apply-live-smoke`

## Что проверено

- live site HTTP 200: PASS;
- live `app.js` содержит `evaluateV2ControlledApplyRequest`: PASS;
- live `app.js` содержит `getV2ControlledApplyPreview`: PASS;
- live `app.js` содержит `renderV2ControlledApplyPreview`: PASS;
- live `app.js` содержит `v2.apply.requested`: PASS;
- live `app.js` содержит `v2.rollback.required`: PASS;
- Controlled Apply samples 10/10: PASS;
- sandbox + rollback + Verifier PASS -> allow_with_warning: PASS;
- no rollback -> blocked: PASS;
- Verifier FAIL -> blocked: PASS;
- Guardian HIGH risk -> approval_required: PASS;
- active project target -> approval_required/blocked: PASS;
- secret-like diff -> red_zone_stop: PASS;
- billing/network/AI API diff -> red_zone_stop: PASS;
- unknown target path -> blocked: PASS;
- Controlled Apply UI visible: PASS;
- V2 Safety Preview still visible: PASS;
- desktop no horizontal overflow: PASS;
- mobile 390 no horizontal overflow: PASS;
- mobile 430 no horizontal overflow: PASS;
- mojibake check: PASS.

## Evidence

- `evidence/live_deploy_v2_p0_d_controlled_apply/live_v2_p0_d_controlled_apply_smoke.json`
- `evidence/live_deploy_v2_p0_d_controlled_apply/LIVE_DEPLOY_V2_P0_D_CONTROLLED_APPLY_RESULT.md`

## Notes

Live smoke recorded two non-fatal console resource warnings.

There were no page errors. The checked P0-D flow passed.

## Safety

- AI API не использовались;
- secrets не выводились;
- `.env` не трогался;
- billing/payment не трогались;
- Cloudflare/GitHub settings не менялись;
- Local Agent / Direct Bridge не менялись;
- force push не выполнялся;
- cleanup/delete не выполнялся.

## Verdict

V2-P0-D live deploy smoke: PASS.
