# Terminator V2-P0-1: First Run 11/10 + Recovery Command Center

Status: PLANNING PASS

Date: 2026-05-30

Mode: V2 11/10 / P0 Planning

## 1. Goal

V2-P0-1 defines the first launch and recovery command center experience for Terminator 11/10.

The goal is not to add another admin screen. The goal is to make the product immediately understandable, safe, and recoverable:

- the owner understands the first screen in 10 seconds;
- the system shows one main next action;
- readiness is honest, not inflated;
- recovery is guided, not manual technical pain;
- dangerous actions stay under Guardian, Approval, rollback and owner control.

## 2. Main User Pain

The owner should not have to debug Terminator by reading logs, searching folders, writing prompts, opening PowerShell, comparing diffs, or guessing what is broken.

Bad V2 UX:
- many equal buttons;
- hidden broken states;
- technical labels in ordinary mode;
- recovery that says what failed but does not say what to do;
- Emergency Stop that leaves the owner stuck.

Good V2 UX:
- "Here is what works."
- "Here is what needs attention."
- "Here is the safest next step."
- "Here is what will be repaired."
- "Here is what requires your approval."

## 3. What 11/10 Means

First Run 11/10 means:
- the owner opens Terminator and understands the product without documentation;
- Mina Scheme explains readiness visually;
- Setup Route chooses the next correct step;
- minimum / comfort / maximum readiness are clear;
- ordinary mode stays simple;
- expert mode contains logs, ids, raw state and policy;
- no fake ready state.

Recovery 11/10 means:
- every serious symptom becomes an Incident;
- Diagnost explains the issue in plain Russian;
- Recovery Wizard gives a safe path;
- Codex Repair creates a Diagnostic Pack before repair;
- Verifier and Guardian check the repair;
- rollback exists before apply;
- Emergency Stop is understandable and recoverable.

## 4. First Launch Design

### Welcome

The first screen must say what Terminator is ready to do now and what is still postponed.

Visible owner language:
- "Настроим Терминатор по шагам."
- "Минимум для запуска."
- "Комфортная работа."
- "Полная готовность."
- "Продолжить настройку."
- "Проверить систему."

Avoid:
- raw ids;
- runtime jargon;
- Durable Object;
- CommandQueue;
- backend runtime;
- JSON;
- "P0/P1" in ordinary mode.

### Mina Scheme

Mina Scheme is the visual configuration center. It should show:
- Голова / Мозги;
- Глаза;
- Голос;
- Память;
- Тело;
- Руки;
- Ноги;
- Диагност.

Each zone must show:
- status word;
- readiness score;
- next action;
- whether state is real, partial, mock, owner-assisted, or postponed.

### Readiness Levels

Minimum readiness:
- storage path available;
- Local Agent or owner-visible local runtime status known;
- Body / Runtime state known;
- Diagnost / Safe Mode available.

Comfort readiness:
- minimum readiness;
- Head / Strategist configured;
- Memory Search available;
- Codex Repair path available;
- Recovery Wizard visible.

Maximum readiness:
- comfort readiness;
- Eyes;
- Hands;
- Legs / Device Mesh;
- Voice;
- ResearchOps / Brain Council polish.

### Setup Route

The "Продолжить настройку" action must not be random.

Routing priority:
1. If storage/runtime state is unknown, open Body / System readiness.
2. If Diagnost is not ready, run a safe quick check.
3. If Emergency Stop is active, open Recovery Command Center.
4. If Head is missing, open Strategist setup.
5. If Memory Search is stale, open Memory Search health.
6. If Codex Repair is not ready, open Repair readiness.
7. If mobile/device setup is missing, open Legs / Device Mesh.
8. If everything owner-independent is ready, show "Запустить Терминатор".

### Ordinary Mode

Ordinary mode shows:
- what works;
- what is partial;
- what is blocked;
- one next action;
- short explanation;
- safe buttons.

### Expert Mode

Expert mode shows:
- raw state;
- ids;
- event log;
- policy;
- capability matrix;
- snapshot sources;
- mock/real markers;
- repair workspace paths.

## 5. Recovery Command Center

Recovery Command Center is the owner-facing control surface for faults.

It includes:
- Diagnost;
- Incident;
- Safe Mode;
- Emergency Stop;
- Codex Repair;
- rollback;
- Recovery Wizard;
- qualified recovery answer.

It does not replace the underlying modules. It coordinates them.

### Diagnost

Diagnost detects symptoms and explains:
- what happened;
- where it happened;
- severity;
- what is safe to do;
- what requires approval;
- what is unknown.

### Incident

Every serious fault creates an Incident with:
- incident_id;
- severity;
- component;
- status;
- owner-visible summary;
- next action;
- evidence refs;
- repair refs if available.

Incident statuses:
- open;
- investigating;
- repair_ready;
- waiting_approval;
- resolved;
- rejected;
- postponed.

### Safe Mode

Safe Mode blocks risky actions without deleting data.

It should show:
- why Safe Mode is active;
- what is blocked;
- what is still allowed;
- how to recover.

### Emergency Stop

Emergency Stop must:
- stop new risky actions;
- activate Safe Mode;
- create an Incident/event;
- show what was stopped;
- require typed confirmation to reset if active.

It must not:
- delete data;
- rollback automatically;
- change network settings;
- silently reset through Safe Mode off.

### Codex Repair

Codex Repair flow:
1. Diagnostic Pack.
2. Repair workspace.
3. Codex report / diff.
4. Verifier after fix.
5. Guardian risk check.
6. rollback point.
7. owner applies or rejects.

Codex Repair is not the owner, not the final acceptor, not a deployer, and not allowed to bypass Guardian.

### Rollback

Before apply, Terminator must show:
- affected files;
- previous hashes;
- backup location;
- incident_id;
- approval_id;
- rollback instructions.

### Recovery Wizard

Recovery Wizard guides by scenario:
- Local Agent offline;
- Bridge unavailable;
- stale task;
- missing evidence;
- memory index stale;
- Safe Mode active;
- repair rejected;
- billing unknown.

### Qualified Recovery Answer

A recovery result must include:
- current status;
- evidence;
- risks;
- what was checked;
- what changed;
- what did not change;
- next step.

## 6. What The Owner Sees

### On Error

The owner sees:
- "Проблема найдена."
- simple explanation;
- severity;
- safe next action;
- "Починить через Codex" only if repair path is available;
- "Открыть мастер восстановления";
- "Остановить действия" for critical risk.

### On Partial Setup

The owner sees:
- readiness score;
- missing items;
- one recommended next step;
- which items are postponed or owner-assisted.

### When A Module Is Not Ready

The owner sees:
- module status;
- why it is not ready;
- whether this blocks launch;
- next setup action;
- whether external owner action is required.

## 7. What Ordinary User Must Not See

Ordinary mode must not show:
- raw JSON;
- durable object;
- command queue;
- backend runtime;
- low-level worker ids;
- stack traces;
- shell commands as the first solution;
- provider placeholders as real paid integrations.

Technical details belong in Expert mode and evidence docs.

## 8. How Not To Overload The Interface

Rules:
- one primary next action per state;
- secondary actions stay secondary;
- detailed explanations hidden behind "Подробнее";
- readiness grouped by minimum / comfort / maximum;
- error messages end with an action;
- no dashboard wall of equal cards;
- no technical names in ordinary mode.

## 9. Required Flows

### Flow 1 — First Launch

Installed -> opened -> owner understands status -> "Проверить систему" -> minimum readiness -> enters Рабочее.

Expected:
- no docs required;
- next action visible;
- unknown states shown honestly.

### Flow 2 — Partially Ready System

Opened -> sees readiness -> clicks "Продолжить настройку" -> lands on the next correct step.

Expected:
- no random route;
- no false "ready";
- owner-assisted items separated.

### Flow 3 — Error

Symptom -> Diagnost -> Incident -> plain explanation -> safe next action -> Recovery Wizard.

Expected:
- no silent failure;
- no raw technical dump in ordinary mode;
- evidence link exists.

### Flow 4 — Repair

Diagnostic Pack -> Codex Repair -> Verifier -> Guardian -> rollback -> apply/reject.

Expected:
- active project not touched before approval;
- rollback visible before apply;
- Verifier failure blocks apply.

### Flow 5 — Emergency Stop

Owner clicks Stop -> risky actions blocked -> Safe Mode -> blocked items shown -> recovery path shown.

Expected:
- no data deletion;
- no accidental reset;
- typed confirmation required for reset.

### Flow 6 — Ordinary / Expert

Ordinary user sees simple actions.

Expert mode shows logs, ids, policy and raw state.

Expected:
- no technical junk in ordinary mode;
- expert details available when needed.

## 10. P0 Acceptance Criteria

P0 acceptance requires:
- first screen is understandable in 10 seconds;
- exactly one main next action is visible;
- Mina Scheme shows readiness;
- Setup Route leads to the correct next step;
- every error gives explanation and action;
- Emergency Stop does not leave owner stuck;
- Recovery Wizard guides by scenario;
- dangerous actions require Approval;
- technical details are hidden in Expert mode;
- mobile/PWA-web layout does not break;
- performance stays within budget;
- owner-assisted items are not counted as product defects.

## 11. Negative Scenarios

Must be covered:
- Local Agent offline;
- Bridge unavailable;
- D drive storage unavailable;
- Memory Search stale;
- missing evidence ref;
- invalid Codex Repair report;
- Verifier FAIL;
- rollback missing;
- Emergency Stop active;
- Cost Guard unknown;
- owner skips setup;
- mobile narrow viewport;
- no internet for external brains.

Expected behavior:
- no crash;
- no false ready;
- no silent risky action;
- clear next step.

## 12. Performance Budgets

Targets:
- first screen visible: <= 3 seconds;
- screen switch: <= 1 second;
- Mina Scheme open: <= 2 seconds;
- quick Diagnost: <= 5 seconds;
- Setup Route decision: <= 1 second;
- Recovery Wizard open: <= 2 seconds;
- Memory Search ordinary query: 1-3 seconds;
- mobile tap response: <= 1-2 seconds.

External waits, such as manual Codex/web-chat work, must be marked as external wait and not counted as internal Terminator delay.

## 13. Safety Gates

The following require Guardian / Approval:
- deploy;
- push main;
- delete;
- .env edits;
- secrets handling;
- billing/payment;
- network/DNS/VPN/proxy;
- unknown executable;
- production rollback;
- disabling Guardian;
- resetting Emergency Stop.

Critical actions require typed confirmation.

## 14. Owner-Assisted / Postponed Boundaries

Not current blockers:
- real phone APK acceptance;
- production signing;
- billing dashboards;
- production rollback on active project;
- legacy cleanup.

These remain postponed until production V2 final or a separate owner-assisted task.

## 15. Fail Conditions

V2-P0-1 fails if:
- owner does not understand what to do;
- error has no next action;
- Recovery is decorative;
- Emergency Stop resets accidentally;
- technical junk appears in ordinary mode;
- module shows false ready;
- repair has no rollback path;
- UI feels like an admin panel;
- mobile/PWA-web is unusable.

## 16. Planning Verdict

V2-P0-1 planning status: PASS

Feature coding may start only after a bounded V2-P0-1 implementation task is issued.
