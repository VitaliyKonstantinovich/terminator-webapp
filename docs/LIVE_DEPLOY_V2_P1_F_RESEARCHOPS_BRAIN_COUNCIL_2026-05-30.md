# Live Deploy Smoke: V2-P1-F ResearchOps + Brain Council Quality

Status: PASS
Date: 2026-05-30 / 2026-05-31 UTC

## Scope

Checked the live GitHub Pages deployment after commit `bb87be21c4823a81b65e9b77d8572e045de6a6c9`.

This live smoke verifies only the V2-P1-F ResearchOps + Brain Council quality workflow:

- Research Question
- Source Cards
- Research Pack
- BrainAnswers
- Comparison
- Contradiction Map
- Decision Passport
- Verifier result
- Memory Search sample
- System / Work / Scheme UI presence
- Mobile 390 / 430 no horizontal overflow

## Deployment

- GitHub Pages workflow: PASS
- Workflow run: `26699877470`
- Workflow URL: `https://github.com/VitaliyKonstantinovich/terminator-webapp/actions/runs/26699877470`
- Live URL: `https://vitaliykonstantinovich.github.io/terminator-webapp/`

## Checks

| Check | Result | Evidence |
| --- | --- | --- |
| Live `app.js` has V2-P1-F flags | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |
| Live `app.js` has ResearchOps panel renderer | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |
| System route shows V2-P1-F panel | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |
| Work route shows V2-P1-F panel with safe demo task | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |
| Scheme route shows V2-P1-F panel | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |
| Runtime ResearchOps smoke | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |
| Memory Search sample | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |
| Mobile 390 / 430 overflow | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |
| Mojibake check | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |
| Runtime AI API call scan | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |
| Secret literal scan | PASS | `evidence/live_deploy_v2_p1_f_researchops_brain_council/live_smoke.json` |

## Notes

- Work route live smoke creates a safe demo task only inside the temporary headless browser profile.
- No active project files were changed by the live smoke.
- No screenshots or videos were generated for this block to keep Memory Guard pressure low.
- No BlueStacks or APK checks were run.

## Not Touched

- No AI API.
- No billing/payment.
- No Cloudflare settings.
- No DNS/VPN/proxy/network settings.
- No Local Agent / Direct Bridge changes.
- No `.env`, tokens, cookies, or secrets.

## Residual Risks

- Real external brain accounts remain owner-assisted.
- Real phone APK/PWA acceptance is postponed until production V2 final.
- This live smoke validates the V2-P1-F workflow preview and UI integration; it does not perform external web-chat research.

