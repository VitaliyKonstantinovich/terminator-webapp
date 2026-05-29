# V1 Commit Anchoring Plan - 2026-05-29

Status: CREATED

Purpose: prepare the dirty V1 worktree for the next owner-approved commit without committing, pushing, deleting, or cleaning anything in this task.

## Baseline

Branch: `main`

HEAD: `561bd99d93fcb4faa292bdd16058577d4ec730a0`

origin/main: `561bd99d93fcb4faa292bdd16058577d4ec730a0`

Nothing staged.

## A. Must Include In Next Owner-Approved Commit

| File / Group | Status | Include | Reason | Risk | Notes |
|---|---|---|---|---|---|
| `app.js` | modified | YES | V1 product completion, terminology cleanup, Emergency Stop behavior, Memory Search relevance, performance triage Quick Diagnost fix | MEDIUM | Broad core file; review diff before commit. |
| `index.html` | modified | YES | V1 marker/version and UI text state | LOW | Must match live marker. |
| `docs/GITHUB_PAGES_RELEASE_GUARD.md` | modified | YES | Current release guard / marker policy | LOW | Prevents future stale-marker confusion. |
| `android/terminator-mina/AndroidManifest.xml` | modified | YES | Android wrapper / BlueStacks smoke work | MEDIUM | Commit with Android evidence. |
| `android/terminator-mina/build-mobile-apk.ps1` | modified | YES | Android debug signing safety model | MEDIUM | Verify no literal signing secrets before commit. |
| `android/terminator-mina/src/app/terminator/mina/MainActivity.java` | modified | YES | Android WebView wrapper behavior | MEDIUM | Commit with APK/BlueStacks docs. |
| `docs/APK_BLUESTACKS_SMOKE_2026-05-29.md` | new | YES | APK/BlueStacks smoke report | LOW | Evidence summary. |
| `docs/LIVE_DEPLOY_SMOKE_QAMAX_FIX_BLOCK_1_2026-05-29.md` | new | YES | Live deploy smoke record | LOW | Evidence summary. |
| `docs/LIVE_DEPLOY_WORKFLOW_MARKER_FIX_2026-05-29.md` | new | YES | Workflow marker fix report | LOW | Evidence summary. |
| `docs/QAMAX_V1_ACCEPTANCE_2026-05-29.md` | new | YES | QAMax V1 read-only report | LOW | Acceptance source. |
| `docs/QAMAX_V1_MAX_ACCEPTANCE_2026-05-29.md` | new | YES | QAMax Maximum report | LOW | Acceptance source. |
| `docs/V1_FINAL_ACCEPTANCE_INDEX_2026-05-29.md` | new | YES | Final V1 acceptance index | LOW | Source-of-truth index. |
| `docs/V1_PRODUCT_COMPLETION_AUDIT_2026-05-29.md` | new | YES | Product completion audit | LOW | Audit trail. |
| `docs/V1_PRODUCT_COMPLETION_FIX_BLOCK_2026-05-29.md` | new | YES | Product completion fix block report | LOW | Fix trail. |
| `docs/V1_FINAL_PERFORMANCE_TRIAGE_2026-05-29.md` | new | YES | This performance triage report | LOW | Created by current task. |
| `docs/V1_COMMIT_ANCHORING_PLAN_2026-05-29.md` | new | YES | Commit anchoring plan | LOW | Created by current task. |
| Compact `*_RESULT.md` evidence summaries | new | YES | Human-readable evidence trail | LOW | Prefer result summaries over raw logs if commit size matters. |
| `evidence/v1_final_performance_triage/performance/performance_breakdown.json` | new | YES | Performance root-cause matrix | LOW | Created by current task. |
| `evidence/v1_final_performance_triage/performance/performance_after_fix.json` | new | YES | After-fix timing evidence | LOW | Created by current task. |
| `evidence/v1_final_performance_triage/logs/regression_smoke.json` | new | YES | Targeted regression after performance fix | LOW | Created by current task. |

## B. Should Not Include

| File / Group | Status | Include | Reason | Risk | Notes |
|---|---|---|---|---|---|
| `node_modules/` | generated | NO | Dependency cache/build output | HIGH | Do not commit. |
| Browser profiles / temp Chrome user-data dirs | generated | NO | Local machine state | HIGH | Do not commit. |
| `.env`, local signing props, secrets | sensitive | NO | Secrets must not enter repo | CRITICAL | None intentionally created in this task. |
| APK build intermediates | generated | NO | Large/generated | MEDIUM | Commit docs/evidence, not intermediates unless owner approves. |
| Zero-byte logs | generated | NO | No evidence value | LOW | Examples: empty headless logs. |
| Temporary test server outputs | generated | NO | Repro artifacts only | LOW | Keep out of commit unless referenced evidence. |

## C. Needs Owner Decision

| File / Group | Status | Include | Reason | Risk | Notes |
|---|---|---|---|---|---|
| PNG screenshots under `evidence/*/screenshots/` | new | OWNER | Useful visual evidence but increases repo size | MEDIUM | About 10 MB in current dirty tree. |
| Raw GitHub Actions logs / raw smoke JSON | new | OWNER | Useful audit detail; can be noisy | LOW/MEDIUM | Compact result docs may be enough. |
| Final APK artifact | build output | OWNER | Deliverable, but binary can bloat repo | MEDIUM | Prefer release artifact path if owner wants. |
| `D:\TerminatorStorage` archives | external output | OWNER | Product archives may belong outside repo | MEDIUM | Do not commit without explicit approval. |
| Large videos / traces | generated | OWNER | Evidence value vs repo bloat tradeoff | MEDIUM | Not created in this task. |

## Recommended Next Commit Shape

One owner-approved commit can anchor V1 RC work if it includes:

1. Source changes: `app.js`, `index.html`, Android wrapper files, `docs/GITHUB_PAGES_RELEASE_GUARD.md`.
2. Required docs: all V1/QAMax/APK/live/product/performance reports.
3. Compact evidence summaries plus small JSON evidence needed for acceptance.

Screenshots and large raw logs should be decided by owner before staging.

No commit/push was performed by this task.

