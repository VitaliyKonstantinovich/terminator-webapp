# Terminator V2-P0-3: Memory Search 11/10 Architecture + Performance Contract

Status: PLANNING PASS

Date: 2026-05-30

Mode: V2 11/10 / P0 Planning

## 1. Goal

Memory Search 11/10 lets Terminator quickly find context, decisions, files, artifacts, evidence, risks, next steps and previous conclusions without loading a whole project into a prompt.

The owner should be able to ask:
- "Что мы решили по этой задаче?"
- "Где evidence?"
- "Почему был такой verdict?"
- "Какие риски уже были?"
- "Где файл или артефакт?"

The answer must be fast, relevant, source-linked and privacy-safe.

## 2. Why Memory Search Is P0

Terminator becomes unreliable if it forgets, searches slowly, or returns confident garbage.

Memory Search is P0 because it supports:
- Workspace context;
- Verifier;
- Decision Passport;
- Brain Council;
- ResearchOps;
- Recovery;
- Codex Repair;
- Context Pack;
- long-term project continuity.

## 3. Memory Failure Conditions

Memory Search fails if:
- impossible query returns confident irrelevant results;
- stale index is hidden;
- secret appears in index/result/context pack;
- search blocks UI;
- full scan runs on every search;
- owner cannot see why a result was shown;
- evidence/file refs are broken but still shown as valid;
- large project requires loading everything into prompt.

## 4. What 11/10 Means

11/10 means:
- normal search returns in 1-3 seconds;
- impossible query returns empty state fast;
- weak results are marked as weak;
- every result explains why it was shown;
- refs connect task/artifact/evidence/file/decision;
- secrets are blocked before indexing/display;
- large projects index incrementally;
- Context Pack uses selected refs, not the whole world;
- Diagnost sees degraded memory state.

## 5. Source Of Truth

Memory Search reads from:
- structured memory records;
- tasks;
- artifacts;
- evidence metadata;
- decision records;
- BrainAnswer artifacts;
- Research Reports;
- file/code index;
- compressed project memory maps.

It must not create a separate untrusted truth. It indexes and explains refs to source records.

## 6. Layered Architecture

### 6.1 Structured Memory Records

Stores durable meaning:
- decisions;
- tasks;
- artifacts;
- evidence summaries;
- risks;
- next steps;
- Decision Passport;
- BrainAnswer;
- Research Report.

### 6.2 SQLite FTS / Local Full-Text Search

Purpose:
- fast local full-text search;
- no cloud dependency;
- no AI API;
- works with structured records and refs.

SQLite FTS is the default V2 target because it is simple, local and auditable.

### 6.3 File / Artifact / Evidence Refs

Store:
- metadata;
- path refs;
- hashes;
- size;
- type;
- last_modified;
- task/project refs.

Do not store huge raw files in the memory DB.

### 6.4 Code / File Index

Tracks:
- paths;
- language/file type;
- project refs;
- include/exclude reason;
- hashes;
- symbols later.

Exclude by default:
- `.git`;
- `node_modules`;
- build caches;
- archives/videos unless selected;
- secrets and browser profiles.

### 6.5 zer0dex-like Compressed Memory Map

Purpose:
- markdown/json compressed maps;
- durable decisions;
- project context summaries;
- long-term context recovery.

This is not an AI embedding layer. It is a compact human-readable map that helps recover context without huge prompts.

### 6.6 Optional Local Vector / Hybrid Layer

Allowed only later:
- local-only;
- explicit owner approval;
- no external embeddings API;
- no paid API;
- no secret indexing.

### 6.7 UI Search Layer

Provides:
- normal search;
- advanced filters;
- result explanation;
- evidence links;
- empty/weak states;
- index health;
- ordinary/expert split.

## 7. Data Model

### MemoryRecord

- id
- type
- title
- summary
- content_excerpt
- project_id
- task_id
- artifact_refs
- evidence_refs
- file_refs
- decision_refs
- tags
- confidence
- created_at
- updated_at
- source
- privacy_level
- index_status
- schema_version

### SearchIndexEntry

- record_id
- index_type
- normalized_text
- tokens
- ranking_score
- last_indexed_at
- hash
- stale_flag

### FileIndexEntry

- path
- project_id
- file_type
- size
- hash
- last_modified
- include_exclude_reason
- refs

### SearchResult

- record_id
- title
- snippet
- relevance_score
- match_type
- refs
- why_shown
- risk_flags

## 8. Index Lifecycle

Index states:

| State | Meaning | User UI | Diagnost | Search Allowed | Next Action |
| --- | --- | --- | --- | --- | --- |
| not_created | no index yet | "Индекс ещё не создан" | create warning | no | Create index |
| building | first index in progress | progress | monitor duration | partial | Continue in background |
| ready | index current | ready | healthy | yes | Search |
| stale | source changed | warning | stale event | yes with warning | Rebuild incremental |
| degraded | partial failure | warning | incident if persistent | limited | Repair/reindex |
| corrupted | index unreadable | error | incident | no | Rebuild from source |
| rebuilding | rebuild in progress | progress | monitor | partial | Wait/pause |
| blocked_by_privacy | privacy issue | privacy warning | Privacy Guard event | no for blocked refs | Redact/owner review |
| owner_action_required | external/manual item | checklist | owner-assisted | partial | Owner action |

## 9. Query Lifecycle

1. User enters query.
2. Query normalization.
3. Privacy filter.
4. Scope selection:
   - task;
   - project;
   - global memory;
   - artifacts;
   - evidence;
   - files;
   - decisions.
5. FTS search.
6. Relevance scoring.
7. Classification:
   - exact;
   - strong;
   - weak;
   - none.
8. Result grouping.
9. Explanation: why shown.
10. Empty state if nothing relevant.
11. Optional Context Pack creation.
12. Memory Search event logged.

## 10. Relevance / Ranking

Exact match:
- direct title/id/ref/content match;
- high score;
- can be shown confidently.

Strong match:
- relevant content;
- ref exists;
- evidence or source link available;
- can be shown as found.

Weak match:
- partial/low score;
- must show warning:
  "Найдены слабые совпадения, проверьте вручную".

No relevant match:
- no confident result;
- empty state:
  "Ничего релевантного не найдено".

Hard rule:
Impossible query must not return confident garbage.

## 11. Secret / Privacy Rules

Do not index or display:
- `.env`;
- tokens;
- cookies;
- sessions;
- private keys;
- bearer/jwt;
- API keys;
- passwords;
- local signing props;
- browser profiles;
- payment data.

Rules:
1. Secret-like content blocks indexing.
2. Secret-like result blocks display.
3. Diagnostic warning is created.
4. Privacy Guard event is created.
5. No secret in Context Pack.
6. No secret in docs/evidence.

## 12. Large Project Strategy

Do not:
- full scan every query;
- load 150 GB into prompt;
- index `node_modules`;
- index `.git`;
- index archives/videos by default;
- run embeddings for everything.

Do:
- incremental indexing;
- include/exclude rules;
- chunk only text/code files;
- hash-based change detection;
- priority indexing:
  - docs;
  - source;
  - decisions;
  - evidence summaries;
  - artifacts;
- background jobs;
- progress indicator;
- pause/resume indexing.

## 13. Recovery / Reindex Playbooks

### 1. Index Stale

- Trigger: source hash changed.
- Explanation: "Индекс устарел."
- Safe action: incremental rebuild.
- Automatic action: allowed for low-risk metadata.
- Approval: not required unless destructive.
- Evidence: stale report.

### 2. Index Corrupted

- Trigger: index cannot be read.
- Explanation: "Индекс повреждён."
- Safe action: rebuild from source refs.
- Automatic action: prepare rebuild plan.
- Approval: required before deleting old index.
- Evidence: corruption incident.

### 3. Memory DB Unavailable

- Trigger: DB missing/unreadable.
- Explanation: "База памяти недоступна."
- Safe action: open Recovery.
- Automatic action: health check only.
- Approval: required for restore.
- Evidence: DB health record.

### 4. Search Returns Irrelevant Results

- Trigger: weak/garbage results.
- Explanation: "Поиск нашёл слабые совпадения."
- Safe action: mark weak/empty and tune ranking later.
- Automatic action: log query quality defect.
- Approval: not required.
- Evidence: search trace.

### 5. No Results For Known Item

- Trigger: known task/artifact not found.
- Explanation: "Известный элемент не найден."
- Safe action: check refs and index status.
- Automatic action: incremental reindex.
- Approval: not required unless data repair.
- Evidence: missing item report.

### 6. Secret Detected In Index Candidate

- Trigger: secret-like pattern.
- Explanation: "Найдены приватные данные."
- Safe action: block indexing/display.
- Automatic action: Privacy Guard warning.
- Approval: owner review required.
- Evidence: redaction report without value.

### 7. Large Scan Too Slow

- Trigger: indexing exceeds budget.
- Explanation: "Индексирование занимает больше времени."
- Safe action: background mode / pause.
- Automatic action: throttle.
- Approval: not required.
- Evidence: timing record.

### 8. File Refs Broken

- Trigger: path missing/hash mismatch.
- Explanation: "Ссылка на файл недоступна."
- Safe action: mark broken ref.
- Automatic action: refresh metadata.
- Approval: required before relinking/deleting.
- Evidence: broken ref report.

### 9. Evidence Refs Missing

- Trigger: evidence id/path missing.
- Explanation: "Evidence не найдено."
- Safe action: block confident acceptance.
- Automatic action: incident/warning.
- Approval: owner decision for replacement evidence.
- Evidence: missing evidence report.

### 10. Storage Path Unavailable

- Trigger: `D:\TerminatorStorage` unavailable.
- Explanation: "Хранилище недоступно."
- Safe action: Safe Mode / choose folder.
- Automatic action: read-only checks.
- Approval: required for migration/restore.
- Evidence: storage health record.

## 14. Performance Budgets

Targets:
- normal search: 1-3 seconds;
- impossible/empty query: <= 1 second preferred;
- result render after results: <= 1 second;
- small task index update: <= 2 seconds;
- incremental small file index: <= 2-5 seconds;
- large initial indexing: async/background;
- Memory screen open: <= 2 seconds;
- normal Context Pack assembly: <= 10 seconds;
- full scan: never on critical UI path.

If a budget is exceeded, UI must show progress / partial / background, not freeze.

## 15. Memory UI Contract

Memory UI must show:
- search field;
- filters;
- result type;
- relevance label;
- refs;
- why shown;
- confidence;
- weak match warning;
- empty state;
- reindex action;
- index health;
- privacy warning;
- ordinary/expert split.

Ordinary mode uses simple names.

Expert mode may show:
- index_id;
- schema_version;
- FTS stats;
- file refs;
- raw diagnostics.

## 16. Integration Points

| Module | Reads | Writes | Refs | Risk |
| --- | --- | --- | --- | --- |
| Рабочее | task memory, context | task notes, artifacts | task_id | stale task context |
| Схема Мины | memory health | none | subsystem status | false ready |
| Диагност | index state | incidents | incident_id | missing degraded state |
| Recovery Command Center | recovery memory | repair records | incident/rollback refs | unsafe repair context |
| Brain Council | decisions/research | BrainAnswer refs | decision refs | source quality |
| ResearchOps | source notes | reports/cards | source refs | weak sources |
| Decision Passport | prior decisions | decision record | decision_id | unsupported decision |
| Verifier | criteria/evidence | verdict refs | evidence refs | false PASS |
| Codex Repair | diagnostic memory | repair summary | repair refs | secret leakage |
| Evidence Hub | evidence metadata | evidence refs | evidence_id | broken evidence |
| Controlled Hands | safe context | action logs | approval refs | unsafe action |
| Cost/Privacy Guard | policy/privacy flags | warnings | policy refs | secret/cost surprise |

## 17. Acceptance Criteria

P0 acceptance:
1. Search finds a known task.
2. Search finds an artifact.
3. Search finds evidence.
4. Search finds a decision.
5. Impossible query returns empty state.
6. Weak query returns weak warning.
7. Secret does not enter index.
8. Secret does not enter result.
9. Stale index shows warning.
10. Reindex action is clear.
11. Large project does not block UI.
12. Normal search is 1-3 seconds.
13. Memory screen opens fast.
14. Context Pack does not assemble the whole project.
15. Diagnost sees degraded memory.

## 18. Negative Scenarios

Must test later:
- impossible nonsense query;
- weak partial query;
- stale index;
- corrupted index;
- missing evidence;
- broken file ref;
- secret candidate;
- huge project path;
- storage unavailable;
- privacy-blocked result.

## 19. FAIL Conditions

Memory Search fails if:
- confident garbage is shown;
- stale index is hidden;
- secret enters result/context;
- UI freezes;
- full scan runs every search;
- owner cannot understand why result appeared;
- mock state is shown as real;
- evidence/file refs are false.

## 20. Planning Verdict

V2-P0-3 planning status: PASS

Implementation may start only after a bounded V2-P0-3 implementation task is issued.
