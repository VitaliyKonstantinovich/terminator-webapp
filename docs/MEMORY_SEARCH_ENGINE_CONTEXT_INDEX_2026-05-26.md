# Memory Search Engine / Context Index V1

Status: local PASS, prepared for GitHub Pages live acceptance.

## Meaning

Memory Search Engine = локальный поиск по памяти и контексту Терминатора.

Context Index = индекс ссылок на задачи, решения, артефакты, evidence и файлы без загрузки тяжёлых файлов в браузер.

This layer is the first practical foundation for the approved zer0dex-like memory pattern:

- real files remain on `D:\TerminatorStorage`;
- WebApp stores lightweight structured records;
- search returns summaries and refs;
- Context Pack is generated from safe summaries, not raw files;
- AI API are not used.

## Implemented

- Added `memory_index` store to IndexedDB Task Runtime.
- Added local memory search state and schema version.
- Added indexing from:
  - projects;
  - tasks;
  - messages;
  - artifacts;
  - evidence;
  - verifier results;
  - memory previews;
  - decisions;
  - ResearchOps and Brain Council artifacts.
- Added keyword tokenizer and scoring.
- Added Privacy Guard redaction before records enter the index.
- Added Memory Search panel in `System`.
- Added actions:
  - find in memory;
  - rebuild index;
  - copy Context Pack;
  - download index report;
  - open Mina Scheme memory zone;
  - open related task.
- Added Mina Scheme memory status binding.
- Moved startup TaskStore sync into background so the UI renders before network sync waits.
- Added IndexedDB open timeout/blocked fallback so an old open browser tab cannot freeze startup during schema upgrade.
- Updated cache markers:
  - `20260526-memory-search-v1`;
  - `terminator-mina-pwa-20260526-memory-search-v1`.

## Safety

- No AI API.
- No secrets are intentionally stored in the index.
- No passwords, cookies, tokens, API keys or `.env` values are read.
- No raw/base64 files are stored in localStorage.
- Heavy files stay on `D:\TerminatorStorage`.
- Direct Bridge source was not changed.
- Local Agent runtime source was not changed.
- No paid services were added.

## Checks

- `node --check app.js`: PASS.
- `node --check sw.js`: PASS.
- `git diff --check`: PASS, CRLF notices only.
- Local desktop smoke:
  - System screen opens;
  - Memory Search panel is present;
  - index status is ready;
  - search returns result;
  - Context Pack is generated;
  - no horizontal overflow.
- Local mobile smoke 390px:
  - Memory Search panel visible;
  - search field visible;
  - no horizontal overflow.

## Evidence

- `evidence/memory_search_engine/MEMORY_SEARCH_ENGINE_RESULT.md`.
- `D:\TerminatorStorage\evidence_backups\memory_search_engine\memory-search-desktop.png`.
- `D:\TerminatorStorage\evidence_backups\memory_search_engine\memory-search-mobile.png`.

## What To Verify First

1. Open `System`.
2. Find `Память / Поиск`.
3. Press `Пересобрать индекс`.
4. Search for `Codex evidence решение`.
5. Confirm a result appears and Context Pack is generated.
6. Open `Схема Мины: Память` and confirm memory status reflects the index.
