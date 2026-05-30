# Terminator V2-P0-2 Recovery 11/10 Scorecard

Status: PLANNING PASS

Date: 2026-05-30

| Area | Current Level | Target 11/10 | Gap | Risk | Acceptance |
| --- | ---: | --- | --- | --- | --- |
| Incident lifecycle | 8 | Every incident has state, owner copy, evidence and next action | Need implementation map and event schema | HIGH | State machine documented and enforceable |
| Recovery playbooks | 8 | All P0 fault classes have safe guided route | Need UI/playbook binding later | HIGH | 12 playbooks defined with PASS/FAIL |
| Codex Repair integration | 8 | Repair never touches active project before gates | Need implementation proof in V2 | HIGH | Pack, workspace, Verifier, Guardian, rollback required |
| Rollback model | 8 | Apply blocked without rollback for data changes | Need production rollback rehearsal later | HIGH | rollback_available before ready_to_apply |
| Guardian/Approval gates | 9 | Risky actions cannot bypass owner control | More policy coverage later | HIGH | HIGH/CRITICAL requires approval |
| Verifier integration | 8.5 | Verifier FAIL blocks apply/accept | Need more recovery verdict UI later | HIGH | FAIL cannot be ignored |
| Emergency Stop UX | 8.5 | Stop is clear, blocks risk, recovers safely | Needs final copy and reset flow proof | HIGH | typed reset required |
| Ordinary/Expert split | 8 | Owner sees simple copy, expert sees trace | Need UI consistency audit later | MEDIUM | no raw logs in ordinary mode |
| Owner-assisted separation | 9 | Postponed checks are visible but not defects | Needs persistent checklist later | MEDIUM | real phone/billing/production rollback not green PASS |
| Evidence model | 8 | Incident, diagnostic, repair, rollback and closure evidence are linked | Need schema implementation later | MEDIUM | every P0 recovery has evidence ref |
| Performance | 8 | Recovery opens fast and does not block UI | Need timing proof later | MEDIUM | quick recovery route <= 2 sec, quick check <= 5 sec |
| Market readiness | 8.5 | Product feels self-healing and owner-controlled | Needs implementation and final polish | MEDIUM | owner can recover without manual technical pain |

## Promotion to V1

NO by default.

Reason:
- V1 coding is paused.
- V2-P0-2 is a separate planning line.
- Any later transfer to V1 requires explicit `PROMOTED TO V1` status.

## P0 Risk

The biggest risk is allowing repair/apply flows to look ready before Verifier, Guardian, Approval and rollback are enforced.

## Planning Acceptance

V2-P0-2 planning is acceptable if:
- incident and repair states are explicit;
- all P0 playbooks have safe action, gates and FAIL conditions;
- ordinary user copy is simple;
- expert details are separated;
- owner-assisted boundaries are clear;
- no V1 implementation is changed during planning.
