# Terminator V2 P0 Gap Review

Status: PLANNING PASS

Date: 2026-05-30

| Gap ID | P0 Block | Current V1 State | Target V2 11/10 | Gap | Risk | Implementation Need | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GAP-001 | First Run | basic readiness surfaces exist | full guided 11/10 wizard | not full wizard | MEDIUM | SetupProgress + route | P0 |
| GAP-002 | Recovery | Diagnost/Recovery exists | explicit state machine | states not enforced everywhere | HIGH | Incident state model | P0 |
| GAP-003 | Memory Search | relevant search improved | architecture/performance enforced | no full local FTS contract yet | HIGH | MemoryRecord + FTS index | P0 |
| GAP-004 | Safety | Guardian/Approval exists | capability matrix runtime | policy display vs enforcement risk | CRITICAL | Guardian Policy Engine | P0 |
| GAP-005 | Owner-assisted | documented | first-class state | can be confused with defect | MEDIUM | owner-assisted state | P0 |
| GAP-006 | Ordinary/Expert | partially split | consistent split | technical leakage risk | MEDIUM | UI mode policy | P0 |
| GAP-007 | Evidence/Audit | evidence exists | unified safety/recovery audit | fragmented event logs | HIGH | event log contract | P0 |
| GAP-008 | Red-team suite | manual checks | repeatable P0 red-team | no suite yet | HIGH | test fixtures | P0 |
| GAP-009 | Performance gates | budgets known | budgets enforced | not gate-backed | MEDIUM | timing checks | P0 |
| GAP-010 | V1 protection | V1 RC accepted | V2 does not break V1 | implementation may drift | HIGH | feature flags/regression | P0 |

## Highest-Risk Gaps

1. Safety enforcement must be real, not UI-only.
2. Memory Search must not return confident garbage.
3. Recovery must not apply without rollback.
4. Owner-assisted checks must not become fake PASS.

## Recommended First Fix Later

Start implementation with shared contracts:
- feature flags;
- event log;
- capability matrix;
- source-of-truth snapshots.

This reduces risk before UI or worker behavior expands.
