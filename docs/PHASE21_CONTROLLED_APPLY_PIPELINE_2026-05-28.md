# Phase 21 - Controlled Apply Pipeline / Verifier Gate V1

Status: closed live PASS.
Date: 2026-05-28.

## Goal

Close the next real Hands layer before final QAMAX:

- Controlled Apply Pipeline = controlled path from a safe worker plan to an apply package;
- Verifier Gate = package cannot be treated as ready until checks pass;
- Rollback Gate = active-project changes must have rollback instructions before apply;
- Approval Gate = risky changes require owner decision and are not executed silently.

## Implemented

- Local state `mina_controlled_apply_pipeline_v1`.
- Apply packages built from Hands safe worker plans.
- Task-level `controlled_apply_packages`.
- Package status model:
  - draft;
  - verified;
  - approval_required;
  - ready_to_apply;
  - applied_manual;
  - blocked.
- Package integrity checks:
  - changed files list;
  - diff summary;
  - rollback plan;
  - verifier checks;
  - privacy scan;
  - no AI API signal;
  - no `.env` / secrets / token signal.
- Guardian apply gate that blocks:
  - dangerous plan text;
  - missing rollback plan;
  - failed checks;
  - secret/API signals;
  - high-risk package without approval.
- Apply package artifact type `CONTROLLED_APPLY_PACKAGE`.
- System -> Hands panel visibility.
- Workspace -> Hands panel package visibility.
- Mina Scheme / Hands snapshot binding.
- Copy package action for manual owner-controlled review.
- Approval creation for packages that need owner decision.
- Manual applied marker after external human-controlled application.
- Phase 21 GitHub Pages / PWA cache markers.

## Safety

Phase 21 does not:

- modify active project files;
- apply diffs automatically;
- run shell commands from the browser;
- deploy from UI;
- push from UI;
- delete files;
- edit `.env`;
- read cookies, passwords, sessions or tokens;
- use AI API;
- bypass Guardian, Verifier, Approval or Rollback gates.

The pipeline prepares a reviewed package. Real apply remains explicit and controlled.

## Checks

- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- `git diff --check`: PASS, CRLF notices only.
- Local desktop System Hands apply smoke: PASS.
- Local mobile 390px System Hands apply smoke: PASS.
- No horizontal overflow on local mobile smoke: PASS.
- Local safe package creation: PASS.
- Local Verifier gate: PASS.
- Local blocked dangerous text check: PASS.
- Added-code secret scan: PASS, only policy/runtime scanner terms were found.
- Added-code AI API scan: PASS, only policy text mentions AI API as forbidden.
- Direct Bridge code unchanged: PASS.
- Local Agent code unchanged: PASS.
- GitHub Pages Actions deploy `26596977330`: PASS.
- Live HTML marker `20260528-phase21-controlled-apply-pipeline-v1`: PASS.
- Live `app.js` marker `Controlled Apply Pipeline / Verifier Gate V1`: PASS.
- Live service worker marker `terminator-mina-pwa-20260528-phase21-controlled-apply-pipeline-v1`: PASS.
- Live desktop System Hands apply smoke: PASS.
- Live mobile 390px System Hands apply smoke: PASS.
- Live mobile no horizontal overflow: PASS.

## Evidence

- `D:\TerminatorStorage\evidence_backups\phase21_controlled_apply_pipeline\phase21-local-system-hands-apply-desktop.png`
- `D:\TerminatorStorage\evidence_backups\phase21_controlled_apply_pipeline\phase21-local-system-hands-apply-mobile.png`
- `D:\TerminatorStorage\evidence_backups\phase21_controlled_apply_pipeline\phase21-local-smoke.json`
- `D:\TerminatorStorage\evidence_backups\phase21_controlled_apply_pipeline\phase21-live-system-hands-apply-desktop.png`
- `D:\TerminatorStorage\evidence_backups\phase21_controlled_apply_pipeline\phase21-live-system-hands-apply-mobile.png`
- `D:\TerminatorStorage\evidence_backups\phase21_controlled_apply_pipeline\phase21-live-smoke.json`
- `evidence/phase21_controlled_apply_pipeline/PHASE21_CONTROLLED_APPLY_PIPELINE_RESULT.md`

## Residual

- Actual file apply is intentionally not automated yet. The product now has the gate and package layer; active-project write execution remains behind future explicit owner-controlled apply tooling.

## Live Acceptance

GitHub Pages live acceptance verified:

- workflow `26596977330`;
- HTML / app / service worker markers;
- desktop and mobile System -> Hands apply package smoke;
- Verifier package gate;
- mobile 390px no horizontal overflow.

Live URL:

- `https://vitaliykonstantinovich.github.io/terminator-webapp/?screen=system&force=phase21-controlled-apply-pipeline-live`

## Next

Continue to the next MASTER SPEC layer before final QAMAX.
