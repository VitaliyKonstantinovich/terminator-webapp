# QAMax Targeted Regression After Fix Block 1

Date: 2026-05-29
Mode: V1 targeted regression, read-only/smoke/sandbox
Scope: verify the 7 defects from `QAMAX_MAX_FIX_BLOCK_1`

## Verdict

Targeted regression status: PARTIAL

Local source/runtime regression: PASS.

Reason for PARTIAL:
- GitHub Pages live URL still serves old markers. Local health script PASS; live health script FAIL because no approved deploy/push was performed during this task.
- Android signing static regression PASS, but APK build was not run by requirement, so Android signing remains PARTIAL rather than full PASS.

P0 blockers: none found in local targeted regression.

## Baseline

Evidence: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\baseline.json`

- Branch: `main`
- HEAD: `19ff9c5509b74b3692b275f93e57dbb69157c1ff`
- Changed FIX-block files:
  - `android/terminator-mina/build-mobile-apk.ps1`
  - `app.js`
  - `index.html`
  - `scripts/check-pages-health.ps1`
  - `styles.css`
  - `sw.js`
  - `tools/windows-companion/mina-windows-companion.ps1`
- Untracked before this report:
  - `docs/QAMAX_MAX_FIX_BLOCK_1_2026-05-29.md`
  - `docs/QAMAX_V1_ACCEPTANCE_2026-05-29.md`
  - `docs/QAMAX_V1_MAX_ACCEPTANCE_2026-05-29.md`

Runtime baseline evidence: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\runtime-status.json`

- Local Agent processes: 1
- Scheduled Task: exists, Ready, LastTaskResult 0
- `D:\TerminatorStorage`: exists
- Required storage dirs: `evidence_backups`, `diagnostics`, `repair_workspaces`, `restore_points`, `temp_outputs`

## Regression Results

| Area | Status | Evidence | Notes |
| --- | --- | --- | --- |
| Memory Search | PASS | `smoke\targeted-regression-browser-smoke.json` | Relevant query found results, artifact/evidence ref found, impossible query returned empty state, weak query marked weak, fake secret returned 0 results. |
| Emergency Stop / Safe Mode | PASS | `smoke\targeted-regression-browser-smoke.json` | Safe Mode off did not silently reset Emergency Stop. Wrong phrase kept stop active. Exact `RESET EMERGENCY STOP` reset it and audit events were recorded. Risky actions remained blocked before reset. |
| Mina Scheme SVG/DOM | PASS | screenshots + smoke JSON | 8 SVG/DOM zones, no `<img>` silhouette, no PNG background, aria labels present, keyboard focus works, all panels change by zone, mobile 390/430 has no horizontal overflow. |
| Windows Companion / Guardian | PASS | `logs\companion-regression-summary.json` | Stop/restart without approval are blocked. Start dry-run logs controlled action. Autostart baseline remains Ready. |
| Service Worker cache | PASS | `logs\static-regression.json`, `smoke\targeted-regression-browser-smoke.json` | Allowlist present, cache version marker present locally, dynamic path was not cached. |
| Pages Health | PARTIAL | `logs\pages-health-local.txt`, `logs\pages-health-live.txt` | Local run PASS against current source. Live run FAIL because GitHub Pages live URL misses current marker and SW cache marker. No deploy was performed. |
| Android debug signing | PARTIAL | `logs\static-regression.json`, `logs\syntax-checks.txt` | Hardcoded debug password literals not found and script parses. APK build was not run by instruction, so full build acceptance remains PARTIAL. |
| General smoke | PASS | `smoke\targeted-regression-browser-smoke.json` | Start, menu, work, system, diagnostics, guardian, hands, memory, scheme, Pre-QAMax Gate smoke passed. No mojibake. Mobile 390/430 no overflow. |

## Detailed Findings

### 1. Memory Search

Status: PASS

Observed:
- Known query `qamax regression`: 2 results, first result `task_known`.
- Artifact/evidence query: 1 result, first result `artifact_ref`.
- Impossible query: 0 results with message `Ничего релевантного не найдено.`
- Weak query: 1 weak result with warning `Найдены только слабые совпадения, проверьте вручную.`
- Fake secret query: 0 results.
- Measured search duration: 1.7 ms in the local test dataset.

### 2. Emergency Stop / Safe Mode

Status: PASS

Observed:
- Emergency Stop active after test trigger.
- Safe Mode off attempt did not clear Emergency Stop.
- Wrong phrase did not clear Emergency Stop.
- Exact phrase `RESET EMERGENCY STOP` cleared it.
- Audit/event sequence includes activation, reset requested, reset cancelled, reset confirmed.

### 3. Mina Scheme

Status: PASS

Observed:
- Screen opens.
- `imgCount=0`.
- `bgPng=none`.
- `zoneCount=8`.
- `ariaCount=8`.
- Keyboard active zone: `head`.
- All zone clicks changed right panel correctly:
  - head -> `Голова / Мозги`
  - eyes -> `Глаза`
  - voice -> `Голос`
  - memory -> `Память`
  - body -> `Тело`
  - hands -> `Руки`
  - legs -> `Ноги`
  - diagnost -> `Диагност`
- Mobile:
  - 390px: no horizontal overflow.
  - 430px: no horizontal overflow.

### 4. Windows Companion

Status: PASS

Observed:
- Stop without approval: blocked, exit code 2.
- Restart without approval: blocked, exit code 2.
- Start dry-run: logged controlled action, exit code 0.
- Scheduled Task remains Ready from baseline.

### 5. Service Worker

Status: PASS

Observed:
- `sw.js` syntax PASS.
- Cache marker: `terminator-mina-pwa-20260529-qamax-fix-block-1-v1`.
- Dynamic/state test path was not cached.
- Static scan confirms allowlist and old cache cleanup logic.

### 6. GitHub Pages Health

Status: PARTIAL

Observed:
- Local health script against `http://127.0.0.1:8903/`: PASS.
- Live health script against `https://vitaliykonstantinovich.github.io/terminator-webapp/`: FAIL.
- Live failures:
  - Live HTML misses expected asset marker `20260529-qamax-fix-block-1-v1`.
  - Live service worker misses expected cache marker `terminator-mina-pwa-20260529-qamax-fix-block-1-v1`.

Interpretation:
The script itself was fixed and passes locally. Live deployment was not performed in this read-only regression, so live Pages remains an owner-approved deploy/push task.

### 7. Android Debug Signing

Status: PARTIAL

Observed:
- Static scan PASS: no hardcoded `pass:android`, `storepass android`, `keypass android`, or hardcoded debug password literals in committed scripts.
- PowerShell parse PASS.
- APK build was not run by instruction, so runtime build verification remains pending.

## Evidence Index

- Baseline: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\baseline.json`
- Runtime: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\runtime-status.json`
- Static regression: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\static-regression.json`
- Syntax checks: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\syntax-checks.txt`
- Browser smoke: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\smoke\targeted-regression-browser-smoke.json`
- Desktop scheme screenshot: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\screenshots\targeted-regression-desktop-scheme.png`
- Mobile 390 screenshot: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\screenshots\targeted-regression-mobile-390-scheme.png`
- Mobile 430 screenshot: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\screenshots\targeted-regression-mobile-430-scheme.png`
- Companion summary: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\companion-regression-summary.json`
- Pages local health: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\pages-health-local.txt`
- Pages live health: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\pages-health-live.txt`
- Large file scan: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\large-files-active-repo.txt`
- Final validation and helper cleanup: `C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1\logs\final-regression-validation.txt`

## Defects

No new local P0/P1 defects found in the targeted local regression.

Open partials:
- TRG-001: Live GitHub Pages is not updated to the current fix-block marker. Severity: MEDIUM, owner/deploy-dependent.
- TRG-002: Android APK build not run. Severity: LOW/MEDIUM, owner/setup-dependent.

## Security / Safety

- AI API: not used.
- Deploy/push: not performed.
- Secrets: not printed.
- `.env`, `agent.config.json`, DNS/VPN/proxy/network, Cloudflare/GitHub settings: not changed.
- Dangerous actions: only dry-run/blocked/sandbox checks were run.

## Next Step

Можно переходить к owner-assisted checks: YES.

Можно делать approved deploy/push after owner decision: YES, from a regression perspective, because local source checks PASS. Live Pages should be rechecked after an approved deploy.
