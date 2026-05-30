# Terminator V2 11/10 Scorecard - 2026-05-29

Status: PASS as V2 kickoff scorecard.

Current V1 as V2 foundation: PASS.

Basis: Loop 6 Final Product Gate PASS, live marker `20260529-final-product-gate-v1`, archive on `D:\TerminatorStorage\codex_outputs\final_product_gate\TERMINATOR_FINAL_PRODUCT_GATE_2026-05-29.zip`.

## Executive Verdict

V1 WebApp/PC Productized RC is accepted as the foundation. Autonomous V1 product loops can pause.

V2 must not restart from scratch. The correct next mode is Product Finalization Track: take accepted V1 and raise the weakest production pillars to 11/10.

## P0 Gaps

- First Run / onboarding: the user needs a single guided product entry that explains status, setup route, safe launch, demo path, and recovery in 10 seconds.
- Memory Search: current relevance is strong, but V2 still needs large-dataset/scalable index proof.
- Diagnost / Recovery: sandbox evidence is strong, but production-grade guided recovery needs a tighter incident-to-repair path.
- Codex Repair / Controlled Hands: sandbox rollback is proven; production apply remains intentionally gated and needs a safe V2 drill.
- Documentation / Help / Demo: docs exist, but in-product demo/quick start is not final.

## P1 Gaps

- QA Autotest Factory.
- ResearchOps + Brain Council polish.
- Performance budgets and measured optimization.
- Product Shell / Windows Companion.
- Mobile/PWA production checks.
- Cost Guard / Privacy Guard fixture coverage.

## Scorecard

| Block | Score | Severity | Gap | Recommended action |
|---|---:|---|---|---|
| First Run / onboarding | 8.0 | P0 | No complete production first-run wizard tied to installer/tray and owner-assisted readiness. | Build V2 First Run Command Center. |
| Mina Scheme | 9.0 | P1 | Current Scheme passes; bespoke art and deeper real-state bindings remain. | V2 visual polish after P0 entry. |
| Active side HUD / Mina UI | 9.5 | P1 | Needs deeper source-of-truth binding and quick actions. | Bind HUD to V2 readiness snapshot. |
| Workspace / task chain | 9.0 | P1 | Needs production persistence/load tests and real Local Agent bridge acceptance. | Add to QA Autotest Factory. |
| Brain Council / ResearchOps | 8.5 | P1 | Needs stricter enforcement, source-card states, provider readiness UX. | ResearchOps polish block. |
| Decision Passport | 9.0 | P1 | Must become mandatory for important acceptance decisions. | Enforce in Verifier/QA rules. |
| Verifier | 8.5 | P1 | Needs automated test runner integration. | QA Autotest Factory foundation. |
| Memory Search | 9.0 | P0 | Large dataset/scalable index proof remains. | Memory Index V2 after first P0 entry/recovery. |
| Diagnost / Recovery | 8.5 | P0 | Needs production-grade guided incident-to-repair path. | Include in First Run/Recovery Command Center. |
| Codex Repair / Controlled Hands | 8.0 | P0 | Production active-project apply remains gated. | Build safe UI drill; keep production apply owner-assisted. |
| Guardian / Safety | 9.5 | P0 | Needs policy matrix surfaced consistently in shell/tray. | Carry into First Run and Companion UX. |
| Cost Guard / Billing UX | 7.0 | P1 | Real dashboards require owner-assisted verification. | Add visible unknown-state flow. |
| Privacy Guard | 8.5 | P1 | Needs broader fixtures across outbound packages. | QA negative security fixtures. |
| Performance | 7.0 | P1 | Workspace open is above 1s target. | Add performance budgets, optimize measured hotspots. |
| Mobile / PWA / BlueStacks | 8.5 | P1 | Real phone postponed until production V2 final. | Keep emulator/PWA-web checks. |
| APK / Android wrapper | 6.5 | P1 | Production signing and real phone are owner-assisted. | Prepare final signing checklist later. |
| Product Shell / Windows companion | 7.0 | P1 | Installer/tray shell not product-final. | Product Shell block after P0. |
| QA Autotest Factory | 5.5 | P1 | Current smoke is strong but not reusable test factory. | First P1 block if P0 entry is accepted. |
| Documentation / Help / Demo | 7.5 | P0 | In-product help/demo mode is not final. | Combine with First Run Command Center. |
| Evidence / Observability | 8.0 | P1 | Needs consolidated live observability dashboard. | QA/Observability block after first V2 block. |

## Visual / Mina Gaps

- Active side HUD is accepted, but V2 should bind it to one source-of-truth snapshot instead of parallel interpretations.
- Mina Scheme is accepted for V1/V2 kickoff. V2 11/10 should later upgrade bespoke Mina visual asset while preserving SVG/DOM interactive zones.
- Mobile 390/430 passes, but mobile should become a designed mobile control surface, not only a responsive desktop shrink.
- Normal UI technical vocabulary now passes; technical details stay in expert/docs.

## Recommended First V2 Block

Recommended next V2 implementation block:

`V2 P0 First Run + Recovery Command Center`

Why:

This has the highest product leverage. It turns the accepted V1 into an understandable production product: one guided entry that explains system status, readiness, safe setup, recovery, owner-assisted items, and next action without overwhelming the user.

Scope:

- Guided first-run route.
- Demo Mode with safe fixtures.
- Minimum / Comfort / Full readiness checklist.
- Recovery next-action surface.
- Mina visual alignment with mockups, without generating a new raster Mina character yet.
- Owner-assisted checklist panel for real phone, billing, signing, production rollback, and legacy cleanup.

Files likely affected:

- `index.html`
- `app.js`
- `styles.css`
- `docs/V2_FIRST_RUN_RECOVERY_COMMAND_CENTER_2026-05-29.md`
- `evidence/v2_first_run_recovery_command_center/*`

Risks:

- UX regression if the first screen exposes too much information.
- State-source mismatch if HUD, Scheme, Diagnost, and Recovery disagree.
- Visual polish must stay aligned with mockups and avoid a generic admin-dashboard look.

Acceptance criteria:

- First screen answers in 10 seconds: where am I, what works, what is risky, what should I do next.
- Minimum / Comfort / Full readiness is clear.
- Safe Mode / Recovery / Codex Repair route is visible but not scary.
- Ordinary/expert split is preserved.
- Mobile 390/430 has no horizontal overflow.
- No technical terms in normal mode.
- No secrets, AI API, billing, Cloud/GitHub settings, or network changes.

Can start autonomously: YES, after reviewer confirms this scorecard.

Owner approval needed: NO for this bounded UI/planning block; YES only for red-zone items.

## Owner-Assisted Postponed

- Real phone APK/PWA until production V2 final.
- Billing dashboards.
- Production signing.
- Production rollback on active project.
- Legacy cleanup.

## Safety

- AI API: not used.
- Secrets: not exposed.
- Billing: not touched.
- Cloud/GitHub settings: not touched.
- DNS/VPN/proxy/network settings: not touched.
- Real phone: not requested; postponed.

## Evidence

- Scorecard JSON: `evidence/v2_11_10_scorecard/scorecard.json`
- Recommended block JSON: `evidence/v2_11_10_scorecard/logs/recommended_first_v2_block.json`
- Screenshots: `evidence/v2_11_10_scorecard/screenshots/`

Optional archive target:

`D:\TerminatorStorage\codex_outputs\v2_11_10_scorecard\TERMINATOR_V2_11_10_SCORECARD_2026-05-29.zip`
