# Terminator V2-P0-4 Safety / Control 11/10 Scorecard

Status: PLANNING PASS

Date: 2026-05-30

| Area | Current Level | Target 11/10 | Gap | Risk | Acceptance |
| --- | ---: | --- | --- | --- | --- |
| Capability Matrix | 8.5 | Every actor/resource/action has explicit permission | Need runtime enforcement later | HIGH | matrix is clear and auditable |
| Threat Model | 8.5 | All P0 safety threats covered | Needs red-team implementation tests later | HIGH | threat table complete |
| Guardian Policy Engine | 9 | No risky action bypasses Guardian | Needs policy engine proof later | CRITICAL | allow/block/approval verdicts defined |
| Approval Center V2 | 8.5 | Owner understands every risky approval | Needs UI implementation later | HIGH | risk, affected refs, rollback shown |
| Emergency Stop | 9 | Stops risky actions and recovers safely | Needs final UI proof later | CRITICAL | typed reset only |
| Safe Mode | 8.5 | Read-only recovery allowed, risky actions blocked | Needs runtime proof later | HIGH | allowed/blocked lists defined |
| Privacy Guard | 9 | Secrets never enter context/evidence/memory | Needs automated scan enforcement later | CRITICAL | secret categories and gates defined |
| Cost Guard | 8.5 | Billing/paid/API actions are owner-controlled | Owner dashboards remain assisted | HIGH | paid/unknown status not green PASS |
| Worker / Adapter security | 8 | Future workers operate in bounded permissions | Needs adapter profiles later | HIGH | worker permission rules defined |
| Red-team scenarios | 8.5 | Unsafe prompts produce expected block/approval | Needs executable test set later | HIGH | 15 scenarios documented |
| Evidence / Audit Log | 8.5 | Every safety decision has trace | Needs schema implementation later | MEDIUM | event fields defined |
| UX clarity | 8 | Approval copy is plain Russian | Needs UI copy pass later | MEDIUM | ordinary/expert split preserved |
| Market readiness | 9 | Owner trusts autonomy because control is visible | Needs implementation and QA | HIGH | product feels safe, not scary |

## Promotion to V1

NO by default.

Reason:
- V1 coding is paused.
- V2-P0-4 is a planning line.
- Any transfer to V1 requires explicit `PROMOTED TO V1`.

## P0 Risk

The largest risk is a false sense of safety: UI says protected, but runtime allows risky actions. Implementation must enforce policy, not only display warnings.

## Planning Acceptance

V2-P0-4 planning is acceptable if:
- threats are explicit;
- capability matrix covers actors/resources;
- risk levels define required gates;
- Approval Center explains risk plainly;
- Guardian verdict flow is deterministic;
- Privacy/Cost/Emergency/Safe Mode rules are explicit;
- red-team scenarios have expected outcomes;
- no V1 implementation is changed during planning.
