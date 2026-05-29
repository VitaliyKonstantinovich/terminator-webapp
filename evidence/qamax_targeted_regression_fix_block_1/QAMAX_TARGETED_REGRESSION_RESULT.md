# QAMax Targeted Regression Result

Date: 2026-05-29
Task: targeted regression after `QAMAX_MAX_FIX_BLOCK_1`.

## Final Status

Targeted regression status: PARTIAL.

Local targeted regression: PASS.

Partial reasons:
- Live GitHub Pages did not yet expose marker `20260529-qamax-fix-block-1-v1` before the approved deploy.
- Android APK build was not run by task rule.

## Area Verdicts

| Area | Verdict |
| --- | --- |
| Memory Search | PASS |
| Emergency Stop / Safe Mode | PASS |
| Mina Scheme SVG/DOM | PASS |
| Windows Companion / Guardian | PASS |
| Service Worker | PASS |
| Pages Health | PARTIAL before deploy |
| Android signing | PARTIAL |
| General smoke | PASS |

## Safety

- AI API: not used.
- Deploy/push during targeted regression: not performed.
- Secrets: not output.
- Code changes during regression: none.
- Dangerous actions: blocked/dry-run/sandbox only.

## Evidence

Detailed local evidence remains in:
`C:\Users\glebi\Desktop\терминатор - DeepSeek_files\council\evidence\qamax_targeted_regression_fix_block_1`
