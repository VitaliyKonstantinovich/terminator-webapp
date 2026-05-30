# Terminator V2-P0-1 Scorecard

Status: PLANNING PASS

Date: 2026-05-30

Scale:
- 0-6: not acceptable for production V2.
- 7-8: usable but needs hardening.
- 9-10: strong.
- 11/10: best practical product solution currently known.

Promotion to V1: NO by default.

Reason: V1 coding is paused. V2 is a separate hardening line. If a later item must move into V1, it needs explicit status: PROMOTED TO V1.

| Area | Current Level | Target 11/10 | Gap | Risk | Acceptance |
| --- | ---: | --- | --- | --- | --- |
| First Run clarity | 8 | Owner understands status and next action in 10 seconds | More guided first-launch copy and owner-assisted boundaries | MEDIUM | One primary next action, no docs needed |
| Setup Route | 8 | Continue setup always routes to the correct next step | More explicit routing priority and state reasons | MEDIUM | Route is deterministic and explainable |
| Mina Scheme as configuration center | 8.5 | Visual body map is both premium and truthful | Stronger real-state labels and owner-assisted markers | MEDIUM | Zones show readiness, source and next action |
| Recovery Command Center | 8 | Diagnost, incident, repair, rollback and wizard feel like one recovery path | More scenario playbooks and unified UX | HIGH | Every serious symptom creates guided recovery |
| Emergency Stop UX | 8.5 | Owner knows what stopped, what is blocked and how to reset safely | Better recovery copy after stop | HIGH | Stop is reversible only with explicit confirmation |
| Codex Repair UX | 8 | Owner can repair safely without manual prompt assembly | More polished Diagnostic Pack and review flow | HIGH | Pack, diff, Verifier, Guardian, rollback visible |
| Ordinary / Expert mode | 8 | Ordinary mode is calm; expert mode has full technical trace | More consistent hiding of technical details | MEDIUM | No raw state in ordinary mode |
| Mobile/PWA-web readiness | 8 | First run and recovery are usable on narrow screens | Real phone remains postponed | MEDIUM | 390/430 web viewport has no horizontal overflow |
| Safety / Control | 9 | Guardian/Approval/Privacy/Cost/Emergency Stop are predictable | Owner-assisted billing dashboards still pending | HIGH | Dangerous actions never execute silently |
| Performance | 8 | First run, route, recovery and search stay within budgets | Large dataset and slower device checks still pending | MEDIUM | Budgets documented and measurable |
| Market readiness impact | 8 | The product feels like a controlled OS, not a demo | Needs final implementation and real owner-assisted checks | MEDIUM | V2-P0 turns confusion into guided operation |

## Priority

P0:
- First Run clarity;
- Setup Route;
- Mina Scheme truthful readiness;
- Recovery Command Center;
- Emergency Stop UX;
- Codex Repair UX;
- Safety / Control.

P1:
- Mobile/PWA-web refinement;
- Performance instrumentation;
- market readiness copy polish.

## Key Risk

The main risk is building more UI without enforcing truthful state and recovery gates. V2-P0-1 must stay anchored to state, incidents, Guardian, Verifier, rollback and owner control.

## Acceptance Summary

V2-P0-1 planning is acceptable when:
- first launch is understandable;
- recovery is a real route, not a decorative panel;
- ordinary mode hides technical noise;
- expert mode remains available;
- owner-assisted items are clearly separated;
- no V1 code is changed during planning.
