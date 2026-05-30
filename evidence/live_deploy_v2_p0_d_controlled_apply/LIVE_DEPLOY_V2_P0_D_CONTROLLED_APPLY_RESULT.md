# Live Deploy V2-P0-D Controlled Apply Result

Дата: 2026-05-30
Статус: PASS

## Result

Live GitHub Pages проверен после V2-P0-D commit/push/deploy.

## Evidence Files

- `live_v2_p0_d_controlled_apply_smoke.json`

## Key Results

| Проверка | Статус |
|---|---:|
| Live URL HTTP 200 | PASS |
| Controlled Apply markers on live | PASS |
| Controlled Apply samples 10/10 | PASS |
| Sandbox allow with rollback | PASS |
| No rollback blocks | PASS |
| Verifier FAIL blocks | PASS |
| Guardian HIGH risk requires approval | PASS |
| Active project target not silently allowed | PASS |
| Secret-like diff red-zone | PASS |
| Billing/network/AI API diff red-zone | PASS |
| Unknown target path blocks | PASS |
| Controlled Apply UI visible | PASS |
| Desktop no overflow | PASS |
| Mobile 390 no overflow | PASS |
| Mobile 430 no overflow | PASS |
| Mojibake check | PASS |

## Non-Fatal Warnings

The smoke run captured two console resource warnings, but no page errors.

## Safety

- AI API не использовались;
- secrets не выводились;
- active project apply не выполнялся;
- Cloudflare/GitHub settings не менялись;
- billing/payment не трогались;
- BlueStacks не запускался.

## Verdict

PASS.
