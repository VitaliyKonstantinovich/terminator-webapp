# Terminator V2-P0-3 Memory Search 11/10 Scorecard

Status: PLANNING PASS

Date: 2026-05-30

| Area | Current Level | Target 11/10 | Gap | Risk | Acceptance |
| --- | ---: | --- | --- | --- | --- |
| Structured memory | 8 | Durable records for decisions/tasks/artifacts/evidence | Need schema implementation proof later | HIGH | MemoryRecord model defined |
| SQLite FTS / local search | 8 | Fast local FTS without cloud/API | Need local DB implementation later | HIGH | 1-3 sec normal search target |
| File/code index | 7.5 | Safe refs, hashes, include/exclude rules | Need indexing worker later | MEDIUM | no huge/raw files in DB |
| zer0dex-like compressed map | 8 | Compact project memory maps for long-term context | Need generator and lifecycle later | MEDIUM | human-readable compressed maps |
| Relevance scoring | 8.5 | exact/strong/weak/none prevents garbage | Need threshold tuning later | HIGH | impossible query empty state |
| Privacy Guard | 9 | secret blocks indexing/display/context | Need runtime proof later | CRITICAL | no secret in result/context |
| Performance | 8 | UI never blocks on large search/index | Need timing proof later | HIGH | budgets documented |
| Large project handling | 8 | incremental background indexing | Need pause/resume implementation later | HIGH | no full scan on query path |
| Recovery/reindex | 8 | stale/corrupted/degraded states route to recovery | Need Diagnost integration later | MEDIUM | index state model and playbooks |
| UI/UX | 8 | result explains why shown, weak/empty states clear | Need final UI implementation later | MEDIUM | ordinary/expert split |
| Integration | 8 | Workspace, Verifier, Research, Repair use refs | Need integration proof later | HIGH | module read/write contract |
| Market readiness | 8.5 | Terminator feels like it remembers and finds work | Needs real dataset validation later | MEDIUM | owner finds context without docs |

## Promotion to V1

NO by default.

Reason:
- V1 coding is paused.
- V2-P0-3 is a planning line.
- Any V1 transfer needs explicit `PROMOTED TO V1`.

## P0 Risk

The largest risk is false confidence: showing irrelevant or stale search results as if they are correct.

## Planning Acceptance

V2-P0-3 planning is acceptable if:
- memory layers are clear;
- data models are defined;
- query lifecycle is explicit;
- relevance states prevent garbage;
- secret/privacy rules are hard gates;
- large project strategy avoids UI blocking;
- recovery/reindex states exist;
- no V1 implementation is changed during planning.
