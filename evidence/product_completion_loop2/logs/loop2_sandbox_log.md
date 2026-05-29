# Product Loop 2 Sandbox Log

created_at: 2026-05-29T12:41:02.1185919-05:00
sandbox_root: D:\TerminatorStorage\temp_outputs\product_loop2

## Python
version: Python 3.12.10
exit_code: 0
stdout: Hello, world!
duration_ms: 76
file: D:\TerminatorStorage\temp_outputs\product_loop2\hello_world.py
sha256: 81AEA769E255576FE8CC95E8A4D401ACCA04C8C3A8697224BE92FB0669E51577

## Controlled Apply
status: PASS
target: D:\TerminatorStorage\temp_outputs\product_loop2\dummy_apply_target.txt
rollback: D:\TerminatorStorage\temp_outputs\product_loop2\rollback\dummy_apply_target.before.txt
before_hash: A7ECC0CD9B4DB1656BFF76DDBC2ACA770A8E50512E5446E5CC4FCA8BCBB77CD2
after_hash: B08F7B70EF232A0E9FADA39408E13AD4F2AFD2B4972B0611488CEB877D2C1320
rollback_hash: A7ECC0CD9B4DB1656BFF76DDBC2ACA770A8E50512E5446E5CC4FCA8BCBB77CD2
rollback_restored: True
duration_ms: 10

## Diff
--- dummy_apply_target.txt
+++ dummy_apply_target.txt
-ORIGINAL: product loop2 controlled apply target
+UPDATED: product loop2 controlled apply target
+status=applied_in_sandbox_only

## Negative Checks
[
  {
    "id": "apply_without_rollback",
    "expected": "blocked",
    "actual": "blocked",
    "pass": true,
    "reason": "rollback_path required before apply"
  },
  {
    "id": "verifier_fail",
    "expected": "blocked",
    "actual": "blocked",
    "pass": true,
    "reason": "verifier status FAIL blocks apply"
  },
  {
    "id": "guardian_high_risk",
    "expected": "approval_required",
    "actual": "approval_required",
    "pass": true,
    "reason": "high risk cannot auto-apply"
  },
  {
    "id": "active_project_target",
    "expected": "blocked_without_explicit_approval",
    "actual": "blocked_without_explicit_approval",
    "pass": true,
    "reason": "target outside sandbox is not allowed in Loop 2"
  }
]
