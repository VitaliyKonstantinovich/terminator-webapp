# Terminator V2 11/10 Scorecard

Status: PASS

Scoring scale:
- 0-6: not production-grade.
- 7-8: usable but needs hardening.
- 9: strong product-grade.
- 10: polished and reliable.
- 11/10: best practical solution currently known for this product.

`PROMOTE TO V1` is NO by default because V1 product loops are paused.

| Block | Current | 11/10 Means | Missing | Risk | Benefit | Difficulty | Priority | Promote To V1 |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| First Run 11/10 | 8.5 | Owner understands the system in 10 seconds and follows one safe setup route | More guided state explanations and owner-assisted closure flow | MEDIUM | Very high | MEDIUM | P0 | NO |
| Recovery 11/10 | 8.0 | One-button diagnosis, repair package, verifier, rollback, clear next step | More real repair rehearsal and recovery playbooks | HIGH | Very high | HIGH | P0 | NO |
| Memory Search 11/10 | 8.5 | Fast, relevant, source-linked search over tasks, files, decisions, evidence | Larger dataset validation and stronger index lifecycle | MEDIUM | Very high | MEDIUM | P0 | NO |
| Safety / Control 11/10 | 9.0 | Guardian blocks risk, Cost Guard warns, owner confirms critical actions | More policy coverage and real owner-assisted billing checks | HIGH | Very high | MEDIUM | P0 | NO |
| QA Autotest Factory | 7.0 | Repeatable product scenarios, not only manual screenshots | Test factory model and fixtures | MEDIUM | High | HIGH | P1 | NO |
| ResearchOps + Brain Council polish | 8.0 | Decision Passport, contradiction map, source gate feel effortless | More polish and stronger source quality UX | MEDIUM | High | MEDIUM | P1 | NO |
| Product Shell | 7.5 | Tray, autostart, status, safe restart, logs, no intrusive windows | Harden companion/tray model | MEDIUM | High | MEDIUM | P1 | NO |
| Advanced Eyes | 7.0 | Visual evidence is easy, linked, and non-invasive | More visual diff/smoke depth | MEDIUM | Medium | MEDIUM | P2 | NO |
| Advanced Hands / Adapters | 7.0 | Real adapters execute safe actions through Guardian/Verifier/Rollback | More worker adapter maturity | HIGH | High | HIGH | P2 | NO |
| Advanced Voice | 7.0 | Voice command preview, confirmation, transcript, safe intent routing | Real microphone/device testing | MEDIUM | Medium | MEDIUM | P2 | NO |
| Marketplace / Plugins | 5.5 | Extensible plugin ecosystem without weakening safety | Plugin governance model | MEDIUM | Medium | HIGH | P3 | NO |
| Premium Visual Layer | 8.0 | Bespoke Mina visual asset and final premium polish | Original final character asset and visual polish pass | LOW | Medium | MEDIUM | P3 | NO |
| Team / Enterprise | 4.0 | Multi-user roles and governance | Not part of owner-first product yet | HIGH | Later | HIGH | P3 | NO |

## P0 Rule

V2 11/10 cannot pass if any P0 pillar fails:
- First Run;
- Recovery;
- Memory Search;
- Safety / Control.

## Current Recommendation

Start with V2-P0-1:

First Run 11/10 + Owner Command Center hardening.

Do not start P2/P3 before the P0 line is stable.
