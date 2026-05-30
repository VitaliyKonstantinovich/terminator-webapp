# Terminator V2 P0 Test Strategy

Status: PLANNING PASS

Date: 2026-05-30

## 1. Unit-Style Checks

Required:
- relevance scoring exact/strong/weak/none;
- capability matrix decisions;
- secret detection;
- incident state transitions;
- repair/rollback state transitions;
- setup route selection;
- approval typed phrase validation.

## 2. Integration Checks

Required:
- first run route;
- Scheme Mina readiness;
- Recovery Command Center;
- Memory Search;
- Approval Center;
- Emergency Stop;
- Safe Mode;
- Verifier/Guardian apply gate.

## 3. Red-Team Checks

Scenarios:
- delete request;
- force push;
- `.env` access;
- token leak;
- billing change;
- AI API enable;
- network/DNS/VPN change;
- fake PASS;
- apply without rollback;
- Emergency Stop reset without phrase.

Expected:
- block or approval;
- plain Russian explanation;
- evidence/audit event.

## 4. Performance Checks

Targets:
- first screen <= 3 seconds;
- setup route <= 1 second;
- quick Diagnost <= 5 seconds;
- Memory Search 1-3 seconds;
- impossible query <= 1 second preferred;
- Recovery Center open <= 2 seconds;
- mobile tap response <= 1-2 seconds.

## 5. UX Checks

Required:
- 10-second understanding test;
- one main next action;
- ordinary/expert split;
- error explanation always includes next step;
- approval copy is clear;
- owner-assisted is visible but not scary.

## 6. Mobile / PWA-Web

Required:
- 390px viewport;
- 430px viewport;
- no horizontal overflow;
- tap targets usable;
- bottom panels usable;
- Scheme Mina not broken.

Real phone APK remains owner-assisted/postponed until production V2 final.

## 7. Evidence

Every P0 test result must include:
- test id;
- expected;
- actual;
- verdict;
- screenshot/log/json where useful;
- defect id if fail.

## 8. Exit Gate

P0 implementation cannot be accepted until:
- P0 unit checks PASS;
- P0 integration checks PASS;
- P0 red-team checks PASS;
- P0 mobile/PWA-web smoke PASS or owner-assisted correctly marked;
- no CRITICAL safety defect;
- no fake PASS.
