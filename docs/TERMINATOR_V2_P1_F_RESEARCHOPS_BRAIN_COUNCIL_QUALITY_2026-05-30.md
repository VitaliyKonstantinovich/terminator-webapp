# Terminator V2-P1-F ResearchOps + Brain Council Quality

Status: PASS locally

## Scope

Implemented a bounded V2-P1-F workflow for ResearchOps + Brain Council quality:

- Research Question contract.
- Source Card contracts.
- Research Pack contract.
- BrainAnswer contracts with honest account status.
- Brain Comparison contract.
- Contradiction Map contract.
- Decision Passport contract.
- Research Decision Verifier contract.
- Memory Search sample record and search proof.
- Compact Mina UI panel in System Integration and Workspace Council.

## What Changed

- Added V2 feature flags:
  - `v2ResearchOpsQualityPreviewEnabled`
  - `v2BrainCouncilQualityPreviewEnabled`
- Added V2 contract types and names for research/council workflow.
- Added V2 sanitized event types:
  - `v2.research.question.created`
  - `v2.research.source_card.created`
  - `v2.research.pack.created`
  - `v2.brain.answer.created`
  - `v2.brain.comparison.created`
  - `v2.brain.contradiction.detected`
  - `v2.decision.passport.created`
  - `v2.research.verifier.verdict`
  - `v2.research.memory_summary.created`
- Added safe demo workflow:
  - "Выбрать лучший подход для проверки формы на тестовом сайте: UI-only smoke или UI+API checks."
- Added honesty gates:
  - no Source Cards -> `needs_sources`;
  - missing BrainAnswer -> `needs_review`;
  - account not verified -> `manual_required`;
  - contradiction -> visible;
  - missing "what to check first" -> Verifier `NEEDS_FIX`;
  - owner-assisted/manual-required items do not become fake PASS.

## UI

Added a compact premium Mina UI panel:

- System -> integration panel.
- Workspace -> Совет мозгов panel.

Normal mode shows:

- Исследовательский пакет.
- Источники.
- Ответы мозгов.
- Сравнение.
- Противоречия.
- Решение.
- Что проверить первым.
- Что не проверено.

Expert mode shows IDs, refs, feature flags and verifier state.

## Checks

| Check | Result | Evidence |
|---|---:|---|
| `node --check app.js` | PASS | shell |
| `node --check sw.js` | PASS | shell |
| Runtime smoke | PASS | `evidence/v2_p1_f_researchops_brain_council/smoke.json` |
| Local regression smoke | PASS | `evidence/v2_p1_f_researchops_brain_council/regression_smoke.json` |
| Mobile 390/430 no overflow | PASS | `regression_smoke.json` |
| No mojibake | PASS | `regression_smoke.json` |
| Strict secret scan | PASS | shell |
| AI API runtime scan | REVIEW/PASS | matches are existing protective regex gates, not runtime API calls |

## Evidence

Generated JSON evidence:

- `research_question_sample.json`
- `source_cards_sample.json`
- `research_pack_sample.json`
- `brain_answers_sample.json`
- `comparison_sample.json`
- `contradiction_map_sample.json`
- `decision_passport_sample.json`
- `research_verifier_result_sample.json`
- `research_memory_search_sample.json`
- `smoke.json`
- `regression_smoke.json`

## Not Touched

- No AI API.
- No external web-chat calls.
- No real credentials.
- No billing/payment.
- No Cloudflare/GitHub settings.
- No DNS/VPN/proxy/network changes.
- No APK / BlueStacks / real phone.
- No Local Agent / Direct Bridge changes.
- No destructive cleanup/delete.

## Residual Risks

- Real external brain accounts remain owner-assisted and are marked `manual_required`.
- Real backend/API endpoint for a form remains owner-assisted.
- The demo proves product workflow logic, not a production external AI/web-chat run.

## Verdict

V2-P1-F ResearchOps + Brain Council Quality Workflow: PASS locally.

The workflow is intentionally `PASS_WITH_RISKS` at decision level because manual external account verification and real backend/API checks are owner-assisted, not auto-ready.
