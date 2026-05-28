# Phase 25: Pre-QAMAX Release Candidate Gate V1

Status: live PASS.
Date: 2026-05-28.

## Purpose

Add the final release-candidate gate before the full QA Max pass.

Owner-facing meaning:

- Pre-QAMAX Gate = ворота перед финальным большим тестированием.
- QA Max = финальная полная приемка всего Терминатора.
- This phase does not start QA Max automatically.
- This phase collects readiness, blockers, evidence and the exact QA Max scope in one visible place.

## Implemented

- Added `Система -> Ворота перед QAMAX`.
- Added a final readiness snapshot with score, blockers, warnings and decision.
- Added explicit `СТОП перед QAMAX` boundary.
- Added QA Max scope panel.
- Added evidence manifest panel.
- Added buttons:
  - `Проверить Gate`;
  - `Скачать manifest`;
  - `Скопировать scope QAMAX`;
  - `Остановиться перед QAMAX`.
- Added persistent local gate state.
- Added System summary card for the gate.
- Added Phase 25 cache and deploy markers.

## Gate Result

Local fresh-profile gate result:

- Score: 88%.
- Checks rendered: 20.
- Passed gate checks: 14.
- QAMAX/review items: 7.
- Blocking issues: 0.
- Decision: release candidate can stop before QA Max.

Live GitHub Pages gate result:

- Score: 93%.
- Passed gate checks: 16.
- QAMAX/review items: 5.
- Blocking issues: 0.
- Decision: ready to stop before final QA Max.

Review items are not hidden. They are explicitly routed into final QA Max.

## Checks

- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- `git diff --check`: PASS, CRLF notices only.
- Local desktop System Pre-QAMAX smoke: PASS.
- Local mobile 390px no horizontal overflow: PASS.
- GitHub Actions deploy `26605992994`: PASS.
- Live HTML Phase 25 marker: PASS.
- Live service worker Phase 25 marker: PASS.
- Live desktop System Pre-QAMAX smoke: PASS.
- Live mobile 390px no horizontal overflow: PASS.
- Live DOM scope/evidence/stop boundary: PASS.
- Gate panel visible: PASS.
- Stop boundary visible: PASS.
- QA Max scope visible: PASS.
- Evidence manifest visible: PASS.
- Russian text / no mojibake: PASS.
- No AI API: PASS.
- No secrets: PASS.
- No paid services: PASS.

## Evidence

- `D:\TerminatorStorage\evidence_backups\phase25_pre_qamax_gate\phase25-local-system-pre-qamax-desktop.png`.
- `D:\TerminatorStorage\evidence_backups\phase25_pre_qamax_gate\phase25-local-system-pre-qamax-mobile.png`.
- `D:\TerminatorStorage\evidence_backups\phase25_pre_qamax_gate\phase25-local-smoke.json`.
- `D:\TerminatorStorage\evidence_backups\phase25_pre_qamax_gate\phase25-live-system-pre-qamax-desktop.png`.
- `D:\TerminatorStorage\evidence_backups\phase25_pre_qamax_gate\phase25-live-system-pre-qamax-mobile.png`.
- `D:\TerminatorStorage\evidence_backups\phase25_pre_qamax_gate\phase25-live-smoke.json`.
- `D:\TerminatorStorage\evidence_backups\phase25_pre_qamax_gate\phase25-live-dom.html`.

## Not Touched

- No `.env` edits.
- No secret extraction.
- No Direct Bridge code changes.
- No Local Agent code changes.
- No Cloudflare settings changes.
- No GitHub settings changes.
- No AI API.
- No paid services.
- No destructive cleanup.
- No final QA Max run.

## Residual

- No blocking residual for Phase 25.
- Final QA Max remains the next explicit owner-approved step after this gate.
